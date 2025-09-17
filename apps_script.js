/**
 * @OnlyCurrentDoc
 *
 * The above comment directs App Script to limit the scope of authorization
 * to only the current spreadsheet.
 */

// Set the name of the sheet where you want to store the data.
const SHEET_NAME = "data";
// Set the Spreadsheet ID. You would typically get this from the active spreadsheet,
// but if running standalone you might need to specify it.
// const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE'; // Only needed if not bound to a sheet

/**
 * Handles HTTP POST requests to the web app.
 * This function is the endpoint for your React form.
 * It can add or remove a user from the spreadsheet based on the request payload.
 * @param {Object} e - The event parameter containing the POST data.
 * @return {ContentService.TextOutput} - A JSON response indicating success or failure.
 */
function doPost(e) {
  // Lock the script to prevent simultaneous access issues.
  const lock = LockService.getScriptLock();
  lock.waitLock(10000); // Wait up to 10 seconds for other executions to finish.

  try {
    // Open the spreadsheet and the specific sheet.
    // This requires the https://www.googleapis.com/auth/spreadsheets scope.
    const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadSheet.getSheetByName(SHEET_NAME);

    // If the sheet doesn't exist, create it with headers.
    if (!sheet) {
      sheet = spreadSheet.insertSheet(SHEET_NAME);
      // The headers for the sheet. Column D (index 3) is for Email.
      sheet.appendRow(["Timestamp", "First Name", "Last Name", "Email"]);
      Logger.log(`Sheet "${SHEET_NAME}" was not found and has been created.`);
    }

    // Parse the JSON data sent from the client.
    const data = JSON.parse(e.postData.contents);
    Logger.log(`Received data: ${JSON.stringify(data)}`);

    // Extract data from the parsed JSON.
    const email = data.email;
    const unsubscribe = data.unsubscribe || false; // Default to false if not present.
    
    Logger.log(`Processing request - Email: ${email}, Unsubscribe: ${unsubscribe}`);

    // Basic validation: Email is required for any operation.
    if (!email) {
      throw new Error("Missing required field: email.");
    }

    const emailColumnIndex = 4; // The column number for 'Email' (A=1, B=2, C=3, D=4).
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    let userRowNumber = -1;

    // Search for the user's email in the sheet. Start from row 2 (index 1) to skip headers.
    for (let i = 1; i < values.length; i++) {
      if (values[i][emailColumnIndex - 1] === email) {
        userRowNumber = i + 1; // Sheet rows are 1-indexed.
        break;
      }
    }

    if (unsubscribe) {
      // --- Handle Unsubscribe Request ---
      if (userRowNumber !== -1) {
        const timestamp = new Date();
        sheet.getRange(userRowNumber, 1).setValue(timestamp);
        sheet.getRange(userRowNumber, 5).setValue(false);
        Logger.log(`Successfully unsubscribed user with email: ${email}`);
        return ContentService
          .createTextOutput(JSON.stringify({ status: 'success', message: 'User unsubscribed successfully.' }))
          .setMimeType(ContentService.MimeType.JSON);
      } else {
        // If user not found, they are already effectively unsubscribed.
        Logger.log(`Unsubscribe attempt for a non-existent email: ${email}`);
        return ContentService
          .createTextOutput(JSON.stringify({ status: 'success', message: 'Email address not found in our system. You may already be unsubscribed or the email was never subscribed.' }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    } else {
      // --- Handle Subscribe (Add User) Request ---
      const firstName = data.firstName;
      const lastName = data.lastName;

      // Validate required fields for subscribing.
      if (!firstName || !lastName) {
        throw new Error("Missing required fields for subscription: firstName or lastName.");
      }
      
      // Check if user already exists.
      if (userRowNumber !== -1) {
        Logger.log(`Attempted to add an existing user: ${email}`);
        return ContentService
          .createTextOutput(JSON.stringify({ status: 'error', message: 'A user with this email already exists.' }))
          .setMimeType(ContentService.MimeType.JSON);
      }

      // Create a timestamp and append the new user data.
      const timestamp = new Date();
      sheet.appendRow([timestamp, firstName, lastName, email, true]);
      Logger.log("Successfully appended new user data to the sheet.");

      // Return a success response.
      return ContentService
        .createTextOutput(JSON.stringify({ status: 'success', message: 'User added successfully.' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

  } catch (error) {
    // If an error occurs, log it and return an error response.
    Logger.log(`Error in doPost: ${error.toString()}`);
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    // Release the lock so other executions can run.
    lock.releaseLock();
  }
}

/**
 * DEBUGGING FUNCTION
 * Handles HTTP GET requests. You can test this by visiting your web app URL in a browser.
 * It checks if the script can access the specified spreadsheet and sheet.
 * @param {Object} e The event parameter from the GET request.
 * @return {ContentService.TextOutput} - A JSON response with the status.
 */
function doGet(e) {
  try {
    const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadSheet.getSheetByName(SHEET_NAME);

    if (!spreadSheet) {
      throw new Error("Could not open spreadsheet. Ensure the script is bound to a spreadsheet.");
    }
    if (!sheet) {
      throw new Error(`Sheet "${SHEET_NAME}" does not exist in the spreadsheet.`);
    }

    Logger.log("doGet check: Success. Spreadsheet and sheet are accessible.");
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', message: 'Script is running and can access the sheet.' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log(`Error in doGet: ${error.toString()}`);
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: `Script error: ${error.toString()}` }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
