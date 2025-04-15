import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddEditTaskModal from "../modals/AddEditTaskModal";
import { MdOutlineLabelImportant, MdStars } from "react-icons/md";
import elipsis from "../assets/icon-vertical-ellipsis.svg";

function Task({ colIndex, taskIndex }) {
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;
  const col = columns.find((col, i) => i === colIndex);
  const task = col.tasks.find((task, i) => i === taskIndex);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const handleOnDrag = (e) => {
    e.dataTransfer.setData(
      "text",
      JSON.stringify({ taskIndex, prevColIndex: colIndex })
    );
  };

  console.log(task);
  return (
    <div>
      <div
        onClick={() => setIsTaskModalOpen(true)}
        draggable
        onDragStart={handleOnDrag}
        className="w-[280px] first:my-5 relative rounded-lg bg-white dark:bg-[#2b2c37] shadow-[#364e7e1a] py-6 px-3 shadow-lg hover:text-[#635fc7] dark:text-white dark:hover:text-[#635fc7] cursor-pointer"
      >
        <img
          onClick={() => {}}
          src={elipsis}
          alt="elipsis"
          className=" cursor-pointer h-4 right-4 absolute top-4"
        />
        <p className="font-bold tracking-wide">{task.title}</p>
        <p className="font-bold text-xs tracking-tighter mt-2 text-gray-500">
          {task.description}
        </p>
        <div className="mt-4 flex items-center space-x-2">
          <span className="text-xs text-gray-500 text-lg font-bold">Tags:</span>
          <span
            className={`h-4 w-4 rounded-full ${
              col.name.toLowerCase() === "todos"
                ? "bg-red-500"
                : col.name.toLowerCase() === "active"
                ? "bg-orange-500"
                : col.name.toLowerCase() === "completed"
                ? "bg-blue-500"
                : "bg-gray-300"
            }`}
          ></span>
          {task.isImportant === "yes" && (
            <MdStars className="text-lg text-yellow-500 h-5 w-5" />
          )}
        </div>
      </div>
      {isTaskModalOpen && (
        <AddEditTaskModal
          setIsAddTaskModalOpen={setIsTaskModalOpen} // Pass setter function to close modal
          type="edit"
          taskIndex={taskIndex}
          prevColIndex={colIndex}
        />
      )}
    </div>
  );
}

export default Task;
