import React from "react";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    FormGroup,
    FormControlLabel,
    Checkbox,
    TextField,
    Button,
    Box,
    Divider
} from "@mui/material";
import { styled } from "@mui/system"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTranslation } from "react-i18next";

const StyledAccordion = styled(Accordion)({
    marginTop: "5px",
    marginBottom: "0px",
    boxShadow: "none",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    "&:before": {
        display: "none",
    }
});

const StyledSummary = styled(AccordionSummary)({
    minHeight: "40px",
    "&.Mui-expanded": {
        minHeight: "40px",
    },
    padding: "0 16px",
});

const StyledDetails = styled(AccordionDetails)({
    padding: "8px 16px",
});

const StyledDivider = styled(Divider)({
    margin: "0",
});

const BoxStyles = {
    width: 300,
    height: "min-content",
    borderRadius: "8px",
    "@media (max-width: 768px)": {
        width: "60%",
    },
    "@media (max-width: 700px)": {
        width: "100%",
    },
}

const FilterSection = ({ filters, setFilters, title, filterData }) => {


    const { t, i18n } = useTranslation();


    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name !== "search") {
            setFilters((prevFilters) => ({
                ...prevFilters,
                [name]: value,
            }));
        }
        else {
            setFilters((prevFilters) => ({
                ...prevFilters,
                "keyword": value,
            }));
        }
    };

    const handleSearch = (value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            "keyword": value,
        }));
    };

    const handleCondition = (value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            "vehicle_condition": value,
        }));
    };

    const handleBtnClick = (name, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
        filterData();
    };

    const handleCheckboxChange = (event, label) => {
        const { name, checked } = event.target;
        setFilters((prevFilters) => {

            const currentArray = prevFilters[name] || [];

            const updatedArray = checked
                ? [...currentArray, label]
                : currentArray.filter((item) => item !== label);

            return {
                ...prevFilters,
                [name]: updatedArray,
            };
        });
        filterData();
    };


    return (
        <Box sx={BoxStyles}>
            <div
                style={{
                    background: "#fff",
                    color: "#B71C1C",
                    padding: "20px",
                    textAlign: "left",
                    fontWeight: "bold",
                    borderTopRightRadius: "8px",
                    borderTopLeftRadius: "8px",
                    textAlign: i18n.language == "ar" && "right"
                }}
            >
                {t("showResultsBy")}
            </div>
            <div style={{ display: "flex", paddingLeft: "20px", paddingRight: "20px", background: "#fff" }}>
                <TextField
                    variant="outlined"
                    placeholder={t("filters.search")}
                    size="small"
                    fullWidth
                    name="search"
                    onChange={handleChange}
                    sx={{
                        transform: i18n.language == "ar" && "rotateY(180deg)",
                        "& .MuiOutlinedInput-root": { transform: i18n.language == "ar" && "rotateY(180deg)" },
                        "& .MuiOutlinedInput-input": {
                            textAlign: i18n.language == "ar" && "right",
                        }
                    }}
                />
            </div>
            <div style={{ display: "flex", padding: "10px", background: "#fff", justifyContent: "center" }}>
                <div style={{ cursor: "pointer", borderBottom: filters.vehicle_condition == "New" ? "2px solid #B71C1C" : "" }} onClick={() => { if (filters.vehicle_condition != "New") { handleCondition("New") } else { handleCondition("") } }}>
                    <img src={"/assets/images/car-icon.png"} width={80} />
                    <Typography variant="body1" textAlign={"center"}>{t("filters.vehicleCondition.New")}</Typography>
                </div>
                <div style={{ cursor: "pointer", borderBottom: filters.vehicle_condition == "Used" && "2px solid #B71C1C" }} onClick={() => { if (filters.vehicle_condition != "Used") { handleCondition("Used") } else { handleCondition("") } }}>
                    <img src={"/assets/images/car-icon.png"} width={80} />
                    <Typography variant="body1" textAlign={"center"}>{t("filters.vehicleCondition.Used")}</Typography>
                </div>
                <div style={{ cursor: "pointer", borderBottom: filters.vehicle_condition == "Pre" && "2px solid #B71C1C" }} onClick={() => { if (filters.vehicle_condition != "Pre") { handleCondition("Pre") } else { handleCondition("") } }}>
                    <img src={"/assets/images/car-icon.png"} width={80} />
                    <Typography variant="body1" textAlign={"center"}>{t("filters.vehicleCondition.Pre")}</Typography>
                </div>
            </div>
            <StyledDivider />
            <Box>
                {[
                    {
                        title: t("filters.filters.City"),
                        options: [
                            "Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Fujairah", "Al Ain", "Umm Al Qwain"
                        ].map(city => t(`filters.options.${city}`)),
                        field: "city"
                    },
                    {
                        title: t("filters.filters.Brand"),
                        options: ["Mercedes-Benz", "Mitsubishi", "Peugeot"].map(brand => t(`filters.options.${brand}`)),
                        field: "brand"
                    },
                    {
                        title: t("filters.filters.Transmission"),
                        options: ["Automatic", "Manual"].map(option => t(`filters.options.${option}`)),
                        field: "transmission"
                    },
                    {
                        title: t("filters.filters.Exterior Color"),
                        options: ["White", "Black", "Silver", "Blue", "Gold"].map(color => t(`filters.options.${color}`)),
                        field: "exteriorColor"
                    },
                    {
                        title: t("filters.filters.Body"),
                        options: [
                            "Crossover", "SUV", "Sedan", "Coupe", "Hard Top Convertible", "Pick Up Truck"
                        ].map(body => t(`filters.options.${body}`)),
                        field: "body"
                    },
                    {
                        title: t("filters.filters.Doors"),
                        options: ["2", "4", "6"].map(door => t(`filters.options.${door}`)),
                        field: "doors"
                    },
                    {
                        title: t("filters.filters.Seller Type"),
                        options: ["Owner", "Dealer"].map(type => t(`filters.options.${type}`)),
                        field: "sellerType"
                    },
                    {
                        title: t("filters.filters.Seats"),
                        options: ["2", "4", "5", "6", "7", "8"].map(seat => t(`filters.options.${seat}`)),
                        field: "seats"
                    },
                    {
                        title: t("filters.filters.Steering Wheel"),
                        options: ["Right", "Left"].map(sw => t(`filters.options.${sw}`)),
                        field: "steeringWheel"
                    }
                ].map((filter, index) => (
                    <React.Fragment key={index}>
                        <StyledAccordion defaultExpanded={false}>
                            <StyledSummary expandIcon={<ExpandMoreIcon />} sx={{ direction: i18n.language == "ar" && "rtl" }}>
                                <Typography fontFamily='"Franklin Gothic Demi", sans-serif'>{filter.title}</Typography>
                            </StyledSummary>
                            <StyledDetails sx={{ direction: i18n.language == "ar" && "rtl" }}>
                                <FormGroup>
                                    {filter.options.map((option, idx) => (
                                        <FormControlLabel
                                            key={idx}
                                            control={<Checkbox />}
                                            checked={filters[filter.field]?.includes(option)}
                                            name={filter.field}
                                            label={option}
                                            fontFamily='"Franklin Gothic Demi", sans-serif'
                                            sx={{
                                                "& .Mui-checked": {
                                                    color: "#B71C1C !important",
                                                },
                                                "&.Mui-checked": {
                                                    color: "#B71C1C !important",
                                                },
                                            }}
                                            onChange={(event) => handleCheckboxChange(event, option)}
                                        />
                                    ))}
                                </FormGroup>
                            </StyledDetails>
                        </StyledAccordion>
                    </React.Fragment>
                ))}
            </Box>
            
            <StyledAccordion defaultExpanded={false}>
                <StyledSummary expandIcon={<ExpandMoreIcon />} sx={{ direction: i18n.language == "ar" && "rtl" }}>
                    <Typography fontFamily='"Franklin Gothic Demi", sans-serif'>{t("filters.filters.Price")}</Typography>
                </StyledSummary>
                <StyledDetails sx={{ direction: i18n.language == "ar" && "rtl" }}>
                    <div style={{ display: "flex", gap: 5 }}>
                        <TextField variant="outlined" size="small" label={t("filters.from")} name="fromPrice" onChange={handleChange} />
                        <TextField variant="outlined" size="small" placeholder={t("filters.to")} name="toPrice" onChange={handleChange} />
                    </div>
                </StyledDetails>
            </StyledAccordion>
            <StyledDivider />
            <StyledAccordion defaultExpanded={false}>
                <StyledSummary expandIcon={<ExpandMoreIcon />} sx={{ direction: i18n.language == "ar" && "rtl" }}>
                    <Typography fontFamily='"Franklin Gothic Demi", sans-serif'>{t("filters.filters.Mileage")}</Typography>
                </StyledSummary>
                <StyledDetails sx={{ direction: i18n.language == "ar" && "rtl" }}>
                    <div style={{ display: "flex", gap: 5 }}>
                        <TextField variant="outlined" size="small" placeholder={t("filters.from")} name="fromMiles" onChange={handleChange} />
                        <TextField variant="outlined" size="small" placeholder={t("filters.to")} name="toMiles" onChange={handleChange} />
                    </div>
                </StyledDetails>
            </StyledAccordion>
            <StyledDivider />
            <StyledAccordion defaultExpanded={false}>
                <StyledSummary expandIcon={<ExpandMoreIcon />} sx={{ direction: i18n.language == "ar" && "rtl" }}>
                    <Typography fontFamily='"Franklin Gothic Demi", sans-serif'>{t("filters.filters.Year")}</Typography>
                </StyledSummary>
                <StyledDetails sx={{ direction: i18n.language == "ar" && "rtl" }}>
                    <div style={{ display: "flex", gap: 5 }}>
                        <TextField variant="outlined" size="small" placeholder={t("filters.from")} name="fromYear" onChange={handleChange} />
                        <TextField variant="outlined" size="small" placeholder={t("filters.to")} name="toYear" onChange={handleChange} />
                    </div>
                </StyledDetails>
            </StyledAccordion>
        </Box>
    );
};

export default FilterSection;