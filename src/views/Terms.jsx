import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Divider
} from '@mui/material';
import Nav from '../components/menu/Nav';
import Footer from '../components/footer/Footer';
import { useTranslation } from 'react-i18next'

export default function TermsOfUse() {

  const { t } = useTranslation();

  return (
    <>
      <Container sx={{ py: 4, marginTop: window.innerWidth >= 1000 && 6 }}>
        <Paper elevation={1} sx={{ p: 4, boxShadow: 0 }}>
          <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
            {t("termsOfUse.title")}
          </Typography>

          <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom sx={{ mt: 4 }}>
            {t("termsOfUse.section1Title")}
          </Typography>

          <Typography variant="body1" paragraph>
            {t("termsOfUse.section1Paragraphs", { returnObjects: true })[0]}
          </Typography>

          <Typography variant="body1" paragraph>
            {t("termsOfUse.section1Paragraphs", { returnObjects: true })[1]}
          </Typography>

          <Typography variant="body1" paragraph>
            {t("termsOfUse.section1Paragraphs", { returnObjects: true })[2]}
          </Typography>

          <Typography variant="body1" paragraph>
            {t("termsOfUse.section1Paragraphs", { returnObjects: true })[3]}
          </Typography>

          {/* Section 2 */}
          <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom sx={{ mt: 4 }}>
            {t("termsOfUse.section2Title")}
          </Typography>

          <Typography variant="body1" paragraph>
            {t("termsOfUse.section2Paragraphs", { returnObjects: true })[0]}
          </Typography>

          <Typography variant="body1" paragraph>
            {t("termsOfUse.section2Paragraphs", { returnObjects: true })[1]}
          </Typography>

          <Typography variant="body1" paragraph>
            {t("termsOfUse.section2Paragraphs", { returnObjects: true })[2]}
          </Typography>

          <Typography variant="body1" paragraph>
            {t("termsOfUse.section2Paragraphs", { returnObjects: true })[3]}
          </Typography>


          <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom sx={{ mt: 4 }}>
            {t("termsOfUse.section3Title")}
          </Typography>

          <Typography variant="body1" paragraph>
            {t("termsOfUse.section3Paragraphs", { returnObjects: true })[0]}
          </Typography>

          <Typography variant="body1" paragraph>
            {t("termsOfUse.section3Paragraphs", { returnObjects: true })[1]}
          </Typography>

          <Typography variant="body1" paragraph>
            {t("termsOfUse.section3Paragraphs", { returnObjects: true })[2]}
          </Typography>

          <Typography variant="body1" paragraph>
            {t("termsOfUse.section3Paragraphs", { returnObjects: true })[3]}
          </Typography>

          <Typography variant="body1" paragraph>
            {t("termsOfUse.section3Paragraphs", { returnObjects: true })[4]}
          </Typography>

          <Typography variant="body1" paragraph>
            {t("termsOfUse.section3Paragraphs", { returnObjects: true })[5]}
          </Typography>

          <Typography variant="body1" paragraph>
            {t("termsOfUse.section3Paragraphs", { returnObjects: true })[6]}
          </Typography>

          <Typography variant="body1" paragraph>
            {t("termsOfUse.section3Paragraphs", { returnObjects: true })[7]}
          </Typography>

          <Typography variant="body1" paragraph>
            {t("termsOfUse.section3Paragraphs", { returnObjects: true })[8]}
          </Typography>

          {/* Section 4 */}
          <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom sx={{ mt: 4 }}>
            {t("termsOfUse.section4Title")}
          </Typography>

          <Typography variant="body1" paragraph>
            {t("termsOfUse.section4Paragraphs", { returnObjects: true })[0]}
          </Typography>

          <Typography variant="body1" paragraph>
          {t("termsOfUse.section4Paragraphs", { returnObjects: true })[1]}
          </Typography>

          {/* Section 5 */}
          <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom sx={{ mt: 4 }}>
          {t("termsOfUse.section5Title")}
          </Typography>

          <Typography variant="body1" component="ol" sx={{ pl: 4 }}>
            <li>
              <Typography variant="body1" paragraph>
              {t("termsOfUse.section5Points", { returnObjects: true })[0]}
              </Typography>
            </li>
            <li>
              <Typography variant="body1" paragraph>
              {t("termsOfUse.section5Points", { returnObjects: true })[1]}
              </Typography>
            </li>
            <li>
              <Typography variant="body1" paragraph>
              {t("termsOfUse.section5Points", { returnObjects: true })[2]}
              </Typography>
            </li>
            <li>
              <Typography variant="body1" paragraph>
              {t("termsOfUse.section5Points", { returnObjects: true })[3]}
              </Typography>
            </li>
          </Typography>

          {/* Section 6 */}
          <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom sx={{ mt: 4 }}>
          {t("termsOfUse.section6Title")}
          </Typography>

          <Typography variant="body1" paragraph>
          {t("termsOfUse.section6Paragraphs", { returnObjects: true })[0]}
          </Typography>

          <Typography variant="body1" paragraph>
          {t("termsOfUse.section6Paragraphs", { returnObjects: true })[1]}
          </Typography>

          <Typography variant="body1" paragraph>
          {t("termsOfUse.section6Paragraphs", { returnObjects: true })[2]}

          </Typography>

          <Typography variant="body1" paragraph>
          {t("termsOfUse.section6Paragraphs", { returnObjects: true })[3]}
          </Typography>

          <Typography variant="h6" component="h3" fontWeight="bold" gutterBottom sx={{ mt: 3 }}>
          {t("termsOfUse.privacyPolicyTitle")}
          </Typography>

          <Typography variant="body1" paragraph>
          {t("termsOfUse.privacyCollection")}
          </Typography>

          <Typography variant="body1" paragraph>
          {t("termsOfUse.privacyCollectionDetails", { returnObjects: true })[0]}
          </Typography>

          <Typography variant="body1" paragraph>
          {t("termsOfUse.privacyCollectionDetails", { returnObjects: true })[1]}
          </Typography>

          <Typography variant="body1" paragraph>
              {t("termsOfUse.privacyCollectionDetails", { returnObjects: true })[0]}
              {t("termsOfUse.privacyCollectionDetails", { returnObjects: true })[1]}
          </Typography>

          <Typography variant="body1" paragraph>
          {t("termsOfUse.privacyUsage")}
          </Typography>

          <Typography variant="body1" paragraph>
            {t("termsOfUse.privacyUsageDetails", { returnObjects: true })[0]}
            {t("termsOfUse.privacyUsageDetails", { returnObjects: true })[1]}
            {t("termsOfUse.privacyUsageDetails", { returnObjects: true })[2]}
            {t("termsOfUse.privacyUsageDetails", { returnObjects: true })[3]}
            {t("termsOfUse.privacyUsageDetails", { returnObjects: true })[4]}
            {t("termsOfUse.privacyUsageDetails", { returnObjects: true })[5]}
            {t("termsOfUse.privacyUsageDetails", { returnObjects: true })[6]}
          </Typography>

          <Typography variant="body1" paragraph>
          {t("termsOfUse.privacyEmailTools")}
          </Typography>

          <Typography variant="body1" paragraph>
          {t("termsOfUse.privacyEmailToolsDetails", { returnObjects: true })[0]}
          </Typography>

          <Typography variant="body1" paragraph>
            {t("termsOfUse.privacyEmailToolsDetails", { returnObjects: true })[1]}
          </Typography>

          <Typography variant="body1" paragraph>
          {t("termsOfUse.privacyEmailToolsDetails", { returnObjects: true })[2]}
          </Typography>

          <Typography variant="body1" paragraph>
          {t("termsOfUse.privacySecurity")}
          </Typography>

          <Typography variant="body1" paragraph>
          {t("termsOfUse.privacySecurityDetails", { returnObjects: true })[0]}
          {t("termsOfUse.privacySecurityDetails", { returnObjects: true })[1]}
          {t("termsOfUse.privacySecurityDetails", { returnObjects: true })[2]}
          {t("termsOfUse.privacySecurityDetails", { returnObjects: true })[3]}

          </Typography>
        </Paper>
      </Container>
    </>
  );
}