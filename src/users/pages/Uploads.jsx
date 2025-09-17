import React, { useState } from "react";
import { FileInput, Label, TextInput, Textarea, Button, Progress } from "flowbite-react";
import Header from "../components/Header";
import { uploadArtworkAPI } from "../../../services/allAPIs"; // adjust path

function Uploads() {
  const [formData, setFormData] = useState({
    caption: "",
    description: "",
    quantity: "",
    price: "",
    images: [],
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  // Append new files to existing images array
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: [...formData.images, ...files] });
  };

  // Handle text inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Remove a selected image
  const handleRemoveImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.caption || !formData.description || formData.images.length === 0) {
      alert("Please add caption, description, and at least one image.");
      return;
    }

    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to upload artwork");
      return;
    }

    const payload = new FormData();
    payload.append("caption", formData.caption);
    payload.append("description", formData.description);
    payload.append("quantity", formData.quantity);
    payload.append("price", formData.price);
    formData.images.forEach((file) => payload.append("images", file));

    try {
      setLoading(true);
      setUploadProgress(0);

      const res = await uploadArtworkAPI(payload, token, (progressEvent) => {
        if (progressEvent.total) {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        }
      });

      console.log("Artwork saved:", res.data);
      alert("Artwork uploaded successfully!");

      // Reset form
      setFormData({ caption: "", description: "", quantity: "", price: "", images: [] });
      setUploadProgress(0);
    } catch (err) {
      console.error(err?.response?.data || err.message);
      alert("Upload failed: " + (err?.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />

      <div className="flex w-screen items-center justify-center p-6">
        <div className="w-full max-w-2xl rounded-xl bg-white shadow-lg p-10">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Upload Your Artwork 🎨
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div>
              <Label
                htmlFor="dropzone-file"
                className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 p-6"
              >
                <div className="flex flex-col items-center justify-center">
                  <svg
                    className="mb-4 h-8 w-8 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 
                      5.5 5.5 0 0 0 5.207 5.021C5.137 
                      5.017 5.071 5 5 5a4 4 0 0 0 
                      0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">JPG, PNG, GIF (Max 5MB each)</p>
                </div>
                <FileInput
                  id="dropzone-file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </Label>

              {/* Preview selected images with remove button */}
              {formData.images.length > 0 && (
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {formData.images.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt="preview"
                        className="h-24 w-24 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Upload progress */}
              {loading && (
                <Progress
                  progress={uploadProgress}
                  labelProgress
                  size="sm"
                  color="purple"
                  className="mt-3"
                />
              )}
            </div>

            {/* Caption */}
            <div>
              <Label htmlFor="caption" value="Caption" />
              <TextInput
                id="caption"
                name="caption"
                placeholder="Enter a short title"
                value={formData.caption}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" value="Description" />
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your artwork..."
                rows={4}
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            {/* Quantity & Price */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3>quantity</h3>
                <Label htmlFor="quantity" value="Quantity Available" />
                <TextInput
                  id="quantity"
                  type="number"
                  name="quantity"
                  placeholder="e.g. 10"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <h3>price</h3>
                <Label htmlFor="price" value="Price (₹)" />
                <TextInput
                  id="price"
                  type="number"
                  name="price"
                  placeholder="e.g. 500"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-center">
              <Button type="submit" gradientDuoTone="purpleToBlue" className="px-6">
                Upload Artwork
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Uploads;
