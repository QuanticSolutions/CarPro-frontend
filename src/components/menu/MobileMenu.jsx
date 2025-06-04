import { useState } from 'react'
import {
    AppBar, Toolbar, IconButton, Drawer, List, MenuItem, ListItemText,
    Box, Typography, TextField, Button, Radio, RadioGroup, FormControlLabel,
    FormControl, FormLabel, Accordion, AccordionSummary, AccordionDetails
} from "@mui/material";
import { styled } from "@mui/system"
import ToggleBtn from './ToggleBtn';
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar"
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat"
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler"
import ConstructionIcon from "@mui/icons-material/Construction"
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered"
import CategoryIcon from "@mui/icons-material/Category"
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import ChatIcon from '@mui/icons-material/Chat';
import NotesIcon from '@mui/icons-material/Notes';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PostAddIcon from '@mui/icons-material/PostAdd';
import CloseIcon from '@mui/icons-material/Close';
import PublicIcon from '@mui/icons-material/Public';
import AuthDialog from '../auth/Dialog';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
// import { ArrowLeft } from '@mui/icons-material';
import { ArrowLeft } from 'lucide-react';
import FilterListIcon from '@mui/icons-material/FilterList';
import TuneIcon from '@mui/icons-material/Tune';
import { useTranslation } from 'react-i18next'
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { isAuthenticated, logout } from '../../api/consumer';
import { useLocation } from 'react-router-dom';

const MobileBar = styled(Drawer)({
    display: "none",
    "& .MuiDrawer-paper": {
        backgroundColor: "#fff",
        width: "100%",
        color: "black",
    },
    "& img": {
        width: "8rem",
        marginTop: "0.5rem",
    },
    "@media(max-width: 1000px)": {
        display: "block"
    }
})

const BackButton = styled(Button)({
    color: "black",
    textTransform: "none",
    margin: 0,
    padding: 0,
    fontSize: "1rem",
    fontWeight: "normal",
});

const BottomDrawer = styled(Drawer)({
    "& .MuiDrawer-paper": {
        backgroundColor: "#fff",
        color: "black",
        borderTopLeftRadius: "16px",
        borderTopRightRadius: "16px",
        zIndex: 6000
    }
});

const FilterDrawer = styled(Drawer)({
    "& .MuiDrawer-paper": {
        backgroundColor: "#fff",
        color: "black",

        zIndex: 6000,
        maxHeight: "100vh"
    }
});

const FilterOption = styled(FormControlLabel)({
    color: "black",
    marginBottom: "8px",
    "& .MuiFormControlLabel-label": {
        fontSize: "1rem"
    }
});

const FilterButton = styled(Button)({
    backgroundColor: "#B71C1C",
    color: "#ffffff",
    borderRadius: "8px",
    padding: "12px 20px",
    fontSize: "1rem",
    fontWeight: "bold",
    textTransform: "none",
    "&:hover": {
        backgroundColor: "#9A0007",
    },
    width: "100%",
    marginTop: "16px"
});

const PostAdButton = styled(Button)({
    backgroundColor: "#B71C1C",
    color: "#ffffff",
    borderRadius: "8px",
    padding: "12px 20px",
    width: "48%",
    fontSize: "1rem",
    textTransform: "none",
    fontWeight: "bold",
    "&:hover": {
        backgroundColor: "#9A0007",
    },
});

const CustomAppBar = styled(AppBar)({
    display: "none",
    backgroundColor: "#fff",
    color: "black",
    paddingRight: "0.5rem",
    paddingLeft: "0",
    "@media(min-width: 600px)": {
        minHeight: "1rem",
    },
    "@media(max-width: 1000px)": {
        display: "flex",
    }
});

const BottomNavigation = styled(Box)({
    display: "none",
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#fff",
    color: "black",
    zIndex: 5000,
    borderTop: "1px solid #333333",
    "@media(max-width: 1000px)": {
        display: "flex",
    }
});

const NavItem = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding: "10px 0",
    cursor: "pointer",
    textAlign: "center",
    fontSize: "0.75rem",
    "& .MuiSvgIcon-root": {
        marginBottom: "4px",
    }
});

