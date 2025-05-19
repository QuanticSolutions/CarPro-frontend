import React from "react";
import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";

const NewsCard = ({ article, width, height }) => {
    return (
        <Card sx={{ position: "relative", borderRadius: 2, flex: 1, height: height, "@media (max-width: 425px)": { maxHeight: "8rem"}}}>
            <CardMedia
                component="img"
                image={article.image}
                alt={article.title}
                sx={{ filter: "brightness(80%)" }}
            />
            <Box
                sx={{
                    position: "absolute",
                    top: 8,
                    left: 8,
                    background: "red",
                    color: "white",
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                }}
            >
                New
            </Box>
            <CardContent sx={{ position: "absolute", bottom: 0, color: "white" }}>
                <Typography variant="body1" sx={{ fontWeight: "bold", "@media (max-width: 425px)": { fontSize: "12px"} }}>
                    {article.title}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8, "@media (max-width: 425px)": { fontSize: "10px"} }}>
                    {article.date}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default NewsCard;
