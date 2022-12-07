import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  addToCart,
  deleteCart,
  removeFromCart,
  updateCart,
  userCartList,
} from "../actions/cartAction";
import MessageBox from "../components/MessageBox";
import { makeStyles } from "@material-ui/core/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import {
  CART_ADD_ITEM,
  CART_DELETE_RESET,
  CART_UPDATE_RESET,
  USER_CART_LIST_SUCCESS,
} from "../constants/cartConstants";
import CircularProgress from "@mui/material/CircularProgress";
export default function CartScreen(props) {
  const navigate = useNavigate();
  const theme = createTheme();
  const params = useParams();
  const productId = params.id;
  const { search } = useLocation();
  const qtyInUrl = new URLSearchParams(search).get("qty");
  const qty = qtyInUrl ? Number(qtyInUrl) : 1;
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { cartItems, error, success, loading: loadingCartItem } = cart;
  const userCartListItem = useSelector((state) => state.userCartListItem);
  const {
    usercart: usercart,
    loading: loadingCart,
    success: successCart,
  } = userCartListItem;
  const [cartupdate, setCartupdate] = useState(usercart);
  const cartDelete = useSelector((state) => state.cartDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = cartDelete;

  const cartUpdate = useSelector((state) => state.cartUpdate);
  const { success: successUpdate } = cartUpdate;

  const updateHandler = (e, id) => {
    e.preventDefault();
    dispatch(
      updateCart({
        usercartId: id,
        qty: e.target.value,
      })
    );
  };
  useEffect(() => {
    // dispatch(userCartId());

    if (productId) {
      dispatch(addToCart(productId, qty));
    }
    if (success) {
      dispatch(userCartList(userInfo?._id));
    }
    
    if (successUpdate) {
      dispatch(userCartList(userInfo?._id));
      dispatch({ type: CART_UPDATE_RESET });
    }
    if (successDelete) {
      dispatch(userCartList(userInfo?._id));
      dispatch({ type: CART_DELETE_RESET });
      navigate("/cart");
    }
  }, [dispatch, productId, qty, successDelete, successUpdate, success]);

  const removeFromCartHandler = (_id) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteCart(_id));
    }
  };

  const checkoutHandler = () => {
    navigate("/shipping");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} item={true}>
        <Grid item={true} xs sx={{ marginTop: 3 }}>
          {userInfo ? (
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              justifyContent="left"
            >
              Shopping Cart
            </Typography>
          ) : (
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              justifyContent="right"
            >
              Shopping Cart
            </Typography>
          )}
          {userInfo ?(
            <>
           {loadingCart ? (
            <CircularProgress></CircularProgress>
          ) : (
            
            <>
              {usercart?.length === 0 ? (
                <Box>
                  <Box>
                    <CardMedia
                      component="img"
                      image="/image/carts.jpg"
                      alt="green iguana"
                      sx={{
                        m: 2,
                        p: 2,
                        width: "60%",
                        boxShadow:
                          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                      }}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        style={{ color: "red" }}
                      >
                        <MessageBox>Cart is empty.</MessageBox>
                      </Typography>
                    </CardContent>
                  </Box>
                </Box>
              ) : (
                <Grid xs>
                  <Box
                    sx={{
                      flexGrow: 1,
                    }}
                  >
                    {usercart?.map((item) => (
                      <Card
                        key={item._id}
                        sx={{
                          display: "flex",
                          marginLeft: 10,
                          alignItems: "center",
                          p: 5,
                          m: 2,
                          boxShadow:
                            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                          justifyContent: "space-between",
                          flex: 1,
                        }}
                      >
                        <CardMedia
                          key={item._id}
                          component="img"
                          sx={{ width: 130 }}
                          image={item.image}
                          alt={item.name}
                        />
                        <Box>
                          <Typography gutterBottom variant="h5" component="div">
                            <Link
                              to={`/product/${item._id}`}
                              style={{ textDecoration: "none" }}
                            >
                              {item.name}
                            </Link>
                          </Typography>
                        </Box>
                        <Box>
                          <FormControl
                            sx={{
                              m: 1,
                              minWidth: 120,
                              flexDirection: "column",
                            }}
                          >
                            <Select
                              value={item.qty}
                              onChange={(e) => updateHandler(e, item._id)}
                            >
                              {[...Array(item.countInStock).keys()].map((x) => (
                                <MenuItem key={x + 1} value={x + 1}>
                                  {x + 1}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                        <Box>
                          <Typography gutterBottom variant="h5" component="div">
                            ₹{item.price}
                          </Typography>
                        </Box>
                        <Box sx={{ m: 1 }}>
                          <Button
                            variant="contained"
                            type="button"
                            onClick={() => removeFromCartHandler(item._id)}
                          >
                            Delete
                          </Button>
                        </Box>
                      </Card>
                    ))}
                  </Box>
                </Grid>
              )}
            </>
          )}
          </>
          ):(
           <Box>
              <ThemeProvider theme={theme}>
                    <Container
                      component="main"
                      maxWidth="sm"
                      sx={{ my: { xs: 13 }, justifyContent: "center" }}
                    >
                      <CssBaseline />
                      <Box sx={{ marginLeft: "70%" }}>
                        <Card
                          sx={{
                            justifyContent: "center!important",
                            height: 550,
                            width: 500,
                          }}
                        >
                          <CardMedia
                            component="img"
                            image="/image/carts.jpg"
                            alt="green iguana"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                              style={{ color: "red" }}
                            >
                              <MessageBox>Cart is empty.</MessageBox>
                            </Typography>
                            <Typography
                              sx={{ marginLeft: 32 }}
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              <Link
                                to="/signin"
                                style={{ textDecoration: "none" }}
                              >
                                <Button variant="contained">Sign In</Button>{" "}
                              </Link>
                              <Link
                                to="/register"
                                style={{ textDecoration: "none" }}
                              >
                                <Button variant="contained">Register</Button>
                              </Link>
                            </Typography>
                          </CardContent>
                        </Card>
                      </Box>
                    </Container>
                  </ThemeProvider>
           </Box>
          )}
         
        </Grid>

        <Grid xs sx={{ marginTop: 7 }} item={true}>
          {userInfo ? (
            <Grid item xs>
              <Box
                sx={{
                  p: 5,
                  m: 2,
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                }}
              >
                <Box>
                  <Typography gutterBottom variant="h4" component="div">
                    Price Details
                  </Typography>
                </Box>
                <Box>
                  <Typography gutterBottom variant="h6" component="div">
                    Subtotal ({usercart?.reduce((a, c) => a + c.qty, 0)} items)
                    : ₹{usercart?.reduce((a, c) => a + c.price * c.qty, 0)}
                  </Typography>
                </Box>
                <Box>
                  <Typography gutterBottom variant="h6" component="div">
                    Discount: 0 %
                  </Typography>
                </Box>
                <Box>
                  <Typography gutterBottom variant="h6" component="div">
                    Delivery Charges: Free
                  </Typography>
                </Box>
                <Box>
                  <Typography gutterBottom variant="h6" component="div">
                    Total Amount : ₹
                    {usercart?.reduce((a, c) => a + c.price * c.qty, 0)}
                  </Typography>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    type="button"
                    sx={{ width: "100%" }}
                    onClick={checkoutHandler}
                    className="primary block"
                    disabled={usercart?.length === 0}
                  >
                    Proceed to Checkout
                  </Button>
                </Box>
              </Box>
            </Grid>
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
