import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Adminheader from "../components/Adminheader"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getAdminStatsAPI, getAdminInboxAPI } from "../../../services/allAPIs"

function Admindashboard() {
  const [usersData, setUsersData] = useState([])
  const [artworksData, setArtworksData] = useState([])
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalArtworks, setTotalArtworks] = useState(0)
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = sessionStorage.getItem("token")
        if (!token) {
          navigate("/login")
          return
        }

        const statsRes = await getAdminStatsAPI(token)
        const { usersPerMonth, artworksPerMonth, totalUsers, totalArtworks } =
          statsRes.data;

       
        const months = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ];

        const formatChartData = (dataKey, monthlyData) =>
          months.map((month, index) => {
            const monthData = monthlyData.find((m) => m._id === index + 1)
            return { month, [dataKey]: monthData ? monthData.count : 0 }
          });

        setUsersData(formatChartData("users", usersPerMonth))
        setArtworksData(formatChartData("artworks", artworksPerMonth))
        setTotalUsers(totalUsers)
        setTotalArtworks(totalArtworks)

        const inboxRes = await getAdminInboxAPI(token)
        const notifications = inboxRes.data || []
        const unread = notifications.filter((n) => n.status !== "read").length
        setUnreadCount(unread)

      } catch (err) {
        console.error("Error fetching dashboard data:", err)
      } finally {
        setLoading(false)
      }
    };

    fetchDashboardData()
  }, [navigate])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-black">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="bg-white text-white min-h-screen">
      <Adminheader />
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-200 shadow-lg p-6 flex flex-col h-screen">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>
          <nav className="flex flex-col space-y-4">
            <button
              className="relative text-gray-700 hover:bg-gray-100 px-4 py-2 rounded flex items-center justify-between"
              onClick={() => navigate("/admin-profile")}
            >
              Profile
            </button>

            <button
              className="relative text-gray-700 hover:bg-gray-100 px-4 py-2 rounded flex items-center justify-between"
              onClick={() => navigate("/admin-inbox")}
            >
              Inbox
              {unreadCount > 0 && (
                <span className="ml-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>

            <button
              className="relative text-gray-700 hover:bg-gray-100 px-4 py-2 rounded flex items-center justify-between"
              onClick={() => {
                sessionStorage.removeItem("token");
                navigate("/login");
              }}
            >
              Logout
            </button>
          </nav>
        </aside>

        {/* Main Dashboard */}
        <main className="flex-1 p-6">
          {/* Top Stats */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            <div className="bg-gray-800 p-6 rounded-xl shadow">
              <h3 className="text-lg">Total Users</h3>
              <p className="text-2xl font-bold">{totalUsers}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl shadow">
              <h3 className="text-lg">Total Artworks</h3>
              <p className="text-2xl font-bold">{totalArtworks}</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-xl shadow">
              <h2 className="mb-4">Users Joined per Month</h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={usersData}>
                  <XAxis dataKey="month" stroke="#ffffff" />
                  <YAxis stroke="#ffffff" />
                  <Tooltip />
                  <Bar dataKey="users" fill="#b30e5bff" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl shadow">
              <h2 className="mb-4">Artworks Posted per Month</h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={artworksData}>
                  <XAxis dataKey="month" stroke="#ffffff" />
                  <YAxis stroke="#ffffff" />
                  <Tooltip />
                  <Bar dataKey="artworks" fill="#e092cdff" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Admindashboard;
