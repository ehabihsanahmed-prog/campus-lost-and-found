FINDIT — CAMPUS LOST & FOUND
Windows setup and run instructions

START ON http://localhost:8000
1. Extract the ZIP file.
2. Open the extracted Campus_Lost_and_Found folder.
3. Double-click START_SERVER.bat.
4. Your browser should open http://localhost:8000.
5. Keep the black Command Prompt window open while using the app.
6. To stop the server, click the Command Prompt window and press Ctrl+C.

REQUIREMENT
Python 3 must be installed on Windows and available as "py" or "python".
If it is not installed, download it from https://www.python.org/downloads/
and enable "Add Python to PATH" during installation.

ALTERNATIVE MANUAL COMMAND
Open Command Prompt in this folder and run:
  py -m http.server 8000
Then open:
  http://localhost:8000

WHAT'S INCLUDED
- index.html: application structure
- style.css: responsive design and custom styling
- script.js: reports, validation, search, filters and localStorage
- START_SERVER.bat: starts the local server on port 8000
- README.txt: these instructions

FEATURES
- Create Lost and Found reports
- Required-field validation
- Search by item, description, location, category or report ID
- Filter by Lost / Found / Resolved and by category
- Mark a report Resolved or Reopen it
- Delete reports
- Live dashboard counts
- Data saved in browser localStorage and retained after refresh
- Responsive desktop and mobile layout

IMPORTANT
- This is a front-end classroom prototype.
- Sample reports are fictional.
- Data is stored in the browser on the computer where it is entered.
- Clearing browser site data may erase saved reports.
- Bootstrap and fonts are loaded from online CDNs, so internet is needed for those assets.

HACKATHON DEMO FLOW (ABOUT 1 MINUTE)
1. Show the dashboard and its report summary.
2. Submit a Lost report with an item, category, location and date.
3. Point out that it appears immediately on the community board.
4. Search for the item and filter by Lost or category.
5. Click Resolve and show the status changing.
6. Refresh the page to demonstrate localStorage persistence.

TECHNICAL EXPLANATION
- HTML5 creates the form, navigation, dashboard and report cards.
- Bootstrap 5 provides the responsive grid, form controls and toast.
- CSS provides the visual theme and mobile refinements.
- JavaScript handles validation, DOM rendering, search, filters and status changes.
- localStorage stores the reports as JSON in the browser.

Suggested team explanation:
UI lead: index.html and style.css.
JavaScript lead: script.js data model, validation and rendering.
Integration/test lead: test the full flow, filters, refresh persistence and demo.
