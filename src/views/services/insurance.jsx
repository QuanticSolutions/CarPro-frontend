import { useState } from 'react'
import LocalCarWashIcon from "@mui/icons-material/LocalCarWash";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import { Box, Grid, Typography, Card, CardContent, Container } from "@mui/material";
import Services from '../../components/services/Services';
import Banner from '../../components/banner.jsx/Banner';
import Main from '../../components/menu_image/main_image/Main';
import InspectionForm from '../../components/menu_image/main_image/InspectionForm';
import RedRect from '../../components/menu_image/main_image/RedRect';
import { useTranslation } from 'react-i18next'

function Insurance() {

    const { t, i18n } = useTranslation();
    const cards = [
        {
            title: t("insurancePage.customerService"),
            content: t("insurancePage.customerServiceContent"),
            img: "11"
        },
        {
            title: t("insurancePage.lowRates"),
            content: t("insurancePage.lowRatesContent"),
            img: "12"
        },
        {
            title: t("insurancePage.coveragePlans"),
            content: t("insurancePage.coveragePlansContent"),
            img: "13"
        },
        {
            title: t("insurancePage.compareRates"),
            content: t("insurancePage.compareRatesContent"),
            img: "14"
        }
    ]

    const benefits = [
        { title: t("insurancePage.legalProtection"), description: t("insurancePage.legalProtectionDescription") },
        { title: t("insurancePage.personalAccidentCover"), description: t("insurancePage.personalAccidentCoverDescription") },
        { title: t("insurancePage.financialSecurity"), description: t("insurancePage.financialSecurityDescription") },
        { title: t("insurancePage.peaceOfMind"), description: t("insurancePage.peaceOfMindDescription") },
        { title: t("insurancePage.protectionAgainstTheft"), description: t("insurancePage.protectionAgainstTheftDescription") },
        { title: t("insurancePage.legalCompliance"), description: t("insurancePage.legalComplianceDescription") }
    ];

    const insuranceTypes = [
        {
            title: "Comprehensive Car Insurance",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
            icon: <LocalCarWashIcon sx={{ fontSize: 50, color: "red" }} />
        },
        {
            title: "Third-Party Liability Car Insurance",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
            icon: <DirectionsCarIcon sx={{ fontSize: 50, color: "red" }} />
        },
        {
            title: "Collision Car Insurance",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
            icon: <CarCrashIcon sx={{ fontSize: 50, color: "red" }} />
        }
    ];
    const headerText = t("insurancePage.headerText")
    const headerTextStyles = { color: "#B71C1C", fontWeight: "bolder", marginTop: "4rem", textAlign: i18n.language == "ar" ? "right" : "left", fontSize: "5rem" }
    const text = t("insurancePage.text")
    const textStyles = { fontWeight: "bold", fontSize: "22px", textAlign: i18n.language == "ar" ? "right" : "left", fontSize: "2rem"}

    return (
        <>
            <Main showForm={true}
                inspectionForm={<InspectionForm rightAdjustment={0} buttonText={t("insurancePage.bookInsurance")} heading={t("insurancePage.bookInsuranceWithUs")} />}
                showText={true}
                headerText={headerText}
                headerTextStyles={headerTextStyles}
                text={text}
                textStyles={textStyles}
                image={i18n.language == "ar" ? "red-bg1_ar" : "red-bg1"}
                redRect={<RedRect />}
                flexDirection={i18n.language == "ar" ? "row-reverse" : "row"}
            />
            <Services title={t("insurancePage.chooseInsurancePackage")} cards={cards} background="linear-gradient(#B71C1C, black)" gap="45px" />
            <Banner image="16" width="65rem" />
            <Container sx={{my: 3 }}>
                <Typography variant="h5" fontWeight="bold" textAlign={i18n.language == "ar" ? "right" : "left"} sx={{ "@media (max-width: 786px)": { textAlign: "center" } }} gutterBottom>
                    {t("insurancePage.whyInsuranceEssential")}
                </Typography>

                <Grid container spacing={10} alignItems="center" justifyContent={"center"} sx={{ "@media (max-width: 786px)": { flexDirection: "column" } }}>
                    <Grid item xs={12} sm={5}>
                        {benefits.slice(0, 3).map((benefit, index) => (
                            <Box key={index} sx={{ mb: 2 }}>
                                <Typography variant="body1" fontWeight="bold" textAlign={i18n.language == "ar" ? "right" : "left"}>▪ {benefit.title}</Typography>
                                <Typography variant="body2" color="textSecondary" textAlign={i18n.language == "ar" ? "right" : "left"}>{benefit.description}</Typography>
                            </Box>
                        ))}
                    </Grid>

                    <Grid item xs={12} sm={2} display="flex" justifyContent="center">
                        <img component="img" src="/assets/images/car-image.png" alt="Car with seatbelt" style={{ width: "50", maxWidth: 180 }} />
                    </Grid>

                    <Grid item xs={12} sm={5}>
                        {benefits.slice(3, 6).map((benefit, index) => (
                            <Box key={index} sx={{ mb: 2 }}>
                                <Typography variant="body1" fontWeight="bold" textAlign={i18n.language == "ar" ? "right" : "left"}>▪ {benefit.title}</Typography>
                                <Typography variant="body2" color="textSecondary" textAlign={i18n.language == "ar" ? "right" : "left"}>{benefit.description}</Typography>
                            </Box>
                        ))}
                    </Grid>
                </Grid>
            </Container>
            <Box sx={{ backgroundColor: "#5D0101", py: 6, my: 3 }}>
                <Container>
                    <Box sx={{ color: "white", mb: 4 }}>
                        <Typography variant="h5" fontWeight="bold" textAlign={i18n.language == "ar" ? "right" : "left"}>
                            {t("insurancePage.carInsuranceTypes")}
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent={"center"} gap={4} flexWrap="wrap" sx={{ "@media (max-width: 768px)": { flexDirection: "column" } }}>
                        {insuranceTypes.map((insurance, index) => (
                            <Card sx={{ p: 2, textAlign: "center", borderRadius: 2, boxShadow: 3, flex: 1 }}>
                                <CardContent>
                                    {insurance.icon}
                                    <Typography variant="body1" fontWeight="bold" sx={{ mt: 2 }}>
                                        {insurance.title}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default Insurance
