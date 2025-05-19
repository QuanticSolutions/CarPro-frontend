import { useState } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { Facebook } from "@mui/icons-material";
import { Apple, Email } from "@mui/icons-material";
import { styled } from "@mui/system";
import { socialLogin } from "../../api/consumer";
import JwtLogin from "./JwtLogin";
import { useTranslation } from 'react-i18next';

const StyledBtn = styled(Button)({
    border: "1px solid black",
    borderRadius: "5px",
    color: "black",
    fontSize: "18px",
    marginTop: "1rem",
    minWidth: "100%",
    maxWidth: "100%",
    display: "flex",
    justifyContent: "center",
    fontWeight: "bold",
    alignItems: "center",
    padding: "0.5rem",
    textTransform: "none"
})


function Signin() {

    const [showForm, setShowFrom] = useState(false);
    const { t } = useTranslation();

    return (
        !showForm ?
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
                <img src="/assets/images/caroo.gif" width={200} style={{ textAlign: "center" }} />
                <Container>
                    <Typography variant="h6" fontWeight="bold" color="black" textAlign="center">{t("signin.loginTitle")}</Typography>
                    <Box display="flex" flexDirection="column" gap="10px" padding="1rem" alignItems="center">
                        <StyledBtn startIcon={<img src="/assets/images/google.png" style={{ color: "#DB4437", width: "25px" }} />} onClick={() => socialLogin("google")} >
                            {t("signin.loginTitle")}
                        </StyledBtn>
                        <StyledBtn startIcon={<Email style={{ color: "#D93025", fontSize: "25px" }} />} onClick={() => setShowFrom(true)}>
                            {t("signin.continueWithEmail")}
                        </StyledBtn>
                    </Box>
                    <Typography variant="h6" color="black" textAlign="center" padding="0.5rem">
                        {t("signin.terms")}
                    </Typography>
                </Container>
            </Box>
            :
            <JwtLogin backBtnHandler={() => setShowFrom(false)} />
    );
}

export default Signin;
