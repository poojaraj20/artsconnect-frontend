import React, { useEffect, useState, useMemo } from "react"
import { useParams } from "react-router-dom"
import { Button, TextField } from "@mui/material"
import FavoriteIcon from "@mui/icons-material/Favorite"
import Header from "../components/Header"
import { loadStripe } from "@stripe/stripe-js"
import { useNavigate } from "react-router-dom";

import {
  getArtworkAPI,
  likeArtworkAPI,
  commentArtworkAPI,
  makePaymentAPI,
} from "../../../services/allAPIs"

export default function ArtworkDetail() {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null)
  const [loading, setLoading] = useState(true)
  const [mainIdx, setMainIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [commentText, setCommentText] = useState("")
  const navigate = useNavigate();

  const token = useMemo(() => sessionStorage.getItem("token"), [])
  const userId = useMemo(() => sessionStorage.getItem("userId"), [])

  // Fetch artwork with embedded comments
  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        if (!token) return
        const res = await getArtworkAPI(id, token)

        if (res?.data) {
          setArtwork(res.data)
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching artwork:", err)
        setLoading(false);
      }
    };
    fetchArtwork()
  }, [id, token])

  if (loading) return <div className="text-center mt-20">Loading...</div>
  if (!artwork) return <div className="text-center mt-20">Artwork not found</div>

  const makePayment = async () => {


    // initializing stripe instance
    const stripe = await loadStripe(
      "pk_test_51S4btTJRatU77xlLcIW8Lbb1V2xXli2E96gQKFzMSEdcqRHOUGopcoY3ww6UrGFzB9wQD1rhluswEjqz9UiPeyzz00glPyrqKu"
    );
    const reqBody = {
      artworkId: artwork._id,
      quantity: qty
    }
    try {
      const res = await makePaymentAPI(reqBody, token)
      console.log(res)
      if (!res?.data?.id) {
        console.error("Invalid session response:", res);
        alert("Payment could not be initialized.");
        return;
      }

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: res.data.id,
      });

      if (result.error) {
        console.error("Stripe redirect error:", result.error.message);
        navigate("/payment-error")
      }
    } catch (error) {
      console.log("error :" + error)
      navigate("/payment-error")
    }
    // you can extend payment flow here
  };

  const images = artwork.images || []
  const mainImg = images[mainIdx]?.url
    ? `http://localhost:5000${images[mainIdx].url}`
    : "";

  const likesCount = Array.isArray(artwork.likes) ? artwork.likes.length : 0
  const likedByUser = artwork.likedByUser || false
  const price = artwork.price ?? 0
  const available = artwork.quantity ?? 0

  const avatarUrl =
    artwork?.uploadedBy?.profile?.startsWith("http")
      ? artwork.uploadedBy.profile
      : artwork?.uploadedBy?.profile
        ? `http://localhost:5000${artwork.uploadedBy.profile}`
        : ""

  // Like handler
  const handleLike = async () => {
    try {
      if (!token) return;
      const res = await likeArtworkAPI(id, token);

      if (res?.data) {
        setArtwork((prev) =>
          prev
            ? {
              ...prev,
              likesCount: res.data.likes,
              likedByUser: res.data.likedByUser,
            }
            : prev
        );
      }
    } catch (err) {
      console.error("Error liking artwork:", err)
    }
  };

  // Submit comment
  const submitComment = async () => {
    const text = commentText.trim()
    if (!text || !token) return

    try {
      const res = await commentArtworkAPI(id, text, token)

      const newComment = res.data?.comment || res.data
      if (newComment) {
        setArtwork((prev) => ({
          ...prev,
          comments: [newComment, ...(prev.comments || [])],
        }))
        setCommentText("");
      }
    } catch (err) {
      console.error("Error adding comment:", err);
      alert(err.response?.data?.message || "Failed to add comment.")
    }
  }

  return (
    <>
      <Header />

      <div className="max-w-6xl mx-auto p-6">
        {/* Top section: images + info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images */}
          <div>
            {mainImg ? (
              <img
                src={mainImg}
                alt={artwork.caption}
                className="w-full h-[420px] object-cover rounded-xl shadow"
              />
            ) : (
              <div className="w-full h-[420px] bg-gray-100 rounded-xl" />
            )}

            {/* Thumbnails */}
            <div className="flex gap-3 mt-4 overflow-x-auto">
              {images.map((img, idx) => {
                const url = `http://localhost:5000${img.url}`;
                const active = idx === mainIdx;
                return (
                  <button
                    key={idx}
                    onClick={() => setMainIdx(idx)}
                    className={`border rounded-lg overflow-hidden ${active ? "ring-2 ring-blue-500" : ""
                      }`}
                  >
                    <img
                      src={url}
                      alt={`thumb-${idx}`}
                      className="w-24 h-20 object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Info */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={
                  avatarUrl ||
                  "https://static.vecteezy.com/system/resources/previews/009/734/564/non_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg"
                }
                alt={artwork?.uploadedBy?.username || "User"}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="font-medium">
                {artwork?.uploadedBy?.username || "Unknown"}
              </div>
            </div>

            <h1 className="text-2xl font-bold mb-2">{artwork.caption}</h1>
            <p className="text-gray-700 mb-4 whitespace-pre-wrap">
              {artwork.description}
            </p>

            <div className="flex items-center gap-6 mb-4">
              <div className="text-xl font-semibold">₹{price}</div>
              <div className="text-sm text-gray-600">
                Available: {available}
              </div>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <Button
                onClick={handleLike}
                variant="outlined"
                startIcon={
                  <FavoriteIcon
                    style={{ color: artwork?.likedByUser ? "red" : undefined }}
                  />
                }
              >
                {artwork?.likedByUser ? "Liked" : "Like"} (
                {artwork?.likesCount ?? likesCount})
              </Button>

              <div className="flex items-center gap-2">
                <span className="text-sm">Qty</span>
                <input
                  type="number"
                  min={1}
                  max={available || 99}
                  value={qty}
                  onChange={(e) =>
                    setQty(
                      Math.max(
                        1,
                        Math.min(Number(e.target.value || 1), available || 99)
                      )
                    )
                  }
                  className="w-20 border rounded p-2"
                />
              </div>

              <Button
                type="button"
                onClick={makePayment}
                style={{ backgroundColor: "#9e085d" }}
                variant="contained"
                disabled={!available || artwork?.uploadedBy?._id === userId} // ✅ uploader can't buy
              >
                {artwork?.uploadedBy?._id === userId
                  ? "You can't buy your own artwork"
                  : available
                    ? "Buy Now"
                    : "Out of Stock"}
              </Button>

            </div>

            <div className="text-xs text-gray-500">
              Posted on {new Date(artwork.createdAt).toLocaleString()}
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="bg-white rounded-xl shadow p-6 mt-10">
          <h2 className="text-xl font-semibold mb-4">Comments</h2>

          <div className="flex gap-3 mb-4">
            <TextField
              fullWidth
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              size="small"
            />
            <Button
              style={{ backgroundColor: "#9e085d" }}
              variant="contained"
              onClick={submitComment}
            >
              Post
            </Button>
          </div>

          {!artwork.comments || artwork.comments.length === 0 ? (
            <div className="text-gray-500">No comments yet.</div>
          ) : (
            <ul className="space-y-4">
              {artwork.comments.map((c) => (
                <li key={c._id} className="border rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <img
                      src={
                        c.user?.profile
                          ? c.user.profile.startsWith("http")
                            ? c.user.profile
                            : `http://localhost:5000${c.user.profile}`
                          : "https://static.vecteezy.com/system/resources/previews/009/734/564/non_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg"
                      }
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium">
                      {c.user?.username || "User"}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(c.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="text-gray-800">{c.text}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
