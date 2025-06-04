import { useState } from "react";
import { Box, Typography, Button, TextField, InputAdornment, IconButton, Container } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { styled } from "@mui/system";
import { login } from "../../api/consumer";
import MessagePopup from "../popup/Popup";

const StyledBtn = styled(Button)({
    border: "1px solid black",
    borderRadius: "5px",
    color: "#fff",
    textAlign: "center",
    backgroundColor: "#B71C1C",
    minWidth: "100%",
    maxWidth: "100%",
    fontSize: "18px",
    fontWeight: "bold",
    marginTop: "1rem",
    padding: "0.5rem",
    textTransform: "none"
})

function JwtLogin({ backBtnHandler }) {

    const [showPassword, setShowPassword] = useState(false);
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [popup, setPopup] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const isEmail = (input) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(input);
    };

    const isPhone = (input) => {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(input.replace(/[\s\-\(\)]/g, ''));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        let loginData = {
            password: password,
            firebaseToken: localStorage.getItem("FCM Token")
        };
        if (isEmail(identifier)) {
            loginData.email = identifier;
        } else if (isPhone(identifier)) {
            loginData.phone = identifier;
        } else {
            setPopup({ open: true, message: "Please enter a valid email or phone number", severity: "error" });
            return;
        }
        
        login(loginData)
            .then(
                (response) => {
                    setPopup({ open: true, message: "Signin Successful!", severity: "success" });
                    setTimeout(
                        () => {
                            window.location.href = "/";
                        },
                        1000
                    )
                }
            )
            .catch(
                (error) => {
                    console.log(error)
                    setPopup({ open: true, message: error.response.data.message, severity: "error" });
                }
            )
    }

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
            <Typography variant="h5" fontWeight="bold" color="black" textAlign="center">Login To Your Account</Typography>
            <Container>
                <Box sx={{ width: window.innerWidth > 800 ? 400 : "auto", mx: "auto", mt: 5 }}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Email or Phone Number"
                            variant="outlined"
                            type="text"
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
                            value={identifier}
                            onChange={(event) => setIdentifier(event.target.value)}
                            placeholder="example@email.com or +1234567890"
                        />

                        <TextField
                            fullWidth
                            label="Password"
                            variant="outlined"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
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
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }
                            }}
                        />
                        <StyledBtn type="submit" fullWidth>
                            Login
                        </StyledBtn>
                        <Button onClick={backBtnHandler} sx={{ color: "black" }} fullWidth>
                            Back
                        </Button>
                    </form>
                </Box>
            </Container>
            <MessagePopup
                open={popup.open}
                handleClose={() => setPopup({ ...popup, open: false })}
                severity={popup.severity}
                message={popup.message}
            />
        </Box>
    );
}

export default JwtLogin;