const AddButton = styled(IconButton)({
    backgroundColor: "#fff",
    color: "#ffffff",
    width: "26px",
    height: "26px",
    "&:hover": {
        backgroundColor: "#9A0007",
    },
    "& .MuiSvgIcon-root": {
        fontSize: "10rem",
    },
    marginBottom: "10px"
});

const StyledTextField = styled(TextField)({
    backgroundColor: "white",
    borderRadius: "8px",
    marginTop: "1rem",
    marginBottom: "1rem",
    borderTopRightRadius: "0",
    borderBottomRightRadius: "0",
    color: "#000000",
    "& ::placeholder": {
        color: "black !important",
        opacity: "1 !important",
    },
    "& .MuiOutlinedInput-root": {
        borderTopRightRadius: "0",
        borderBottomRightRadius: "0",
        borderRadius: 0,
    },
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#B71C1C !important",
    },
})

const FilterBtn = styled(Button)({
    backgroundColor: "#B71C1C",
    borderTopLeftRadius: "0",
    borderBottomLeftRadius: "0",
    textTransform: "none",
    color: "#fff",
    fontSize: "1rem",
    minWidth: "1.1rem",
    padding: "16px 14px"
})

const FilterAccordion = styled(Accordion)({
    backgroundColor: "rgb(247, 250, 250)",
    color: "black",
    marginBottom: "8px",
    boxShadow: "none",
    "&:before": {
        display: "none",
    },
    "& .MuiAccordionSummary-content": {
        margin: "12px 0",
    }
});

const FilterAccordionSummary = styled(AccordionSummary)({
    // backgroundColor: "#1E1E1E",
    borderRadius: "6px",
    "& .MuiAccordionSummary-expandIconWrapper": {
        color: "black",
    }
});

const CountryMenuItem = styled(MenuItem)({
    display: "flex",
    alignItems: "center",
    paddingLeft: "3rem",
    "& .country-flag": {
        width: "24px",
        height: "16px",
        marginRight: "12px",
        borderRadius: "2px",
        objectFit: "cover"
    }
});

