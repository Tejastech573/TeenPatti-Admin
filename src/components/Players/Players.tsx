"use client";
import React, { useState } from "react";
import PlayerTable from "./PlayerTable";
import { LuTrash } from "react-icons/lu";
import { GoChevronDown } from "react-icons/go";
import useSnackbar from "@/hooks/useSnackbar";

function Players() {
  const [isOpen, setIsOpen] = useState(false);
  const { showSnackbar } = useSnackbar();
  const HandleDeleteAllPlayer = () => {
    showSnackbar("Delete all player...", "success");
  };

  return (
    <div className="bg-gray-100 p-4 text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-white md:p-6 lg:p-8">
      <style>
        {`
          input::placeholder {
            color: #fff;
            opacity: 0.7;
          }
        `}
      </style>

      <div className="flex flex-col items-center justify-between px-4 py-4 md:flex-row md:px-6 md:py-5">
        <div className="text-dark mb-4 text-2xl font-medium md:mb-0 md:text-3xl">
          Players
        </div>
        <div className="text-dark text-md mb-4 font-semibold md:mb-0 md:text-xl">
          <span className="text-md text-[#6E6DFE]">Total Chips: </span>
          <span className="text-md pl-1 text-[#6E6DFE]">10,000</span>
        </div>
        <div className="flex w-full items-center space-x-4 md:w-auto">
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

            {/* Backdrop for Dropdown */}
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

          <div className="cursor-pointer rounded-xl bg-[#6E6DFE] px-4 py-2 text-white transition-colors duration-200 hover:bg-[#5a59da]">
            <button className="focus:outline-none">
              <button
                onClick={HandleDeleteAllPlayer}
                className="flex items-center"
              >
                <LuTrash className="mr-1 h-4 w-4" />
                <span className="text-md">Delete All</span>
              </button>
            </button>
          </div>
        </div>
      </div>

      <PlayerTable />
    </div>
  );
}

export default Players;