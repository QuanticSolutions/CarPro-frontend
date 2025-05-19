import { useState, useEffect } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Box, Typography, Button, Grid2, Dialog, DialogContent, DialogActions, DialogTitle, TextField, Paper, Container, IconButton, Chip } from '@mui/material';
import {
    FacebookShareButton,
    WhatsappShareButton,
    TwitterShareButton,
    FacebookIcon,
    WhatsappIcon,
    TwitterIcon,
} from 'react-share';
import { Galleria } from 'primereact/galleria';
import { getAdById, getUser, isAuthenticated, getImages, getFavsByAd, createFavs, deleteFav, API_BASE_URL } from '../../api/consumer';
import Chat from '../chat/Chat'
import Description from './Description';
import ChatIcon from "@mui/icons-material/Chat";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import EventIcon from "@mui/icons-material/Event";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SpeedIcon from "@mui/icons-material/Speed";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import CloseIcon from '@mui/icons-material/Close';
import AuthDialog from '../auth/Dialog';
import { useTranslation } from 'react-i18next';

const BoxStyles = {
    py: window.innerWidth >= 1000 ? "1rem" : 0,
    mt: window.innerWidth >= 1000 ? "3rem" : 0
}

const PrevArrow = ({ onClick }) => (
    <ArrowLeftIcon sx={{ fontSize: 40, color: "#fff" }} />
);

const NextArrow = ({ onClick }) => (
    <ArrowRightIcon sx={{ fontSize: 40, color: "#fff" }} />
);

const getConditionColor = (condition) => {
    switch (condition?.toLowerCase()) {
        case 'new':
            return '#4CAF50';
        case 'pre-owned':
            return '#2196F3';
        case 'used':
            return '#FF9800';
        default:
            return '#757575';
    }
};

