import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import "./Table.css";

const Table = ({ data, onEdit }) => {
  const columns = [
    {
      id: "name",
      header: "Entity",
      accessorKey: "name",
      cell: ({ getValue }) => (
        <span className="entity-link">{getValue()}</span>
      ),
    },
    {
      id: "gender",
      header: "Gender",
      accessorKey: "gender",
      cell: ({ getValue }) => {
        const val = getValue();
        return (
          <span className={`badge ${val.toLowerCase()}`}>
            {val}
          </span>
        );
      },
    },
    {
      id: "requestDate",
      header: "Request Date",
      accessorKey: "createdAt",
      cell: ({ getValue }) => {
        const date = getValue();
        if (!date) return <span className="date-cell">N/A</span>;
        try {
          return <span className="date-cell">{new Date(date).toLocaleDateString()}</span>;
        } catch {
          return <span className="date-cell">Invalid Date</span>;
        }
      },
    },
    {
      id: "country",
      header: "Country",
      accessorKey: "country",
      cell: ({ getValue }) => (
        <span className="country-cell">{getValue()}</span>
      ),
    },
    {
      id: "id",
      header: "ID",
      accessorKey: "id",
      cell: ({ getValue }) => (
        <span style={{ fontFamily: 'monospace', fontSize: '12px', color: '#6b7280' }}>
          #{getValue()}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <button className="edit-btn" onClick={() => onEdit(row.original)}>
          <span className="edit-btn-desktop">✏️ Edit</span>
          <span className="edit-btn-mobile">✏️</span>
        </button>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (!data || data.length === 0) {
    return (
      <div className="table-empty">
        No data available
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <div className="table-container">
        <table className="custom-table">
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    </div>
  );
};

export default Table;
