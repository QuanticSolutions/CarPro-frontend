import { useEffect, useState } from "react";
import { isAuthenticated } from "../../api/consumer";
import AuthDialog from "./Dialog";

const ProtectRoute = ({ children }) => {
    const [popupOpen, setPopupOpen] = useState(false);
    const [popup1Open, setPopup1Open] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            if (! isAuthenticated) {
                setPopupOpen(true);
            }
        };
        checkAuth();
    }, []);

    return (
        <>
            {children}
            <AuthDialog popupOpen={popupOpen} setPopupOpen={setPopupOpen} setPopup1Open={setPopup1Open} popup1Open={popup1Open} backToHome={true} />
        </>
    );
};

export default ProtectRoute;