import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deliverOrder, detailsOrder, payOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Button from "@mui/material/Button";
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";

export default function OrderScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const { id: orderId } = params;
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;
  const dispatch = useDispatch();
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (
      !order ||
      successPay ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [
    dispatch,
    navigate,
    sdkReady,
    orderId,
    successPay,
    successDeliver,
    order,
  ]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
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
              <Typography variant="h6" sx={{ marginTop: 3 }}>
                <strong>Name:</strong> {order.shippingAddress.fullName}
                <br />
                <strong>Address:</strong> {order.shippingAddress.address}
                <br />
                <strong>City:</strong> {order.shippingAddress.city}
                <br />
                <strong>PostalCode:</strong>
                {order.shippingAddress.postalCode}
                <br />
                <strong>Country:</strong>
                {order.shippingAddress.country}
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    Delivered at {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Delivered</MessageBox>
                )}
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
              <Typography variant="h6" sx={{ marginTop: 3 }}>
                <strong>Method:</strong> {order.paymentMethod}
                {order.isPaid ? (
                  <MessageBox variant="success">
                    Paid at {order.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Paid</MessageBox>
                )}
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

              {order.orderItems.map((item) => (
                <Box
                  key={item._id}
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

                  {/* <Typography variant="h6">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Typography> */}
                  <Link
                    style={{ textDecoration: "none", color: "black",textTransform: 'capitalize' }}
                    to={`/product/${item.product}`}
                  >
                    {" "}
                    <Typography
                      variant="h6"
                      sx={{
                        "&:hover": {
                          color: "#66FFFF",
                          textDecoration: "underline",
                        },
                      }}
                    >
                      {item.name}
                    </Typography>
                  </Link>

                  <Typography variant="h6">
                    {item.qty} x ₹{item.price} = ₹{item.qty * item.price}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Grid align="center">
              <Box
                sx={{
                
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
                 <Typography  sx={{textAlign: "center",}}variant="h4">Order Items</Typography>

                {order.orderItems.map((item) => (
                  <Box
                    key={item._id}
                    sx={{
                      display: "flex",

                      flexDirection: "column",
                      justifyContent: "space-between",

                      marginLeft: 10,
                      alignItems: "center",
                      p: 5,
                      m: 2,
                      flex: 1,
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{ width: 151 }}
                      src={item.image}
                      alt={item.name}
                    />

                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to={`/product/${item.product}`}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{
                          "&:hover": {
                            color: "#ff7519",
                            textDecoration: "underline",
                            textTransform: 'capitalize'
                          },
                        }}
                      >
                        {item.name}
                      </Typography>
                    </Link>

                    <Typography variant="subtitle1">
                      {item.qty} x ₹{item.price} = ₹{item.qty * item.price}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Box>

          <Grid xs sm md lg xl sx={{ display: { xs: "block", sm: "none" } }}>
            <Box
              sx={{
                p: 5,
                m: 2,
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              }}
            >
              <Box>
                <Typography variant="h6">Order Summary</Typography>
              </Box>

              <>
                <Box>
                  <Typography gutterBottom variant="subtitle1" component="div">
                    Shipping Items:{" "}
                    {order.orderItems.reduce((a, c) => a + c.qty, 0)}
                  </Typography>
                </Box>
                <Box>
                  <Typography gutterBottom variant="subtitle1" component="div">
                    Shipping Price: ₹
                    {order.orderItems.reduce((a, c) => a + c.price * c.qty, 0)}
                  </Typography>
                </Box>
                {/* <Box>
                  <Typography variant="subtitle1">
                    <strong>Tax:</strong>₹{orderitem.taxPrice.toFixed(2)}
                  </Typography>
                </Box> */}
                <Box>
                  <Typography gutterBottom variant="subtitle1" component="div">
                    Order Total : ₹
                    {order.orderItems.reduce((a, c) => a + c.price * c.qty, 0)}
                  </Typography>
                </Box>
              </>

              {!order.isPaid && (
                <Box sx={{ marginTop: 2 }}>
                  {!sdkReady ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                    <>
                      {errorPay && (
                        <MessageBox variant="danger">{errorPay}</MessageBox>
                      )}
                      {loadingPay && <LoadingBox></LoadingBox>}

                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      ></PayPalButton>
                    </>
                  )}
                </Box>
              )}
              {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <Box>
                  {loadingDeliver && <LoadingBox></LoadingBox>}
                  {errorDeliver && (
                    <MessageBox variant="danger">{errorDeliver}</MessageBox>
                  )}
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={deliverHandler}
                    sx={{ mt: 3, mb: 2 }}
                    type="button"
                  >
                    Delivery Order
                  </Button>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
        {/* <Grid xs sm md lg xl>
            <Box
              sx={{
                p: 5,
                m: 2,
                marginTop: 2,
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              }}
            >
              <Typography variant="h4">Order Summary</Typography>

              <Typography variant="subtitle1">
                <strong>Items:</strong>${order.itemsPrice.toFixed(2)}
              </Typography>

              <Typography variant="subtitle1">
                <strong>Shipping:</strong>${order.shippingPrice.toFixed(2)}
              </Typography>

              <Typography variant="subtitle1">
                <strong>Tax:</strong>${order.taxPrice.toFixed(2)}
              </Typography>

              <Typography variant="subtitle1">
                <strong> Order Total:</strong>${order.totalPrice.toFixed(2)}
              </Typography>

              {!order.isPaid && (
                <Box sx={{ marginTop: 2 }}>
                  {!sdkReady ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                    <>
                      {errorPay && (
                        <MessageBox variant="danger">{errorPay}</MessageBox>
                      )}
                      {loadingPay && <LoadingBox></LoadingBox>}

                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      ></PayPalButton>
                    </>
                  )}
                </Box>
              )}
              {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <Box>
                  {loadingDeliver && <LoadingBox></LoadingBox>}
                  {errorDeliver && (
                    <MessageBox variant="danger">{errorDeliver}</MessageBox>
                  )}
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={deliverHandler}
                    sx={{ mt: 3, mb: 2 }}
                    type="button"
                  >
                    Delivery Order
                  </Button>
                </Box>
              )}
            </Box>
          </Grid> */}

        <Grid xs sm md lg xl sx={{ display: { xs: "none", sm: "block" } }}>
          <Box
            sx={{
              p: 5,
              m: 2,
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <Box>
              <Typography variant="h5">Order Summary</Typography>
            </Box>

            <>
              <Box>
                <Typography gutterBottom variant="subtitle1" component="div">
                  Shipping Items:{" "}
                  {order.orderItems.reduce((a, c) => a + c.qty, 0)}
                </Typography>
              </Box>
              <Box>
                <Typography gutterBottom variant="subtitle1" component="div">
                  Shipping Price: ₹
                  {order.orderItems.reduce((a, c) => a + c.price * c.qty, 0)}
                </Typography>
              </Box>
              {/* <Box>
                  <Typography variant="subtitle1">
                    <strong>Tax:</strong>₹{orderitem.taxPrice.toFixed(2)}
                  </Typography>
                </Box> */}
              <Box>
                <Typography gutterBottom variant="subtitle1" component="div">
                  Order Total : ₹
                  {order.orderItems.reduce((a, c) => a + c.price * c.qty, 0)}
                </Typography>
              </Box>
            </>

            {!order.isPaid && (
              <Box sx={{ marginTop: 2 }}>
                {!sdkReady ? (
                  <LoadingBox></LoadingBox>
                ) : (
                  <>
                    {errorPay && (
                      <MessageBox variant="danger">{errorPay}</MessageBox>
                    )}
                    {loadingPay && <LoadingBox></LoadingBox>}

                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    ></PayPalButton>
                  </>
                )}
              </Box>
            )}
            {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
              <Box>
                {loadingDeliver && <LoadingBox></LoadingBox>}
                {errorDeliver && (
                  <MessageBox variant="danger">{errorDeliver}</MessageBox>
                )}
                <Button
                  fullWidth
                  variant="contained"
                  onClick={deliverHandler}
                  sx={{ mt: 3, mb: 2 }}
                  type="button"
                >
                  Delivery Order
                </Button>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
