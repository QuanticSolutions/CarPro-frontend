import { useState, useEffect } from 'react'
import Nav from '../components/menu/Nav';
import Main from '../components/menu_image/main_image/Main';
import Categories from '../components/categories/Categories';
import Services from '../components/services/Services';
import Banner from '../components/banner.jsx/Banner';
import CardSlider from '../components/card/CardSlider';
import Brands from '../components/brands/Brands';
import Video from '../components/video/Video';
import News from '../components/news/News';
import Footer from '../components/footer/Footer';
import FilterForm from '../components/menu/FilterForm';
import { getAllAds } from '../api/consumer';
import { useTranslation } from 'react-i18next'


function Home({ data }) {

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
    "sa": "Saudi Arab",
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

  const headertext = t("home.header", { country: t(`countries.${countries[localStorage.getItem("selectedCountry")]}`)});
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
      <Main image={i18n.language == "ar" ? "red-bg3_ar" : "red-bg3"} showForm={true} showText={true} form={<FilterForm />} headerText={headertext} headerTextStyles={headerTextStyles} text={text} textStyles={textStyles} flexDirection={i18n.language == "ar" ? "row-reverse" : "row"} />
      <Categories title={t("menu.allCategories")} contents={categories} />
      <Services title={t("menu.services")} cards={cards} background="linear-gradient(#B71C1C, black)" />
      <Banner image="1" link="/featured/Cars" />
      <CardSlider data={data.filter(obj => obj.category == "cars" && obj.status == "live")} title={t("home.featuredCars")} category={"cars"} />
      <CardSlider data={data.filter(obj => obj.category == "cars" && obj.status == "live")} title={t("home.rentCars")} openTo='cars' category={"rent"} />
      <CardSlider data={data.filter(obj => obj.category == "heavy" && obj.status == "live")} title={t("home.featuredHeavyCars")} category={"heavy"} />
      <CardSlider data={data.filter(obj => obj.category == "heavy" && obj.status == "live")} title={t("home.rentHeavy")} openTo='heavy' category={"rent"} />
      <Banner image="2" link="/featured/Bikes" />
      <CardSlider data={data.filter(obj => obj.category == "bikes" && obj.status == "live")} title={t("home.featuredBikes")} category={"bikes"} />
      <CardSlider data={data.filter(obj => obj.category == "bikes" && obj.status == "live")} title={t("home.rentBikes")} openTo='bikes' category={"rent"} />
      <CardSlider data={data.filter(obj => obj.category == "plates" && obj.status == "live")} title={t("home.featuredPlates")} category={"plates"} />
      <CardSlider data={data.filter(obj => obj.category == "plates" && obj.status == "live")} title={t("home.rentPlates")} openTo='plates' category={"rent"} />
      <Banner image="3" link="/featured/Boats" />
      <CardSlider data={data.filter(obj => obj.category == "construction" && obj.status == "live")} title={t("home.featuredConstruction")} category={"construction"} />
      <CardSlider data={data.filter(obj => obj.category == "construction" && obj.status == "live")} title={t("home.rentConstruction")} openTo='construction' category={"rent"} />
      <CardSlider data={data.filter(obj => obj.category == "boats" && obj.status == "live")} title={t("home.featuredBoats")} category={"boats"} />
      <CardSlider data={data.filter(obj => obj.category == "boats" && obj.status == "live")} title={t("home.rentBoats")} openTo='boats' category={"rent"} />
      <Brands />
      <Video />
      <News />
    </>
  )
}

export default Home
