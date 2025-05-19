import React from 'react';
import {
    Container,
    Typography,
    Box,
    Divider,
    Paper,
    Grid
} from '@mui/material';
import Nav from '../components/menu/Nav';
import Footer from '../components/footer/Footer';

export default function AboutUs() {
    return (
        <>
            <Container sx={{ py: 4, mt: 5 }}>
                <Paper elevation={1} sx={{ p: 4, boxShadow: 0, textTransform: "none" }}>
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Typography variant="h4" component="h1" fontWeight="medium" gutterBottom>
                            ما هو CarFinderPro
                        </Typography>
                    </Box>
                    <Box sx={{ mb: 4, textAlign: 'center' }} >
                        <Typography variant="body1" paragraph>
                            CarFinderPro هو المنصة الرائدة للإعلانات المبوبة للمستخدمين في الإمارات العربية المتحدة. منذ إطلاقه في عام 2005، أصبح CarFinderPro المنصة الأولى للمستخدمين لشراء وبيع أو العثور على أي شيء في مجتمعهم.
                        </Typography>

                        <Typography variant="body1" paragraph>
                            مجتمع حيث يتم إعادة توزيع السلع غير المرغوب فيها لتلبية حاجة جديدة، وتصبح مرغوبة مرة أخرى. يتم تبادل الأصول المستعملة الشائعة مثل السيارات والدراجات والنقود وتسجيلها بطرق جديدة توفر للجميع الراحة وتجربة مستخدم رائعة. تم تأسيسه في عام 2005 بواسطة Emerging Group Holdings Limited التي تدير أيضًا أكبر مواقع الإعلانات المبوبة للعقارات في باكستان وبنغلاديش والمغرب.
                        </Typography>

                        <Typography variant="body1" paragraph>
                            في أبريل 2010، تم الاستحواذ على CarFinderPro.ae من قبل مجموعة OLX الهولندية لشراء مباشرة من المحليين في السعودية مقابل حوالي 1.1 مليار دولار. ويمتلك المجموعة أيضًا وتدير Bayut في الإمارات العربية المتحدة و Dubizzle في باكستان و OLX في مصر و OWN في البحرين بالإضافة إلى العديد من المنصات الأخرى في منطقة الشرق الأوسط الأوسع بما في ذلك السعودية والبحرين وعمان والكويت وقطر.
                        </Typography>

                        <Typography variant="body1" paragraph>
                            الآن في قلب منطقة دبي للتصميم، تغيرت الشركة المزدحمة، ولكن CarFinderPro لم يتغير، وهناك الكثير في المستقبل.
                        </Typography>

                        <Typography variant="body1" paragraph>
                            إذا كنت بحاجة إلى شراء أو بيع أي شيء، كل ما تحتاجه هو CarFinderPro. هيا بنا.
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 4 }} />
                    <Box sx={{ mb: 4, textAlign: 'center' }}>
                        <Typography variant="h5" component="h2" fontWeight="medium" gutterBottom>
                            السيارات
                        </Typography>

                        <Typography variant="body1" paragraph>
                            أفضل مكان لبيع سيارتك. على مدار الـ 15 عامًا الماضية، أصبحت CarFinderPro أكبر سوق سيارات عبر الإنترنت للمشترين والبائعين في الإمارات. مع أرقام المشاهدة اليومية التي تتجاوز باستمرار أسواق السيارات الأخرى، لدينا أكثر من 1.2 مليون مستخدم نشط حيث يمكنك بيع أو شراء السيارات المستعملة.
                        </Typography>

                        <Typography variant="body1" paragraph>
                            بيع سيارتك مع CarFinderPro. هل تريد بيع سيارتك بأسرع وقت ممكن؟ CarFinderPro هو أسهل وأرخص طريقة للقيام بذلك. قم بتمييز إعلانك وابحث عن المشتري المناسب في وقت قصير.
                        </Typography>

                        <Typography variant="body1" paragraph>
                            جديد ومحسن: نحن نسعى دائمًا لتحسين موقعنا الإلكتروني لجعل تجربة التسوق لشراء السيارات سلسة. اكتب العلامة التجارية والطراز الذي تبحث عنه، وقم بتصفية السنة النموذجية واترك بحثك ليعثر على سيارتك المثالية اليوم.
                        </Typography>
                    </Box>
                    <Box sx={{ mb: 4, textAlign: 'center' }}>
                        <Typography variant="h5" component="h2" fontWeight="medium" gutterBottom>
                            سيارات CarFinderPro
                        </Typography>

                        <Typography variant="body1" paragraph>
                            سواء كنت تشتري أو تبيع سيارة، CarFinderPro.cars هنا لمساعدتك. من الإجابة على أسئلة "السعر فقط" إلى المكالمات الهاتفية الحقيقية، CarFinderPro.cars هي تجربة خالية من المتاعب كلها لك. لكن، "سيارات" هو اختصار للإعلانات المبوبة، لذا يمكنك العثور على نفسك في الوجهة الرائدة للسيارات.
                        </Typography>

                        <Typography variant="body1" paragraph>
                            عند شراء سيارة في الإمارات، من الجيد دائمًا فحصها. مع CarFinderPro.cars، يمكنك طلب فحص متعدد النقاط لأي سيارة في الإمارات. احجز فحصًا اليوم لضمان أن سيارتك التالية تستحق الشراء.
                        </Typography>

                        <Typography variant="body1" paragraph>
                            نحن نقدم أيضًا معدلات تمويل وتأمين تنافسية بفضل شركائنا، شهادات تقييم معتمدة من البنك، والمزيد من الخدمات المضافة لجعل تجربة شراء وبيع سيارتك خالية من المتاعب!
                        </Typography>
                    </Box>
                    <Divider sx={{ my: 4 }} />
                    <Box sx={{ mb: 4, textAlign: 'center' }}>
                        <Typography variant="h5" component="h2" fontWeight="medium" gutterBottom>
                            الإعلانات المبوبة
                        </Typography>

                        <Typography variant="body1" paragraph>
                            أفضل مكان للشراء والبيع. هل كنت تعلم أن آلاف الإعلانات يتم نشرها يوميًا، وفي المتوسط، عشرات الآلاف يبحثون عن الشراء على CarFinderPro والمزيد يتصفحون. CarFinderPro هو المكان الذي يمكنك فيه العثور على أفضل العروض في المدينة. بغض النظر عن السعر أو الحجم أو شكل العنصر، CarFinderPro هو المكان الذي يتم فيه إدراجه والبحث عنه.
                        </Typography>

                        <Typography variant="body1" paragraph>
                            تمييز إعلانك! هل تريد أن يظهر إعلانك في القسم المميز؟ فقط تواصل معنا بخصوص إعلانك! من خلال تمييز إعلانك على CarFinderPro، يتم دفع إعلانك للأعلى ليحصل على المزيد من الوصول وبالتالي يظهر لعدد أكبر من الأشخاص ويباع بشكل أسرع.
                        </Typography>

                        <Typography variant="body1" paragraph>
                            موثوق به من قبل CarFinderPro. هل تقوم بتبني حيوان أليف؟ بفضل شركائنا، يمكنك الآن تبني حيواناتك الأليفة بأمان على CarFinderPro عبر الأطباء البيطريين المرخصين بالكامل على CarFinderPro. تابع بحثك عن الشارة "موثوق به من قبل CarFinderPro"! هيا بنا معًا لنخلق حياة أفضل للحيوانات! الكلاب، القطط، الحيوانات الأليفة، التطبيقات/المعتمدة.
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </>
    );
}
