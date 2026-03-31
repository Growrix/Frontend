"use client";

import * as React from "react";

import { Button } from "../primitives/Button";
import { cx } from "../utils/cx";

export type PaginationProps = {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  pageSize?: number;
  pageSizeOptions?: number[];
  onPageSizeChange?: (size: number) => void;
  className?: string;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function buildPages(current: number, total: number): Array<number | "ellipsis"> {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages: Array<number | "ellipsis"> = [1];
  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);
  if (left > 2) pages.push("ellipsis");
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < total - 1) pages.push("ellipsis");
  pages.push(total);
  return pages;
}

export function Pagination({ page, pageCount, onPageChange, pageSize, pageSizeOptions, onPageSizeChange, className }: PaginationProps) {
  const safePageCount = Math.max(1, Math.floor(pageCount));
  const safePage = clamp(Math.floor(page), 1, safePageCount);
  const pages = React.useMemo(() => buildPages(safePage, safePageCount), [safePage, safePageCount]);

  return (
    <nav className={cx("ui-pagination", className)} aria-label="Pagination">
      <div className="ui-row">
        <Button size="sm" variant="secondary" onClick={() => onPageChange(clamp(safePage - 1, 1, safePageCount))} disabled={safePage <= 1}>
          Prev
        </Button>

        <div className="ui-pagination__pages" role="list">
          {pages.map((p, i) =>
            p === "ellipsis" ? (
              <span key={`e${i}`} className="ui-pagination__ellipsis" aria-hidden="true">&hellip;</span>
            ) : (
              <Button
                key={p}
                size="sm"
                variant={p === safePage ? "primary" : "secondary"}
                onClick={() => onPageChange(p)}
                aria-current={p === safePage ? "page" : undefined}
              >
                {p}
              </Button>
            )
          )}
        </div>

        <Button size="sm" variant="secondary" onClick={() => onPageChange(clamp(safePage + 1, 1, safePageCount))} disabled={safePage >= safePageCount}>
          Next
        </Button>

        {pageSizeOptions && onPageSizeChange ? (
          <select
            className="ui-pagination__size"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            aria-label="Items per page"
          >
            {pageSizeOptions.map((s) => (
              <option key={s} value={s}>{s} / page</option>
            ))}
          </select>
        ) : null}
      </div>
    </nav>
  );
}
