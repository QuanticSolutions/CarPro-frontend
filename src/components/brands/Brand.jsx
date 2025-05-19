import { useState } from 'react'
import { Card, CardMedia, Typography, CardContent } from '@mui/material'


function Brand({ image, name }) {

    return (
        <Card
            sx={{
                textAlign: "center",
                display: "flex",
                background: "none",
                flexDirection: "column",
                boxShadow: 0,
                alignItems: "center",
                flex: "1",
                "@media (min-width: 1024px)": {
                    flex: "1 1 calc(12% - 20px)",
                    maxWidth: "calc(12% - 20px)",
                },
                "@media (max-width: 768px)": {
                    flex: "1 1 calc(20% - 20px)",
                    maxWidth: "calc(20% - 20px)",
                },
                "@media (max-width: 425px)": {
                    flex: "1 1 calc(25% - 20px)",
                    maxWidth: "calc(25% - 20px)",
                },
                "@media (max-width: 320px)": {
                    flex: "1 1 calc(30% - 20px)",
                    maxWidth: "calc(30% - 20px)",
                },
            }}
        >
            <CardContent sx={{ marginTop: "auto" }}>
                <img src={`/assets/images/${image}.png`} style={{ width: "5rem"}}/>
                <Typography variant="body1" fontWeight="bold">
                    {name}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Brand
