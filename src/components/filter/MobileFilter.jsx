import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  Drawer,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  Paper,
  Tabs,
  Tab,
  TextField,
  Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useTranslation } from "react-i18next";

// Styled components
const FilterChip = styled(Chip)(({ theme, active }) => ({
  borderRadius: 20,
  margin: theme.spacing(0.5),
  backgroundColor: active ? theme.palette.error.main : theme.palette.background.paper,
  color: active ? theme.palette.common.white : theme.palette.text.primary,
  borderColor: active ? theme.palette.error.main : theme.palette.divider,
  '&:hover': {
    backgroundColor: active ? theme.palette.error.dark : theme.palette.action.hover,
  },
  '& .MuiChip-label': {
    padding: '0 12px',
  }
}));

const FilterButton = styled(Button)(({ theme, active }) => ({
  borderRadius: 20,
  margin: theme.spacing(0.5),
  backgroundColor: active ? theme.palette.error.main : theme.palette.background.paper,
  color: active ? theme.palette.common.white : theme.palette.text.primary,
  border: `1px solid ${active ? theme.palette.error.main : theme.palette.divider}`,
  textTransform: 'none',
  padding: '6px 16px',
  minWidth: 'auto',
  whiteSpace: 'nowrap',
  '&:hover': {
    backgroundColor: active ? theme.palette.error.dark : theme.palette.action.hover,
  },
}));

const DrawerHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1, 2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const FilterOptionContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const DrawerFooter = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  position: 'sticky',
  bottom: 0,
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const VehicleConditionOption = styled(Box)(({ theme, selected }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(1),
  cursor: 'pointer',
  borderBottom: selected ? `2px solid ${theme.palette.error.main}` : '2px solid transparent',
}));

const SlideableTabsContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  overflowX: 'auto',
  display: 'flex',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  padding: theme.spacing(1, 0),
}));