function MobileMenu({ toggleChat }) {

    const [open, setOpen] = useState(false);
    const [categoryMenu, setCategoryMenu] = useState(false);
    const [model, setModel] = useState("");
    const [serviceMenu, setServiceMenu] = useState(false);
    const [postAdMenu, setPostAdMenu] = useState(false);
    const [countryMenu, setCountryMenu] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);
    const [popup1Open, setPopup1Open] = useState(false);
    const [bottomDrawerOpen, setBottomDrawerOpen] = useState(false);
    const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedVehicle, setSelectedVehicle] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [expandedAccordion, setExpandedAccordion] = useState(false);
    const { t, i18n } = useTranslation();
    const location = useLocation();

    const handleLogoutClick = () => {
        logout();
        handleMenuClose();
    };

    const handleBackClick = () => {
        window.history.back();
    };

    const countries = {
        "": "UAE",
        "sa": "Saudi Arabia",
        "qtr": "Qatar",
        "syr": "Syria",
        "eg": "Egypt",
        "us": "USA"
    };

    const countryOptions = [
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

    const cityOptions = [
        { name: t("filter.cities.dubai"), value: "Dubai" },
        { name: t("filter.cities.abudhabi"), value: "Abu Dhabi" },
        { name: t("filter.cities.sharjah"), value: "Sharjah" },
        { name: t("filter.cities.ajman"), value: "Ajman" },
        { name: t("filter.cities.fujairah"), value: "Fujairah" },
        { name: t("filter.cities.rak"), value: "RAK" },
        { name: t("filter.cities.uaq"), value: "Umm Al Quwain" },
        { name: t("filter.cities.alain"), value: "Al Ain" }
    ];

    const vehicleOptions = [
        { name: t("filter.vehicles.cars"), value: "cars" },
        { name: t("filter.vehicles.heavy"), value: "heavy" },
        { name: t("filter.vehicles.bikes"), value: "bikes" },
        { name: t("filter.vehicles.plates"), value: "plates" },
        { name: t("filter.vehicles.construction"), value: "construction" },
        { name: t("filter.vehicles.boats"), value: "boats" },
    ];

    const typeOptions = [
        { name: t("filter.types.new"), value: "New" },
        { name: t("filter.types.used"), value: "Used" },
        { name: t("filter.types.pre"), value: "pre" },
    ];

    const handleCategoryMenu = () => {
        setCategoryMenu(!categoryMenu);
    };

    const handleServiceMenu = () => {
        setServiceMenu(!serviceMenu);
    };

    const handlePostAdMenu = () => {
        setPostAdMenu(!postAdMenu);
    };

    const handleCountryMenu = () => {
        setCountryMenu(!countryMenu);
    };

    const getCurrentCountry = () => {
        const currentCountryCode = localStorage.getItem("selectedCountry") || "";
        return countryOptions.find(country => country.code === currentCountryCode) || countryOptions[0];
    };

    const toggleBottomDrawer = () => {
        setBottomDrawerOpen(!bottomDrawerOpen);
    };

    const toggleFilterDrawer = () => {
        setFilterDrawerOpen(!filterDrawerOpen);
    };

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpandedAccordion(isExpanded ? panel : false);
    };

    const handleOptionSelect = (option, setter, currentValue) => {
        console.log(option, currentValue)
        if (currentValue == option) {
            setter("")
        } else {
            setter(option);
        }
    };

    const applyFilters = () => {
        let filterUrl = `/ads?`;
        if (model) filterUrl += `make=${model}&`;
        if (selectedCity) filterUrl += `location=${selectedCity}&`;
        if (selectedVehicle) filterUrl += `vehicle=${selectedVehicle}&`;
        if (selectedType) filterUrl += `type=${selectedType}`;
        if (filterUrl.endsWith('&')) {
            filterUrl = filterUrl.slice(0, -1);
        }
        window.location.href = filterUrl;
        toggleFilterDrawer();
    };

    return (
        <>
            <CustomAppBar position="static">
                <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 0, position: "relative" }}>
                    {location.pathname !== "/" && (
                        <BackButton
                            onClick={handleBackClick}
                            sx={{
                                flexDirection: i18n.language === "ar" ? "row-reverse" : "row",
                                "& .MuiSvgIcon-root": {
                                    marginRight: i18n.language === "ar" ? "0" : "8px",
                                    marginLeft: i18n.language === "ar" ? "8px" : "0",
                                    transform: i18n.language === "ar" ? "rotate(180deg)" : "none"
                                }
                            }}
                        >
                            <ArrowLeft color='black'/>
                        </BackButton>
                    )}
                    {location.pathname === "/" && <div />}
                    <a href="/" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
                        <img src="/assets/images/logo.png" alt="logo" width="100rem" style={{ marginTop: "1rem" }} />
                    </a>

                    <IconButton edge="start" color="inherit" onClick={() => setOpen(!open)} sx={{ display: "flex", justifyContent: "right" }}>
                        {
                            !open ?
                                <MenuIcon sx={{ fontSize: "1.2rem", color: "black" }} />
                                :
                                <CloseIcon sx={{ fontSize: "1.2rem", color: "black" }} />
                        }
                    </IconButton>
                </Toolbar>
                <Box sx={{ mt: 2, px: 2 }}>
                    <Typography variant='h4' textAlign={i18n.language == "ar" && "right"}>
                        {t("home.header", { country: t(`countries.${countries[localStorage.getItem("selectedCountry")]}`) })}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", flexDirection: i18n.language == "ar" && "row-reverse" }}>
                        <StyledTextField
                            placeholder={t("filter.makePlaceholder")}
                            name="make"
                            variant="outlined"
                            onChange={(e) => setModel(e.target.value)}
                            fullWidth
                            sx={{
                                transform: i18n.language == "ar" && "rotateY(180deg)",
                                "& .MuiOutlinedInput-root": { transform: i18n.language == "ar" && "rotateY(180deg)", pl: 0 },
                                "& .MuiOutlinedInput-input": {
                                    textAlign: i18n.language == "ar" && "right",
                                },
                            }}
                            InputProps={
                                i18n.language == "ar" ?
                                    {
                                        startAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={toggleFilterDrawer}>
                                                    <TuneIcon sx={{ p: 0 }} />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    } :
                                    {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={toggleFilterDrawer}>
                                                    <TuneIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }
                            }
                        />
                        <FilterBtn onClick={applyFilters} sx={{ transform: i18n.language == "ar" && "rotateY(180deg)" }}>
                            <SearchIcon />
                        </FilterBtn>
                    </Box>
                </Box>
            </CustomAppBar>
            <MobileBar anchor="left" open={open} onClose={() => setOpen(false)} hideBackdrop
                ModalProps={{
                    keepMounted: true,
                    BackdropProps: {
                        invisible: true,
                    },
                    sx: {
                        pointerEvents: 'none',
                    }
                }}
                PaperProps={{
                    sx: {
                        pointerEvents: 'auto',
                        direction: i18n.language == "ar" && "rtl"
                    }
                }}>
                <List>
                    <IconButton onClick={() => setOpen(false)} sx={{ position: "fixed", right: 1, top: 1 }}>
                        <CloseIcon sx={{ color: "black" }} />
                    </IconButton>
                    <ToggleBtn />
                    <MenuItem button onClick={handleCountryMenu}>
                        <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
                            <img
                                src={getCurrentCountry().flagUrl}
                                alt={getCurrentCountry().name}
                                className="country-flag"
                                style={{ width: "24px", height: "16px", marginRight: "8px", borderRadius: "2px" }}
                            />
                        </Box>
                        <ExpandMoreIcon />
                    </MenuItem>
                    {
                        countryMenu &&
                        <List sx={{ margin: "0", padding: "0" }}>
                            {countryOptions.map((country) => {
                                if (localStorage.getItem("selectedCountry") != country.code) {
                                    return (
                                        <CountryMenuItem
                                            key={country.code}
                                            onClick={() => { window.location.href = `/${country.code}`; localStorage.setItem("selectedCountry", country.code) }}
                                        >
                                            <img
                                                src={country.flagUrl}
                                                alt={country.name}
                                                className="country-flag"
                                            />
                                            &nbsp;
                                            {i18n.language != "ar" ? country.name : country.arabicName}
                                        </CountryMenuItem>
                                    )
                                }
                            }
                            )}
                        </List>
                    }

                    <MenuItem button onClick={() => handleCategoryMenu()}>
                        <CategoryIcon />
                        &nbsp;
                        <ListItemText primary={t("menu.allCategories")} />
                        <ExpandMoreIcon />
                    </MenuItem>
                    {
                        categoryMenu &&
                        <List sx={{ margin: "0", padding: "0", paddingLeft: "1.5rem" }}>
                            <MenuItem onClick={() => window.location.href = "/cars/sell"}>
                                <DirectionsCarIcon />
                                &nbsp;
                                {t("categories.cars")}
                            </MenuItem>
                            <MenuItem onClick={() => window.location.href = "/heavy/sell"}>
                                <DirectionsCarIcon />
                                &nbsp;
                                {t("categories.heavy")}
                            </MenuItem>
                            <MenuItem onClick={() => window.location.href = "/bikes/sell"}>
                                <TwoWheelerIcon />
                                &nbsp;
                                {t("categories.bikes")}
                            </MenuItem>
                            <MenuItem onClick={() => window.location.href = "/plates/sell"}>
                                <FormatListNumberedIcon />
                                &nbsp;
                                {t("categories.plates")}
                            </MenuItem>
                            <MenuItem onClick={() => window.location.href = "/construction/sell"}>
                                <ConstructionIcon />
                                &nbsp;
                                {t("categories.construction")}
                            </MenuItem>
                            <MenuItem onClick={() => window.location.href = "/boats/sell"}>
                                <DirectionsBoatIcon />
                                &nbsp;
                                {t("categories.boats")}
                            </MenuItem>
                        </List>
                    }
                    <MenuItem button onClick={() => handleServiceMenu()}>
                        <MiscellaneousServicesIcon />
                        &nbsp;
                        <ListItemText primary={t("menu.services")} />
                        <ExpandMoreIcon />
                    </MenuItem>
                    {
                        serviceMenu &&
                        <List sx={{ margin: "0", padding: "0", paddingLeft: "1.5rem" }}>
                            <MenuItem onClick={() => window.location.href = "/services/sell"}>{t("menu.sellACar")}</MenuItem>
                            <MenuItem onClick={() => window.location.href = "/services/rent"}>{t("menu.rentACar")}</MenuItem>
                            <MenuItem onClick={() => window.location.href = "/services/insurance"}>{t("menu.carInsurance")}</MenuItem>
                            <MenuItem onClick={() => window.location.href = "/services/inspection"}>{t("menu.carInspection")}</MenuItem>
                        </List>
                    }
                    <MenuItem button onClick={() => window.location.href = "/notifications"}>
                        <NotificationsIcon />
                        &nbsp;
                        <ListItemText primary={t("menu.notifications")} />
                    </MenuItem>
                    {
                        isAuthenticated &&
                        <MenuItem onClick={handleLogoutClick}>
                            <LogoutIcon />
                            &nbsp;
                            {t("auth.logout")}
                        </MenuItem>
                    }
                </List>
                <AuthDialog popupOpen={popupOpen} setPopupOpen={setPopupOpen} popup1Open={popup1Open} setPopup1Open={setPopup1Open} />
            </MobileBar>

            <BottomDrawer
                anchor="bottom"
                open={bottomDrawerOpen}
                onClose={toggleBottomDrawer}
                ModalProps={{
                    sx: { zIndex: 5999 }
                }}
            >
                <Box sx={{ p: 3, width: window.innerWidth <= 500 ? '85%' : '93%' }}>
                    <Typography variant="h6">{t("postAd")}</Typography>
                    <IconButton onClick={toggleBottomDrawer}>
                        <CloseIcon sx={{ color: "black", position: "fixed", right: 6, bottom: "8rem" }} />
                    </IconButton>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        direction: i18n.language == "ar" && "rtl"
                    }}>
                        <PostAdButton onClick={() => window.location.href = "/sell/categories"}>
                            {t("menu.forSell")}
                        </PostAdButton>
                        <PostAdButton onClick={() => window.location.href = "/rent/categories"}>
                            {t("menu.forRent")}
                        </PostAdButton>
                    </Box>
                </Box>
            </BottomDrawer>

            <FilterDrawer
                anchor="bottom"
                open={filterDrawerOpen}
                onClose={toggleFilterDrawer}
                ModalProps={{
                    sx: { zIndex: 5999 }
                }}
            >
                <Box sx={{ p: 3, width: window.innerWidth <= 500 ? '85%' : '93%' }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'right',
                        mb: 2,
                        direction: i18n.language === "ar" ? "rtl" : "ltr"
                    }}>
                        <IconButton onClick={toggleFilterDrawer} sx={{ p: 0 }}>
                            <CloseIcon sx={{ color: "black", p: 0 }} />
                        </IconButton>
                    </Box>

                    <Box sx={{ mb: 2, direction: i18n.language === "ar" ? "rtl" : "ltr" }}>
                        <FilterAccordion
                            expanded={expandedAccordion === 'cityPanel'}
                            onChange={handleAccordionChange('cityPanel')}
                        >
                            <FilterAccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "black" }} />}>
                                <Typography sx={{ fontWeight: "bold" }}>
                                    {t("filter.city")}
                                    {selectedCity && `: ${cityOptions.find(c => c.value === selectedCity)?.name}`}
                                </Typography>
                            </FilterAccordionSummary>
                            <AccordionDetails>
                                <RadioGroup
                                    value={selectedCity}
                                >
                                    {cityOptions.map((city) => (
                                        <FilterOption
                                            key={city.value}
                                            value={city.value}
                                            control={
                                                <Radio
                                                    sx={{ color: "black" }}
                                                    checked={selectedCity === city.value}
                                                    onClick={() => handleOptionSelect(city.value, setSelectedCity, selectedCity)}
                                                />
                                            }
                                            label={city.name}
                                            sx={{
                                                ml: 0.2,
                                                "& .Mui-checked": {
                                                    color: "#B71C1C !important",
                                                },
                                            }}
                                        />
                                    ))}
                                </RadioGroup>
                            </AccordionDetails>
                        </FilterAccordion>
                    </Box>

                    <Box sx={{ mb: 2, direction: i18n.language === "ar" ? "rtl" : "ltr" }}>
                        <FilterAccordion
                            expanded={expandedAccordion === 'vehiclePanel'}
                            onChange={handleAccordionChange('vehiclePanel')}
                        >
                            <FilterAccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "black" }} />}>
                                <Typography sx={{ fontWeight: "bold" }}>
                                    {t("filter.vehicle") || "Vehicle Type"}
                                    {selectedVehicle && `: ${vehicleOptions.find(v => v.value === selectedVehicle)?.name}`}
                                </Typography>
                            </FilterAccordionSummary>
                            <AccordionDetails>
                                <RadioGroup
                                    value={selectedVehicle}
                                >
                                    {vehicleOptions.map((vehicle) => (
                                        <FilterOption
                                            key={vehicle.value}
                                            value={vehicle.value}
                                            control={
                                                <Radio
                                                    sx={{ color: "black" }}
                                                    checked={selectedVehicle === vehicle.value}
                                                    onClick={() => handleOptionSelect(vehicle.value, setSelectedVehicle, selectedVehicle)}
                                                />
                                            }
                                            label={vehicle.name}
                                            sx={{
                                                ml: 0.2,
                                                "& .Mui-checked": {
                                                    color: "#B71C1C !important",
                                                },
                                            }}
                                        />
                                    ))}
                                </RadioGroup>
                            </AccordionDetails>
                        </FilterAccordion>
                    </Box>

                    <Box sx={{ mb: 2, direction: i18n.language === "ar" ? "rtl" : "ltr" }}>
                        <FilterAccordion
                            expanded={expandedAccordion === 'typePanel'}
                            onChange={handleAccordionChange('typePanel')}
                        >
                            <FilterAccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "black" }} />}>
                                <Typography sx={{ fontWeight: "bold" }}>
                                    {t("filter.type") || "Item Condition"}
                                    {selectedType && `: ${typeOptions.find(t => t.value === selectedType)?.name}`}
                                </Typography>
                            </FilterAccordionSummary>
                            <AccordionDetails>
                                <RadioGroup
                                    value={selectedType}
                                >
                                    {typeOptions.map((type) => (
                                        <FilterOption
                                            key={type.value}
                                            value={type.value}
                                            control={
                                                <Radio
                                                    sx={{ color: "black" }}
                                                    checked={selectedType === type.value}
                                                    onClick={() => handleOptionSelect(type.value, setSelectedType, selectedType)}
                                                />
                                            }
                                            label={type.name}
                                            sx={{
                                                ml: 0.2,
                                                "& .Mui-checked": {
                                                    color: "#B71C1C !important",
                                                },
                                            }}
                                        />
                                    ))}
                                </RadioGroup>
                            </AccordionDetails>
                        </FilterAccordion>
                    </Box>

                    <FilterButton onClick={applyFilters}>
                        {t("search")}
                    </FilterButton>
                </Box>
            </FilterDrawer>

            <BottomNavigation sx={{ pb: 0, direction: i18n.language == "ar" && "rtl" }}>
                <NavItem onClick={() => window.location.href = "/"}>
                    <HomeIcon />
                    <Typography variant="caption">{t("menu.home")}</Typography>
                </NavItem>
                <NavItem onClick={() => window.location.href = "/favourites"}>
                    <FavoriteIcon />
                    <Typography variant="caption">{t("menu.favourites")}</Typography>
                </NavItem>
                <NavItem sx={{ position: "relative", top: "-15px" }} onClick={toggleBottomDrawer}>
                    <AddButton>
                        <AddCircleIcon sx={{
                            color: "#B71C1C",
                            width: "55px",
                            height: "55px",
                        }} />
                    </AddButton>
                    <Typography variant="caption">{t("postAd")}</Typography>
                </NavItem>
                <NavItem onClick={() => window.location.href = "/my/ads"}>
                    <NotesIcon />
                    <Typography variant="caption">{t("menu.myAds")}</Typography>
                </NavItem>
                <NavItem onClick={() => { if (isAuthenticated) { toggleChat() } else { setPopupOpen(true) } }}>
                    <ChatIcon />
                    <Typography variant="caption">{t("menu.chats")}</Typography>
                </NavItem>
            </BottomNavigation>
        </>
    )
}

export default MobileMenu