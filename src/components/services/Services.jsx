import { useState } from 'react'
import { Box, Card, Typography, CardContent, CardMedia, CardHeader, Container } from '@mui/material'
import { styled } from '@mui/system'
import { useTranslation } from 'react-i18next';

const SimpleCard = styled(Box)({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    background: "none",
    marginTop: "1rem",
})

const CatCard = styled(Card)(({ theme }) => ({
    display: "flex",
    borderRadius: "10px",
    flexDirection: "column",
    color: "#fff",
    alignItems: "center",
    padding: "1rem",
    flex: "1",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
    cursor: "pointer",
    [theme.breakpoints.down("md")]: {
        flex: "1 1 calc(33.33% - 20px)",
        maxWidth: "calc(33.33% - 20px)",
    },
    [theme.breakpoints.down("sm")]: {
        flex: "1 1 calc(40% - 20px)",
        maxWidth: "calc(40% - 20px)",
    },
    [theme.breakpoints.down("xs")]: {
        flex: "1 1 calc(20% - 20px)",
        maxWidth: "calc(20% - 20px)",
    },
    "@media (max-width: 400px)": {
        flex: "1 1 calc(100% - 20px)",
        maxWidth: "calc(100% - 20px)",
    }
}));

function Services({ title, cards, background, alternateBg, gap = "30px" }) {

    const { i18n } = useTranslation();
    
    return (
        <Box sx={{ mt: "4rem", direction: i18n.language == "ar" && "rtl" }}>
            <Container>
                <Box>
                    <Typography variant="h5" fontWeight="bold" textAlign={i18n.language == "ar" ? "right" : 'left'}>
                        {title}
                    </Typography>
                </Box>
                <SimpleCard gap={gap}>
                    {
                        cards.map(
                            (card, index) => (
                                <CatCard sx={{ background: index % 2 == 0 ? background : alternateBg ? alternateBg : background, boxShadow: "none" }} onClick={() => { if (card.link) window.location.href = card.link }}>
                                    <CardMedia>
                                        <img src={`/assets/images/${card.img}.png`} />
                                    </CardMedia>
                                    <Typography variant="h6" fontWeight="bold" textAlign="center">
                                        {card.title}
                                    </Typography>
                                    <CardContent sx={{ textAlign: "center" }}>
                                        <Typography variant="body" textAlign="center">
                                            {card.content}
                                        </Typography>
                                    </CardContent>
                                </CatCard>
                            )
                        )
                    }
                </SimpleCard>

            </Container>
        </Box>
    )
}

export default Services
