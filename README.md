# Task Tracker

## Project Description:

The goal of this project is to build a comprehensive Task Tracker application using ReactJS. The application is designed to help users manage their tasks effectively with features like task creation, real-time updates, filtering, categorization, and more. The user interface is split into two key components: a task input and management area, and a task display area that dynamically updates based on user interaction and data from global state.

Users can create tasks with details such as title, category, and priority level. Each task can be marked as completed or active, updated, deleted, and reordered through drag-and-drop functionality. Tasks are visually categorized and color-coded based on their priority and completion status, enhancing user experience and clarity.

The application follows a mobile-first responsive design, ensuring optimal user experience across devices. All task data is persisted using localStorage, so users do not lose their data on page reloads.

## Tech Stack

Frontend: ReactJS, JavaScript, Tailwind CSS
State Management: Redux, Redux Toolkit
Middleware: Redux Thunk
Persistence: localStorage

## Features

Features - (Task Management)
Create new tasks with title, category, and priority level

Read and view all tasks in real-time with dynamic UI rendering

Update task details and toggle their completion status

Delete individual tasks from the task list

Drag-and-drop functionality for reordering tasks


Features - (Task Display & Organization)
Task Status Management: Toggle completion status (active/completed) for individual tasks

Filtering: View tasks based on their status - all, active, or completed

Search Functionality: Search through tasks using task titles or keywords

Categories: Tag tasks with categories to organize them contextually

Priority Levels: Assign low, medium, or high priority to tasks and display them with visual indicators

Visual Indicators: Tasks are color-coded based on priority and status for better visual clarity

Responsive Design: Fully optimized for mobile, tablet, and desktop views with a mobile-first approach



## Getting Started

    These instructions will help you set up and run the project on your local machine for development and testing purposes.

## Installation

    1. Clone the repository

```bash
  git clone https://github.com/rahulkumar345/task-manager.git

```

    2. Install dependencies

```bash
  cd task-tracker-assignment
  npm install
```

    3. Start the development server

```bash
  npm run dev
```

    This will run the app in development mode. Open http://localhost:5173 to view it in the browser. The page will reload if you make edits.
