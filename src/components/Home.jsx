import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Column from "./Column";
import EmptyBoard from "./EmptyBoard";
import Sidebar from "./Sidebar";
import boardsSlice from "../redux/boardsSlice";

function Home({ selectedColumnIndex, setSelectedColumnIndex }) {
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  const dispatch = useDispatch();

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;

  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  return (
    <div
      className={
        windowSize[0] >= 768 && isSideBarOpen
          ? " bg-[#f4f7fd]  scrollbar-hide no-scrollbar h-screen flex dark:bg-[#20212c]  overflow-x-scroll gap-6  ml-[261px] "
          : "bg-[#f4f7fd]  scrollbar-hide no-scrollbar h-screen flex  dark:bg-[#20212c] overflow-x-scroll gap-6 "
      }
    >
      {windowSize[0] >= 768 && (
        <Sidebar
          setIsBoardModalOpen={setIsBoardModalOpen}
          isBoardModalOpen={isBoardModalOpen}
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
          setSelectedColumnIndex={setSelectedColumnIndex}
          selectedColumnIndex={selectedColumnIndex}
        />
      )}

      {/* Columns Section */}
      <div className="top-0 mt-[86px] absolute w-[350px] lg:hidden flex ">
        <input
          className="text-lg py-3 px-3 bg-white ml-8 w-full outline-none shadow-md rounded-md border border-gray-300 "
          placeholder="Search tasks by title..."
          onChange={(e) => {
            dispatch(boardsSlice.actions.searchTasks(e.target.value));
          }}
        />
      </div>

      {columns.length > 0 ? (
        <>
          {selectedColumnIndex === null ? (
            // No column selected => Show all columns
            columns.map((col, index) => <Column key={index} colIndex={index} />)
          ) : (
            // Show only the selected column
            <Column key={selectedColumnIndex} colIndex={selectedColumnIndex} />
          )}
        </>
      ) : (
        <>
          <EmptyBoard type="edit" />
        </>
      )}
    </div>
  );
}

export default Home;
