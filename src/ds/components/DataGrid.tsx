"use client";

import * as React from "react";

import { Pagination } from "./Pagination";
import { BulkActionsToolbar, type BulkAction } from "./BulkActionsToolbar";
import { DataTable, type DataTableColumn, type DataTableSort } from "./DataTable";
import { Input } from "../primitives/Input";
import { Stack } from "../primitives/Stack";

export type DataGridProps<T> = {
  rows: T[];
  columns: Array<DataTableColumn<T>>;
  getRowId: (row: T) => string;
  caption?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchFn?: (row: T, query: string) => boolean;
  pageSize?: number;
  bulkActions?: BulkAction[];
  className?: string;
};

function collectSearchText(value: unknown, bucket: string[], depth = 0) {
  if (value == null || depth > 2) return;

  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    bucket.push(String(value));
    return;
  }

  if (value instanceof Date) {
    bucket.push(value.toISOString());
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => collectSearchText(item, bucket, depth + 1));
    return;
  }

  if (typeof value === "object") {
    Object.values(value as Record<string, unknown>).forEach((item) => collectSearchText(item, bucket, depth + 1));
  }
}

function defaultSearch(row: unknown, query: string) {
  const bucket: string[] = [];
  collectSearchText(row, bucket);
  return bucket.join(" ").toLowerCase().includes(query);
}

export function DataGrid<T>({
  rows,
  columns,
  getRowId,
  caption,
  searchable,
  searchPlaceholder = "Search…",
  searchFn,
  pageSize = 10,
  bulkActions,
  className,
}: DataGridProps<T>) {
  const [query, setQuery] = React.useState("");
  const [sort, setSort] = React.useState<DataTableSort | null>(null);
  const [selectedRowIds, setSelectedRowIds] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(1);

  const filtered = React.useMemo(() => {
    if (!searchable || !query.trim()) return rows;
    const q = query.trim().toLowerCase();
    const fn = searchFn ?? ((row: T, qq: string) => defaultSearch(row, qq));
    return rows.filter((r) => fn(r, q));
  }, [rows, query, searchable, searchFn]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const start = (currentPage - 1) * pageSize;
  const paged = filtered.slice(start, start + pageSize);

  React.useEffect(() => {
    setPage(1);
    setSelectedRowIds([]);
  }, [query]);

  return (
    <div className={className}>
      <Stack gap="compact">
        {searchable ? <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={searchPlaceholder} /> : null}
        {bulkActions && bulkActions.length > 0 && selectedRowIds.length > 0 ? (
          <BulkActionsToolbar
            selectedCount={selectedRowIds.length}
            actions={bulkActions.map((a) => ({ ...a, onClick: a.onClick }))}
            onClear={() => setSelectedRowIds([])}
          />
        ) : null}

        <DataTable
          className="ui-gridtable"
          caption={caption}
          rows={paged}
          columns={columns}
          getRowId={getRowId}
          sort={sort ?? undefined}
          onSortChange={setSort}
          selectable
          selectedRowIds={selectedRowIds}
          onSelectedRowIdsChange={setSelectedRowIds}
          empty={query ? "No matches." : "No rows."}
        />

        <Pagination page={currentPage} pageCount={pageCount} onPageChange={setPage} />
      </Stack>
    </div>
  );
}
