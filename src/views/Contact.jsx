import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Container,
  Paper,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material';
import ReCAPTCHA from 'react-google-recaptcha';
import Nav from '../components/menu/Nav';
import Main from '../components/menu_image/main_image/Main';
import Footer from '../components/footer/Footer';
import CustomSelect from '../utils/Select';
import { Phone } from '@mui/icons-material';
import { useTranslation } from 'react-i18next'

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const { t } = useTranslation();
  const [subject, setSubject] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Special handler for phone input that only allows numbers
  const handlePhoneChange = (e) => {
    const { value } = e.target;
    // Only update if the input contains only numbers
    if (value === '' || /^[0-9]+$/.test(value)) {
      setFormData(prevState => ({
        ...prevState,
        phone: value
      }));
    }
  };

  const handleSubjectChange = (value) => {
    setSubject(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleCaptchaChange = (value) => {
    console.log("Captcha value:", value);
  };


  const subjectOptions = [
    { value: 'general', name: t("contact.subjectOptions.general") },
    { value: 'support', name: t("contact.subjectOptions.support")  },
    { value: 'booking', name: t("contact.subjectOptions.booking")  },
    { value: 'feedback', name: t("contact.subjectOptions.feedback")  }
  ]

  return (
    <Box>
      <Container sx={{ marginTop: window.innerWidth >= 1000 && "10rem", mb: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Box sx={{ pr: { md: 4 } }}>
              <Typography variant="h5" component="h2" fontFamily='"Franklin Gothic Demi", sans-serif' gutterBottom>
                {t("contact.title")}
              </Typography>

              <Typography variant="body1" fontFamily='"Franklin Gothic Demi", sans-serif' paragraph>
              {t("contact.description")}
              </Typography>

              <Typography variant="h6" fontWeight="bold" fontFamily='"Franklin Gothic Demi", sans-serif' sx={{ mt: 4, mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
              {t("contact.telephoneTitle")}
              </Typography>

              <Typography variant="body1" fontFamily='"Franklin Gothic Demi", sans-serif' paragraph>
              {t("contact.telephoneDescription")}
              </Typography>

              <Typography variant="body1" fontFamily='"Franklin Gothic Demi", sans-serif' fontWeight="bold" sx={{ mt: 4, mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
                <Phone /> {t("contact.phoneNumber")}
              </Typography>

              <Typography variant="body2" fontFamily='"Franklin Gothic Demi", sans-serif' paragraph sx={{ mb: 4 }}>
              {t("contact.workingHours")}
              </Typography>

              <Typography variant="h6" fontWeight="bold" fontFamily='"Franklin Gothic Demi", sans-serif' sx={{ mb: 1 }}>
              {t("contact.addressTitle")}
              </Typography>

              <Typography variant="body1" fontFamily='"Franklin Gothic Demi", sans-serif' paragraph>
              {t("contact.addressDescription")}
              </Typography>

              <Typography variant="body1" fontFamily='"Franklin Gothic Demi", sans-serif'>
              {t("contact.addressLine1")}
              </Typography>
              <Typography variant="body1" fontFamily='"Franklin Gothic Demi", sans-serif'>
              {t("contact.addressLine2")}
              </Typography>
              <Typography variant="body1" fontFamily='"Franklin Gothic Demi", sans-serif'>
              {t("contact.addressLine3")}
              </Typography>
              <Typography variant="body1" fontFamily='"Franklin Gothic Demi", sans-serif'>
              {t("contact.addressLine4")}
              </Typography>
            </Box>
          </Grid>

          {/* Right column - Contact form */}
          <Grid item xs={12} md={7}>
            <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="body1" sx={{ mb: 2, color: '#444' }} fontFamily='"Franklin Gothic Demi", sans-serif'>
              {t("contact.formTitle")}
              </Typography>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormLabel htmlFor="name" fontFamily='"Franklin Gothic Demi", sans-serif' required sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}>{t("contact.nameLabel")}</FormLabel>
                    <TextField
                      id="name"
                      name="name"
                      fullWidth
                      size="small"
                      variant="outlined"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t("contact.namePlaceholder")}
                      required
                      margin="dense"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormLabel htmlFor="email" fontFamily='"Franklin Gothic Demi", sans-serif' required sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}>{t("contact.emailLabel")}</FormLabel>
                    <TextField
                      id="email"
                      name="email"
                      type="email"
                      fullWidth
                      size="small"
                      variant="outlined"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t("contact.emailPlaceholder")}
                      required
                      margin="dense"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormLabel htmlFor="phone" fontFamily='"Franklin Gothic Demi", sans-serif'>{t("contact.phoneLabel")}</FormLabel>
                    <TextField
                      id="phone"
                      name="phone"
                      fullWidth
                      size="small"
                      variant="outlined"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      placeholder={t("contact.phonePlaceholder")}
                      margin="dense"
                      inputProps={{
                        inputMode: 'numeric',
                        pattern: '[0-9]*'
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormLabel htmlFor="subject" fontFamily='"Franklin Gothic Demi", sans-serif' required sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}>{t("contact.subjectLabel")}</FormLabel>
                    <FormControl fullWidth margin="dense" required>
                      <CustomSelect
                        placeholder={t('contact.selectPlaceholder')}
                        styles={{
                          textField: {
                            width: "38rem",
                            fontSize: "0.875rem",
                            borderRadius: "4px",
                            backgroundColor: "#fff",
                            color: "#000",
                            "&:focus": {
                              outline: "none",
                              borderColor: "#B71C1C",
                              boxShadow: "0 0 0 2px rgba(183,28,28,0.2)"
                            },
                            appearance: "none",
                            WebkitAppearance: "none",
                            MozAppearance: "none"
                          }
                        }
                        }
                        onChange={(value) => handleSubjectChange(value)}
                        options={subjectOptions}
                        size="small"
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <FormLabel htmlFor="message" fontFamily='"Franklin Gothic Demi", sans-serif' required sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}>{t("contact.messageLabel")}</FormLabel>
                    <TextField
                      id="message"
                      name="message"
                      fullWidth
                      multiline
                      rows={4}
                      variant="outlined"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t("contact.messagePlaceholder")}
                      required
                      margin="dense"
                    />
                  </Grid>

                  <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Box>
                      <ReCAPTCHA
                        sitekey="your-recaptcha-site-key"
                        onChange={handleCaptchaChange}
                        size="normal"
                      />
                    </Box>

                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        width: '120px',
                        borderRadius: '4px',
                        backgroundColor: "#B71C1C"
                      }}
                    >
                      {t("contact.submit")}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}