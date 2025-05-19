import { Box, Grid2, Typography, List, ListItem, Container } from '@mui/material';
import {
    Facebook,
    Twitter,
    Instagram,
    LinkedIn,
    YouTube,
    Pinterest,
    Reddit,
    GitHub
} from '@mui/icons-material';
import { useTranslation } from "react-i18next";
import { styled } from "@mui/system"

const BoxStyles = {
    pt: 4,
    backgroundColor: "#000000",
    marginTop: "auto",
    width: "100%",
    color: "#fff",
    "& a": {
        color: "#fff"
    }
}

function Footer({ countryCode }) {

    const { t, i18n } = useTranslation();
    const StyledListItem = styled(ListItem)({
        flexDirection: i18n.language == "ar" && "row-reverse",
        paddingLeft: "0"
    });
    const countries = {
        "": "UAE",
        "sa": "Saudi Arab",
        "qtr": "Qatar",
        "syr": "Syria",
        "eg": "Egypt",
        "us": "USA"
    };
    return (
        <Box sx={{ ...BoxStyles, textAlign: i18n.language == "ar" && "right" }}>
            <Container sx={{ position: "relative" }}>
                <Box display="flex" flexDirection={i18n.language == "ar" && "row-reverse"} justifyContent="space-between" gap={5} sx={{ "@media (max-width: 768px)": { pl: 1, flexWrap: "wrap", gap: 1 } }}>
                    <Grid2>
                        <Typography variant="h6" fontWeight="bold">{t("menu.allCategories")}</Typography>
                        <List>
                            <StyledListItem sx={{ paddingLeft: "0" }}>
                                <a href="/cars/sell">{t("categories.cars")}</a>
                            </StyledListItem>
                            <StyledListItem sx={{ paddingLeft: "0", flexDirection: i18n == "ar" && "row-reverse" }}>
                                <a href="/heavy/sell">{t("categories.heavy")}</a>
                            </StyledListItem>
                            <StyledListItem sx={{ paddingLeft: "0", flexDirection: i18n == "ar" && "row-reverse" }}>
                                <a href="/bikes/sell">{t("categories.bikes")}</a>
                            </StyledListItem>
                            <StyledListItem sx={{ paddingLeft: "0" }}>
                                <a href="/plates/sell">{t("categories.plates")}</a>
                            </StyledListItem>
                            <StyledListItem sx={{ paddingLeft: "0" }}>
                                <a href="/construction/sell">{t("categories.construction")}</a>
                            </StyledListItem>
                            <StyledListItem sx={{ paddingLeft: "0" }}>
                                <a href="/boats/sell">{t("categories.boats")}</a>
                            </StyledListItem>
                        </List>
                    </Grid2>
                    <Grid2 sx={{ position: "relative" }}>
                        <Typography variant="h6" fontWeight="bold">{t("menu.services")}</Typography>
                        <List>
                            <StyledListItem sx={{ paddingLeft: "0" }}>
                                <a href="/services/sell">{t("menu.sellACar")}</a>
                            </StyledListItem>
                            <StyledListItem sx={{ paddingLeft: "0" }}>
                                <a href="/services/rent">{t("menu.rentACar")}</a>
                            </StyledListItem>
                            <StyledListItem sx={{ paddingLeft: "0" }}>
                                <a href="/services/insurance">{t("menu.carInsurance")}</a>
                            </StyledListItem>
                            <StyledListItem sx={{ paddingLeft: "0" }}>
                                <a href="/services/inspection">{t("menu.carInspection")}</a>
                            </StyledListItem>
                        </List>
                    </Grid2>
                    <Grid2>
                        <Typography variant="h6" fontWeight="bold">{t(`countries.${countries[countryCode]}`)}</Typography>
                        <List>
                            {t(`cities.${countries[countryCode]}`, { returnObjects: true }).slice(0, 5).map((city, index) => (
                                <StyledListItem key={index} sx={{ paddingLeft: "0" }}>
                                    <a href={`${countryCode}/ads?location=${city}`}>{city}</a>
                                </StyledListItem>
                            ))}
                            {/* <StyledListItem sx={{ paddingLeft: "0", textWrap: "nowrap" }}>
                                <a href="/ads?location=Abu%20Dhabi">{t("filter.cities.abudhabi")}</a>
                            </StyledListItem>
                            <StyledListItem sx={{ paddingLeft: "0" }}>
                                <a href="/ads?location=Sharjah">{t("filter.cities.sharjah")}</a>
                            </StyledListItem>
                            <StyledListItem sx={{ paddingLeft: "0" }}>
                                <a href="/ads?location=Ajman">{t("filter.cities.ajman")}</a>
                            </StyledListItem> */}
                        </List>
                    </Grid2>
                    <Grid2>
                        <Typography variant="h6" fontWeight="bold">{t("footer.otherCountries")}</Typography>
                        <List>
                            {
                                countries[countryCode] != "UAE" &&
                                <StyledListItem sx={{ paddingLeft: "0" }}>
                                    <a href="/" onClick={()=>localStorage.setItem("selectedCountry", "")}>{t("countries.UAE")}</a>
                                </StyledListItem>
                            }
                            {
                                countries[countryCode] != "Saudi Arab" &&
                                <StyledListItem sx={{ paddingLeft: "0", textWrap: "nowrap" }}>
                                    <a href="/sa" onClick={()=>localStorage.setItem("selectedCountry", "sa")}>{t("countries.Saudi Arab")}</a>
                                </StyledListItem>
                            }
                            {
                                countries[countryCode] != "Qatar" &&
                                <StyledListItem sx={{ paddingLeft: "0" }}>
                                    <a href="/qtr" onClick={()=>localStorage.setItem("selectedCountry", "qtr")}>{t("countries.Qatar")}</a>
                                </StyledListItem>
                            }
                            {
                                countries[countryCode] != "Egypt" &&
                                <StyledListItem sx={{ paddingLeft: "0" }}>
                                    <a href="/eg" onClick={()=>localStorage.setItem("selectedCountry", "eg")}>{t("countries.Egypt")}</a>
                                </StyledListItem>
                            }
                            {
                                countries[countryCode] != "Syria" &&
                                <StyledListItem sx={{ paddingLeft: "0" }}>
                                    <a href="/syr" onClick={()=>localStorage.setItem("selectedCountry", "syr")}>{t("countries.Syria")}</a>
                                </StyledListItem>
                            }
                            {
                                countries[countryCode] != "USA" &&
                                <StyledListItem sx={{ paddingLeft: "0" }}>
                                    <a href="/us" onClick={()=>localStorage.setItem("selectedCountry", "us")}>{t("countries.USA")}</a>
                                </StyledListItem>
                            }
                        </List>
                    </Grid2>
                    <Grid2>
                        <Typography variant="h6" fontWeight="bold">{t("footer.company")}</Typography>
                        <List>
                            {/* <StyledListItem sx={{ paddingLeft: "0" }}>
                                <a href="/about">{t("footer.aboutUs")}</a>
                            </StyledListItem> */}
                            <StyledListItem sx={{ paddingLeft: "0" }}>
                                <a href="/terms">{t("footer.terms")}</a>
                            </StyledListItem>
                            <StyledListItem sx={{ paddingLeft: "0" }}>
                                <a href="/privacy">{t("footer.privacy")}</a>
                            </StyledListItem>
                        </List>
                    </Grid2>
                    <Grid2>
                        <Typography variant="h6" fontWeight="bold">{t("footer.help")}</Typography>
                        <List sx={{ position: "relative" }}>
                            <StyledListItem sx={{ paddingLeft: "0" }}>
                                <a href="/contact">{t("footer.contact")}</a>
                            </StyledListItem>
                            <StyledListItem sx={{ paddingLeft: "0" }}>
                                <a href="tel:+971-91225118">{t("footer.call")}</a>
                            </StyledListItem>
                            <Box sx={{ marginTop: "2rem", position: "absolute", left: i18n.language != "ar" && 0, top: 120, right: i18n.language == "ar" && 0 }}>
                                <StyledListItem sx={{ paddingLeft: "0", fontWeight: "bold" }}>
                                    {t("footer.downloadApp")}
                                </StyledListItem>
                                <Box sx={{ display: "flex" }}>
                                    <StyledListItem sx={{ paddingLeft: "0" }}>
                                        <img src="/assets/images/playstore.png" style={{ width: "10rem" }} />
                                    </StyledListItem>
                                    <StyledListItem sx={{ paddingLeft: "0" }}>
                                        <img src="/assets/images/apple.svg" style={{ width: "10rem" }} />
                                    </StyledListItem>
                                </Box>
                            </Box>

                        </List>
                    </Grid2>
                    <Grid2>
                        <Typography variant="h6" fontWeight="bold">{t("footer.languages")}</Typography>
                        <List>
                            <StyledListItem sx={{ paddingLeft: "0" }}>
                                <a>{t("footer.english")}</a>
                            </StyledListItem>
                            <StyledListItem sx={{ paddingLeft: "0" }}>
                                <a>{t("footer.arabic")}</a>
                            </StyledListItem>
                            <List sx={{ display: "flex", p: 0, m: 0, position: "absolute" }}>
                                <StyledListItem sx={{ pr: 3, pl: 0, width: 0 }}>
                                    <a style={{ display: 'flex', alignItems: "center" }}>
                                        <Facebook sx={{ fontSize: 22, borderRadius: '50%', backgroundColor: '#fff', padding: '4px', color: "black" }} />
                                    </a>
                                </StyledListItem>
                                <StyledListItem sx={{ px: 3, width: 0 }}>
                                    <a style={{ display: 'flex', alignItems: "center" }}>
                                        <Twitter sx={{ fontSize: 22, borderRadius: '50%', backgroundColor: '#fff', padding: '4px', color: "black" }} />
                                    </a>
                                </StyledListItem>
                                <StyledListItem sx={{ px: 3, width: 0 }}>
                                    <a style={{ display: 'flex', alignItems: "center" }}>
                                        <YouTube sx={{ fontSize: 22, borderRadius: '50%', backgroundColor: '#fff', padding: '4px', color: "black" }} />
                                    </a>
                                </StyledListItem>
                                <StyledListItem sx={{ px: 3, pl: i18n.language == "ar" ? 0 : 3 }}>
                                    <a style={{ display: 'flex', alignItems: "center" }}>
                                        <Instagram sx={{ fontSize: 22, borderRadius: '50%', backgroundColor: '#fff', padding: '4px', color: "black" }} />
                                    </a>
                                </StyledListItem>
                            </List>
                        </List>
                    </Grid2>
                </Box>
                <Box container spacing={2} display="flex" flexDirection="column" alignItems="center" py="1rem" mt="2rem" width="100%" sx={{ "@media (max-width:425px)": { alignItems: "center", px: 1 } }}>
                    <Typography variant="body" fontWeight="bold" marginTop="auto">{t("footer.copyright")}</Typography>
                </Box>
            </Container>
        </Box>
    )
}

export default Footer;
