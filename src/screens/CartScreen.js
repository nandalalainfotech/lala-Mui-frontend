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
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartAction";
import MessageBox from "../components/MessageBox";

export default function CartScreen(props) {
  const navigate = useNavigate();
  const params = useParams();
  const productId = params.id;
  // const tshirtId = params.id;
  const { search } = useLocation();
  const qtyInUrl = new URLSearchParams(search).get("qty");
  const qty = qtyInUrl ? Number(qtyInUrl) : 1;
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { cartItems, error } = cart;
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
    // else if (tshirtId) {
    //   dispatch(addToCart(tshirtId, qty));
    // }
  }, [dispatch, productId, qty]);
  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/shipping");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} item={true}>
        <Grid item={true} xs sx={{ marginTop: 3 }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            textAlign="center"
          >
            Shopping Cart
          </Typography>
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          {cartItems.length === 0 ? (
            <Box>
              {userInfo ? (
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
              ) : (
                <Card sx={{ maxWidth: 600, hieght: 600, marginLeft: 80 }}>
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
                    <Typography gutterBottom variant="h5" component="div">
                      <Link to="/signin" style={{ textDecoration: "none" }}>
                        <Button variant="contained">Sign In</Button>{" "}
                      </Link>
                      <Link to="/register" style={{ textDecoration: "none" }}>
                        <Button variant="contained">Register</Button>
                      </Link>
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Box>
          ) : (
            <>
              <Grid xs sx={{ display: { xs: "none", sm: "block" } }} item={true}>
                <Box
                  sx={{
                    flexGrow: 1,
                  }}
                >
                  {cartItems.map((item) => (
                    <Card key={item}
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
                        key={item.product}
                        component="img"
                        sx={{ width: 130 }}
                        image={item.image}
                        alt={item.name}
                      />
                      {/* <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent:"space-between",
                            backgroundColor:"red"
                          }}
                        > */}
                      <Box>
                        <Typography gutterBottom variant="h5" component="div">
                          <Link
                            to={`/product/${item.product}`}
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
                            onChange={(e) =>
                              dispatch(
                                addToCart(
                                  item.product,
                                  Number(e.target.value)
                                )
                              )
                            }
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
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          Delete
                        </Button>
                      </Box>
                      {/* </Box> */}
                    </Card>
                  ))}
                </Box>
              </Grid>

              <Grid xs sx={{ display: { xs: "block", sm: "none" } }} item={true}>
                <Box sx={{ flexGrow: 1, justifyContent: "center" }}>
                  {cartItems.map((item) => (
                    <Card key={item}
                      sx={{
                        minWidth: 200,
                        marginLeft: 10,
                        m: 2,
                        boxShadow:
                          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                      }}
                    >
                      <CardMedia
                        key={item.product}
                        component="img"
                        sx={{ width: 150, marginLeft: 13 }}
                        image={item.image}
                        alt={item.name}
                      />

                      <Box sx={{ textAlign: "center" }}>
                        <Typography gutterBottom variant="h6" component="div">
                          <Link
                            to={`/product/${item.product}`}
                            style={{ textDecoration: "none" }}
                          >
                            {item.name}
                          </Link>
                        </Typography>
                      </Box>

                      <Box sx={{ textAlign: "center" }}>
                        <FormControl
                          sx={{
                            m: 1,
                            minWidth: 100,
                            flexDirection: "column",
                          }}
                        >
                          <Select
                            value={item.qty}
                            onChange={(e) =>
                              dispatch(
                                addToCart(
                                  item.product,
                                  Number(e.target.value)
                                )
                              )
                            }
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <MenuItem key={x + 1} value={x + 1}>
                                {x + 1}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                      <Box sx={{ textAlign: "center" }}>
                        <Typography gutterBottom variant="h5" component="div">
                          ₹{item.price}
                        </Typography>
                      </Box>
                      <Box sx={{ m: 5, textAlign: "center" }}>
                        <Button
                          variant="contained"
                          type="button"
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          Delete
                        </Button>
                      </Box>
                      {/* </Box> */}
                    </Card>
                  ))}
                </Box>
              </Grid>
            </>
          )}
        </Grid>

        <Grid xs sx={{ marginTop: 11 }} item={true}>
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
                    Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items)
                    : ₹{cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                  </Typography>
                </Box>
                <Box>
                  <Typography gutterBottom variant="h6" component="div">
                    Discount: ₹-100
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
                    {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                  </Typography>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    type="button"
                    sx={{ width: "100%" }}
                    onClick={checkoutHandler}
                    className="primary block"
                    disabled={cartItems.length === 0}
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
