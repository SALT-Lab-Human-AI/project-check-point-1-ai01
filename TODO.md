# TODO - Hire-Shark Implementation

This document lists the features and bug fixes required to complete the hire-shark project based on the `Implement_Spec.md`.

## High Priority

- **Implement File Upload:**
  - The file upload component on the `/upload` page needs to be fully implemented.
  - It should accept PDF, DOCX, and TXT files.
  - The "Continue to Review" button should become active after a file is successfully uploaded.

- **Implement Resume Parsing:**
  - Create the `parser.ts` library to extract information from uploaded resumes.
  - The `/review` page should display the parsed information, not static data.
  - The extracted data should be editable and update the application's state.

- **Implement Matching Algorithm:**
  - Create the `matcher.ts` library to match the parsed resume against a list of jobs.
  - The `/matches` page should display the dynamic match results.
  - The sorting and filtering functionality on the matches page needs to be implemented.

- **Implement State Management:**
  - Implement the `ResumeContext` to manage the state of the application.
  - Data (resume file, parsed data, matches) should be passed between pages through the context.

## Medium Priority

- **Button and Link Functionality:**
  - The "Apply Now" and "Express Interest" buttons on the `/matches` page need to be implemented.
  - All other buttons and links should be checked to ensure they lead to the correct pages or trigger the correct actions.

- **Implement Persistence:**
  - Use `sessionStorage` to persist the resume data during a session.
  - Use `localStorage` to save matches.

- **Editable Fields:**
  - The `EditableField` component on the `/review` page should be fully implemented to allow users to edit the extracted information.

## Placeholder Pages

- **`/review`**: This page is currently a placeholder with static data. It needs to be connected to the resume parsing logic to display and edit the extracted information from the uploaded resume.
- **`/matches`**: This page is a placeholder with a static list of job matches. It needs to be connected to the matching algorithm to display dynamic results based on the user's resume.
- **`/success`**: This page is a static confirmation page. It should be updated to dynamically display information about the action just taken (e.g., the specific job the user applied for).

## Low Priority

- **Add Tests:**
  - Create unit tests for the `parser` and `matcher` libraries.
  - Create component and integration tests for the application flow.

- **Complete UI/UX:**
  - Ensure all UI elements are polished and the user experience is smooth.
  - Add loading indicators and error messages where appropriate.