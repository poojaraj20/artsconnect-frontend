import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Button } from "flowbite-react";
import {
  getInboxNotificationsAPI,
  markNotificationReadAPI,
} from "../../../services/allAPIs"; // adjust path if needed

const Inbox = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) return;

        const res = await getInboxNotificationsAPI(token);
        setNotifications(res.data);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleMarkRead = async (notifId) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return;

      await markNotificationReadAPI(notifId, token);

      // Update state locally
      setNotifications((prev) =>
        prev.map((notif) =>
          notif._id === notifId ? { ...notif, read: true } : notif
        )
      );
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  if (loading)
    return <div className="text-center mt-20">Loading notifications...</div>;

  return (
    <div>
      <Header />

      <div className="max-w-4xl mx-auto p-6 bg-white m-20 rounded-lg shadow-2xl">
        <h2 className="text-2xl font-bold mb-6">Inbox</h2>

        {notifications.length === 0 ? (
          <p className="text-gray-500">No notifications</p>
        ) : (
          notifications.map((notif) => {
            const profileImageUrl =
              notif.fromUser?.profile?.startsWith("http")
                ? notif.fromUser.profile
                : notif.fromUser?.profile
                ? `http://localhost:5000${notif.fromUser.profile}`
                : "https://static.vecteezy.com/system/resources/previews/009/734/564/non_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg";

            return (
              <div
                key={notif._id}
                className={`flex gap-4 p-4 mb-4 border rounded-lg ${
                  notif.read ? "bg-gray-100" : "bg-blue-50"
                }`}
              >
                {/* User profile */}
                <img
                  src={profileImageUrl}
                  alt={notif.fromUser?.username || "User"}
                  className="w-14 h-14 rounded-full object-cover"
                />

                {/* Notification content */}
                <div className="flex-1">
                  <p className="mb-1 font-semibold">
                    {notif.fromUser?.username || "Someone"}
                  </p>
                  <p className="text-gray-700 mb-2">{notif.message}</p>

                  {notif.artwork?.images?.length > 0 && (
                    <img
                      src={`http://localhost:5000${notif.artwork.images[0].url}`}
                      alt={notif.artwork.caption}
                      className="w-24 h-24 rounded-md object-cover"
                    />
                  )}

                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(notif.createdAt).toLocaleString()}
                  </p>
                </div>

                {/* Action */}
                <Button
                  size="sm"
                  color="purple"
                  onClick={() => handleMarkRead(notif._id)}
                >
                  Mark Read
                </Button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Inbox;
