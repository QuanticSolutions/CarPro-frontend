import React from 'react';
import {
    Box,
    Typography,
    Container,
    Paper,
    Grid,
    Card,
    CardContent,
    CardActionArea,
    Avatar
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ConstructionIcon from '@mui/icons-material/Construction';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Nav from '../components/menu/Nav';
import Footer from '../components/footer/Footer';
import { useTranslation } from 'react-i18next';

const CategorySelection = ({ type }) => {
    const categories = [
        { id: 1, name: 'cars', icon: <DirectionsCarIcon />, link: `${type}/cars` },
        { id: 3, name: 'heavy', icon: <LocalShippingIcon />, link: `${type}/heavy` },
        { id: 2, name: 'bikes', icon: <TwoWheelerIcon />, link: `${type}/bikes` },
        { id: 4, name: 'construction', icon: <ConstructionIcon />, link: `${type}/construction` },
        { id: 5, name: 'plates', icon: <DinnerDiningIcon />, link: `${type}/plates` },
        { id: 6, name: 'boats', icon: <DirectionsBoatIcon />, link: `${type}/boats` }
    ];

    const { t, i18n } = useTranslation();

    const handleCategoryClick = (categoryName) => {
        window.location.href = `/${categoryName}`
    };

    return (
        <>
            <Container sx={{ maxWidth: 1400, margin: '0 auto', p: 3, py: 5, direction: i18n.language == "ar" && "rtl", mt: window.innerWidth > 800 ? 10 : 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>{t('categorySelection.pageTitle')}</Typography>
                <Typography variant="h5" sx={{ mb: 3 }}>{t('categorySelection.chooseCategory')}</Typography>
                <Grid container spacing={3}>
                    {categories
                        .filter(category => !(category.name == "لوحات أرقام" && type == "rent"))
                        .map((category) => (
                            <Grid item xs={12} sm={6} md={4} key={category.id}>
                                <Card
                                    elevation={1}
                                    sx={{
                                        border: '1px solid #e0e0e0',
                                        borderRadius: 2,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                                            transform: 'translateY(-3px)'
                                        },
                                        "&:hover .MuiAvatar-root": {
                                            bgcolor: "#B71C1C"
                                        }
                                    }}
                                >
                                    <CardActionArea
                                        onClick={() => handleCategoryClick(category.link)}
                                        sx={{ display: 'flex', justifyContent: 'space-between', p: 1 }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Avatar
                                                sx={{
                                                    bgcolor: "black",
                                                    width: 50,
                                                    height: 50,
                                                    m: 1,
                                                    "&:hover": {
                                                        bgcolor: "#B71C1C"
                                                    }
                                                }}
                                            >
                                                {category.icon}
                                            </Avatar>
                                            <Typography variant="h6" sx={{ ml: 2 }}>
                                                {t(`categorySelection.categories.${category.name}`)}
                                            </Typography>
                                        </Box>
                                        {
                                            i18n.language == "ar" ?
                                                <ChevronLeftIcon sx={{ color: '#757575' }} />
                                                :
                                                <ChevronRightIcon sx={{ color: '#757575' }} />
                                        }
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                </Grid>
            </Container>
        </>
    );
};

export default CategorySelection;
