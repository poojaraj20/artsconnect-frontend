import React, { useEffect, useState } from "react";
import "./header.css";
import {
  Avatar,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import LogoutIcon from "@mui/icons-material/Logout";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { SiThreads } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { getInboxNotificationsAPI } from "../../../services/allAPIs";
import axios from "axios";

function Header({ darkMode, setDarkMode }) {
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState({});
  const [state, setState] = useState({ right: false });
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  // Load user data from session
  useEffect(() => {
    const usertoken = sessionStorage.getItem("token");
    const user = sessionStorage.getItem("existingUser");
    if (usertoken && user) {
      setToken(usertoken);
      setUserData(JSON.parse(user));
    }
  }, []);

 
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!token) return;
      try {
        const res = await getInboxNotificationsAPI(token);
        const validNotifications = res.data.filter((n) => n && n.type);
        setNotifications(validNotifications);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };
    fetchNotifications();
  }, [token]);

  // safer toggleDrawer: check event exists before referencing event.type
  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift"))
      return;
    setState((prev) => ({ ...prev, [anchor]: open }));
  };

  const handleProfileClick = () => {
    navigate("/profile");
    setState((prev) => ({ ...prev, right: false }));
  };

  const handleUploadsClick = () => {
    navigate("/uploads");
    setState((prev) => ({ ...prev, right: false }));
  };

  // NEW: go to My Uploads page
  const handleMyUploadsClick = () => {
    navigate("/myuploads");
    setState((prev) => ({ ...prev, right: false }));
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
    setState((prev) => ({ ...prev, right: false }));
  };

  const menuItems = [
    { text: "Profile", icon: <PersonIcon />, onClick: handleProfileClick },
    { text: "Upload", icon: <CloudUploadIcon />, onClick: handleUploadsClick },
    { text: "My Uploads", icon: <PhotoLibraryIcon />, onClick: handleMyUploadsClick }, // NEW
    { text: "Logout", icon: <LogoutIcon />, onClick: handleLogout },
  ];

  const list = (anchor) => (
    <Box sx={{ width: 250 }} role="presentation" onKeyDown={toggleDrawer(anchor, false)}>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={item.onClick}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <div>
      <Navbar fluid rounded className="px-6 py-3 shadow-lg" style={{ backgroundColor: "#9e085dff" }}>
        <NavbarBrand href="/">
          <img
            src="https://cdn.dribbble.com/users/530580/screenshots/5974084/color.gif"
            className="mr-3 h-10 w-10 sm:h-10"
            alt="Logo"
          />
          <span className="self-center whitespace-nowrap text-2xl font-bold text-white tracking-wide">
            ArtConnect
          </span>
        </NavbarBrand>

        <div className="flex md:order-2 items-center gap-5">
          {/* Social Icons */}
          <div className="flex gap-4 text-white text-xl">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition">
              <FaInstagram />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition">
              <FaFacebookF />
            </a>
            <a href="https://www.threads.net" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition">
              <SiThreads />
            </a>


          </div>

          {/* Notifications */}
          <div className="relative cursor-pointer" onClick={() => navigate("/inbox")}>
            <InboxIcon className="text-white" />
            {notifications.some(n => !n.read) && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                {notifications.filter(n => !n.read).length}
              </span>
            )}
          </div>

          {/* Avatar Drawer Trigger */}
          {token && userData ? (
            <img
              src={userData.profile && userData.profile.startsWith("http") ? userData.profile :
                userData.profile ? `http://localhost:5000${userData.profile}` :
                  "https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg"
              }
              alt="profile"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={toggleDrawer("right", true)}
            />
          ) : (
            <Avatar
              img="https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg"
              rounded
              bordered
              className="cursor-pointer"
              onClick={toggleDrawer("right", true)}
            />
          )}

          <Drawer anchor="right" open={state.right} onClose={toggleDrawer("right", false)}>
            {list("right")}
          </Drawer>

          {/* Mobile Toggle */}
          <NavbarToggle />
        </div>

        <NavbarCollapse>
          <NavbarLink href="/dashboard" className="text-white text-2xl hover:text-yellow-300 transition-colors">Explore</NavbarLink>
          <NavbarLink href="/about" className="text-white text-2xl hover:text-yellow-300 transition-colors">About</NavbarLink>
          <NavbarLink href="/contact" className="text-white text-2xl hover:text-yellow-300 transition-colors">Help</NavbarLink>
        </NavbarCollapse>
      </Navbar>
    </div>
  );
}

export default Header;
