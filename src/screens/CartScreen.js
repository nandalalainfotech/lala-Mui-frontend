import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartAction";
import MessageBox from "../components/MessageBox";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Divider from "@mui/material/Divider";

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
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs sx={{ marginTop: 3 }}>
            <div className="grid-elements">
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
                <Grid item xs={12}>
                  {userInfo ? (
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
                      </CardContent>
                    </Card>
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
                          <Link
                            to="/register"
                            style={{ textDecoration: "none" }}
                          >
                            <Button variant="contained">Register</Button>
                          </Link>
                        </Typography>
                      </CardContent>
                    </Card>
                  )}
                </Grid>
              ) : (
                <>
                <Grid xs sx={{display:{xs:"none",sm:"block"}}}>
                  <Box sx={{ flexGrow: 1}}>
                    {cartItems.map((item) => (
                      <Card sx={{ display: "flex", marginLeft: 10, alignItems: "center", m: 2,justifyContent:"space-between",  flex:1}}>
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
                         <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                               <Link to={`/product/${item.product}`} style={{textDecoration:"none"}}>{item.name}</Link>
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
                                {[...Array(item.countInStock).keys()].map(
                                  (x) => (
                                    <MenuItem key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </MenuItem>
                                  )
                                )}
                              </Select>
                            </FormControl>
                          </Box>
                          <Box>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              ₹{item.price}
                            </Typography>
                          </Box>
                          <Box sx={{m:1}}>
                            <Button
                              variant="contained"
                              type="button"
                              onClick={() =>
                                removeFromCartHandler(item.product)
                              }
                            >
                              Delete
                            </Button>
                          </Box>
                        {/* </Box> */}
                      </Card>
                    ))}
                  </Box>
                </Grid>
  
                <Grid xs sx={{display:{xs:"block",sm:"none"}}}>
                <Box sx={{ flexGrow: 1,justifyContent:"center"}}>
                  {cartItems.map((item) => (
                    <Card sx={{  minWidth: 200, marginLeft: 10,  m: 2,}}>
                      <CardMedia
                        key={item.product}
                        component="img"
                        sx={{ width: 150,marginLeft:13}}
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
                        <Box sx={{textAlign:"center"}}>
                       <Typography
                            gutterBottom
                            variant="h6"
                            component="div"
                          >
                             <Link to={`/product/${item.product}`} style={{textDecoration:"none"}}>{item.name}</Link>
                          </Typography>
                        </Box>

                        <Box sx={{textAlign:"center"}}>
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
                              {[...Array(item.countInStock).keys()].map(
                                (x) => (
                                  <MenuItem key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </MenuItem>
                                )
                              )}
                            </Select>
                          </FormControl>
                        </Box>
                        <Box sx={{textAlign:"center"}}>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                          >
                            ₹{item.price}
                          </Typography>
                        </Box>
                        <Box sx={{m:5,textAlign:"center"}}>
                          <Button
                            variant="contained"
                            type="button"
                            onClick={() =>
                              removeFromCartHandler(item.product)
                            }
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
            </div>
          </Grid>
          <Grid xs sx={{ marginTop: 11, display:{xs:"none" ,sm:"block"}}}>
            <div className="grid-elements">
              {userInfo ? (
                <Grid item xs>
                  <Card sx={{  maxWidth: 800,hieght:200,}}>
                    <Box >
                  <Box sx={{marginLeft:10}}><Typography gutterBottom variant="h4" component="div" >
                      Price Details
                    </Typography></Box>
                    <Divider/>
                    <Box sx={{marginLeft:10}}><Typography gutterBottom variant="h6" component="div" >
                      Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)}{" "}
                      items) :     ₹
                      {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                    </Typography></Box>
                    <Box sx={{marginLeft:10}}><Typography gutterBottom variant="h6" component="div" >
                      Discount:    ₹-100
                    </Typography></Box>
                    <Box sx={{marginLeft:10}}><Typography gutterBottom variant="h6" component="div" >
                    Delivery Charges:   Free
                    </Typography></Box>
                    <Divider/>
                    <Box sx={{marginLeft:10}}><Typography gutterBottom variant="h6" component="div" >
                      Total Amount :     ₹
                      {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                    </Typography></Box>
                    <Divider/>
                    <Box sx={{m:1,textAlign:"center"}}><Button
                   variant="contained"
                      type="button"
                      onClick={checkoutHandler}
                      className="primary block"
                      disabled={cartItems.length === 0}
                    >
                      Proceed to Checkout
                    </Button></Box>
                    </Box>
                  </Card>
                </Grid>
              ) : (
                <></>
              )}
            </div>
          </Grid>
          <Grid xs sx={{ display:{xs:"block",sm:"none"}}}>
            <div className="grid-elements">
              {userInfo ? (
                <Grid item xs>
                  <Card sx={{  minWidth: 200}}>
                    <Box >
                  <Box sx={{marginLeft:10}}><Typography gutterBottom variant="h4" component="div" >
                      Price Details
                    </Typography></Box>
                    <Divider/>
                    <Box sx={{marginLeft:10}}><Typography gutterBottom variant="h6" component="div" >
                      Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)}{" "}
                      items) :     ₹
                      {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                    </Typography></Box>
                    <Box sx={{marginLeft:10}}><Typography gutterBottom variant="h6" component="div" >
                      Discount:    ₹-100
                    </Typography></Box>
                    <Box sx={{marginLeft:10}}><Typography gutterBottom variant="h6" component="div" >
                    Delivery Charges:   Free
                    </Typography></Box>
                    <Divider/>
                    <Box sx={{marginLeft:10}}><Typography gutterBottom variant="h6" component="div" >
                      Total Amount :     ₹
                      {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                    </Typography></Box>
                    <Divider/>
                    <Box sx={{m:5,textAlign:"center"}}><Button
                   variant="contained"
                      type="button"
                      onClick={checkoutHandler}
                      className="primary block"
                      disabled={cartItems.length === 0}
                    >
                      Proceed to Checkout
                    </Button></Box>
                    </Box>
                  </Card>
                </Grid>
              ) : (
                <></>
              )}
            </div>
          </Grid>
        </Grid>
      </Box>

      {/* <div className="row top">
        <div className="col-2">
          <h1>Shopping Cart</h1>
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          {cartItems.length === 0 ? (
            <>
              {userInfo ? (
                <div className="cart img-container">
                  <div className="card card21">
                    <img className="cartin" src="/image/carts.jpg" />
                    <MessageBox>Cart is empty.</MessageBox>
                  </div>
                </div>
              ) : (
                <>
                  <div className="cart img-container">
                    <div className="card card22">
                      <img className="cartin" src="/image/carts.jpg" />
                      <MessageBox style={"color:red"}>
                        Cart is empty.
                      </MessageBox>
                      <Link to="/signin">
                        <button className="carts1">Sign In</button>
                      </Link>
                      <Link to="/register">
                        <button className="carts2">Register</button>
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <ul>
              {cartItems.map((item) => (
                <li key={item.product}>
                  <div className="row">
                    <div>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="small"
                      ></img>
                    </div>
                    <div className="min-30">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>
                    <div>
                      <select
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>${item.price}</div>
                    <div>
                      <button
                        type="button"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {userInfo ? (
          <div className="col-1">
            <div className="card card-body">
              <ul>
                <li>
                  <h2>
                    Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items)
                    : ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                  </h2>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={checkoutHandler}
                    className="primary block"
                    disabled={cartItems.length === 0}
                  >
                    Proceed to Checkout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div> */}
    </div>
  );
}
