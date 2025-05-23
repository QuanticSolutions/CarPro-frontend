import { Box, Grid2, Typography, List, ListItem, Container } from '@mui/material';
import {
    Facebook,
    Twitter,
    Instagram,
    YouTube
} from '@mui/icons-material';

const BoxStyles = {
    pt: 4,
    pb: 5,
    backgroundColor: "#000000",
    marginTop: "auto",
    width: "100%",
    color: "#fff",
    "& a": {
        color: "#fff"
    }
}

import { useTranslation } from "react-i18next";

function MobileFooter({ countryCode }) {

    const { t, i18n } = useTranslation();
    console.log(countryCode)
    const countries = {
        "": "UAE",
        "sa": "Saudi Arabia",
        "qtr": "Qatar",
        "syr": "Syria",
        "eg": "Egypt",
        "us": "USA"
    };
    return (
        <Box sx={BoxStyles}>
            <Container sx={{ position: "relative" }}>
                <Box display={"flex"} gap={2} justifyContent={"space-between"} minWidth={"100%"} sx={{ direction: i18n.language == "ar" && "rtl" }}>
                    <Box display={"flex"} gap={2} flexDirection={"column"}>
                        <Grid2 >
                            <Typography variant="h5" fontWeight="bold">{t("menu.allCategories")}</Typography>
                            <List>
                                <ListItem sx={{ paddingLeft: "0" }}>
                                    <a href="/cars/sell">{t("categories.cars")}</a>
                                </ListItem>
                                <ListItem sx={{ paddingLeft: "0" }}>
                                    <a href="/heavy/sell">{t("categories.heavy")}</a>
                                </ListItem>
                                <ListItem sx={{ paddingLeft: "0" }}>
                                    <a href="/bikes/sell">{t("categories.bikes")}</a>
                                </ListItem>
                                <ListItem sx={{ paddingLeft: "0" }}>
                                    <a href="/plates/sell">{t("categories.plates")}</a>
                                </ListItem>
                                <ListItem sx={{ paddingLeft: "0" }}>
                                    <a href="/construction/sell">{t("categories.construction")}</a>
                                </ListItem>
                                <ListItem sx={{ paddingLeft: "0" }}>
                                    <a href="/boats/sell">{t("categories.boats")}</a>
                                </ListItem>
                            </List>
                        </Grid2>
                        <Grid2>
                            <Typography variant="h5" fontWeight="bold">{t("menu.services")}</Typography>
                            <List>
                                <ListItem sx={{ paddingLeft: "0" }}>
                                    <a href="/services/sell">{t("menu.sellACar")}</a>
                                </ListItem>
                                <ListItem sx={{ paddingLeft: "0" }}>
                                    <a href="/services/rent">{t("menu.rentACar")}</a>
                                </ListItem>
                                <ListItem sx={{ paddingLeft: "0" }}>
                                    <a href="/services/insurance">{t("menu.carInsurance")}</a>
                                </ListItem>
                                <ListItem sx={{ paddingLeft: "0" }}>
                                    <a href="/services/inspection">{t("menu.carInspection")}</a>
                                </ListItem>
                            </List>
                        </Grid2>
                        <Grid2>
                            <Typography variant="h5" fontWeight="bold">{t("footer.company")}</Typography>
                            <List>
                                <ListItem sx={{ paddingLeft: "0" }}>
                                    <a href="/about">{t("footer.aboutUs")}</a>
                                </ListItem>
                                <ListItem sx={{ paddingLeft: "0" }}>
                                    <a href="/terms">{t("footer.terms")}</a>
                                </ListItem>
                                <ListItem sx={{ paddingLeft: "0" }}>
                                    <a href="/privacy">{t("footer.privacy")}</a>
                                </ListItem>
                            </List>
                        </Grid2>
                        <Grid2>
                            <Typography variant="h6" fontWeight="bold">{t("footer.otherCountries")}</Typography>
                            <List>
                                {
                                    countries[countryCode] != "UAE" &&
                                    <ListItem sx={{ paddingLeft: "0" }}>
                                        <a href="/" onClick={() => localStorage.setItem("selectedCountry", "")}>{t("countries.UAE")}</a>
                                    </ListItem>
                                }
                                {
                                    countries[countryCode] != "Saudi Arab" &&
                                    <ListItem sx={{ paddingLeft: "0", textWrap: "nowrap" }}>
                                        <a href="/sa" onClick={() => localStorage.setItem("selectedCountry", "sa")}>{t("countries.Saudi Arabia")}</a>
                                    </ListItem>
                                }
                                {
                                    countries[countryCode] != "Qatar" &&
                                    <ListItem sx={{ paddingLeft: "0" }}>
                                        <a href="/qtr" onClick={() => localStorage.setItem("selectedCountry", "qtr")}>{t("countries.Qatar")}</a>
                                    </ListItem>
                                }
                                {
                                    countries[countryCode] != "Egypt" &&
                                    <ListItem sx={{ paddingLeft: "0" }}>
                                        <a href="/eg" onClick={() => localStorage.setItem("selectedCountry", "eg")}>{t("countries.Egypt")}</a>
                                    </ListItem>
                                }
                                {
                                    countries[countryCode] != "Syria" &&
                                    <ListItem sx={{ paddingLeft: "0" }}>
                                        <a href="/syr" onClick={() => localStorage.setItem("selectedCountry", "syr")}>{t("countries.Syria")}</a>
                                    </ListItem>
                                }
                                {
                                    countries[countryCode] != "USA" &&
                                    <ListItem sx={{ paddingLeft: "0" }}>
                                        <a href="/us" onClick={() => localStorage.setItem("selectedCountry", "us")}>{t("countries.USA")}</a>
                                    </ListItem>
                                }
                            </List>
                        </Grid2>
                    </Box>
                    <Box display={"flex"} gap={2} flexDirection={"column"}>
                        <Grid2 xs={6}>
                            <Typography variant="h6" fontWeight="bold">{t(`countries.${countries[countryCode]}`)}</Typography>
                            <List>
                                {t(`cities.${countries[countryCode || ""]}`, { returnObjects: true }).slice(0, 5).map((city, index) => (
                                    <ListItem key={index} sx={{ paddingLeft: "0" }}>
                                        <a href={`${countryCode}/ads?location=${city}`}>{city}</a>
                                    </ListItem>
                                ))}
                            </List>
                        </Grid2>
                        <Grid2>
                            <Typography variant="h5" fontWeight="bold">{t("footer.help")}</Typography>
                            <List>
                                <ListItem sx={{ paddingLeft: "0" }}>
                                    <a href="/contact">{t("footer.contact")}</a>
                                </ListItem>
                                <ListItem sx={{ paddingLeft: "0" }}>
                                    <a onClick={() => window.alert("Call Us on +123 456 789")}>{t("footer.call")}</a>
                                </ListItem>
                            </List>
                        </Grid2>
                        <Grid2 xs={6}>
                            <Typography variant="h5" fontWeight="bold">{t("footer.languages")}</Typography>
                            <List>
                                <ListItem sx={{ paddingLeft: "0" }}>
                                    <a>{t("footer.english")}</a>
                                </ListItem>
                                <ListItem sx={{ paddingLeft: "0" }}>
                                    <a>{t("footer.arabic")}</a>
                                </ListItem>
                            </List>
                            <List sx={{ display: "flex", m: 0, p: 0, flexWrap: "wrap" }}>
                                <Box>
                                    <ListItem sx={{ p: 1, m: 0, pl: 0 }}>
                                        <a style={{ display: 'flex', alignItems: "center" }}>
                                            <Facebook sx={{ fontSize: 22, borderRadius: '50%', backgroundColor: '#fff', padding: '4px', color: "black" }} />
                                        </a>
                                    </ListItem>
                                    <ListItem sx={{ p: 1, m: 0, pl: 0 }}>
                                        <a style={{ display: 'flex', alignItems: "center" }}>
                                            <Twitter sx={{ fontSize: 22, borderRadius: '50%', backgroundColor: '#fff', padding: '4px', color: "black" }} />
                                        </a>
                                    </ListItem>
                                </Box>
                                <Box>
                                    <ListItem sx={{ p: 1, m: 0, pl: 0 }}>
                                        <a style={{ display: 'flex', alignItems: "center" }}>
                                            <YouTube sx={{ fontSize: 22, borderRadius: '50%', backgroundColor: '#fff', padding: '4px', color: "black" }} />
                                        </a>
                                    </ListItem>
                                    <ListItem sx={{ p: 1, m: 0, pl: 0 }}>
                                        <a style={{ display: 'flex', alignItems: "center" }}>
                                            <Instagram sx={{ fontSize: 22, borderRadius: '50%', backgroundColor: '#fff', padding: '4px', color: "black" }} />
                                        </a>
                                    </ListItem>
                                </Box>
                            </List>
                        </Grid2>
                        <Box sx={{ display: "flex", gap: 2, mt: 2, flexDirection: "column" }}>
                            {t("footer.downloadApp")}
                            <img src="/assets/images/playstore.png" style={{ width: "10rem" }} />
                            <img src="/assets/images/apple.svg" style={{ width: "10rem" }} />
                        </Box>
                    </Box>
                </Box>
                <Box container spacing={2} display="flex" flexDirection="column" alignItems="center" py="1rem" mt="2rem" width="100%" sx={{ "@media (max-width:425px)": { alignItems: "center", px: 1 } }}>
                    <Typography variant="body" fontWeight="bold" marginTop="auto">{t("footer.copyright")}</Typography>
                </Box>
            </Container>
        </Box>
    )
}

export default MobileFooter;
