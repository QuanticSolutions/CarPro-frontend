import {
    Container,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
import { useTranslation } from 'react-i18next'

export default function PrivacyPolicy() {

    const { t } = useTranslation();
    return (
        <>
            <Container sx={{ py: 4, marginTop: window.innerWidth >= 1000 && 5 }}>
                <Paper elevation={1} sx={{ p: 4, boxShadow: 0 }}>
                    <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
                        {t("privacy.privacyPolicy")}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        {t("privacy.lastUpdated")}
                    </Typography>

                    <Typography variant="body1" paragraph sx={{ mt: 3 }}>
                        {t("privacy.intro")}
                    </Typography>

                    <Typography variant="body1" paragraph>
                        {t("privacy.dataUsageNotice")}
                    </Typography>

                    <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom sx={{ mt: 4 }}>
                        {t("privacy.interpretation")}
                    </Typography>

                    <Typography variant="h6" component="h3" fontWeight="bold" gutterBottom sx={{ mt: 3 }}>
                        {t("privacy.definitions")}
                    </Typography>

                    <Typography variant="body1" paragraph>
                        {t("privacy.definitionNote")}
                    </Typography>

                    <Typography variant="h6" component="h3" fontWeight="bold" gutterBottom sx={{ mt: 3 }}>
                        {t("privacy.account")}
                    </Typography>

                    <Typography variant="body1" paragraph>
                        {t("privacy.affiliate")}
                    </Typography>

                    <List sx={{ pl: 2 }}>
                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
                            <ListItemText
                                primary={<Typography variant="body1">{t("privacy.company")}</Typography>}
                            />
                        </ListItem>

                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
                            <ListItemText
                                primary={<Typography variant="body1">{t("privacy.cookies")}</Typography>}
                            />
                        </ListItem>

                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
                            <ListItemText
                                primary={<Typography variant="body1">{t("privacy.country")}</Typography>}
                            />
                        </ListItem>

                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
                            <ListItemText
                                primary={<Typography variant="body1">{t("privacy.device")}</Typography>}
                            />
                        </ListItem>

                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
                            <ListItemText
                                primary={<Typography variant="body1">{t("privacy.personalData")}</Typography>}
                            />
                        </ListItem>

                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
                            <ListItemText
                                primary={<Typography variant="body1">{t("privacy.service")}</Typography>}
                            />
                        </ListItem>

                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
                            <ListItemText
                                primary={<Typography variant="body1">{t("privacy.serviceProvider")}</Typography>}
                            />
                        </ListItem>

                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
                            <ListItemText
                                primary={<Typography variant="body1">{t("privacy.usageData")}</Typography>}
                            />
                        </ListItem>

                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
                            <ListItemText
                                primary={<Typography variant="body1">{t("privacy.website")}</Typography>}
                            />
                        </ListItem>

                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
                            <ListItemText
                                primary={<Typography variant="body1">{t("privacy.you")}</Typography>}
                            />
                        </ListItem>

                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
                            <ListItemText
                                primary={<Typography variant="body1">{t("privacy.dataCollection")}</Typography>}
                            />
                        </ListItem>

                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
                            <ListItemText
                                primary={<Typography variant="body1">{t("privacy.typesCollected")}</Typography>}
                            />
                        </ListItem>
                    </List>

                    <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom sx={{ mt: 4 }}>
                        {t("privacy.personalDataHeader")}
                    </Typography>

                    <Typography variant="h6" component="h3" fontWeight="bold" gutterBottom sx={{ mt: 3 }}>
                        {t("privacy.personalDataExamples")}
                    </Typography>

                    <List sx={{ pl: 2 }}>
                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
                            <ListItemText primary={<Typography variant="body1">{t("privacy.firstLastName")}</Typography>} />
                        </ListItem>
                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
                            <ListItemText primary={<Typography variant="body1">{t("privacy.email")}</Typography>} />
                        </ListItem>
                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
                            <ListItemText primary={<Typography variant="body1">{t("privacy.address")}</Typography>} />
                        </ListItem>
                    </List>

                    <Typography variant="subtitle1" component="h4" fontWeight="bold" gutterBottom sx={{ mt: 2 }}>
                        {t("privacy.usageDataHeader")}
                    </Typography>

                    <Typography variant="body1" paragraph>
                        {t("privacy.usageDataCollected")}
                    </Typography>

                    <Typography variant="body1" paragraph>
                        {t("privacy.trackingCookies")}
                    </Typography>

                    <Typography variant="body1" paragraph>
                        {t("privacy.cookiesUsage")}
                    </Typography>
                    <Typography variant="h6" component="h3" fontWeight="bold" gutterBottom sx={{ mt: 3 }}>

                        {t("privacy.dataUsePurposes")}
                    </Typography>
                    <List sx={{ pl: 2 }}>
                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
                            <ListItemText primary={<Typography variant="body1">{t("privacy.dataUseList.provideService")}</Typography>} />
                        </ListItem>

                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
                            <ListItemText primary={<Typography variant="body1">{t("privacy.dataUseList.manageAccount")}</Typography>} />
                        </ListItem>

                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
                            <ListItemText primary={<Typography variant="body1">{t("privacy.dataUseList.contractExecution")}</Typography>} />
                        </ListItem>

                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
                            <ListItemText primary={<Typography variant="body1">{t("privacy.dataUseList.contactYou")}</Typography>} />
                        </ListItem>

                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
                            <ListItemText primary={<Typography variant="body1">{t("privacy.dataUseList.sendOffers")}</Typography>} />
                        </ListItem>

                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
                            <ListItemText primary={<Typography variant="body1">{t("privacy.dataUseList.requestManagement")}</Typography>} />
                        </ListItem>

                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
                            <ListItemText primary={<Typography variant="body1">{t("privacy.dataUseList.businessTransfer")}</Typography>} />
                        </ListItem>

                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
                            <ListItemText primary={<Typography variant="body1">{t("privacy.dataUseList.otherPurposes")}</Typography>} />
                        </ListItem>
                    </List>
                    <Typography variant="h6" component="h3" fontWeight="bold" gutterBottom sx={{ mt: 3 }}>
                        {t("privacy.contactUs")}
                    </Typography>

                    <Typography variant="body1" paragraph>
                        {t("privacy.sharingInfo")}
                    </Typography>

                    <List sx={{ pl: 2 }}>
                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
                            <ListItemText primary={<Typography variant="body1">{t("privacy.contactMethods.phone")}</Typography>} />
                        </ListItem>

                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
                            <ListItemText primary={<Typography variant="body1">{t("privacy.contactMethods.email")}</Typography>} />
                        </ListItem>
                    </List>
                </Paper>
            </Container>
        </>
    );
}