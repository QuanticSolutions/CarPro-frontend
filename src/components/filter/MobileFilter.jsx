import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  Drawer,
  FormControlLabel,
  FormGroup,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
  Divider,
  Badge,
  styled
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useTranslation } from 'react-i18next';

// Styled components
const DrawerHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1, 2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const FilterOptionContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[50],
}));

const DrawerFooter = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  position: 'sticky',
  bottom: 0,
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
  zIndex: 1,
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
  },
}));

const MobileFilterDrawer = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expandedFilter, setExpandedFilter] = useState(null);
  const { t, i18n } = useTranslation();
  const [filters, setFilters] = useState({
    city: [],
    brand: [],
    transmission: [],
    exteriorColor: [],
    body: [],
    doors: [],
    fuelType: [],
    price: { min: '', max: '' },
    mileage: { min: '', max: '' },
    year: { min: '', max: '' }
  });

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
    if (!drawerOpen) setExpandedFilter(null);
  };

  const toggleFilterExpansion = (filterId) => {
    setExpandedFilter(expandedFilter === filterId ? null : filterId);
  };

  const handleCheckboxChange = (filterId, option) => {
    const updatedFilters = { ...filters };

    if (updatedFilters[filterId].includes(option)) {
      updatedFilters[filterId] = updatedFilters[filterId].filter(item => item !== option);
    } else {
      updatedFilters[filterId] = [...updatedFilters[filterId], option];
    }

    setFilters(updatedFilters);
  };

  // Handle range filter changes
  const handleRangeChange = (filterId, bound, value) => {
    setFilters({
      ...filters,
      [filterId]: {
        ...filters[filterId],
        [bound]: value
      }
    });
  };

  // Apply filters and close drawer
  const applyFilters = () => {
    // Here you would implement logic to filter data based on selected filters
    console.log("Applying filters:", filters);
    setDrawerOpen(false);
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      city: [],
      brand: [],
      transmission: [],
      exteriorColor: [],
      body: [],
      doors: [],
      fuelType: [],
      price: { min: '', max: '' },
      mileage: { min: '', max: '' },
      year: { min: '', max: '' }
    });
  };

  const getActiveFilterCount = (filterId) => {
    if (['price', 'mileage', 'year'].includes(filterId)) {
      return (filters[filterId].min ? 1 : 0) + (filters[filterId].max ? 1 : 0);
    }
    return filters[filterId].length;
  };

  const filterCategories = [
    {
      id: "city",
      label: t("filters.filters.City"),
      type: "checkbox",
      options: [
        "Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Fujairah", "Al Ain", "Umm Al Qwain"
      ].map(city => t(`filters.options.${city}`))
    },
    {
      id: "brand",
      label: t("filters.filters.Brand"),
      type: "checkbox",
      options: ["Mercedes-Benz", "Mitsubishi", "Peugeot"].map(brand => t(`filters.options.${brand}`)),

    },
    {
      id: "transmission",
      label: t("filters.filters.Transmission"),
      type: "checkbox",
      options: ["Automatic", "Manual"].map(option => t(`filters.options.${option}`)),

    },
    {
      id: "exteriorColor",
      label: t("filters.filters.Exterior Color"),
      type: "checkbox",
      options: ["White", "Black", "Silver", "Blue", "Gold"].map(color => t(`filters.options.${color}`)),

    },
    {
      id: "body",
      label: t("filters.filters.Body"),
      type: "checkbox",
      options: [
        "Crossover", "SUV", "Sedan", "Coupe", "Hard Top Convertible", "Pick Up Truck"
      ].map(body => t(`filters.options.${body}`))
    },
    {
      id: "doors",
      label: t("filters.filters.Doors"),
      type: "checkbox",
      options: ["2", "4", "6"].map(door => t(`filters.options.${door}`)),

    },
    {
      id: "fuelType",
      label: t("filters.filters.Fuel Type"),
      type: "checkbox",
      options: ["Diesel", "Electric", "Gasoline"].map(ft => t(`filters.options.${ft}`)),

    },
    {
      id: "price",
      label: t("filters.filters.Price"),
      type: "range"
    },
    {
      id: "mileage",
      label: t("filters.filters.Mileage"),
      type: "range"
    },
    {
      id: "year",
      label: t("filters.filters.Year"),
      type: "range"
    }
  ];

  return (
    <Box sx={{ width: '100%', display: { xs: 'block', md: 'none' }, direction: i18n.language == "ar" && "rtl" }}>

      <Button
        variant="contained"
        onClick={toggleDrawer}
        fullWidth
        sx={{
          backgroundColor: '#B71C1C',
          textTransform: "none",
          '&:hover': {
            backgroundColor: '#9a1515',
          },
          py: 1.5,
          borderRadius: 1,
          mb: 2,
        }}
      >
        <FilterAltIcon />
        &nbsp;
        {t('filter.advancedFilter')}
      </Button>

      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            maxHeight: '85vh',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }
        }}
      >

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

        <DrawerHeader sx={{ direction: i18n.language == "ar" && "rtl" }}>
          <Typography variant="h6" fontFamily='"Franklin Gothic Demi", sans-serif' sx={{ color: '#B71C1C' }}>
            {t("filters.filterHeading")}
          </Typography>
          <Box>
            <Button
              color="inherit"
              onClick={resetFilters}
              sx={{ mr: 1, textTransform: 'none' }}
            >
              {t('filters.Reset')}
            </Button>
            <IconButton size="small" edge="end" onClick={toggleDrawer}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DrawerHeader>

        <List sx={{ pb: 8, px:1, direction: i18n.language == "ar" && "rtl" }}>
          {filterCategories.map((category) => (
            <React.Fragment key={category.id}>
              <ListItem disablePadding sx={{ direction: i18n.language == "ar" && "rtl" }}>
                <ListItemButton
                  onClick={() => toggleFilterExpansion(category.id)}
                  sx={{ p: 2 }}
                >
                  <StyledBadge
                    badgeContent={getActiveFilterCount(category.id)}
                    invisible={getActiveFilterCount(category.id) === 0}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <ListItemText
                      primary={category.label}
                      primaryTypographyProps={{
                        fontWeight: 'medium',
            
                      }}
                    />
                  </StyledBadge>
                  {expandedFilter === category.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItemButton>
              </ListItem>

              <Collapse in={expandedFilter === category.id} timeout="auto" unmountOnExit>
                <FilterOptionContainer>
                  {category.type === "checkbox" && (
                    <FormGroup>
                      {category.options.map((option) => (
                        <FormControlLabel
                          key={option}
                          control={
                            <Checkbox
                              checked={filters[category.id].includes(option)}
                              onChange={() => handleCheckboxChange(category.id, option)}
                              sx={{
                                color: "#9e9e9e",
                                '&.Mui-checked': {
                                  color: "#B71C1C",
                                },
                              }}
                            />
                          }
                          label={option}
                        />
                      ))}
                    </FormGroup>
                  )}

                  {category.type === "range" && (
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <TextField
                        fullWidth
                        label={t("filters.from")}
                        variant="outlined"
                        size="small"
                        type="number"
                        value={filters[category.id].min}
                        onChange={(e) => handleRangeChange(category.id, "min", e.target.value)}
                      />
                      <TextField
                        fullWidth
                        label={t("filters.to")}
                        variant="outlined"
                        size="small"
                        type="number"
                        value={filters[category.id].max}
                        onChange={(e) => handleRangeChange(category.id, "max", e.target.value)}
                      />
                    </Box>
                  )}
                </FilterOptionContainer>
              </Collapse>
              <Divider />
            </React.Fragment>
          ))}
        </List>
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
            Apply Filters
          </Button>
        </DrawerFooter>
      </Drawer>
    </Box>
  );
};

export default MobileFilterDrawer;