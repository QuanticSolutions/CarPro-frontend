import { Typography, Container } from "@mui/material";
import TestCard from "./TestCard";
import Slider from "../slider/slider";
import { useTranslation } from 'react-i18next'

const testimonials = [
  {
    text: "Impressive selection of vehicles and top-notch customer service!",
    name: "D. Devine",
    company: "mycompany.co",
    avatar: "/assets/images/Group8.png"
  },
  {
    text: "From the moment I made my reservation to the time I returned the car, everything was smooth and efficient.",
    name: "J. Garcia",
    company: "mycompany.co",
    avatar: "/assets/images/Group8.png"
  },
  {
    text: "As a frequent traveler, I rely on reliable car rental services, and this one never disappoints.",
    name: "B. Garcia",
    company: "mycompany.co",
    avatar: "/assets/images/Group8.png"
  },
  {
    text: "As a frequent traveler, I rely on reliable car rental services, and this one never disappoints.",
    name: "B. Garcia",
    company: "mycompany.co",
    avatar: "/assets/images/Group8.png"
  },
  {
    text: "As a frequent traveler, I rely on reliable car rental services, and this one never disappoints.",
    name: "B. Garcia",
    company: "mycompany.co",
    avatar: "/assets/images/Group8.png"
  },
  {
    text: "As a frequent traveler, I rely on reliable car rental services, and this one never disappoints.",
    name: "B. Garcia",
    company: "mycompany.co",
    avatar: "/assets/images/Group8.png"
  }
];

const BoxStyles = {
  textAlign: "center",
  position: "relative",
  my: '5rem',
  "@media (max-width: 425px)": {
    flexDirection: "column"
  }
}

const TestimonialSlider = () => {

  const { t, i18n } = useTranslation();

  const template = (item) => {
    return (<TestCard item={item} />)
  }

  return (
    <Container sx={BoxStyles}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 5, textAlign: i18n.language == "ar" ? "right" : "left" }}>
        {t("reviews")}
      </Typography>
      <Slider data={testimonials} Template={TestCard} toShow={3} carouselClass="test-carousel-item" />
    </Container>
  );
};

export default TestimonialSlider
