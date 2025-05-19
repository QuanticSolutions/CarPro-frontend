import React from "react";
import { useState, useEffect } from "react";
import FilterSection from "./Filter";
import MobileFilterSection from "./MobileFilter";
import DataGrid from "./DataGrid";
import Banner from "../banner.jsx/Banner";
import { Box, Container } from "@mui/material";
import { styled } from "@mui/system"
import { useTranslation } from 'react-i18next';

const FilterBox = styled(Box)({
  paddingTop: "4rem",
  paddingBottom: "4rem",
  display: "flex",
  gap: "18px",
  position: "relative",
  "@media (max-width: 700px)": {
    flexDirection: "column"
  },
});


const FeaturedFilter = ({ data, title, type, loc, vehicleCondition }) => {

  const [filters, setFilters] = useState({
    type: "",
    search: "",
    city: [],
    vehicle_condition: "",
    brand: [],
    fromPrice: "",
    toPrice: "",
    fromYear: "",
    toYear: "",
    fromMiles: "",
    toMiles: "",
    specs: [],
    transmission: [],
    color: [],
    fromCapac: "",
    toCapac: "",
    body: [],
    doors: [],
    sellerType: [],
    seats: [],
    steeringWheel: []
  });
  const [filteredData, setFilteredData] = useState([]);
  const { t, i18n } = useTranslation();
  const filterData = (data, filters) => {
    return data.filter(car => {
      if (filters.search && !car.model.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      if (filters.vehicle_condition && filters.vehicle_condition !== car.vehicle_condition) {
        return false;
      }
      if (filters.city.length > 0 && !filters.city.includes(car.city)) {
        return false;
      }
      if (filters.brand.length > 0 && !filters.brand.includes(car.manufacturer)) {
        return false;
      }
      if (filters.transmission.length > 0 && !filters.transmission.includes(car.transmission)) {
        return false;
      }
      if (filters.color.length > 0 && !filters.color.includes(car.color)) {
        return false;
      }
      if (filters.body.length > 0 && !filters.body.includes(car.body)) {
        return false;
      }
      if (filters.doors.length > 0 && !filters.doors.includes(car.doors.toString())) {
        return false;
      }
      if (filters.sellerType.length > 0 && !filters.sellerType.includes(car.seller_type)) {
        return false;
      }
      if (filters.seats.length > 0 && !filters.seats.includes(car.seats.toString())) {
        return false;
      }
      if (filters.steeringWheel.length > 0 && !filters.steeringWheel.includes(car.steering_wheel)) {
        return false;
      }
      if (filters.fromPrice && car.price < parseFloat(filters.fromPrice)) {
        return false;
      }
      if (filters.toPrice && car.price > parseFloat(filters.toPrice)) {
        return false;
      }
      if (filters.fromYear && car.year < parseInt(filters.fromYear)) {
        return false;
      }
      if (filters.toYear && car.year > parseInt(filters.toYear)) {
        return false;
      }
      if (filters.fromMiles && car.mileage < parseInt(filters.fromMiles)) {
        return false;
      }
      if (filters.toMiles && car.mileage > parseInt(filters.toMiles)) {
        return false;
      }
      if (filters.fromCapac && car.engine_capacity < parseInt(filters.fromCapac)) {
        return false;
      }
      if (filters.toCapac && car.engine_capacity > parseInt(filters.toCapac)) {
        return false;
      }
      if (filters.keyword) {
        const keyword = filters.keyword.toLowerCase();
        const matchesKeyword =
          car.title?.toLowerCase().includes(keyword) || 
          car.price?.toLowerCase().includes(keyword)
          car.model?.toLowerCase().includes(keyword) ||
          car.manufacturer?.toLowerCase().includes(keyword) ||
          car.city?.toLowerCase().includes(keyword) ||
          car.transmission?.toLowerCase().includes(keyword) ||
          car.exterior_color?.toLowerCase().includes(keyword) ||
          car.city?.toLowerCase().includes(keyword) ||
          car.interior_color?.toLowerCase().includes(keyword);
      
        if (!matchesKeyword) return false;
      }
      
      return true;
    });
  };


  useEffect(() => {
    if (loc !== "null") {setFilters({ ...filters, city: [loc] })}
    if(vehicleCondition !== "null") setFilters({...filters, vehicle_condition: vehicleCondition})
    console.log(vehicleCondition)
  }, []);

  useEffect(() => {
    setFilteredData(filterData(data, filters));
  }, [filters, data]);


  const banners = {
    "Featured Cars": "7",
    "Popular Cars": "5",
    "Featured Heavy Cars": "4",
    "Popular Heavy Cars": "6",
    "Featured Bikes": "15",
    "Popular Bikes": "14",
    "Featured Boats": "13",
    "Popular Boats": "12",
    "Featured Plates": "8",
    "Popular Plates": "8",
    "Featured Construction": "11",
    "Popular Construction": "10"
  }

  const englishTitle = t(title, { lng: 'en' });

  return (
    <Box sx={{ marginTop: window.innerWidth >= 1000 && "10rem"}}>
      <Banner image={banners[englishTitle] || "7"} />
      <Container>
        <FilterBox sx={{ flexDirection: i18n.language == "ar" && "row-reverse"}}>
          {
            window.innerWidth < 800 ? 
            <MobileFilterSection filters={filters} setFilters={setFilters} title={title} filterData={() => setFilteredData(filterData(data, filters))} /> :
            <FilterSection filters={filters} setFilters={setFilters} title={title} filterData={() => setFilteredData(filterData(data, filters))} />
          }
          <DataGrid data={filteredData} title={title} type={type}  />
        </FilterBox>
      </Container>
    </Box>
  );
};

export default FeaturedFilter;
