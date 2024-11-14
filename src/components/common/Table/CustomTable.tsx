import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef } from "ag-grid-community";
import Loader from "../Loader";

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

interface CustomBlockedPlayerTableProps {
  rowData: RowData[];
  columnDefs: ColDef<RowData>[];
  defaultColDef?: ColDef<RowData>;
}

const CustomTable: React.FC<CustomBlockedPlayerTableProps> = ({
  rowData,
  columnDefs,
  defaultColDef,
}) => {
  return (
    <div className="ag-theme-alpine-dark h-[400px] w-full overflow-x-auto">
      <style jsx global>{`
        .ag-theme-alpine-dark {
          --ag-background-color: #ffffff;
          --ag-header-background-color: #f1f5f9;
          --ag-header-foreground-color: #000;
          --ag-foreground-color: #111827;
          --ag-border-color: #d1d5db;
        }
        .dark .ag-theme-alpine-dark {
          --ag-background-color: #1a1a2e;
          --ag-header-background-color: #333;
          --ag-header-foreground-color: #ffffff;
          --ag-foreground-color: #d1d5db;
          --ag-border-color: #444;
        }
        .ag-theme-alpine-dark .ag-header-cell,
        .ag-theme-alpine-dark .ag-cell {
          padding: 6px 8px;
          border-bottom: 1px solid var(--ag-border-color);
          font-weight: bold;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ag-header-cell-label {
          justify-content: center;
        }

        .ag-theme-alpine-dark .ag-body-viewport,
        .ag-theme-alpine-dark .ag-body-horizontal-scroll-viewport,
        .ag-theme-alpine-dark .ag-body-vertical-scroll-viewport {
          overflow: hidden !important;
        }
        .ag-theme-alpine-dark .ag-row {
          min-height: 30px;
          background-color: var(--ag-background-color);
        }

        /* Media Queries for Responsiveness */
        @media (max-width: 768px) {
          .ag-theme-alpine-dark .ag-header-cell,
          .ag-theme-alpine-dark .ag-cell {
            font-size: 12px; /* Smaller font size on small screens */
            padding: 4px 6px; /* Adjust padding */
          }
        }

        @media (max-width: 480px) {
          .ag-theme-alpine-dark .ag-header-cell,
          .ag-theme-alpine-dark .ag-cell {
            font-size: 10px; /* Even smaller font size for extra small screens */
            padding: 2px 4px; /* Adjust padding */
          }
        }
      `}</style>

      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={{
          sortable: true,
          flex: 1,
          filter: true,
          minWidth: 200,
          ...defaultColDef,
        }}
        animateRows={true}
        enableCellTextSelection={true}
        overlayNoRowsTemplate="<span>Loading...</span>"
      />
    </div>
  );
};

export default CustomTable;
