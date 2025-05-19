import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteIcon from '@mui/icons-material/Delete';
import CreditCardIcon from '@mui/icons-material/CreditCard';


const CreditCard = ({
  cardType,
  cardNumber,
  expiryDate,
  isDefault,
  isExpired,
}) => {
  return (
    <Card
      variant="outlined"
      sx={{
        mb: 2,
        border: isDefault ? '1px solid #c62828' : '1px solid #e0e0e0',
      }}
    >
      <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
        <Grid container alignItems="center">
          <Grid item xs={2}>
            {cardType === 'visa' ? <VisaLogo /> : <MastercardLogo />}
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body2">
              {cardType === 'visa' ? 'Visa' : 'Mastercard'} ending in {cardNumber}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Exp. date: {expiryDate}
            </Typography>
          </Grid>
          <Grid item xs={2} container justifyContent="flex-end" spacing={1}>
            {isExpired ? (
              <Chip
                label="Expired"
                size="small"
                color="error"
                sx={{ fontSize: '0.7rem', height: 20 }}
              />
            ) : isDefault ? (
              <Chip
                label="Default"
                size="small"
                sx={{
                  fontSize: '0.7rem',
                  height: 20,
                  bgcolor: '#000',
                  color: '#fff'
                }}
              />
            ) : (
              <Button
                variant="text"
                size="small"
                sx={{
                  fontSize: '0.7rem',
                  p: 0,
                  minWidth: 'auto',
                }}
              >
                Set as Default
              </Button>
            )}
            <IconButton size="small" sx={{ ml: 1 }}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const PaymentForm = ({ onBack, submit, save }) => {
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <CreditCardIcon sx={{ mr: 1 }} />
        <Typography variant="h5">
          Credit Card(s)
        </Typography>
      </Box>

      <Typography variant="body1" gutterBottom color="text.secondary">
        Manage your credit cards and payment options
      </Typography>

      <Chip
        label="Premier ADS"
        color="primary"
        size="medium"
        sx={{ mt: 2, mb: 3 }}
      />

      <CreditCard
        cardType="visa"
        cardNumber="7830"
        expiryDate="06/24"
        isDefault={true}
      />

      <CreditCard
        cardType="visa"
        cardNumber="5775"
        expiryDate="06/24"
        isDefault={false}
      />

      <CreditCard
        cardType="mastercard"
        cardNumber="7830"
        expiryDate="06/24"
        isDefault={false}
      />

      <CreditCard
        cardType="mastercard"
        cardNumber="4962"
        expiryDate="06/24"
        isExpired={true}
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button
          onClick={onBack}
          startIcon={<ArrowBackIcon />}
        >
          Previous
        </Button>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={save}
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={submit}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PaymentForm;
