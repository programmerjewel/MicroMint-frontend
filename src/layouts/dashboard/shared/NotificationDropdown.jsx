import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FiBell, FiCheckCircle } from "react-icons/fi";
import useNotifications from "@/hooks/useNotifications";

const NotificationDropdown = ({ userEmail }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Destructured the improved bulk read mutation hook features
  const { notifications, isLoading, markAsRead, markAllAsRead } = useNotifications(userEmail);
  
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Click outside handler updated to pointerdown for uniform mobile/desktop touch response
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("pointerdown", handleClickOutside);
    return () => document.removeEventListener("pointerdown", handleClickOutside);
  }, []);

  const handleItemClick = (e, item) => {
    e.preventDefault();
    e.stopPropagation();

    setIsOpen(false);

    // Navigate immediately for responsive UX
    if (item.action_route) {
      navigate(item.action_route);
    }

    // Mark as read in the background if unread
    if (!item.isRead) {
      markAsRead(item._id);
    }
  };

  const handleMarkAllRead = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (unreadCount > 0) {
      markAllAsRead();
    }
  };

  return (
    <div className="relative h-full flex items-center" ref={dropdownRef}>
      <Button
        type="button"
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle notifications feed"
        aria-expanded={isOpen}
        className="flex flex-col items-center gap-0 h-full px-6 rounded-none border-l dark:border-neutral-800 relative hover:bg-accent hover:text-accent-foreground focus-visible:ring-1 focus-visible:ring-ring"
      >
        <FiBell className="h-6 w-6 text-muted-foreground dark:text-neutral-300" />
        {unreadCount > 0 && (
          <span className="absolute top-4 left-5 grid h-4 w-4 place-items-center rounded-full bg-destructive text-[10px] font-semibold leading-none text-white animate-in zoom-in duration-200">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-80 bg-popover text-popover-foreground border dark:border-neutral-800 rounded-md shadow-lg z-50 overflow-hidden flex flex-col max-h-96 dark:shadow-2xl dark:shadow-black/40">
          <div className="px-4 py-2.5 border-b dark:border-neutral-800 bg-muted/40 font-semibold text-sm flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <span>Notifications</span>
              {unreadCount > 0 && (
                <span className="text-xs bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary px-2 py-0.5 rounded-full font-medium">
                  {unreadCount} New
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="text-xs text-muted-foreground hover:text-primary dark:hover:text-primary-foreground flex items-center gap-1 transition-colors outline-none focus-visible:underline"
              >
                <FiCheckCircle className="w-3.5 h-3.5" />
                Mark all read
              </button>
            )}
          </div>

          <div className="overflow-y-auto divide-y divide-border dark:divide-neutral-800">
            {isLoading && notifications.length === 0 && (
              <p className="text-center py-6 text-xs text-muted-foreground font-medium">
                Loading account updates...
              </p>
            )}

            {!isLoading && notifications.length === 0 && (
              <div className="text-center py-8 px-4">
                <p className="text-sm font-medium text-muted-foreground">Your feed is clean!</p>
                <p className="text-xs text-muted-foreground/60 mt-1">No past history found.</p>
              </div>
            )}

            {notifications.map((item) => (
              <button
                key={item._id}
                type="button"
                onClick={(e) => handleItemClick(e, item)}
                className={`w-full text-left p-3.5 transition-colors duration-150 flex gap-3 text-xs outline-none focus-visible:bg-muted ${
                  item.isRead
                    ? "bg-popover hover:bg-muted/40 dark:hover:bg-muted/20"
                    : "bg-muted/80 hover:bg-muted dark:bg-muted/30 dark:hover:bg-muted/50 font-medium"
                }`}
              >
                <div className="shrink-0 mt-1">
                  <span
                    className={`block h-2 w-2 rounded-full ${
                      item.isRead 
                        ? "bg-muted-foreground/30" 
                        : "bg-amber-500 dark:bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                    }`}
                  ></span>
                </div>

                <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                  <h4
                    className={`text-xs truncate ${
                      item.isRead ? "text-foreground/80 dark:text-neutral-300" : "font-bold text-foreground dark:text-neutral-50"
                    }`}
                  >
                    {item.title}
                  </h4>
                  <p className="text-muted-foreground dark:text-neutral-400 text-xs leading-normal line-clamp-2 font-normal wrap-break-word">
                    {item.message}
                  </p>
                  <span className="text-[10px] text-muted-foreground/50 dark:text-neutral-500 font-medium block mt-1">
                    {item.timestamp ? new Date(item.timestamp).toLocaleString(undefined, {
                      dateStyle: "short",
                      timeStyle: "short",
                    }) : "Just now"}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;