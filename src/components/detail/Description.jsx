import { Box, Typography, Divider, List, ListItem, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, InputLabel, Select, MenuItem, Alert, CircularProgress } from "@mui/material";
import ReportIcon from "@mui/icons-material/Report";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import emailjs from '@emailjs/browser';
import { updateAd } from "../../api/consumer";

const BoxStyles = {
    paddingTop: "2rem",
    margin: "auto",
}

const Description = ({ ad }) => {
    const { t, i18n } = useTranslation();
    const [reportDialogOpen, setReportDialogOpen] = useState(false);
    const [reportForm, setReportForm] = useState({
        reason: '',
        description: '',
        reporterEmail: '',
        reporterName: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

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

    const convertDateToArabic = (inputDate) => {
        if (!(inputDate instanceof Date) || isNaN(inputDate)) {
            inputDate = new Date(inputDate);
            if (isNaN(inputDate)) {
                throw new Error('Invalid Date');
            }
        }

        const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

        const months = [
            'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
            'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
        ];

        const day = inputDate.getDate();
        const month = inputDate.getMonth();
        const year = inputDate.getFullYear();

        const arabicDay = day.toString().split('').map(digit => arabicDigits[parseInt(digit)]).join('');
        const arabicMonth = months[month];
        const arabicYear = year.toString().split('').map(digit => arabicDigits[parseInt(digit)]).join('');

        return `${arabicDay} ${arabicMonth} ${arabicYear}`;
    };

    const handleReportClick = () => {
        setReportDialogOpen(true);
        setSubmitStatus({ type: '', message: '' });
    };

    const handleReportClose = () => {
        setReportDialogOpen(false);
        setReportForm({
            reason: '',
            description: '',
            reporterEmail: '',
            reporterName: ''
        });
        setSubmitStatus({ type: '', message: '' });
    };

    const handleReportFormChange = (field, value) => {
        setReportForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleReportSubmit = async () => {
        if (!reportForm.reason || !reportForm.description || !reportForm.reporterEmail || !reportForm.reporterName) {
            setSubmitStatus({ type: 'error', message: t('fillAllFields') || 'Please fill all required fields' });
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus({ type: '', message: '' });

        try {

            const templateParams = {
                from_name: reportForm.reporterName,
                from_email: reportForm.reporterEmail,
                to_name: 'Admin',
                report_reason: reportForm.reason,
                report_description: reportForm.description,
                ad_id: ad.id || 'N/A',
                ad_title: ad.title || 'N/A',
                ad_location: ad.location || 'N/A',
                reported_date: new Date().toLocaleDateString(),
                reply_to: reportForm.reporterEmail
            };

            await emailjs.send(
                'service_41f0v98',
                'template_qb63tsl',
                templateParams,
                'DMNvhItaC2rXMKIU4'
            )

            setSubmitStatus({
                type: 'success',
                message: t('reportSubmittedSuccessfully') || 'Report submitted successfully. Thank you for your feedback.'
            });

            updateAd(ad.id, {...ad, reproted: 1});

            setTimeout(() => {
                handleReportClose();
            }, 2000);

        } catch (error) {
            console.error('Error sending report:', error);
            setSubmitStatus({
                type: 'error',
                message: t('reportSubmissionFailed') || 'Failed to submit report. Please try again later.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const reportReasons = [
        { value: 'inappropriate_content', label: t('inappropriateContent') || 'Inappropriate Content' },
        { value: 'spam', label: t('spam') || 'Spam' },
        { value: 'fraud', label: t('fraud') || 'Fraud/Scam' },
        { value: 'duplicate', label: t('duplicate') || 'Duplicate Listing' },
        { value: 'incorrect_info', label: t('incorrectInfo') || 'Incorrect Information' },
        { value: 'other', label: t('other') || 'Other' }
    ];

    return (
        <Box sx={{ ...BoxStyles, direction: i18n.language == "ar" && "rtl" }}>
            <Box sx={{ mb: 2 }}>
                <Typography variant="h6" fontWeight="bold">{t("carOverview")}</Typography>
                <Divider sx={{ mb: 1 }} />
                <Box>
                    {
                        window.innerWidth > 800 ?
                            <Box display={"flex"} gap={10}>
                                <List disablePadding>
                                    <ListItem sx={{ paddingLeft: "0" }}><Typography><strong>{t("bodyType")}:</strong></Typography></ListItem>
                                    <ListItem sx={{ paddingLeft: "0" }}><Typography><strong>{t("doors")}:</strong></Typography></ListItem>
                                    <ListItem sx={{ paddingLeft: "0" }}><Typography><strong>{t("horsepower")}:</strong></Typography></ListItem>
                                    <ListItem sx={{ paddingLeft: "0" }}><Typography><strong>{t("transmissionType")}:</strong></Typography></ListItem>
                                    <ListItem sx={{ paddingLeft: "0" }}><Typography><strong>{t("warranty")}:</strong></Typography></ListItem>
                                </List>
                                <List disablePadding>
                                    <ListItem><Typography>{t(`cardValues.${toPascalCase(ad.body)}`)}</Typography></ListItem>
                                    <ListItem><Typography>{t(`cardValues.${ad.doors}`)} {t("door")}</Typography></ListItem>
                                    <ListItem><Typography>{i18n.language == "ar" ? convertToArabicNumbers(ad.horse_power) : ad.horse_power}</Typography></ListItem>
                                    <ListItem><Typography>{t(`cardValues.${toPascalCase(ad.transmission)}`)}</Typography></ListItem>
                                    <ListItem><Typography>{t(`cardValues.${toPascalCase(ad.warranty)}`)}</Typography></ListItem>
                                </List>

                                <Box display={"flex"} gap={10} borderLeft={"1px solid black"} sx={{ "@media(max-width:800px)": { borderLeft: 0 } }}>
                                    <List disablePadding>
                                        <ListItem sx={{ "@media(max-width:800px)": { pl: 0 } }}><Typography><strong>{t("exteriorColor")}:</strong></Typography></ListItem>
                                        <ListItem sx={{ "@media(max-width:800px)": { pl: 0 } }}><Typography><strong>{t("seatingCapacity")}:</strong></Typography></ListItem>
                                        <ListItem sx={{ "@media(max-width:800px)": { pl: 0 } }}><Typography><strong>{t("engineCapacity")}:</strong></Typography></ListItem>
                                        <ListItem sx={{ "@media(max-width:800px)": { pl: 0 } }}><Typography><strong>{t("cylinders")}:</strong></Typography></ListItem>
                                        <ListItem sx={{ "@media(max-width:800px)": { pl: 0 } }}><Typography><strong>{t("sellerType")}:</strong></Typography></ListItem>
                                    </List>
                                    <List disablePadding>
                                        <ListItem><Typography>{t(`cardValues.${toPascalCase(ad.exterior_color)}`)}</Typography></ListItem>
                                        <ListItem><Typography>{t(`cardValues.${ad.seats}`)}</Typography></ListItem>
                                        <ListItem><Typography>{i18n.language == "ar" ? convertToArabicNumbers(ad.engine_capacity) : ad.engine_capacity}</Typography></ListItem>
                                        <ListItem><Typography>{t(`cardValues.${ad.number_of_cylinders}`)}</Typography></ListItem>
                                        <ListItem><Typography>{t(`cardValues.${ad.seller_type}`)}</Typography></ListItem>
                                    </List>
                                </Box>
                            </Box>
                            :
                            <Box display={"flex"}>
                                <Box>
                                    <List disablePadding>
                                        <ListItem sx={{ paddingLeft: "0" }}><Typography><strong>{t("bodyType")}:</strong></Typography></ListItem>
                                        <ListItem sx={{ paddingLeft: "0" }}><Typography><strong>{t("doors")}:</strong></Typography></ListItem>
                                        <ListItem sx={{ paddingLeft: "0" }}><Typography><strong>{t("horsepower")}:</strong></Typography></ListItem>
                                        <ListItem sx={{ paddingLeft: "0" }}><Typography><strong>{t("transmissionType")}:</strong></Typography></ListItem>
                                        <ListItem sx={{ paddingLeft: "0" }}><Typography><strong>{t("warranty")}:</strong></Typography></ListItem>
                                        <ListItem sx={{ "@media(max-width:800px)": { pl: 0 } }}><Typography><strong>{t("exteriorColor")}:</strong></Typography></ListItem>
                                        <ListItem sx={{ "@media(max-width:800px)": { pl: 0 } }}><Typography><strong>{t("seatingCapacity")}:</strong></Typography></ListItem>
                                        <ListItem sx={{ "@media(max-width:800px)": { pl: 0 } }}><Typography><strong>{t("engineCapacity")}:</strong></Typography></ListItem>
                                        <ListItem sx={{ "@media(max-width:800px)": { pl: 0 } }}><Typography><strong>{t("cylinders")}:</strong></Typography></ListItem>
                                        <ListItem sx={{ "@media(max-width:800px)": { pl: 0 } }}><Typography><strong>{t("sellerType")}:</strong></Typography></ListItem>
                                    </List>
                                </Box>
                                <Box>
                                    <List disablePadding>
                                        <ListItem><Typography>{ad.body}</Typography></ListItem>
                                        <ListItem><Typography>{ad.doors} {t("door")}</Typography></ListItem>
                                        <ListItem><Typography>{ad.horse_power} HP</Typography></ListItem>
                                        <ListItem><Typography>{ad.transmission} {t("transmission")}</Typography></ListItem>
                                        <ListItem><Typography>{ad.warranty}</Typography></ListItem>
                                        <ListItem><Typography>{ad.exterior_color}</Typography></ListItem>
                                        <ListItem><Typography>{ad.seats} {t("seater")}</Typography></ListItem>
                                        <ListItem><Typography>{ad.engine_capacity} cc</Typography></ListItem>
                                        <ListItem><Typography>{ad.number_of_cylinders}</Typography></ListItem>
                                        <ListItem><Typography>{ad.seller_type}</Typography></ListItem>
                                    </List>
                                </Box>
                            </Box>
                    }
                </Box>
            </Box>

            <Box sx={{ mb: 2 }}>
                <Typography variant="h6" fontWeight="bold">{t("description")}</Typography>
                <Divider sx={{ mb: 1 }} />
                <Typography>{ad.description}</Typography>
                <Typography fontWeight="bold" mt={1}>{t("postedOn")}: {i18n.language == "ar" ? convertDateToArabic(moment(ad.date).format("DD MMMM YYYY")) : moment(ad.date).format("DD MMMM YYYY")}</Typography>
            </Box>

            <Box sx={{ padding: 2, borderRadius: 2 }}>
                <Typography variant="body1" gutterBottom>
                    {ad.location}
                </Typography>
                <Box
                    component="iframe"
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623.326228936158!2d55.343010375929965!3d25.178505831713213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5db80c6c8be7%3A0xaaf706d6ff9cd6df!2s${encodeURIComponent(ad.location)}!5e0!3m2!1sen!2sae!4v1711567305941!5m2!1sen!2sae`}
                    width="100%"
                    height="500px"
                    style={{ border: 0, borderRadius: 5 }}
                    allowFullScreen
                    loading="lazy"
                ></Box>
                <Divider sx={{ my: 2 }} />
                <Box display="flex" alignItems="center" justifyContent="center">
                    <IconButton color="error" onClick={handleReportClick}>
                        <ReportIcon />
                    </IconButton>
                    <Typography variant="body2" color="textSecondary" sx={{ cursor: 'pointer' }} onClick={handleReportClick}>
                        {t("reportAd")}
                    </Typography>
                </Box>
            </Box>

            {/* Report Dialog */}
            <Dialog
                open={reportDialogOpen}
                onClose={handleReportClose}
                maxWidth="sm"
                fullWidth
                sx={{
                    '& .MuiDialog-paper': {
                        direction: i18n.language === "ar" ? "rtl" : "ltr"
                    }
                }}
            >
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6">{t("reportAd") || "Report Advertisement"}</Typography>
                    <IconButton onClick={handleReportClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    {submitStatus.message && (
                        <Alert
                            severity={submitStatus.type}
                            sx={{ mb: 2 }}
                            onClose={() => setSubmitStatus({ type: '', message: '' })}
                        >
                            {submitStatus.message}
                        </Alert>
                    )}

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                        <TextField
                            label={t("yourName") || "Your Name"}
                            value={reportForm.reporterName}
                            onChange={(e) => handleReportFormChange('reporterName', e.target.value)}
                            fullWidth
                            required
                        />

                        <TextField
                            label={t("yourEmail") || "Your Email"}
                            type="email"
                            value={reportForm.reporterEmail}
                            onChange={(e) => handleReportFormChange('reporterEmail', e.target.value)}
                            fullWidth
                            required
                        />

                        <FormControl fullWidth required>
                            <InputLabel>{t("reportReason") || "Reason for Report"}</InputLabel>
                            <Select
                                value={reportForm.reason}
                                onChange={(e) => handleReportFormChange('reason', e.target.value)}
                                label={t("reportReason") || "Reason for Report"}
                            >
                                {reportReasons.map((reason) => (
                                    <MenuItem key={reason.value} value={reason.value}>
                                        {reason.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            label={t("additionalDetails") || "Additional Details"}
                            multiline
                            rows={4}
                            value={reportForm.description}
                            onChange={(e) => handleReportFormChange('description', e.target.value)}
                            fullWidth
                            required
                            placeholder={t("pleaseProvideDetails") || "Please provide more details about why you're reporting this ad..."}
                        />
                    </Box>
                </DialogContent>

                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={handleReportClose} disabled={isSubmitting} sx={{ color: "black" }}>
                        {t("cancel") || "Cancel"}
                    </Button>
                    <Button
                        onClick={handleReportSubmit}
                        variant="contained"
                        color="error"
                        disabled={isSubmitting}
                        startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
                    >
                        {isSubmitting ? (t("submitting") || "Submitting...") : (t("submitReport") || "Submit Report")}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Description;