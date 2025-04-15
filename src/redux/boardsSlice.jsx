import { createSlice } from "@reduxjs/toolkit";
import data from "../data.json";

const loadFromLocalStorage = () => {
  try {
    const savedState = localStorage.getItem("boards");
    return savedState ? JSON.parse(savedState) : data.boards;
  } catch (e) {
    console.warn("Error loading from localStorage", e);
    return data.boards;
  }
};

const boardsSlice = createSlice({
  name: "boards",
  initialState: loadFromLocalStorage(),
  reducers: {
    searchTasks: (state, action) => {
      const searchText = action.payload?.toLowerCase() || "";

      state.forEach((board) => {
        board.columns.forEach((column) => {
          // Save original tasks once
          if (!column.originalTasks) {
            column.originalTasks = [...column.tasks];
          }

          if (!searchText) {
            column.tasks = [...column.originalTasks];
          } else {
            column.tasks = column.originalTasks.filter((task) =>
              task.title.toLowerCase().includes(searchText)
            );
          }
        });
      });
    },

    setBoardActive: (state, action) => {
      state.map((board, index) => {
        board.isActive = index === action.payload.index;
        return board;
      });
    },

    addTask: (state, action) => {
      const { title, status, description, newColIndex, isImportant } =
        action.payload;
      const task = { title, description, status, isImportant };
      const board = state.find((board) => board.isActive);
      const column = board.columns[newColIndex];
      column.tasks.push(task);

      // Update originalTasks
      column.originalTasks = [...column.tasks];
    },

    editTask: (state, action) => {
      const {
        title,
        status,
        description,
        prevColIndex,
        newColIndex,
        taskIndex,
        isImportant,
      } = action.payload;

      const board = state.find((board) => board.isActive);
      const prevColumn = board.columns[prevColIndex];
      const task = prevColumn.tasks[taskIndex];

      task.title = title;
      task.status = status;
      task.description = description;
      task.isImportant = isImportant;

      if (prevColIndex !== newColIndex) {
        prevColumn.tasks.splice(taskIndex, 1);
        const newColumn = board.columns[newColIndex];
        newColumn.tasks.push(task);

        // Update both columns' originalTasks
        prevColumn.originalTasks = [...prevColumn.tasks];
        newColumn.originalTasks = [...newColumn.tasks];
      } else {
        prevColumn.originalTasks = [...prevColumn.tasks];
      }
    },

    dragTask: (state, action) => {
      const { colIndex, prevColIndex, taskIndex } = action.payload;
      const board = state.find((board) => board.isActive);
      const prevCol = board.columns[prevColIndex];
      const task = prevCol.tasks.splice(taskIndex, 1)[0];
      const newCol = board.columns[colIndex];
      newCol.tasks.push(task);

      // Update both columns' originalTasks
      prevCol.originalTasks = [...prevCol.tasks];
      newCol.originalTasks = [...newCol.tasks];
    },

    setTaskStatus: (state, action) => {
      const { colIndex, newColIndex, taskIndex, status } = action.payload;
      if (colIndex === newColIndex) return;

      const board = state.find((board) => board.isActive);
      const columns = board.columns;
      const col = columns[colIndex];
      const task = col.tasks[taskIndex];

      task.status = status;
      col.tasks.splice(taskIndex, 1);
      const newCol = columns[newColIndex];
      newCol.tasks.push(task);

      // Update both columns' originalTasks
      col.originalTasks = [...col.tasks];
      newCol.originalTasks = [...newCol.tasks];
    },

    deleteTask: (state, action) => {
      const { colIndex, taskIndex } = action.payload;
      const board = state.find((board) => board.isActive);

      if (!board) {
        console.warn("No active board found.");
        return;
      }

      const col = board.columns?.[colIndex];

      if (!col || !Array.isArray(col.tasks)) {
        console.warn("Invalid column or tasks array missing.");
        return;
      }

      col.tasks.splice(taskIndex, 1);

      // Update originalTasks
      col.originalTasks = [...col.tasks];
    },
  },
});

export default boardsSlice;
