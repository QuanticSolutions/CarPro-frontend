import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Container,
    Typography,
    TextField,
    Paper,
    Grid,
    MenuItem,
    Select,
    FormControl,
    Divider,
    Avatar,
    IconButton,
    Dialog, DialogContent, DialogActions, DialogTitle
} from '@mui/material';
import { Trash } from 'lucide-react';
import { getUser, updateUser, deleteUser, uploadImages, getImages, API_BASE_URL, logout, socialLogin } from '../api/consumer';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import moment from 'moment';
import { useTranslation } from 'react-i18next'


export default function EditProfile() {

    const { t } = useTranslation();
    const [formData, setFormData] = useState({});
    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false
    });
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const years = Array.from({ length: 70 }, (_, i) => new Date().getFullYear() - i);
    const [popupOpen, setPopupOpen] = useState(false);
    const [passwordPopupOpen, setPasswordPopupOpen] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });

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
        setImages(
            (prevImages) => {
                const updatedImages = fileArray
                return updatedImages
            }
        );
    };

    useEffect(
        () => {
            getUser(localStorage.getItem('user_id')).then(data => {
                const dob = moment(data.date_of_birth);
                setFormData({
                    ...data,
                    day: dob.date(),
                    month: dob.month() + 1,
                    year: dob.year()
                });
            });
            getImages(localStorage.getItem('user_id')).then(data => { setImages(data); console.log(data[0]) })

        },
        []
    )

    const togglePasswordVisibility = (field) => {
        setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({
            ...passwordData,
            [name]: value
        });
    };

    const handlePasswordSubmit = () => {
        if (passwordData.newPassword !== passwordData.confirmNewPassword) {
            setPasswordError('كلمات المرور الجديدة غير متطابقة.');
            return;
        }
        
        updateUser(localStorage.getItem("user_id"), {
            currentPassword: passwordData.currentPassword,
            newPassword: passwordData.newPassword
        }).then((response) => {
            setPasswordError(response.message);
            if (response.success) {
                setPasswordPopupOpen(false);
                setPasswordData({
                    currentPassword: '',
                    newPassword: '',
                    confirmNewPassword: ''
                });
                setPasswordError('');
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        
        setFormData(
            prevData => {
                const updatedData = prevData;
                updatedData.date_of_birth = new Date(`${formData.year}-${formData.month}-${formData.day}`)
                console.log(updatedData)
                return updatedData
            }
        )
        updateUser(localStorage.getItem("user_id"), formData).then(
            (response) => {
                console.log(response.message);
            }
        )
        if (images.length > 0) {
            const imageData = new FormData();
            images.forEach((image) => {
                imageData.append('images', image);
            });
            uploadImages(localStorage.getItem("user_id"), imageData)
        }
        // window.location.href = "/my/profile";
    };

    return (
        <>
            <Container sx={{ py: 4, marginTop: window.innerWidth >= 1000 && "10rem", mb: "5rem" }}>
                <Paper elevation={1} sx={{ p: 4, mb: 3 }}>
                    <Typography variant="h5" fontWeight="medium" gutterBottom>
                        {t("editProfile.title")}
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit}>

                        <Typography variant="subtitle1" fontWeight="medium" gutterBottom sx={{ mt: 2 }}>
                            {t("editProfile.profilePicture")}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
                            <Avatar
                                src={imagePreviews[0] || `${API_BASE_URL}${images[images.length - 1]?.imageUrl}`}
                                alt="Profile"
                                sx={{ width: 64, height: 64 }}
                            />
                            <Button
                                variant="outlined"
                                component="label"
                                color='error'
                                sx={{ textTransform: 'none' }}
                            >
                                {t("editProfile.browseFile")}
                                <input
                                    hidden
                                    accept="image/jpeg,image/png,application/pdf"
                                    type="file"
                                    name="images"
                                    multiple
                                    onChange={handleImageUpload}
                                />
                            </Button>
                            <Button
                                variant="outlined"
                                color='error'
                                sx={{ textTransform: 'none' }}
                                onClick={() => setPasswordPopupOpen(true)}
                            >
                                {t("editProfile.changePassword") || "Change Password"}
                            </Button>
                        </Box>
                        <Divider sx={{ my: 3 }} />
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={8}>
                                <Typography variant="subtitle2" gutterBottom>
                                    {t("editProfile.name")}
                                </Typography>
                                <TextField
                                    name="fullname"
                                    value={formData.fullname}
                                    onChange={handleChange}
                                    fullWidth
                                    placeholder={t("editProfile.name")}
                                    variant="outlined"
                                    size="small"
                                    sx={{ mb: 3 }}
                                />

                                <Typography variant="subtitle2" gutterBottom>
                                    {t("editProfile.dob")}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                                    <FormControl size="small" sx={{ width: '80px' }}>
                                        <Select
                                            name="day"
                                            value={formData.day || ''}
                                            onChange={handleChange}
                                            displayEmpty
                                        >
                                            <MenuItem value="" disabled>يوم</MenuItem>
                                            {days.map(day => (
                                                <MenuItem key={day} value={day}>{day}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <FormControl size="small" sx={{ width: '80px' }}>
                                        <Select
                                            name="month"
                                            value={formData.month || ''}
                                            onChange={handleChange}
                                            displayEmpty
                                        >
                                            <MenuItem value="" disabled>شهر</MenuItem>
                                            {months.map(month => (
                                                <MenuItem key={month} value={month}>{month}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <FormControl size="small" sx={{ width: '100px' }}>
                                        <Select
                                            name="year"
                                            value={formData.year || ''}
                                            onChange={handleChange}
                                            displayEmpty
                                        >
                                            <MenuItem value="" disabled>سنة</MenuItem>
                                            {years.map(year => (
                                                <MenuItem key={year} value={year}>{year}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>

                                <Typography variant="subtitle2" gutterBottom>
                                    {t("editProfile.gender")}
                                </Typography>
                                <FormControl fullWidth size="small" sx={{ mb: 3 }}>
                                    <TextField
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        fullWidth
                                        placeholder="جنسك"
                                        variant="outlined"
                                        size="small"
                                        sx={{ mb: 3 }}
                                    />
                                </FormControl>

                                <Typography variant="subtitle2" gutterBottom>
                                    {t("editProfile.about")}
                                </Typography>
                                <TextField
                                    name="about"
                                    value={formData.about}
                                    onChange={handleChange}
                                    fullWidth
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    size="small"
                                    sx={{ mb: 3 }}
                                />
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Box sx={{ border: '1px solid #e0e0e0', p: 2, borderRadius: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                        <Typography variant="subtitle2" fontWeight="bold">
                                            {t("editProfile.whyImportant")}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary', fontSize: '0.85rem' }}>
                                        {t("editProfile.whyImportantDesc")}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>

                        <Divider sx={{ my: 3 }} />
                        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                            {t("editProfile.contactInfo")}
                        </Typography>

                        <Typography variant="caption" color="textSecondary" gutterBottom>
                            {t("editProfile.contactNote")}
                        </Typography>

                        <TextField
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            size="small"
                            sx={{ mt: 2, mb: 1 }}
                        />

                        <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 3 }}>
                            {t("editProfile.emailNote")}
                        </Typography>

                        <Divider sx={{ my: 3 }} />
                        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                            {t("editProfile.optionalInfo")}
                        </Typography>

                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle2" gutterBottom>
                                    {t("editProfile.google")}
                                </Typography>
                                <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 1 }}>
                                    {t("editProfile.googleNote")}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mt: 1, textTransform: 'none', borderColor: "#B71C1C", color: "#B71C1C" }}
                                    onClick={() => { if (!formData.google_id) { socialLogin("google") } else { updateUser(localStorage.getItem("user_id"), { ...formData, googleId: "" }); window.location.href = "/my/ads" } }}
                                >
                                    {formData.google_id ? t("editProfile.link") : t("editProfile.unlink")}
                                </Button>
                            </Grid>
                        </Grid>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                            <Button variant="outlined" sx={{ borderColor: "#B71C1C", color: "#B71C1C" }} onClick={() => window.location.href = "/my/profile"}>
                                {t("editProfile.cancel")}
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                type="submit"
                                sx={{textTransform: "none"}}
                                onClick={(e) => handleSubmit(e)}
                            >
                                {t("editProfile.saveChanges")}
                            </Button>
                        </Box>
                    </Box>
                </Paper>
                <Paper elevation={1} sx={{ p: 4 }}>
                    <Typography variant="subtitle1" fontWeight="medium" color="error" gutterBottom>
                        {t("editProfile.deleteAccount")}
                    </Typography>

                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<Trash size={16} />}
                        sx={{ mb: 2, textTransform: "none" }}
                        onClick={() => setPopupOpen(true)}
                    >
                        {t("editProfile.yesDelete")}
                    </Button>
                </Paper>
            </Container>

            {/* Change Password Popup */}
            <Dialog open={passwordPopupOpen} onClose={() => setPasswordPopupOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {t("editProfile.changePassword") || "Change Password"}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2 }}>
                        <TextField
                            name="currentPassword"
                            type={showPassword.current ? 'text' : 'password'}
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                            fullWidth
                            placeholder={t("editProfile.currentPassword")}
                            variant="outlined"
                            size="small"
                            sx={{ mb: 2 }}
                            InputProps={{
                                endAdornment: (
                                    <IconButton onClick={() => togglePasswordVisibility('current')} edge="end">
                                        {showPassword.current ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                )
                            }}
                        />

                        <TextField
                            name="newPassword"
                            type={showPassword.new ? 'text' : 'password'}
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            fullWidth
                            placeholder={t("editProfile.newPassword")}
                            variant="outlined"
                            size="small"
                            sx={{ mb: 2 }}
                            InputProps={{
                                endAdornment: (
                                    <IconButton onClick={() => togglePasswordVisibility('new')} edge="end">
                                        {showPassword.new ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                )
                            }}
                        />

                        <TextField
                            name="confirmNewPassword"
                            type={showPassword.confirm ? 'text' : 'password'}
                            value={passwordData.confirmNewPassword}
                            onChange={handlePasswordChange}
                            fullWidth
                            placeholder={t("editProfile.confirmNewPassword")}
                            variant="outlined"
                            error={Boolean(passwordError)}
                            helperText={passwordError}
                            size="small"
                            InputProps={{
                                endAdornment: (
                                    <IconButton onClick={() => togglePasswordVisibility('confirm')} edge="end">
                                        {showPassword.confirm ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                )
                            }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setPasswordPopupOpen(false)} sx={{ textTransform: "none", color: "black" }}>
                        {t("editProfile.cancel")}
                    </Button>
                    <Button 
                        onClick={handlePasswordSubmit} 
                        variant="contained" 
                        color="error"
                        sx={{ textTransform: "none" }}
                    >
                        {t("editProfile.saveChanges")}
                    </Button>
                </DialogActions>
            </Dialog>


            <Dialog open={popupOpen} onClose={() => setPopupOpen(false)} maxWidth="sm" fullWidth >
                <DialogContent>
                    {t("editProfile.deleteConfirm")}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { deleteUser(localStorage.getItem("user_id")); logout() }} sx={{ backgroundColor: "#B71C1C" }} variant="contained">
                        {t("editProfile.yes")}
                    </Button>
                    <Button onClick={() => setPopupOpen(false)} sx={{ backgroundColor: "#B71C1C" }} variant="contained">
                        {t("editProfile.no")}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}