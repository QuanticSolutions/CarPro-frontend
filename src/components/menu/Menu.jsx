import { useState } from 'react'
import { Box, MenuItem, Grid2, Container, Menu } from '@mui/material'
import { isAuthenticated } from '../../api/consumer'
import ToggleBtn from './ToggleBtn'
import { styled } from "@mui/system"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { Badge } from '@mui/material';
import AuthDialog from '../auth/Dialog';
import PostBtn from '../menu_image/PostBtn';
import { useTranslation } from 'react-i18next'
import i18n from '../../i18n'

const StyledMenu = styled(Box)({
    background: "#fff",
    backgroundSize: "cover",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    position: "absolute",
    width: "100%",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    margin: "0",
    zIndex: 1000,
    color: "black",
    "& img": {
        width: "8rem"
    },
    "@media (max-width: 1000px)": {
        display: "none"
    }
})

const MenuItems = styled(Grid2)({
    display: "flex",
    gap: i18n.language == "ar" ? 12 : 5,
})

const StyledMenuItem = styled(MenuItem)({
    height: "2rem",
    "@media (max-width: 1062px)": {
        padding: "3px"
    },
    WebkitTapHighlightColor: "transparent",
    WebkitUserSelect: "none",
    userSelect: "none",
    "&:focus, &:active, &:focus-visible": {
        outline: "none",
        backgroundColor: "transparent",
        boxShadow: "none",
    },
    "&:hover": {
        backgroundColor: "transparent",
    },
    "&.Mui-selected": {
        backgroundColor: "rgba(183, 28, 28, 0.12)",
        "&:hover": {
            backgroundColor: "rgba(183, 28, 28, 0.2)",
        }
    },
    "*": {
        WebkitTapHighlightColor: "transparent",
        outline: "none",
    },
    "& .MuiTouchRipple-root": {
        display: "none",
    }
});

const DropMenuItem = styled(MenuItem)({
    width: "100%",
    p: 1,
    marginRight: 0,
    "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.05)"
    }
})

const ExpandIcon = styled(ExpandMoreIcon)({
    color: "#fff",
    margin: 0,
    padding: 0
})

const FlagIcon = styled('span')({
    fontSize: '16px',
    marginRight: '4px',
});

const BoxStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "@media (max-width: 1024px)": {
        justifyContent: "left"
    }
}

const countries = [
    {
        code: "",
        name: "UAE",
        arabicName: 'الإمارات العربية المتحدة',
        flag: "🇦🇪",
        flagUrl: "https://flagcdn.com/w40/ae.png"
    },
    {
        code: "sa",
        name: "Saudi Arabia",
        arabicName: 'المملكة العربية السعودية',
        flag: "🇸🇦",
        flagUrl: "https://flagcdn.com/w40/sa.png"
    },
    {
        code: "qtr",
        name: "Qatar",
        arabicName: 'قطر',
        flag: "🇶🇦",
        flagUrl: "https://flagcdn.com/w40/qa.png"
    },
    {
        code: "eg",
        name: "Egypt",
        arabicName: 'مصر',
        flag: "🇪🇬",
        flagUrl: "https://flagcdn.com/w40/eg.png"
    },
    {
        code: "syr",
        name: "Syria",
        arabicName: 'سوريا',
        flag: "🇸🇾",
        flagUrl: "/assets/images/syria-flag.png"
    },
    {
        code: "us",
        name: "USA",
        arabicName: "الولايات المتحدة الأمريكية",
        flag: "🇺🇸",
        flagUrl: "https://flagcdn.com/w40/us.png"
    }
];

