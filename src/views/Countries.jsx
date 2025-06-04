import {
    Box,
    Grid,
    Typography,
    Card,
    CardContent
} from "@mui/material";
import { useEffect, useState } from "react";
import Flag from 'react-world-flags';

const countries = [
    { name: 'UAE', arabicName: 'الإمارات العربية المتحدة', code: "", flag: "ae" },
    { name: 'Saudi Arab', arabicName: 'المملكة العربية السعودية', code: "sa", flag: "sa" },
    { name: 'Qatar', arabicName: 'قطر', code: "qtr", flag: "qa" },
    { name: 'Egypt', arabicName: 'مصر', code: "eg", flag: "eg" },
    { name: 'Syria', arabicName: 'سوريا', code: "syr", flag: "syr" },
    { name: 'USA', arabicName: "الولايات المتحدة الأمريكية", code: "us", flag: "us" }
];

export default function Country() {
    const [hoveredCountry, setHoveredCountry] = useState(null);

    useEffect(
        () => {
            localStorage.removeItem("selectedCountry")
        },
        []
    )

    return (
        <Box
            sx={{
                backgroundColor: "#fff",
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
                minHeight: "100vh",
                color: "white",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <Box sx={{ width: "100%", backgroundColor: "#fff", display: "flex", alignItems: 'center', justifyContent: "center", py: '1rem' }}>
                <img src={'/assets/images/logo.png'} style={{ width: "8rem" }} />
            </Box>
            <Grid container sx={{ width: "100%", "@media(max-width: 800px)": { display: "flex" } }}>
                {countries.map((country, index) => (
                    <Card
                        sx={{
                            width: "33.3%",
                            textAlign: "center",
                            cursor: "pointer",
                            borderRadius: 0,
                            height: "45vh",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "black",
                            position: "relative",
                            overflow: "hidden",
                            backgroundImage: `url(/assets/images/${country.code}.png)`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            "&::before": {
                                content: '""',
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                opacity: hoveredCountry === country.code ? 1 : 0,
                                transition: "opacity 0.5s ease",
                                zIndex: 1
                            },
                            "@media(max-width: 800px)": { width: "50%", minHeight: "30vh", height: "100%" }
                        }}
                        onClick={() => {
                            localStorage.setItem("selectedCountry", country.code),
                                window.location.href = `/${country.code}`
                        }}
                        onMouseEnter={() => setHoveredCountry(country.code)}
                        onMouseLeave={() => setHoveredCountry(null)}
                    >
                        <CardContent sx={{
                            position: "relative",
                            zIndex: 2,
                            transition: "background-color 0.5s ease",
                            padding: 3,
                            borderRadius: 2,
                            width: "15rem",
                            minWidth: "15rem",
                            maxWidth: "15rem",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            {
                                country.code == "syr" ?
                                    <img src={"/assets/images/syria-flag.png"} style={{ width: window.innerWidth <= 800 ? 50 : 200, height: window.innerWidth <= 800 ? 50 : 150, paddingBottom: 15, paddingTop: 15 }} />
                                    :
                                    <Flag code={country.flag} style={{ width: window.innerWidth <= 800 ? 50 : 200, height: window.innerWidth <= 800 ? 50 : 200 }} />
                            }
                            <Typography variant="h4" sx={{ color: '#fff', backgroundColor: "rgba(0, 0, 0, 0.6)", "@media(max-width: 800px)": { fontSize: "15px", width: "50%", textAlign: "center" } }}>
                                {country.name}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Grid>
        </Box>
    );
}