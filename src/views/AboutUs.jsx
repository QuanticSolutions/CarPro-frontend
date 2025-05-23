import React from 'react';
import {
    Container,
    Typography,
    Box,
    Divider,
    Paper,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function AboutUs() {

    const { t } = useTranslation();
    return (
        <>
            <Container sx={{ py: 4, mt: 5 }}>
                <Paper elevation={1} sx={{ p: 4, boxShadow: 0, textTransform: "none" }}>
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Typography variant="h4" component="h1" fontWeight="medium" gutterBottom>
                            {t("about.title")}
                        </Typography>
                    </Box>
                    <Box sx={{ mb: 4, textAlign: 'center' }} >
                        <Typography variant="body1" paragraph>
                            {t("about.p1")}
                        </Typography>

                        <Typography variant="body1" paragraph>
                            {t("about.p2")}
                        </Typography>


                        <Typography variant="h5" component="h2" fontWeight="medium" gutterBottom>
                            {t("about.p3")}
                        </Typography>


                        <Typography variant="body1" paragraph>
                            {t("about.p4")}
                        </Typography>

                        <Typography variant="body1" paragraph>
                            {t("about.p5")}
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 4, textAlign: 'center' }} >
                        <Typography variant="body1" paragraph>
                            {t("about.cars")}
                        </Typography>

                        <Typography variant="body1" paragraph>
                            {t("about.cars_p1")}
                        </Typography>


                        <Typography variant="h5" component="h2" fontWeight="medium" gutterBottom>
                            {t("about.cars_p2")}
                        </Typography>


                        <Typography variant="body1" paragraph>
                            {t("about.cars_p3")}
                        </Typography>

                    </Box>

                    <Divider sx={{ my: 4 }} />
                    <Box sx={{ mb: 4, textAlign: 'center' }}>
                        <Typography variant="h5" component="h2" fontWeight="medium" gutterBottom>
                            {t("about.cf_cars")}
                        </Typography>

                        <Typography variant="body1" paragraph>
                            {t("about.cf_cars_p1")}
                        </Typography>

                        <Typography variant="body1" paragraph>
                            {t("about.cf_cars_p2")}
                        </Typography>

                        <Typography variant="body1" paragraph>
                            {t("about.cf_cars_p3")}
                        </Typography>
                    </Box>
                    <Box sx={{ mb: 4, textAlign: 'center' }}>
                        <Typography variant="h5" component="h2" fontWeight="medium" gutterBottom>
                            {t("about.classifieds")}
                        </Typography>

                        <Typography variant="body1" paragraph>
                            {t("about.classifieds_p1")}
                        </Typography>

                        <Typography variant="body1" paragraph>
                            {t("about.classifieds_p2")}
                        </Typography>

                        <Typography variant="body1" paragraph>
                            {t("about.classifieds_p3")}
                        </Typography>
                    </Box>
                    <Divider sx={{ my: 4 }} />
                </Paper>
            </Container>
        </>
    );
}
