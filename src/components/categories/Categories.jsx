import { useState } from 'react'
import { Box, Card, Typography, Container } from '@mui/material'
import { styled } from '@mui/system';
import { useTranslation } from 'react-i18next';

const SimpleCard = styled(Box)({
    display: "flex",
    flexWrap: "wrap",
    background: "none",
    gap: "20px",
    marginTop: "1rem",
    justifyContent: "space-between",
})

const CatCard = styled(Card)(({ theme }) => ({
    height: "7rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "1.2rem 0",
    flex: "1",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
    cursor: "pointer",
    [theme.breakpoints.down("md")]: {
        flex: "1 1 calc(33.33% - 20px)",
        maxWidth: "calc(33.33% - 20px)",
    },
    [theme.breakpoints.down("sm")]: {
        flex: "1 1 calc(50% - 20px)",
        maxWidth: "calc(55% - 20px)",
    },
}));

function Categories({ title, contents }) {

    const { i18n } = useTranslation();

    return (
        <Box sx={{ direction: i18n.language == "ar" && "rtl", my: 3 }}>
            <Container>
                <Box>
                    {
                        <Typography variant="h5" fontWeight="bold" textAlign={i18n.language == "ar" ? "right" : 'left'}>
                            {title}
                        </Typography>
                    }
                </Box>
                <SimpleCard>
                    {
                        contents.map(
                            (content, index) => (
                                <CatCard onClick={() => window.location.href = content.link}>
                                    <img src={`/assets/images/${content.image}.png`} style={{ marginTop: "auto", transform: i18n.language == "ar" && "rotateY(180deg)" }} width="100rem" />
                                    <Typography variant="body" fontWeight="bold" textAlign="center" marginTop="auto">
                                        {content.name}
                                    </Typography>

                                </CatCard>
                            )
                        )
                    }
                </SimpleCard>
            </Container>
        </Box>
    )
}

export default Categories
