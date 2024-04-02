import { Link } from "@remix-run/react";
import { urlTransform } from "@vert-capital/common";
import {
  DataTableHeader,
  Icons,
  type RT,
} from "@vert-capital/design-system-ui";
import routes from "~/common/routes";

import { EdgeTableModel } from "~/models/edge.model";

export const columns: RT.ColumnDef<EdgeTableModel>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableHeader title="ID" column={column} />,
    cell: ({ row }) => {
      const id: string = row.getValue("id");
      return (
        <div className="flex justify-start items-center space-x-2">
          <div title={id} className="w-[200px]">
            {id}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "source",
    header: ({ column }) => <DataTableHeader title="Source" column={column} />,
    cell: ({ row }) => {
      const source = row.getValue("source") as string;
      return (
        <div className="line-clamp-1 min-w-[150px]" title="Tem visão sistêmica">
          {source}
        </div>
      );
    },
  },
  {
    accessorKey: "target",
    header: ({ column }) => <DataTableHeader title="Target" column={column} />,
    cell: ({ row }) => {
      const target = row.getValue("target") as string;
      return (
        <div className="line-clamp-1 min-w-[150px]" title="Tem visão sistêmica">
          {target}
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: ({ column }) => <DataTableHeader title="" column={column} />,
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <div className="relative w-full flex justify-end items-center space-x-2">
          <div className="absolute right-8 p-1.5 rounded-full hover:bg-brand/10 cursor-pointer">
            <Link
              title="Editar"
              to={urlTransform({
                url: routes.edges.detail,
                params: {
                  id: id,
                },
              })}
            >
              <Icons.ExternalLink className="h-4 w-4 stroke-brand" />
            </Link>
          </div>
          <div
            className="absolute right-1 p-1.5 rounded-full hover:bg-destructive/10 group cursor-pointer"
            title="Excluir"
          >
            <Icons.Trash2 className="h-4 w-4 stroke-brand group-hover:stroke-destructive" />
          </div>
        </div>
      );
    },
  },
];
