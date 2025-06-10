import axios from "axios";

// export const API_BASE_URL = "http://localhost:3000";
export const API_BASE_URL = "https://api.carsfinderpro.com";
const CHAT_BASE_URL = "https://chat.carsfinderpro.com";
export const NOTIFY_BASE_URL = "https://notification.carsfinderpro.com";

export const signup = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
        return response.data;
    } catch (error) {
        console.error("Signup failed:", error.response?.data || error.message);
        throw error;
    }
};

export const checkUser = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/auth/check`, { withCredentials: true })
        console.log(response)
        return response.data.loggedIn;
    }
    catch (error) {
        console.log(error)
    }
}

export const isAuthenticated = checkUser();

export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials, { withCredentials: true });
        localStorage.setItem("user_id", response.data.user.id)
        localStorage.setItem("stream_token", response.data.stream_token)
        localStorage.setItem("stream_id", response.data.stream_id)
        return response.data;
    } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
        throw error;
    }
};

export const logout = async (countryCode) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/logout`, {}, { withCredentials: true })
        localStorage.removeItem("user_id");
        localStorage.removeItem("stream_token");
        localStorage.removeItem("stream_id");
        window.location.href = `/${countryCode}`;
    }
    catch (error) {
        console.log(error)
    }
}

export const resetPassword = async (email, password) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/auth/reset`, { email, password });
        return response.data;
    }
    catch (error) {
        console.log(error)
        if (error.response) {
            throw error;
        } else if (error.request) {
            throw new Error('Network error. Please check your connection.');
        } else {
            throw new Error('An unexpected error occurred.');
        }
    }
};

export const socialLogin = (provider) => {
    window.location.href = `${API_BASE_URL}/auth/social/${provider}`;
};

export const getUser = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/auth/${userId}`, { withCredentials: true });
        return response.data.user;
    } catch (error) {
        console.error("Error fetching user:", error.response?.data || error.message);
        throw error;
    }
};

export const updateUser = async (userId, formData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/auth/${userId}`, formData, { withCredentials: true });
        console.log(response)
        return response.data.user;
    } catch (error) {
        console.error("Error updating user:", error.response?.data || error.message);
        return error.response?.data || error.message
    }
};

export const deleteUser = async (userId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/auth/${userId}`, { withCredentials: true });
        return response.data.user;
    } catch (error) {
        console.error("Error deleting user:", error.response?.data || error.message);
        throw error;
    }
};


export const createAd = async (adData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/ads`, adData, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error creating ad:", error.response?.data || error.message);
        throw error;
    }
};

export const getAllAds = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/ads`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error fetching ads:", error.response?.data || error.message);
        throw error;
    }
};

export const getAdById = async (adId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/ads/${adId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error fetching ad:", error.response?.data || error.message);
        throw error;
    }
};

export const getAdByUser = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/ads/user/${id}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error fetching ad:", error.response?.data || error.message);
        throw error;
    }
};

export const getRentByUser = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/rent/user/${id}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error fetching ad:", error.response?.data || error.message);
        throw error;
    }
};

export const updateAd = async (adId, updatedData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/ads/${adId}`, updatedData, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error updating ad:", error.response?.data || error.message);
        throw error;
    }
};

export const deleteAd = async (adId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/ads/${adId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error deleting ad:", error.response?.data || error.message);
        throw error;
    }
};

export const createRent = async (adData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/rent`, adData, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error creating ad:", error.response?.data || error.message);
        throw error;
    }
};

export const getAllRents = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/rent`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error fetching rent:", error.response?.data || error.message);
        throw error;
    }
};

export const getRentById = async (adId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/rent/${adId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error fetching ad:", error.response?.data || error.message);
        throw error;
    }
};

export const updateRent = async (adId, updatedData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/rent/${adId}`, updatedData, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error updating ad:", error.response?.data || error.message);
        throw error;
    }
};

export const deleteRent = async (adId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/rent/${adId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error deleting ad:", error.response?.data || error.message);
        throw error;
    }
};

export const createNotification = async (data) => {
    try {
        const response = await axios.post(`${NOTIFY_BASE_URL}/notifications`, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error creating notification:", error.response?.data || error.message);
        throw error;
    }
};

export const updateNotification = async (id) => {
    try {
        const response = await axios.put(`${NOTIFY_BASE_URL}/notifications/${id}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error creating notification:", error.response?.data || error.message);
        throw error;
    }
};

export const getAllNotifications = async (id) => {
    try {
        const response = await axios.get(`${NOTIFY_BASE_URL}/notifications/${id}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error fetching notifications:", error);
        throw error;
    }
};

export const createChat = async (userId, receiverId) => {

    try {
        const response = await axios.post(`${CHAT_BASE_URL}/create-channel`, { userId, receiverId }, { withCredentials: true });
        return response.json();
    }
    catch (error) {
        console.error("Error:", error.response?.data || error.message);
        throw error;
    }
};

export const uploadImage = async (id, file) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/files/upload/${id}`, { file }, { withCredentials: true });
        return response.json();
    }
    catch (error) {
        console.log("Error Uploading Image:", error.response?.data || error.message);
        throw error;
    }
}

export const uploadImages = async (id, files) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/files/uploads/${id}`,
            files,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
            { withCredentials: true }
        );
        return response;
    }
    catch (error) {
        console.log("Error Uploading Image:", error.response?.data || error.message);
        throw error;
    }
}

export const getImages = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/files/uploads/${id}`, { withCredentials: true });
        return response.data.images
    }
    catch (error) {
        return error.response?.data || error.message
    }
}

export const getStreamImages = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/files/uploads/stream/${id}`, { withCredentials: true });
        return response.data.images
    }
    catch (error) {
        console.log("Error Fetching Image:", error.response?.data || error.message);
        return error.response?.data || error.message
    }
}


export const createFavs = async (data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/favs`, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error creating fav:", error.response?.data || error.message);
        throw error;
    }
};

export const getFavsByUser = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/favs/user/${id}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error fetching favs:", error.response?.data || error.message);
        throw error;
    }
};

export const getFavsByAd = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/favs/ad/${id}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error fetchingfavs:", error.response?.data || error.message);
        throw error;
    }
};

export const deleteFav = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/favs/${id}`, { withCredentials: true });
        return response.data;
    }
    catch (error) {
        console.error("Error fetchingfavs:", error.response?.data || error.message);
        throw error;
    }
}

export const sendOtp = async (email) => {
    const response = await axios.post(`${API_BASE_URL}/auth/send-otp`, { email });
    return response;
}

export const verifyOtp = async (email, otp) => {
    const response = await axios.post(`${API_BASE_URL}/auth/verify-otp`, { email, otp });
    console.log(response)
    return response;
}

export const getModels = async () => {

    try {
        const response = await axios.get(`${API_BASE_URL}/data/models`, { withCredentials: true })
        return response.data
    }
    catch (error) {
        console.error("Error:", error.response?.data || error.message);
        throw error;
    }
};

export const getTrimsByModel = async (modelName) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/data/trims/${modelName}`, { withCredentials: true })
        return response.data;
    }
    catch (error) {
        console.error("Error:", error.response?.data || error.message);
        throw error;
    }
};
