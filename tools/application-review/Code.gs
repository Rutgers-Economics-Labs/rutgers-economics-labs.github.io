/** @OnlyCurrentDoc */
const REL_RESPONSE_TAB = 'Form Responses 1';
const REL_REVIEW_HEADERS = ['REL DS Decision', 'REL Policy Decision', 'REL Review Notes', 'REL Review Updated'];
function onOpen() {
  SpreadsheetApp.getUi().createMenu('REL Review').addItem('Open applicant reviewer', 'openRelReviewer').addToUi();
}
function openRelReviewer() {
  SpreadsheetApp.getUi().showModalDialog(HtmlService.createHtmlOutputFromFile('Reviewer').setWidth(1500).setHeight(900), 'REL applicant review');
}
function relDigest(value) {
  return Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, JSON.stringify(value)));
}
function relSource() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(REL_RESPONSE_TAB);
  if (!sheet) throw new Error('Response tab not found: ' + REL_RESPONSE_TAB);
  const rows = sheet.getDataRange().getDisplayValues();
  const headers = rows.shift();
  const applicationIndexes = headers.map((h, i) => REL_REVIEW_HEADERS.includes(h) ? -1 : i).filter(i => i >= 0);
  const emailIndex = headers.findIndex(h => /email/i.test(h));
  const timeIndex = headers.findIndex(h => /timestamp/i.test(h));
  const applicants = rows.map((row, index) => {
    if (!applicationIndexes.some(i => row[i])) return null;
    const identity = emailIndex >= 0 && timeIndex >= 0 ? [row[emailIndex], row[timeIndex]] : applicationIndexes.map(i => row[i]);
    const review = REL_REVIEW_HEADERS.map(h => { const i = headers.indexOf(h); return i < 0 ? '' : row[i]; });
    return {id: relDigest(identity), row: index + 2, fields: applicationIndexes.map(i => ({label: headers[i] || 'Column ' + (i + 1), value: row[i]})), review: {ds: review[0], policy: review[1], notes: review[2]}, version: relDigest(review)};
  }).filter(Boolean);
  if (new Set(applicants.map(a => a.id)).size !== applicants.length) throw new Error('Duplicate application identities. Resolve duplicate email/timestamp records before reviewing.');
  return {sheet, headers, applicants};
}
function getRelApplications() {
  const source = relSource();
  return {applicants: source.applicants, source: SpreadsheetApp.getActiveSpreadsheet().getName(), syncedAt: new Date().toISOString()};
}
function saveRelReview(request) {
  const lock = LockService.getDocumentLock();
  lock.waitLock(10000);
  try {
    const allowed = ['', 'No', 'Maybe', 'Interview'];
    if (!request || !allowed.includes(request.ds) || !allowed.includes(request.policy) || typeof request.notes !== 'string' || request.notes.length > 20000) throw new Error('Invalid review.');
    const source = relSource();
    const applicant = source.applicants.find(a => a.id === request.id);
    if (!applicant) throw new Error('Application no longer exists. Refresh before saving.');
    if (applicant.version !== request.version) throw new Error('Another reviewer changed this application. Copy your notes, then refresh to see their update.');
    REL_REVIEW_HEADERS.forEach(h => {
      if (!source.headers.includes(h)) {
        const col = source.headers.length + 1;
        if (col > source.sheet.getMaxColumns()) source.sheet.insertColumnAfter(source.sheet.getMaxColumns());
        source.sheet.getRange(1, col).setValue(h);
        source.headers.push(h);
      }
    });
    const updated = new Date().toISOString();
    [request.ds, request.policy, request.notes, updated].forEach((value, i) => {
      // Prefix potentially executable sheet formulas; display values remain plain text.
      const safe = /^[=+@-]/.test(value) ? "'" + value : value;
      source.sheet.getRange(applicant.row, source.headers.indexOf(REL_REVIEW_HEADERS[i]) + 1).setValue(safe);
    });
    SpreadsheetApp.flush();
    const saved = relSource().applicants.find(a => a.id === request.id);
    return {version: saved.version, updated};
  } finally { lock.releaseLock(); }
}
