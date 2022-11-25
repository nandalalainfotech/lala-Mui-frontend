import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

export default function PlaceOrderScreen() {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    navigate("/payment");
  }
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };
  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, navigate, success]);
  return (
    <Box sx={{ flexGrow: 1, m: 2 }}>
      <Grid container spacing={2}>
        <Grid sm>
          <Box>
            <Box
              sx={{
                p: 5,
                m: 2,
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              }}
            >
              <Typography variant="h4">Shipping</Typography>
              <Typography variant="subtitle1" sx={{ marginTop: 3 }}>
                <strong>Name:</strong> {cart.shippingAddress.fullName}<br />
                <strong>Address:</strong> {cart.shippingAddress.address}<br />
                <strong>City:</strong> {cart.shippingAddress.city}<br />
                <strong>PostalCode:</strong>{cart.shippingAddress.postalCode}<br />
                <strong>Country:</strong>{cart.shippingAddress.country}
              </Typography>
            </Box>

            <Box
              sx={{
                p: 5,
                m: 2,
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              }}
            >
              <Typography variant="h4">Payment</Typography>
              <Typography variant="subtitle1" sx={{ marginTop: 3 }}>
                <strong>Method:</strong> {cart.paymentMethod}
              </Typography>
            </Box>

            <Box
              sx={{
                p: 5,
                m: 2,
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                display: {
                  xs: "none",
                  md: "block",
                  sm: "none",
                  lg: "block",
                  xl: "block",
                },
              }}
            >
              <Typography variant="h4">Order Items</Typography>

              {cart.cartItems.map((item) => (
                <Box
                  key={item.product}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 2,
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    src={item.image}
                    alt={item.name}
                  />

                  <Typography variant="subtitle1">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Typography>

                  <Typography variant="subtitle1">
                    {item.qty} x ${item.price} = ${item.qty * item.price}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Box
              sx={{
                p: 5,
                m: 2,
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                display: {
                  xs: "block",
                  md: "none",
                  sm: "block",
                  lg: "none",
                  xl: "none",
                },
              }}
            >
              <Typography variant="h4">Order Items</Typography>

              {cart.cartItems.map((item) => (
                <Box
                  key={item.product}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    marginTop: 2,
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    src={item.image}
                    alt={item.name}
                  />

                  <Typography variant="subtitle1">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Typography>

                  <Typography variant="subtitle1">
                    {item.qty} x ${item.price} = ${item.qty * item.price}
                  </Typography>
                </Box>
              ))}
            </Box>

          </Box>
        </Grid>
        <Grid xs sm md lg xl>
          <Box
            sx={{
              p: 5,
              m: 2,
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <Typography variant="h4">Order Summary</Typography>

            <Typography variant="subtitle1">
              <strong>Items:</strong>${cart.itemsPrice.toFixed(2)}
            </Typography>

            <Typography variant="subtitle1">
              <strong>Shipping:</strong>${cart.shippingPrice.toFixed(2)}
            </Typography>

            <Typography variant="subtitle1">
              <strong>Tax:</strong>${cart.taxPrice.toFixed(2)}
            </Typography>

            <Typography variant="subtitle1">
              <strong> Order Total:</strong>${cart.totalPrice.toFixed(2)}
            </Typography>

            <Button
              fullWidth
              variant="contained"
              onClick={placeOrderHandler}
              disabled={cart.cartItems.length === 0}
              sx={{ mt: 3, mb: 2 }}
              type="submit"
            >
              Place Order
            </Button>

            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
