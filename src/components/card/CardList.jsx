import { useState, useEffect } from "react";
import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Chip,
  Grid,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from "@mui/icons-material/Event";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SpeedIcon from "@mui/icons-material/Speed";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Timelapse } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const getDaysDifference = (date1, date2) => {
  const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
};


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

import { getFavsByAd, getImages, API_BASE_URL } from "../../api/consumer";

const CarListingCard = ({ data = {}, type = "sell", handleFavBtn }) => {
  const [isFav, setIsFav] = useState(false);
  const [images, setImages] = useState([]);
  const { t, i18n } = useTranslation();
 
  useEffect(() => {
    getImages(data.car_plate_number)
      .then((res) => {
        setImages(res || []);
      })
      .catch((err) => {
        console.error("Error fetching images:", err);
        setImages([]);
      });
  }, [data.car_plate_number]);

  useEffect(() => {
    getFavsByAd(data.id)
      .then((favs) => {
        const userId = localStorage.getItem("user_id");
        const isFavorite = favs.some((fav) => fav.user_id == userId);
        setIsFav(isFavorite);
      })
      .catch((err) => console.error("Error fetching favs:", err));
  }, [data.id]);

  return (
    <Card
      sx={{
        display: "flex",
        borderRadius: 2,
        overflow: "hidden",
        position: "relative",
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        direction: i18n.language == "ar" && "rtl",
        textAlign: i18n.language == "ar" && "right",
        maxWidth: "100%",
        height: "15rem",
        "@media(max-width:768px)": { flexDirection: 'column', height: "auto" }
      }}
    >
      <Box sx={{ position: "relative", width: { xs: "90%", sm: "40%" }, p: 2, mt: 0.5 }}>
        <CardMedia
          component="img"
          image={images.length > 0 && images[0].imageUrl
            ? `${API_BASE_URL}${images[images.length - 1].imageUrl}`
            : "/assets/images/default-car.png"}
          alt={`${data.make} ${data.model}`}
          onClick={() => (window.location = `/ad/${type}?id=${data.id}`)}
          sx={{
            height: 200,
            objectFit: "cover",
            cursor: "pointer",
            borderRadius: 2
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 20,
            right:  i18n.language != "ar" && 25,
            left:  i18n.language == "ar" && 25,
            display: "flex",
            gap: 1,
            mt: 1
          }}
        >
          <IconButton
            sx={{
              backgroundColor: "#fff",
              width: 36,
              height: 36,
            }}
          >
            <ShareIcon fontSize="small" />
          </IconButton>
          <IconButton
            sx={{
              backgroundColor: isFav ? "#B71C1C" : "white",
              "&:hover": {
                backgroundColor: isFav ? "#B71C1C" : "white",
              },
            }}
            onClick={() => {
              if (handleFavBtn(isFav, data)) setIsFav(!isFav);
            }}
          >
            <FavoriteBorderIcon
              fontSize="small"
              sx={{
                color: isFav ? "white" : "#B71C1C",
                '&:hover': {
                  color: isFav ? "white" : "#B71C1C",
                }
              }}
            />
          </IconButton>
        </Box>
      </Box>
      <CardContent
        sx={{
          flex: 1,
          "&:last-child": { pb: 2 },
        }}
        onClick={() => (window.location = `/ad/${type}?id=${data.id}`)}
      >
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          AED {data.price}
        </Typography>
        <Typography variant="h6" fontWeight="bolder" sx={{ mb: 1 }}>
          {data.title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 1.5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <EventIcon sx={{ fontSize: 18, mr: 0.5, color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary">
              {data.year}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <PeopleAltIcon sx={{ fontSize: 18, mr: 0.5, color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary">
              {data.seats}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <SpeedIcon sx={{ fontSize: 18, mr: 0.5, color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary">
              {data.kilometers}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <EventIcon sx={{ fontSize: 18, mr: 0.5, color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary">
              {data.doors}
            </Typography>
          </Box>
        </Box>
        {
          type == "rent" &&
          <Box sx={{ display: "flex", gap: 3, mb: 1 }}>
            {data.additionalInfo.map((info, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <CheckCircleOutlineIcon
                  color="success"
                  sx={{ fontSize: 16, mr: 0.5 }}
                />
                <Typography variant="body2" color="text.secondary">
                  {info}
                </Typography>
              </Box>
            ))}
          </Box>
        }
        <Box sx={{ display: "flex", alignItems: "center", mt: 1, gap: 2 }}>
          <LocationOnIcon sx={{ fontSize: 16, color: "text.secondary" }} />
          <Typography variant="body2" color="text.secondary">
            {data.location}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mt: 1, gap: 2 }}>
          <Timelapse sx={{ fontSize: 16, color: "text.secondary" }} />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: "block" }}
          >
            {getDaysDifference(new Date(data.date), new Date())}{" "}
            Day Ago
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {data.vehicle_condition && (
            <Chip
              label={data.vehicle_condition}
              sx={{
                backgroundColor: getConditionColor(data.vehicle_condition),
                color: 'white',
                fontWeight: 'bold',
                fontSize: '0.75rem',
                height: '24px',
                mt: 1
              }}
            />
          )}
        </Box>
      </CardContent>
      {data.isFeatured && (
        <Chip
          label="Featured"
          size="small"
          sx={{
            position: "absolute",
            top: 10,
            right: { xs: 10, sm: "auto" },
            left: { xs: "auto", sm: 10 },
            backgroundColor: "#d32f2f",
            color: "white",
            fontWeight: "bold",
            fontSize: "0.7rem",
          }}
        />
      )}
    </Card>
  );
};

export default CarListingCard;