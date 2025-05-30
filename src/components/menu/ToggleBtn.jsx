import { useEffect, useState } from 'react';
import { Typography, Button, Menu, MenuItem, IconButton, Avatar, Box } from "@mui/material";
import { styled } from "@mui/system";
import { isAuthenticated, logout, getImages, getUser, API_BASE_URL } from '../../api/consumer';
import AuthDialog from '../auth/Dialog';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import { ChevronRight, ChevronLeft } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const LanguageToggleContainer = styled("div")({
    borderRadius: "25px",
    padding: "3px",
    display: "flex",
    alignItems: "center",
    border: "2px solid #fff",
    cursor: "pointer",
    position: "relative",
    width: "65px",
    height: "20px",
    justifyContent: "center",
    WebkitTapHighlightColor: "transparent",
    WebkitUserSelect: "none",
    userSelect: "none",
});

const ToggleText = styled(Typography)(({ isArabic }) => ({
    color: "#fff",
    fontSize: "14px",
    fontWeight: "500",
    zIndex: 1,
    transition: "opacity 0.3s ease",
    WebkitTapHighlightColor: "transparent",
    WebkitUserSelect: "none",
    userSelect: "none",
}));

const ToggleSlider = styled("div")(({ isRight }) => ({
    width: "18px",
    height: "18px",
    backgroundColor: "#fff",
    borderRadius: "50%",
    position: "absolute",
    top: "3px",
    left: isRight ? "2px" : "52px",
    transition: "left 0.3s ease",
    WebkitTapHighlightColor: "transparent !important",
    WebkitUserSelect: "none !important",
    userSelect: "none !important"
}));



function ToggleBtn() {
    const { t, i18n } = useTranslation();
    const [isArabic, setIsArabic] = useState(i18n.language == "ar");
    const [popupOpen, setPopupOpen] = useState(false);
    const [popup1Open, setPopup1Open] = useState(false);
    const [images, setImages] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    let menuTimer = null;

    const handleLanguageToggle = () => {
        setIsArabic(!isArabic);
        if (!isArabic) {
            i18n.changeLanguage('ar');
        }
        else {
            i18n.changeLanguage('en');
        }
    };

    const handleUserIconClick = (event) => {
        clearTimeout(menuTimer);
        setAnchorEl(event.currentTarget)
    };

    const handleMenuClose = () => {
        menuTimer = setTimeout(() => {
            setAnchorEl(null)
        }, 200);
    };

    const handleLoginClick = () => {
        setPopupOpen(true);
        handleMenuClose();
    };

    const handleRegisterClick = () => {
        setPopup1Open(true);
        handleMenuClose();
    };

    const handleLogoutClick = () => {
        logout();
        handleMenuClose();
    };

    useEffect(
        () => {
            if (isAuthenticated) {
                getImages(localStorage.getItem('user_id')).then(data => {
                    if (data && data.length > 0) {
                        setImages(data[data.length - 1]);
                    }
                });
            }
        },
        []
    );

    return (
        <div style={{ padding: "1rem", display: "flex", justifyContent: "space-between", alignItems: window.innerWidth > 800 && "center", gap: "2px", marginLeft: window.innerWidth > 800 && i18n.language != "ar" ? "-2rem" : 0, flexDirection: window.innerWidth <= 800 && "column-reverse" }}>
            <LanguageToggleContainer onClick={handleLanguageToggle}>
                <ToggleSlider isRight={!isArabic} />
                <ToggleText isArabic={isArabic}>
                    {isArabic ? "العربية" : "Eng"}
                </ToggleText>
            </LanguageToggleContainer>
            <IconButton
                onMouseEnter={handleUserIconClick}
                onMouseLeave={handleMenuClose}
                size="large"
                sx={{ color: "#fff", direction: i18n.language == "ar" && "rtl", "@media (max-width: 800px)": { justifyContent: i18n.language == "ar" ? "right" : "left", px: 0, } }}
                aria-controls={open ? "user-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
            >
                {
                    !images ?
                        <AccountCircleIcon fontSize="large" sx={{ "@media (max-width: 800px)": { justifyContent: "left", px: 0, fontSize: "4rem" } }} />
                        :
                        <Avatar src={`${API_BASE_URL}${images.imageUrl}`} alt="Profile" sx={{ "@media (max-width: 800px)": { width: "4rem", height: "4rem" } }} />
                }
                {
                    window.innerWidth > 800 &&
                    <ExpandMoreIcon  />
                }
                {
                    (window.innerWidth <= 800 && isAuthenticated) ?
                        <MenuItem sx={{ padding: 1, fontSize: "1.4rem", fontWeight: "bold" }} onClick={() => window.location.href = "/my/profile"}>
                            {t("auth.myProfile")}
                            {
                                i18n.language != "ar" ?
                                <ChevronRight /> :
                                <ChevronLeft />
                            }
                        </MenuItem>
                        : !isAuthenticated && window.innerWidth <= 800 && <MenuItem sx={{ padding: 1, fontSize: "1.4rem", fontWeight: "bold" }} onClick={handleLoginClick}>{t("auth.login")}</MenuItem>
                }
            </IconButton>
            {
                open && window.innerWidth > 800 && (
                    <Box
                        onMouseEnter={handleUserIconClick}
                        onMouseLeave={handleMenuClose}
                        sx={{
                            position: 'absolute',
                            top: window.innerWidth > 800 ? "2.5rem" : "7rem",
                            backgroundColor: '#B71C1C',
                            left: window.innerWidth > 800 ? "4.5rem" : "1rem",
                            zIndex: 1000,
                            color: '#fff',
                            borderRadius: 1,
                        }}
                    >
                        {isAuthenticated && (
                            <MenuItem sx={{ padding: 1, "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.2)" } }} onClick={() => window.location.href = "/my/profile"}>{t("auth.myProfile")}</MenuItem>
                        )}
                        {!isAuthenticated && (
                            <MenuItem sx={{ padding: 1, "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.2)" } }} onClick={handleLoginClick}>{t("auth.login")}</MenuItem>
                        )}
                        {!isAuthenticated && (
                            <MenuItem sx={{ padding: 1, "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.2)" } }} onClick={handleRegisterClick}>{t("auth.register")}</MenuItem>
                        )}
                        {isAuthenticated && (
                            <MenuItem sx={{ padding: 1, "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.2)" } }} onClick={handleLogoutClick}>{t("auth.logout")}</MenuItem>
                        )}
                    </Box>
                )
            }
            <AuthDialog popup1Open={popup1Open} setPopup1Open={setPopup1Open} popupOpen={popupOpen} setPopupOpen={setPopupOpen} />
        </div >
    );
}

export default ToggleBtn;