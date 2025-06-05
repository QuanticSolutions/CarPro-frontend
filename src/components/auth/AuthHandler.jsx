import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const user_id = params.get('user_id');
    const stream_id = params.get('stream_id');
    const stream_token = params.get('stream_token');

    if (token) {
      localStorage.setItem("authToken", token);
      localStorage.setItem('user_id', user_id);
      localStorage.setItem('stream_id', stream_id);
      localStorage.setItem('stream_token', stream_token);
      console.log(user_id, stream_id)
      window.location.reload();
    } else {
      navigate("/auth/signin");
    }
  }, [navigate]);

  return null;
};

export default AuthHandler;
