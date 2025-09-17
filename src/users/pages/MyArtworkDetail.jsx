// src/pages/MyArtworkDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {
  getArtworkAPI,
  updateArtworkAPI,
  deleteArtworkAPI,
} from "../../../services/allAPIs"; // adjust path

const MyArtworkDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [art, setArt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const fetchArtwork = async () => {
      setLoading(true);
      try {
        const token = sessionStorage.getItem("token");
        if (!token) {
          setMessage("Not authenticated");
          setLoading(false);
          return;
        }

        const res = await getArtworkAPI(id, token);
        const artwork = res.data;
        setArt(artwork);

        // Get current user from session
        const existingUserString = sessionStorage.getItem("existingUser");
        let userId = null;
        if (existingUserString) {
          try {
            userId = JSON.parse(existingUserString)._id;
          } catch (e) {}
        }

        // Set owner flag
        if (artwork.uploadedBy) {
          const uploaderId =
            typeof artwork.uploadedBy === "string"
              ? artwork.uploadedBy
              : artwork.uploadedBy._id;
          setIsOwner(userId && uploaderId === userId);
        }

        // Set form defaults
        if (artwork.price !== undefined && artwork.price !== null)
          setPrice(artwork.price);
        if (artwork.quantity !== undefined && artwork.quantity !== null)
          setQuantity(artwork.quantity);
      } catch (err) {
        console.error("fetch artwork error:", err);
        setMessage("Unable to load artwork");
      } finally {
        setLoading(false);
      }
    };

    fetchArtwork();
  }, [id]);

  const handleSave = async () => {
    setMessage("");
    setSaving(true);
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        setMessage("Not authenticated");
        setSaving(false);
        return;
      }

      // Validate
      if (Number(price) < 0) {
        setMessage("Price must be >= 0");
        setSaving(false);
        return;
      }
      if (parseInt(quantity, 10) < 0) {
        setMessage("Quantity must be >= 0");
        setSaving(false);
        return;
      }

      const res = await updateArtworkAPI(
        id,
        { price: Number(price), quantity: parseInt(quantity, 10) },
        token
      );

      setArt(res.data);
      setMessage("Saved successfully");
    } catch (err) {
      console.error("save error:", err);
      const msg =
        err?.response?.data?.message ||
        "Failed to update. You might not have permission.";
      setMessage(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this artwork? This cannot be undone.")) return;
    try {
      const token = sessionStorage.getItem("token");
      await deleteArtworkAPI(id, token);
      navigate("/myuploads");
    } catch (err) {
      console.error("delete error:", err);
      setMessage("Failed to delete artwork.");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!art) return <p className="p-6">Artwork not found.</p>;

  const mainImage = art.images?.length
    ? `http://localhost:5000${art.images[0].url}`
    : "";

  return (
    <div>
      <Header />
      <div className="p-6 max-w-4xl mx-auto">
        <Card>
          <CardHeader
            avatar={
              <Avatar
                src={
                  art.uploadedBy?.profile
                    ? `http://localhost:5000${art.uploadedBy.profile}`
                    : ""
                }
              >
                {art.uploadedBy?.username?.charAt(0)?.toUpperCase() || "U"}
              </Avatar>
            }
            title={art.caption}
            subheader={new Date(art.createdAt).toLocaleString()}
          />
          {mainImage && (
            <CardMedia
              component="img"
              height="400"
              image={mainImage}
              alt={art.caption}
            />
          )}
          <CardContent>
            <p>{art.description}</p>
            <div className="mt-4">
              <strong>Price:</strong>{" "}
              {art.price !== undefined ? `₹ ${art.price}` : "Not set"}
            </div>
            <div>
              <strong>Quantity:</strong>{" "}
              {art.quantity !== undefined ? art.quantity : "Not set"}
            </div>
          </CardContent>

          {isOwner && (
            <>
              <div
                style={{
                  padding: "1rem",
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <TextField
                  label="Price (₹)"
                  type="number"
                  inputProps={{ min: 0, step: "0.01" }}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <TextField
                  label="Quantity"
                  type="number"
                  inputProps={{ min: 0, step: "1" }}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <Button
                  variant="contained"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save"}
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </div>
              {message && (
                <div style={{ padding: "0 1rem 1rem 1rem" }}>{message}</div>
              )}
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default MyArtworkDetail;
