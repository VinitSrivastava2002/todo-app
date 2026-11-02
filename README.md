# Weekly To-Do (React + Vite + Tailwind)

A mobile-first to-do app that groups tasks by week (Monday–Sunday) and shows open vs. completed counts per week.

## Features
- Create, edit, delete tasks (title*, description, date & time*, priority)
- Onboarding screen, then a home screen with a Monday–Sunday day strip, weekly Complete/Pending counts and a Weekly Progress bar
- "View All" shows every task for the selected week; tapping a day shows that day's tasks
- Mark tasks Completed / In progress with the checkbox
- Swipe a task left to reveal **Delete** (with Undo)
- Search by title or description, with edit/delete from the results
- Data is saved in the browser (`localStorage`); sample tasks are added on first run

## Run locally
```bash
npm install
npm run dev
```

## Build / deploy
```bash
npm run build      # outputs ./dist
```
Netlify: connect the repo. `netlify.toml` already sets the build command and publish folder.

## Structure
```
src/
  App.jsx                 home screen, week grouping, form + toast state
  hooks/useTasks.js       task state + localStorage persistence
  utils/dates.js          Monday-based week helpers, formatting
  components/
    Onboarding.jsx        "Manage What To Do" welcome screen
    Home.jsx              search bar, stats, weekly progress, task list
    WeekStrip.jsx         Monday–Sunday day selector
    TaskRow.jsx           task row with edit/delete icons + swipe-to-delete
    TaskSheet.jsx         add / edit bottom sheet
    SearchScreen.jsx      search screen
```

## Extra credit: your own API
Replace `useTasks.js` with calls to an Express + MongoDB API (same task shape:
`{ id, title, description, dueAt, priority, status }`) and deploy the UI on Netlify.
