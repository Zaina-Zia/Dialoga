export type NotificationItem = {
  title: string;
  time: string;
  type?: "message" | "history";
};

export const mockNotifications: NotificationItem[] = [
  { title: "Title of notification", time: "15:45, Sep 05, 2025", type: "message" },
  { title: "Title of notification", time: "15:45, Sep 05, 2025", type: "history" },
  { title: "Title of notification", time: "15:45, Sep 05, 2025", type: "message" },
  { title: "Title of notification", time: "15:45, Sep 05, 2025", type: "message" },
];
