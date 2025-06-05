import { useState } from "react";
import {
    Grid2,
    Typography,
    Pagination,
    Box,
    Button
} from "@mui/material";
import CarCard from "../card/Card";
import ViewListIcon from "@mui/icons-material/ViewList";
import GridViewIcon from "@mui/icons-material/GridView";
import CardList from "../card/CardList";
import { isAuthenticated, deleteFav, createFavs } from "../../api/consumer";
import CustomSelect from "../../utils/Select";
import AuthDialog from "../auth/Dialog";
import { useTranslation } from 'react-i18next';

const DataGrid = ({ data, title, type }) => {
    const { t, i18n } = useTranslation();
    const [page, setPage] = useState(1);
    const [view, setView] = useState("Grid");
    const [sortOption, setSortOption] = useState("");
    const [popupOpen, setPopupOpen] = useState(false);
    const [popup1Open, setPopup1Open] = useState(false);
    
    const itemsPerPage = window.innerWidth > 800 && view === "Grid" ? 28 : 
                        window.innerWidth > 800 && view === "List" ? 7 : 
                        window.innerWidth < 800 && view === "List" ? 7 : 6;


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
        switch (sortOption) {
            case "price_high_to_low":
                return b.price - a.price;
            case "price_low_to_high":
                return a.price - b.price;
            case "newest":
                return new Date(b.created_at || b.date || b.createdAt) - new Date(a.created_at || a.date || a.createdAt);
            case "oldest":
                return new Date(a.created_at || a.date || a.createdAt) - new Date(b.created_at || b.date || b.createdAt);
            case "mileage_low_to_high":
                return (a.mileage || a.kilometers || 0) - (b.mileage || b.kilometers || 0);
            case "mileage_high_to_low":
                return (b.mileage || b.kilometers || 0) - (a.mileage || a.kilometers || 0);
            case "highest":
                return b.price - a.price;
            case "lowest":
                return a.price - b.price;
            default:
                return 0;
        }
    });

    const displayedCars = sortedData.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    return (
        <div style={{ width: "100%", direction: i18n.language === "ar" && "rtl" }}>
            <Grid2 display="flex" justifyContent="space-between" flexWrap="wrap" alignItems={"center"}>
                <Typography variant="h5" fontWeight="bold">{title}</Typography>
                <Box display="flex" alignItems="center" flexWrap="wrap" gap={3}>
                    <Box display="flex" justifyContent="center" gap={1} flexDirection={"column"}>
                        <Typography variant="body1" fontWeight="bold" textAlign={"left"}>
                            {view === "Grid" ? t("grid") : t("list")} {t('view')}
                        </Typography>
                        <Box>
                            <Button 
                                onClick={() => setView("List")} 
                                sx={{ minWidth: "0", background: view === "List" && "#B71C1C" }}
                            >
                                <ViewListIcon sx={{ color: view === "List" ? "#fff" : "#B71C1C" }} />
                            </Button>
                            <Button 
                                onClick={() => setView("Grid")} 
                                sx={{ minWidth: "0", background: view === "Grid" && "#B71C1C" }}
                            >
                                <GridViewIcon sx={{ color: view === "Grid" ? "#fff" : "#B71C1C" }} />
                            </Button>
                        </Box>
                    </Box>
                    <Box display="flex" justifyContent="center" gap={1} flexDirection={"column"}>
                        <Typography variant="body1" fontWeight={"bold"} textAlign={i18n.language === "ar" ? "right" : "left"}>
                            {t('sortBy')}:
                        </Typography>
                        <CustomSelect
                            styles={{
                                width: "12rem",
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
                            showStartAndorement={false}
                            size="small"
                            placeholder={t('select')}
                            options={[
                                { name: t('mostRelevant'), value: "rel" },
                                { name: t('priceHighToLow') || "Price: High to Low", value: "price_high_to_low" },
                                { name: t('priceLowToHigh') || "Price: Low to High", value: "price_low_to_high" },
                                { name: t('newest') || "Newest First", value: "newest" },
                                { name: t('oldest') || "Oldest First", value: "oldest" },
                                { name: t('mileageLowToHigh') || "Mileage: Low to High", value: "mileage_low_to_high" },
                                { name: t('mileageHighToLow') || "Mileage: High to Low", value: "mileage_high_to_low" },
                                { name: t('highestPrice'), value: "highest" },
                                { name: t('lowestPrice'), value: 'lowest' },
                            ]}
                        />
                    </Box>
                </Box>
            </Grid2>

            {view === "Grid" ? (
                <Grid2 item pt={2} sx={{ 
                    display: "flex", 
                    flexWrap: "wrap", 
                    gap: 3, 
                    "@media(max-width: 800px)": { justifyContent: "space-between", gap: 0 }, 
                    "@media(max-width: 361px)": { justifyContent: "center", gap: 2 } 
                }}>
                    {displayedCars.map((car, index) => (
                        <Grid2 item xs={12} sm={6} md={4} lg={3} key={index} mt={2}>
                            <CarCard data={car} type={type} handleFavBtn={handleFavBtn} isGrid={true} />
                        </Grid2>
                    ))}
                </Grid2>
            ) : (
                <Grid2 container spacing={2} pt={2} sx={{ "@media(max-width:768px)": { display: "flex", justifyContent: "center" } }}>
                    {displayedCars.map((car, index) => (
                        <Grid2 item xs={12} sm={6} md={4} lg={4} key={index} width="100%">
                            <CardList data={car} type={type} handleFavBtn={handleFavBtn} />
                        </Grid2>
                    ))}
                </Grid2>
            )}

            <Pagination
                count={Math.ceil(data.length / itemsPerPage)}
                page={page}
                onChange={handlePageChange}
                color="primary"
                sx={{ 
                    display: "flex", 
                    justifyContent: "center", 
                    mt: 3,
                    '& .MuiPaginationItem-root': {
                        color: '#B71C1C',
                        '&.Mui-selected': {
                            backgroundColor: '#B71C1C',
                            color: 'white',
                        },
                        '&:hover': {
                            backgroundColor: 'rgba(183,28,28,0.1)',
                        }
                    }
                }}
            />

            <AuthDialog 
                popupOpen={popupOpen} 
                setPopupOpen={setPopupOpen} 
                popup1Open={popup1Open} 
                setPopup1Open={setPopup1Open} 
            />
        </div>
    );
};

export default DataGrid;