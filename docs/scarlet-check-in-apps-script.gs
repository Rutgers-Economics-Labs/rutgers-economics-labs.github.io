/**
 * @OnlyCurrentDoc
 */

const SHEET_NAME = 'Attendance';
const MAX_BATCH_SIZE = 100;

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}

function sanitizeCell(value, maxLength) {
  const text = String(value == null ? '' : value).trim().slice(0, maxLength);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function doGet() {
  return jsonResponse({ ok: true, service: 'Scarlet Check-In', version: 1 });
}

function doPost(event) {
  const lock = LockService.getScriptLock();
  try {
    const body = JSON.parse((event && event.postData && event.postData.contents) || '{}');
    const records = Array.isArray(body.records) ? body.records.slice(0, MAX_BATCH_SIZE) : [];
    if (!records.length) return jsonResponse({ ok: false, error: 'No records supplied.' });

    lock.waitLock(15000);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error('Attendance sheet not found.');
    const lastRow = sheet.getLastRow();
    const existingIds = new Set(
      lastRow > 1 ? sheet.getRange(2, 8, lastRow - 1, 1).getDisplayValues().flat().filter(Boolean) : []
    );
    const accepted = [];
    const duplicates = [];
    const rows = [];

    records.forEach((record) => {
      const id = sanitizeCell(record.id, 80);
      const name = sanitizeCell(record.name, 100);
      if (!id || !name) return;
      if (existingIds.has(id)) {
        duplicates.push(id);
        return;
      }
      existingIds.add(id);
      accepted.push(id);
      const checkedInAt = new Date(record.checkedInAt);
      rows.push([
        isNaN(checkedInAt.getTime()) ? new Date() : checkedInAt,
        name,
        sanitizeCell(record.event, 120),
        sanitizeCell(record.club, 120),
        Math.max(0, Math.min(100, Number(record.confidence) || 0)),
        sanitizeCell(record.source, 20),
        sanitizeCell(record.device, 80),
        id,
        new Date()
      ]);
    });

    if (rows.length) sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, rows[0].length).setValues(rows);
    SpreadsheetApp.flush();
    return jsonResponse({ ok: true, accepted: accepted, duplicates: duplicates });
  } catch (error) {
    return jsonResponse({ ok: false, error: String(error && error.message ? error.message : error) });
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}
