import Main from '../components/menu_image/main_image/Main';
import Categories from '../components/categories/Categories';
import Services from '../components/services/Services';
import Banner from '../components/banner.jsx/Banner';
import CardSlider from '../components/card/CardSlider';
import Brands from '../components/brands/Brands';
import Video from '../components/video/Video';
import FilterForm from '../components/menu/FilterForm';
import { useTranslation } from 'react-i18next'


function Home({ data, rent }) {

  const { t, i18n } = useTranslation();
  const cards = [
    {
      title: t("menu.sellACar"),
      content: t("card.sellContent"),
      img: "3",
      link: "/services/sell"
    },
    {
      title: t("menu.rentACar"),
      content: t("card.rentContent"),
      img: "5",
      link: "/services/rent"
    },
    {
      title: t("menu.carInsurance"),
      content: t("card.insuranceContent"),
      img: "1",
      link: "/services/insurance"
    },
    {
      title: t("menu.carInspection"),
      content: t("card.inspectionContent"),
      img: "2",
      link: "/services/inspection"
    },
  ]
  const countryCode = localStorage.getItem("selectedCountry");
  const countries = {
    "": "UAE",
    "sa": "Saudi Arabia",
    "qtr": "Qatar",
    "syr": "Syria",
    "eg": "Egypt",
    "us": "USA"
  };

  const categories = [

    {
      name: t("categories.cars"),
      link: "/popular/cars",
      image: "Cars"
    },
    {
      name: t("categories.heavy"),
      link: "/popular/heavy",
      image: "HeavyCars"
    },
    {
      name: t("categories.bikes"),
      link: "/popular/bikes",
      image: "Bikes"
    },
    {
      name: t("categories.plates"),
      link: "/popular/plates",
      image: "Plates"
    },
    {
      name: t("categories.construction"),
      link: "/popular/construction",
      image: "Construction"
    },
    {
      name: t("categories.boats"),
      link: "/popular/boats",
      image: "Boats"
    },
  ]

  const headertext = t("home.header", { country: t(`countries.${countries[localStorage.getItem("selectedCountry")]}`) });
  const headerTextStyles = {
    textAlign: i18n.language == "ar" ? "right" : "left",
    marginTop: "8rem",
    pl: i18n.language != "ar" && 1.5,
    pr: i18n.language == "ar" && 1.5,
    fontSize: "90px"
  }
  const text = t("home.subheader");
  const textStyles = {
    textAlign: i18n.language == "ar" ? "right" : "left",
    fontSize: "20px",
    pl: i18n.language != "ar" && 1.5,
    pr: i18n.language == "ar" && 1.5,
  }

  return (
    <>
      <Main image={"red-bg4"} showForm={true} showText={false} form={<FilterForm />} headerText={headertext} headerTextStyles={headerTextStyles} text={text} textStyles={textStyles} flexDirection={i18n.language == "ar" ? "row-reverse" : "row"} overlay={false} />
      <Categories title={t("menu.allCategories")} contents={categories} />
      <Services title={t("home.services")} cards={cards} background="linear-gradient(#B71C1C, black)" />
      <Brands />
      <Banner image="1" link="/featured/Cars" />
      <CardSlider data={data.filter(obj => obj.category == "cars")} title={t("home.featuredCars")} category={"cars"} />
      <CardSlider data={rent.filter(obj => obj.category == "cars")} title={t("home.rentCars")} openTo='cars' category={"rent"} />
      <CardSlider data={data.filter(obj => obj.category == "heavy")} title={t("home.featuredHeavyCars")} category={"heavy"} />
      <CardSlider data={rent.filter(obj => obj.category == "heavy")} title={t("home.rentHeavy")} openTo='heavy' category={"rent"} />
      <Banner image="2" link="/featured/Bikes" />
      <CardSlider data={data.filter(obj => obj.category == "bikes")} title={t("home.featuredBikes")} category={"bikes"} />
      <CardSlider data={rent.filter(obj => obj.category == "bikes")} title={t("home.rentBikes")} openTo='bikes' category={"rent"} />
      <CardSlider data={data.filter(obj => obj.category == "plates")} title={t("home.featuredPlates")} category={"plates"} />
      <CardSlider data={rent.filter(obj => obj.category == "plates")} title={t("home.rentPlates")} openTo='plates' category={"rent"} />
      <Banner image="3" link="/featured/Boats" />
      <CardSlider data={data.filter(obj => obj.category == "construction")} title={t("home.featuredConstruction")} category={"construction"} />
      <CardSlider data={rent.filter(obj => obj.category == "construction")} title={t("home.rentConstruction")} openTo='construction' category={"rent"} />
      <CardSlider data={data.filter(obj => obj.category == "boats")} title={t("home.featuredBoats")} category={"boats"} />
      <CardSlider data={rent.filter(obj => obj.category == "boats")} title={t("home.rentBoats")} openTo='boats' category={"rent"} />
      <Video />
    </>
  )
}

export default Home
