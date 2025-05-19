import { useState, useEffect } from 'react'
import Nav from '../components/menu/Nav'
import {
    Box,
    Typography,
    Tabs,
    Tab,
    Checkbox,
    Button,
    Card,
    CardContent,
    CardMedia,
    Paper,
    IconButton,
    Chip,
    Grid,
    useMediaQuery,
    useTheme,
    Divider,
    Container,
    Grid2,
    Menu,
    MenuItem
} from '@mui/material';
import CarCard from '../components/card/Card';
import { MoreVertical, WindArrowDownIcon } from 'lucide-react';
import Footer from '../components/footer/Footer';
import { getAdByUser, getImages, deleteAd, updateAd, API_BASE_URL } from '../api/consumer';
import { useTranslation } from 'react-i18next';

// const API_BASE_URL = "http://localhost:3000";
// const API_BASE_URL = "https://carprobackend.quanticsols.com";

function MyAds() {

    const [ads, setAds] = useState([]);
    const [tab, setTab] = useState("all");
    const [images, setImages] = useState({});
    const [selectedItems, setSelectedItems] = useState([]);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuAd, setMenuAd] = useState(null);
    const menuOpen = Boolean(anchorEl);
    const { t, i18n } = useTranslation();

    const handleMenuClick = (event, ad) => {
        setAnchorEl(event.currentTarget);
        setMenuAd(ad);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setMenuAd(null);
    };

    const retrieveAds = () => {
        getAdByUser(localStorage.getItem("user_id")).then(
            response => {
                setAds(response);
                response.map(
                    ad => {
                        getImages(ad.car_plate_number).then(
                            data => {
                                setImages(prev => ({
                                    ...prev,
                                    [ad.id]: data
                                }));
                            }
                        )
                    }
                )
            }
        );
    }

    const hasImages = (id) => {
        if (images[id] && images[id].length > 0) {
            return true
        }
        return false
    }

    useEffect(
        () => {
            retrieveAds();
        },
        []
    )

    const handleSelectItem = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(item => item !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };

    const handleSelectAll = () => {
        if (selectedItems.length > 0) {
            setSelectedItems([]);
        } else {
            setSelectedItems(ads.map(v => v.id));
        }
    };

    const handleDelete = () => {
        selectedItems.map(
            item => {
                deleteAd(item).then(
                    () => {
                        setSelectedItems([])
                        retrieveAds();
                    }
                )
            }
        )
    }

    const filterAds = () => {
        if (tab == "all") {
            return ads;
        }
        else {
            return ads.filter(ad => ad.status == tab);
        }
    }
    return (
        <Box
            sx={{ display: "flex", flexDirection: "column", justifyContent: 'center', marginTop: window.innerWidth > 800 && "8rem", marginBottom: '5rem', direction: i18n.language == "ar" && "rtl" }}
        >
            <Container sx={{ py: 4 }}>
                <Box width="100%">
                    <Typography variant="h6" fontWeight="bold">{t("myAds.manageAds")}</Typography>
                    <Tabs
                        value={tab}
                        variant='scrollable'
                        onChange={(e, newValue) => setTab(newValue)}
                        sx={{
                            my: 2,
                            "& .MuiTab-root": {
                                color: "black",
                                border: "1px solid black",
                                borderRadius: "25px",
                                mr: 1,
                                p: 1,
                                fontWeight: "bold",
                                textTransform: "none",
                                fontSize: "16px",
                                transition: "0.3s",
                            },
                            "& .MuiTab-root.Mui-selected": {
                                background: "black",
                                color: "#fff!important",
                            },
                            "& .MuiTabs-indicator": { display: "none" }
                        }} >
                        <Tab label={`${t("myAds.tabs.all")} (${ads.length})`} value="all" />
                        <Tab label={`${t("myAds.tabs.live")} (${ads.filter(ad => ad.status == "live").length})`} value="live" />
                        <Tab label={`${t("myAds.tabs.draft")} (${ads.filter(ad => ad.status == "draft").length})`} value="draft" />
                        <Tab label={`${t("myAds.tabs.sold")} (${ads.filter(ad => ad.status == "sold").length})`} value="sold" />
                        <Tab label={`${t("myAds.tabs.rejected")} (${ads.filter(ad => ad.status == "rejected").length})`} value="rejected" />
                    </Tabs>
                    {
                        ads ?
                            <Container sx={{ py: 2 }}>
                                <Paper
                                    elevation={1}
                                    sx={{
                                        bgcolor: theme.palette.grey[50],
                                        borderRadius: 2,
                                        overflow: 'hidden'
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            p: 2,
                                            borderBottom: 1,
                                            borderColor: 'divider'
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Checkbox
                                                size="small"
                                                checked={selectedItems.length > 0 && selectedItems.length === ads.length}
                                                indeterminate={selectedItems.length > 0 && selectedItems.length < ads.length}
                                                onChange={handleSelectAll}
                                            />
                                            <Typography variant="body2">{t("myAds.adsSelected", { count: selectedItems.length })}</Typography>
                                        </Box>
                                        <Button
                                            variant="contained"
                                            color="inherit"
                                            size="small"
                                            disabled={selectedItems.length === 0}
                                            onClick={handleDelete}
                                            sx={{
                                                bgcolor: theme.palette.grey[200],
                                                color: theme.palette.text.secondary,
                                                '&:hover': {
                                                    bgcolor: theme.palette.grey[300]
                                                },
                                                fontSize: '0.75rem',
                                                boxShadow: 'none'
                                            }}
                                        >
                                            {t("myAds.delete")}
                                        </Button>
                                    </Box>

                                    {
                                        filterAds().length > 0 ?
                                            filterAds().map((items) => (
                                                <Box sx={{ mb: 2 }}>
                                                    <Box
                                                        sx={{
                                                            bgcolor: theme.palette.grey[200],
                                                            px: 2,
                                                            py: 1.5
                                                        }}
                                                    >
                                                        {/* <Typography variant="subtitle1" fontWeight="medium">
                                                    {items.length}
                                                </Typography> */}
                                                    </Box>
                                                    <Box key={items.id}>
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                px: 2,
                                                                py: 1,
                                                                borderBottom: 1,
                                                                borderColor: 'divider',
                                                                color: theme.palette.text.secondary
                                                            }}
                                                        >
                                                        </Typography>

                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                p: 2,
                                                                borderBottom: 1,
                                                                borderColor: 'divider',
                                                                flexDirection: isMobile ? 'column' : 'row'
                                                            }}
                                                        >
                                                            <Box
                                                                sx={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    pr: 2,
                                                                    mb: isMobile ? 1 : 0
                                                                }}
                                                            >
                                                                <Checkbox
                                                                    size="small"
                                                                    checked={selectedItems.includes(items.id)}
                                                                    onChange={() => handleSelectItem(items.id)}
                                                                />
                                                            </Box>

                                                            <Card
                                                                sx={{
                                                                    display: 'flex',
                                                                    width: '100%',
                                                                    flexDirection: isMobile ? 'column' : 'row',
                                                                    borderRadius: 1,
                                                                    overflow: 'hidden',
                                                                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                                                                }}
                                                            >
                                                                {

                                                                    hasImages(items.id) ?
                                                                        <CardMedia
                                                                            component="img"
                                                                            sx={{
                                                                                width: isMobile ? '100%' : 150,
                                                                                height: isMobile ? 140 : '100%'
                                                                            }}
                                                                            image={`${API_BASE_URL}${images[items.id][images[items.id].length - 1].imageUrl}`}
                                                                            alt={items.model}
                                                                        /> :
                                                                        <CardMedia
                                                                            component="img"
                                                                            sx={{
                                                                                width: isMobile ? '100%' : 150,
                                                                                height: isMobile ? 140 : '100%'
                                                                            }}
                                                                            image="/assets/images/default.png"
                                                                            alt={items.model}
                                                                        />
                                                                }
                                                                <CardContent
                                                                    sx={{
                                                                        flex: 1,
                                                                        p: 2,
                                                                        '&:last-child': { pb: 2 }
                                                                    }}
                                                                >
                                                                    <Grid container spacing={1}>
                                                                        <Grid item xs={12} sm={8}>
                                                                            <Typography variant="subtitle1" component="h3">
                                                                                {items.model}
                                                                            </Typography>
                                                                            <Typography variant="h6" fontWeight="bold" sx={{ my: 0.5 }}>
                                                                                AED {items.price.toLocaleString()}
                                                                            </Typography>
                                                                            <Typography variant="caption" color="text.secondary">
                                                                                {items.city}
                                                                            </Typography>
                                                                        </Grid>

                                                                        <Grid item xs={12} sm={4} sx={{
                                                                            display: 'flex',
                                                                            flexDirection: 'column',
                                                                            alignItems: { xs: 'flex-start', sm: 'flex-end' },
                                                                            mt: { xs: 1, sm: 0 }
                                                                        }}>
                                                                            <Box sx={{
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                mb: 1,
                                                                                justifyContent: { xs: 'flex-start', sm: 'flex-end' },
                                                                                width: '100%'
                                                                            }}>
                                                                                <Chip
                                                                                    label={items.status}
                                                                                    size="small"
                                                                                    sx={{
                                                                                        bgcolor: items.status === 'Draft'
                                                                                            ? 'rgba(255, 152, 0, 0.1)'
                                                                                            : 'rgba(76, 175, 80, 0.1)',
                                                                                        color: items.status === 'Draft'
                                                                                            ? 'warning.main'
                                                                                            : 'success.main',
                                                                                        fontSize: '0.7rem',
                                                                                        height: 24
                                                                                    }}
                                                                                />
                                                                                <IconButton size="small" onClick={(e) => handleMenuClick(e, items)}>
                                                                                    <MoreVertical size={16} />
                                                                                </IconButton>
                                                                                <Menu
                                                                                    anchorEl={anchorEl}
                                                                                    open={Boolean(anchorEl)}
                                                                                    onClose={handleMenuClose}
                                                                                >
                                                                                    <MenuItem onClick={() => {
                                                                                        if (menuAd) {
                                                                                            updateAd(menuAd.id, { ...menuAd, status: "live" }).then(() => {
                                                                                                retrieveAds();
                                                                                                handleMenuClose();
                                                                                            });
                                                                                        }
                                                                                    }}>
                                                                                        Make Live
                                                                                    </MenuItem>
                                                                                    <MenuItem onClick={() => {
                                                                                        if (menuAd) {
                                                                                            updateAd(menuAd.id, { ...menuAd, status: "draft" }).then(() => {
                                                                                                retrieveAds();
                                                                                                handleMenuClose();
                                                                                            });
                                                                                        }
                                                                                    }}>
                                                                                        Add to Draft
                                                                                    </MenuItem>
                                                                                    <MenuItem onClick={() => { localStorage.setItem("ad_id", menuAd.id); window.location.href = "/checkout" }}>
                                                                                        Feature Your Ad
                                                                                    </MenuItem>
                                                                                </Menu>
                                                                            </Box>
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={4} >
                                                                            <Button
                                                                                variant="outlined"
                                                                                color="inherit"
                                                                                size="small"
                                                                                sx={{
                                                                                    borderColor: "#B71C1C",
                                                                                    color: "#B71C1C",
                                                                                    '&:hover': {
                                                                                        bgcolor: theme.palette.grey[300]
                                                                                    },
                                                                                    fontSize: '0.75rem',
                                                                                    boxShadow: 'none'
                                                                                }}
                                                                                onClick={() => { localStorage.setItem("ad_id", items.id); window.location.href = `/update/sell/${items.category}` }}
                                                                            >
                                                                                Continue Posting
                                                                            </Button>
                                                                        </Grid>
                                                                    </Grid>
                                                                </CardContent>
                                                            </Card>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            )) :
                                            <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                <img src="/assets/images/add-gif.gif" width="350rem" />
                                            </Box>
                                    }
                                </Paper>
                            </Container>
                            :
                            <Box width="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                                <img src="/assets/images/man-car.png" width={200} />
                                <Typography fontWeight="bold" textAlign="center" py={4}>You Havent Posted Any Ads</Typography>
                            </Box>
                    }
                </Box>
            </Container>
        </Box>
    )
}

export default MyAds
