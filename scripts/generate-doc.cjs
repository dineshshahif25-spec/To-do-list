const { Document, Packer, Paragraph, TextRun, ImageRun, HeadingLevel, AlignmentType, PageBreak } = require('docx');
const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '..', 'docs');

const screenshots = [
  { file: 'screenshot-light.png', caption: 'Light Mode — Main View with Tasks' },
  { file: 'screenshot-dark.png', caption: 'Dark Mode — Theme Toggle' },
  { file: 'screenshot-mobile.png', caption: 'Mobile Responsive View' },
  { file: 'screenshot-empty.png', caption: 'Empty State — No Tasks' },
];

const imageBuffers = screenshots.map(s => ({
  buffer: fs.readFileSync(path.join(docsDir, s.file)),
  caption: s.caption,
}));

const doc = new Document({
  sections: [{
    properties: {},
    children: [
      // Title
      new Paragraph({
        text: 'TaskMaster — Personal To-Do App',
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
      }),
      new Paragraph({
        text: 'React.js Course Project Documentation',
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
        children: [new TextRun({ text: 'React.js Course Project Documentation', italics: true, size: 28 })],
      }),

      // 1. Project Overview
      new Paragraph({ text: '1. Project Overview and Objective', heading: HeadingLevel.HEADING_1 }),
      new Paragraph({
        text: 'TaskMaster is a single-page task management application built with React.js. It allows users to create, edit, delete, and organize daily tasks with categories, due dates, and theme preferences. The objective of this project was to apply core React concepts including components, props, state management with hooks, event handling, and conditional rendering in a real-world application.',
        spacing: { after: 200 },
      }),

      // 2. Modules/Features
      new Paragraph({ text: '2. Modules and Features Implemented', heading: HeadingLevel.HEADING_1 }),
      new Paragraph({ text: '2.1 Core Features', heading: HeadingLevel.HEADING_2 }),
      new Paragraph({ text: '• Add Tasks — Users can create new tasks with a title, category (Work, Personal, Urgent), and optional due date using a controlled form with onChange and onSubmit handlers.', spacing: { after: 100 } }),
      new Paragraph({ text: '• Edit Tasks — Each task can be edited inline, allowing users to modify the title, category, and due date.', spacing: { after: 100 } }),
      new Paragraph({ text: '• Delete Tasks — Tasks can be removed from the list with a single click.', spacing: { after: 100 } }),
      new Paragraph({ text: '• Mark as Complete — A custom checkbox toggles task completion status with visual feedback (strikethrough and opacity).', spacing: { after: 100 } }),
      new Paragraph({ text: '• Filter by Status — Three filter buttons (All, Active, Completed) allow users to view tasks by their completion status.', spacing: { after: 100 } }),
      new Paragraph({ text: '• Category Organization — Tasks are organized into three categories: Work, Personal, and Urgent, each with a distinct color badge.', spacing: { after: 100 } }),
      new Paragraph({ text: '• localStorage Persistence — All tasks and theme preferences are stored in the browser localStorage, so data survives page refreshes.', spacing: { after: 100 } }),
      new Paragraph({ text: '• Live Task Counts — A stats bar displays the count of remaining and completed tasks in real time.', spacing: { after: 200 } }),

      new Paragraph({ text: '2.2 Stretch Goals (Bonus Features)', heading: HeadingLevel.HEADING_2 }),
      new Paragraph({ text: '• Due Dates with Overdue Indicators — Tasks can have due dates. Overdue tasks are highlighted with a red border and warning icon.', spacing: { after: 100 } }),
      new Paragraph({ text: '• Dark/Light Theme Toggle — Users can switch between light and dark themes. The preference is persisted in localStorage.', spacing: { after: 100 } }),
      new Paragraph({ text: '• Responsive Design — The layout adapts to mobile screens with a responsive design using CSS media queries.', spacing: { after: 200 } }),

      // 3. Technology Stack
      new Paragraph({ text: '3. Technology and Tools Used', heading: HeadingLevel.HEADING_1 }),
      new Paragraph({ text: '• React 18 — JavaScript library for building user interfaces using functional components and hooks (useState, useEffect).', spacing: { after: 100 } }),
      new Paragraph({ text: '• Vite — Next-generation frontend tooling providing fast dev server and optimized builds.', spacing: { after: 100 } }),
      new Paragraph({ text: '• CSS3 — Custom properties (CSS variables) for theming, Flexbox for layout, and media queries for responsiveness.', spacing: { after: 100 } }),
      new Paragraph({ text: '• localStorage API — Web storage API for persisting tasks and theme data on the client side.', spacing: { after: 100 } }),
      new Paragraph({ text: '• Git & GitHub — Version control system for tracking project progress with incremental commits.', spacing: { after: 200 } }),

      // 4. Project Structure
      new Paragraph({ text: '4. Project Structure', heading: HeadingLevel.HEADING_1 }),
      new Paragraph({ text: 'The project follows a clean, organized folder structure:', spacing: { after: 100 } }),
      new Paragraph({ text: 'src/components/ — Reusable UI components (TaskInput, TaskList, TaskItem, FilterBar, ThemeToggle)', spacing: { after: 100 } }),
      new Paragraph({ text: 'src/hooks/ — Custom React hooks (useLocalStorage for persistent state)', spacing: { after: 100 } }),
      new Paragraph({ text: 'src/App.jsx — Main application component managing state and data flow', spacing: { after: 100 } }),
      new Paragraph({ text: 'src/App.css — Component styles with CSS variables for theming', spacing: { after: 100 } }),
      new Paragraph({ text: 'src/index.css — Global styles and theme variable definitions', spacing: { after: 200 } }),

      // 5. Screenshots
      new Paragraph({ text: '5. Screenshots', heading: HeadingLevel.HEADING_1 }),
      new Paragraph({ text: 'The following screenshots show the application running in different modes:', spacing: { after: 200 } }),

      // Screenshots with captions
      ...imageBuffers.flatMap((img, index) => [
        new Paragraph({
          text: `Screenshot ${index + 1}: ${img.caption}`,
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
        }),
        new Paragraph({
          children: [new ImageRun({
            data: img.buffer,
            transformation: { width: 500, height: 350 },
          })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
        }),
      ]),

      // 6. Setup Instructions
      new Paragraph({ text: '6. Setup Instructions', heading: HeadingLevel.HEADING_1 }),
      new Paragraph({ text: 'Prerequisites: Node.js (v16 or higher) and npm installed on your system.', spacing: { after: 100 } }),
      new Paragraph({ text: '1. Clone the repository to your local machine.', spacing: { after: 100 } }),
      new Paragraph({ text: '2. Navigate to the project folder: cd react-todo-app', spacing: { after: 100 } }),
      new Paragraph({ text: '3. Install dependencies: npm install', spacing: { after: 100 } }),
      new Paragraph({ text: '4. Start the development server: npm run dev', spacing: { after: 100 } }),
      new Paragraph({ text: '5. Open your browser and go to http://localhost:5173', spacing: { after: 200 } }),

      // 7. Known Limitations
      new Paragraph({ text: '7. Known Limitations', heading: HeadingLevel.HEADING_1 }),
      new Paragraph({ text: '• No drag-and-drop reordering — Tasks appear in the order they were added.', spacing: { after: 100 } }),
      new Paragraph({ text: '• No backend database — All data is stored in the browser localStorage and is not synced across devices.', spacing: { after: 100 } }),
      new Paragraph({ text: '• No user authentication — The app does not support multiple user accounts.', spacing: { after: 100 } }),
      new Paragraph({ text: '• Edit mode is inline — Editing replaces the task card content rather than using a modal dialog.', spacing: { after: 200 } }),

      // 8. Appendix
      new Paragraph({ text: '8. Appendix — References and Notes', heading: HeadingLevel.HEADING_1 }),
      new Paragraph({ text: '• React Documentation: https://react.dev', spacing: { after: 100 } }),
      new Paragraph({ text: '• Vite Documentation: https://vitejs.dev', spacing: { after: 100 } }),
      new Paragraph({ text: '• MDN Web Docs — localStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage', spacing: { after: 100 } }),
      new Paragraph({ text: '• CSS Custom Properties: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties', spacing: { after: 100 } }),
      new Paragraph({ text: 'This project was developed as part of the React.js course curriculum. All code is original and written for learning purposes.', spacing: { after: 100 } }),
    ],
  }],
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(path.join(docsDir, 'documentation.docx'), buffer);
  console.log('DOCX documentation generated: docs/documentation.docx');
});
