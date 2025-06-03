import { useState } from 'react'
import { Grid2, TextField, Button, Box } from '@mui/material'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import { styled } from "@mui/system"
import CustomSelect from '../../utils/Select'
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next'

const Filters = styled(Grid2)({
    display: "flex",
    maxWidth: "100%",
    position: "absolute",
    bottom: 45,
    width: "100%",
    alignItems: "center",
    paddingBottom: "1rem",
    flexDirection: "column",
    "@media (max-width: 1024px)": {
        textAlign: "center",
        paddingLeft: "1rem",
        paddingRight: "1rem"
    }
})

const FiltersForm = styled(Grid2)({
    display: "flex",
    paddingTop: "2rem",
    width: "100%",
    "@media (max-width: 786px)": {
        justifyContent: "center",
        flexDirection: "column",
        gap: "3px"
    },
})

const StyledTextField = styled(TextField)({
    backgroundColor: "white",
    borderRadius: "8px",
    width: "13rem",
    minHeight: "3rem",
    maxHeight: "5rem",
    borderTopRightRadius: "0",
    borderBottomRightRadius: "0",
    color: "#000000",
    "@media (max-width: 786px)": {
        width: "100%",
        "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
        },
        "& ::placeholder": {
            textAlign: "center",
        }
    },
    "& .MuiOutlinedInput-root": {
        borderTopRightRadius: "0",
        borderBottomRightRadius: "0",
    },
    "& ::placeholder": {
        color: "black !important",
        opacity: "1 !important",
    },
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#B71C1C !important",
    },
})

const StyledSelectField = {
    textField: {
        backgroundColor: "white",
        borderRadius: "0",
        width: "8rem",
        "& .MuiOutlinedInput-root": {
            borderRadius: "0",
        },
        "& ::placeholder": {
            color: "black !important",
            opacity: "1 !important",
        },
        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#B71C1C !important",
        },
    },
}

const FilterBtn = styled(Button)({
    width: "4rem",
    backgroundColor: "#B71C1C",
    borderTopLeftRadius: "0",
    borderBottomLeftRadius: "0",
    textTransform: "none",
    color: "#fff",
    fontSize: "1.1rem",
    "@media (max-width: 786px)": {
        width: "100%",
        borderRadius: "8px",
    },
})

function FilterForm() {

    const [data, setData] = useState({
        make: null,
        city: null,
        vehicle: null,
        type: null
    })

    const countries = {
        "": "UAE",
        "sa": "Saudi Arabia",
        "qtr": "Qatar",
        "syr": "Syria",
        "us": "USA",
        "eg": "Egypt"
    };

    const { t, i18n } = useTranslation();

    const cityOptions = t(`cities.${countries[localStorage.getItem("selectedCountry")]}`, { returnObjects: true })
        .map((city) => ({ name: city, value: city }))

    const vehicleOptions = [
        { name: t("filter.vehicles.cars"), value: "cars" },
        { name: t("filter.vehicles.bikes"), value: "bikes" },
        { name: t("filter.vehicles.heavy"), value: "heavy" },
        { name: t("filter.vehicles.construction"), value: "construction" },
        { name: t("filter.vehicles.boats"), value: "boats" },
    ]
    const typeOptions = [
        { name: t("filter.types.new"), value: "New" },
        { name: t("filter.types.used"), value: "Used" },
        { name: t("filter.types.pre"), value: "Pre" },
    ]

    return (
        <Filters>
            <FiltersForm size={{ md: 6, xs: 6 }} sx={{ flexDirection: i18n.language == "ar" && "row-reverse" }}>
                <StyledTextField
                    placeholder={t("filter.makePlaceholder")}
                    name="make"
                    variant="outlined"
                    value={data.make}
                    onChange={(e) => { setData({ ...data, make: e.target.value }) }}
                    sx={{
                        transform: i18n.language == "ar" && "rotateY(180deg)",
                        "& .MuiOutlinedInput-root": { transform: i18n.language == "ar" && "rotateY(180deg)" },
                        "& .MuiOutlinedInput-input": {
                            textAlign: i18n.language == "ar" && "right",
                        },
                    }}
                />
                <CustomSelect options={cityOptions} styles={{ textField: { ...StyledSelectField.textField, width: "12rem" } }} placeholder={t("filter.city")} onChange={(value) => setData({ ...data, city: value })} />
                <CustomSelect options={vehicleOptions} styles={{ textField: { ...StyledSelectField.textField, width: "12rem" } }} placeholder={t("filter.vehicle")} onChange={(value) => setData({ ...data, vehicle: value })} />
                <CustomSelect options={typeOptions} styles={StyledSelectField} placeholder={t("filter.type")} onChange={(value) => setData({ ...data, type: value })} />
                <FilterBtn onClick={() => window.location.href = `/ads?make=${data.make}&location=${data.city}&vehicle=${data.vehicle}&type=${data.type}`} sx={{ transform: i18n.language == "ar" && "rotateY(180deg)", "& .MuiOutlinedInput-root": { transform: i18n.language == "ar" && "rotateY(180deg)" } }}>
                    <SearchIcon />
                </FilterBtn>
            </FiltersForm>
            <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 3 }}>
                <Button  sx={{ border: "3px solid #B71C1C", background: "#B71C1C", fontWeight: "bold", color: "#fff", borderRadius: "5px", width: "12rem", marginTop: "1rem", display: "flex", flexDirection: i18n.language == "ar" && "row-reverse" }} onClick={() => window.location.href = `/ads`}>
                    {t("filter.advancedFilter")}
                    {
                        i18n.language == "ar" ?
                            <ArrowLeftIcon /> :
                            <ArrowRightIcon />
                    }
                </Button>
            </Box>
        </Filters>
    )
}

export default FilterForm