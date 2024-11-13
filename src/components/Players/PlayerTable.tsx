"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef } from "ag-grid-community";
import Image from "next/image";
import { CiClock2, CiMail } from "react-icons/ci";
import { FaCalendarAlt } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import CustomTable from "../common/Table/CustomTable";
import { getUnBlockUser } from "@/api/api";

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

export default function PlayerTable({
  setPlayerModel,
  setTotalChips = "",
}: {
  setPlayerModel: Dispatch<SetStateAction<any>>;
  setTotalChips: any;
}) {
  const [rowData, setRowData] = useState<RowData[]>([]);
  const [isBlocked] = useState<boolean>(false);

  useEffect(() => {
    fetchUserData();
  }, [isBlocked]);

  const fetchUserData = async () => {
    try {
      const response = await getUnBlockUser();
      const mappedData = response.map((user: any) => ({
        name: user.name,
        invoiceId: user._id,
        chips: user.chips_balance,
        loginType: user.login_type,
        version: user.version,
        lastLogin: new Date(user.last_login).toLocaleDateString(),
        createdAt: new Date(user.created_at).toLocaleDateString(),
        email: user.email,
      }));
      const TotalChips = response.reduce(
        (sum: number, user: any) => sum + user.chips_balance,
        0,
      );
      setTotalChips(TotalChips);
      setRowData(mappedData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const columnDefs: Array<ColDef<RowData>> = [
    {
      field: "name",
      headerName: "Name",
      width: 120,
      minWidth: 120,
      maxWidth: 140,
      cellRenderer: (params: any) => <span>{params.value}</span>,
    },
    {
      field: "invoiceId",
      headerName: "Invoice Id",
      width: 210,
      minWidth: 210,
      maxWidth: 230,
    },
    {
      field: "chips",
      headerName: "Chips",
      width: 90,
      minWidth: 90,
      maxWidth: 100,
    },
    {
      field: "loginType",
      headerName: "Login type",
      width: 120,
      minWidth: 120,
      maxWidth: 140,
    },
    {
      field: "version",
      headerName: "Version",
      width: 120,
      minWidth: 120,
      maxWidth: 140,
    },
    {
      field: "lastLogin",
      headerName: "Last Login",
      width: 130,
      minWidth: 130,
      maxWidth: 140,
      cellRenderer: (params: any) => (
        <div className="flex items-center gap-2">
          <CiClock2 className="h-4 w-4 text-green-500" />
          <span>{params.value}</span>
        </div>
      ),
    },
    {
      field: "createdAt",
      headerName: "Created at",
      width: 150,
      minWidth: 150,
      maxWidth: 170,
      cellRenderer: (params: any) => (
        <div className="flex items-center gap-2">
          <FaCalendarAlt className="h-4 w-4 text-green-500" />
          <span>{params.value}</span>
        </div>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 170,
      minWidth: 170,
      maxWidth: 220,
      cellRenderer: (params: any) => (
        <div className="flex items-center gap-2">
          <CiMail className="h-4 w-4 text-blue-500" />
          <span>{params.value}</span>
        </div>
      ),
    },
    {
      headerName: "Action",
      width: 130,
      minWidth: 100,
      maxWidth: 150,
      cellRenderer: (params: any) => (
        <button className="text-gray-400 hover:text-gray-600">
          <FiMoreHorizontal
            className="h-5 w-5"
            onClick={() => {
              setPlayerModel({
                open: true,
                userId: params.data.invoiceId,
                name: params.data.name,
              });
            }}
          />
        </button>
      ),
      cellStyle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        textAlign: "center",
      },
    },
  ];

  return <CustomTable rowData={rowData} columnDefs={columnDefs} />;
}
