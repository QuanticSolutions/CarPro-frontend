import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Grid,
  IconButton,
  Alert,
  Snackbar
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from "react-i18next";
import i18n from '../../i18n';

const ImageUploadForm = ({ onNext, onBack, file, handleFileChange, previews, setPreviews, images, setImages, submit, save }) => {
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const MIN_IMAGES = 5;
  const MAX_IMAGES = 10;

  const handleFileChangeWithValidation = (event) => {
    const files = Array.from(event.target.files);
    const currentImageCount = images.length;
    const newImageCount = currentImageCount + files.length;

    // Check if adding new files would exceed maximum limit
    if (newImageCount > MAX_IMAGES) {
      const allowedFiles = MAX_IMAGES - currentImageCount;
      setErrorMessage(
        allowedFiles > 0 
          ? `You can only upload ${allowedFiles} more image(s). Maximum ${MAX_IMAGES} images allowed.`
          : `Maximum ${MAX_IMAGES} images allowed. Please remove some images first.`
      );
      setShowError(true);
      
      // If some files can still be added, take only the allowed number
      if (allowedFiles > 0) {
        const limitedFiles = files.slice(0, allowedFiles);
        const limitedEvent = {
          ...event,
          target: {
            ...event.target,
            files: limitedFiles
          }
        };
        handleFileChange(limitedEvent);
      }
      return;
    }

    // Call the original handleFileChange function
    handleFileChange(event);
    
    if (files.length > 0) {
      setShowSuccess(true);
    }
  };

  const handleRemoveImage = (index) => {
    setPreviews(previews.filter((_, i) => i !== index));
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSaveWithValidation = () => {
    if (images.length < MIN_IMAGES) {
      setErrorMessage(`Please upload at least ${MIN_IMAGES} images before saving.`);
      setShowError(true);
      return;
    }
    save();
  };

  const handleSubmitWithValidation = () => {
    if (images.length < MIN_IMAGES) {
      setErrorMessage(`Please upload at least ${MIN_IMAGES} images before submitting.`);
      setShowError(true);
      return;
    }
    submit();
  };

  const handleCloseError = () => {
    setShowError(false);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  const getImageCountText = () => {
    const count = images.length;
    if (count < MIN_IMAGES) {
      return `${count}/${MIN_IMAGES} minimum images uploaded (${MIN_IMAGES - count} more required)`;
    }
    return `${count}/${MAX_IMAGES} images uploaded`;
  };

  const getImageCountColor = () => {
    const count = images.length;
    if (count < MIN_IMAGES) return 'error';
    if (count >= MAX_IMAGES) return 'warning';
    return 'success';
  };

  return (
    <Box>
      <Paper
        elevation={0}
        sx={{
          p: 5,
          mb: 4,
          mt: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: '1px dashed #ccc',
          borderRadius: 2,
        }}
      >
        <CloudUploadIcon fontSize="large" sx={{ color: '#757575', mb: 2 }} />

        <Typography variant="body1" align="center" sx={{ mb: 1 }}>
          {t("imageUploadForm.uploadPrompt")}
        </Typography>

        <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 2 }}>
          {t("imageUploadForm.uploadHint")}
        </Typography>

        <Typography 
          variant="body2" 
          align="center" 
          color={`${getImageCountColor()}.main`}
          sx={{ mb: 3, fontWeight: 'medium' }}
        >
          {getImageCountText()}
        </Typography>

        <Button
          variant="outlined"
          component="label"
          disabled={images.length >= MAX_IMAGES}
          sx={{ textTransform: 'none' }}
        >
          {images.length >= MAX_IMAGES ? 'Maximum Images Reached' : t("imageUploadForm.browseButton")}
          <input
            hidden
            accept="image/jpeg,image/png,application/pdf"
            type="file"
            name="images"
            multiple
            onChange={handleFileChangeWithValidation}
          />
        </Button>
      </Paper>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {previews.map((preview, index) => (
          <Grid item xs={4} key={index} sx={{ position: 'relative' }}>
            <img
              src={preview}
              alt={`Uploaded preview ${index + 1}`}
              style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
            />
            <IconButton
              onClick={() => handleRemoveImage(index)}
              sx={{
                position: 'absolute',
                top: 5,
                right: 5,
                backgroundColor: 'rgb(224, 219, 219)',
                borderRadius: '50%',
              }}
            >
              <CloseIcon sx={{ color: 'black' }} />
            </IconButton>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button
          onClick={onBack}
          startIcon={i18n.language == "ar" ? <ArrowForwardIcon /> : <ArrowBackIcon />}
          sx={{
            textTransform: "none"
          }}
        >
          {t("imageUploadForm.save")}
        </Button>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleSaveWithValidation}
            disabled={images.length < MIN_IMAGES}
            sx={{ textTransform: "none" }}
          >
            {t("imageUploadForm.save")}
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleSubmitWithValidation}
            disabled={images.length < MIN_IMAGES}
            sx={{ textTransform: "none" }}
          >
            {t("imageUploadForm.submit")}
          </Button>
        </Box>
      </Box>

      {/* Error Snackbar */}
      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseError} 
          severity="error" 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>

 
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSuccess} 
          severity="success" 
          variant="filled"
          sx={{ width: '100%' }}
        >
          Images uploaded successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ImageUploadForm;