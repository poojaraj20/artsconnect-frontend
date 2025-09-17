import React, { useState } from "react"
import Header from "../components/Header"
import { Button } from "flowbite-react"
import { FaPhoneAlt, FaMapMarkerAlt, FaPalette } from "react-icons/fa"

import { sendAdminNotificationAPI } from "../../../services/allAPIs"
import Foot from "../components/Foot"

function Contact() {
  const [type, setType] = useState("app_issue")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const resetMessages = () => {
    setSuccessMsg("");
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetMessages();

    if (!message.trim()) {
      setErrorMsg("Please write a message before sending.")
      return;
    }

    setLoading(true)
    try {
      const payload = { type, name, email, message }
      const token = sessionStorage.getItem("token")

      const res = await sendAdminNotificationAPI(payload, token)

      if (res?.data) {
        setSuccessMsg("Message sent to admin successfully!")
        setType("app_issue")
        setName("")
        setEmail("")
        setMessage("")
      }
    } catch (err) {
      console.error(err)
      const serverMsg =
        err.response?.data?.message ||
        (err.response?.data?.errors && err.response.data.errors[0].msg)
      setErrorMsg(serverMsg || "Failed to send. Try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Header />

      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center text-white py-16 text-center"
        style={{
          backgroundImage:
            "url('https://cdn.pixabay.com/photo/2017/12/12/02/41/artist-3013762_1280.jpg')",
        }}
      >
        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold">Contact Us</h1>
          <p className="mt-3 text-xl">
            Any questions or remarks? We’d love to hear from you!
          </p>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-10 -mt-12 relative z-10">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Type dropdown */}
          <div>
            <label className="block mb-2 font-semibold">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#9e085d] outline-none"
            >
              <option value="app_issue">App Issue</option>
              <option value="user_complaint">User Complaint</option>
              <option value="general_query">General Query</option>
            </select>
          </div>

          {/* Name */}
          <div>
            <label className="block mb-2 font-semibold">Name (optional)</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#9e085d] outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-semibold">Email (optional)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#9e085d] outline-none"
            />
          </div>

          {/* Message */}
          <div className="md:col-span-2">
            <label className="block mb-2 font-semibold">Message</label>
            <textarea
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message..."
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#9e085d] outline-none"
            ></textarea>
          </div>

          {/* Feedback */}
          <div className="md:col-span-2">
            {successMsg && (
              <div className="mb-3 p-3 bg-green-100 text-green-800 rounded">
                {successMsg}
              </div>
            )}
            {errorMsg && (
              <div className="mb-3 p-3 bg-red-100 text-red-800 rounded">
                {errorMsg}
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="md:col-span-2">
            <Button
              type="submit"
              style={{ backgroundColor: "#9e085d" }}
              className="w-full py-3 rounded-lg text-white font-medium"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send to Admin"}
            </Button>
          </div>
        </form>
      </div>

      {/* Info Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-12 px-6">
        <div className="bg-gray-50 shadow-md rounded-xl p-6 text-center">
          <FaPalette className="mx-auto text-4xl text-[#9e085d] mb-4" />
          <h3 className="font-bold text-lg mb-2">ABOUT ART CONNECT</h3>
          <p className="text-gray-600">
            A vibrant hub for artists & art lovers.
          </p>
        </div>
        <div className="bg-gray-50 shadow-md rounded-xl p-6 text-center">
          <FaPhoneAlt className="mx-auto text-4xl text-[#9e085d] mb-4" />
          <h3 className="font-bold text-lg mb-2">PHONE (Landline)</h3>
          <p className="text-gray-600">+91 98765 43210</p>
          <p className="text-gray-600">+91 91234 56789</p>
        </div>
        <div className="bg-gray-50 shadow-md rounded-xl p-6 text-center">
          <FaMapMarkerAlt className="mx-auto text-4xl text-[#9e085d] mb-4" />
          <h3 className="font-bold text-lg mb-2">OUR OFFICE LOCATION</h3>
          <p className="text-gray-600">
            Art Connect Studio, <br />
            MG Road, Kochi, India
          </p>
        </div>
      </div>

      <div className="h-20"></div>
      <Foot/>
    </div>
  );
}

export default Contact;
