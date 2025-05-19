import { useEffect } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { Dialog, DialogContent, DialogActions, Button, Typography, Box } from "@mui/material";
import Signin from "./Signin";
import Signup from "./Signup";
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';


const AuthDialog = ({ popupOpen, setPopupOpen, popup1Open, setPopup1Open, backToHome = false }) => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const { t } = useTranslation();

    return (
        <>
            <Dialog open={popupOpen} onClose={() => setPopupOpen(false)} fullScreen={isMobile}>
                <DialogActions>
                    <CloseIcon onClick={() => { setPopupOpen(false); if (backToHome) { window.location.href = "/" } }} sx={{ color: "#B71C1C", cursor: "pointer" }} />
                </DialogActions>
                <DialogContent sx={{ pb: window.innerWidth > 800 ? "4rem" : "10rem" }}>
                    <Signin />
                    <Box sx={{ width: "100%", textAlign: "center" }}>
                        <Typography variant="body" sx={{ textAlign: "center" }}> {t("auth.noAccount")}  <a style={{ color: "#B71C1C" }} href="#" onClick={() => { setPopupOpen(false); setPopup1Open(true) }}>{t("auth.signUp")}</a></Typography>
                    </Box>
                </DialogContent>
            </Dialog>

            <Dialog open={popup1Open} onClose={() => setPopup1Open(false)} fullWidth fullScreen={isMobile} >
                <DialogActions>
                    <CloseIcon onClick={() => { setPopup1Open(false); if (backToHome) { window.location.href = "/" } }} sx={{ color: "#B71C1C", cursor: "pointer" }} />
                </DialogActions>
                <DialogContent sx={{ pb: window.innerWidth > 800 ? "4rem" : "10rem" }}>
                    <Signup />
                    <Box sx={{ width: "100%", textAlign: "center" }}>
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
