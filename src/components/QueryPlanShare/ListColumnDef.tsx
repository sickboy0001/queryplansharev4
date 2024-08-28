"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TypeQpsQueryPlan } from "@/app/types/QPS";
import { format } from "date-fns";
import { ImageIcon } from "@radix-ui/react-icons";
import Link from "next/link";
// import { format } from "date-fns";

export const columns: ColumnDef<TypeQpsQueryPlan>[] = [
  {
    accessorKey: "cmd",
    header: "cmd",
    cell: ({ row }) => {
      const original = row.original;
      return (
        <>
          <Button className="" variant="outline">
            <a href={`/QueryPlanShare/view/?id=${row.getValue("id")}`}>View</a>
          </Button>
        </>
      );
    },
  },

  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "title",
    header: "タイトル",
  },
  {
    accessorKey: "xml",
    header: "xml",
    cell: ({ row }) => {
      return (
        <>
          {!row.getValue("xml")
            ? ""
            : (row.getValue("xml") as string).slice(0, 100)}
        </>
      );
    },
  },
  {
    accessorKey: "create_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          更新日
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const original = row.original;
      return <>{format(row.getValue("create_at"), "yyyy-MM-dd HH:mm:ss")}</>;
    },
  },
];
