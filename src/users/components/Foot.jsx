import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

function Foot() {
  return (
    <footer className=" text-white mt-20 " style={{ backgroundColor: "#9e085d" }}>
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo + About */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">ArtConnect</h2>
          <p className="text-sm">
            Discover, share, and connect through the beauty of art.  
            A community where creativity finds its true home.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-[#9e085d]">Home</Link></li>
            <li><Link to="/login" className="hover:text-[#9e085d]">Login</Link></li>
            <li><Link to="/about" className="hover:text-[#9e085d]">About</Link></li>
            <li><Link to="/contact" className="hover:text-[#9e085d]">Contact</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-[#9e085d]">Blog</a></li>
            <li><a href="#" className="hover:text-[#9e085d]">Help Center</a></li>
            <li><a href="#" className="hover:text-[#9e085d]">Terms & Privacy</a></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="p-2 bg-[#9e085d] text-white rounded-full hover:bg-[#7d064a] transition">
              <FaFacebookF />
            </a>
            <a href="#" className="p-2 bg-[#9e085d] text-white rounded-full hover:bg-[#7d064a] transition">
              <FaInstagram />
            </a>
            <a href="#" className="p-2 bg-[#9e085d] text-white rounded-full hover:bg-[#7d064a] transition">
              <FaTwitter />
            </a>
            <a href="#" className="p-2 bg-[#9e085d] text-white rounded-full hover:bg-[#7d064a] transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className=" py-4 text-center text-lg text-white" style={{ backgroundColor: "#9e085d" }}>
        © {new Date().getFullYear()} ArtConnect. All rights reserved.
      </div>
    </footer>
  );
}

export default Foot;
