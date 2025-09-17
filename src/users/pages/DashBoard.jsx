import React, { useState, useEffect, useMemo } from "react";
import Header from "../components/Header";
import "./dashboard.css";


import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";

// Import APIs
import {
  getProfileAPI,
  getAllArtworksAPI,
  likeArtworkAPI,
} from "../../../services/allAPIs"

import { serverURL } from "../../../services/serverURL";
import Foot from "../components/Foot";

const DashBoard = () => {
  const [artworks, setArtworks] = useState([]);
  const [userId, setUserId] = useState(null);

  const [search, setSearch] = useState("");
  const [month, setMonth] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  // Fetch artworks and current user ID
  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) return;

        // Get profile
        const userRes = await getProfileAPI(token);
        setUserId(userRes.data._id);

        // Get artworks
        const res = await getAllArtworksAPI(token);

        const mapped = res.data.map((art) => ({
          ...art,
          likesCount: Array.isArray(art.likes) ? art.likes.length : 0,
          likedByUser: Array.isArray(art.likes)
            ? art.likes.includes(userRes.data._id)
            : false,
        }));

        setArtworks(mapped);
      } catch (err) {
        console.error("Error fetching artworks:", err);
      }
    };

    fetchArtworks();
  }, []);

  // Like/unlike handler
  const handleLike = async (artworkId) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return;

      const res = await likeArtworkAPI(artworkId, token);

      setArtworks((prev) =>
        prev.map((art) =>
          art._id === artworkId
            ? {
                ...art,
                likesCount: res.data.likes,
                likedByUser: res.data.likedByUser,
              }
            : art
        )
      );
    } catch (err) {
      console.error("Error liking artwork:", err);
    }
  };

  // Derived list: search, filter, sort
  const filteredAndSortedArtworks = useMemo(() => {
    let list = artworks;

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((a) =>
        a?.uploadedBy?.username?.toLowerCase().includes(q)
      );
    }

    if (month) {
      const [yy, mm] = month.split("-").map(Number);
      list = list.filter((a) => {
        const d = new Date(a?.createdAt);
        if (isNaN(d.getTime())) return false;
        return d.getFullYear() === yy && d.getMonth() + 1 === mm;
      });
    }

    return [...list].sort((a, b) => {
      const da = new Date(a?.createdAt).getTime() || 0;
      const db = new Date(b?.createdAt).getTime() || 0;
      return sortBy === "newest" ? db - da : da - db;
    });
  }, [artworks, search, month, sortBy]);

  // Render artwork card
  const renderCard = (artwork) => {
    const {
      caption,
      description,
      images = [],
      uploadedBy,
      createdAt,
      _id,
      likesCount,
      likedByUser,
    } = artwork;

    const firstImage =
      images?.length > 0 ? `${serverURL}${images[0].url}` : "";

    return (
      <Card key={_id} sx={{ maxWidth: 345, height: "100%" }}>
        <CardHeader
          avatar={
            <Avatar
              src={uploadedBy?.profile || ""}
              alt={uploadedBy?.username || "U"}
              aria-label="user"
            >
              {uploadedBy?.username?.charAt(0).toUpperCase() || "U"}
            </Avatar>
          }
          title={uploadedBy?.username || "Unknown User"}
          subheader={
            createdAt ? new Date(createdAt).toLocaleDateString() : "—"
          }
        />
        <Link to={`/ArtworkDetail/${_id}`}>
          <CardMedia
            component="img"
            height="194"
            image={firstImage}
            alt={caption}
          />
        </Link>
        <CardContent>
          <h3>{caption}</h3>
          <p>{description}</p>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="like"
            onClick={(e) => {
              e.preventDefault();
              handleLike(_id);
            }}
          >
            <FavoriteIcon style={{ color: likedByUser ? "red" : "gray" }} />
          </IconButton>
          <span>
            {likesCount} {likesCount === 1 ? "like" : "likes"}
          </span>
        </CardActions>
      </Card>
    );
  };

  return (
    <div>
      <Header />

      {/* Controls */}
      <div className="p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="group flex-1 max-w-xl">
          <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>
          <input
            placeholder="Search by uploader name"
            type="search"
            className="input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex gap-3 items-center">
          <label className="flex items-center gap-2 text-sm">
            <span>Month:</span>
            <input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="border rounded px-2 py-1"
            />
          </label>

          <label className="flex items-center gap-2 text-sm">
            <span>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </label>

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setMonth("");
              setSortBy("newest");
            }}
            className="border rounded px-3 py-1 text-sm"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Results count */}
      <div className="px-6 text-sm text-gray-600">
        Showing {filteredAndSortedArtworks.length} result
        {filteredAndSortedArtworks.length === 1 ? "" : "s"}
      </div>

      {/* Cards */}
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredAndSortedArtworks.map((artwork) => renderCard(artwork))}
        </div>
      </div>
      <Foot/>
    </div>
  );
};

export default DashBoard;
