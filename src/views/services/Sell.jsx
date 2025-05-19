import { useState, useEffect } from 'react'
import Nav from '../../components/menu/Nav';
import { Box, Grid, Typography, Card, CardContent, Container, Paper } from "@mui/material";
import Categories from '../../components/categories/Categories';
import TestimonialSlider from '../../components/testimonials/Testimonials';
import Banner from '../../components/banner.jsx/Banner';
import SpeedIcon from '@mui/icons-material/Speed';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';
import PercentIcon from '@mui/icons-material/Percent';
import Footer from '../../components/footer/Footer';
import Main from '../../components/menu_image/main_image/Main';
import CardSlider from '../../components/card/CardSlider';
import { getAllAds } from '../../api/consumer';
import { useTranslation } from 'react-i18next'

function Sell() {

  const [data, setData] = useState([]);
  const { t, i18n } = useTranslation();
  useEffect(
    () => {
      getAllAds().then(setData);
    },
    []
  )

  const cards = [
    {
      title: "UAE #1 automotive marketplace",
      content: "",
      img: "number-1"
    },
    {
      title: "5 lac+ visitors daily",
      content: "",
      img: "number-5"
    },
    {
      title: "3 million+ cars sold",
      content: "",
      img: "number-3"
    },
    {
      title: "80% cars sold within 48 hours",
      content: "",
      img: "48"
    }
  ]

  const sellingPoints = [
    {
      icon: <SpeedIcon />,
      background: '#b71c1c',
      title: t('sellPage.sellingPoints.title1'),
      description: t('sellPage.sellingPoints.description1')
    },
    {
      icon: <AccessTimeIcon />,
      background: '#1565c0',
      title: t('sellPage.sellingPoints.title2'),
      description: t('sellPage.sellingPoints.description2')
    },
    {
      icon: <PeopleIcon />,
      background: '#2e7d32',
      title: t('sellPage.sellingPoints.title3'),
      description: t('sellPage.sellingPoints.description3')
    },
    {
      icon: <PercentIcon />,
      background: '#e65100',
      title: t('sellPage.sellingPoints.title4'),
      description: t('sellPage.sellingPoints.description4')
    },
  ];

  const categories = [

    {
      name: t("sellPage.categories.sellCars"),
      link: "/cars/sell",
      image: "SellCars"
    },
    {
      name: t("sellPage.categories.sellHeavyCars"),
      link: "/heavy/sell",
      image: "SellHeavyCars"
    },
    {
      name: t("sellPage.categories.sellBikes"),
      link: "/bikes/sell",
      image: "SellBikes"
    },
    {
      name: t("sellPage.categories.sellPlates"),
      link: "/plates/sell",
      image: "SellPlates"
    },
    {
      name: t("sellPage.categories.sellConstruction"),
      link: "/construction/sell",
      image: "SellConstruction"
    },
    {
      name: t("sellPage.categories.sellBoats"),
      link: "/boats/sell",
      image: "SellBoats"
    },
  ]

  const headerText = <>{t("sellPage.header")}<br /> <span style={{ color: "red", marginTop: "-5rem", fontSize: "100px" }}>{t("sellPage.subHeader")}</span></>
  const headerTextStyles = {
    marginTop: "6rem",
    textAlign: "center",
    fontSize: "150px",
    lineHeight: "0.6",
  }
  const text = t("sellPage.subText");
  const textStyles = {
    marginTop: "1.5rem",
    lineHeight: "1.5px",
    fontWeight: 700,
    fontSize: "28px",
    textAlign: "center",
    textTransform: "none"
  }
  return (
    <>
      <Main showForm={false}
        showText={true}
        image="sell"
        headerText={headerText}
        headerTextStyles={headerTextStyles}
        text={text}
        textStyles={textStyles}
        justifyContent="center"
      />
      <Categories title={t("sellPage.vehicleCategories")} contents={categories} />
      <Container sx={{ mt: '4rem' }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'bold',  textAlign: i18n.language == "ar" ? "right" : "left" }}>
          {t("sellPage.whySell")}
          </Typography>

          <Grid container spacing={2}>
            {sellingPoints.map((point, index) => (
              <Grid item xs={12} sm={6} md={3} my={1.5} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    backgroundImage: "linear-gradient(#B71C1C, black)",
                    color: 'white',
                    borderRadius: 1,
                    minHeight: 120
                  }}
                >
                  <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {point.title}
                  </Typography>
                  <Typography variant="body2">
                    {point.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      <img src={i18n.language == "en" ? "/assets/images/banner (17).png" : "/assets/images/banner_ar (17).png"} width="100%" style={{ objectFit: "cover", }} />
      <CardSlider title={t("popularCars")} data={data.filter(obj => obj.category == "cars" && obj.popular)} openTo="popular" category={"cars"} />
      <Banner image="16" />
      <TestimonialSlider />
    </>
  )
}

export default Sell
