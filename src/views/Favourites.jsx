import { useState, useEffect } from 'react'
import { Box, Typography, Tabs, Tab, Container, Grid2 } from "@mui/material"
import CarCard from '../components/card/Card';
import { getFavsByUser, getAdById, checkUser, deleteFav, createFavs } from '../api/consumer';
import { useTranslation } from 'react-i18next';

function Favourites() {

    const [favs, setFavs] = useState([]);
    const [tab, setTab] = useState("all");
    const { t, i18n } = useTranslation();

    const fetchFavs = async () => {
        const userId = localStorage.getItem("user_id");
        const userFavs = await getFavsByUser(userId);
        const favAds = await Promise.all(
            userFavs.map(async (fav) => {
                const ad = await getAdById(fav.ad_id);
                return ad;
            })
        );
        setFavs(favAds);
    };

    const handleFavBtn = async (isFav, data) => {
        if (await checkUser()) {
            if (isFav) {
                deleteFav(data.id)
            }
            else {
                createFavs({ user_id: localStorage.getItem("user_id"), ad_id: data.id })
            }
        }
        fetchFavs();
    }

    const filterFavs = () => {
        if (tab == "all") {
            return favs;
        }
        else {
            return favs.filter(fav => fav[0].category == tab)
        }
    }

    useEffect(() => {
        fetchFavs();
    }, [favs]);

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: 'center', marginTop: window.innerWidth >= 1000 && "8rem", marginBottom: "5rem", direction: i18n.language == "ar" && "rtl" }}>
            <Container sx={{ py: 4 }}>
                <Box width="100%" minHeight="20rem">
                    <Typography variant="h6" fontWeight="bold">{t('favourites.title')}</Typography>
                    <Tabs
                        value={tab}
                        variant='scrollable'
                        scrollButtons="auto"
                        onChange={(e, newValue) => setTab(newValue)}
                        sx={{
                            my: 1,
                            "& .MuiTab-root": {
                                color: "black",
                                border: "1px solid black",
                                borderRadius: "20px",
                                mr: 0.5,
                                py: 0.5,
                                px: 1,
                                minWidth: "32px",
                                minHeight: "32px",
                                fontWeight: "bold",
                                textTransform: "none",
                                fontSize: { xs: "12px", sm: "14px", md: "16px" },
                                transition: "0.3s",
                            },
                            "& .MuiTab-root.Mui-selected": {
                                background: "black",
                                color: "#fff!important",
                            },
                            "& .MuiTabs-indicator": { display: "none" }
                        }}
                    >
                        <Tab label={t('favourites.all', { count: favs.length })} value="all" />
                        <Tab label={t('favourites.cars', { count: favs.filter(f => f[0].category === 'cars').length })} value="cars" />
                        <Tab label={t('favourites.bikes', { count: favs.filter(f => f[0].category === 'bikes').length })} value="bikes" />
                        <Tab label={t('favourites.construction', { count: favs.filter(f => f[0].category === 'construction').length })} value="construction" />
                        <Tab label={t('favourites.heavy', { count: favs.filter(f => f[0].category === 'heavy').length })} value="heavy" />
                        <Tab label={t('favourites.plates', { count: favs.filter(f => f[0].category === 'plates').length })} value="plates" />
                        <Tab label={t('favourites.boats', { count: favs.filter(f => f[0].category === 'boats').length })} value="boats" />
                    </Tabs>

                    {
                        filterFavs().length > 0 ?
                            <Grid2 pt={2} sx={{ display: "flex", flexWrap: "wrap", gap:1, "@media(max-width:500px)": { justifyContent: "space-between", gap: "5px", flexWrap: "none"}, "@media(max-width:361px)":{justifyContent: "center"} }}>
                                {
                                    filterFavs().map((fav, index) => (
                                        <Grid2 item xs={12} sm={8} md={4} lg={4} mt={1} key={index}>
                                            <CarCard data={fav[0]} handleFavBtn={handleFavBtn} isGrid={true}/>
                                        </Grid2>
                                    ))
                                }
                            </Grid2>
                            :
                            <Box sx={{ display: "flex", justifyContent: "center" }}>
                                <img src="/assets/images/gif-favourite.gif" width="350rem" />
                            </Box>
                    }
                </Box>
            </Container>
        </div>
    )
}

export default Favourites
