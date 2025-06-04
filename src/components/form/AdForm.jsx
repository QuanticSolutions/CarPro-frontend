import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Stepper,
  Step,
  StepLabel,
  ThemeProvider,
  createTheme,
  Box,
  useMediaQuery,
  Paper
} from '@mui/material';
import BasicInformationForm from './BasicInformationForm';
import ContactForm from './Contact';
import ImageUploadForm from './ImageUpload';
import { createAd, createRent, uploadImages, updateAd, updateRent, getAdById, getImages, API_BASE_URL } from '../../api/consumer';
import MessagePopup from "../popup/Popup";
import { useTranslation } from 'react-i18next';

const theme = createTheme({
  palette: {
    primary: {
      main: '#c62828',
    },
  },
  components: {
    MuiStepIcon: {
      styleOverrides: {
        root: {
          '&.Mui-active': {
            color: '#c62828',
          },
          '&.Mui-completed': {
            color: '#c62828',
          },
        },
      },
    },
  },
});

function AdForm({ title, type, isUpdating = false, category }) {

  const [activeStep, setActiveStep] = useState(0);
  const { t, i18n } = useTranslation();
  const steps = [t('adForm.basicInformation'), t('adForm.contact'), t('adForm.imageUpload')];
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [formData, setFormData] = useState({
    user_id: "",
    city: "",
    plate_number: "",
    vehicle_condition: "",
    interior_color: "",
    model: "",
    warranty: "",
    engine_capacity: "",
    price: "",
    daily: "",
    weekly: "",
    monthly: "",
    steering_wheel: "",
    transmission: "",
    trim: "",
    seller_type: "",
    horsepower: "",
    kilometers: "",
    body: "",
    dealer_name: "",
    year: "",
    regional_specs: "",
    doors: "",
    manufacturer: "",
    number_of_cylinders: "",
    seats: "",
    image: "",
    exterior_color: "",
    name: "",
    phone_number: "",
    gmail: "",
    location: "",
    title: "",
    description: "",
    length: "",
    fuel: "",
    wheels: ""
  });
  const [images, setImages] = useState([]);
  const maxSize = 50 * 1024 * 1024;
  const [imagePreviews, setImagePreviews] = useState([]);
  const [popup, setPopup] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(
    () => {
      if (isUpdating) {
        getAdById(localStorage.getItem("ad_id")).then(
          response => {
            setFormData(response)
            getImages(response.car_plate_number).then(async res => {
              const imageFiles = await Promise.all(
                res.map(async (img) => {
                  const response = await fetch(`${API_BASE_URL}${img.imageUrl}`);
                  const blob = await response.blob();
                  const contentType = blob.type || 'image/jpeg';
                  return new File([blob], img.filename, { type: contentType });
                })
              );

              setImages(imageFiles);
              const previews = res.map(img => `${API_BASE_URL}${img.imageUrl}`);
              setImagePreviews(previews);
            });
          })
      }
    },
    []
  )

  const handleImageUpload = (event) => {
    const files = event.target.files;
    const fileArray = Array.from(files);
    fileArray.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prevPreviews) => [...prevPreviews, reader.result]);
      };
      reader.readAsDataURL(file);
    });
    setImages((prevImages) => [...prevImages, ...fileArray]);
  };

  const handleSubmit = () => {
    const path = window.location.pathname;
    setFormData(
      prevData => {
        const countries = {
          "": "UAE",
          "sa": "Saudi Arab",
          "qtr": "Qatar",
          "syr": "Syria",
          "us": "USA",
          "eg": "Egypt"
        };

        const updatedData = prevData;
        updatedData.user_id = localStorage.getItem("user_id")
        updatedData.status = "Pending"
        updatedData.featured = false;
        updatedData.reported = 0;
        updatedData.category = path.substring(path.lastIndexOf('/') + 1);
        updatedData.country = countries[localStorage.getItem("selectedCountry")];
        return updatedData;
      }
    )
    if (type == "sell") {
      if (isUpdating) {
        updateAd(localStorage.getItem("ad_id"), formData).then(() => setPopup({ open: true, message: "Ad created Successfully", severity: "success" }))
      }
      else {
        createAd(formData).then(() => setPopup({ open: true, message: "Ad updated Successfully", severity: "success" }))
      }
    }
    else {
      if (isUpdating) {
        updateRent(localStorage.getItem("ad_id"), formData).then(() => () => setPopup({ open: true, message: "Ad updated Successfully", severity: "success" }))
      }
      else {
        createRent(formData).then(() => setPopup({ open: true, message: "Ad created Successfully", severity: "success" }))
      }
    }
    if (images) {
      const imageData = new FormData();
      images.forEach((image) => {
        imageData.append('images', image);
      });
      console.log(images)
      console.log(imageData)
      uploadImages(formData.car_plate_number, imageData)
    }
    setTimeout(
      () => {
        window.location.href = "/my/ads";
      },
      2000
    )
  }

  const handleSave = () => {
    setFormData(
      prevData => {
        const updatedData = prevData;
        updatedData.user_id = localStorage.getItem("User_id")
        updatedData.status = "draft"
        updatedData.image = images[0]
        return updatedData;
      }
    )
    if (type == "sell") {
      if (isUpdating) {
        createAd(formData)
      }
      else {
        updateAd(localStorage.getItem("ad_id"), formData)
      }
    }
    else {
      if (isUpdating) {
        createRent(formData).then()
      }
      else {
        updateRent(localStorage.getItem("ad_id"), formData)
      }
    }
    if (images) {
      const imageData = new FormData();
      images.forEach((image) => {
        imageData.append('images', image);
      });
      uploadImages(formData.car_plate_number, imageData)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <BasicInformationForm onNext={handleNext} type={type} data={formData} handleChange={handleChange} category={category} />;
      case 1:
        return <ContactForm onNext={handleNext} onBack={handleBack} data={formData} handleChange={handleChange} />;
      case 2:
        return <ImageUploadForm onNext={handleNext} onBack={handleBack} file={images} handleFileChange={handleImageUpload} previews={imagePreviews} setPreviews={setImagePreviews} images={images} setImages={setImages} submit={handleSubmit} save={handleSave} />;
      default:
        return 'Unknown step';
    }
  };

  const renderMobileStepper = () => {
    return (
      <Box sx={{ width: '100%', mt: 2, mb: 3 }}>
        <Paper
          elevation={0}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'transparent'
          }}
        >
          <Typography
            variant="h6"
            component="div"
            color="primary"
            sx={{
              fontWeight: 'bold',
              mb: 1
            }}
          >
            {steps[activeStep]}
          </Typography>

          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              mt: 1
            }}
          >
            <Box sx={{ width: '80%', display: 'flex', justifyContent: 'space-between' }}>
              {steps.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: `${100 / steps.length - 4}%`,
                    height: 4,
                    backgroundColor: index <= activeStep ? theme.palette.primary.main : theme.palette.grey[300],
                    borderRadius: 2
                  }}
                />
              ))}
            </Box>
          </Box>
        </Paper>
      </Box>
    );
  };

  const renderDesktopStepper = () => {
    return (
      <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5, flexWrap: "wrap", gap: 1 }}>
        {steps.map((label, index) => (
          <Step key={label} sx={{ flexWrap: "wrap" }}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ mt: window.innerWidth > 800 ? 10 : 5, mb: 10, direction: i18n.language == "ar" && "rtl" }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          {t("adForm.formTitle")}
        </Typography>

        {isMobile ? renderMobileStepper() : renderDesktopStepper()}

        {getStepContent(activeStep)}
        <MessagePopup
          open={popup.open}
          handleClose={() => setPopup({ ...popup, open: false })}
          severity={popup.severity}
          message={popup.message}
        />
      </Container>
    </ThemeProvider>
  );
}

export default AdForm;