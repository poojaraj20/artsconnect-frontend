import React, { useState, useEffect } from "react"
import Header from "../components/Adminheader"
import { Button } from "flowbite-react"


import {
  getProfileAPI,
  uploadProfileImageAPI,
  updateProfileAPI,
  changePasswordAPI,
} from "../../../services/allAPIs"

function Profile() {
  const [tab, setTab] = useState("profile")
  const [user, setUser] = useState(null)
  const [formData, setFormData] = useState({
    username: "",
    bio: "",
  });
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  
  useEffect(() => {
    const token = sessionStorage.getItem("token")
    if (!token) return;

    const fetchUser = async () => {
      try {
        const res = await getProfileAPI(token)
        setUser(res.data)
        setFormData({
          username: res.data.username || "",
          bio: res.data.bio || "",
        })
      } catch (err) {
        console.error("Error fetching user:", err)
      }
    };

    fetchUser()
  }, []);

  // Handle profile image upload
  const handleProfileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return;

    const formData = new FormData()
    formData.append("profile", file)

    const token = sessionStorage.getItem("token")

    try {
      const res = await uploadProfileImageAPI(formData, token)
      setUser(res.data)
      sessionStorage.setItem("existingUser", JSON.stringify(res.data))
    } catch (err) {
      console.error("Error uploading profile:", err);
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

 
  const handleSaveProfile = async () => {
    const token = sessionStorage.getItem("token")

    try {
      const res = await updateProfileAPI(formData, token)
      setUser(res.data)
      sessionStorage.setItem("existingUser", JSON.stringify(res.data))
      alert("Profile updated successfully!")
    } catch (err) {
      console.error("Error updating profile:", err)
    }
  }

  const handleSavePassword = async () => {
    
    if (passwordData.newPassword.length < 6) {
      alert("New password must be at least 6 characters.")
      return
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New password and Confirm password do not match.")
      return
    }

    try {
      const token = sessionStorage.getItem("token")

      const res = await changePasswordAPI(
        { newPassword: passwordData.newPassword },
        token
      )

      setPasswordData({ newPassword: "", confirmPassword: "" });
      alert(res.data?.message || "Password updated successfully. Please login again.")
    } catch (err) {
      console.error("Error changing password:", err)
      alert(err.response?.data?.message || "Failed to change password.")
    }
  }

  if (!user) return <div className="text-center mt-20">Loading...</div>

  const profileImageUrl =
    user.profile && user.profile.startsWith("http")
      ? user.profile
      : user.profile
      ? `http://localhost:5000${user.profile}`
      : "https://static.vecteezy.com/system/resources/previews/009/734/564/non_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg"

  return (
    <div>
      <Header />

      <div className="max-w-4xl mx-auto p-6 bg-white m-20 rounded-lg shadow-2xl">
        {/* Profile Header */}
        <div className="flex items-center gap-6 mb-6">
          <div className="relative">
            <img
              src={profileImageUrl}
              alt="profile"
              className="rounded-full w-54 h-50 object-cover"
            />
            {/* Upload Button */}
            <label
              className="absolute bottom-0 right-0 text-white text-xs px-2 py-1 rounded cursor-pointer"
              style={{ backgroundColor: "#9e085d" }}
            >
              Upload
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfileUpload}
              />
            </label>
          </div>
          <div>
            <h2 className="text-xl font-bold">{user.username}</h2>
            <p className="text-gray-500">{user.bio}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b mb-10">
          {["profile", "password"].map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={`px-10 py-8 ${
                tab === item
                  ? "border-b-2 border-purple-400 font-medium"
                  : "text-gray-500"
              }`}
            >
              {item === "profile" ? "Edit Profile" : "Change Password"}
            </button>
          ))}
        </div>

        {/* Profile Edit Tab */}
        {tab === "profile" && (
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Name
              </label>
              <input
                className="w-full border p-3 rounded"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            {/* Email (not editable) */}
            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Email
              </label>
              <input
                className="w-full border p-3 rounded bg-gray-100 cursor-not-allowed"
                value={user.email}
                disabled
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-gray-600 font-medium mb-1">Bio</label>
              <textarea
                className="w-full border p-3 rounded"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
              ></textarea>
            </div>

            <Button
              style={{ backgroundColor: "#9e085d" }}
              className="px-4 py-4 text-lg mt-5"
              onClick={handleSaveProfile}
            >
              Save
            </Button>
          </div>
        )}

        {/* Change Password Tab */}
        {tab === "password" && (
          <div>
            <input
              type="password"
              placeholder="New password"
              className="w-full border p-2 rounded mb-3"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData({ ...passwordData, newPassword: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full border p-2 rounded"
              value={passwordData.confirmPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  confirmPassword: e.target.value,
                })
              }
            />

            <Button
              style={{ backgroundColor: "#9e085d" }}
              className="px-4 py-4 text-lg mt-5"
              onClick={handleSavePassword}
            >
              Save
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
