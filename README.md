
# Assignment 2 Maidaniuc

## Features 
- All requirements are completed.
- API key is included in the submission (for grading purposes).
- Overlay modal:
  - Can be closed by clicking the **X** in the top-right corner.
  - Can also be closed by clicking anywhere outside the modal.
- User interaction:
  - Select a **Month** and **Year** from dropdown menus.
  - Years are limited to 1900-2025.
  - Click on a **Date** button to request information on 3 events for that day.
- API response:
  - Modal displays **3 important events** from history for the chosen date.
  - Limited to 3 events to speed up API response time.

## Calendar Implementation
- Built using a **CSS Grid** layout.
- Days are dynamically populated with **JavaScript** when a month is selected to account for leap years.
- Leading/trailing whitespace is added so months always align to a full week (Sunday → Saturday) for aesthetics.
- Each day is rendered as a **button** so it can be clicked to trigger the modal.

<img width="941" height="669" alt="Screenshot 2025-10-01 at 8 06 42 PM" src="https://github.com/user-attachments/assets/047b8f1a-c485-4450-bb01-35493d6ee90e" />
