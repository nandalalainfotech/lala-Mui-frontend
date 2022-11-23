import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../actions/cartAction";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export default function PaymentMethodScreen(props) {
  const navigate = useNavigate();
  //   const cart = useSelector((state) => state.cart);
  //   const { shippingAddress } = cart;
  //   if (!shippingAddress.address) {
  //     navigate('/shipping');
  //   }
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="sm"
        sx={{ my: { xs: 13, md: 6, lg: 18 }, p: { xs: 2, md: 1 } }}
      >
        <CssBaseline />
        <Box
          component="form"
          onSubmit={submitHandler}
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            alignItems: "left",
            borderRadius: "0px",
            p: 2,
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
        >
          <Typography variant="h4">Payment Method</Typography>
          <FormControlLabel
            value="PayPal"
            sx={{ marginTop: 5 }}
            onChange={(e) => setPaymentMethod(e.target.value)}
            control={<Radio />}
            label="PayPal"
          />
          <FormControlLabel
            value="Stripe"
            onChange={(e) => setPaymentMethod(e.target.value)}
            control={<Radio />}
            label="Stripe"
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            type="submit"
          >
            Continue
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
