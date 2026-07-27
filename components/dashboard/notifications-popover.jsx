"use client";

import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { Bell, CheckCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  useMarkAllNotificationsRead,
  useMarkNotificationRead,
} from "@/hooks/use-mark-notification-read";
import { useNotifications } from "@/hooks/use-notifications";
import { cn } from "@/lib/utils";

export function NotificationsPopover() {
  const { data: notifications = [] } = useNotifications();
  const markAsRead = useMarkNotificationRead();
  const markAllAsRead = useMarkAllNotificationsRead();

  const unreadCount = notifications.filter((notification) => !notification.read).length;

  return (
    <Popover>
      <PopoverTrigger
        render={
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex size-9 cursor-pointer items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold hover:bg-gold/20"
          >
            <Bell className="size-4.5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex size-4.5 items-center justify-center rounded-full bg-destructive text-[10px] font-semibold text-destructive-foreground">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>
        }
      />
      <PopoverContent className="w-80 p-0" align="end">
        <PopoverHeader className="flex-row items-center justify-between px-3 pt-3">
          <PopoverTitle>Notifications</PopoverTitle>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 gap-1 px-2 text-xs"
              onClick={() => markAllAsRead.mutate()}
            >
              <CheckCheck className="size-3.5" />
              Tout marquer lu
            </Button>
          )}
        </PopoverHeader>

        <div className="flex max-h-80 flex-col overflow-y-auto px-1 pb-2">
          {notifications.length === 0 && (
            <p className="px-2 py-6 text-center text-sm text-muted-foreground">
              Aucune notification pour le moment.
            </p>
          )}
          {notifications.map((notification) => (
            <button
              key={notification.id}
              type="button"
              onClick={() => !notification.read && markAsRead.mutate(notification.id)}
              className={cn(
                "flex flex-col gap-1 rounded-md px-2 py-2 text-left text-sm hover:bg-muted",
                !notification.read && "bg-gold/5",
              )}
            >
              <span className="flex items-start gap-2">
                {!notification.read && (
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" />
                )}
                <span className={cn(!notification.read && "font-medium text-foreground")}>
                  {notification.message}
                </span>
              </span>
              <span className="pl-3.5 text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(notification.createdAt), {
                  addSuffix: true,
                  locale: fr,
                })}
              </span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
