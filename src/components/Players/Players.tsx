"use client";
import React, { useEffect, useState } from "react";
import PlayerTable from "./PlayerTable";
import { LuTrash } from "react-icons/lu";
import { GoChevronDown } from "react-icons/go";
import useSnackbar from "@/hooks/useSnackbar";
import Menu from "../Players/Menu";
import { getUnBlockUser, PlayerNameUpdate, UserBlock } from "@/api/api";

function Players() {
  const [playerUserName, setPlayerUserName] = useState("");
  const [totalChips, setTotalChips] = useState<string>("0");
  const [rowData, setRowData] = useState<any[]>([]);
  const [playerModel, setPlayerModel] = useState<{
    open: boolean;
    userId?: string;
    name?: string;
  }>({ open: false });
  const { showSnackbar } = useSnackbar();

  const handleDeleteAllPlayers = () =>
    showSnackbar("Deleted all players...", "success");

  const handleUpdatePlayerName = async () => {
    if (playerModel.userId) {
      await PlayerNameUpdate(playerUserName, playerModel.userId);
      setPlayerModel({ open: false });
      showSnackbar("Player name updated successfully.", "success");
      setRowData((prev) =>
        prev.map((player) =>
          player.invoiceId === playerModel.userId
            ? { ...player, name: playerUserName }
            : player,
        ),
      );
    }
  };

  const handleBlockUser = async () => {
    if (playerModel.userId) {
      const response = await UserBlock(playerModel.userId);
      showSnackbar(response.message, "default");
    }
  };

  const fetchUserData = async () => {
    try {
      const users = await getUnBlockUser();
      const data = users.map((user: any) => ({
        name: user.name,
        invoiceId: user._id,
        chips: user.chips_balance,
        loginType: user.login_type,
        version: user.version,
        lastLogin: new Date(user.last_login).toLocaleDateString(),
        createdAt: new Date(user.created_at).toLocaleDateString(),
        email: user.email,
      }));
      setTotalChips(
        users.reduce((sum: any, user: any) => sum + user.chips_balance, 0),
      );
      setRowData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const DropdownMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen((prev) => !prev);

    return (
      <div className="relative inline-block">
        <button
          onClick={toggleMenu}
          className="dark:bg-white-800 inline-flex items-center rounded-lg border border-gray-400 bg-white px-5 py-2 text-center text-sm font-medium text-black transition duration-300 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:text-black dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          type="button"
        >
          All <GoChevronDown className="ms-1 h-6 w-6" />
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-transparent"
              onClick={() => setIsOpen(false)}
            ></div>

            <div className="absolute z-50 mt-2 w-48 rounded-md bg-white shadow-lg dark:bg-gray-800">
              <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                {["Option 1", "Option 2", "Option 3"].map((option) => (
                  <li
                    key={option}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => {
                      console.log(`Selected: ${option}`);
                      setIsOpen(false);
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-white md:p-4 lg:p-6">
      {playerModel.open && (
        <Menu
          isBlock
          name={playerModel.name}
          openPopUp={playerModel.open}
          closePopUp={() => setPlayerModel({ open: false })}
          HandleBlockUser={handleBlockUser}
          HandleUpdate={handleUpdatePlayerName}
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
          <DropdownMenu />
          <button
            onClick={handleDeleteAllPlayers}
            className="flex flex-shrink-0 items-center rounded-xl bg-[#6E6DFE] px-4 py-2 text-white transition-colors duration-200 hover:bg-[#5a59da]"
          >
            <LuTrash className="mr-1 h-4 w-4" />
            <span className="text-md">Delete All</span>
          </button>
        </div>
      </div>

      <PlayerTable setPlayerModel={setPlayerModel} rowData={rowData} />
    </div>
  );
}

export default Players;
