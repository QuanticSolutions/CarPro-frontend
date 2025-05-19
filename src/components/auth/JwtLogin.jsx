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
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [popup, setPopup] = useState({
        open: false,
        message: "",
        severity: "success",
    });


    const handleSubmit = (event, data) => {
        event.preventDefault();
        login(data)
            .then(
                (response) => {
                    setPopup({ open: true, message: "Signin Successful!", severity: "success" });
                    setTimeout(
                        () => {
                            window.location.href = "/";
                        },
                        2000
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
                    <form onSubmit={() => handleSubmit(event, { email: email, password: password, firebaseToken: localStorage.getItem("FCM Token") })}>
                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
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
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
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
