import { useState } from 'react'
import { Box, Grid2, Typography, Container, useMediaQuery } from '@mui/material'
import { display, styled, textAlign } from "@mui/system"
import PostBtn from '../PostBtn'
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


function Main({ showForm, form, image, showText, headerText, headerTextStyles, text, textStyles, redRect, inspectionForm, flexDirection, justifyContent }) {

    const isMobile = useMediaQuery("(max-width:768px)");
    const { i18n } = useTranslation();

    const BoxStyles = {
        position: "relative",
        display: "flex",
        justifyContent: justifyContent,
        flexDirection: flexDirection,
        height: "100%",
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
                height: {
                    xs: "50vh",
                    md: "95vh",
                    lg: "90vh"
                },
                backgroundColor: "#F2F3F3",
                mt: 3
            }}
        >
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