function Details({ id, type = "sell" }) {

    const [ad, setAd] = useState({});
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});
    const [popupOpen, setPopupOpen] = useState(false);
    const [authPopupOpen, setAuthPopupOpen] = useState(false);
    const [authPopup1Open, setAuthPopup1Open] = useState(false);
    const [imagePopupOpen, setImagePopupOpen] = useState(false);
    const [sharePopup, setSharePopup] = useState(false);
    const [images, setImages] = useState([]);
    const [isFav, setIsFav] = useState(false);
    const currentUrl = window.location.href;
    const shareUrl = `${API_BASE_URL}/ads/preview/${id}`;
    const title = ad.title;
    const { t, i18n } = useTranslation();

    const itemTemplate = (item) => {
        return <img src={`${API_BASE_URL}${item.imageUrl}`} alt="Image" style={{ display: 'block', width: "100%", height: "320px", marginBottom: "0.5rem", objectFit: "cover" }} onClick={() => setImagePopupOpen(true)} />
    }

    const thumbnailTemplate = (item) => {
        return <img src={`${API_BASE_URL}${item.imageUrl}`} alt="Image" width="100rem" style={{ display: 'block' }} onClick={() => setImagePopupOpen(true)} />
    }

    const convertToArabicNumbers = (number) => {
        const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
        return number.toString().split('').map(digit => arabicDigits[parseInt(digit)] || digit).join('');
    };

    useEffect(
        () => {
            getFavsByAd(ad.id).then(
                (data) => {
                    data.map(
                        (fav) => {
                            if (fav.user_id == localStorage.getItem("user_id")) {
                                setIsFav(true)
                            }
                        }
                    )
                }
            )
        }
        , []
    )

    const handleFavBtn = () => {
        if (isAuthenticated) {
            if (isFav) {
                deleteFav(ad.id)
                setIsFav(false)
                notify("Ad removed from favourites")
            }
            else {
                createFavs({ user_id: localStorage.getItem("user_id"), ad_id: ad.id })
                setIsFav(true)
                notify("Ad added to favourites")
            }
        }
    }


    useEffect(() => {
        setLoading(true);

        getAdById(id).then((data) => {
            setAd(data[0]);
            getUser(data[0].user_id).then((userData) => {
                setUser(userData);
            });
            getImages(data[0].car_plate_number).then(setImages);
            setLoading(false);
        }).catch(error => {
            console.error('Error fetching data:', error);
            setLoading(false);
        });
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }
    
    return (
        <Box sx={{ ...BoxStyles, direction: i18n.language == "ar" && "rtl" }}>
            {
                window.innerWidth <= 768 &&
                <Galleria value={images} numVisible={5} circular style={{ maxWidth: '100%' }} showItemNavigators
                    showThumbnails={false} item={itemTemplate} thumbnail={thumbnailTemplate} itemNextIcon={<NextArrow />} itemPrevIcon={<PrevArrow />} />
            }
            <Container>
                {
                    window.innerWidth > 768 &&
                    <Box sx={{ width: "100%", display: "flex", gap: 1, height: "24rem", maxHeight: "24rem", minHeight: "24rem" }}>
                        <Box
                            sx={{
                                width: "75%",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                overflow: "hidden",
                            }}
                        >
                            {images[0] && (
                                <img
                                    src={`${API_BASE_URL}${images[0].imageUrl}`}
                                    alt="Main"
                                    style={{
                                        width: "100%",
                                        maxWidth: "100%",
                                        minHeight: "100%",
                                        maxHeight: "100%",
                                        objectFit: "cover",
                                        imageRendering: "auto",
                                        display: "block"
                                    }}
                                    onClick={() => setImagePopupOpen(true)}
                                />
                            )}
                        </Box>
                        <Box sx={{ width: "50%", maxWidth: "100%", height: "24rem", }}>
                            <Box
                                sx={{
                                    width: "100%",
                                    height: "49%",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    overflow: "hidden",
                                }}
                            >
                                {images[1] && (
                                    <img
                                        src={`${API_BASE_URL}${images[1].imageUrl}`}
                                        alt="Main"
                                        style={{
                                            minWidth: "100%",
                                            maxWidth: "100%",
                                            maxHeight: "100%",
                                            minHeight: "100%",
                                            objectFit: "cover",
                                            imageRendering: "auto",
                                            display: "block"
                                        }}
                                        onClick={() => setImagePopupOpen(true)}
                                    />
                                )}
                            </Box>
                            <Box
                                sx={{
                                    width: "100%",
                                    height: "49%",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    overflow: "hidden",
                                    mt: 1
                                }}
                            >
                                {images[2] && (
                                    <img
                                        src={`${API_BASE_URL}${images[1].imageUrl}`}
                                        alt="Main"
                                        style={{
                                            maxWidth: "100%",
                                            minWidth: "100%",
                                            maxHeight: "100%",
                                            minHeight: "100%",
                                            objectFit: "cover",
                                            imageRendering: "auto",
                                            display: "block"
                                        }}
                                        onClick={() => setImagePopupOpen(true)}
                                    />

                                )}
                            </Box>
                        </Box>

                    </Box>
                }
                <Grid2
                    display="flex"
                    sx={{
                        "@media (max-width:768px)": {
                            flexDirection: "column"
                        },
                    }}>
                    <Box width="70%" mt={2}>
                        <Box display="flex" justifyContent="space-between" flexWrap="wrap" gap={1} py={1}>
                            <Box>
                                {
                                    type == "sell" &&
                                    <Typography variant='h5' fontWeight="bold" textAlign="left">
                                        {t("AED")} {i18n.language == "ar" && ad.price ? convertToArabicNumbers(ad.price) : ad.price}
                                    </Typography>
                                }
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 1 }}>
                                    <Typography variant='h6' textAlign="left">
                                        {ad.title}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box display="flex" gap={0.5}>
                                {
                                    type == "rent" &&
                                    <Paper
                                        elevation={1}
                                        sx={{
                                            backgroundColor: '#e0e0e0',
                                            borderRadius: 1,
                                            padding: 1,
                                            width: 'fit-content',
                                            maxWidth: '180px'
                                        }}
                                    >
                                        <Box>
                                            <Typography
                                                variant="caption"
                                                component="div"
                                                sx={{
                                                    fontWeight: 'medium',
                                                    color: '#333',
                                                    fontSize: '0.75rem',
                                                    letterSpacing: '0.5px',
                                                    marginBottom: '2px'
                                                }}
                                            >
                                                {t('daily_rent')}
                                            </Typography>

                                            <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                                                <Typography
                                                    variant="h6"
                                                    component="span"
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        color: '#333',
                                                        fontSize: '1.25rem',
                                                        marginRight: '4px'
                                                    }}
                                                >
                                                    AED 75
                                                </Typography>

                                                <Typography
                                                    variant="caption"
                                                    component="span"
                                                    sx={{
                                                        color: '#333',
                                                        fontSize: '0.75rem'
                                                    }}
                                                >
                                                    200 kms/day
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Paper>
                                }
                                {
                                    type == "rent" &&
                                    <Paper
                                        elevation={1}
                                        sx={{
                                            backgroundColor: '#e0e0e0',
                                            borderRadius: 1,
                                            padding: 1,
                                            width: 'fit-content',
                                            maxWidth: '180px'
                                        }}
                                    >
                                        <Box>
                                            <Typography
                                                variant="caption"
                                                component="div"
                                                sx={{
                                                    fontWeight: 'medium',
                                                    color: '#333',
                                                    fontSize: '0.75rem',
                                                    letterSpacing: '0.5px',
                                                    marginBottom: '2px'
                                                }}
                                            >
                                                {t('weekly_rent')}
                                            </Typography>

                                            <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                                                <Typography
                                                    variant="h6"
                                                    component="span"
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        color: '#333',
                                                        fontSize: '1.25rem',
                                                        marginRight: '4px'
                                                    }}
                                                >
                                                    AED 75
                                                </Typography>


                                                <Typography
                                                    variant="caption"
                                                    component="span"
                                                    sx={{
                                                        color: '#333',
                                                        fontSize: '0.75rem'
                                                    }}
                                                >
                                                    200 kms/day
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Paper>
                                }
                                {
                                    type == "rent" &&
                                    <Paper
                                        elevation={1}
                                        sx={{
                                            backgroundColor: '#e0e0e0',
                                            borderRadius: 1,
                                            padding: 1,
                                            width: 'fit-content',
                                            maxWidth: '180px'
                                        }}
                                    >
                                        <Box>
                                            <Typography
                                                variant="caption"
                                                component="div"
                                                sx={{
                                                    fontWeight: 'medium',
                                                    color: '#333',
                                                    fontSize: '0.75rem',
                                                    letterSpacing: '0.5px',
                                                    marginBottom: '2px'
                                                }}
                                            >
                                                {t('monthly_rent')}
                                            </Typography>

                                            <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                                                <Typography
                                                    variant="h6"
                                                    component="span"
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        color: '#333',
                                                        fontSize: '1.25rem',
                                                        marginRight: '4px'
                                                    }}
                                                >
                                                    AED 75
                                                </Typography>

                                                <Typography
                                                    variant="caption"
                                                    component="span"
                                                    sx={{
                                                        color: '#333',
                                                        fontSize: '0.75rem'
                                                    }}
                                                >
                                                    200 kms/day
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Paper>
                                }
                            </Box>
                            <Box display="flex" gap="7px">
                                <Button variant='outlined' color="black" height="padding" onClick={handleFavBtn} sx={{ backgroundColor: isFav ? "#B71C1C" : "none", color: isFav ? "#fff" : "black", maxHeight: "3rem", display: "flex", gap: 1 }}>
                                    <FavoriteBorderIcon /> {t('favourite')}
                                </Button>
                                <Button variant='outlined' color="black" sx={{ maxHeight: "3rem", display: "flex", gap: 1 }} onClick={() => setSharePopup(!sharePopup)}>
                                    <ShareIcon /> {t('share')}
                                </Button>
                            </Box>
                        </Box>
                        {
                            ad.category != "Plates" &&
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 2,
                                    mb: 1.5,
                                    mt: 1
                                }}
                            >
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <EventIcon sx={{ fontSize: 25, mr: 0.5, color: "text.secondary" }} />
                                    <Typography variant="body2" color="text.secondary">
                                        {i18n.language == "ar" && ad.year ? convertToArabicNumbers(ad.year) : ad.year}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <PeopleAltIcon sx={{ fontSize: 25, mr: 0.5, color: "text.secondary" }} />
                                    <Typography variant="body2" color="text.secondary">
                                        {i18n.language == "ar" && ad.seats ? convertToArabicNumbers(ad.seats) : ad.seats}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <SpeedIcon sx={{ fontSize: 25, mr: 0.5, color: "text.secondary" }} />
                                    <Typography variant="body2" color="text.secondary">
                                        {i18n.language == "ar" ? convertToArabicNumbers(ad.kilometers) : ad.kilometers}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    {ad.vehicle_condition && (
                                        <Chip
                                            label={ad.vehicle_condition}
                                            sx={{
                                                backgroundColor: getConditionColor(ad.vehicle_condition),
                                                color: 'white',
                                                fontWeight: 'bold',
                                                fontSize: '0.75rem',
                                                height: '24px'
                                            }}
                                        />
                                    )}
                                </Box>
                            </Box>
                        }
                        {
                            !isAuthenticated &&
                            <Button variant="filled" onClick={() => setAuthPopupOpen(true)} sx={{ backgroundColor: "#B71C1C", color: "#fff" }}>
                                {t('login_to_contact')}
                            </Button>
                        }
                    </Box>
                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        width="50%"
                        gap="5px"
                        marginLeft="30px"
                        flexWrap="wrap"
                        mt={2}
                        py={1}
                        sx={{
                            "@media (max-width:768px)": {
                                marginLeft: "0",
                                width: "50%"
                            },
                        }}
                    >
                        {
                            isAuthenticated && localStorage.getItem("user_id") != ad.user_id &&
                            <Button variant='filled' sx={{ backgroundColor: "#009810", color: "#fff", width: "100%", marginRight: i18n.language == "ar" && "2rem" }}>
                                <a href={`https://wa.me/${user.phone}`} style={{ display: "flex", alignItems: "center", color: "#fff" }} target='__blank'>
                                    <WhatsAppIcon />&nbsp;{t('whatsapp')}
                                </a>
                            </Button>
                        }
                        {
                            isAuthenticated && localStorage.getItem("user_id") != ad.user_id &&
                            <Button variant='filled' sx={{ backgroundColor: "black", color: "#fff", width: "100%", marginRight: i18n.language == "ar" && "2rem"  }}><PhoneIcon />&nbsp; {t('phone')}</Button>
                        }
                        {
                            isAuthenticated && localStorage.getItem("user_id") != ad.user_id &&
                            <Button variant='outlined' color="black" sx={{ borderColor: "black", color: "black", width: "100%", marginRight: i18n.language == "ar" && "2rem"  }} onClick={() => { localStorage.setItem("reciever_id", user.id); setPopupOpen(true) }}><ChatIcon />&nbsp; {t('chat')}</Button>
                        }
                    </Box>
                </Grid2>
                <Description ad={ad} />
                <Dialog open={popupOpen} onClose={() => setPopupOpen(false)} fullScreen={true}>
                    <Chat />
                    <CloseIcon onClick={() => setPopupOpen(false)} sx={{ color: "#B71C1C", cursor: "pointer", position: "fixed", top: 3, right: 3 }} />
                </Dialog>
                <Dialog open={imagePopupOpen} onClose={() => setImagePopupOpen(false)} fullScreen>
                    <Box
                        sx={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#000",
                            padding: "1rem",
                            overflowY: "scroll",
                        }}
                    >
                        <IconButton
                            onClick={() => setImagePopupOpen(false)}
                            sx={{
                                position: "fixed",
                                top: 20,
                                right: 20,
                                zIndex: 1000,
                                color: "white",
                            }}
                        >
                            ✕
                        </IconButton>
                        {images.map((img, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    mb: 2,
                                }}
                            >
                                <img
                                    src={`${API_BASE_URL}${img.imageUrl}`}
                                    alt={`preview-${index}`}
                                    style={{
                                        maxWidth: "100%",
                                        maxHeight: "90vh",
                                        objectFit: "contain",
                                        imageRendering: "auto",
                                        borderRadius: "8px",
                                    }}
                                />
                            </Box>
                        ))}
                    </Box>
                </Dialog>
                <AuthDialog popupOpen={authPopupOpen} setPopupOpen={setAuthPopupOpen} popup1Open={authPopup1Open} setPopup1Open={setAuthPopup1Open} />
                <Dialog open={sharePopup} onClose={() => setSharePopup(!sharePopup)} fullWidth maxWidth="sm">
                    <DialogActions>
                        <CloseIcon onClick={() => setSharePopup(!sharePopup)} sx={{ color: "#B71C1C", cursor: "pointer" }} />
                    </DialogActions>
                    <DialogTitle>{t('share_this_page')}</DialogTitle>
                    <DialogContent>
                        <Typography variant="subtitle1" gutterBottom>
                            {t('page_link')}
                        </Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={shareUrl}
                            InputProps={{ readOnly: true }}
                        />

                        <Typography variant="subtitle1" mt={2}>
                            {t('share_via')}
                        </Typography>

                        <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                            <FacebookShareButton url={shareUrl} title={title}><FacebookIcon size={40} round /></FacebookShareButton>
                            <WhatsappShareButton url={shareUrl} title={title}><WhatsappIcon size={40} round /></WhatsappShareButton>
                            <TwitterShareButton url={shareUrl} title={title}><TwitterIcon size={40} round /></TwitterShareButton>
                        </div>
                    </DialogContent>
                </Dialog>
            </Container>
        </Box>
    )
}

export default Details