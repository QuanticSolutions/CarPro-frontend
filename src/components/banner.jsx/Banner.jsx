import { Container } from "@mui/material";
import { useTranslation } from 'react-i18next'

function Banner({ image, link = '/' }) {

  const { i18n } = useTranslation();
  return (
    <Container
      sx={{
        my: 3,
        "@media (max-width: 786px)": {
          width: "100%"
        }
      }}
      onClick={() => window.location.href = link}
    >
      <img src={i18n.language == "ar" ? `/assets/images/banner_ar (${image}).png` : `/assets/images/banner (${image}).png`} width="100%" sx={{ objectFit: "contain" }} />
    </Container>
  );
}

export default Banner;
