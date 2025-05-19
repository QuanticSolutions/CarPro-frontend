import React from "react";
import { Box, Button, Card, CardContent, CardMedia, Grid2, Typography, Container } from "@mui/material";
import NewsCard from "./NewsCard";
import { useTranslation } from 'react-i18next'

const articles = [
    {
        id: 1,
        title: "The Rise of Electric Vehicles in Pakistan: Are We Ready for the Shift?",
        date: "DEC. 23, 2025",
        image: "/assets/images/news4.png",
        large: false,
    },
    {
        id: 2,
        title: "Car Sales Trends: 2023 vs. 2024",
        date: "DEC. 23, 2025",
        image: "/assets/images/news3.png",
        large: false,
    },
    {
        id: 3,
        title: "Car Prices in Pakistan: Dec 2023 vs. Dec 2024",
        date: "DEC. 23, 2025",
        image: "/assets/images/news1.png",
        large: false,
    },
    {
        id: 4,
        title: "2024 Wrap – All EVs Launched in Pakistan",
        date: "DEC. 23, 2025",
        image: "/assets/images/news2.png",
        large: false,
    },
];

const BoxStyles = {
    background: "linear-gradient(to bottom, #651111, #300303)",
    color: "white",
    marginTop: "4rem",
    marginBottom: "4rem",
    py: 4,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
}

const News = () => {
    const { t, i18n } = useTranslation();
    return (
        <Box sx={BoxStyles}>
            <Container>
                <Typography variant="h4"  sx={{ fontWeight: "bold", mb: 3, textAlign: i18n.language == "ar" ? "right" : "left" }}>
                    {t("news.title")}
                </Typography>
                <Box sx={{ display: "flex", gap: 1, mb: 3, flexWrap: "wrap", justifyContent: i18n.language == "ar" ? "right" : "left" }}>
                    {["all", "carNews", "newLaunches", "carReviews"].map((category) => (
                        <Button
                            key={t(`news.categories.${category}`)}
                            variant={category === "All" ? "contained" : "outlined"}
                            sx={{
                                background: category === "All" ? "white" : "black",
                                border: "none",
                                color: category === "All" ? "black" : "white",
                                "&:hover": {
                                    background: "gray",
                                },
                            }}
                        >
                            {t(`news.categories.${category}`)}
                        </Button>
                    ))}
                </Box>
                <Box sx={{
                    padding: 3, display: "flex", gap: 2,
                    justifyContent: "center",
                    "@media (max-width:768px)": {
                        flexDirection: "column"
                    }
                }}>

                    <Box>
                        <NewsCard article={articles[0]} height="22rem" />
                    </Box>
                    <Grid2>
                        <NewsCard article={articles[1]} height="10rem" />
                        <Box gap={2} pt={2} display="flex" sx={{ "@media (max-width: 425px)": { flexDirection: "column", alignItems: "center" } }}>
                            <NewsCard article={articles[2]} height="11rem" />
                            <NewsCard article={articles[3]} height="11rem" />
                        </Box>
                    </Grid2>
                </Box>
            </Container>
        </Box>
    );
};

export default News;
