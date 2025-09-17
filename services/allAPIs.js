import { commonAPI } from "./commonAPI";
import { serverURL } from "./serverURL";
//api call
export const registerAPI = (reqBody) => {
   return commonAPI('POST', `${serverURL}/api/register`, reqBody, {})

}
export const loginAPI = (reqBody) => {
   return commonAPI('POST', `${serverURL}/api/login`, reqBody, {})

}
export const googleLoginAPI = (reqBody) => {
   return commonAPI('POST', `${serverURL}/api/google-login`, reqBody, {})

}
export const getArtworkAPI = (id, token) => {
   return commonAPI(
      "GET",
      `${serverURL}/api/artworks/${id}`,
      {},
      { Authorization: `Bearer ${token}` }
   )
}

// Like an artwork
export const likeArtworkAPI = (id, token) => {
   return commonAPI(
      "POST",
      `${serverURL}/api/artworks/${id}/likes`,
      {},
      { Authorization: `Bearer ${token}` }
   )
}

// Post a comment
export const commentArtworkAPI = (id, text, token) => {
   return commonAPI(
      "POST",
      `${serverURL}/api/artworks/${id}/comments`,
      { text },
      { Authorization: `Bearer ${token}` }
   )
}

// Send notification to admin
export const sendAdminNotificationAPI = (payload, token) => {
  return commonAPI(
    "POST",
    `${serverURL}/api/admin/adminNotifications`,
    payload,
    { Authorization: `Bearer ${token}` }
  )
}

export const makePaymentAPI = (reqBody,token) => {
   return commonAPI(
      "PUT",
      `${serverURL}/api/artworks/make-payment`,
      reqBody,
      { Authorization: `Bearer ${token}` }
   )
}

export const getProfileAPI = (token) => {
  return commonAPI(
    "GET",
    `${serverURL}/api/profile`,
    {},
    { Authorization: `Bearer ${token}` }
  );
};

// Get all artworks
export const getAllArtworksAPI = (token) => {
  return commonAPI(
    "GET",
    `${serverURL}/api/artworks`,
    {},
    { Authorization: `Bearer ${token}` }
  );
};

export const getInboxNotificationsAPI = (token) => {
  return commonAPI(
    "GET",
    `${serverURL}/api/inbox/notifications`,
    {},
    { Authorization: `Bearer ${token}` }
  );
};

// Mark notification as read
export const markNotificationReadAPI = (notifId, token) => {
  return commonAPI(
    "PUT",
    `${serverURL}/api/inbox/notifications/${notifId}/read`,
    {},
    { Authorization: `Bearer ${token}` }
  );
};

// Update artwork (price & quantity)
export const updateArtworkAPI = (id, reqBody, token) => {
  return commonAPI(
    "PUT",
    `${serverURL}/api/artworks/${id}`,
    reqBody,
    { Authorization: `Bearer ${token}` }
  );
};

// Delete artwork
export const deleteArtworkAPI = (id, token) => {
  return commonAPI(
    "DELETE",
    `${serverURL}/api/artworks/${id}`,
    {},
    { Authorization: `Bearer ${token}` }
  );
};

// Get my uploads
export const getMyUploadsAPI = (token) => {
  return commonAPI(
    "GET",
    `${serverURL}/api/artworks/myuploads`,
    {},
    { Authorization: `Bearer ${token}` }
  );
};

// Upload profile image
export const uploadProfileImageAPI = (formData, token) => {
  return commonAPI(
    "POST",
    `${serverURL}/api/profile/upload`,
    formData,
    {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    }
  );
};

// Update profile (username, bio)
export const updateProfileAPI = (reqBody, token) => {
  return commonAPI(
    "PUT",
    `${serverURL}/api/profile`,
    reqBody,
    { Authorization: `Bearer ${token}` }
  );
};

// Change password
export const changePasswordAPI = (reqBody, token) => {
  return commonAPI(
    "PUT",
    `${serverURL}/api/profile/password`,
    reqBody,
    { Authorization: `Bearer ${token}` }
  );
};

// Upload artwork
export const uploadArtworkAPI = (formData, token, onUploadProgress) => {
  return commonAPI(
    "POST",
    `${serverURL}/api/artwork/upload`,
    formData,
    {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress 
  );
};

// Get admin inbox notifications
export const getAdminInboxAPI = (token) => {
  return commonAPI(
    "GET",
    `${serverURL}/api/admin/inbox`,
    {},
    { Authorization: `Bearer ${token}` }
  );
};

// Mark admin notification as read
export const markAdminNotificationReadAPI = (notifId, token) => {
  return commonAPI(
    "PUT",
    `${serverURL}/api/admin/inbox/${notifId}/read`,
    {},
    { Authorization: `Bearer ${token}` }
  );
};

// Get admin dashboard stats
export const getAdminStatsAPI = (token) => {
  return commonAPI(
    "GET",
    `${serverURL}/api/admin/stats`,
    {},
    { Authorization: `Bearer ${token}` }
  );
};


