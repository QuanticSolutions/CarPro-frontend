import React, { useState, useEffect } from 'react';
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
  styled,
  InputAdornment
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import { getModels } from '../../api/consumer';

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

const MobileFilterDrawer = ({ showBrands }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expandedFilter, setExpandedFilter] = useState(null);
  const [modelOptions, setModelOptions] = useState([]);
  const [brandSearchQuery, setBrandSearchQuery] = useState('');
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

  useEffect(
    () => {
      getModels().then(
        (response) => {
          setModelOptions(response.map(model => (model.make)))
        }
      )
    },
    []
  )

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
    if (!drawerOpen) {
      setExpandedFilter(null);
      setBrandSearchQuery(''); // Reset search when closing drawer
    }
  };

  const toggleFilterExpansion = (filterId) => {
    setExpandedFilter(expandedFilter === filterId ? null : filterId);
    if (filterId !== 'brand') {
      setBrandSearchQuery(''); // Reset brand search when switching to other filters
    }
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

  const handleRangeChange = (filterId, bound, value) => {
    setFilters({
      ...filters,
      [filterId]: {
        ...filters[filterId],
        [bound]: value
      }
    });
  };

  const applyFilters = () => {
    console.log("Applying filters:", filters);
    setDrawerOpen(false);
  };

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
    setBrandSearchQuery('');
  };

  const getActiveFilterCount = (filterId) => {
    if (['price', 'mileage', 'year'].includes(filterId)) {
      return (filters[filterId].min ? 1 : 0) + (filters[filterId].max ? 1 : 0);
    }
    return filters[filterId].length;
  };

  
  const getBrandAccordionContent = () => {
    const allBrands = Object.keys(t("models", { returnObjects: true }));
    const filteredBrands = brandSearchQuery
      ? allBrands.filter((brand) =>
        brand.toLowerCase().includes(brandSearchQuery.toLowerCase())
      )
      : allBrands;

    return filteredBrands
  };
  
  
  // Filter brands based on search query
  const filteredBrandOptions = modelOptions.filter(option =>
    option.toLowerCase().includes(brandSearchQuery.toLowerCase())
  );
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

        <List sx={{ pb: 8, px: 1, direction: i18n.language == "ar" && "rtl" }}>
          <React.Fragment key={"brand"}>
            <ListItem disablePadding sx={{ direction: i18n.language == "ar" && "rtl" }}>
              <ListItemButton
                onClick={() => toggleFilterExpansion("brand")}
                sx={{ p: 2 }}
              >
                <StyledBadge
                  badgeContent={getActiveFilterCount("brand")}
                  invisible={getActiveFilterCount("brand") === 0}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <ListItemText
                    primary={"Brand"}
                    primaryTypographyProps={{
                      fontWeight: 'medium',

                    }}
                  />
                </StyledBadge>
                {expandedFilter === "brand" ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItemButton>
            </ListItem>

            <Collapse in={expandedFilter === "brand"} timeout="auto" unmountOnExit>
              <FilterOptionContainer>
                {/* Search Box for Brands */}
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Search brands..."
                  value={brandSearchQuery}
                  onChange={(e) => setBrandSearchQuery(e.target.value)}
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />

                <FormGroup sx={{ maxHeight: "300px", overflowY: "scroll" }}>
                  {getBrandAccordionContent().length > 0 ? (
                    getBrandAccordionContent().map((option) => (
                      <FormControlLabel
                        key={option}
                        control={
                          <Checkbox
                            checked={filters["brand"].includes(option)}
                            onChange={() => handleCheckboxChange("brand", option)}
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
                    ))
                  ) : (
                    <Typography variant="body2" color="text.secondary" sx={{ p: 2, textAlign: 'center' }}>
                      No brands found matching "{brandSearchQuery}"
                    </Typography>
                  )}
                </FormGroup>
              </FilterOptionContainer>
            </Collapse>
            <Divider />
          </React.Fragment>
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