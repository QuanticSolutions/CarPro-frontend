import { useState, useEffect } from "react";
import { Card, CardMedia, CardContent, Typography, Box, Chip, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { getFavsByAd, getImages, API_BASE_URL } from "../../api/consumer";
import { useTranslation } from "react-i18next";

const getDaysDifference = (date1, date2) => {
  const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
};

const getConditionColor = (condition) => {
  switch (condition?.toLowerCase()) {
    case 'new':
      return '#4CAF50';
    case 'pre':
      return '#2196F3';
    case 'used':
      return '#FF9800';
    default:
      return '#757575';
  }
};

function CarCard({ data, type = "sell", width = 275, handleFavBtn, isGrid = false }) {
  const [isFav, setIsFav] = useState(false);
  const [images, setImages] = useState([]);
  const { t, i18n } = useTranslation();
  function toPascalCase(str) {
    if (!str) return '';
    const words = str.split(' ');
    const pascalWords = words.map(word => {
      if (!word) return '';
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
    return pascalWords.join(' ');
  }

  const convertToArabicNumbers = (number) => {
    const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return number.toString().split('').map(digit => arabicDigits[parseInt(digit)] || digit).join('');
  };

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
      .then(async (favs) => {
        const userId = localStorage.getItem("user_id");
        const isFavorite = favs.some((fav) => fav.user_id == userId);
        setIsFav(isFavorite);
      })
      .catch((err) => console.error("Error fetching favs:", err));
  }, [data.id]);

  return (
    <Card
      sx={{
        width: width,
        borderRadius: 2,
        boxShadow: 4,
        overflow: "hidden",
        textAlign: i18n.language == "ar" ? "right" : "left",
        p: 0,
        direction: i18n.language == "ar" && "rtl",
        "@media(max-width: 800px)": {
          width: "45vw",
        },
        "@media(max-width: 361px)": {
          width: isGrid ? 270 : 162,
        }
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="140"
          image={
            images.length > 0 && images[0].imageUrl
              ? `${API_BASE_URL}${images[images.length - 1].imageUrl}`
              : "/assets/images/default-car.png"
          }
          alt="Car"
          onClick={() => (window.location = `/ad/${type}?id=${data.id}`)}
          sx={{ cursor: "pointer" }}
        />
        {data.featured ?
          <Chip
            label={t("featuredTag")}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              borderRadius: '3px !important',
              backgroundColor: "#B71C1C",
              color: "white",
              fontSize: "0.75rem",
              fontWeight: "bold",
              '& .MuiChip-label': {
                padding: '5px',
              }
            }}
          /> : <></>
        }
        {
          window.innerWidth <= 700 &&
          <Chip
            label={t(data.vehicle_condition)}
            sx={{
              backgroundColor: getConditionColor(data.vehicle_condition),
              color: 'white',
              fontWeight: 'bold',
              fontSize: '0.75rem',
              height: '24px',
              position: "absolute",
              top: 0,
              right: 0,
              borderRadius: '3px !important'
            }}
          />
        }

        <IconButton
          sx={{
            position: "absolute",
            top: 150,
            right: i18n.language != "ar" && 4,
            left: i18n.language == "ar" && 4,
            backgroundColor: isFav ? "#B71C1C" : "white",
            "&:hover": {
              backgroundColor: isFav ? "#B71C1C" : "white",
            },
          }}
          onClick={async () => {
            const success = await handleFavBtn(isFav, data); // Only 2 parameters
            if (success) {
              setIsFav(!isFav);
            }
          }}
        >
          <FavoriteBorderIcon
            sx={{
              color: isFav ? "white" : "#B71C1C",
              "&:hover": {
                color: isFav ? "white" : "#B71C1C",
              },
            }}
          />
        </IconButton>
      </Box>
      <CardContent onClick={() => (window.location = `/ad/${type}?id=${data.id}`)}>
        {
          type != "rent" &&
          <Typography variant="subtitle1" fontWeight="bolder" color="#B71C1C">
            {t("AED")} {i18n.language == "ar" ? convertToArabicNumbers(data.price) : data.price}
          </Typography>
        }
        {
          type == "rent" &&
          <Typography variant="subtitle1" fontWeight="bolder" color="#B71C1C">
            {t("AED")} {i18n.language == "ar" ? convertToArabicNumbers(data.daily_rent) : data.daily_rent}
          </Typography>
        }
        {
          window.innerWidth >= 700 &&
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              display: 'inline-block',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '100%',
              "&:hover": { textDecoration: "underline" }
            }}
            onClick={() => (window.location = `/ad/${type}?id=${data.id}`)}
          >
            {toPascalCase(data.title)}
          </Typography>
        }
        {data.category !== "Plates" && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 1,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "100%"
            }}
          >
            {data.category != "bikes" ? t(`models.${data.model}`) : t(`cardValues.${data.manufacturer}`)} . {i18n.language === "ar" ? convertToArabicNumbers(data.kilometers) : data.kilometers} . {t(`cardValues.${data.transmission}`)}
          </Typography>
        )}

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1, display: "block" }}
        >
          {t(`filters.options.${data.city}`)} | {i18n.language == "ar" ? convertToArabicNumbers(getDaysDifference(new Date(data.date), new Date())) : getDaysDifference(new Date(data.date), new Date())}{" "}
          {t("DaysAgo")}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          {data.vehicle_condition && window.innerWidth >= 1000 && (
            <Chip
              label={t(data.vehicle_condition)}
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
    </Card>
  );
}

export default CarCard;
