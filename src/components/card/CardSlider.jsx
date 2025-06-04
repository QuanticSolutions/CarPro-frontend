import { useState } from "react";
import { Box, Typography, Container } from "@mui/material";
import AuthDialog from "../auth/Dialog";
import CarCard from "./Card";
import { createFavs, isAuthenticated, deleteFav } from "../../api/consumer";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Slider from "../slider/slider";
import { useTranslation } from 'react-i18next'

const styles = {
    backgroundColor: "none",
    height: "3rem",
    textWrap: "no-wrap",
    display: "flex",
    alignItems: "center",
    color: "#B71C1C",
    fontWeight: "bold",
    fontSize: window.innerWidth >= 768 ? "15px" : "12px",
    borderRadius: "0",
    padding: 0,
    textTransform: "none",
}

const BoxStyles = {
    display: "flex",
    justifyContent: "space-between",
    mt: 2,
}

function CardSlider({ data, title, openTo = "featured", category }) {

    const [popupOpen, setPopupOpen] = useState(false);
    const [popup1Open, setPopup1Open] = useState(false);
    const { t, i18n } = useTranslation();
    const handleFavBtn = (isFav, data) => {
        if (isAuthenticated) {
            if (isFav) {
                deleteFav(data.id)
            }
            else {
                createFavs({ user_id: localStorage.getItem("user_id"), ad_id: data.id })
            }
            return true;
        }
        else {
            setPopupOpen(true);
            return false;
        }
    }

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
            slidesToSlide: 1,
        },
        mediumDesktop: {
            breakpoint: { max: 1024, min: 900 },
            items: 3,
            slidesToSlide: 1,
        },
        tablet: {
            breakpoint: { max: 900, min: 768 },
            items: 2,
            slidesToSlide: 1,
        },
        mobile: {
            breakpoint: { max: 768, min: 0 },
            items: 2,
            slidesToSlide: 1,
        },
    };

    return (
        <>
            <Container sx={{ width: "100%", margin: "auto", position: "relative", my: 3 }}>
                <Box sx={BoxStyles} flexDirection={i18n.language == "ar" ? "row-reverse" : "row"}>
                    <Typography variant="h5" fontWeight="bold" textAlign={i18n.language == "ar" ? "right" : "left"}>
                        {title}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: i18n.language == "ar" ? "flex-start" : "flex-end", mt: 1 }}>
                    <a style={{ ...styles, flexDirection: i18n.language == "ar" && "row-reverse" }} href={`/${openTo}/${category}`}>
                        {t("home.viewMore")}
                        {
                            i18n.language == "ar" ?
                                <ChevronLeftIcon sx={{ padding: 0 }} /> :
                                <ChevronRightIcon sx={{ padding: 0 }} />
                        }
                    </a>
                </Box>
                {
                    window.innerWidth > 900 &&
                    <Box sx={{ mt: 2, position: "relative", }}>
                        <Slider data={data} Template={CarCard} action={handleFavBtn} responsiveOptions={responsive} />
                    </Box>
                }
            </Container>
            {
                window.innerWidth <= 900 &&
                <Box sx={{ mt: 2, position: "relative", "@media (max-width: 900px)": { width: "100vw" } }}>
                    <Slider data={data} Template={CarCard} action={handleFavBtn} responsiveOptions={responsive} />
                </Box>
            }
            <Container sx={{ width: "100%", margin: "auto", position: "relative", my: 3 }}>
                <AuthDialog setPopupOpen={setPopupOpen} popupOpen={popupOpen} setPopup1Open={setPopup1Open} popup1Open={popup1Open} />
            </Container>
        </>
    );
}

export default CardSlider;
