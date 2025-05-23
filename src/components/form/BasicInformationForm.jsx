import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  Divider
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CustomSelect from '../../utils/Select';
import { useTranslation } from 'react-i18next';
import { getTrimsByModel, getModels } from '../../api/consumer';

const BasicInformationForm = ({ onNext, type = "sell", data, handleChange, category }) => {
  const { t, i18n } = useTranslation();
  const [trimOptions, setTrimOptions] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);

  useEffect(
    () => {
      getModels().then(
        (response) => {
          setModelOptions(response.map(model => ({
            name: model.make,
            value: model.make
          })))

        }
      )
    },
    []
  )

  const countries = {
    "": "UAE",
    "sa": "Saudi Arabia",
    "qtr": "Qatar",
    "syr": "Syria",
    "us": "USA",
    "eg": "Egypt"
  };


  const cityOptions = t(`cities.${countries[localStorage.getItem("selectedCountry")]}`, { returnObjects: true })
    .map((city) => ({ name: city, value: city }))

  const interiorColorOptions = [
    { name: t('cardValues.Red'), value: 'Red' },
    { name: t('cardValues.White'), value: 'White' },
    { name: t('cardValues.Black'), value: 'Black' },
    { name: t('cardValues.Silver'), value: 'Silver' },
    { name: t('cardValues.Beige'), value: 'Beige' }
  ];

  const fuelTyperOptions = [
    { name: t('filters.options.Diesel'), value: 'Diesel' },
    { name: t('filters.options.Electric'), value: 'Electric' },
    { name: t('filters.filters.options.Gasoline'), value: 'Gasoline' },
  ];

  const yesNoOptions = [
    { name: t('cardValues.Yes'), value: 'Yes' },
    { name: t('cardValues.No'), value: 'No' }
  ];

  const steeringWheelOptions = [
    { name: t('cardValues.Left'), value: 'Left' },
    { name: t('cardValues.Right'), value: 'Right' }
  ];

  const sellerTypeOptions = [
    { name: t('cardValues.Owner'), value: 'owner' },
    { name: t('cardValues.Dealer'), value: 'dealer' }
  ];

  const conditionOptions = [
    { name: t('cardValues.New'), value: 'New' },
    { name: t('cardValues.Used'), value: 'Used' },
    { name: t('cardValues.Pre'), value: 'Pre' }
  ];

  const bodyOptions = [
    { name: t('cardValues.Sedan'), value: 'Sedan' },
    { name: t('cardValues.Suv'), value: 'Suv' },
    { name: t('cardValues.Coupe'), value: 'Coupe' },
    { name: t('cardValues.Crossover'), value: 'Crossover' },
    { name: t('cardValues.Pickup'), value: 'Pickup' },
    { name: t('cardValues.Hatch'), value: 'Hatch' },
    { name: t('cardValues.Van'), value: 'Van' },
    { name: t('cardValues.Wagon'), value: 'Wagon' },
    { name: t('cardValues.Utility'), value: 'Utility' }
  ];

  const yearOptions = [
    { name: t('cardValues.2023'), value: '2023' },
    { name: t('cardValues.2022'), value: '2022' },
    { name: t('cardValues.2021'), value: '2021' },
    { name: t('cardValues.2020'), value: '2020' }
  ];

  const regionalSpecsOptions = [
    { name: t('cardValues.Gcc'), value: 'gcc' },
    { name: t('cardValues.American'), value: 'American' },
    { name: t('cardValues.European'), value: 'European' },
    { name: t('cardValues.Japanese'), value: 'Japanese' },
    { name: t('cardValues.Korean'), value: 'Korean' },
    { name: t('cardValues.Chinese'), value: 'Chinese' }
  ];

  const manufacturerOptions = [
    { name: t('cardValues.AccessMotor'), value: 'AccessMotor' },
    { name: t('cardValues.Aprillia'), value: 'Aprillia' },
    { name: t('cardValues.Asiawing'), value: 'Asiawing' },
    { name: t('cardValues.BMW'), value: 'BMW' },
    { name: t('cardValues.Bajaj'), value: 'Bajaj' },
    { name: t('cardValues.Benelli'), value: 'Benelli' },
    { name: t('cardValues.Buell'), value: 'Buell' },
    { name: t('cardValues.Can-am'), value: 'Can-am' },
    { name: t('cardValues.Ducati'), value: 'Ducati' },
    { name: t('cardValues.Fantic'), value: 'Fantic' },
    { name: t('cardValues.Gas Gas'), value: 'Gas Gas' },
    { name: t('cardValues.Harley Davidson'), value: 'Harley Davidson' },
    { name: t('cardValues.Hero'), value: 'Hero' },
    { name: t('cardValues.Honda'), value: 'Honda' },
    { name: t('cardValues.Husaberg'), value: 'Husaberg' },
    { name: t('cardValues.Husqvarna'), value: 'Husqvarna' },
    { name: t('cardValues.Indian'), value: 'Indian' },
    { name: t('cardValues.KTM'), value: 'KTM' },
    { name: t('cardValues.Kawasaki'), value: 'Kawasaki' },
    { name: t('cardValues.MV Agusta'), value: 'MV Agusta' },
    { name: t('cardValues.Moto Guzzi'), value: 'Moto Guzzi' },
    { name: t('cardValues.Norton'), value: 'Norton' },
    { name: t('cardValues.Polaris'), value: 'Polaris' },
    { name: t('cardValues.Royal Enfield'), value: 'Royal Enfield' },
    { name: t('cardValues.Sharmax'), value: 'Sharmax' },
    { name: t('cardValues.Suzuki'), value: 'Suzuki' },
    { name: t('cardValues.Triumph'), value: 'Triumph' },
    { name: t('cardValues.Vespa'), value: 'Vespa' },
    { name: t('cardValues.Victory'), value: 'Victory' },
    { name: t('cardValues.Yamaha'), value: 'Yamaha' },
    { name: t('cardValues.Other'), value: 'Other' }
  ];

  const transmissionOptions = [
    { name: t('cardValues.Automatic'), value: 'Automatic' },
    { name: t('cardValues.Manual'), value: 'Manual' }
  ];

  const cylindersOptions = [
    { name: t('cardValues.3'), value: '3' },
    { name: t('cardValues.4'), value: '4' },
    { name: t('cardValues.5'), value: '5' },
    { name: t('cardValues.6'), value: '6' },
    { name: t('cardValues.8'), value: '8' },
    { name: t('cardValues.10'), value: '10' },
    { name: t('cardValues.12'), value: '12' }
  ];

  const doorOptions = [
    { name: t('cardValues.2'), value: '2' },
    { name: t('cardValues.4'), value: '4' },
    { name: t('cardValues.5'), value: '5' }
  ];

  const seatsOptions = [
    { name: t('cardValues.2'), value: '2' },
    { name: t('cardValues.4'), value: '4' },
    { name: t('cardValues.5'), value: '5' },
    { name: t('cardValues.7'), value: '7' },
    { name: t('cardValues.8'), value: '8' }
  ];

  const exteriorColorOptions = [
    { name: t('cardValues.Red'), value: 'Red' },
    { name: t('cardValues.White'), value: 'White' },
    { name: t('cardValues.Black'), value: 'Black' },
    { name: t('cardValues.Silver'), value: 'Silver' }
  ];

  const customSelectStyles = {
    textField: {
      width: "23rem",
      fontSize: "1rem",
      borderRadius: "4px",
      backgroundColor: "transparent",
      color: "black",
      "&:focus": {
        outline: "none",
        borderColor: "#B71C1C",
      },
      appearance: "none",
      WebkitAppearance: "none",
      MozAppearance: "none"
    },
  };

  const handleModelChange = (value) => {
    handleChange({ target: { name: "model", value: value } });
    getTrimsByModel(value).then(
      (trims) => {
        setTrimOptions(trims.map(trim => ({ name: trim.trim, value: trim.trim })));
      }
    );
  };

  return (
    <Box sx={{ direction: i18n.language == "ar" && "rtl" }}>
      <Typography variant="h5" gutterBottom>
        {t("basicInfo.title")}
      </Typography>
      <Typography variant="body1" gutterBottom color="text.secondary">
        {t("basicInfo.subtitle")}
      </Typography>
      <Divider sx={{ mt: 2, mb: 4 }} />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <CustomSelect
            styles={customSelectStyles}
            options={cityOptions}
            onChange={(value) => handleChange({ target: { name: "city", value: value } })}
            placeholder={t("basicInfo.city")}
            value={data.city}
            showStartAndorement={false}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            required
            id="carPlate"
            name="car_plate_number"
            placeholder={t("basicInfo.carPlate")}
            fullWidth
            value={data.car_plate_number || ''}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CustomSelect
            styles={customSelectStyles}
            options={interiorColorOptions}
            onChange={(value) => handleChange({ target: { name: "interior_color", value: value } })}
            placeholder={t("basicInfo.interiorColor")}
            value={data.interior_color}
            showStartAndorement={false}
          />
        </Grid>
        {
          category == "cars" || category == "heavy" ?
            <Grid item xs={12} sm={6} md={4}>
              <CustomSelect
                styles={customSelectStyles}
                options={modelOptions}
                onChange={handleModelChange}
                placeholder={t("basicInfo.model")}
                value={data.model}
                showStartAndorement={false}
              />
            </Grid> :
            <></>
        }
        <Grid item xs={12} sm={6} md={4}>
          <CustomSelect
            styles={customSelectStyles}
            options={yesNoOptions}
            onChange={(value) => handleChange({ target: { name: "warranty", value: value } })}
            placeholder={t("basicInfo.warranty")}
            value={data.warranty}
            showStartAndorement={false}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            required
            id="engineCapacity"
            name="engine_capacity"
            placeholder={t("basicInfo.engineCapacity")}
            value={data.engine_capacity || ''}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        {
          type == "sell" &&
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              required
              id="price"
              name="price"
              placeholder={t("basicInfo.price")}
              fullWidth
              value={data.price || ''}
              onChange={handleChange}
              InputProps={{
                endAdornment: <InputAdornment position="end">{t('AED')}</InputAdornment>,
              }}
            />
          </Grid>
        }
        {
          type == "rent" &&
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              required
              id="daily rent"
              name="daily"
              placeholder={t("basicInfo.dailyRent")}
              fullWidth
              value={data.daily || ''}
              onChange={handleChange}
              InputProps={{
                endAdornment: <InputAdornment position="end">AED</InputAdornment>,
              }}
            />
          </Grid>
        }
        {
          type == "rent" &&
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              required
              id="weekly rent"
              name="weekly"
              placeholder={t("basicInfo.weeklyRent")}
              fullWidth
              value={data.weekly || ''}
              onChange={handleChange}
              InputProps={{
                endAdornment: <InputAdornment position="end">AED</InputAdornment>,
              }}
            />
          </Grid>
        }
        {
          type == "rent" &&
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              required
              id="Monthly rent"
              name="monthly"
              placeholder={t("basicInfo.monthlyRent")}
              fullWidth
              value={data.monthly || ''}
              onChange={handleChange}
              InputProps={{
                endAdornment: <InputAdornment position="end">AED</InputAdornment>,
              }}
            />
          </Grid>
        }

        <Grid item xs={12} sm={6} md={4}>
          <CustomSelect
            styles={customSelectStyles}
            options={steeringWheelOptions}
            onChange={(value) => handleChange({ target: { name: "steering_wheel", value: value } })}
            placeholder={t("basicInfo.steeringWheel")}
            value={data.steering_wheel}
            showStartAndorement={false}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <CustomSelect
            styles={customSelectStyles}
            options={transmissionOptions}
            onChange={(value) => handleChange({ target: { name: "transmission", value: value } })}
            placeholder={t("basicInfo.transmission")}
            value={data.transmission}
            showStartAndorement={false}
          />
        </Grid>
        {
          category == "cars" || category == "heavy" ?
            <Grid item xs={12} sm={6} md={4}>
              <CustomSelect
                styles={customSelectStyles}
                showStartAndorement={false}
                options={trimOptions.length > 0 ?
                  trimOptions :
                  [{ name: "Select Model First", value: "" }]}
                onChange={(value) => handleChange({ target: { name: "trim", value: value } })}
                placeholder={t("basicInfo.trim")}
                value={data.trim}
                disabled={trimOptions.length === 0}
              />
            </Grid> :
            <></>
        }

        <Grid item xs={12} sm={6} md={4}>
          <CustomSelect
            styles={customSelectStyles}
            options={sellerTypeOptions}
            onChange={(value) => handleChange({ target: { name: "seller_type", value: value } })}
            placeholder={t("basicInfo.sellerType")}
            value={data.seller_type}
            showStartAndorement={false}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            required
            id="horsePower"
            name="horse_power"
            placeholder={t("basicInfo.horsePower")}
            fullWidth
            value={data.horse_power || ''}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            required
            id="kilometers"
            name="kilometers"
            placeholder={t("basicInfo.kilometers")}
            fullWidth
            value={data.kilometers || ''}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <CustomSelect
            styles={customSelectStyles}
            options={conditionOptions}
            onChange={(value) => handleChange({ target: { name: "vehicle_condition", value: value } })}
            placeholder={t("basicInfo.vehicleCondition")}
            value={data.vehicle_condition}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <CustomSelect
            styles={customSelectStyles}
            options={bodyOptions}
            onChange={(value) => handleChange({ target: { name: "body", value: value } })}
            placeholder={t("basicInfo.body")}
            value={data.body}
            showStartAndorement={false}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            required
            id="dealerName"
            name="dealer_name"
            placeholder={t("basicInfo.dealerName")}
            fullWidth
            value={data.dealer_name || ''}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <CustomSelect
            styles={customSelectStyles}
            options={yearOptions}
            onChange={(value) => handleChange({ target: { name: "year", value: value } })}
            placeholder={t("basicInfo.year")}
            value={data.year}
            showStartAndorement={false}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <CustomSelect
            styles={customSelectStyles}
            options={regionalSpecsOptions}
            onChange={(value) => handleChange({ target: { name: "regional_specs", value: value } })}
            placeholder={t("basicInfo.regionalSpecs")}
            value={data.regional_specs}
            showStartAndorement={false}
          />
        </Grid>

        {
          category == "cars" || category == "heavy" || category == "construction" ?
            <Grid item xs={12} sm={6} md={4}>
              <CustomSelect
                styles={customSelectStyles}
                options={doorOptions}
                onChange={(value) => handleChange({ target: { name: "doors", value: value } })}
                placeholder={t("basicInfo.doors")}
                value={data.doors}
                showStartAndorement={false}
              />
            </Grid> :
            <></>
        }
        {
          category == "bikes" ?
            <Grid item xs={12} sm={6} md={4}>
              <CustomSelect
                styles={customSelectStyles}
                options={manufacturerOptions}
                onChange={(value) => handleChange({ target: { name: "manufacturer", value: value } })}
                placeholder={t("basicInfo.manufacturer")}
                value={data.manufacturer}
                showStartAndorement={false}
              />
            </Grid> :
            <></>
        }

        <Grid item xs={12} sm={6} md={4}>
          <CustomSelect
            styles={customSelectStyles}
            options={cylindersOptions}
            onChange={(value) => handleChange({ target: { name: "number_of_cylinders", value: value } })}
            placeholder={t("basicInfo.cylinders")}
            value={data.number_of_cylinders}
            showStartAndorement={false}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <CustomSelect
            styles={customSelectStyles}
            options={seatsOptions}
            onChange={(value) => handleChange({ target: { name: "seats", value: value } })}
            placeholder={t("basicInfo.seats")}
            value={data.seats}
            showStartAndorement={false}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <CustomSelect
            styles={customSelectStyles}
            options={fuelTyperOptions}
            onChange={(value) => handleChange({ target: { name: "fuel_type", value: value } })}
            placeholder={t("filters.filters.Fuel Type")}
            value={data.seats}
            showStartAndorement={false}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <CustomSelect
            styles={customSelectStyles}
            options={exteriorColorOptions}
            onChange={(value) => handleChange({ target: { name: "exterior_color", value: value } })}
            placeholder={t("basicInfo.exteriorColor")}
            value={data.exterior_color}
            showStartAndorement={false}
          />
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button
          disabled
          startIcon={<ArrowBackIcon />}
          sx={{ visibility: 'hidden' }}
        >
          {t("basicInfo.previous")}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onNext}
          endIcon={i18n.language == "ar" ? <ArrowBackIcon /> : <ArrowForwardIcon />}
          sx={{
            textTransform: "none"
          }}
        >
          {t("basicInfo.next")}
        </Button>
      </Box>
    </Box>
  );
};

export default BasicInformationForm;