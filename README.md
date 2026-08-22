# Sheger Transit

Sheger Transit is a single-page web application for searching Addis Ababa bus routes and saving favourite routes.

The project demonstrates the data-driven application pattern learned throughout Module 2:

State → Render → Events → Update State → Render

## Features

- Browse Addis bus route data
- Load routes from JSON
- Live route search
- Search by route number
- Search by destination
- Search by area
- Save favourite routes
- Remove favourite routes
- Persist favourites with localStorage
- Loading state
- Empty search state
- Error state
- Transit booking form
- Ethiopian phone validation
- Booking confirmation
- Responsive design
- Keyboard-friendly controls

## Project Structure

Sheger-Transit/

├── index.html
├── styles.css
├── app.js
├── README.md
├── TEST_PLAN.md
└── data/
    └── routes.json

## Data

The application loads route data from:

data/routes.json

JavaScript uses fetch() to load the JSON data.

The routes in this project are sample data created for the application.

## Search

The search field updates state.search whenever the user types.

The route list is then filtered and rendered again.

## Favourites

Favourite route IDs are stored in:

state.favourites

The favourites are saved to localStorage so they remain after a page reload.

## Booking

The booking form validates:

1. Name

2. Ethiopian phone number

3. Selected route

The phone validation uses:
\
Start with +251 or 0
Then have 9
Then have 8 more digits

Examples of valid phone numbers:

0912345678

+251912345678

After successful validation, a booking object is created and logged to the console.

A confirmation message is displayed to the user.

## How to Run

Open the project in VS Code.

Use Live Server to run the application.

Do not open index.html directly with file:// because fetch() may not be allowed to load the JSON file.

## Architecture

The application uses one state object:

- routes
- favourites
- search

The UI is rendered from state.

User actions change state and then trigger rendering.

## Testing

See TEST_PLAN.md for the manual testing checklist.

## Module Connection

Day 22 introduced state, render, events and localStorage.

Day 23 expanded those ideas into a data-driven project using fetch, JSON, search and saved state.

Day 24 focuses on making the project robust through validation, guard clauses, safe data handling, loading/empty/error/success states, refactoring, accessibility, responsiveness and testing.

Sheger Transit applies those concepts to a transportation-themed project.

## Demo

🎥 Loom Project Demo: [Watch Project Demo](https://www.loom.com/share/3c3d8d33e381453cac5a54e96469832a)

🌐 Live Application: [View Live App](https://selenophile012.github.io/Sheger_Bus_Transit/)
