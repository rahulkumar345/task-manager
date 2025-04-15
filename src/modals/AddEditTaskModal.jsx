import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import crossIcon from "../assets/icon-cross.svg";
import boardsSlice from "../redux/boardsSlice";
import { MdOutlineDeleteOutline } from "react-icons/md";
import DeleteModal from "./DeleteModal";

const Important = ["yes", "no"];
function AddEditTaskModal({
  type,
  device,
  setIsAddTaskModalOpen,
  taskIndex,
  prevColIndex = 0,
}) {
  const dispatch = useDispatch();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isValid, setIsValid] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isImportance, setImportance] = useState("no");
  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  );

  const columns = board.columns;
  const col = columns.find((col, index) => index === prevColIndex);
  const task = col ? col.tasks.find((task, index) => index === taskIndex) : [];
  const [status, setStatus] = useState(columns[prevColIndex].name);
  const [newColIndex, setNewColIndex] = useState(prevColIndex);

  const onDeleteBtnClick = (e) => {
    if (e.target.textContent === "Delete") {
      dispatch(
        boardsSlice.actions.deleteTask({ taskIndex, colIndex: prevColIndex })
      );
      setIsAddTaskModalOpen(false);
      setIsDeleteModalOpen(false);
    } else {
      setIsDeleteModalOpen(false);
    }
  };
  const onChangeStatus = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };
  const onChangeImportance = (e) => {
    setImportance(e.target.value);
  };
  const validate = () => {
    setIsValid(false);
    if (!title.trim()) {
      return false;
    }

    setIsValid(true);
    return true;
  };

  useEffect(() => {
    if (type === "edit" && isFirstLoad) {
      if (task) {
        setTitle(task.title);
        setDescription(task.description);
        setImportance(task.isImportant);
        setIsFirstLoad(false);
      }
    }
  }, [type, isFirstLoad, task]);

  const onSubmit = (type) => {
    if (type === "add") {
      dispatch(
        boardsSlice.actions.addTask({
          title,
          description,

          status,
          newColIndex,
          isImportant: isImportance,
        })
      );
    } else {
      dispatch(
        boardsSlice.actions.editTask({
          title,
          description,

          status,
          taskIndex,
          prevColIndex,
          newColIndex,
          isImportant: isImportance,
        })
      );
    }
    setIsAddTaskModalOpen(false); // Close modal after submitting
  };

  return (
    <div
      className={
        device === "mobile"
          ? "py-6 px-6 pb-40 absolute overflow-y-scroll no-scrollbar z-50 left-0 flex right-0 bottom-[-100vh] top-0 dropdown"
          : "py-6 px-6 pb-40 absolute overflow-y-scroll no-scrollbar z-50 left-0 flex right-0 bottom-0 top-0 dropdown"
      }
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsAddTaskModalOpen(false); // Close modal when clicking outside
      }}
    >
      <div
        className="scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold
         shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl"
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg">
            {type === "edit" ? "Edit" : "Add New"} Task
          </h3>
          <button
            onClick={() => {
              setIsAddTaskModalOpen(false); // Close modal on cross click
            }}
            className="p-1 hover:opacity-70"
          >
            <img src={crossIcon} alt="Close" className="h-4 w-4" />
          </button>
        </div>

        {/* Task Name */}
        <div className="mt-4 flex flex-col space-y-1">
          <label className="text-sm dark:text-white text-gray-500">
            Task Name
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="task-name-input"
            type="text"
            className="bg-transparent px-4 py-2 outline-none focus:border-0 rounded-md text-sm border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1 ring-0"
            placeholder="e.g Take coffee break"
          />
        </div>

        {/* Description */}
        <div className="mt-4 flex flex-col space-y-1">
          <label className="text-sm dark:text-white text-gray-500">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="task-description-input"
            className="bg-transparent outline-none min-h-[200px] focus:border-0 px-4 py-2 rounded-md text-sm border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-[1px]"
            placeholder="e.g. It's always good to take a break."
          />
        </div>

        {/* Current Status */}
        <div className="mt-4 flex flex-col space-y-3 mb-4">
          <label className="text-sm dark:text-white text-gray-500">
            Current Status
          </label>
          <select
            value={status}
            onChange={onChangeStatus}
            className="select-status flex-grow px-4 py-2 rounded-md text-sm bg-transparent dark:bg-[#2b2c37] focus:border-0 border-[1px] border-gray-300 focus:outline-[#635fc7] outline-none"
          >
            {columns.map((column, index) => (
              <option key={index}>{column.name}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col space-y-3 mb-4">
          <label className="text-sm dark:text-white text-gray-500">
            Is Important
          </label>
          <select
            value={isImportance}
            onChange={onChangeImportance}
            className="select-status flex-grow px-4 py-2 rounded-md text-sm bg-transparent dark:bg-[#2b2c37] focus:border-0 border-[1px] border-gray-300 focus:outline-[#635fc7] outline-none"
          >
            {Important.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        {type === "edit" && (
          <div className="mt-8 flex justify-between items-center mb-8">
            <label className="text-sm dark:text-white text-gray-500">
              Delete Task
            </label>
            <MdOutlineDeleteOutline
              className="text-2xl text-red-600 cursor-pointer"
              onClick={() => setIsDeleteModalOpen(true)}
            />
          </div>
        )}
        <button
          onClick={() => {
            const isValid = validate();
            if (isValid) {
              onSubmit(type); // On Submit, close modal
            }
          }}
          className="w-full items-center text-white bg-[#635fc7] py-2 rounded-full"
        >
          {type === "edit" ? "Save Edit" : "Create Task"}
        </button>
      </div>
      {isDeleteModalOpen && (
        <DeleteModal
          onDeleteBtnClick={onDeleteBtnClick}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          type="task"
          title={task.title}
        />
      )}
    </div>
  );
}

export default AddEditTaskModal;
