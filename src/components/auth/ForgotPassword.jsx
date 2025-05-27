import { useState } from "react";
import { Box, Typography, Button, TextField, InputAdornment, IconButton, Container } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { styled } from "@mui/system";
import { sendOtp, verifyOtp, resetPassword } from "../../api/consumer";
import MessagePopup from "../popup/Popup";
import { useTranslation } from 'react-i18next';

const StyledBtn = styled(Button)({
    border: "1px solid black",
    borderRadius: "5px",
    color: "#fff",
    textAlign: "center",
    backgroundColor: "#B71C1C",
    fontSize: "18px",
    fontWeight: "bold",
    marginTop: "1rem",
    padding: "0.5rem",
    textTransform: "none"
});

const isPasswordValid = (password) => {
    const hasLength = password.length >= 7;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
        length: hasLength,
        case: hasUpper && hasLower,
        number: hasNumber,
        special: hasSpecial,
        isValid: hasLength && hasUpper && hasLower && hasNumber && hasSpecial
    };
};

function ForgotPassword() {
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [currentStep, setCurrentStep] = useState(1);
    const [showRules, setShowRules] = useState(false);
    const [popup, setPopup] = useState({
        open: false,
        message: "",
        severity: "success",
    });
    const [passwordValidity, setPasswordValidity] = useState({
        length: false,
        case: false,
        number: false,
        special: false,
        isValid: false
    });

    const handleSendOtp = async (event) => {
        event.preventDefault();
        if (!email) {
            setPopup({ open: true, message: t("forgotPassword.emailRequired"), severity: "error" });
            return;
        }
        try {
            await sendOtp(email);
            setCurrentStep(2);
            setPopup({ open: true, message: t("forgotPassword.otpSent"), severity: "success" });
        } catch (error) {
            setPopup({ open: true, message: error.response?.data?.message || "Failed to send OTP", severity: "error" });
        }
    };

    const handleVerifyOtp = async (event) => {
        event.preventDefault();
        if (!otp) {
            setPopup({ open: true, message: t("forgotPassword.otpRequired"), severity: "error" });
            return;
        }
        try {
            await verifyOtp(email, otp);
            setCurrentStep(3);
            setPopup({ open: true, message: t("forgotPassword.otpVerified"), severity: "success" });
        } catch (error) {
            setPopup({ open: true, message: error.response?.data?.message || "OTP verification failed", severity: "error" });
        }
    };

    const handleResetPassword = async (event) => {
        event.preventDefault();
        if (!passwordValidity.isValid) {
            setPopup({ open: true, message: t("forgotPassword.invalidPassword"), severity: "error" });
            return;
        }
        if (password !== confirmPassword) {
            setPopup({ open: true, message: t("forgotPassword.passwordMismatch"), severity: "error" });
            return;
        }
        try {
            await resetPassword(email, password);
            setPopup({ open: true, message: t("forgotPassword.success"), severity: "success" });
            
            setTimeout(() => {
                window.location.href = "/login";
            }, 2000);

        } catch (error) {
            console.log(error)
            setPopup({ open: true, message: error.response?.data?.message || "Password reset failed", severity: "error" });
        }
    };

    const handleBackToEmail = () => {
        setCurrentStep(1);
        setOtp("");
        setPassword("");
        setConfirmPassword("");
        setPasswordValidity({
            length: false,
            case: false,
            number: false,
            special: false,
            isValid: false
        });
    };

    const handleBackToOtp = () => {
        setCurrentStep(2);
        setPassword("");
        setConfirmPassword("");
        setPasswordValidity({
            length: false,
            case: false,
            number: false,
            special: false,
            isValid: false
        });
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
            <Container>
                <Typography variant="h5" fontWeight="bold" color="black" textAlign="center">
                    {t("forgotPassword.title")}
                </Typography>
                
                <Box sx={{ mx: "auto", mt: 5 }}>
                    {currentStep === 1 && (
                        <form onSubmit={handleSendOtp}>
                            <Typography variant="body1" color="text.secondary" textAlign="center" mb={3}>
                                {t("forgotPassword.enterEmailText")}
                            </Typography>
                            <TextField
                                fullWidth
                                label={t("forgotPassword.email")}
                                variant="outlined"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                sx={{
                                    mb: 2,
                                    '& label.Mui-focused': {
                                        color: '#B71C1C',
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#B71C1C',
                                        },
                                    },
                                }}
                            />
                            <StyledBtn type="submit" fullWidth>
                                {t("forgotPassword.sendOtpBtn")}
                            </StyledBtn>
                        </form>
                    )}

                    {currentStep === 2 && (
                        <form onSubmit={handleVerifyOtp}>
                            <Typography variant="body1" color="text.secondary" textAlign="center" mb={3}>
                                {t("forgotPassword.enterOtpText")} {email}
                            </Typography>
                            <TextField
                                fullWidth
                                label={t("forgotPassword.enterOtp")}
                                variant="outlined"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                sx={{
                                    mb: 2,
                                    '& label.Mui-focused': {
                                        color: '#B71C1C',
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#B71C1C',
                                        },
                                    },
                                }}
                            />
                            <StyledBtn type="submit" fullWidth>
                                {t("forgotPassword.verifyOtpBtn")}
                            </StyledBtn>
                            <Button
                                onClick={handleBackToEmail}
                                sx={{ 
                                    mt: 2, 
                                    color: '#B71C1C',
                                    textTransform: 'none'
                                }}
                                fullWidth
                            >
                                {t("forgotPassword.backToEmail")}
                            </Button>
                        </form>
                    )}
                    {currentStep === 3 && (
                        <form onSubmit={handleResetPassword} style={{ width: "25rem" }}>
                            <Typography variant="body1" color="text.secondary" textAlign="center" mb={3}>
                                {t("forgotPassword.enterNewPasswordText")}
                            </Typography>
                            <TextField
                                fullWidth
                                label={t("forgotPassword.newPassword")}
                                variant="outlined"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => {
                                    const newPassword = e.target.value;
                                    setPassword(newPassword);
                                    const validity = isPasswordValid(newPassword);
                                    setPasswordValidity(validity);
                                }}
                                onFocus={() => setShowRules(true)}
                                sx={{
                                    mb: 2,
                                    '& label.Mui-focused': {
                                        color: '#B71C1C',
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#B71C1C',
                                        },
                                    },
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            
                            <TextField
                                fullWidth
                                label={t("forgotPassword.confirmPassword")}
                                variant="outlined"
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                sx={{
                                    mb: 2,
                                    '& label.Mui-focused': {
                                        color: '#B71C1C',
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#B71C1C',
                                        },
                                    },
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            {showRules && (
                                <Box sx={{ p: 2, border: "1px solid #ccc", borderRadius: "5px", backgroundColor: "#F8F9FA", mb: 2 }}>
                                    <Typography variant="body2" color={passwordValidity.length ? "green" : "error"}>
                                        {t("forgotPassword.passwordRules.length")}
                                    </Typography>
                                    <Typography variant="body2" color={passwordValidity.case ? "green" : "error"}>
                                        {t("forgotPassword.passwordRules.case")}
                                    </Typography>
                                    <Typography variant="body2" color={passwordValidity.number ? "green" : "error"}>
                                        {t("forgotPassword.passwordRules.number")}
                                    </Typography>
                                    <Typography variant="body2" color={passwordValidity.special ? "green" : "error"}>
                                        {t("forgotPassword.passwordRules.special")}
                                    </Typography>
                                </Box>
                            )}

                            <StyledBtn type="submit" fullWidth>
                                {t("forgotPassword.resetPasswordBtn")}
                            </StyledBtn>
                            <Button
                                onClick={handleBackToOtp}
                                sx={{ 
                                    mt: 2, 
                                    color: '#B71C1C',
                                    textTransform: 'none'
                                }}
                                fullWidth
                            >
                                {t("forgotPassword.backToOtp")}
                            </Button>
                        </form>
                    )}
                </Box>

                <MessagePopup
                    open={popup.open}
                    handleClose={() => setPopup({ ...popup, open: false })}
                    severity={popup.severity}
                    message={popup.message}
                />
            </Container>
        </Box>
    );
}

export default ForgotPassword;