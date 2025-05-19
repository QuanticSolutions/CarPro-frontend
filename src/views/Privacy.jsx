import {
    Container,
    Typography,
    Paper,
    Box,
    List,
    ListItem,
    ListItemText,
    Divider
} from '@mui/material';
import Nav from '../components/menu/Nav';
import Footer from '../components/footer/Footer';
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

                    {/* <Typography variant="body1" paragraph>
                        قد نجمع أيضًا المعلومات التي يرسلها متصفحك في كل مرة تزور فيها خدمتنا أو عندما تصل إلى الخدمة من خلال أو عبر جهاز محمول.
                    </Typography>

                    <Typography variant="subtitle1" component="h4" fontWeight="bold" gutterBottom sx={{ mt: 2 }}>
                        تقنيات التتبع وملفات تعريف الارتباط
                    </Typography>

                    <Typography variant="body1" paragraph>
                        نستخدم ملفات تعريف الارتباط وتقنيات التتبع المماثلة لتتبع النشاط على خدمتنا وتخزين معلومات معينة. تشمل تقنيات التتبع المستخدمة الإشارات والعلامات والنصوص البرمجية لجمع المعلومات وتتبعها وتحسين خدمتنا وتحليلها. قد تشمل التقنيات التي نستخدمها:
                    </Typography>

                    <List sx={{ pl: 2 }}>
                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
                            <ListItemText
                                primary={
                                    <Typography variant="body1">
                                        <strong>ملفات تعريف الارتباط أو ملفات تعريف ارتباط المتصفح.</strong> ملف تعريف الارتباط هو ملف صغير يوضع على جهازك. يمكنك توجيه متصفحك لرفض جميع ملفات تعريف الارتباط أو للإشارة إلى وقت إرسال ملف تعريف ارتباط. ومع ذلك، إذا كنت لا تقبل ملفات تعريف الارتباط، فقد لا تتمكن من استخدام بعض أجزاء خدمتنا. ما لم تقم بتعديل إعداد المتصفح الخاص بك بحيث يرفض ملفات تعريف الارتباط، فقد تستخدم خدمتنا ملفات تعريف الارتباط.
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
                            <ListItemText
                                primary={
                                    <Typography variant="body1">
                                        <strong>إشارات الويب.</strong> قد تحتوي أقسام معينة من خدمتنا ورسائل البريد الإلكتروني الخاصة بنا على ملفات إلكترونية صغيرة تُعرف باسم إشارات الويب (يشار إليها أيضًا باسم الصور الشفافة وعلامات البكسل وصور GIF أحادية البكسل) التي تسمح للشركة، على سبيل المثال، بعد المستخدمين الذين زاروا تلك الصفحات أو فتحوا رسالة بريد إلكتروني وإحصاءات أخرى ذات صلة بالموقع (على سبيل المثال، تسجيل شعبية قسم معين والتحقق من سلامة النظام والخادم).
                                    </Typography>
                                }
                            />
                        </ListItem>
                    </List>

                    <Typography variant="body1" paragraph>
                        يمكن أن تكون ملفات تعريف الارتباط "دائمة" أو ملفات تعريف ارتباط "الجلسة". تبقى ملفات تعريف الارتباط الدائمة على جهاز الكمبيوتر الشخصي أو الجهاز المحمول عندما تكون غير متصل بالإنترنت، بينما يتم حذف ملفات تعريف ارتباط الجلسة بمجرد إغلاق متصفح الويب.
                    </Typography>

                    <Typography variant="body1" paragraph>
                        نستخدم كلاً من ملفات تعريف ارتباط الجلسة وملفات تعريف الارتباط الدائمة للأغراض المبينة أدناه:
                    </Typography>

                    <List sx={{ pl: 2 }}>
                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
                            <ListItemText
                                primary={
                                    <Box>
                                        <Typography variant="body1" component="div"><strong>ملفات تعريف الارتباط الضرورية / الأساسية</strong></Typography>
                                        <Typography variant="body2" component="div">النوع: ملفات تعريف ارتباط الجلسة</Typography>
                                        <Typography variant="body2" component="div">يديرها: نحن</Typography>
                                        <Typography variant="body2" component="div">الغرض: هذه الملفات ضرورية لتزويدك بالخدمات المتاحة من خلال الموقع وتمكينك من استخدام بعض ميزاته. فهي تساعد على مصادقة المستخدمين ومنع الاستخدام الاحتيالي لحسابات المستخدمين. بدون ملفات تعريف الارتباط هذه، لا يمكن تقديم الخدمات التي طلبتها، ونحن نستخدم ملفات تعريف الارتباط هذه فقط لتزويدك بتلك الخدمات.</Typography>
                                    </Box>
                                }
                            />
                        </ListItem>

                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
                            <ListItemText
                                primary={
                                    <Box>
                                        <Typography variant="body1" component="div"><strong>ملفات تعريف ارتباط سياسة / إشعار قبول ملفات تعريف الارتباط</strong></Typography>
                                        <Typography variant="body2" component="div">النوع: ملفات تعريف الارتباط الدائمة</Typography>
                                        <Typography variant="body2" component="div">يديرها: نحن</Typography>
                                        <Typography variant="body2" component="div">الغرض: تحدد ملفات تعريف الارتباط هذه ما إذا كان المستخدمون قد قبلوا استخدام ملفات تعريف الارتباط على الموقع.</Typography>
                                    </Box>
                                }
                            />
                        </ListItem>

                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc' }}>
                            <ListItemText
                                primary={
                                    <Box>
                                        <Typography variant="body1" component="div"><strong>ملفات تعريف ارتباط الوظائف</strong></Typography>
                                        <Typography variant="body2" component="div">النوع: ملفات تعريف الارتباط الدائمة</Typography>
                                        <Typography variant="body2" component="div">يديرها: نحن</Typography>
                                        <Typography variant="body2" component="div">الغرض: تسمح لنا ملفات تعريف الارتباط هذه بتذكر الاختيارات التي تقوم بها عند استخدام الموقع، مثل تذكر تفاصيل تسجيل الدخول أو تفضيلات اللغة. الغرض من ملفات تعريف الارتباط هذه هو تزويدك بتجربة أكثر شخصية وتجنب الاضطرار إلى إعادة إدخال تفضيلاتك في كل مرة تستخدم فيها الموقع.</Typography>
                                    </Box>
                                }
                            />
                        </ListItem>
                    </List> */}

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