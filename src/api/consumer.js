import axios from "axios";

// export const API_BASE_URL = "http://localhost:3000";
export const API_BASE_URL = "https://api.carsfinderpro.com";
const CHAT_BASE_URL = "https://chat.carpro.quanticsols.com";
export const NOTIFY_BASE_URL = "https://notification.carpro.quanticsols.com";

export const signup = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
        return response.data;
    } catch (error) {
        console.error("Signup failed:", error.response?.data || error.message);
        throw error;
    }
};

const finalHeaders = {};

export const checkUser = async (token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/auth/check`, { withCredentials: true, headers: { 'x-auth-token': token } })
        const headersTemp = document.cookie.split(';');
        headersTemp.forEach((header) => {
            const headerTemp = header.split('=');
            finalHeaders[headerTemp[0].trim()] = headerTemp[1].trim()
        })
        console.log(finalHeaders['AUTH_API'])
    }
    catch (error) {
        console.log(error)
    }
}

export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
        // document.cookie = `AUTH_API=${response.data.token}`
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("user_id", response.data.user.id)
        localStorage.setItem("stream_token", response.data.stream_token)
        localStorage.setItem("stream_id", response.data.stream_id)
        // checkUser(response.data.token);
        return response.data;
    } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
        throw error;
    }
};

export const isAuthenticated = localStorage.getItem("token")

export const logout = async (countryCode) => {
    try {
        // const response = await axios.post(`${API_BASE_URL}/auth/logout`, { withCredentials: true, headers: { 'x-auth-token': finalHeaders['AUTH_API'] } })
        localStorage.removeItem("token")
        localStorage.removeItem("user_id")
        localStorage.removeItem("stream_token")
        localStorage.removeItem("stream_id")
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
        const response = await axios.get(`${API_BASE_URL}/auth/${userId}`);
        return response.data.user;
    } catch (error) {
        console.error("Error fetching user:", error.response?.data || error.message);
        throw error;
    }
};

export const updateUser = async (userId, formData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/auth/${userId}`, formData);
        console.log(response)
        return response.data.user;
    } catch (error) {
        console.error("Error updating user:", error.response?.data || error.message);
        return error.response?.data || error.message
    }
};

export const deleteUser = async (userId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/auth/${userId}`);
        return response.data.user;
    } catch (error) {
        console.error("Error deleting user:", error.response?.data || error.message);
        throw error;
    }
};


export const createAd = async (adData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/ads`, adData);
        return response.data;
    } catch (error) {
        console.error("Error creating ad:", error.response?.data || error.message);
        throw error;
    }
};

export const getAllAds = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/ads`);
        return response.data;
    } catch (error) {
        console.error("Error fetching ads:", error.response?.data || error.message);
        throw error;
    }
};

export const getAdById = async (adId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/ads/${adId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching ad:", error.response?.data || error.message);
        throw error;
    }
};

export const getAdByUser = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/ads/user/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching ad:", error.response?.data || error.message);
        throw error;
    }
};

export const getRentByUser = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/rent/user/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching ad:", error.response?.data || error.message);
        throw error;
    }
};

export const updateAd = async (adId, updatedData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/ads/${adId}`, updatedData);
        return response.data;
    } catch (error) {
        console.error("Error updating ad:", error.response?.data || error.message);
        throw error;
    }
};

export const deleteAd = async (adId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/ads/${adId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting ad:", error.response?.data || error.message);
        throw error;
    }
};

export const createRent = async (adData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/rent`, adData);
        return response.data;
    } catch (error) {
        console.error("Error creating ad:", error.response?.data || error.message);
        throw error;
    }
};

export const getAllRents = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/rent`);
        return response.data;
    } catch (error) {
        console.error("Error fetching rent:", error.response?.data || error.message);
        throw error;
    }
};

export const getRentById = async (adId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/rent/${adId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching ad:", error.response?.data || error.message);
        throw error;
    }
};

export const updateRent = async (adId, updatedData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/rent/${adId}`, updatedData);
        return response.data;
    } catch (error) {
        console.error("Error updating ad:", error.response?.data || error.message);
        throw error;
    }
};

export const deleteRent = async (adId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/rent/${adId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting ad:", error.response?.data || error.message);
        throw error;
    }
};

export const createNotification = async (data) => {
    try {
        const response = await axios.post(`${NOTIFY_BASE_URL}/notifications`, data);
        return response.data;
    } catch (error) {
        console.error("Error creating notification:", error.response?.data || error.message);
        throw error;
    }
};

export const updateNotification = async (id) => {
    try {
        const response = await axios.put(`${NOTIFY_BASE_URL}/notifications/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error creating notification:", error.response?.data || error.message);
        throw error;
    }
};

export const getAllNotifications = async (id) => {
    try {
        const response = await axios.get(`${NOTIFY_BASE_URL}/notifications/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching notifications:", error.response?.data || error.message);
        throw error;
    }
};

export const createChat = async (userId, receiverId) => {

    try {
        const response = await axios.post(`${CHAT_BASE_URL}/create-channel`, { userId, receiverId });
        return response.json();
    }
    catch (error) {
        console.error("Error:", error.response?.data || error.message);
        throw error;
    }
};

export const uploadImage = async (id, file) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/files/upload/${id}`, { file });
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
            }
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
        const response = await axios.get(`${API_BASE_URL}/files/uploads/${id}`);
        return response.data.images
    }
    catch (error) {
        // console.log("Error Fetching Image:", error.response?.data || error.message);
        return error.response?.data || error.message
    }
}

export const getStreamImages = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/files/uploads/stream/${id}`);
        return response.data.images
    }
    catch (error) {
        console.log("Error Fetching Image:", error.response?.data || error.message);
        return error.response?.data || error.message
    }
}


export const createFavs = async (data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/favs`, data);
        return response.data;
    } catch (error) {
        console.error("Error creating fav:", error.response?.data || error.message);
        throw error;
    }
};

export const getFavsByUser = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/favs/user/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching favs:", error.response?.data || error.message);
        throw error;
    }
};

export const getFavsByAd = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/favs/ad/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetchingfavs:", error.response?.data || error.message);
        throw error;
    }
};

export const deleteFav = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/favs/${id}`);
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
    return response;
}

export const getModels = async () => {

    try {
        const response = await axios.get(`${API_BASE_URL}/data/models`)
        return response.data
    }
    catch (error) {
        console.error("Error:", error.response?.data || error.message);
        throw error;
    }
};

export const getTrimsByModel = async (modelName) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/data/trims/${modelName}`,)
        return response.data;
    }
    catch (error) {
        console.error("Error:", error.response?.data || error.message);
        throw error;
    }
};
