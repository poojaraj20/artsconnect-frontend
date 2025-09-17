import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import { getMyUploadsAPI } from "../../../services/allAPIs"; // adjust relative path

const MyUploads = () => {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyUploads = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) return;

        const res = await getMyUploadsAPI(token);
        setUploads(res.data);
      } catch (err) {
        console.error("Error fetching my uploads:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyUploads();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div>
      <Header />
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {uploads.length === 0 ? (
          <p>No uploads yet.</p>
        ) : (
          uploads.map((art) => (
            <Link
              key={art._id}
              to={`/myuploads/${art._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Card key={art._id} sx={{ maxWidth: 345 }}>
                <CardHeader
                  avatar={
                    <Avatar
                      src={
                        art.uploadedBy?.profile
                          ? `http://localhost:5000${art.uploadedBy.profile}`
                          : ""
                      }
                      alt={art.uploadedBy?.username || "U"}
                    >
                      {art.uploadedBy?.username?.charAt(0).toUpperCase() || "U"}
                    </Avatar>
                  }
                  title={art.caption}
                  subheader={new Date(art.createdAt).toLocaleDateString()}
                />
                {art.images?.length > 0 && (
                  <CardMedia
                    component="img"
                    height="194"
                    image={`http://localhost:5000${art.images[0].url}`}
                    alt={art.caption}
                  />
                )}
                <CardContent>
                  <p>{art.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default MyUploads;
