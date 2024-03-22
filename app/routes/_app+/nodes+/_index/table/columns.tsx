import { Link } from '@remix-run/react';
import { urlTransform } from '@vert-capital/common';
import {
  DataTableHeader,
  Icons,
  type RT
} from '@vert-capital/design-system-ui';
import routes from '~/common/routes';

import { NodeTableModel } from '~/models/node.model';

export const columns: RT.ColumnDef<NodeTableModel>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableHeader title="Nó" column={column} />
    ),
    cell: ({ row }) => {
      const label: string = row.getValue('name');
      return (
        <div className="flex justify-start items-center space-x-2">
          <div title={label} className="w-[180px] truncate">
            {label}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableHeader title="Tipo" column={column} />
    ),
    cell: ({ row }) => {
      const type = row.getValue('type') as string;
      return (
        <div className="line-clamp-1 min-w-[150px]" title="Tipo de nó">
          {type}
        </div>
      );
    },
  },
  {
    accessorKey: 'action',
    header: ({ column }) => <DataTableHeader title="" column={column} />,
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <div className="relative w-full flex justify-end items-center space-x-2">
          <div className="absolute right-8 p-1.5 rounded-full hover:bg-brand/10 cursor-pointer">
            <Link
              title="Editar"
              to={urlTransform({
                url: routes.node.detail,
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