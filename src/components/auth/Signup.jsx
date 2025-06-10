import { useState } from "react";
import { Box, Typography, Button, TextField, InputAdornment, IconButton, Container } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { styled } from "@mui/system";
import { signup, socialLogin, login, sendOtp, verifyOtp } from "../../api/consumer";
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

const isPasswordValid = (password, name) => {
    const hasLength = password.length >= 7;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasNoName = name ? !password.toLowerCase().includes(name.toLowerCase()) : true;

    return {
        length: hasLength,
        case: hasUpper && hasLower,
        number: hasNumber,
        special: hasSpecial,
        noName: hasNoName,
        isValid: hasLength && hasUpper && hasLower && hasNumber && hasSpecial && hasNoName
    };
};

const isPhoneValid = (phone) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
};

function Signup() {
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
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
        noName: true,
        isValid: false
    });

    const handleSendOtp = async (event) => {
        event.preventDefault();
    
        if (!isPhoneValid(phone)) {
            setPopup({ open: true, message: t("signup.invalidPhone"), severity: "error" });
            return;
        }
        
        if (!passwordValidity.isValid) {
            setPopup({ open: true, message: t("signup.invalidPassword"), severity: "error" });
            return;
        }
        
        try {
            await sendOtp(email);
            setOtpSent(true);
            setPopup({ open: true, message: t("signup.otpSent"), severity: "success" });
        } catch (error) {
            console.log(error)
            setPopup({ open: true, message: error.response?.data?.message || "Failed to send OTP", severity: "error" });
        }
    };

    const handleVerifyOtpAndSignup = async (event) => {
        event.preventDefault();
        try {
            await verifyOtp(email, otp);
            const res = await signup({ name, email, phone, password });
            setPopup({ open: true, message: t("signup.success"), severity: "success" });

            await login({ email, password, firebaseToken: localStorage.getItem("FCM Token") });

            setTimeout(() => {
                window.location.href = "/";
            }, 2000);

        } catch (error) {
            setPopup({ open: true, message: error.response?.data?.message || "OTP verification failed", severity: "error" });
        }
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        const sanitized = value.replace(/[^0-9\s\-\(\)\+]/g, '');
        setPhone(sanitized);
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
            <Container>
                <Typography variant="h5" fontWeight="bold" color="black" textAlign="center">{t("signup.title")}</Typography>
                <Box sx={{ mx: "auto", mt: 5 }}>
                    <form onSubmit={otpSent ? handleVerifyOtpAndSignup : handleSendOtp}>
                        <TextField
                            fullWidth
                            label={t("signup.fullName")}
                            variant="outlined"
                            sx={{
                                mb: 2, '& label.Mui-focused': {
                                    color: '#B71C1C',
                                },
                                '& .MuiOutlinedInput-root': {
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#B71C1C',
                                    },
                                },
                            }}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={otpSent}
                        />
                        <TextField
                            fullWidth
                            label={t("signup.email")}
                            variant="outlined"
                            type="email"
                            sx={{
                                mb: 2, '& label.Mui-focused': {
                                    color: '#B71C1C',
                                },
                                '& .MuiOutlinedInput-root': {
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#B71C1C',
                                    },
                                },
                            }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={otpSent}
                        />
                        <TextField
                            fullWidth
                            label={t("signup.phone")}
                            variant="outlined"
                            placeholder="+1 234 567 8900"
                            sx={{
                                mb: 2, '& label.Mui-focused': {
                                    color: '#B71C1C',
                                },
                                '& .MuiOutlinedInput-root': {
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#B71C1C',
                                    },
                                },
                            }}
                            value={phone}
                            onChange={handlePhoneChange}
                            disabled={otpSent}
                            error={phone && !isPhoneValid(phone)}
                            helperText={phone && !isPhoneValid(phone) ? t("signup.phoneError") : ""}
                        />
                        <TextField
                            fullWidth
                            label={t("signup.password")}
                            variant="outlined"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => {
                                const newPassword = e.target.value;
                                setPassword(newPassword);
                                const validity = isPasswordValid(newPassword, name);
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
                            disabled={otpSent}
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
                        {showRules && !otpSent && (
                            <Box sx={{ p: 2, border: "1px solid #ccc", borderRadius: "5px", backgroundColor: "#F8F9FA" }}>
                                <Typography variant="body2" color={passwordValidity.length ? "green" : "error"}>
                                    {t("signup.passwordRules.length")}
                                </Typography>
                                <Typography variant="body2" color={passwordValidity.case ? "green" : "error"}>
                                    {t("signup.passwordRules.case")}
                                </Typography>
                                <Typography variant="body2" color={passwordValidity.number ? "green" : "error"}>
                                    {t("signup.passwordRules.number")}
                                </Typography>
                                <Typography variant="body2" color={passwordValidity.special ? "green" : "error"}>
                                    {t("signup.passwordRules.special")}
                                </Typography>
                                <Typography variant="body2" color={passwordValidity.noName ? "green" : "error"}>
                                    {t("signup.passwordRules.noName")}
                                </Typography>
                            </Box>
                        )}
                        {otpSent && (
                            <TextField
                                fullWidth
                                label={t("signup.enterOtp")}
                                variant="outlined"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                sx={{
                                    mt: 2,
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
                        )}
                        <StyledBtn type="submit" fullWidth>
                            {otpSent ? t("signup.verifyOtpBtn") : t("signup.sendOtpBtn")}
                        </StyledBtn>
                        {!otpSent && (
                            <StyledBtn
                                startIcon={<img src="/assets/images/google.png" style={{ width: "25px" }} />}
                                sx={{ backgroundColor: "#fff", color: "black" }}
                                onClick={() => socialLogin("google")}
                                fullWidth
                            >
                                {t("signup.continueWithGoogle")}
                            </StyledBtn>
                        )}
                    </form>
                </Box>
                <Typography variant="body1" color="black" textAlign="center" padding="2rem" fontWeight={"bold"}>
                    {t("signup.terms")}
                </Typography>
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

export default Signup;