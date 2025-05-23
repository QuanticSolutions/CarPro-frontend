import { useState, useEffect } from 'react'
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
    Container,
    Menu,
    MenuItem
} from '@mui/material';
import { MoreVertical } from 'lucide-react';
import { getAdByUser, getImages, deleteAd, updateAd, API_BASE_URL, getRentByUser } from '../api/consumer';
import { useTranslation } from 'react-i18next';

const getStatusChipProps = (status) => {
    const statusLower = status?.toLowerCase();

    switch (statusLower) {
        case 'live':
            return {
                bgcolor: 'rgba(76, 175, 80, 0.1)',
                color: 'success.main',
                borderColor: '#4CAF50'
            };
        case 'draft':
            return {
                bgcolor: 'rgba(255, 152, 0, 0.1)',
                color: 'warning.main',
                borderColor: '#FF9800'
            };
        case 'pending':
            return {
                bgcolor: 'rgba(33, 150, 243, 0.1)',
                color: 'info.main',
                borderColor: '#2196F3'
            };
        case 'sold':
            return {
                bgcolor: 'rgba(156, 39, 176, 0.1)',
                color: 'secondary.main',
                borderColor: '#9C27B0'
            };
        case 'rejected':
            return {
                bgcolor: 'rgba(244, 67, 54, 0.1)',
                color: 'error.main',
                borderColor: '#F44336'
            };
        default:
            return {
                bgcolor: 'rgba(158, 158, 158, 0.1)',
                color: 'text.secondary',
                borderColor: '#9E9E9E'
            };
    }
};

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

    const retrieveAds = async () => {
        const userId = localStorage.getItem("user_id");

        try {
            const [adsResponse, rentAdsResponse] = await Promise.all([
                getAdByUser(userId),
                getRentByUser(userId)
            ]);
            const allAds = [...adsResponse, ...rentAdsResponse];
            setAds(allAds);
            allAds.forEach(ad => {
                getImages(ad.car_plate_number).then(data => {
                    setImages(prev => ({
                        ...prev,
                        [ad.id]: data
                    }));
                });
            });

        } catch (error) {
            console.error("Failed to retrieve ads:", error);
        }
    };


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
                            my: 1,
                            "& .MuiTab-root": {
                                color: "black",
                                border: "1px solid black",
                                borderRadius: "20px",
                                mr: 0.5,
                                py: 0.5,
                                px: 1,
                                minHeight: "32px",
                                minWidth: "32px",
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
                        <Tab label={`${t("myAds.tabs.all")} (${ads.length})`} value="all" />
                        <Tab label={`${t("myAds.tabs.live")} (${ads.filter(ad => ad.status == "live").length})`} value="live" />
                        <Tab label={`${t("myAds.tabs.draft")} (${ads.filter(ad => ad.status == "draft").length})`} value="draft" />
                        <Tab label={`${t("myAds.tabs.pending")} (${ads.filter(ad => ad.status == "pending").length})`} value="pending" />
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

                                                    <Box key={items.id}>
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
                                                                    position: "relative",
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
                                                                                width: isMobile ? '100%' : 250,
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
                                                                        position: "relative",
                                                                        '&:last-child': { pb: 2 }
                                                                    }}
                                                                >
                                                                    <Grid container spacing={1}>
                                                                        <Grid item xs={12} sm={8}>
                                                                            <Typography variant="h5" component="h3">
                                                                                {items.title}
                                                                            </Typography>
                                                                            <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 0.5, color: "#B71C1C" }}>
                                                                                AED {items.price.toLocaleString()}
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
                                                                                        ...getStatusChipProps(items.status),
                                                                                        fontSize: '0.7rem',
                                                                                        height: 24,
                                                                                        border: '1px solid',
                                                                                        fontWeight: 'medium',
                                                                                        textTransform: 'capitalize'
                                                                                    }}
                                                                                />
                                                                                <IconButton size="small" onClick={(e) => handleMenuClick(e, items)} sx={{ position: isMobile && "absolute", right: isMobile && i18n.language != "ar" && 0, top: isMobile && 10, left: isMobile && i18n.language == "ar" && 0 }}>
                                                                                    <MoreVertical size={16} />
                                                                                </IconButton>
                                                                                <Menu
                                                                                    anchorEl={anchorEl}
                                                                                    open={Boolean(anchorEl)}
                                                                                    onClose={handleMenuClose}
                                                                                >

                                                                                    <MenuItem
                                                                                        onClick={() => (window.location = `/ad/${menuAd.adType}?id=${menuAd.id}`)}
                                                                                    >
                                                                                        {t("View Ad")}
                                                                                    </MenuItem>

                                                                                    <MenuItem onClick={() => { localStorage.setItem("ad_id", items.id); window.location.href = `/update/sell/${menuAd.category}` }}>
                                                                                        {t("Edit Ad")}
                                                                                    </MenuItem>

                                                                                    {
                                                                                        menuAd && menuAd.status != "live" &&
                                                                                        <MenuItem onClick={() => {
                                                                                            if (menuAd) {
                                                                                                updateAd(menuAd.id, { ...menuAd, status: "live" }).then(() => {
                                                                                                    retrieveAds();
                                                                                                    handleMenuClose();
                                                                                                });
                                                                                            }
                                                                                        }}>
                                                                                            {t("Make Live")}
                                                                                        </MenuItem>
                                                                                    }
                                                                                    {
                                                                                        menuAd && menuAd.status != "draft" &&
                                                                                        <MenuItem onClick={() => {
                                                                                            if (menuAd) {
                                                                                                updateAd(menuAd.id, { ...menuAd, status: "draft" }).then(() => {
                                                                                                    retrieveAds();
                                                                                                    handleMenuClose();
                                                                                                });
                                                                                            }
                                                                                        }}>
                                                                                            {t("Add to Draft")}
                                                                                        </MenuItem>
                                                                                    }
                                                                                    <MenuItem onClick={() => { localStorage.setItem("ad_id", menuAd.id); window.location.href = "/checkout" }}>
                                                                                        {t("Feature Your Ad")}
                                                                                    </MenuItem>
                                                                                </Menu>
                                                                            </Box>
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
