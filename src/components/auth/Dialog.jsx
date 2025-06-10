import {  useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { Dialog, DialogContent, DialogActions, Button, Typography, Box } from "@mui/material";
import Signin from "./Signin";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';

const AuthDialog = ({ popupOpen, setPopupOpen, popup1Open, setPopup1Open, backToHome = false }) => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const { t } = useTranslation();
    const [ forgotOpen, setForgetOpen ] = useState(false);

    return (
        <>
            <Dialog open={forgotOpen} onClose={() => setForgetOpen(false)} fullScreen={isMobile}>
                <DialogActions>
                    <CloseIcon onClick={() => { setForgetOpen(false);}} sx={{ color: "#B71C1C", cursor: "pointer" }} />
                </DialogActions>
                <DialogContent sx={{ pb: window.innerWidth > 800 ? "4rem" : "10rem" }}>
                    <ForgotPassword />
                    <Box sx={{ width: "100%", textAlign: "center", mt:2 }}>
                        <Typography variant="body" sx={{ textAlign: "center" }}><a style={{ color: "#B71C1C" }} href="#" onClick={() => { setForgetOpen(false); setPopupOpen(true) }}>{t("auth.signIn")}</a></Typography>
                    </Box>
                </DialogContent>
            </Dialog>

            <Dialog open={popupOpen} onClose={() => setPopupOpen(false)} fullScreen={isMobile}>
                <DialogActions>
                    <CloseIcon onClick={() => { setPopupOpen(false); if (backToHome) { window.location.href = "/" } }} sx={{ color: "#B71C1C", cursor: "pointer" }} />
                </DialogActions>
                <DialogContent sx={{ pb: window.innerWidth > 800 ? "4rem" : "10rem" }}>
                    <Signin />
                    <Box sx={{ width: "100%", textAlign: "center", display: "flex", flexDirection: "column", gap: 2 }}>
                        <Typography variant="body" sx={{ textAlign: "center" }}> {t("auth.noAccount")}  <a style={{ color: "#B71C1C" }} href="#" onClick={() => { setPopupOpen(false); setPopup1Open(true) }}>{t("auth.signUp")}</a></Typography>
                        <Typography variant="body" sx={{ textAlign: "center" }}> <a style={{ color: "#B71C1C" }} href="#" onClick={() => { setPopupOpen(false); setForgetOpen(true) }}>{t("forgotPassword.title")} </a></Typography>
                    </Box>
                </DialogContent>
            </Dialog>

            <Dialog open={popup1Open} onClose={() => setPopup1Open(false)} fullWidth fullScreen={isMobile} >
                <DialogActions>
                    <CloseIcon onClick={() => { setPopup1Open(false); if (backToHome) { window.location.href = "/" } }} sx={{ color: "#B71C1C", cursor: "pointer" }} />
                </DialogActions>
                <DialogContent sx={{ pb: window.innerWidth > 800 ? "4rem" : "10rem" }}>
                    <Signup />
                    <Box sx={{ width: "100%", textAlign: "center", pt: 3 }}>
                        <Typography variant="body" sx={{ textAlign: "center", width: "100%", p: 1 }}>
                            {t("auth.haveAccount")} <a style={{ color: "#B71C1C" }} href="#" onClick={() => { setPopupOpen(true); setPopup1Open(false) }}>{t("auth.signIn")}</a>
                        </Typography>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AuthDialog;
