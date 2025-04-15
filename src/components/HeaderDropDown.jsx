import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "@headlessui/react";
import boardIcon from "../assets/icon-board.svg";
import useDarkMode from "../hooks/useDarkMode";
import darkIcon from "../assets/icon-dark-theme.svg";
import lightIcon from "../assets/icon-light-theme.svg";
import boardsSlice from "../redux/boardsSlice";

function HeaderDropDown({
  setOpenDropdown,
  selectedColumnIndex,
  setSelectedColumnIndex,
}) {
  const dispatch = useDispatch();
  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  const boards = useSelector((state) => state.boards);

  return (
    <div
      className=" py-10 px-6 absolute  left-0 right-0 bottom-[-100vh] top-16 dropdown "
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenDropdown(false);
      }}
    >
      {/* DropDown Modal */}

      <div className=" bg-white dark:bg-[#2b2c37] shadow-md shadow-[#364e7e1a]  w-full   py-4 rounded-xl">
        <div className=" dropdown-borad  ">
          {boards.map((board, index) => (
            <div
              className={` flex items-baseline space-x-2 px-5 py-4  ${
                selectedColumnIndex === null &&
                " bg-[#635fc7] rounded-r-full text-white mr-8 "
              } `}
              key={index}
              onClick={() => {
                setSelectedColumnIndex(null);
                setOpenDropdown(false);
              }}
            >
              <img src={boardIcon} className="  filter-white  h-4 " />{" "}
              <p className=" text-lg font-bold  ">{board.name}</p>
            </div>
          ))}
          {boards[0].columns.map((status, index) => (
            <div
              className={` flex items-baseline space-x-2 px-5 py-4  ${
                selectedColumnIndex === index &&
                " bg-[#635fc7] rounded-r-full text-white mr-8 "
              } `}
              key={index}
              onClick={() => {
                setSelectedColumnIndex(index);
                setOpenDropdown(false);
              }}
            >
              <img src={boardIcon} className="  filter-white  h-4 " />{" "}
              <p className=" text-lg font-bold ">{status.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeaderDropDown;
