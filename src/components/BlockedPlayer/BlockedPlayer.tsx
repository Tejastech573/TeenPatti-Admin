"use client";
import React, { useEffect, useState } from "react";
import BlockedPlayerTable from "./BlockedPlayerTable";
import { CiSettings } from "react-icons/ci";
import { HiMagnifyingGlass } from "react-icons/hi2";
import DummyMenu from "./DummyMenu";
import { getBlockUser, UserUnBlock } from "@/api/api";
import useSnackbar from "@/hooks/useSnackbar";

interface RowData {
  name: string;
  invoiceId: string;
  chips: number;
  loginType: string;
  version: string;
  lastLogin: string;
  createdAt: string;
  email: string;
  avatar: string;
}

function BlockedPlayer() {
  const HandleUpdate = () => {
    alert("Update.");
  };

  const [rowData, setRowData] = useState<RowData[]>([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const [blockPlayerModel, setBlockPlayerModel] = useState<{
    open: boolean;
    userId?: string;
    name?: string;
  }>({ open: false });
  const { showSnackbar } = useSnackbar();

  const HandleUnBlockUser = async () => {
    if (blockPlayerModel.userId) {
      const response = await UserUnBlock(blockPlayerModel.userId);
      showSnackbar(response.message, "default");
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await getBlockUser();
      const mappedData = response.map((user: any) => ({
        name: user.name,
        invoiceId: user._id,
        chips: user.chips_balance,
        loginType: user.login_type,
        version: user.version,
        lastLogin: new Date(user.last_login).toLocaleDateString(),
        createdAt: new Date(user.created_at).toLocaleDateString(),
        email: user.email,
        avatar: "",
      }));
      setRowData(mappedData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

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
      {blockPlayerModel && (
        <DummyMenu
          isBlock={false}
          name={blockPlayerModel.name}
          openPopUp={blockPlayerModel.open}
          closePopUp={() => setBlockPlayerModel({ open: false })}
          HandleUnBlockUser={HandleUnBlockUser}
          HandleUpdate={HandleUpdate}
        />
      )}

      <div className="flex flex-col items-center justify-between px-4 py-4 md:flex-row md:px-6 md:py-5">
        <div className="text-xl font-semibold text-black md:text-2xl">
          Blocked Player
        </div>

        <div className="flex w-full items-center space-x-4 md:w-auto">
          <form
            action="https://formbold.com/s/unique_form_id"
            method="POST"
            className="w-full md:w-auto"
          >
            <div className="relative w-full md:w-64 lg:w-[350px]">
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

          <div className="cursor-pointer rounded-xl bg-gray-400 p-2.5 text-white">
            <CiSettings className="h-6 w-6 md:h-7 md:w-7" />
          </div>
        </div>
      </div>
      <BlockedPlayerTable
        rowData={rowData}
        setBlockPlayerModel={setBlockPlayerModel}
      />
    </div>
  );
}

export default BlockedPlayer;
