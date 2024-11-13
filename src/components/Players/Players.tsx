"use client";
import React, { useEffect, useState } from "react";
import PlayerTable from "./PlayerTable";
import { LuTrash } from "react-icons/lu";
import { GoChevronDown } from "react-icons/go";
import useSnackbar from "@/hooks/useSnackbar";
import Menu from "../Players/Menu";
import { PlayerNameUpdate, UserBlock } from "@/api/api";

function Players() {
  const [isOpen, setIsOpen] = useState(false);
  const [playerUserName, setPlayerUserName] = useState(false);
  const [totalChips, setTotalChips] = useState<string>("");
  const [PlayerModel, setPlayerModel] = useState<{
    open: boolean;
    userId?: string;
    name?: string;
  }>({ open: false });

  const { showSnackbar } = useSnackbar();
  const HandleDeleteAllPlayer = () => {
    showSnackbar("Delete all player...", "success");
  };

  const HandleUpdate = async () => {
    await PlayerNameUpdate(playerUserName, PlayerModel.userId);
    setPlayerModel({ open: false });
    showSnackbar("Player name edit successfully...", "success");
  };
  const HandleBlockUser = async () => {
    if (PlayerModel.userId) {
      const response = await UserBlock(PlayerModel.userId);
      showSnackbar(response.message, "default");
    }
  };

  return (
    <div className="bg-white text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-white md:p-4 lg:p-6">
      <style>
        {`
            input::placeholder {
              color: #fff;
              opacity: 0.7;
            }
          `}
      </style>
      {PlayerModel && (
        <Menu
          isBlock={true}
          name={PlayerModel.name}
          openPopUp={PlayerModel.open}
          closePopUp={() => setPlayerModel({ open: false })}
          HandleBlockUser={HandleBlockUser}
          HandleUpdate={HandleUpdate}
          setPlayerUserName={setPlayerUserName}
        />
      )}

      <div className="flex flex-col items-center justify-between px-4 py-4 md:flex-row md:px-6 md:py-5">
        <div className="text-dark text-xl font-semibold md:text-2xl">
          Players
        </div>
        <div className="text-dark text-md mb-4 font-semibold md:mb-0 md:text-xl">
          <span className="text-md text-[#6E6DFE]">Total Chips: </span>
          <span className="text-md pl-1 text-[#6E6DFE]">{totalChips}</span>
        </div>
        <div className="flex w-full flex-col items-center space-y-4 md:w-auto md:flex-row md:space-x-4 md:space-y-0">
          <span className="text-lg font-medium">Login Type</span>
          <div
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            className="relative inline-block"
          >
            <button
              id="dropdownHoverButton"
              className="dark:bg-white-800 inline-flex items-center rounded-lg border border-gray-400 bg-white px-5 py-2 text-center text-sm font-medium text-black transition duration-300 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:text-black dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              All <GoChevronDown className="ms-1 h-6 w-6" />
            </button>

            {isOpen && (
              <>
                <div
                  className="fixed inset-0 z-40 bg-black opacity-0"
                  onClick={() => setIsOpen(false)}
                ></div>
                <div
                  id="dropdownHover"
                  className="absolute z-50 mt-2 w-48 rounded-md bg-white shadow-lg dark:bg-gray-800"
                >
                  <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                    <li className="px-4 py-2 transition duration-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                      Option 1
                    </li>
                    <li className="px-4 py-2 transition duration-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                      Option 2
                    </li>
                    <li className="px-4 py-2 transition duration-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                      Option 3
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>

          <div className="flex-shrink-0 cursor-pointer rounded-xl bg-[#6E6DFE] px-4 py-2 text-white transition-colors duration-200 hover:bg-[#5a59da]">
            <button
              onClick={HandleDeleteAllPlayer}
              className="flex items-center focus:outline-none"
            >
              <LuTrash className="mr-1 h-4 w-4" />
              <span className="text-md">Delete All</span>
            </button>
          </div>
        </div>
      </div>

      <PlayerTable
        setPlayerModel={setPlayerModel}
        setTotalChips={setTotalChips}
      />
    </div>
  );
}

export default Players;
