# REL applicant reviewer

Open `Reviewer.html` locally for the standalone design preview. The sample applicant is fictional. Import a Google Sheets CSV export to read all columns, search applications, preview document links, and save draft decisions locally. Local imports do not sync to Google.

## Connect to the response form

1. In **REL Application Form Fa2026 (Responses)**, choose **Extensions → Apps Script**.
2. Add a script file containing `Code.gs`. If the bound project already has `onOpen`, merge the menu call into it instead of replacing it.
3. Add an HTML file named **Reviewer** and paste `Reviewer.html` into it.
4. Save, run `openRelReviewer`, and authorize access to this spreadsheet. Reload the spreadsheet to get the **REL Review → Open applicant reviewer** menu.

No web app deployment or public sharing is required. Reads use the `Form Responses 1` tab (change `REL_RESPONSE_TAB` if needed). The first saved review adds four columns to that tab: **REL DS Decision**, **REL Policy Decision**, **REL Review Notes**, and **REL Review Updated**. It does not edit applicant answers or form questions. New form responses are available through Refresh. DS and Policy each support blank/unreviewed, No, Maybe, and Interview; selecting a decision again clears it.

Save is explicit. The interface only says synced after Apps Script confirms the write. A document lock and version comparison reject stale concurrent saves. Applicants are matched by email plus timestamp, rather than by saved row number; duplicate identities block writes. Drafts remain in the current browser after a failed write; export reviews before clearing browser storage. If a save conflicts, copy your draft notes, reload the sheet, and reconcile them with the newer review. A save with an uncertain result may require reopening the reviewer to reload the saved version.

Document previews retain Drive's existing permissions. All submitted fields and notes render as text; links only accept HTTP/HTTPS. Notes that resemble spreadsheet formulas are stored as text. Reviews are shared with everyone who can read the response sheet; restrict sheet access to the review team.

This source package has no applicant data and is separate from the newsletter `apps_script.js`. Opening the local HTML does not establish a Google Sheets connection. Live reads/writes require installing the bound script above.
