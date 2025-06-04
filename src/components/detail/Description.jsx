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

    // Helper function to safely get and display field value
    const getFieldValue = (fieldName, defaultValue = 'N/A') => {
        const value = ad[fieldName];
        if (value === null || value === undefined || value === '') return defaultValue;
        return value;
    };

    // Helper function to format price
    const formatPrice = (price) => {
        if (!price) return 'N/A';
        const numPrice = parseFloat(price);
        if (isNaN(numPrice)) return price;
        return i18n.language === "ar" ? convertToArabicNumbers(numPrice.toLocaleString()) : numPrice.toLocaleString();
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
            {/* Basic Vehicle Information */}
            <Box sx={{ mb: 2 }}>
                <Typography variant="h6" fontWeight="bold">{"Basic Information"}</Typography>
                <Divider sx={{ mb: 1 }} />
                <Box>
                    {window.innerWidth > 800 ? (
                        <Box display={"flex"} gap={6}>
                            <Box flex={1}>
                                <List disablePadding>
                                    {getFieldValue('manufacturer') !== 'N/A' && (
                                        <ListItem sx={{ paddingLeft: "0" }}>
                                            <Typography><strong>{t("manufacturer") || "Manufacturer"}:</strong> {getFieldValue('manufacturer')}</Typography>
                                        </ListItem>
                                    )}
                                    {getFieldValue('model') !== 'N/A' && (
                                        <ListItem sx={{ paddingLeft: "0" }}>
                                            <Typography><strong>{t("model") || "Model"}:</strong> {getFieldValue('model')}</Typography>
                                        </ListItem>
                                    )}
                                    {getFieldValue('year') !== 'N/A' && (
                                        <ListItem sx={{ paddingLeft: "0" }}>
                                            <Typography><strong>{t("year") || "Year"}:</strong> {i18n.language === "ar" ? convertToArabicNumbers(getFieldValue('year')) : getFieldValue('year')}</Typography>
                                        </ListItem>
                                    )}
                                    {getFieldValue('trim') !== 'N/A' && (
                                        <ListItem sx={{ paddingLeft: "0" }}>
                                            <Typography><strong>{t("trim") || "Trim"}:</strong> {getFieldValue('trim')}</Typography>
                                        </ListItem>
                                    )}
                                </List>
                            </Box>
                            <Box flex={1}>
                                <List disablePadding>
                                    {(getFieldValue('price') !== 'N/A' || getFieldValue('daily_rent') !== 'N/A' || getFieldValue('weekly_rent') !== 'N/A' || getFieldValue('monthly_rent') !== 'N/A') && (
                                        <ListItem sx={{ paddingLeft: "0" }}>
                                            <Typography><strong>{t("price") || "Price"}:</strong> 
                                                {getFieldValue('price') !== 'N/A' && ` ${formatPrice(getFieldValue('price'))} "AED`}
                                                {getFieldValue('daily_rent') !== 'N/A' && ` ${formatPrice(getFieldValue('daily_rent'))} ${"AED"}/${"day"}`}
                                                {getFieldValue('weekly_rent') !== 'N/A' && ` ${formatPrice(getFieldValue('weekly_rent'))} ${"AED"}/${"week"}`}
                                                {getFieldValue('monthly_rent') !== 'N/A' && ` ${formatPrice(getFieldValue('monthly_rent'))} ${"AED"}/${"month"}`}
                                            </Typography>
                                        </ListItem>
                                    )}
                                    {getFieldValue('kilometers') !== 'N/A' && (
                                        <ListItem sx={{ paddingLeft: "0" }}>
                                            <Typography><strong>{t("kilometers") || "Kilometers"}:</strong> {i18n.language === "ar" ? convertToArabicNumbers(getFieldValue('kilometers')) : getFieldValue('kilometers')} km</Typography>
                                        </ListItem>
                                    )}
                                    {getFieldValue('car_plate_number') !== 'N/A' && (
                                        <ListItem sx={{ paddingLeft: "0" }}>
                                            <Typography><strong>{t("plateNumber") || "Plate Number"}:</strong> {getFieldValue('car_plate_number')}</Typography>
                                        </ListItem>
                                    )}
                                    {getFieldValue('regional_specs') !== 'N/A' && (
                                        <ListItem sx={{ paddingLeft: "0" }}>
                                            <Typography><strong>{t("regionalSpecs") || "Regional Specs"}:</strong> {t(`cardValues.${toPascalCase(getFieldValue('regional_specs'))}`) || getFieldValue('regional_specs')}</Typography>
                                        </ListItem>
                                    )}
                                    {getFieldValue('country') !== 'N/A' && (
                                        <ListItem sx={{ paddingLeft: "0" }}>
                                            <Typography><strong>{t("country") || "Country"}:</strong> {getFieldValue('country')}</Typography>
                                        </ListItem>
                                    )}
                                </List>
                            </Box>
                        </Box>
                    ) : (
                        <List disablePadding>
                            {getFieldValue('manufacturer') !== 'N/A' && (
                                <ListItem sx={{ paddingLeft: "0" }}>
                                    <Typography><strong>{t("manufacturer") || "Manufacturer"}:</strong> {getFieldValue('manufacturer')}</Typography>
                                </ListItem>
                            )}
                            {getFieldValue('model') !== 'N/A' && (
                                <ListItem sx={{ paddingLeft: "0" }}>
                                    <Typography><strong>{t("model") || "Model"}:</strong> {getFieldValue('model')}</Typography>
                                </ListItem>
                            )}
                            {getFieldValue('year') !== 'N/A' && (
                                <ListItem sx={{ paddingLeft: "0" }}>
                                    <Typography><strong>{t("year") || "Year"}:</strong> {i18n.language === "ar" ? convertToArabicNumbers(getFieldValue('year')) : getFieldValue('year')}</Typography>
                                </ListItem>
                            )}
                            {getFieldValue('trim') !== 'N/A' && (
                                <ListItem sx={{ paddingLeft: "0" }}>
                                    <Typography><strong>{t("trim") || "Trim"}:</strong> {getFieldValue('trim')}</Typography>
                                </ListItem>
                            )}
                            {(getFieldValue('price') !== 'N/A' || getFieldValue('daily_rent') !== 'N/A' || getFieldValue('weekly_rent') !== 'N/A' || getFieldValue('monthly_rent') !== 'N/A') && (
                                <ListItem sx={{ paddingLeft: "0" }}>
                                    <Typography><strong>{t("price") || "Price"}:</strong> 
                                        {getFieldValue('price') !== 'N/A' && ` ${formatPrice(getFieldValue('price'))} ${"AED"}`}
                                        {getFieldValue('daily_rent') !== 'N/A' && ` ${formatPrice(getFieldValue('daily_rent'))} ${"AED"}/${"day"}`}
                                        {getFieldValue('weekly_rent') !== 'N/A' && ` ${formatPrice(getFieldValue('weekly_rent'))} ${"AED"}/${"week"}`}
                                        {getFieldValue('monthly_rent') !== 'N/A' && ` ${formatPrice(getFieldValue('monthly_rent'))} ${"AED"}/${"month"}`}
                                    </Typography>
                                </ListItem>
                            )}
                            {getFieldValue('kilometers') !== 'N/A' && (
                                <ListItem sx={{ paddingLeft: "0" }}>
                                    <Typography><strong>{t("kilometers") || "Kilometers"}:</strong> {i18n.language === "ar" ? convertToArabicNumbers(getFieldValue('kilometers')) : getFieldValue('kilometers')} km</Typography>
                                </ListItem>
                            )}
                            {getFieldValue('car_plate_number') !== 'N/A' && (
                                <ListItem sx={{ paddingLeft: "0" }}>
                                    <Typography><strong>{t("plateNumber") || "Plate Number"}:</strong> {getFieldValue('car_plate_number')}</Typography>
                                </ListItem>
                            )}
                        </List>
                    )}
                </Box>
            </Box>

            {/* Vehicle Specifications */}
            <Box sx={{ mb: 2 }}>
                <Typography variant="h6" fontWeight="bold">{t("carOverview") || "Vehicle Specifications"}</Typography>
                <Divider sx={{ mb: 1 }} />
                <Box>
                    {window.innerWidth > 800 ? (
                        <Box display={"flex"} gap={6}>
                            <Box flex={1}>
                                <List disablePadding>
                                    {getFieldValue('body') !== 'N/A' && (
                                        <ListItem sx={{ paddingLeft: "0" }}>
                                            <Typography><strong>{t("bodyType") || "Body Type"}:</strong> {t(`cardValues.${toPascalCase(getFieldValue('body'))}`) || getFieldValue('body')}</Typography>
                                        </ListItem>
                                    )}
                                    {getFieldValue('doors') !== 'N/A' && (
                                        <ListItem sx={{ paddingLeft: "0" }}>
                                            <Typography><strong>{t("doors") || "Doors"}:</strong> {getFieldValue('doors')} {t("door") || "door"}</Typography>
                                        </ListItem>
                                    )}
                                    {getFieldValue('seats') !== 'N/A' && (
                                        <ListItem sx={{ paddingLeft: "0" }}>
                                            <Typography><strong>{t("seatingCapacity") || "Seating Capacity"}:</strong> {getFieldValue('seats')} {t("seater") || "seater"}</Typography>
                                        </ListItem>
                                    )}
                                    {getFieldValue('transmission') !== 'N/A' && (
                                        <ListItem sx={{ paddingLeft: "0" }}>
                                            <Typography><strong>{t("transmissionType") || "Transmission"}:</strong> {t(`cardValues.${toPascalCase(getFieldValue('transmission'))}`) || getFieldValue('transmission')}</Typography>
                                        </ListItem>
                                    )}
                                    {getFieldValue('fuel_type') !== 'N/A' && (
                                        <ListItem sx={{ paddingLeft: "0" }}>
                                            <Typography><strong>{t("fuelType") || "Fuel Type"}:</strong> {t(`cardValues.${toPascalCase(getFieldValue('fuel_type'))}`) || getFieldValue('fuel_type')}</Typography>
                                        </ListItem>
                                    )}
                                    {getFieldValue('steering_wheel') !== 'N/A' && (
                                        <ListItem sx={{ paddingLeft: "0" }}>
                                            <Typography><strong>{t("steeringWheel") || "Steering Wheel"}:</strong> {t(`cardValues.${toPascalCase(getFieldValue('steering_wheel'))}`) || getFieldValue('steering_wheel')}</Typography>
                                        </ListItem>
                                    )}
                                </List>
                            </Box>
                            <Box flex={1}>
                                <List disablePadding>
                                    {(getFieldValue('horsepower') !== 'N/A' || getFieldValue('horse_power') !== 'N/A') && (
                                        <ListItem sx={{ paddingLeft: "0" }}>
                                            <Typography><strong>{t("horsepower") || "Horsepower"}:</strong> {i18n.language === "ar" ? convertToArabicNumbers(getFieldValue('horsepower') || getFieldValue('horse_power')) : (getFieldValue('horsepower') || getFieldValue('horse_power'))} HP</Typography>
                                        </ListItem>
                                    )}
                                    {(getFieldValue('engine_capacity') !== 'N/A' || getFieldValue(`${ad.category}_engine_capacity`) !== 'N/A') && (
                                        <ListItem sx={{ paddingLeft: "0" }}>
                                            <Typography><strong>{t("engineCapacity") || "Engine Capacity"}:</strong> {i18n.language === "ar" ? convertToArabicNumbers(getFieldValue('engine_capacity') || getFieldValue(`${ad.category}_engine_capacity`)) : (getFieldValue('engine_capacity') || getFieldValue(`${ad.category}_engine_capacity`))} cc</Typography>
                                        </ListItem>
                                    )}
                                    {(getFieldValue('number_of_cylinders') !== 'N/A' || getFieldValue(`${ad.category}_number_of_cylinders`) !== 'N/A') && (
                                        <ListItem sx={{ paddingLeft: "0" }}>
                                            <Typography><strong>{t("cylinders") || "Cylinders"}:</strong> {getFieldValue('number_of_cylinders') || getFieldValue(`${ad.category}_number_of_cylinders`)}</Typography>
                                        </ListItem>
                                    )}
                                    {getFieldValue('exterior_color') !== 'N/A' && (
                                        <ListItem sx={{ paddingLeft: "0" }}>
                                            <Typography><strong>{t("exteriorColor") || "Exterior Color"}:</strong> {t(`cardValues.${toPascalCase(getFieldValue('exterior_color'))}`) || getFieldValue('exterior_color')}</Typography>
                                        </ListItem>
                                    )}
                                    {getFieldValue('interior_color') !== 'N/A' && (
                                        <ListItem sx={{ paddingLeft: "0" }}>
                                            <Typography><strong>{t("interiorColor") || "Interior Color"}:</strong> {t(`cardValues.${toPascalCase(getFieldValue('interior_color'))}`) || getFieldValue('interior_color')}</Typography>
                                        </ListItem>
                                    )}
                                    {getFieldValue('wheels') !== 'N/A' && (
                                        <ListItem sx={{ paddingLeft: "0" }}>
                                            <Typography><strong>{t("wheels") || "Wheels"}:</strong> {getFieldValue('wheels')}</Typography>
                                        </ListItem>
                                    )}
                                    {getFieldValue('length') !== 'N/A' && (
                                        <ListItem sx={{ paddingLeft: "0" }}>
                                            <Typography><strong>{t("length") || "Length"}:</strong> {i18n.language === "ar" ? convertToArabicNumbers(getFieldValue('length')) : getFieldValue('length')} m</Typography>
                                        </ListItem>
                                    )}
                                </List>
                            </Box>
                        </Box>
                    ) : (
                        <List disablePadding>
                            {getFieldValue('body') !== 'N/A' && (
                                <ListItem sx={{ paddingLeft: "0" }}>
                                    <Typography><strong>{t("bodyType") || "Body Type"}:</strong> {t(`cardValues.${toPascalCase(getFieldValue('body'))}`) || getFieldValue('body')}</Typography>
                                </ListItem>
                            )}
                            {getFieldValue('doors') !== 'N/A' && (
                                <ListItem sx={{ paddingLeft: "0" }}>
                                    <Typography><strong>{t("doors") || "Doors"}:</strong> {getFieldValue('doors')} {t("door") || "door"}</Typography>
                                </ListItem>
                            )}
                            {getFieldValue('seats') !== 'N/A' && (
                                <ListItem sx={{ paddingLeft: "0" }}>
                                    <Typography><strong>{t("seatingCapacity") || "Seating Capacity"}:</strong> {getFieldValue('seats')} {t("seater") || "seater"}</Typography>
                                </ListItem>
                            )}
                            {getFieldValue('transmission') !== 'N/A' && (
                                <ListItem sx={{ paddingLeft: "0" }}>
                                    <Typography><strong>{t("transmissionType") || "Transmission"}:</strong> {t(`cardValues.${toPascalCase(getFieldValue('transmission'))}`) || getFieldValue('transmission')}</Typography>
                                </ListItem>
                            )}
                            {(getFieldValue('horsepower') !== 'N/A' || getFieldValue('horse_power') !== 'N/A') && (
                                <ListItem sx={{ paddingLeft: "0" }}>
                                    <Typography><strong>{t("horsepower") || "Horsepower"}:</strong> {i18n.language === "ar" ? convertToArabicNumbers(getFieldValue('horsepower') || getFieldValue('horse_power')) : (getFieldValue('horsepower') || getFieldValue('horse_power'))} HP</Typography>
                                </ListItem>
                            )}
                            {(getFieldValue('engine_capacity') !== 'N/A' || getFieldValue(`${ad.category}_engine_capacity`) !== 'N/A') && (
                                <ListItem sx={{ paddingLeft: "0" }}>
                                    <Typography><strong>{t("engineCapacity") || "Engine Capacity"}:</strong> {i18n.language === "ar" ? convertToArabicNumbers(getFieldValue('engine_capacity') || getFieldValue(`${ad.category}_engine_capacity`)) : (getFieldValue('engine_capacity') || getFieldValue(`${ad.category}_engine_capacity`))} cc</Typography>
                                </ListItem>
                            )}
                            {getFieldValue('exterior_color') !== 'N/A' && (
                                <ListItem sx={{ paddingLeft: "0" }}>
                                    <Typography><strong>{t("exteriorColor") || "Exterior Color"}:</strong> {t(`cardValues.${toPascalCase(getFieldValue('exterior_color'))}`) || getFieldValue('exterior_color')}</Typography>
                                </ListItem>
                            )}
                            {getFieldValue('interior_color') !== 'N/A' && (
                                <ListItem sx={{ paddingLeft: "0" }}>
                                    <Typography><strong>{t("interiorColor") || "Interior Color"}:</strong> {t(`cardValues.${toPascalCase(getFieldValue('interior_color'))}`) || getFieldValue('interior_color')}</Typography>
                                </ListItem>
                            )}
                        </List>
                    )}
                </Box>
            </Box>

            {/* Seller Information */}
            {(getFieldValue('seller_type') !== 'N/A' || getFieldValue('dealer_name') !== 'N/A' || getFieldValue('name') !== 'N/A') && (
                <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" fontWeight="bold">{"Seller Information"}</Typography>
                    <Divider sx={{ mb: 1 }} />
                    <List disablePadding>
                        {getFieldValue('seller_type') !== 'N/A' && (
                            <ListItem sx={{ paddingLeft: "0" }}>
                                <Typography><strong>{t("sellerType") || "Seller Type"}:</strong> {t(`cardValues.${getFieldValue('seller_type')}`) || getFieldValue('seller_type')}</Typography>
                            </ListItem>
                        )}
                        {getFieldValue('dealer_name') !== 'N/A' && (
                            <ListItem sx={{ paddingLeft: "0" }}>
                                <Typography><strong>{"Dealer Name"}:</strong> {getFieldValue('dealer_name')}</Typography>
                            </ListItem>
                        )}
                        {getFieldValue('name') !== 'N/A' && (
                            <ListItem sx={{ paddingLeft: "0" }}>
                                <Typography><strong>{"Contact Name"}:</strong> {getFieldValue('name')}</Typography>
                            </ListItem>
                        )}
                        {getFieldValue('phone') !== 'N/A' && (
                            <ListItem sx={{ paddingLeft: "0" }}>
                                <Typography><strong>{t("phone") || "Phone"}:</strong> {getFieldValue('phone')}</Typography>
                            </ListItem>
                        )}
                        {getFieldValue('gmail') !== 'N/A' && (
                            <ListItem sx={{ paddingLeft: "0" }}>
                                <Typography><strong>{"Email"}:</strong> {getFieldValue('gmail')}</Typography>
                            </ListItem>
                        )}
                    </List>
                </Box>
            )}

            {/* Additional Features */}
            {(getFieldValue('warranty') !== 'N/A' || getFieldValue('featured') !== 'N/A' || getFieldValue('status') !== 'N/A') && (
                <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" fontWeight="bold">{"Additional Features"}</Typography>
                    <Divider sx={{ mb: 1 }} />
                    <List disablePadding>
                        {getFieldValue('warranty') !== 'N/A' && (
                            <ListItem sx={{ paddingLeft: "0" }}>
                                <Typography><strong>{t("warranty") || "Warranty"}:</strong> {t(`cardValues.${toPascalCase(getFieldValue('warranty'))}`) || getFieldValue('warranty')}</Typography>
                            </ListItem>
                        )}
                    </List>
                </Box>
            )}

            {/* Description */}
            <Box sx={{ mb: 2 }}>
                <Typography variant="h6" fontWeight="bold">{t("description") || "Description"}</Typography>
                <Divider sx={{ mb: 1 }} />
                <Typography>{getFieldValue('description', t("noDescriptionAvailable") || "No description available")}</Typography>
                <Typography fontWeight="bold" mt={1}>
                    {t("postedOn") || "Posted On"}: {i18n.language == "ar" ? convertDateToArabic(moment(ad.date).format("DD MMMM YYYY")) : moment(ad.date).format("DD MMMM YYYY")}
                </Typography>
            </Box>

            {/* Location and Map */}
            <Box sx={{ padding: 2, borderRadius: 2 }}>
                <Typography variant="body1" gutterBottom>
                    {getFieldValue('location', t("locationNotAvailable") || "Location not available")}
                    {getFieldValue('city') !== 'N/A' && `, ${getFieldValue('city')}`}
                </Typography>
                {getFieldValue('location') !== 'N/A' && (
                    <Box
                        component="iframe"
                        src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623.326228936158!2d55.343010375929965!3d25.178505831713213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5db80c6c8be7%3A0xaaf706d6ff9cd6df!2s${encodeURIComponent(ad.location)}!5e0!3m2!1sen!2sae!4v1711567305941!5m2!1sen!2sae`}
                        width="100%"
                        height="500px"
                        style={{ border: 0, borderRadius: 5 }}
                        allowFullScreen
                        loading="lazy"
                    ></Box>
                )}
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