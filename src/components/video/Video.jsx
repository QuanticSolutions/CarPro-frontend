import { Box, Typography, Button, Container } from '@mui/material'
import Slider from '../slider/slider';
import VideoCard from './VideoCard';
import { useTranslation } from 'react-i18next'

const styles = {
    backgroundColor: "#E00000",
    width: "7rem",
    color: "#fff",
    fontWeight: "bold",
    border: "3px solid #fff",
    borderRadius: "5px",
    textTransform: "none"
}


const videos = [
    {
        image: "vid1"
    },
    {
        image: "vid2"
    },
    {
        image: "vid3"
    },
    {
        image: "vid1"
    },
    {
        image: "vid2"
    }
]


function Video() {

    const template = (vids) => {
        return (
            <VideoCard image={vids.image} />
        )
    }
    const { t, i18n } = useTranslation();
    return (
        <Box sx={{ width: "100%", margin: "auto", my: 3 }}>
            <Container>
                <Box sx={{ mb: 3}}>
                    <Typography variant="h5" fontWeight="bold" fontFamily='"Franklin Gothic Demi", sans-serif' textAlign={i18n.language == "ar" ? "right" : "left"}>
                        {t("videoSection.title")}
                    </Typography>
                    <Typography variant="body1" fontFamily='"Franklin Gothic Demi", sans-serif' textAlign={i18n.language == "ar" ? "right" : "left"}>
                        {t("videoSection.description")}
                    </Typography>
                </Box>
                <Box sx={{ position: "relative" }}>
                    <Slider data={videos} Template={VideoCard} toShow={3} carouselClass='test-carousel-item' />
                </Box>
                <Box sx={{ width: "100%", display: "flex", justifyContent: "center", py: "2rem" }}>
                    <Button sx={styles}>
                        {t("videoSection.viewAll")}
                    </Button>
                </Box>
            </Container>
        </Box>
    )
}

export default Video