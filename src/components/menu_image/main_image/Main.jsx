import { Box, Grid2, Typography, Container, useMediaQuery } from '@mui/material'
import { borderRadius, styled } from "@mui/system"
import { useTranslation } from 'react-i18next';

const ImageContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    position: "relative",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    backgroundSize: 'cover',
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    flex: "1 0 auto",
    "@media (max-width: 950px)": {
        display: "none"
    },
    [theme.breakpoints.down("md")]: {
        display: "none"
    },
    [theme.breakpoints.between("sm", "md")]: {
        height: "65vh",
        textAlign: "center",
    },
}));

const Grid = styled(Grid2)({
    color: "#fff",
    m: 0,
    p: 0
})

const HeaderText = styled(Typography)({
    marginTop: "3rem",
    "@media (max-width: 786px)": {
        textAlign: "center",
        fontSize: "40px"
    }
})

const Text = styled(Typography)({
    "@media (max-width: 786px)": {
        fontSize: "20px",
        textAlign: "center",
    }
})


function Main({ showForm, form, image, showText, headerText, headerTextStyles, text, textStyles, redRect, inspectionForm, flexDirection, justifyContent, overlay=false }) {

    const isMobile = useMediaQuery("(max-width:768px)");
    const { i18n } = useTranslation();

    const BoxStyles = {
        position: "relative",
        display: "flex",
        justifyContent: justifyContent,
        flexDirection: flexDirection,
        width: "100%",
        "@media (max-width: 768px)": {
            flexWrap: "wrap",
            justifyContent: "center",
        },
    }

    return (
        <ImageContainer
            sx={{
                backgroundImage: `url(/assets/images/${image}.png)`,
                height: "45rem",
                backgroundColor: "#F2F3F3",
                mt: 7
            }}
        >
            {
                overlay &&
                <Box sx={{
                    position: "absolute",
                    top: "55%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    background: "rgba(0, 0, 0, 0.4)",
                    height: "80%",
                    width: "75%",
                    borderRadius: 5,
                }} />
            }
            <Container sx={BoxStyles}>
                {showText && (
                    <Grid>
                        <HeaderText variant="h2" sx={headerTextStyles}>
                            {
                                headerText.split ?
                                    headerText.split("\n").map((line, index) => (
                                        <span key={index}>
                                            {line}
                                            <br />
                                        </span>
                                    ))
                                    :
                                    headerText
                            }
                        </HeaderText>
                        <Text variant="body1" sx={textStyles}>
                            {text.split("\n").map((line, index) => (
                                <span key={index}>
                                    {line}
                                    <br />
                                </span>
                            ))}
                            {redRect}
                        </Text>
                    </Grid>
                )}
                {showForm && inspectionForm}
            </Container>
            {showForm && form}
        </ImageContainer>
    );
}

export default Main