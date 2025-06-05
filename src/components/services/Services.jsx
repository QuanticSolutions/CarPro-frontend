import { useState } from 'react'
import { Box, Card, Typography, CardContent, CardMedia, Container } from '@mui/material'
import { styled } from '@mui/system'
import { useTranslation } from 'react-i18next';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


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
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
    cursor: "pointer",
    "@media (max-width: 500px)": {
        width: "90%"
    }
}));



function Services({ title, cards, background, alternateBg, gap = "30px" }) {

    const { i18n } = useTranslation();
    const responsiveOptions = {
        mobile: {
            breakpoint: { max: 900, min: 0 },
            items: 1,
            slidesToSlide: 1,
        },
    };

    return (
        <Box sx={{direction: i18n.language == "ar" && "rtl", my:3 }}>
            <Container>
                <Box>
                    <Typography variant="h5" fontWeight="bold" textAlign={i18n.language == "ar" ? "right" : 'left'}>
                        {title}
                    </Typography>
                </Box>
                {
                    window.innerWidth > 900 ?
                        <SimpleCard gap={gap}>
                            {
                                cards.map(
                                    (card, index) => (
                                        <CatCard sx={{ background: index % 2 == 0 ? background : alternateBg ? alternateBg : background, boxShadow: "none", flex: 1 }} onClick={() => { if (card.link) window.location.href = card.link }}>
                                            <CardMedia>
                                                <img src={`/assets/images/${card.img}.png`} style={{ transform: i18n.language == "ar" && "rotateY(180deg)" }} />
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
                        </SimpleCard> :
                        <Carousel
                            swipeable={true}
                            draggable={true}
                            showDots={false}
                            responsive={responsiveOptions || responsive}
                            ssr={true}
                            infinite={true}
                            arrows={false}
                            autoPlay={true}
                            autoPlaySpeed={3000}
                            keyBoardControl={true}
                            transitionDuration={500}
                            itemClass="test-carousel-item"
                            centerMode={false}
                            renderButtonGroupOutside={true}
                        >
                            {
                                cards.map(
                                    (card, index) => (
                                        <CatCard sx={{ background: index % 2 == 0 ? background : alternateBg ? alternateBg : background, boxShadow: "none", minHeight: "14rem", justifyContent: "center" }} onClick={() => { if (card.link) window.location.href = card.link }}>
                                            <CardMedia>
                                                <img src={`/assets/images/${card.img}.png`} style={{ transform: i18n.language == "ar" && "rotateY(180deg)" }}/>
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
                        </Carousel>
                }
            </Container>
        </Box>
    )
}

export default Services
