import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { Container } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/payments/Payment";
import Footer from "../components/footer/Footer";

const stripePromise = loadStripe("pk_test_51REm9hGdO778QP4bC33rwizRpFjZJdmrAJw34HcDgI2cXH59FXNrDel5Lz7NMhilj20m1S0im4NFzX1AZrU8KyaY00i3rO0AZ3");

const PaymentPage = () => {
  return (
    <>
      <Container sx={{ display: "flex", alignItems: "center", height: "60vh" }}>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </Container>
    </>
  );
};

export default PaymentPage;
