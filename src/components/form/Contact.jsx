import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTranslation } from "react-i18next";

const ContactForm = ({ onNext, onBack, data, handleChange }) => {

  const { t, i18n } = useTranslation();
  const handlePhoneChange = (e) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, '');

    const syntheticEvent = {
      target: {
        name: e.target.name,
        value: numericValue
      }
    };

    handleChange(syntheticEvent);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {t("contactForm.title")}
      </Typography>
      <Typography variant="body1" gutterBottom color="text.secondary">
        {t("contactForm.subtitle")}
      </Typography>
      <Divider sx={{ mt: 2, mb: 4 }} />

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {t("contactForm.fullName")}
            </Typography>
            <TextField
              required
              id="name"
              name="name"
              placeholder={t("contactForm.location")}
              fullWidth
              value={data.name || ''}
              onChange={handleChange}
            />
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {t("contactForm.phoneNumber")}
            </Typography>
            <TextField
              required
              id="phoneNumber"
              name="phone"
              placeholder={t("contactForm.phoneNumber")}
              fullWidth
              value={data.phone || ''}
              onChange={handlePhoneChange}
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            />
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {t("contactForm.gmail")}
            </Typography>
            <TextField
              required
              id="gmail"
              name="gmail"
              placeholder={t("contactForm.location")}
              fullWidth
              value={data.gmail || ''}
              onChange={handleChange}
            />
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {t("contactForm.location")}
            </Typography>
            <TextField
              required
              id="location"
              name="location"
              placeholder={t("contactForm.location")}
              fullWidth
              value={data.location || ''}
              onChange={handleChange}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {t("contactForm.titleLabel")}
            </Typography>
            <TextField
              id="title"
              name="title"
              fullWidth
              value={data.title || ''}
              onChange={handleChange}
            />
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {t("contactForm.description")}
            </Typography>
            <TextField
              id="description"
              name="description"
              multiline
              rows={11}
              fullWidth
              value={data.description || ''}
              onChange={handleChange}
            />
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button
          onClick={onBack}
          startIcon={i18n.language == "ar" ? <ArrowForwardIcon /> : <ArrowBackIcon />}
          sx={{
            textTransform: "none"
          }}
        >
          {t("contactForm.previous")}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onNext}
          endIcon={i18n.language == "ar" ? <ArrowBackIcon /> : <ArrowForwardIcon />}
          sx={{
            textTransform: "none"
          }}
        >
          {t("contactForm.next")}
        </Button>
      </Box>
    </Box>
  );
};

export default ContactForm;