import React, { useState } from "react";
import Logo from "../assets/logo-mobile.svg";
import iconDown from "../assets/icon-chevron-down.svg";
import iconUp from "../assets/icon-chevron-up.svg";
import elipsis from "../assets/icon-vertical-ellipsis.svg";
import HeaderDropDown from "./HeaderDropDown";

import AddEditTaskModal from "../modals/AddEditTaskModal";
import { useDispatch, useSelector } from "react-redux";
import DeleteModal from "../modals/DeleteModal";
import boardsSlice from "../redux/boardsSlice";

function Header({
  setIsBoardModalOpen,
  isBoardModalOpen,
  selectedColumnIndex,
  setSelectedColumnIndex,
}) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
  const [boardType, setBoardType] = useState("add");

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const dispatch = useDispatch();

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);

  const onDropdownClick = () => {
    setOpenDropdown((state) => !state);
    setIsElipsisMenuOpen(false);
    setBoardType("add");
  };

  return (
    <div className=" p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0 shadow-xl">
      <header className=" flex justify-between dark:text-white items-center  ">
        {/* Left Side  */}
        <div className=" flex items-center space-x-2  md:space-x-4">
          <img src={Logo} alt=" Logo " className=" h-6 w-6" />
          <h3 className=" md:text-4xl  hidden md:inline-block font-bold  font-sans">
            Task Tracker
          </h3>
          <div className=" flex items-center ">
            <h3 className=" truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans  ">
              {selectedColumnIndex === null
                ? "Dashboard"
                : selectedColumnIndex === 0
                ? "Todos"
                : selectedColumnIndex === 1
                ? "Active"
                : selectedColumnIndex === 2
                ? "Completed"
                : board.name}
            </h3>
            <img
              src={openDropdown ? iconUp : iconDown}
              alt=" dropdown icon"
              className=" w-3 ml-2 md:hidden"
              onClick={onDropdownClick}
            />
          </div>
        </div>

        {/* Right Side */}

        <div className=" flex space-x-4 items-center md:space-x-6 ">
          <div className="lg:block hidden">
            <input
              className="text-lg py-3 px-3 bg-transparent w-full outline-none shadow-md rounded-md border border-gray-300 lg:w-[300px] xl:w-[350px]"
              placeholder="Search tasks by title..."
              onChange={(e) => {
                dispatch(boardsSlice.actions.searchTasks(e.target.value));
              }}
            />
          </div>
          <button
            className=" button hidden md:block "
            onClick={() => {
              setIsTaskModalOpen((prevState) => !prevState);
            }}
          >
            + Add New Task
          </button>
          <button
            onClick={() => {
              setIsTaskModalOpen((prevState) => !prevState);
            }}
            className=" button py-1 px-3 md:hidden"
          >
            +
          </button>
        </div>

        {openDropdown && (
          <HeaderDropDown
            setOpenDropdown={setOpenDropdown}
            selectedColumnIndex={selectedColumnIndex}
            setSelectedColumnIndex={setSelectedColumnIndex}
          />
        )}
      </header>
      {isTaskModalOpen && (
        <AddEditTaskModal
          setIsAddTaskModalOpen={setIsTaskModalOpen}
          type="add"
          device="mobile"
        />
      )}
    </div>
  );
}

export default Header;
