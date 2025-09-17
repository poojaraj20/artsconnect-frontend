import { Button } from "flowbite-react"
import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'
import { googleLoginAPI, loginAPI, registerAPI } from "../../services/allAPIs"
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from "jwt-decode"
import 'react-toastify/dist/ReactToastify.css'

function Auth({ register }) {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: ""
  });
  const navigate = useNavigate()

  const showToast = (type, message) => {
    toast[type](message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  // Register handler
  const handleRegister = async () => {
    const { username, email, password, cpassword } = userDetails;

    // Basic validation
    if (!username || !email || !password || !cpassword) {
      return showToast("warn", "Please fill all fields")
    }
    if (password.length < 6) {
      return showToast("warn", "Password must be at least 6 characters")
    }
    if (password !== cpassword) {
      return showToast("warn", "Passwords do not match")
    }

    try {
      const result = await registerAPI(userDetails)
      if (result.status === 200) {
        showToast("success", "Registered successfully")
        setUserDetails({ username: "", email: "", password: "", cpassword: "" })
        navigate("/login")
      } else {
        showToast("error", result.response?.data || "Registration failed")
      }
    } catch (err) {
      showToast("error", err.response?.data?.message || "Registration failed")
    }
  };


  const handleLogin = async () => {
    const { email, password } = userDetails;
    if (!email || !password) {
      return showToast("warn", "Please fill all fields")
    }

    try {
      const result = await loginAPI(userDetails);
      if (result.status === 200) {
        sessionStorage.setItem("existingUser", JSON.stringify(result.data.user))
        sessionStorage.setItem("token", result.data.token)
        sessionStorage.setItem("userId", result.data.user._id);
        showToast("success", "Login successful");
        setUserDetails({ username: "", email: "", password: "", cpassword: "" })
        if (result.data.user.email === "admin@gmail.com") {
          navigate("/admin-dashboard")
        } else {
          navigate("/dashboard")
        }
      } else {
        showToast("error", result.response?.data || "Login failed")
      }
    } catch (err) {
      showToast("error", err.response?.data?.message || "Login failed")
    }
  };


  const handleGoogleAuth = async (credentialResponse) => {
    try {
      const decode = jwtDecode(credentialResponse.credential)
      const result = await googleLoginAPI({
        username: decode.name,
        email: decode.email,
        password: 'googlepswd',
        photo: decode.picture
      });
      if (result.status === 200) {
        sessionStorage.setItem("existingUser", JSON.stringify(result.data.user))
        sessionStorage.setItem("token", result.data.token)
        sessionStorage.setItem("userId", result.data.user._id);
        showToast("success", "Login successful")
        if (result.data.user.email === "admin@gmail.com") {
          navigate("/admin-dashboard")
        } else {
          navigate("/dashboard")
        }
      } else {
        showToast("error", result.response?.data || "Google login failed")
      }
    } catch (err) {
      showToast("error", "Google login failed")
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-md grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Left Side - Form */}
        <div className="p-8 flex flex-col justify-center">
          <div className="flex items-center space-x-3">
            <img
              src="https://cdn.dribbble.com/users/530580/screenshots/5974084/color.gif"
              alt="Logo GIF"
              className="w-40 h-28 rounded"
            />
            <h1 className="text-2xl font-bold text-gray-800">ArtConnect</h1>
          </div>

          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 text-center">
            {register ? "Register" : "Login"}
          </h2>

          <form className="mt-8 space-y-5">
            {register && (
              <input
                type="text"
                placeholder="Name"
                value={userDetails.username}
                onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#9e085d] outline-none"
              />
            )}

            <input
              type="email"
              placeholder="Email address"
              value={userDetails.email}
              onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#9e085d] outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              value={userDetails.password}
              onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#9e085d] outline-none"
            />

            {register && (
              <input
                type="password"
                placeholder="Confirm Password"
                value={userDetails.cpassword}
                onChange={(e) => setUserDetails({ ...userDetails, cpassword: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#9e085d] outline-none"
              />
            )}

            <Button
              onClick={register ? handleRegister : handleLogin}
              style={{ backgroundColor: "#9e085d" }}
              type="button"
              className="w-full py-3 rounded-lg text-white font-medium hover:bg-[#7d064a] transition-all"
            >
              {register ? "Sign Up" : "Login"}
            </Button>

            <div className="text-center mt-3">..............................................OR............................................</div>

            <div className="mt-3 flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleAuth}
                onError={() => showToast("error", "Google login failed")}
              />
            </div>
          </form>

          <p className="mt-6 text-2xl text-gray-600 text-center">
            {register ? (
              <>Already have an account? <Link to="/login" className="text-[#9e085d] text-2xl">Login</Link></>
            ) : (
              <>Don’t have an account? <Link to="/register" className="text-[#9e085d] text-2xl">Sign up</Link></>
            )}
          </p>
        </div>

        {/* Right Side */}
        <div className="hidden md:block">
          <img
            src="https://static.vecteezy.com/system/resources/previews/021/924/397/large_2x/beautiful-kathak-dance-painting-fine-art-generative-ai-photo.jpg"
            alt="login illustration"
            className="w-full h-full object-cover rounded-r-xl"
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Auth;
