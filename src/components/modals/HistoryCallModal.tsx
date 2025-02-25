"use client";

import { X } from "lucide-react";
import dayjs from "dayjs";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { DataTable } from "../dashboard/DataTable";

interface HistoryCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  historyData: any[];
}

type HistoryType = {
  userName: string;
  newValue: string;
  createdOn: string;
};

const HistoryCallModal = ({ isOpen, onClose, historyData }: HistoryCallModalProps) => {
  if (!isOpen) return null;

  const tableData = useMemo(() => {
    const data = historyData.flatMap((item) =>
      item.auditChanges.map((change: any) => ({
        userName: item.userName || "Usuário desconhecido",
        newValue: change.newValue,
        createdOn: dayjs(item.createdOn).format("DD/MM/YYYY HH:mm"),
        rawCreatedOn: item.createdOn,
      }))
    );

    return data.sort((a, b) => dayjs(b.rawCreatedOn).unix() - dayjs(a.rawCreatedOn).unix());
  }, [historyData]);

  const columns: ColumnDef<HistoryType>[] = [
    {
      accessorKey: "userName",
      header: "Responsável",
      cell: ({ row }) => row.original.userName,
    },
    {
      accessorKey: "newValue",
      header: "Situação",
      cell: ({ row }) => row.original.newValue,
    },
    {
      accessorKey: "createdOn",
      header: "Data",
      cell: ({ row }) => row.original.createdOn,
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-white p-6 rounded-lg w-11/12 md:w-4/5 lg:w-3/4 xl:w-3/4 relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full">
          <X className="w-5 h-5 text-gray-700" />
        </button>
        <h2 className="text-xl font-semibold mb-4">Histórico de Alterações</h2>
        <div className="flex-1 overflow-y-auto">
          <DataTable columns={columns} data={tableData} bgColor="bg-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default HistoryCallModal;
