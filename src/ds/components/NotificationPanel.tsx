"use client";

import * as React from "react";

import { cx } from "../utils/cx";

export type NotificationItem = {
  id: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  timestamp?: React.ReactNode;
  read?: boolean;
};

export type NotificationPanelProps = {
  items: NotificationItem[];
  onMarkRead?: (id: string) => void;
  onMarkAllRead?: () => void;
  filter?: "all" | "unread";
  onFilterChange?: (filter: "all" | "unread") => void;
  className?: string;
};

export function NotificationPanel({ items, onMarkRead, onMarkAllRead, filter = "all", onFilterChange, className }: NotificationPanelProps) {
  const filtered = filter === "unread" ? items.filter((it) => !it.read) : items;

  return (
    <div className={cx("ui-notif-panel", className)}>
      <div className="ui-notif-panel__header">
        <span className="text-heading-5">Notifications</span>
        <div className="ui-row">
          {onFilterChange ? (
            <>
              <button type="button" className={cx("ui-notif-panel__filter", filter === "all" && "ui-notif-panel__filter--active")} onClick={() => onFilterChange("all")}>All</button>
              <button type="button" className={cx("ui-notif-panel__filter", filter === "unread" && "ui-notif-panel__filter--active")} onClick={() => onFilterChange("unread")}>Unread</button>
            </>
          ) : null}
          {onMarkAllRead ? (
            <button type="button" className="ui-notif-panel__action text-caption" onClick={onMarkAllRead}>Mark all read</button>
          ) : null}
        </div>
      </div>
      <ul className="ui-notif-panel__list">
        {filtered.length === 0 ? (
          <li className="ui-notif-panel__empty ui-text-muted text-body-small">No notifications.</li>
        ) : (
          filtered.map((it) => (
            <li key={it.id} className={cx("ui-notif-panel__item", !it.read && "ui-notif-panel__item--unread")}>
              {!it.read ? <span className="ui-notif-panel__dot" aria-hidden="true" /> : null}
              <div className="ui-notif-panel__content">
                <div className="text-body-small">{it.title}</div>
                {it.description ? <div className="text-caption ui-text-muted">{it.description}</div> : null}
                {it.timestamp ? <div className="text-micro ui-text-muted">{it.timestamp}</div> : null}
              </div>
              {!it.read && onMarkRead ? (
                <button type="button" className="ui-notif-panel__mark text-micro" onClick={() => onMarkRead(it.id)} aria-label="Mark as read">
                  &check;
                </button>
              ) : null}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