function MainMenu({ notifications, toggleChat }) {

    const [categoryMenuAnchorEl, setcategoryMenuAnchorEl] = useState(null);
    const [serviceMenuAnchorEl, setserviceMenuAnchorEl] = useState(null);
    const [formAnchorEl, setFormAnchorEl] = useState(null);
    const [countryAnchorEl, setCountryAnchorEl] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(localStorage.getItem("selectedCountry"));

    const categoryMenuOpen = Boolean(categoryMenuAnchorEl);
    const serviceMenuOpen = Boolean(serviceMenuAnchorEl);
    const formOpen = Boolean(formAnchorEl);
    const countryOpen = Boolean(countryAnchorEl);

    const [popupOpen, setPopupOpen] = useState(false);
    const [popup1Open, setPopup1Open] = useState(false);
    const { t } = useTranslation();


    let categoryTimer = null;
    let serviceTimer = null;
    let formTimer = null;

    const handleCategoryMenuOpen = (e) => {
        clearTimeout(categoryTimer);
        setcategoryMenuAnchorEl(e.currentTarget);
    };

    const handleCategorySubMenuClose = () => {
        categoryTimer = setTimeout(() => {
            setcategoryMenuAnchorEl(null);
        }, 200);
    };

    const handleServiceSubMenuOpen = (e) => {
        clearTimeout(serviceTimer);
        setserviceMenuAnchorEl(e.currentTarget);
    };

    const handleServiceSubMenuClose = () => {
        serviceTimer = setTimeout(() => {
            setserviceMenuAnchorEl(null);
        }, 200);
    };

    const handleFormSubMenuOpen = (e) => {
        clearTimeout(formTimer);
        setFormAnchorEl(e.currentTarget);
    };

    const handleFormSubMenuClose = () => {
        formTimer = setTimeout(() => {
            setFormAnchorEl(null);
        }, 200);
    };

    const handleCountryClick = (event) => {
        setCountryAnchorEl(event.currentTarget);
    };

    const handleCountryClose = () => {
        setCountryAnchorEl(null);
    };

    const handleCountrySelect = (countryCode) => {
        setSelectedCountry(countryCode);
        handleCountryClose();
        window.location.href = `/${countryCode}`;
        localStorage.setItem("selectedCountry", countryCode)
    };

    const selectedCountryData = countries.find(country => country.code === selectedCountry);

    return (
        <StyledMenu>
            <Container sx={{ ...BoxStyles, flexDirection: i18n.language == "ar" ? "row-reverse" : "row" }}>
                <a href="/">
                    <img src="/assets/images/logo.png" alt="logo" />
                </a>
                <MenuItems flexDirection={i18n.language == "ar" ? "row-reverse" : "row"}>
                    <StyledMenuItem onMouseEnter={handleCategoryMenuOpen} onMouseLeave={handleCategorySubMenuClose} sx={{ direction: i18n.language == "ar" && "rtl" }}>
                        {t("menu.allCategories")}
                        <ExpandIcon sx={{ color: "black" }} />
                        {categoryMenuOpen && (
                            <Box
                                onMouseEnter={handleCategoryMenuOpen}
                                onMouseLeave={handleCategorySubMenuClose}
                                sx={{
                                    position: 'absolute',
                                    top: '2.5rem',
                                    left: 0,
                                    backgroundColor: '#FFF',
                                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" ,
                                    zIndex: 1000,
                                    color: 'black',
                                    borderRadius: 1,
                                    textAlign: i18n.language === 'ar' ? 'right' : 'left',
                                    direction: i18n.language === 'ar' ? 'rtl' : 'ltr'
                                }}
                            >
                                <DropMenuItem onClick={() => window.location.href = "/cars/sell"}>{t("categories.cars")}</DropMenuItem>
                                <DropMenuItem onClick={() => window.location.href = "/heavy/sell"}>{t("categories.heavy")}</DropMenuItem>
                                <DropMenuItem onClick={() => window.location.href = "/bikes/sell"}>{t("categories.bikes")}</DropMenuItem>
                                <DropMenuItem onClick={() => window.location.href = "/plates/sell"}>{t("categories.plates")}</DropMenuItem>
                                <DropMenuItem onClick={() => window.location.href = "/construction/sell"}>{t("categories.construction")}</DropMenuItem>
                                <DropMenuItem onClick={() => window.location.href = "/boats/sell"}>{t("categories.boats")}</DropMenuItem>
                            </Box>
                        )}
                    </StyledMenuItem>
                    <StyledMenuItem onMouseEnter={handleServiceSubMenuOpen} onMouseLeave={handleServiceSubMenuClose} sx={{ direction: i18n.language == "ar" && "rtl" }}>
                        {t("menu.services")}
                        <ExpandIcon sx={{ color: "black" }} />
                        {serviceMenuOpen && (
                            <Box
                                onMouseEnter={handleServiceSubMenuOpen}
                                onMouseLeave={handleServiceSubMenuClose}
                                sx={{
                                    position: 'absolute',
                                    top: '2.5rem',
                                    left: 0,
                                    backgroundColor: '#FFF',
                                    zIndex: 1000,
                                    color: 'black',
                                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" ,
                                    borderRadius: 1,
                                    textAlign: i18n.language === 'ar' ? 'right' : 'left',
                                    direction: i18n.language === 'ar' ? 'rtl' : 'ltr'
                                }}
                            >
                                <DropMenuItem onClick={() => window.location.href = "/services/sell"}>{t("menu.sellACar")}</DropMenuItem>
                                <DropMenuItem onClick={() => window.location.href = "/services/rent"}>{t("menu.rentACar")}</DropMenuItem>
                                <DropMenuItem onClick={() => window.location.href = "/services/insurance"}>{t("menu.carInsurance")}</DropMenuItem>
                                <DropMenuItem onClick={() => window.location.href = "/services/inspection"}>{t("menu.carInspection")}</DropMenuItem>
                            </Box>
                        )}
                    </StyledMenuItem>
                    <StyledMenuItem onClick={() => { if (isAuthenticated) { toggleChat() } else { setPopupOpen(true) } }}>
                        {t("menu.chats")}
                    </StyledMenuItem>

                    <StyledMenuItem onClick={() => window.location.href = "/my/ads"}>
                        {t("menu.myAds")}
                    </StyledMenuItem>

                    <StyledMenuItem onClick={() => window.location.href = "/favourites"}>
                        {t("menu.favourites")}
                    </StyledMenuItem>

                    <StyledMenuItem onClick={() => window.location.href = "/notifications"}>
                        <Badge
                            badgeContent={notifications > 0 ? notifications : 0}
                            color="error"
                            invisible={notifications <= 0}
                        >
                            {t("menu.notifications")}
                        </Badge>
                    </StyledMenuItem>
                    <StyledMenuItem sx={{ position: 'relative', direction: i18n.language == "ar" && "rtl" }}>
                        <div
                            onClick={handleCountryClick}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '4px 6px',
                                cursor: 'pointer',
                                backgroundColor: 'transparent',
                                color: '#fff',
                                fontSize: '14px',
                                borderRadius: '4px',
                                justifyContent: 'center',
                                WebkitTapHighlightColor: 'transparent',
                                userSelect: 'none',
                                transition: 'background-color 0.2s ease',
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        >
                            <img
                                src={selectedCountryData.flagUrl}
                                alt={selectedCountryData.name}
                                className="country-flag"
                                style={{ width: "24px", height: "16px", marginRight: "8px", borderRadius: "2px" }}
                            />
                            <ExpandMoreIcon style={{ fontSize: '14px', marginLeft: '2px', color: "black" }} />
                        </div>

                        <Menu
                            anchorEl={countryAnchorEl}
                            open={countryOpen}
                            onClose={handleCountryClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: i18n.language === "ar" ? 'right' : 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: i18n.language === "ar" ? 'right' : 'left',
                            }}
                            PaperProps={{
                                style: {
                                    backgroundColor: '#fff',
                                    color: 'black',
                                    marginTop: '8px',
                                }
                            }}
                        >
                            {countries.map((country) => (
                                <MenuItem
                                    key={country.code}
                                    onClick={() => handleCountrySelect(country.code)}
                                    sx={{
                                        padding: '8px 16px',
                                        '&:hover': {
                                            backgroundColor: 'rgba(0, 0, 0, 0.2)'
                                        },
                                        display: 'flex',
                                        alignItems: 'center',
                                        minWidth: '150px',
                                        direction: i18n.language == "ar" && "rtl"
                                    }}
                                >
                                    <img
                                        src={country.flagUrl}
                                        alt={country.name}
                                        className="country-flag"
                                        style={{
                                            width: "24px",
                                            height: "16px",
                                            marginRight: "12px",
                                            borderRadius: "2px",
                                            objectFit: "cover"
                                        }}
                                    />
                                    &nbsp;
                                    {i18n.language != "ar" ? country.name : country.arabicName}
                                </MenuItem>
                            ))}
                        </Menu>
                    </StyledMenuItem>

                    <StyledMenuItem>
                        <ToggleBtn />
                    </StyledMenuItem>
                    <StyledMenuItem>
                        <PostBtn handleOnHover={handleFormSubMenuOpen} handleOffHover={handleFormSubMenuClose} />
                        {formOpen && (
                            <Box
                                onMouseEnter={handleFormSubMenuOpen}
                                onMouseLeave={handleFormSubMenuClose}
                                sx={{
                                    position: 'absolute',
                                    top: '2.5rem',
                                    left: i18n.language != "ar" && "-1.5rem",
                                    right: i18n.language == "ar" && "0.5rem",
                                    backgroundColor: '#fff',
                                    zIndex: 1000,
                                    color: 'black',
                                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                                    borderRadius: 1,
                                    minWidth: "7rem",
                                    textAlign: i18n.language === 'ar' ? 'right' : 'left',
                                    direction: i18n.language === 'ar' ? 'rtl' : 'ltr'
                                }}
                            >
                                <DropMenuItem sx={{
                                    "&:hover": {
                                        color: "#B71C1C"
                                    }
                                }} onClick={() => window.location.href = "/sell/categories"}>{t("menu.forSell")}</DropMenuItem>
                                <DropMenuItem sx={{
                                    "&:hover": {
                                        color: "#B71C1C"
                                    }
                                }} onClick={() => window.location.href = "/rent/categories"}>{t("menu.forRent")}</DropMenuItem>
                            </Box>
                        )}
                    </StyledMenuItem>
                </MenuItems>
                <AuthDialog popupOpen={popupOpen} setPopupOpen={setPopupOpen} popup1Open={popup1Open} setPopup1Open={setPopup1Open} />
            </Container>
        </StyledMenu>
    )
}

export default MainMenu