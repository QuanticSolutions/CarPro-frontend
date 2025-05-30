import { Button } from '@mui/material'
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { useTranslation } from 'react-i18next'

const styles = {
  backgroundColor: "#B71C1C",
  width: "7rem",
  height: "2.5rem",
  color: "#fff",
  fontWeight: "bold",
  border: "3px solid #fff",
  borderRadius: "10px",
  textTransform: "none"
}

function PostBtn({ handleOnHover, handleOffHover }) {
  const { t, i18n } = useTranslation();
  return (
    <Button sx={{ ...styles, marginLeft: i18n.language != "ar" && "-3.1rem", marginRight: i18n.language == "ar" && "-0.5rem", direction: i18n.language == "ar" && "rtl" }} onMouseEnter={handleOnHover} onMouseLeave={handleOffHover}>
      {t("postAd")} <ExpandMoreIcon />
    </Button>
  )
}

export default PostBtn
