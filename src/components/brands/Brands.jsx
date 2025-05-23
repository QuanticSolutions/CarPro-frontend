import { useState } from 'react';
import { Box, Button, Typography, Container, useMediaQuery } from '@mui/material';
import { styled } from "@mui/system";
import Brand from './Brand';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';

const BrandContainer = styled(Box)({
    background: "#F2F3F3",
    backgroundSize: "cover",
    marginTop: "4rem",
    paddingBottom: "4rem",
    paddingTop: "4rem",
    width: "100%"
});

function Brands() {
    const { t, i18n} = useTranslation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [showMore, setShowMore] = useState(false);

    const brands = [
        "Toyota", "Kia", "Mercedez", "Hyundai", "Mitsubishi", "Nissan", "BMW", "Ford",
        "Porsche", "Lexus", "Honda", "Suzuki", "MG", "Jetour", "Tesla", "Audi", "Mazda",
        "Chevorlet", "Dodge", "Jeep", "Ram", "Ferrari", "Isuzu", "RollsRoyce", "Peugeot",
        "Volkswagon", "Lamborghini", "Infiniti", "GMC", "McLaren"
    ];

    const visibleBrands = isMobile && !showMore ? brands.slice(0, 12) : brands;

    return (
        <BrandContainer sx={{ direction: i18n.language == "ar" && "rtl"}}>
            <Container>
                <Typography variant="h3" fontWeight="bold" textAlign="center" color="black">
                    {t("brands.popular")}
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "1rem",
                        marginTop: "1rem",
                        flexWrap: "wrap",
                        width: "100%"
                    }}
                >
                    {
                        visibleBrands.map((brand, index) => (
                            <Brand key={index} image={brand} name={ t(`brands.brandNames.${brand}`)} />
                        ))
                    }
                </Box>
                {isMobile && (
                    <Box textAlign="center" marginTop="2rem">
                        <Button variant="outlined" onClick={() => setShowMore(prev => !prev)} sx={{ color: "#B71C1C", borderColor: "#B71C1C", textTransform: "none"}}>
                            {showMore ? t("showLess") : t("showMore")}
                        </Button>
                    </Box>
                )}
            </Container>
        </BrandContainer>
    );
}

export default Brands;
