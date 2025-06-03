import { useState, useEffect } from 'react'
import Nav from '../../components/menu/Nav';
import { Box, Grid, Typography, Card, CardContent, List, ListItemIcon, ListItemText, ListItem, Slider, Container } from "@mui/material";
import CardSlider from '../../components/card/CardSlider';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TestimonialSlider from '../../components/testimonials/Testimonials';
import Footer from '../../components/footer/Footer';
import { getAllAds } from '../../api/consumer';
import Main from '../../components/menu_image/main_image/Main';
import InspectionForm from '../../components/menu_image/main_image/InspectionForm';
import RedRect from '../../components/menu_image/main_image/RedRect';
import { useTranslation } from 'react-i18next'

const BoxStyles = {
    my: 3,
}

function Inspection() {

    const { t, i18n } = useTranslation();
    const inspectionDetails = [
        { name: "Brakes", status: "Good", color: "green", value: 75 },
        { name: "Interior", status: "Needs Attention", color: "red", value: 75 },
        { name: "Exterior", status: "Fair", color: "yellow", value: 75 },
        { name: "Engine", status: "Critical", color: "red", value: 75 }
    ];
    const [data, setData] = useState([]);

    const countries = {
        "": "UAE",
        "sa": "Saudi Arab",
        "qtr": "Qatar",
        "syr": "Syria",
        "eg": "Egypt",
        "us": "USA"
    };

    useEffect(
        () => {
            getAllAds().then(setData)
        },
        []
    )
    const headerText = t("inspectionPage.headerText")
    const headerTextStyles = { color: "#B71C1C", fontWeight: "bolder", marginTop: "4rem", textAlign: i18n.language == "ar" ? "left" : "right", fontSize: "5rem" }
    const text = t("inspectionPage.headerSubText")
    const textStyles = { fontWeight: "bold", fontSize: "22px", textAlign: i18n.language == "ar" ? "left" : "right", fontSize: "2rem"}


    return (
        <>
            <Main showForm={true}
                inspectionForm={<InspectionForm leftAdjustment={0} buttonText={t("inspectionPage.bookInspectionButton")} heading={t("inspectionPage.bookInspectionHeading")} />}
                showText={true}
                headerText={headerText}
                headerTextStyles={headerTextStyles}
                text={text}
                textStyles={textStyles}
                image={i18n.language == "ar" ? "red-bg2_ar" : "red-bg2"}
                redRect={<RedRect right={0} />}
                flexDirection={i18n.language == "ar" ? "row" : "row-reverse"}
            />
            <Container sx={BoxStyles}>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 4, textAlign: i18n.language == "ar" ? "right" : "left" }}>
                    {t("inspectionPage.revolutionizingTitle", { country: t(`countries.${countries[localStorage.getItem('selectedCountry')]}`) })}
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", "@media (max-width: 768px)": { justifyContent: "center" } }}>
                    <Box>
                        <List>
                            {t("inspectionPage.revolutionizingPoints", { returnObjects: true }).map((text, index) => (
                                <ListItem key={index} sx={{ flexDirection: i18n.language === "ar" ? "row-reverse" : "row", textAlign: i18n.language === "ar" ? "right" : "left" }}>
                                    <ListItemIcon>
                                        <CheckCircleIcon sx={{ color: "red" }} />
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>

                    <Card sx={{ p: 2, borderRadius: 2, width: "50%", border: "1px solid #D9D9D9", "@media(max-width:768px)": { width: "100%" } }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={6}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: 2,
                                        mb: 1,
                                        p: 1,
                                        borderRadius: 1,
                                        border: "1px solid #D9D9D9"
                                    }}
                                >
                                    <Box
                                        sx={{
                                            p: 1,
                                            borderRadius: 1,
                                            backgroundColor: "#D9D9D9",
                                            width: "20%",
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <img src="/assets/images/brakes.png" width="100%" />
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            flexDirection: "column",
                                            width: "100%"
                                        }}
                                    >
                                        <Typography fontWeight="bold" >{inspectionDetails[0].name}</Typography>
                                        <Slider
                                            value={inspectionDetails[0].value}
                                            min={0}
                                            max={100}
                                            step={5}
                                            sx={{ color: inspectionDetails[0].color, width: "100%" }}
                                        />
                                    </Box>
                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={6} md={6}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: 2,
                                        mb: 1,
                                        p: 1,
                                        borderRadius: 1,
                                        border: "1px solid #D9D9D9"
                                    }}
                                >
                                    <Box
                                        sx={{
                                            p: 1,
                                            borderRadius: 1,
                                            backgroundColor: "#D9D9D9",
                                            width: "20%",
                                            display: "flex",
                                            justifyContent: "center"
                                        }}
                                    >
                                        <img src="/assets/images/car-seat.png" width="100%" />
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            flexDirection: "column",
                                            width: "100%"
                                        }}
                                    >
                                        <Typography fontWeight="bold">{inspectionDetails[1].name}</Typography>
                                        <Slider
                                            value={inspectionDetails[1].value}
                                            min={0}
                                            max={100}
                                            step={5}
                                            sx={{ color: inspectionDetails[1].color, width: "100%" }}
                                        />
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={6}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: 2,
                                        mb: 1,
                                        p: 1,
                                        borderRadius: 1,
                                        border: "1px solid #D9D9D9"
                                    }}
                                >
                                    <Box
                                        sx={{
                                            p: 1,
                                            borderRadius: 1,
                                            backgroundColor: "#D9D9D9",
                                            width: "20%",
                                            display: "flex",
                                            justifyContent: "center"
                                        }}
                                    >
                                        <img src="/assets/images/car-wash.png" width="100%" />
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            flexDirection: "column",
                                            width: "100%"
                                        }}
                                    >
                                        <Typography fontWeight="bold">{inspectionDetails[2].name}</Typography>
                                        <Slider
                                            value={inspectionDetails[2].value}
                                            min={0}
                                            max={100}
                                            step={5}
                                            sx={{ color: inspectionDetails[2].color, width: "100%" }}
                                        />
                                    </Box>
                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={6} md={6}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: 2,
                                        mb: 1,
                                        p: 1,
                                        borderRadius: 1,
                                        border: "1px solid #D9D9D9"
                                    }}
                                >
                                    <Box
                                        sx={{
                                            p: 1,
                                            borderRadius: 1,
                                            backgroundColor: "#D9D9D9",
                                            width: "20%",
                                            display: "flex",
                                            justifyContent: "center"
                                        }}
                                    >
                                        <img src="/assets/images/car-engine.png" width="100%" />
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            flexDirection: "column",
                                            width: "100%"
                                        }}
                                    >
                                        <Typography fontWeight="bold">{inspectionDetails[3].name}</Typography>
                                        <Slider
                                            value={inspectionDetails[3].value}
                                            min={0}
                                            max={100}
                                            step={5}
                                            sx={{ color: inspectionDetails[3].color, width: "100%" }}
                                        />
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Card>

                </Box>
            </Container>
            <Container sx={BoxStyles}>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 4, textAlign: i18n.language == "ar" ? "right" : "left" }}>
                    {t("inspectionPage.reportIncludesTitle")}
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", "@media (max-width: 768px)": { justifyContent: "center" } }}>
                    <Grid sx={{ "@media (max-width: 768px)": { textAlign: "center" } }}>
                        <img src="/assets/images/inspect1.png" style={{ width: "70%", textAlign: "left" }} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <List>
                            {t("inspectionPage.reportIncludesPoints", { returnObjects: true }).map((text, index) => (
                                <ListItem key={index} sx={{ flexDirection: i18n.language === "ar" ? "row-reverse" : "row", textAlign: i18n.language === "ar" ? "right" : "left" }}>
                                    <ListItemIcon>
                                        <CheckCircleIcon sx={{ color: "red" }} />
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                </Box>
            </Container>
            <Container sx={BoxStyles}>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 4, textAlign: i18n.language == "ar" ? "right" : "left" }}>
                    {t("inspectionPage.scoringCriteriaTitle")}
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", "@media (max-width: 768px)": { justifyContent: "center" } }}>
                    <Grid item xs={12} md={6}>
                        <List>
                            {t("inspectionPage.scoringCriteriaPoints", { returnObjects: true }).map((text, index) => (
                                <ListItem key={index} sx={{ flexDirection: i18n.language === "ar" ? "row-reverse" : "row", textAlign: i18n.language === "ar" ? "right" : "left" }}>
                                    <ListItemIcon>
                                        <CheckCircleIcon sx={{ color: "red" }} />
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                    <Grid textAlign={"right"} sx={{ "@media (max-width: 768px)": { textAlign: "center" } }}>
                        <img src="/assets/images/inspect3.png" style={{ width: "70%" }} />
                    </Grid>
                </Box>
            </Container>
            <CardSlider data={data} title={t("inspectionPage.insuredCars")} />
            <Container sx={BoxStyles}>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 4, textAlign: i18n.language == "ar" ? "right" : "left" }}>
                    {t("inspectionPage.inspectionProcessTitle")}
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", "@media (max-width: 768px)": { justifyContent: "center" } }}>
                    <Grid sx={{ "@media (max-width: 768px)": { textAlign: "center" } }}>
                        <img src="/assets/images/inspect2.png" style={{ width: "70%" }} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <List>
                            {t("inspectionPage.inspectionProcessPoints", { returnObjects: true }).map((text, index) => (
                                <ListItem key={index} sx={{ flexDirection: i18n.language === "ar" ? "row-reverse" : "row", textAlign: i18n.language === "ar" ? "right" : "left" }}>
                                    <ListItemIcon>
                                        <CheckCircleIcon sx={{ color: "red" }} />
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                </Box>
            </Container>
            <TestimonialSlider />
        </>
    )
}

export default Inspection
