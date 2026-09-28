# TaskMaster - Personal To-Do App

A clean, beginner-friendly task management application built with React. Add, edit, delete, and organize tasks with categories, due dates, and dark mode support.

## Features

- **Add, edit, delete, and complete tasks** — Full CRUD functionality
- **Filter by status** — View All, Active, or Completed tasks
- **Categories** — Organize tasks as Work, Personal, or Urgent
- **Due dates** — Set deadlines with visual overdue indicators
- **Dark/Light theme** — Toggle between themes, persisted across sessions
- **localStorage persistence** — Tasks survive page refresh
- **Live task counts** — See remaining and completed task counts
- **Responsive design** — Works on desktop and mobile

## Technologies Used

- **React 18** — Functional components with hooks
- **Vite** — Fast build tool and dev server
- **CSS3** — Custom properties for theming, flexbox layout
- **localStorage API** — Client-side data persistence

## Project Structure

```
src/
├── components/
│   ├── TaskInput.jsx      # Form to add new tasks
│   ├── TaskList.jsx       # Renders list of tasks
│   ├── TaskItem.jsx       # Individual task card
│   ├── FilterBar.jsx      # Status and category filters
│   └── ThemeToggle.jsx    # Dark/light mode toggle
├── hooks/
│   └── useLocalStorage.js # Custom hook for localStorage
├── App.jsx                # Main app component
├── App.css                # All styles
├── index.css              # Global styles and theme variables
└── main.jsx               # Entry point
```

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd react-todo-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

## Build for Production

```bash
npm run build
npm run preview
```

## Known Limitations

- No drag-and-drop reordering (tasks appear in order added)
- No backend/database — all data stored locally in browser
- No user authentication
- Edit mode replaces the entire task card inline rather than using a modal

## Screenshots

![App Screenshot](docs/screenshot.png)
