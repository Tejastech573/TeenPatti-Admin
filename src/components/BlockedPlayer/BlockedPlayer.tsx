import React from "react";
import BlockedPlayerTable from "./BlockedPlayerTable";
import { CiSettings } from "react-icons/ci";
import { HiMagnifyingGlass } from "react-icons/hi2";

function BlockedPlayer() {
  return (
    <div className="mx-4 mt-5">
      <style>
        {`
          input::placeholder {
            color: #fff;
            opacity: 0.7;
          }
        `}
      </style>

      <div className="flex flex-col items-center justify-between px-4 py-4 md:flex-row md:px-6 md:py-5">
        <div className="text-dark mb-4 text-2xl font-semibold md:mb-0 md:text-3xl">
          Blocked Player
        </div>

        {/* Search Bar and Settings */}
        <div className="flex w-full items-center space-x-4 md:w-auto">
          {/* Search Form */}
          <form
            action="https://formbold.com/s/unique_form_id"
            method="POST"
            className="w-full md:w-auto"
          >
            <div className="relative w-full md:w-64 lg:w-[350px]">
              {/* Search Icon */}
              <button className="absolute left-3 top-1/2 -translate-y-1/2 transform">
                <HiMagnifyingGlass className="h-5 w-5 text-white" />
              </button>

              <input
                type="text"
                placeholder="Search"
                className="w-full rounded-lg bg-gray-400 py-3 pl-10 pr-4 text-white focus:outline-none"
              />
            </div>
          </form>

          {/* Settings Icon */}
          <div className="cursor-pointer rounded-xl bg-gray-400 p-2.5 text-white">
            <CiSettings className="h-6 w-6 md:h-7 md:w-7" />
          </div>
        </div>
      </div>
      <BlockedPlayerTable />
    </div>
  );
}

export default BlockedPlayer;