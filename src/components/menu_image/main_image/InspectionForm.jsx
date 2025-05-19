import { useState, useRef } from 'react'
import { Box, TextField, Typography, Button, FormControl, Select, InputLabel, MenuItem } from '@mui/material'
import { styled } from "@mui/system"
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CustomSelect from '../../../utils/Select';
import emailjs from '@emailjs/browser';
import { useTranslation } from 'react-i18next';

const Form = styled(Box)({
    backdropFilter: "blur(10px)",
    background: "rgba(121, 121, 121, 0.3)",
    padding: "2rem",
    width: "25rem",
    borderRadius: "20px",
    position: "absolute",
    top: "5rem",
    "@media (max-width: 1100px)": {
        top: "5px"
    },
    "@media (max-width: 786px)": {
        top: "20rem",
        right: "auto",
        left: "auto",
        width: "50%"
    },
    "@media (max-width: 425px)": {
        left: "0",
        width: "85%"
    }
})

const formStyles = {
    display: "flex",
    gap: "12px",
    marginTop: "2rem",
    flexDirection: "column",
    alignItems: "center",
}

const textFieldStyles = {
    backgroundColor: "#fff",
    borderRadius: "15px",
    color: "#000000",
    "& .MuiInputLabel-shrink": {
        display: "none"
    },
    "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
            borderColor: "transparent",
            boxShadow: "none",
        },
        "&:hover fieldset": {
            borderColor: "transparent",
        },
        "& fieldset": {
            borderColor: "transparent",
        }
    }
}

const selectStyles = {
    backgroundColor: "#fff",
    borderRadius: "15px",
    color: "#000000",
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "transparent",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "transparent",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "transparent",
    }
}

function InspectionForm({ leftAdjustment, rightAdjustment, heading, buttonText }) {

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        city: ''
    });
    const [phoneError, setPhoneError] = useState('');
    const { t, i18n } = useTranslation();

    const countries = {
        "": "UAE",
        "sa": "Saudi Arab",
        "qtr": "Qatar",
        "syr": "Syria",
        "us": "USA",
        "eg": "Egypt"
    };

    const cityOptions = t(`cities.${countries[localStorage.getItem("selectedCountry")]}`, { returnObjects: true })
        .map((city) => ({ name: city, value: city }))

    const formRef = useRef();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phone') {
            if (value === '' || /^\d+$/.test(value)) {
                setFormData({
                    ...formData,
                    [name]: value
                });
                setPhoneError('');
            } else {
                setPhoneError(t("inspection.error_phone"));
                return;
            }
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };
    const handleCityChange = (selectedCity) => {
        setFormData({
            ...formData,
            city: selectedCity
        });
    };

    const sendEmail = (e) => {
        e.preventDefault();
        if (phoneError) {
            alert("Please enter a valid phone number (numbers only)");
            return;
        }
        const templateParams = {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            city: formData.city,
            message: `
                Name: ${formData.name}
                Phone: ${formData.phone}
                Email: ${formData.email}
                City: ${formData.city}
            `
        };

        emailjs.send(
            'service_nx01xqp',
            'template_7x2v6n4',
            templateParams,
            'X-YVdfmRqOGareB2p'
        ).then(
            (result) => {
                alert(t("inspection.success_message"));
                setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    city: ''
                });
            },
            (error) => {
                console.error("EmailJS Error:", error);
                alert(t("inspection.error_message"));
            }
        );
    };

    return (
        <Form
            sx={{
                left: i18n.language === 'ar' ? rightAdjustment : leftAdjustment,
                right: i18n.language === 'ar' ? leftAdjustment : rightAdjustment,
            }}
        >
            <Typography variant="h5" fontWeight={"bold"} color="#fff" textAlign="center">
                {t('inspection.heading')}
            </Typography>
            <form style={{ ...formStyles }} onSubmit={sendEmail}>
                <TextField
                    placeholder={t("inspection.name")}
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    variant='outlined'
                    fullWidth
                    sx={textFieldStyles}
                    InputProps={{
                        style: {
                            direction: i18n.language === "ar" ? "rtl" : "ltr",
                            textAlign: i18n.language === "ar" ? "right" : "left",
                        },
                    }}
                    slotProps={{
                        inputLabel: { style: { color: "black" } },
                    }}
                />
                <TextField
                    placeholder={t("inspection.phone")}
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    variant='outlined'
                    fullWidth
                    sx={textFieldStyles}
                    slotProps={{ inputLabel: { style: { color: "black" } } }}
                    inputProps={{
                        inputMode: 'numeric',
                        pattern: '[0-9]*'
                    }}
                    InputProps={{
                        style: {
                            direction: i18n.language === "ar" ? "rtl" : "ltr",
                            textAlign: i18n.language === "ar" ? "right" : "left",
                        },
                    }}
                    error={!!phoneError}
                    helperText={phoneError}
                />
                <TextField
                    placeholder={t("inspection.phone")}
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    variant='outlined'
                    fullWidth
                    sx={textFieldStyles}
                    slotProps={{ inputLabel: { style: { color: "black" } } }}
                    InputProps={{
                        style: {
                            direction: i18n.language === "ar" ? "rtl" : "ltr",
                            textAlign: i18n.language === "ar" ? "right" : "left",
                        },
                    }}
                />

                <CustomSelect
                    styles={{
                        textField: {
                            width: "25rem",
                            background: "#fff",
                            fontSize: "1rem",
                            borderRadius: "15px",
                            "&:focus": {
                                outline: "none",
                                borderColor: "black",
                            },
                            appearance: "none",
                            WebkitAppearance: "none",
                            MozAppearance: "none",
                            "& .MuiOutlinedInput-root": {
                                transform: i18n.language == "ar" && "rotateY(180deg)",
                                borderRadius: "0",
                                textAlign: i18n.language == "ar" && "rotateY(180deg)",
                                "&.Mui-focused fieldset": {
                                    borderColor: "transparent",
                                    boxShadow: "none",
                                },
                                "&:hover fieldset": {
                                    borderColor: "transparent",
                                },
                                "& fieldset": {
                                    borderColor: "transparent",
                                }
                            },
                            "& .MuiInputLabel-shrink": {
                                display: "none"
                            },
                            "& .MuiOutlinedInput-input": {
                                textAlign: i18n.language == "ar" && "right",
                            }
                        },
                        dropdown: {
                            left: "2rem",
                            top: "22.5rem"
                        }
                    }}
                    options={cityOptions}
                    slotProps={{ inputLabel: { style: { color: "black" } } }}
                    onChange={handleCityChange}
                    value={formData.city}
                    name="city"
                    placeholder={t("inspection.city")}
                />

                <Button
                    type="submit"
                    sx={{
                        backgroundColor: "#000000",
                        color: "#fff",
                        fontSize: "25px",
                        borderRadius: "15px",
                        textTransform: "none",
                        "&:focus": {
                            outline: "none",
                        }
                    }}
                    fullWidth
                >
                    {buttonText}
                </Button>
            </form>
        </Form>
    )
}

export default InspectionForm