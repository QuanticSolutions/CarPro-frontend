import React, { useState, useEffect } from "react";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    FormGroup,
    FormControlLabel,
    Checkbox,
    TextField,
    Box,
    Divider,
    InputAdornment
} from "@mui/material";
import { styled } from "@mui/system"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import getFilterOptions from "./filterOptions";
import { getModels } from '../../api/consumer';

const StyledAccordion = styled(Accordion)({
    marginTop: "5px",
    marginBottom: "0px",
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

const ScrollableFormGroup = styled(FormGroup)({
    maxHeight: "200px",
    overflowY: "scroll",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
        width: "6px",
    },
    "&::-webkit-scrollbar-track": {
        background: "#f1f1f1",
        borderRadius: "3px",
    },
    "&::-webkit-scrollbar-thumb": {
        background: "#B71C1C",
        borderRadius: "3px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
        background: "#8B0000",
    },
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

const FilterSection = ({ filters, setFilters, title, filterData, showBrands, category }) => {

    const { t, i18n } = useTranslation();
    const [brandSearchTerm, setBrandSearchTerm] = useState("");
    const [showAllBrands, setShowAllBrands] = useState(false);

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

    const handleCheckboxChange = (event, label) => {
        const { name, checked } = event.target;
        console.log(name, checked, label)
        setFilters((prevFilters) => {

            const currentArray = prevFilters[name] || [];
            const updatedArray = checked
                ? [...currentArray, label]
                : currentArray.filter((item) => item !== label);

            console.log(updatedArray)
            return {
                ...prevFilters,
                [name]: updatedArray,
            };
        });
        filterData();
    };

    const handleBrandSearchChange = (event) => {
        setBrandSearchTerm(event.target.value);
        if (event.target.value) {
            setShowAllBrands(true);
        }
    };

    const getBrandAccordionContent = () => {
        const allBrands = Object.keys(t("models", { returnObjects: true }));
        const filteredBrands = brandSearchTerm
            ? allBrands.filter((brand) =>
                brand.toLowerCase().includes(brandSearchTerm.toLowerCase())
            )
            : allBrands;

        return (
            <>
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder={t("filters.search")}
                    fullWidth
                    value={brandSearchTerm}
                    onChange={handleBrandSearchChange}
                    sx={{
                        mb: 2,
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                                borderColor: "#ccc",
                            },
                            "&:hover fieldset": {
                                borderColor: "#B71C1C",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "#B71C1C",
                            },
                        },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: "#B71C1C" }} />
                            </InputAdornment>
                        ),
                    }}
                />

                <ScrollableFormGroup>
                    <Box display="flex" flexDirection="column">
                        {filteredBrands.map((brandKey) => (
                            <FormControlLabel
                                key={brandKey}
                                control={<Checkbox />}
                                checked={filters.brand?.includes(t(`models.${brandKey}`))}
                                name="brand"
                                label={t(`models.${brandKey}`)}
                                sx={{
                                    "& .Mui-checked": {
                                        color: "#B71C1C !important",
                                    },
                                }}
                                onChange={(event) => handleCheckboxChange(event, brandKey)}
                            />
                        ))}
                    </Box>
                </ScrollableFormGroup>
            </>
        );
    };

    return (
        <Box sx={BoxStyles}>
            <div
                style={{
                    background: "#fff",
                    color: "#B71C1C",
                    padding: "20px",
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
            <div style={{ display: "flex", padding: "10px", background: "#fff", justifyContent: "center", direction: i18n.language == "ar" && "rtl" }}>
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
                {
                    showBrands &&  category != "plates" && category != "boats" && category != "bikes" &&
                    <StyledAccordion defaultExpanded={false}>
                        <StyledSummary expandIcon={<ExpandMoreIcon />} sx={{ direction: i18n.language == "ar" && "rtl" }}>
                            <Typography fontFamily='"Franklin Gothic Demi", sans-serif'>{t("filters.filters.Brand")}</Typography>
                        </StyledSummary>
                        <StyledDetails sx={{ direction: i18n.language == "ar" && "rtl" }}>
                            {getBrandAccordionContent()}
                        </StyledDetails>
                    </StyledAccordion>
                }

                {
                    getFilterOptions(category, t).map((filter, index) => (
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
            {
                category == "plates" || category == "boats" ?
                <StyledAccordion defaultExpanded={false}>
                    <StyledSummary expandIcon={<ExpandMoreIcon />} sx={{ direction: i18n.language == "ar" && "rtl" }}>
                        <Typography fontFamily='"Franklin Gothic Demi", sans-serif'>{t("filters.filters.Length")}</Typography>
                    </StyledSummary>
                    <StyledDetails sx={{ direction: i18n.language == "ar" && "rtl" }}>
                        <div style={{ display: "flex", gap: 5 }}>
                            <TextField variant="outlined" size="small" placeholder={t("filters.from")} name="fromLength" onChange={handleChange} />
                            <TextField variant="outlined" size="small" placeholder={t("filters.to")} name="toLength" onChange={handleChange} />
                        </div>
                    </StyledDetails>
                </StyledAccordion>
                :
                <></>
            }
            {
                category != "plates" && category != "boats" &&
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
            }
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