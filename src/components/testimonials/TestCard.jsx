import React from "react";
import { Card, CardContent, Typography, Avatar, CardMedia, Box } from "@mui/material";

const TestCard = ({ data }) => {

    return (
        <Card
            sx={{
                background: "url(/assets/images/test-card.png)",
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                boxShadow: "none",
                color: "white",
                borderRadius: "35px",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                p: 2,
                width: "20rem",
                minWidh: "22rem",
                maxWidth: "22rem",
                minHeight: "13rem",
                maxHeight: "13rem",
                // "&:hover": {
                //     transform: "scale(1.03)",
                //     transition: "1s"
                // }

            }}
        >
            <img src="/assets/images/qoutes.png" style={{ position: "absolute", top: 0 }} />
            <Typography variant="body1" textAlign="left" sx={{ fontSize: "18px", px: 3, mt: 2 }}>
                {data.text}
            </Typography>
            <Box sx={{ display: "flex", aligndatas: "center", position: "absolute", bottom: 20, "@media(max-width:600px)": { bottom: 20 } }}>
                <Avatar src={data.avatar} sx={{ width: 40, height: 40, mr: 2, }} />
                <Box textAlign="left">
                    <Typography fontWeight="bold" textAlign={"left"}>{data.name}</Typography>
                    <Typography variant="body2">{data.company}</Typography>
                </Box>
            </Box>
        </Card>
    );
};

export default TestCard