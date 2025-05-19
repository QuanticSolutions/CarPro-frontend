import { useState, useEffect } from 'react'
import Nav from '../../components/menu/Nav';
import { Box, Grid, Typography, Card, CardContent, Container, Paper, Button } from "@mui/material";
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

function Rent() {

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

  const categories = [

    {
      name: "Rent Cars",
      link: "/cars/rent",
      image: "SellCars"
    },
    {
      name: "Rent Heavy Cars",
      link: "/heavy/rent",
      image: "SellHeavyCars"
    },
    {
      name: "Rent Bikes",
      link: "/bikes/rent",
      image: "SellBikes"
    },
    {
      name: "Rent Number Plates",
      link: "/plates/rent",
      image: "SellPlates"
    },
    {
      name: "Rent Construction",
      link: "/construction/rent",
      image: "SellConstruction"
    },
    {
      name: "Rent Boats",
      link: "/boats/rent",
      image: "SellBoats"
    },
  ]

  return (
    <div style={{ marginTop: "2.1rem" }}>
      <Main showForm={false}
        showText={false}
        image={i18n.language == "en" ? "rent" : "rent_ar"}
      />
      <Categories title={t("rentPage.vehicleCategories")} contents={categories} />
      <Banner image="18" />
      <Container>
        <Box sx={{ mt: "4rem" }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold',  textAlign: i18n.language == "ar" ? "right" : "left" }}>
            {t("rentPage.vehicleCategories")}
          </Typography>
        </Box>
      </Container>
      <img src={i18n.language == "en" ? "/assets/images/banner (17).png" : "/assets/images/banner_ar (17).png"} width="100%" style={{ objectFit: "cover", }} />
      <CardSlider title={t("popularCars")} data={data.filter(obj => obj.category == "cars" && obj.popular)} openTo="popular" category={"cars"} />
      <Box minWidth="100%" backgroundColor="#fff" marginTop="4rem">
        <Container sx={{ py: 4 }}>
          <Paper elevation={0} className="mb-8">
            <Box display="flex" justifyContent="center" gap={2} sx={{ "@media (max-width: 768px)": { flexDirection: "column", alignItems: "center" } }}>
              <Box width="50%" sx={{ "@media (max-width: 768px)": { width: "100%" } }}>
                <Typography variant="h4" component="h1" fontWeight="bold" py={2}>
                  {t("rentPage.unleashYourJourney")}
                </Typography>
                <Typography variant="body1" py={1}>
                  {t("rentPage.immersiveExperience")}
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  className="rounded-md px-4 py-2"
                >
                  {t("rentPage.explorePossibilities")}
                </Button>
              </Box>
              <Box width="50%" sx={{ "@media (max-width: 768px)": { width: "100%" } }}>
                <Box
                  className="absolute top-0 right-0 w-full h-full bg-red-600 rounded-bl-3xl"
                  sx={{ zIndex: 0 }}
                />
                <Box className="relative" sx={{ zIndex: 1 }}>
                  <img
                    src="/assets/images/rent1.png"
                    alt="Audi Sport Car"
                    width="100%"
                  />
                </Box>
              </Box>
            </Box>
          </Paper>
          <Paper elevation={0} className="mb-8">
            <Box display="flex" justifyContent="center" gap={2} sx={{ "@media (max-width: 768px)": { flexDirection: "column", alignItems: "center" } }}>
              <Box width="50%" sx={{ "@media (max-width: 768px)": { width: "100%" } }} >
                <img
                  src="/assets/images/rent2.png"
                  alt="Mercedes Luxury Sedan"
                  width="100%"
                />
              </Box>
              <Box width="50%" textAlign={"right"} sx={{ "@media (max-width:768px)": { textAlign: "left", width: "100%" } }}>
                <Typography variant="h4" component="h2" fontWeight="bold" py={2}>
                {t("rentPage.beyondRentals")}
                </Typography>
                <Typography variant="body1" py={1}>
                {t("rentPage.luxuryJourney")}
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  className="rounded-md px-4 py-2"
                >
                  {t("rentPage.bookButton")}
                </Button>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
      <TestimonialSlider />
    </div>
  )
}

export default Rent
