import { useState } from 'react'
import { Box, Typography, Grid2 } from '@mui/material'
import { useTranslation } from 'react-i18next'

const boxStyles = {
    position: "absolute",
    backgroundImage: "url(/assets/images/red_rect.png)",
    backgroundSize: "cover",
    width: "max-content",
    padding: "0.5rem",
}

const gridStyles = {
    position: "relative",
    "@media (max-width: 786px)": {
        width: "100%",
        display: "flex",
        justifyContent: "center"
    }
}

function RedRect({ right }) {
    const { t } = useTranslation();
    return (
        <Grid2 sx={gridStyles}>
            <Box sx={boxStyles} right={right}>
                <Typography variant="h4" sx={{ fontWeight: "bold", "@media (max-width: 375px)": { fontSize: "16px" } }}>
                    {t("getQuoteNow")}
                </Typography>
            </Box>
        </Grid2>
    )
}

export default RedRect