const MobileFilterSection = ({ filters, setFilters, filterData }) => {
  const { t, i18n } = useTranslation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  const [tempFilters, setTempFilters] = useState({...filters});
  
  const filterCategories = [
    { id: "search", label: t("filters.search"), type: "search" },
    { id: "vehicle_condition", label: t("filters.filters.Condition"), type: "condition" },
    { id: "city", label: t("filters.filters.City"), type: "checkbox", 
      options: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Fujairah", "Al Ain", "Umm Al Qwain"] },
    { id: "brand", label: t("filters.filters.Brand"), type: "checkbox", 
      options: ["Mercedes-Benz", "Mitsubishi", "Peugeot"] },
    { id: "transmission", label: t("filters.filters.Transmission"), type: "checkbox", 
      options: ["Automatic", "Manual"] },
    { id: "exteriorColor", label: t("filters.filters.Exterior Color"), type: "checkbox", 
      options: ["White", "Black", "Silver", "Blue", "Gold"] },
    { id: "body", label: t("filters.filters.Body"), type: "checkbox", 
      options: ["Crossover", "SUV", "Sedan", "Coupe", "Hard Top Convertible", "Pick Up Truck"] },
    { id: "doors", label: t("filters.filters.Doors"), type: "checkbox", 
      options: ["2", "4", "6"] },
    { id: "sellerType", label: t("filters.filters.Seller Type"), type: "checkbox", 
      options: ["Owner", "Dealer"] },
    { id: "seats", label: t("filters.filters.Seats"), type: "checkbox", 
      options: ["2", "4", "5", "6", "7", "8"] },
    { id: "steeringWheel", label: t("filters.filters.Steering Wheel"), type: "checkbox", 
      options: ["Right", "Left"] },
    { id: "price", label: t("filters.filters.Price"), type: "range" },
    { id: "mileage", label: t("filters.filters.Mileage"), type: "range" },
    { id: "year", label: t("filters.filters.Year"), type: "range" },
  ];

  // Handle opening drawer with specific filter
  const openFilterDrawer = (filterId) => {
    setTempFilters({...filters});
    setActiveFilter(filterId);
    setDrawerOpen(true);
  };

  // Close drawer
  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  // Apply filter changes
  const applyFilters = () => {
    setFilters(tempFilters);
    filterData();
    closeDrawer();
  };

  // Reset current filter
  const resetCurrentFilter = () => {
    if (activeFilter === "search") {
      setTempFilters({...tempFilters, keyword: ""});
    } else if (activeFilter === "vehicle_condition") {
      setTempFilters({...tempFilters, vehicle_condition: ""});
    } else if (["price", "mileage", "year"].includes(activeFilter)) {
      const fromKey = `from${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}`;
      const toKey = `to${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}`;
      setTempFilters({...tempFilters, [fromKey]: "", [toKey]: ""});
    } else {
      setTempFilters({...tempFilters, [activeFilter]: []});
    }
  };

  // Handle text field changes
  const handleTextChange = (event) => {
    const { name, value } = event.target;
    if (name === "search") {
      setTempFilters({...tempFilters, keyword: value});
    } else {
      setTempFilters({...tempFilters, [name]: value});
    }
  };

  // Handle checkbox changes
  const handleCheckboxChange = (filterId, option, checked) => {
    const currentArray = tempFilters[filterId] || [];
    const updatedArray = checked
      ? [...currentArray, option]
      : currentArray.filter(item => item !== option);
    
    setTempFilters({...tempFilters, [filterId]: updatedArray});
  };

  // Handle vehicle condition selection
  const handleConditionSelect = (condition) => {
    setTempFilters({
      ...tempFilters, 
      vehicle_condition: tempFilters.vehicle_condition === condition ? "" : condition
    });
  };

  // Count active filters for a category
  const getFilterCount = (filterId) => {
    if (filterId === "search" && filters.keyword) {
      return 1;
    } else if (filterId === "vehicle_condition" && filters.vehicle_condition) {
      return 1;
    } else if (["price", "mileage", "year"].includes(filterId)) {
      const fromKey = `from${filterId.charAt(0).toUpperCase() + filterId.slice(1)}`;
      const toKey = `to${filterId.charAt(0).toUpperCase() + filterId.slice(1)}`;
      return (filters[fromKey] || filters[toKey]) ? 1 : 0;
    } else {
      return filters[filterId]?.length || 0;
    }
  };

  // Check if a filter is active
  const isFilterActive = (filterId) => {
    return getFilterCount(filterId) > 0;
  };

  // Render filter options based on type
  const renderFilterOptions = () => {
    if (!activeFilter) return null;
    
    const filterConfig = filterCategories.find(f => f.id === activeFilter);
    if (!filterConfig) return null;

    switch (filterConfig.type) {
      case "search":
        return (
          <FilterOptionContainer>
            <TextField
              fullWidth
              variant="outlined"
              placeholder={t("filters.search")}
              name="search"
              value={tempFilters.keyword || ""}
              onChange={handleTextChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                direction: i18n.language === "ar" ? "rtl" : "ltr",
              }}
            />
          </FilterOptionContainer>
        );
      
      case "condition":
        return (
          <FilterOptionContainer>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', py: 2 }}>
              {["New", "Used", "Pre"].map((condition) => (
                <VehicleConditionOption
                  key={condition}
                  selected={tempFilters.vehicle_condition === condition}
                  onClick={() => handleConditionSelect(condition)}
                >
                  <Box sx={{ mb: 1 }}>
                    <img src="/assets/images/car-icon.png" width={70} alt={condition} />
                  </Box>
                  <Typography variant="body2">{t(`filters.vehicleCondition.${condition}`)}</Typography>
                </VehicleConditionOption>
              ))}
            </Box>
          </FilterOptionContainer>
        );
      
      case "checkbox":
        return (
          <FilterOptionContainer>
            <FormGroup>
              {filterConfig.options.map((option) => (
                <FormControlLabel
                  key={option}
                  control={
                    <Checkbox
                      checked={(tempFilters[activeFilter] || []).includes(option)}
                      onChange={(e) => handleCheckboxChange(activeFilter, option, e.target.checked)}
                      sx={{
                        color: "#9e9e9e",
                        '&.Mui-checked': {
                          color: "#B71C1C",
                        },
                      }}
                    />
                  }
                  label={t(`filters.options.${option}`)}
                  sx={{
                    direction: i18n.language === "ar" ? "rtl" : "ltr",
                  }}
                />
              ))}
            </FormGroup>
          </FilterOptionContainer>
        );
      
      case "range":
        return (
          <FilterOptionContainer>
            <Box sx={{ 
              display: 'flex', 
              gap: 2,
              direction: i18n.language === "ar" ? "rtl" : "ltr"
            }}>
              <TextField
                fullWidth
                label={t("filters.from")}
                variant="outlined"
                size="small"
                type="number"
                name={`from${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}`}
                value={tempFilters[`from${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}`] || ""}
                onChange={handleTextChange}
              />
              <TextField
                fullWidth
                label={t("filters.to")}
                variant="outlined"
                size="small"
                type="number"
                name={`to${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}`}
                value={tempFilters[`to${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}`] || ""}
                onChange={handleTextChange}
              />
            </Box>
          </FilterOptionContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: '100%', display: { xs: 'block', md: 'none' } }}>
      {/* Slideable filter buttons */}
      <Paper elevation={1} sx={{ my: 1 }}>
        <SlideableTabsContainer>
          {filterCategories.map((filter) => (
            <FilterButton
              key={filter.id}
              active={isFilterActive(filter.id)}
              onClick={() => openFilterDrawer(filter.id)}
              startIcon={filter.id === "search" ? <SearchIcon /> : null}
              endIcon={isFilterActive(filter.id) ? (
                <Chip 
                  size="small" 
                  label={getFilterCount(filter.id)} 
                  sx={{ 
                    backgroundColor: 'white', 
                    color: '#B71C1C',
                    height: 20,
                    minWidth: 20,
                    fontSize: '0.75rem'
                  }}
                />
              ) : null}
            >
              {filter.label}
            </FilterButton>
          ))}
        </SlideableTabsContainer>
      </Paper>

      {/* Bottom drawer */}
      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={closeDrawer}
        PaperProps={{
          sx: {
            maxHeight: '85vh',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }
        }}
      >
        {/* Drawer handle/puller */}
        <Box 
          sx={{ 
            width: 40, 
            height: 5, 
            backgroundColor: '#ddd', 
            borderRadius: 3,
            mx: 'auto',
            my: 1
          }} 
        />
        
        {/* Drawer header */}
        <DrawerHeader>
          <Typography variant="h6" fontFamily='"Franklin Gothic Demi", sans-serif' sx={{ color: '#B71C1C' }}>
            {filterCategories.find(f => f.id === activeFilter)?.label}
          </Typography>
          <Box>
            <Button 
              color="inherit"
              onClick={resetCurrentFilter}
              sx={{ mr: 1, textTransform: 'none' }}
            >
              {t("filters.reset")}
            </Button>
            <IconButton size="small" edge="end" onClick={closeDrawer}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DrawerHeader>

        {/* Drawer content */}
        <Box sx={{ mb: 8 }}>
          {renderFilterOptions()}
        </Box>

        {/* Drawer footer with apply button */}
        <DrawerFooter>
          <Button
            fullWidth
            variant="contained"
            onClick={applyFilters}
            sx={{
              backgroundColor: '#B71C1C',
              '&:hover': {
                backgroundColor: '#9a1515',
              },
              py: 1.5,
              borderRadius: 1,
            }}
          >
            {t("filters.apply")}
          </Button>
        </DrawerFooter>
      </Drawer>
    </Box>
  );
};

export default MobileFilterSection;