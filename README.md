# Task Tracker

## Project Description:

The goal of this project is to create a React application for task management with a dynamic form generation feature based on a UI schema provided by the user. The app will have a dual-panel layout where users can paste the UI schema (in JSON format) on the left side, and the right side will automatically render the form preview based on the schema. In addition to the form functionality, the application will allow users to create, read, update, and delete tasks while providing features like task filtering, priority assignment, and more.

## Tech Stack

Frontend Framework: ReactJS with functional components and hooks.

State Management: Redux and Redux Toolkit for global state management.

Persistence: Tasks will be stored in localStorage/IndexedDB for data persistence.

Responsive Design: Mobile-first approach with responsive layouts.

## Features

1.  Dynamic Form Generation (UI Schema)
    Users can paste a UI schema in JSON format to dynamically generate a form.

The schema includes properties like label, description, jsonKey, uiType, validate, and placeholder for different fields (text input, number, radio, etc.).

The form will display advanced fields that can be toggled based on the validate property in the schema.

2. Task Management
   Create, Read, Update, Delete Tasks: Users can add, view, modify, and delete tasks.

Task Status: Toggle the completion status of tasks with a simple checkbox.

Filtering: Filter tasks based on status (all, completed, active).

Search: Search functionality to find specific tasks using task names or categories.

Categories/Tags: Organize tasks with customizable categories or tags.

Priority Levels: Assign priority levels to tasks (low, medium, high) for easy management.

3. User Interface & User Experience
   Intuitive UI: Clean, user-friendly interface for task management.

Task Organization: Enable drag-and-drop functionality for task reordering.

Visual Indicators: Use color-coding for task priority and completion status.

4. Real-Time Updates:
   The UI schema editor (left panel) and form preview (right panel) will synchronize in real-time as users make changes to the JSON schema.

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
