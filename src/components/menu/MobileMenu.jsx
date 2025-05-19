import { useState } from 'react'
import { AppBar, Toolbar, IconButton, Drawer, List, MenuItem, ListItemText, Box, Typography, TextField, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@mui/material";
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
import AuthDialog from '../auth/Dialog';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import TuneIcon from '@mui/icons-material/Tune';
import { useTranslation } from 'react-i18next'
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { isAuthenticated, logout } from '../../api/consumer';

const MobileBar = styled(Drawer)({
    display: "none",
    "& .MuiDrawer-paper": {
        backgroundColor: "#000000",
        width: "100%",
        color: "#fff",
    },
    "& img": {
        width: "8rem",
        marginTop: "0.5rem",
    },
    "@media(max-width: 1000px)": {
        display: "block"
    }
})

const BottomDrawer = styled(Drawer)({
    "& .MuiDrawer-paper": {
        backgroundColor: "#000000",
        color: "#fff",
        borderTopLeftRadius: "16px",
        borderTopRightRadius: "16px",
        zIndex: 6000
    }
});

const FilterDrawer = styled(Drawer)({
    "& .MuiDrawer-paper": {
        backgroundColor: "#000000",
        color: "#fff",
        borderTopLeftRadius: "16px",
        borderTopRightRadius: "16px",
        zIndex: 6000,
        maxHeight: "100vh"
    }
});

const FilterOption = styled(FormControlLabel)({
    color: "#fff",
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
    backgroundColor: "#000000",
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
    backgroundColor: "#000000",
    color: "#ffffff",
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

function MobileMenu({ toggleChat }) {

    const [open, setOpen] = useState(false);
    const [categoryMenu, setCategoryMenu] = useState(false);
    const [model, setModel] = useState("");
    const [serviceMenu, setServiceMenu] = useState(false);
    const [postAdMenu, setPostAdMenu] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);
    const [popup1Open, setPopup1Open] = useState(false);
    const [bottomDrawerOpen, setBottomDrawerOpen] = useState(false);
    const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedVehicle, setSelectedVehicle] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const { t, i18n } = useTranslation();

    const handleLogoutClick = () => {
        logout();
        handleMenuClose();
    };

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
        { name: t("filter.vehicles.bikes"), value: "bikes" },
        { name: t("filter.vehicles.heavy"), value: "heavy" },
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

    const toggleBottomDrawer = () => {
        setBottomDrawerOpen(!bottomDrawerOpen);
    };

    const toggleFilterDrawer = () => {
        setFilterDrawerOpen(!filterDrawerOpen);
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
                <Toolbar sx={{ display: "flex", justifyContent: "left", p: 0 }}>
                    <a href="/">
                        <img src="/assets/images/logo.png" alt="logo" width="100rem" style={{ marginTop: "1rem", marginLeft: "0.5rem" }} />
                    </a>
                    {/* <IconButton edge="start" color="inherit" onClick={() => setOpen(!open)} sx={{ display: "flex", justifyContent: "right" }}>
                        {
                            !open ?
                                <MenuIcon sx={{ fontSize: "1.2rem", color: "#fff" }} />
                                :
                                <CloseIcon sx={{ fontSize: "1.2rem", color: "#fff" }} />
                        }
                    </IconButton> */}
                </Toolbar>
                <Box sx={{ mt: 2, px: 2 }}>
                    <Typography variant='h4' textAlign={i18n.language == "ar" && "right"}>
                        {t("findVehicles")}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
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
                        <FilterBtn onClick={applyFilters}>
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
                        <CloseIcon sx={{ color: "#fff" }} />
                    </IconButton>
                    <ToggleBtn />
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
                        <CloseIcon sx={{ color: "#fff", position: "fixed", right: 6, bottom: "8rem"}} />
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
                        direction: i18n.language == "ar" && "rtl"
                    }}>
                        <IconButton onClick={toggleFilterDrawer} sx={{ p: 0 }}>
                            <CloseIcon sx={{ color: "#fff", p: 0 }} />
                        </IconButton>
                    </Box>

                    <Box sx={{ mb: 3, direction: i18n.language == "ar" && "rtl" }}>
                        <FormControl component="fieldset" fullWidth>
                            <FormLabel component="legend"
                                sx={{
                                    color: "#fff",
                                    fontWeight: "bold",
                                    mb: 1,
                                    "&.Mui-focused": {
                                        color: "#fff",
                                    },
                                    "&.MuiFormLabel-root": {
                                        color: "#fff",
                                    }
                                }}>
                                {t("filter.city")}
                            </FormLabel>
                            <RadioGroup
                                value={selectedCity}
                                onChange={(e) => setSelectedCity(e.target.value)}
                            >
                                {cityOptions.map((city) => (
                                    <FilterOption
                                        key={city.value}
                                        value={city.value}
                                        control={<Radio sx={{ color: "#fff" }} />}
                                        label={city.name}
                                        sx={{
                                            "& .Mui-checked": {
                                                color: "#B71C1C !important",
                                            },
                                            "&.Mui-checked": {
                                                color: "#B71C1C !important",
                                            },
                                        }}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </Box>

                    <Box sx={{ mb: 3, direction: i18n.language == "ar" && "rtl" }}>
                        <FormControl component="fieldset" fullWidth>
                            <FormLabel component="legend"
                                sx={{
                                    color: "#fff",
                                    fontWeight: "bold",
                                    mb: 1,
                                    "&.Mui-focused": {
                                        color: "#fff",
                                    },
                                    "&.MuiFormLabel-root": {
                                        color: "#fff",
                                    }
                                }}
                            >
                                {t("filter.vehicle") || "Vehicle Type"}
                            </FormLabel>
                            <RadioGroup
                                value={selectedVehicle}
                                onChange={(e) => setSelectedVehicle(e.target.value)}
                            >
                                {vehicleOptions.map((vehicle) => (
                                    <FilterOption
                                        key={vehicle.value}
                                        value={vehicle.value}
                                        control={<Radio sx={{ color: "#fff" }} />}
                                        label={vehicle.name}
                                        sx={{
                                            "& .Mui-checked": {
                                                color: "#B71C1C !important",
                                            },
                                            "&.Mui-checked": {
                                                color: "#B71C1C !important",
                                            },
                                        }}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </Box>

                    <Box sx={{ mb: 3, direction: i18n.language == "ar" && "rtl" }}>
                        <FormControl component="fieldset" fullWidth>
                            <FormLabel component="legend"
                                sx={{
                                    color: "#fff",
                                    fontWeight: "bold",
                                    mb: 1,
                                    "&.Mui-focused": {
                                        color: "#fff",
                                    },
                                    "&.MuiFormLabel-root": {
                                        color: "#fff",
                                    }
                                }}
                            >
                                {t("filter.type") || "Item Condition"}
                            </FormLabel>
                            <RadioGroup
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                            >
                                {typeOptions.map((type) => (
                                    <FilterOption
                                        key={type.value}
                                        value={type.value}
                                        control={<Radio sx={{ color: "#fff" }} />}
                                        label={type.name}
                                        sx={{
                                            "& .Mui-checked": {
                                                color: "#B71C1C !important",
                                            },
                                            "&.Mui-checked": {
                                                color: "#B71C1C !important",
                                            },
                                        }}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
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
                <NavItem onClick={() => setOpen(!open)}>
                    {/* <ChatIcon /> */}
                    <MenuIcon />
                    <Typography variant="caption">{t("menu.menu")}</Typography>
                </NavItem>
            </BottomNavigation>
        </>
    )
}

export default MobileMenu