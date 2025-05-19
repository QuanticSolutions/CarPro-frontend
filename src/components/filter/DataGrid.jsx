import React, { useState } from "react";
import {
    Grid2,
    Typography,
    Pagination,
    Box,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Dialog,
    DialogContent,
    DialogActions
} from "@mui/material";
import { styled } from "@mui/system";
import CarCard from "../card/Card";
import ViewListIcon from "@mui/icons-material/ViewList";
import GridViewIcon from "@mui/icons-material/GridView";
import CardList from "../card/CardList";
import Signin from "../auth/Signin";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { isAuthenticated, deleteFav, createFavs } from "../../api/consumer";
import CustomSelect from "../../utils/Select";
import AuthDialog from "../auth/Dialog";
import { useTranslation } from 'react-i18next';

const SelectArrow = styled(KeyboardArrowDownIcon)({
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
    color: '#B71C1C',
});

const DataGrid = ({ data, title, type }) => {
    const { t, i18n } = useTranslation();
    const [page, setPage] = useState(1);
    const [view, setView] = useState("Grid");
    const [sortOption, setSortOption] = useState("");
    const [popupOpen, setPopupOpen] = useState(false);
    const [popup1Open, setPopup1Open] = useState(false);
    const itemsPerPage = window.innerWidth > 800 && view == "Grid" ? 28 : window.innerWidth > 800 && view == "List" ? 7 : window.innerWidth < 800 && view == "list" ? 7 : 6;
    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleFavBtn = (isFav, data) => {
        if (isAuthenticated) {
            if (isFav) {
                deleteFav(data.id);
            }
            else {
                createFavs({ user_id: localStorage.getItem("user_id"), ad_id: data.id });
            }
            return true;
        }
        else {
            setPopupOpen(true);
            return false;
        }
    };

    const sortedData = [...data].sort((a, b) => {
        if (sortOption === "highest") return b.price - a.price;
        if (sortOption === "lowest") return a.price - b.price;
        return 0;
    });

    const displayedCars = sortedData.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    return (
        <div style={{ width: "100%", direction: i18n.language == "ar" && "rtl" }} >
            <Grid2 display="flex" justifyContent="space-between" flexWrap="wrap" alignItems={"center"}>
                <Typography variant="h5" fontWeight="bold">{title}</Typography>
                <Box display="flex" alignItems="center" flexWrap="wrap" gap={3}>
                    <Box display="flex" justifyContent="center" gap={1} flexDirection={"column"}>
                        <Typography variant="body" fontWeight="bold" textAlign={"left"}>{view == "Grid" ? t("grid") : t("list")} {t('view')}</Typography> {/* Translation for 'View' */}
                        <Box>
                            <Button onClick={() => setView("List")} sx={{ minWidth: "0", background: view == "List" && "#B71C1C" }}>
                                <ViewListIcon sx={{ color: view == "List" ? "#fff" : "#B71C1C" }} />
                            </Button>
                            <Button onClick={() => setView("Grid")} sx={{ minWidth: "0", background: view == "Grid" && "#B71C1C" }}>
                                <GridViewIcon sx={{ color: view == "Grid" ? "#fff" : "#B71C1C" }} />
                            </Button>
                        </Box>
                    </Box>
                    <Box display="flex" justifyContent="center" gap={1} flexDirection={"column"}>
                        <Typography variant="body1" fontWeight={"bold"} textAlign={ i18n.language == "ar" ? "right" : "left"}>{t('sortBy')}:</Typography> {/* Translation for 'Sort By' */}
                        <CustomSelect
                            styles={{
                                width: "10rem",
                                padding: "12px",
                                borderRadius: "4px",
                                backgroundColor: "#f5f5f5",
                                border: "1px solid #ccc",
                                color: "#000000",
                                fontSize: "0.875rem",
                                "&:focus": {
                                    outline: "none",
                                    borderColor: "#B71C1C",
                                    boxShadow: "0 0 0 2px rgba(183,28,28,0.2)"
                                },
                                appearance: "none",
                                WebkitAppearance: "none",
                                MozAppearance: "none"
                            }}
                            onChange={(value) => setSortOption(value)}
                            size="small"
                            placeholder={t('select')}
                            options={[
                                { name: t('mostRelevant'), value: "rel" },
                                { name: t('highestPrice'), value: "highest" },
                                { name: t('lowestPrice'), value: 'lowest' }
                            ]}
                        />
                    </Box>
                </Box>
            </Grid2>

            {
                view == "Grid" ?
                    <Grid2 item pt={2} sx={{ display: "flex", flexWrap: "wrap", gap: 3, "@media(max-width: 758px)": { gap: 1 }, "@media(max-width: 350px)": { justifyContent: "center" } }}>
                        {displayedCars.map((car, index) => (
                            <Grid2 item xs={12} sm={6} md={4} lg={3} key={index}>
                                <CarCard data={car} type={type} handleFavBtn={handleFavBtn} />
                            </Grid2>
                        ))}
                    </Grid2>
                    :
                    <Grid2 container spacing={2} pt={2} sx={{ "@media(max-width:768px)": { display: "flex", justifyContent: "center" } }}>
                        {displayedCars.map((car, index) => (
                            <Grid2 item xs={12} sm={6} md={4} lg={4} key={index} width="100%">
                                <CardList data={car} type={type} handleFavBtn={handleFavBtn} />
                            </Grid2>
                        ))}
                    </Grid2>
            }

            <Pagination
                count={Math.ceil(data.length / itemsPerPage)}
                page={page}
                onChange={handlePageChange}
                color="#B71C1C"
                sx={{ display: "flex", justifyContent: "center", mt: 3, direction:  i18n.language === "ar" ? "ltr" : "ltr" }}
            />

            <AuthDialog popupOpen={popupOpen} setPopupOpen={setPopupOpen} popup1Open={popup1Open} setPopup1Open={setPopup1Open} />
        </div >
    );
};

export default DataGrid;
