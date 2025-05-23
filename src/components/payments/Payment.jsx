import { useState, useEffect } from "react";
import {
    CardElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { updateAd, getAdById } from "../../api/consumer";
import { styled } from "@mui/system"
import { Container, Button } from "@mui/material";
import axios from "axios";

const StyledBtn = styled(Button)({
    borderRadius: "5px",
    color: "#fff",
    textAlign: "center",
    backgroundColor: "#B71C1C",
    fontSize: "12px",
    marginTop: "1rem",
    padding: "0.5rem"
})

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [ad, setAd] = useState({});
    const [message, setMessage] = useState("");
    const id = localStorage.getItem("ad_id");

    useEffect(
        () => {
            getAdById(id).then(data => setAd(data[0]));
        },
        []
    )

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setLoading(true);
        setMessage("");

        try {
            const { data } = await axios.post("http://localhost:3000/payment", {
                amount: 5000,
                currency: "usd",
            });

            const result = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (result.error) {
                setMessage(result.error.message);
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    setMessage("Payment succeeded! 🎉");
                    updateAd(id, { ...ad, featured: true })
                }
            }
        } catch (error) {
            console.error(error);
            setMessage("Payment failed!");
        }

        setLoading(false);
    };

    return (
        <Container>
            <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: "auto" }}>
                <h3>Pay to make your ad featured</h3>
                <CardElement />
                <StyledBtn type="submit" disabled={!stripe || loading} style={{ marginTop: 20 }}>
                    {loading ? "Processing…" : "Pay"}
                </StyledBtn>
                {message && <p style={{ marginTop: 10 }}>{message}</p>}
            </form>
        </Container>
    );
};

export default CheckoutForm;
