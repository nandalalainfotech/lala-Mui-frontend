import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { accountout, registerout, signout } from "./actions/userAction";
// import { adminout } from "./actions/userAction";
import PrivateRoute from "./components/PrivateRoute";
import AccountScreen from "./screens/AccountScreen";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import OrderScreen from "./screens/OrderScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductScreen from "./screens/ProductScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SigninScreen from "./screens/SigninScreen";
// import PersonIcon from '@mui/icons-material/Person';
// import HomeScreens from "./screens/HomeScreens";
import {
  listProductCategories,
  listProductCategorygroup,
  listProductCategorytype,
} from "./actions/productAction";
import { listSareeCategories } from "./actions/sareeAction";
import AdminRoute from "./components/AdminRoute";
import ChatBox from "./components/ChatBox";
import LoadingBox from "./components/LoadingBox";
import MessageBox from "./components/MessageBox";
import SearchBox from "./components/SearchBox";
import SellerRoute from "./components/SellerRoute";
import AccountCreation from "./screens/AccountCreation";
import AdmininScreen from "./screens/AdmininScreen";

import DashboardScreen from "./screens/DashboardScreen";

import MapScreen from "./screens/MapScreen";
import OrderListScreen from "./screens/OrderListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import ProductListScreen from "./screens/ProductListScreen";

import SearchScreen from "./screens/SearchScreen";
import SellerScreen from "./screens/SellerScreen";
import SupportScreen from "./screens/SupportScreen";
import UserEditScreen from "./screens/UserEditScreen";
import UserListScreen from "./screens/UserListScreen";

import AccountCircle from "@mui/icons-material/AccountCircle";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import { styled, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

// import Image from "/image/logo.png";
// Side bar section start*************************************
const drawerWidth = 240;
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  marginTop: theme.spacing(-6),
  color: "white",

  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
// Search bar section End*************************************

// const Item = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(1),
//   textAlign: 'center',
// }));

// eslint-disable-next-line no-unused-vars
const styles = (theme) => ({
  hover: {
    "&:hover": {
      backgroundColor: "red",
    },
  },
});

// ************************ footer******************
const useStyles = makeStyles((theme) => ({
  rootBox: {
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
    },
  },
  footerNav: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    marginRight: "auto",
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(0),

    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginLeft: "auto",
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(2),
    },
  },
  footerLink: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(2),
    },
  },
  popOverRoot: {
    pointerEvents: "none",
  },
}));

function App() {
  let currentlyHovering = false;
  const cart = useSelector((state) => state.cart);
  // eslint-disable-next-line no-unused-vars
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  // eslint-disable-next-line no-unused-vars
  const accountoutHandler = () => {
    dispatch(accountout());
  };
  // eslint-disable-next-line no-unused-vars
  const registeroutHandler = () => {
    dispatch(registerout());
  };

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;

  useEffect(() => {
    dispatch(listProductCategories());
    dispatch(listProductCategorygroup());
    dispatch(listProductCategorytype());
    dispatch(listSareeCategories());
  }, [dispatch]);

  // sidebar section Start****************************************
  const theme = useTheme();
  const [open, setOpen] = React.useState(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(null);
  };
  // sidebar section End****************************************

  // navbar dropdowns section Start**********************************************

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [anchorEl3, setAnchorEl3] = React.useState(null);
  const [anchorEl4, setAnchorEl4] = React.useState(null);
  const [anchorEl5, setAnchorEl5] = React.useState(null);
  const [anchorEl6, setAnchorEl6] = React.useState(null);
  const [anchorEl7, setAnchorEl7] = React.useState(null);
  const [anchorEl8, setAnchorEl8] = React.useState(null);

  function handleHover() {
    currentlyHovering = true;
  }
  const handleClose = () => {
    setAnchorEl(null);
    setAnchorEl2(null);
    setAnchorEl3(null);
    setAnchorEl4(null);
    setAnchorEl5(null);
    setAnchorEl6(null);
    setAnchorEl7(null);
    setAnchorEl8(null);
  };

  function handleCloseHover() {
    currentlyHovering = false;
    setTimeout(() => {
      if (!currentlyHovering) {
        handleClose();
      }
    }, 0);
  }
  // navbar dropdowns section End************************************************
  const styles = useStyles();

  const content = {
    brand: { image: "nereus-assets/img/nereus-light.png", width: 110 },
    copy: "© 2020 Nereus All rights reserved.",
    link1: "First Link",
    link2: "Second Link",
    link3: "Third Link",
    link4: "Fourth Link",
    // ...props.content
  };

  let brand;

  if (content.brand.image) {
    brand = (
      <img src={content.brand.image} alt="" width={content.brand.width} />
    );
  } else {
    // eslint-disable-next-line no-unused-vars
    brand = content.brand.text || "";
  }
  return (
    <BrowserRouter>
      <div className="grid-container">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed" style={{ zIndex: 999 }}>
            <Toolbar>
              <Grid container spacing={3}>
                <Grid item xs={2}>
                  <div className="grid-elements" style={{ display: "flex" }}>
                    <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      onClick={handleDrawerOpen}
                      edge="start"
                      sx={{
                        color: "inherit",
                        mr: 0,
                        ...(open && { display: "none" }),
                        "&:hover": { color: "#ff7519" },
                      }}
                    >
                      <MenuIcon />
                    </IconButton>

                    <Link
                      style={{ color: "inherit", textDecoration: "none" }}
                      to="/"
                    >
                      <Stack direction="row">
                        <Avatar alt="Remy Sharp" src="/image/logo.png" />
                        <Typography
                          variant="h4"
                          noWrap
                          component="span"
                          sx={{
                            display: { xs: "block", sm: "block", md: "block" },
                            "&:hover": { color: "#ff7519" },
                          }}
                        >
                          Lala
                        </Typography>
                      </Stack>
                    </Link>
                  </div>
                </Grid>
                <Grid item xs={8}>
                  <div className="grid-elements">
                    {" "}
                    <Box
                      style={{ justifyContent: "center" }}
                      sx={{
                        display: {
                          xs: "none",
                          sm: "block",
                          md: "block",
                          lg: "block",
                          xl: "block",
                        },
                      }}
                    >
                      <SearchBox />
                    </Box>
                  </div>
                </Grid>
                <Grid item xs={2}>
                  <div className="grid-elements">
                    <Box sx={{ flexGrow: 0 }}>
                      <Stack
                        direction="row"
                        spacing={{ xs: 3, sm: 2, md: 2, lg: 2, xl: 2 }}
                        sx={{ justifyContent: "flex-end" }}
                      >
                        <Box
                          sx={{
                            display: { xs: "none", sm: "none", md: "flex" },
                          }}
                        >
                          {userInfo && userInfo.isSeller && (
                            <div>
                              <Tooltip title="Seller" arrow>
                                <IconButton
                                  sx={{ p: 0, "&:hover": { color: "#ff7519" } }}
                                  aria-controls="simple-menu2"
                                  aria-haspopup="true"
                                  onClick={(e) => setAnchorEl2(e.currentTarget)} // Here you have to set target to `anchorEl2`
                                  color="inherit"
                                >
                                  <Link
                                    style={{ color: "inherit", size: "larger" }}
                                    to="#admin"
                                  >
                                    <Avatar
                                      sx={{
                                        bgcolor: "inherit",
                                        "&:hover": { color: "#ff7519" },
                                      }}
                                    >
                                      <StorefrontIcon />
                                    </Avatar>
                                  </Link>
                                </IconButton>
                              </Tooltip>
                              <Menu
                                id="simple-menu2"
                                anchorEl={anchorEl2}
                                keepMounted
                                open={Boolean(anchorEl2)}
                                onClose={handleClose}
                                MenuListProps={{ onMouseLeave: handleClose }}
                                style={{ marginTop: "13px" }}
                              >
                                <MenuItem onClick={handleClose}>
                                  <Link
                                    style={{
                                      fontSize: "16px",
                                      color: "#263238",
                                      textDecoration: "none",
                                    }}
                                    to="/productlist/seller"
                                  >
                                    Products
                                  </Link>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                  {" "}
                                  <Link
                                    style={{
                                      fontSize: "16px",
                                      color: "#263238",
                                      textDecoration: "none",
                                    }}
                                    to="/orderlist/seller"
                                  >
                                    Orders
                                  </Link>
                                </MenuItem>
                              </Menu>
                            </div>
                          )}
                        </Box>
                        <Box
                          sx={{
                            display: { xs: "none", sm: "none", md: "flex" },
                          }}
                        >
                          {userInfo && (
                            <div>
                              <Tooltip title="Admin" arrow>
                                <IconButton
                                  sx={{ p: 0, "&:hover": { color: "#ff7519" } }}
                                  aria-controls="simple-menu3"
                                  aria-haspopup="true"
                                  onClick={(e) => setAnchorEl3(e.currentTarget)} // Here you have to set target to `anchorEl2`
                                  color="inherit"
                                >
                                  <Link
                                    style={{ color: "inherit", size: "large" }}
                                    to="#admin"
                                  >
                                    <Avatar
                                      sx={{
                                        bgcolor: "inherit",
                                        "&:hover": { color: "#ff7519" },
                                      }}
                                    >
                                      <AdminPanelSettingsIcon />
                                    </Avatar>
                                  </Link>
                                </IconButton>
                              </Tooltip>

                              <Menu
                                id="simple-menu3"
                                anchorEl={anchorEl3}
                                keepMounted
                                open={Boolean(anchorEl3)}
                                onClose={handleClose}
                                MenuListProps={{ onMouseLeave: handleClose }}
                                style={{ marginTop: "13px" }}
                              >
                                <MenuItem onClick={handleClose} data-id="3">
                                  <Link
                                    style={{
                                      fontSize: "16px",
                                      color: "#263238",
                                      textDecoration: "none",
                                    }}
                                    to="/dashboard"
                                  >
                                    Dashboard
                                  </Link>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                  {" "}
                                  <Link
                                    style={{
                                      fontSize: "16px",
                                      color: "#263238",
                                      textDecoration: "none",
                                    }}
                                    to="/productlist"
                                  >
                                    Products
                                  </Link>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                  {" "}
                                  <Link
                                    style={{
                                      fontSize: "16px",
                                      color: "#263238",
                                      textDecoration: "none",
                                    }}
                                    to="/orderlist"
                                  >
                                    Orders
                                  </Link>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                  {" "}
                                  <Link
                                    style={{
                                      fontSize: "16px",
                                      color: "#263238",
                                      textDecoration: "none",
                                    }}
                                    to="/userlist"
                                  >
                                    Users
                                  </Link>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                  {" "}
                                  <Link
                                    style={{
                                      fontSize: "16px",
                                      color: "#263238",
                                      textDecoration: "none",
                                    }}
                                    o="/support"
                                  >
                                    Support
                                  </Link>
                                </MenuItem>
                              </Menu>
                            </div>
                          )}
                        </Box>
                        <Box>
                          {userInfo ? (
                            <div>
                              <Box
                                sx={{
                                  display: {
                                    xs: "none",
                                    sm: "none",
                                    md: "flex",
                                  },
                                }}
                              >
                                <Tooltip
                                  title={userInfo?.name}
                                  arrow
                                  placement="top"
                                >
                                  <IconButton
                                    sx={{
                                      p: 0,
                                      "&:hover": { color: "#ff7519" },
                                    }}
                                    aria-controls="simple-menu"
                                    aria-haspopup="true"
                                    color="black"
                                  >
                                    <Link
                                      style={{
                                        color: "black",
                                        textDecoration: "none",
                                      }}
                                      to="#"
                                    >
                                      <Avatar
                                        onClick={(e) =>
                                          setAnchorEl(e.currentTarget)
                                        }
                                        sx={{
                                          bgcolor: "inherit",
                                          "&:hover": { color: "#ff7519" },
                                        }}
                                      >
                                        {userInfo?.name?.charAt(0)}
                                      </Avatar>
                                      {/* <AccountCircle /> */}
                                    </Link>
                                  </IconButton>
                                </Tooltip>
                                <Menu
                                  id="simple-menu"
                                  anchorEl={anchorEl}
                                  keepMounted
                                  open={Boolean(anchorEl)}
                                  onClose={handleClose}
                                  MenuListProps={{ onMouseLeave: handleClose }}
                                  style={{ marginTop: "13px" }}
                                >
                                  <MenuItem onClick={handleClose} data-id="1">
                                    <Link
                                      style={{
                                        fontSize: "16px",
                                        color: "#263238",
                                        textDecoration: "none",
                                      }}
                                      to="/profile"
                                    >
                                      User Profile
                                    </Link>
                                  </MenuItem>
                                  <MenuItem onClick={handleClose}>
                                    {" "}
                                    <Link
                                      style={{
                                        fontSize: "16px",
                                        color: "#263238",
                                        textDecoration: "none",
                                      }}
                                      to="/orderhistory"
                                    >
                                      OrderHistory
                                    </Link>
                                  </MenuItem>
                                </Menu>
                              </Box>
                            </div>
                          ) : (
                            <Tooltip title="signIn" arrow>
                              <IconButton
                                sx={{ p: 0, "&:hover": { color: "#ff7519" } }}
                                color="inherit"
                              >
                                <Link style={{ color: "inherit" }} to="/signin">
                                  <Avatar
                                    sx={{
                                      bgcolor: "inherit",
                                      "&:hover": { color: "#ff7519" },
                                    }}
                                  >
                                    <AccountCircle />
                                  </Avatar>
                                </Link>
                              </IconButton>
                            </Tooltip>
                          )}
                        </Box>
                        <Box sx={{ display: { xs: "flex" } }}>
                          {userInfo && (
                            <Tooltip title="Log Out" arrow>
                              <IconButton
                                sx={{ p: 0, "&:hover": { color: "#ff7519" } }}
                                aria-label="show 4 new mails"
                                color="inherit"
                              >
                                <Link
                                  style={{ color: "inherit" }}
                                  to="#signout"
                                >
                                  <Avatar
                                    sx={{
                                      bgcolor: "inherit",
                                      "&:hover": { color: "#ff7519" },
                                    }}
                                  >
                                    <ExitToAppIcon onClick={signoutHandler} />
                                  </Avatar>
                                </Link>
                              </IconButton>
                            </Tooltip>
                          )}
                        </Box>
                        <Box>
                          <Tooltip title="Cart" arrow placement="top">
                            <IconButton
                              sx={{ p: 0, "&:hover": { color: "#ff7519" } }}
                              color="inherit"
                            >
                              <Link
                                style={{
                                  color: "inherit",
                                  textDecoration: "none",
                                }}
                                to="/cart"
                              >
                                {userInfo ? (
                                  <Avatar
                                    sx={{
                                      justifyContent: "center",
                                      bgcolor: "inherit",
                                      "&:hover": { color: "#ff7519" },
                                      display: {},
                                    }}
                                  >
                                    {" "}
                                    {cartItems.length > 0 && (
                                      <span className="badge">
                                        {cartItems.length}
                                      </span>
                                    )}
                                    <ShoppingCartCheckoutIcon />
                                  </Avatar>
                                ) : (
                                  <Box>
                                    <Avatar
                                      sx={{
                                        bgcolor: "inherit",
                                        "&:hover": { color: "#ff7519" },
                                        display: "flex",
                                      }}
                                    >
                                      {" "}
                                      {cartItems.length > 0 && (
                                        <span className="badge">
                                          {cartItems.length}
                                        </span>
                                      )}
                                      <ShoppingCartCheckoutIcon />
                                    </Avatar>
                                  </Box>
                                )}
                              </Link>
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Stack>
                    </Box>
                  </div>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>

          {/* {userInfo &&  ( */}
          <AppBar
            sx={{
              position: "absolute",
              display: {
                xs: "block",
                sm: "block",
                md: "block",
                lg: "block",
                xl: "block",
              },
            }}
            style={{
              marginTop: "50px",
              zIndex: "99",
              background: "#37474f",
              height: "60px",
            }}
          >
            <Toolbar>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: {
                      xs: "block",
                      sm: "none",
                      md: "none",
                      lg: "none",
                      xl: "none",
                      marginTop: "10px",
                    },
                  }}
                >
                  <div className="grid-elements">
                    {" "}
                    <Box style={{ justifyContent: "center" }}>
                      {userInfo && userInfo.isAdmin && <SearchBox />}
                    </Box>
                  </div>
                </Grid>
                <Grid
                  sx={{
                    display: {
                      xs: "none",
                      sm: "block",
                      md: "block",
                      lg: "block",
                      xl: "block",
                    },
                  }}
                  item
                  xs={10}
                  style={{
                    textAlign: "center",
                    justifyContent: "space-between",
                    marginTop: "10px",
                    padding: "25px 30px",
                  }}
                >
                  <Button
                    aria-controls="simple-menu4"
                    aria-haspopup="true"
                    onMouseOver={(e) => setAnchorEl4(e.currentTarget)}
                    // onMouseOver={handleClick1}
                    onMouseLeave={handleCloseHover}
                    color="inherit"
                    sx={{
                      "&:hover": { color: "#ff7519" },
                      fontSize: { sm: "14px", md: "16px", lg: "16px" },
                      marginRight: { lg: "20px", xl: "20px" },
                      cursor: "pointer",
                    }}
                  >
                    Men
                  </Button>
                  <Menu
                    id="simple-menu4"
                    anchorEl={anchorEl4}
                    open={Boolean(anchorEl4)}
                    onClose={handleClose}
                    MenuListProps={{
                      onMouseEnter: handleHover,
                      onMouseLeave: handleClose,
                      style: { pointerEvents: "auto" },
                    }}
                    getcontentanchorel={null}
                    anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                    PopoverClasses={{
                      root: styles.popOverRoot,
                    }}
                    sx={{
                      "& .MuiList-root": {
                        display: "flex",
                        flexDirection: "row",

                        overflowX: {
                          sm: "scroll",
                          lg: "hidden",
                          xl: "hidden",
                        },
                      },

                      width: { md: "900px", lg: "1300px", xl: "1800px" },
                      a: {
                        "&:hover": { color: "#ff7519" },
                        fontSize: {
                          sm: "12.3px",
                          md: "12.3px",
                          lg: "14px",
                          xl: "14px",
                        },
                        padding: {
                          sm: "0px 0px 3px 0px",
                          md: "1px 0px 3px 0px",
                          xl: "1px 0px 3px 0px",
                        },
                        lineHeight: {
                          sm: "8px",
                          md: "8px",
                          lg: "10px",
                          xl: "10px",
                        },
                        textDecoration: "none",
                        color: "#263238",
                        paddingRight: { sm: "0px" },
                        fontFamily: "Amazon Ember, Arial, sans-serif",
                      },
                    }}
                  >
                    <div className="row">
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/categorygroup/topwear"
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#ee5f73",
                            textDecoration: "none",
                          }}
                        >
                          Topwear
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/t-shirt">T-shirts</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/casual">
                          casual shirts
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/formal">
                          formal shirts
                        </Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/sweater">sweater</Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/jacket">Jackets</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/blazer">
                          Blazer&coats
                        </Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/suit">suits</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/rain-jacket">
                          Rain Jackets
                        </Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#ee5f73",
                            textDecoration: "none",
                          }}
                          to="search/categorygroup/indian"
                        >
                          Indian festival wear
                        </Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/kurtas">
                          Kurtas&kurtaseats
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/sherwani">Sherwanis</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/nehru">NehruJackets</Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/dhotis">Dhotis</Link>
                      </MenuItem>
                    </div>
                    <div className="row">
                      <MenuItem onClick={handleClose}>
                        <Link
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#ee5f73",
                            textDecoration: "none",
                          }}
                          to="search/categorygroup/bottom"
                        >
                          Bottom Wear
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/jean">Jeans</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/casual-trouser">
                          Casual trousers
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/formal-trouser">
                          formal trousers
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/short">shorts</Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/trackpant">
                          trackpants&joggers
                        </Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorygroup/inner-wear">
                          Innear Wear&Sleepe Wear
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/brief">
                          briefs&trunks
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/boxer">boxers</Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/vest">vests</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/sleep-wear">
                          sleepwear&loungewear
                        </Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/thermal">thermals</Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#ee5f73",
                            textDecoration: "none",
                          }}
                          to="search/categorygroup/plus"
                        >
                          Plus Size
                        </Link>
                      </MenuItem>
                    </div>
                    <div className="row">
                      <MenuItem onClick={handleClose}>
                        <Link
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#ee5f73",
                            textDecoration: "none",
                          }}
                          to="search/categorygroup/foot-wear"
                        >
                          Foot Wear
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/casual-shoe">
                          casual shoes
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/sport-shoe">
                          sports shoes
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/formal-shoe">
                          formal shoes
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/sneaker">sneakers</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/sandal">
                          sandals&floaters
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/flipfloap">
                          flipfloaps
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/sock">socks</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#ee5f73",
                            textDecoration: "none",
                          }}
                          to="search/categorygroup/personal-care-grooming"
                        >
                          personalCareGrooming
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#ee5f73",
                            textDecoration: "none",
                          }}
                          to="search/categorygroup/sunglasses"
                        >
                          Sunglasses&Frames
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#ee5f73",
                            textDecoration: "none",
                          }}
                          to="search/categorygroup/watch"
                        >
                          Watches
                        </Link>
                      </MenuItem>
                    </div>
                    <div className="row">
                      <MenuItem onClick={handleClose}>
                        <Link
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#ee5f73",
                            textDecoration: "none",
                          }}
                          to="search/categorygroup/sports-activy-wear"
                        >
                          Sports activy Wear
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/sports-shoe">
                          sports shoes
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/sports-sandal">
                          sports sandal
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/active-t-shirts">
                          active t-shirts
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/trackpants-shorts">
                          trackpants&shorts
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/tracksuits">
                          tracksuits
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/jackets-sweetshirts">
                          Jackets&sweetshirts
                        </Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/sports-accessories">
                          sportsaccessories
                        </Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/swirm-wears">
                          swirm wears
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            fontFamily: "Amazon Ember, Arial, sans-serif",
                            color: "#ee5f73",
                            textDecoration: "none",
                          }}
                          to="search/categorygroup/gadgets"
                        >
                          gadgets
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/small-wearables">
                          small wearables
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/fitness-gadgets">
                          fitness gadgets
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/headphone">
                          headphone
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/speakers">speakers</Link>
                      </MenuItem>
                    </div>
                    <div className="row">
                      <MenuItem onClick={handleClose}>
                        <Link
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#ee5f73",
                            textDecoration: "none",
                          }}
                          to="search/name/men-faschion"
                        >
                          Faschion Accessories
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link
                          style={{
                            color: "#263238",
                            textDecoration: "none",
                          }}
                          to="search/name/men-wallets"
                        >
                          wallets
                        </Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/name/men-belts">belts</Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/name/men-perfume-bodymists">
                          perfume&bodymists
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/name/men-belts">helmets</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/name/men-trimmers">trimmers</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/name/men-Deodorants">Deodorants</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/name/men-tiles-cuffkins-pocketsquares">
                          tiles,cuffkins & pocketsquares
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/name/men-accessory-gift-seat">
                          accessory gift seat
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/name/men-caps-hates">caps&hates</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/name/men-muffalear-scarves-gloves">
                          muffalear,scarves &gloves
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/name/men-perfume-bodymists">
                          perfume&bodymists
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/name/men-phone-cases">
                          phone cases
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/name/men-rings-wrist-wear">
                          rings&wrist wear
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#ee5f73",
                            textDecoration: "none",
                          }}
                          to="search/name/men-Bags-Backpacks"
                        >
                          Bags&Backpacks
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/name/men-Luggages-trolleys"
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#ee5f73",
                            textDecoration: "none",
                          }}
                        >
                          Luggages&trolleys
                        </Link>
                      </MenuItem>
                    </div>
                  </Menu>

                  {/*********************Men ************/}
                  {/*********************Women Section Start************/}

                  <Button
                    aria-controls="simple-menu5"
                    aria-haspopup="true"
                    onMouseOver={(e) => setAnchorEl5(e.currentTarget)}
                    // onMouseOver={handleClick2}
                    onMouseLeave={handleCloseHover}
                    color="inherit"
                    sx={{
                      "&:hover": { color: "#ff7519" },
                      fontSize: { sm: "14px", md: "16px", lg: "16px" },
                      marginRight: { lg: "20px", xl: "20px" },
                      cursor: "pointer",
                    }}
                  >
                    Women
                  </Button>
                  <Menu
                    id="simple-menu5"
                    anchorEl={anchorEl5}
                    open={Boolean(anchorEl5)}
                    onClose={handleClose}
                    MenuListProps={{
                      onMouseEnter: handleHover,
                      onMouseLeave: handleClose,
                      style: { pointerEvents: "auto" },
                    }}
                    getcontentanchorel={null}
                    anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                    PopoverClasses={{
                      root: styles.popOverRoot,
                    }}
                    sx={{
                      "& .MuiList-root": {
                        display: "flex",
                        flexDirection: "row",

                        overflowX: {
                          sm: "scroll",
                          lg: "hidden",
                          xl: "hidden",
                        },
                      },

                      width: { md: "900px", lg: "1300px", xl: "1800px" },
                      a: {
                        "&:hover": { color: "#ff7519" },
                        fontSize: {
                          sm: "12.3px",
                          md: "12.3px",
                          lg: "14px",
                          xl: "14px",
                        },
                        padding: {
                          sm: "0px 0px 3px 0px",
                          md: "1px 0px 3px 0px",
                          xl: "1px 0px 3px 0px",
                        },
                        lineHeight: {
                          sm: "8px",
                          md: "8px",
                          lg: "10px",
                          xl: "10px",
                        },
                        textDecoration: "none",
                        color: "#263238",
                        paddingRight: { sm: "0px" },
                        fontFamily: "Amazon Ember, Arial, sans-serif",
                      },
                    }}
                  >
                    <div className="row">
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/category/women-Indian-fusion-wear"
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#fb56c1",
                            textDecoration: "none",
                          }}
                        >
                          Indian&fusion wear
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/women-kurtas-suits">
                          kurtas&suits
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/women-kurits-tunics&tops">
                          kurits,tunics&tops
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/women-sarees">sarees</Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/women-ethnic-wear">
                          ethnic wear
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/women-laggins-salwars-chudidars">
                          laggins,salwars & chudidars
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/women-Skirts-Palazzos">
                          Skirts & Palazzos
                        </Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/women-Dress-Materials">
                          Dress Materials
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/women-Lehenga-Cholis">
                          Lehenga Cholis
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/women-Dupattas-Shawls">
                          Dupattas & Shawls
                        </Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/women-Jackets">Jackets</Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/category/women-Belts-Scarves-More"
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#fb56c1",
                            textDecoration: "none",
                          }}
                        >
                          Belts, Scarves & More
                        </Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/category/women-Watches-Wearables"
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#fb56c1",
                            textDecoration: "none",
                          }}
                        >
                          Watches & Wearables
                        </Link>
                      </MenuItem>
                    </div>
                    <div className="row">
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/category/women-Western-Wear"
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#fb56c1",
                            textDecoration: "none",
                          }}
                        >
                          Western Wear
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/women-Dresses">Dresses</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/women-Tops">Tops</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/women-T-shirts">Tshirts</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/women-Jeans">Jeans</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/women-Shorts-Skirts">
                          Shorts & Skirts
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/women-Co-ords">Co-ords</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/women-Playsuits">
                          Playsuits
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/women-Jumpsuits">
                          Jumpsuits
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/women-Shrugs">Shrugs</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/women-Sweaters-Sweatshirts">
                          Sweaters&Sweatshirts
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/women-Jackets-Coats">
                          Jackets & Coats
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/women-Blazers-Waistcoats">
                          Blazers & Waistcoats
                        </Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/category/women-Plus-Size"
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#fb56c1",
                            textDecoration: "none",
                          }}
                        >
                          Plus Size
                        </Link>
                      </MenuItem>
                    </div>
                    <div className="row">
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/category/women-Maternity"
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#fb56c1",
                            textDecoration: "none",
                          }}
                        >
                          Maternity
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/category/women-Sunglasses-Frames"
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#fb56c1",
                            textDecoration: "none",
                          }}
                        >
                          Sunglasses & Frames
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/category/women-Foot-Wear"
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#fb56c1",
                            textDecoration: "none",
                          }}
                        >
                          Foot Wear
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/women-Flats">Flats</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/women-Casual-Shoes">
                          Casual Shoes
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/women-Heels">Heels</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/women-Boots">Boots</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/women-Sports-Shoes-Floaters">
                          SportsShoes&Floaters
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="/search/category/women-ports-activy-Wear"
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#fb56c1",
                            textDecoration: "none",
                          }}
                        >
                          Sports &activy Wear
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/women-clothing">
                          Clothing
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/women-Footwear">
                          Footwear
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/women-Sports-Accessories">
                          Sports Accessories
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/women-Sports-Equipment">
                          Sports Equipment
                        </Link>
                      </MenuItem>
                    </div>
                    <div className="row">
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/category/women-Lingerie-Sleepwear"
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#fb56c1",
                            textDecoration: "none",
                          }}
                        >
                          Lingerie & Sleepwear
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/women-Bra">Bra</Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/women-Briefs">Briefs</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/women-Shapewear">
                          Shapewear
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/women-Sleepwear-Loungewear">
                          Sleepwear & Loungewear
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/women-Swimwear">
                          Swimwear
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/women-Camisoles-Thermals">
                          Camisoles & Thermals
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/category/women-Beauty-Personal-Care"
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#fb56c1",
                            textDecoration: "none",
                          }}
                        >
                          Beauty & Personal Care
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/women-Makeup">Makeup</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/women-Skincare">
                          Skincare
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/women-Premium-Beauty">
                          Premium Beauty
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/women-Lipsticks">
                          Lipsticks
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/women-Fragrances">
                          Fragrances
                        </Link>
                      </MenuItem>
                    </div>
                    <div className="row">
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="/Gadgets"
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#fb56c1",
                            textDecoration: "none",
                          }}
                        >
                          Gadgets
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/women-Smart-Wearables">
                          SmartWearables
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/women-Fitness-Gadgets">
                          FitnessGadgets
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/women-Headphones">
                          Headphones
                        </Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/women-Speakers">
                          Speakers
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/category/women-Jewellery"
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#fb56c1",
                            textDecoration: "none",
                          }}
                        >
                          Jewellery
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/women-Fashion-Jewellery">
                          FashionJewellery
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/women-Fine-Jewellery">
                          Fine Jewellery
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/women-Earrings">
                          Earrings
                        </Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/category/women-Gadgets"
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#fb56c1",
                            textDecoration: "none",
                          }}
                        >
                          Backpacks
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/category/women-Handbags-Bags-Wallets"
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#fb56c1",
                            textDecoration: "none",
                          }}
                        >
                          Handbags,Bags & Wallets
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/category/women-Luggages-Trolleys"
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#fb56c1",
                            textDecoration: "none",
                          }}
                        >
                          Luggages & Trolleys
                        </Link>
                      </MenuItem>
                    </div>
                  </Menu>

                  {/*********************Women Section End ************/}
                  {/*********************Kids Section End ************/}

                  <Button
                    aria-controls="simple-menu6"
                    aria-haspopup="true"
                    onMouseOver={(e) => setAnchorEl6(e.currentTarget)}
                    onMouseLeave={handleCloseHover}
                    color="inherit"
                    sx={{
                      "&:hover": { color: "#ff7519" },
                      fontSize: { sm: "14px", md: "16px", lg: "16px" },
                      marginRight: { lg: "20px", xl: "20px" },
                      cursor: "pointer",
                    }}
                  >
                    Kids
                  </Button>
                  <Menu
                    id="simple-menu6"
                    anchorEl={anchorEl6}
                    // keepMounted
                    open={Boolean(anchorEl6)}
                    onClose={handleClose}
                    MenuListProps={{
                      onMouseEnter: handleHover,
                      onMouseLeave: handleClose,
                      style: { pointerEvents: "auto" },
                    }}
                    getcontentanchorel={null}
                    anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                    PopoverClasses={{
                      root: styles.popOverRoot,
                    }}
                    sx={{
                      "& .MuiList-root": {
                        display: "flex",
                        flexDirection: "row",

                        overflowX: {
                          sm: "scroll",
                          lg: "hidden",
                          xl: "hidden",
                        },
                      },

                      width: { md: "900px", lg: "1300px", xl: "1800px" },
                      a: {
                        "&:hover": { color: "#ff7519" },
                        fontSize: {
                          sm: "12.3px",
                          md: "12.3px",
                          lg: "14px",
                          xl: "14px",
                        },
                        padding: {
                          sm: "0px 0px 3px 0px",
                          md: "1px 0px 3px 0px",
                          xl: "1px 0px 3px 0px",
                        },
                        lineHeight: {
                          sm: "8px",
                          md: "8px",
                          lg: "10px",
                          xl: "10px",
                        },
                        textDecoration: "none",
                        color: "#263238",
                        paddingRight: { sm: "0px" },
                        fontFamily: "Amazon Ember', Arial, sans-serif",
                      },
                    }}
                  >
                    <div className="row">
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/category/kids-Boys-Clothing"
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#f26a10",
                            textDecoration: "none",
                          }}
                        >
                          Boys Clothing
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-T-Shirts">T-Shirts</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Shirts">Shirts</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Shorts">Shorts</Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Jeans">Jeans</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Trousers">Trousers</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Clothing-Sets">
                          Clothing Sets
                        </Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Ethnic-Wear">
                          Ethnic Wear
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Track-Pants-Pyjamas">
                          Track Pants & Pyjamas
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="/Jacket-Sweater-Sweatshirts">
                          Jacket,Sweater & Sweatshirts
                        </Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Party-Wear">
                          Party Wear
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Innerwear-Thermals">
                          Innerwear & Thermals
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Nightwear-Loungewear">
                          Nightwear & Loungewear
                        </Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Value-Packs">
                          Value Packs
                        </Link>
                      </MenuItem>
                    </div>
                    <div className="row">
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/category/kids-girls-clothing"
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#f26a10",
                            textDecoration: "none",
                          }}
                        >
                          girls-clothing
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Dresses">Dresses</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Tops">Tops</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-T-shirts">Tshirts</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Clothing-Sets">
                          Clothing Sets
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Lehenga-choli">
                          Lehenga choli
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Kurta-Sets">
                          Kurta Sets
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Party-wear">
                          Party wear
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Dungarees-Jumpsuits">
                          Dungarees & Jumpsuits
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Skirts-shorts">
                          Skirts & shorts
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Tights-Leggings">
                          Tights & Leggings
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Jeans-Trousers-Capris">
                          Jeans,Trousers &Capris
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Jacket-Sweater-Sweatshirts">
                          Jacket,Sweater&Sweatshirts
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Innerwear-Thermals">
                          Innerwear & Thermals
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Nightwear-Loungewear">
                          Nightwear & Loungewear
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Value-Packs">
                          Value Packs
                        </Link>
                      </MenuItem>
                    </div>
                    <div className="row">
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/category/kids-Foot-Wear"
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#f26a10",
                            textDecoration: "none",
                          }}
                        >
                          Foot Wear
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Casual-Shoes">
                          Casual Shoes
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Flipflops">
                          Flipflops
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Sports Shoes">
                          Sports Shoes
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Flats">Flats</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Sandals">Sandals</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-School-Shoes">
                          School Shoes
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Socks">Socks</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/category/kids-Toys"
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#f26a10",
                            textDecoration: "none",
                          }}
                        >
                          Toys
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Learning-Development">
                          Learning&Development
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Activity-Toys">
                          Activity Toys
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Soft-Toys">
                          Soft Toys
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Action-Figure-Play">
                          Action Figure / Play set
                        </Link>
                      </MenuItem>
                    </div>
                    <div className="row">
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/category/kids-Infants"
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#f26a10",
                            textDecoration: "none",
                          }}
                        >
                          Infants
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Bodysuits">
                          Bodysuits
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Rompers-Sleepsuits">
                          Rompers&Sleepsuits
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Clothing-Sets">
                          Clothing Sets
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Tshirts-Tops">
                          Tshirts & Tops
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Dresses">Dresses</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Bottom-wear">
                          Bottom wear
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Winter-Wear">
                          Winter Wear
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Innerwear-Sleepwear">
                          Innerwear & Sleepwear
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Infant-Care">
                          Infant Care
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/category/kids-Home-Bath"
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#f26a10",
                            textDecoration: "none",
                          }}
                        >
                          Home & Bath
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/category/kids-Personal-Care"
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#f26a10",
                            textDecoration: "none",
                          }}
                        >
                          Personal Care
                        </Link>
                      </MenuItem>
                    </div>
                    <div className="row">
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/category/kids-Accessories"
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#f26a10",
                            textDecoration: "none",
                          }}
                        >
                          Kids Accessories
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Bags-Backpacks">
                          Bags&Backpacks
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Watches">Watches</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Jewellery-Hair-accessory">
                          Jewellery & Hairaccessory
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Sunglasses">
                          Sunglasses
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Masks-Protective-Gears">
                          Masks & ProtectiveGears
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Caps-Hats">
                          Caps & Hats
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/category/kids-Brands"
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#f26a10",
                            textDecoration: "none",
                          }}
                        >
                          Brands
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-H&M">H&M</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Max-Kids">Max Kids</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Pantaloons">
                          Pantaloons
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-United-Colors">
                          UnitedColors of BenettonKids
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-YK">YK</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Kids">
                          U.S. Polo Assn. Kids
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Mothercare">
                          Mothercare
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-HRX">HRX</Link>
                      </MenuItem>
                    </div>
                  </Menu>

                  {/*********************Kids Section End ************/}
                  {/********************* Home & Living Section End ************/}

                  <Button
                    aria-controls="simple-menu7"
                    aria-haspopup="true"
                    //  onClick={(e) => setAnchorEl7(e.currentTarget)}
                    onMouseOver={(e) => setAnchorEl7(e.currentTarget)}
                    onMouseLeave={handleCloseHover}
                    color="inherit"
                    sx={{
                      "&:hover": { color: "#ff7519" },
                      fontSize: { sm: "14px", md: "16px", lg: "16px" },
                      marginRight: { lg: "20px", xl: "20px" },
                      cursor: "pointer",
                    }}
                  >
                    Home & Living
                  </Button>
                  <Menu
                    id="simple-menu7"
                    anchorEl={anchorEl7}
                    // keepMounted
                    open={Boolean(anchorEl7)}
                    onClose={handleClose}
                    MenuListProps={{
                      onMouseEnter: handleHover,
                      onMouseLeave: handleClose,
                      style: { pointerEvents: "auto" },
                    }}
                    getcontentanchorel={null}
                    anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                    PopoverClasses={{
                      root: styles.popOverRoot,
                    }}
                    sx={{
                      "& .MuiList-root": {
                        display: "flex",
                        flexDirection: "row",

                        overflowX: {
                          sm: "scroll",
                          lg: "hidden",
                          xl: "hidden",
                        },
                      },

                      width: { md: "900px", lg: "1300px", xl: "1800px" },
                      a: {
                        "&:hover": { color: "#ff7519" },
                        fontSize: {
                          sm: "12.3px",
                          md: "12.3px",
                          lg: "14px",
                          xl: "14px",
                        },
                        padding: {
                          sm: "0px 0px 3px 0px",
                          md: "1px 0px 3px 0px",
                          xl: "1px 0px 3px 0px",
                        },
                        lineHeight: {
                          sm: "8px",
                          md: "8px",
                          lg: "10px",
                          xl: "10px",
                        },
                        textDecoration: "none",
                        color: "#263238",
                        paddingRight: { sm: "0px" },
                        fontFamily: "Amazon Ember', Arial, sans-serif",
                      },
                    }}
                  >
                    <div className="row">
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/category/home-Bed-Linen"
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#f2c210",
                            textDecoration: "none",
                          }}
                        >
                          Bed Linen & Furnishing
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Bed-Runners">
                          {" "}
                          Bed Runners
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Mattress-Protectors">
                          Mattress Protectors
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Bedsheets">
                          Bedsheets
                        </Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Bedding-Sets">
                          Bedding Sets
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Blankets-Quilts-Dohars">
                          Blankets,Quilts & Dohars
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Pillows-Pillow-Covers">
                          Pillows & Pillow Covers
                        </Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Bed-Covers">
                          Bed Covers
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Diwan-Sets">
                          Diwan Sets
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Chair-Pads-Covers">
                          Chair Pads & Covers
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Sofa-Covers">
                          Sofa Covers
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/category/home-Flooring"
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#f2c210",
                            textDecoration: "none",
                          }}
                        >
                          Flooring
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Floor-Runners">
                          Floor Runners
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Carpets">Carpets</Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Floor-Mats-Dhurries">
                          Floor Mats & Dhurries
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Door-Mats">
                          Door Mats
                        </Link>
                      </MenuItem>
                    </div>
                    <div className="row">
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/category/home-Bath"
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#f2c210",
                            textDecoration: "none",
                          }}
                        >
                          Bath
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Bath-Towels">
                          Bath Towels
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Hand-Face-Towels">
                          Hand & Face Towels
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Beach-Towels">
                          Beach Towels
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Towels-Set">
                          Towels Set
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Bath-Rugs">
                          Bath Rugs
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Bath-Robes">
                          Bath Robes
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Bathroom-Accessories">
                          Bathroom Accessories
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Shower-Curtains">
                          ShowerCurtains
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/category/home-Lamps-Lighting"
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#f2c210",
                            textDecoration: "none",
                          }}
                        >
                          Lamps&Lighting
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Floor-Lamps">
                          Floor Lamps
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Ceiling-Lamps">
                          CeilingLamps
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Table-Lamps">
                          Table Lamps
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Wall-Lamps">
                          Wall Lamps
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Outdoor-Lamps">
                          Outdoor Lamps
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-String-Lights">
                          String Lights
                        </Link>
                      </MenuItem>
                    </div>
                    <div className="row">
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/category/home-Decor"
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#f2c210",
                            textDecoration: "none",
                          }}
                        >
                          Home Decor
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Plants-Planters">
                          Plants & Planters
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Aromas-Candles">
                          Aromas & Candles
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Clocks">Clocks</Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Mirrors">Mirrors</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Wall-Decor">
                          Wall Decor
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Festive-Decor">
                          Festive Decor
                        </Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Pooja-Essentials">
                          Pooja Essentials
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Wall-Shelves">
                          Wall Shelves
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Fountains">
                          Fountains
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Showpieces-Vases">
                          Show pieces& Vases
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Ottoman">Ottoman</Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/category/home-Cushions-Cushion-Covers"
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#f2c210",
                            textDecoration: "none",
                          }}
                        >
                          Cushions & CushionCovers
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="/Curtains"
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#f2c210",
                            textDecoration: "none",
                          }}
                        >
                          Curtains
                        </Link>
                      </MenuItem>
                    </div>
                    <div className="row">
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/category/home-Home-Gift-Sets"
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#f2c210",
                            textDecoration: "none",
                          }}
                        >
                          Home Gift Sets
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/category/home-Kitchen-Table"
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#f2c210",
                            textDecoration: "none",
                          }}
                        >
                          Kitchen & Table
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Table-Runners">
                          Table Runners
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Dinnerware-Serveware">
                          Dinnerware & Serveware
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Cups-and-Mugs">
                          Cups and Mugs
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Bakeware-Cookware">
                          Bakeware & Cookware
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Kitchen-Storage-Tools">
                          Kitchen Storage & Tools
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Bar-Drinkware">
                          Bar & Drinkware
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Table-Covers-Furnishings">
                          TableCovers&Furnishings
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/category/home-Gadgets"
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#f2c210",
                            textDecoration: "none",
                          }}
                        >
                          Storage
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Bins">Bins</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Hangers">Hangers</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Organisers">
                          Organisers
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Hooks-Holders">
                          Hooks & Holders
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Laundry-Bags">
                          Laundry Bags
                        </Link>
                      </MenuItem>
                    </div>

                    <div className="row">
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/category/home-Brands"
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#f2c210",
                            textDecoration: "none",
                          }}
                        >
                          Brands
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-H&M">H&M</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Marks-Spencer">
                          Marks & Spencer
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Home-Centre">
                          Home Centre
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Spaces">Spaces</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-D-Decor">D'Decor</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Story-Home">
                          Story@Home
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Pure-Home-Living">
                          PureHome&Living
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Swayam">Swayam</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Raymond-Home">
                          Raymond Home
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Maspar">Maspar</Link>{" "}
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Trident">Trident</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Cortina">Cortina</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Random">Random</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Ellementry">
                          Ellementry
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-ROMEE">ROMEE</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Story-Home">
                          SEJby NishaGupta
                        </Link>
                      </MenuItem>
                    </div>
                  </Menu>

                  {/********************* Home & Living Section End ************/}
                  {/*********************Beauty Section End ************/}

                  <Button
                    aria-controls="simple-menu8"
                    aria-haspopup="true"
                    //  onClick={(e) => setAnchorEl8(e.currentTarget)}
                    onMouseOver={(e) => setAnchorEl8(e.currentTarget)}
                    onMouseLeave={handleCloseHover}
                    color="inherit"
                    sx={{
                      "&:hover": { color: "#ff7519" },
                      fontSize: { sm: "14px", md: "16px", lg: "16px" },
                      marginRight: { lg: "20px", xl: "20px" },
                      cursor: "pointer",
                    }}
                  >
                    Beauty
                  </Button>
                  <Menu
                    id="simple-menu8"
                    anchorEl={anchorEl8}
                    // keepMounted
                    open={Boolean(anchorEl8)}
                    onClose={handleClose}
                    MenuListProps={{
                      onMouseEnter: handleHover,
                      onMouseLeave: handleClose,
                      style: { pointerEvents: "auto" },
                    }}
                    getcontentanchorel={null}
                    anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                    PopoverClasses={{
                      root: styles.popOverRoot,
                    }}
                    sx={{
                      "& .MuiList-root": {
                        display: "flex",
                        flexDirection: "row",

                        overflowX: {
                          sm: "scroll",
                          lg: "hidden",
                          xl: "hidden",
                        },
                      },

                      width: { md: "900px", lg: "1300px", xl: "1800px" },
                      a: {
                        "&:hover": { color: "#ff7519" },
                        fontSize: {
                          sm: "12.3px",
                          md: "12.3px",
                          lg: "14px",
                          xl: "14px",
                        },
                        padding: {
                          sm: "0px 0px 3px 0px",
                          md: "1px 0px 3px 0px",
                          xl: "1px 0px 3px 0px",
                        },
                        lineHeight: {
                          sm: "8px",
                          md: "8px",
                          lg: "10px",
                          xl: "10px",
                        },
                        textDecoration: "none",
                        color: "#263238",
                        paddingRight: { sm: "0px" },
                        fontFamily: "Amazon Ember', Arial, sans-serif",
                      },
                    }}
                  >
                    <div className="row">
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/category/beauty-Makeup"
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#0db7af",
                            textDecoration: "none",
                          }}
                        >
                          Makeup
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Lipstick">
                          Lipstick
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Lip-Gloss">
                          Lip Gloss
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Lip-Liner">
                          Lip Liner
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Mascara">Mascara</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Eyeliner">
                          Eyeliner
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Kajal">Kajal</Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Eyeshadow">
                          Eyeshadow
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Foundation">
                          Foundation
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Primer">Primer</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Concealer">
                          Concealer
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Compact">Compact</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Nail-Polish">
                          Nail Polish
                        </Link>
                      </MenuItem>
                    </div>
                    <div className="row">
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="/Skincare-Bath-Body "
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#0db7af",
                            textDecoration: "none",
                          }}
                        >
                          Skincare, Bath & Body
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Face-Moisturiser">
                          Face Moisturiser
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Cleanser">
                          Cleanser
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Masks-Peel">
                          Masks & Peel
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Sunscreen">
                          Sunscreen
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Serum">Serum</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Face-Wash">
                          Face Wash
                        </Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Eye-Cream">
                          Eye Cream
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Lip-Balm">
                          Lip Balm
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Body-Lotion ">
                          Body Lotion{" "}
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Body-Wash">
                          Body Wash
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Body-Scrup">
                          {" "}
                          Body Scrub
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Hand-cream">
                          Hand Cream{" "}
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/category/beauty-Baby-Care"
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#0db7af",
                            textDecoration: "none",
                          }}
                        >
                          Baby Care
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/category/beauty-Masks"
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#0db7af",
                            textDecoration: "none",
                          }}
                        >
                          Masks
                        </Link>
                      </MenuItem>
                    </div>
                    <div className="row">
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/category/beauty-Haircare"
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#0db7af",
                            textDecoration: "none",
                          }}
                        >
                          Haircare
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Shampoo">Shampoo</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Conditioner">
                          Conditioners
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Hair-Cream">
                          Hair Cream
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Hair-Oil">
                          Hair Oil
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Hair-Gel">
                          Hair Gel
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Hair-Color">
                          Hair Color
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Hair-Serum">
                          Hair Serum
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Hair-Accessory">
                          Hair Accessory
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/category/beauty-Fragrances"
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#0db7af",
                            textDecoration: "none",
                          }}
                        >
                          Fragrances
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Perfume">Perfume</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Deodorant">
                          Deodorant
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Body-Mist">
                          Body Mist
                        </Link>
                      </MenuItem>
                    </div>
                    <div className="row">
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/category/beauty-Appliances"
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#0db7af",
                            textDecoration: "none",
                          }}
                        >
                          Appliances
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Hair-Straightener">
                          Hair Straightener
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Hair-Dryer">
                          Hair Dryer
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Epilator">
                          Epilator
                        </Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/category/beauty-Men-Grooming"
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#0db7af",
                            textDecoration: "none",
                          }}
                        >
                          Men's Grooming
                        </Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Trimmers">
                          Trimmers
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Beard-Oil">
                          Beard Oil
                        </Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Hair-Wax">
                          Hair Wax
                        </Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/category/beauty-Beauty-Gift-Makeup"
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#0db7af",
                            textDecoration: "none",
                          }}
                        >
                          Beauty Gift & Makeup Set
                        </Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Beauty-Gift">
                          Beauty Gift
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Makeup-Kit">
                          Makeup Kit
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/category/beauty-Premium-Beauty"
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#0db7af",
                            textDecoration: "none",
                          }}
                        >
                          Premium Beauty
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/category/beauty-Wellness-Hygiene"
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#0db7af",
                            textDecoration: "none",
                          }}
                        >
                          Wellness & Hygiene
                        </Link>
                      </MenuItem>
                    </div>
                    <div className="row">
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/category/beauty-Top-Brands"
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#0db7af",
                            textDecoration: "none",
                          }}
                        >
                          Top Brands
                        </Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Lakme">Lakme</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Maybelline">
                          Maybelline
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Loreal">Loreal</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Philips">Philips</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Bath-Body-Works">
                          Bath & Body Works
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Body-Shop">
                          The Body Shop
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Biotique">
                          Biotique
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Mamaearth">
                          Mamaearth
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-MCaffeine">
                          MCaffeine
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Nivea">Nivea</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Loreal-Professionnel">
                          Loreal Professionnel
                        </Link>{" "}
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-KAMA-AYURVEDA">
                          Kama Ayerveda
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-m.a.c">M.A.C</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/beauty-Forest-Essentials">
                          Forest Essentials
                        </Link>
                      </MenuItem>
                    </div>
                  </Menu>

                  {/*********************Beauty Section End ************/}
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          {/* )} */}

          <Drawer
            sx={{
              width: drawerWidth,

              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
                backgroundColor: "#13265C",
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <DrawerHeader></DrawerHeader>

            <Stack direction="row">
              <Typography
                variant="h5"
                noWrap
                component="span"
                sx={{
                  fontSize: "20px",
                  color: "#F0FFF0",
                  marginBottom: "15px",
                  display: { xs: "block", sm: "block", md: "block" },
                  "&:hover": { color: "#ff7519" },
                  fontWeight: "700",
                  textAlign: "center",
                  marginLeft: "50px",
                }}
              >
                {/* <Avatar
                  sx={{
                    bgcolor: "inherit",
                    marginLeft: "50px",
                    textAlign: 'center',
                    "&:hover": { color: "#ff7519" },
                    // marginTop:"-5px",
                  }}
                >
                  <PersonIcon sx={{ fontSize: 60 }} /></Avatar> */}

                {userInfo?.name}
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === "ltr" ? (
                    <ChevronLeftIcon
                      sx={{
                        color: "white",
                        marginTop: "-10px",
                        marginLeft: "15px",
                      }}
                    />
                  ) : (
                    <ChevronRightIcon />
                  )}
                </IconButton>
              </Typography>
            </Stack>

            <Divider sx={{ backgroundColor: "#FFFFFF" }} showlabels="true" />
            <Typography
              sx={{
                color: "#F0FFF0",
                // color: "#263238",
                fontSize: "18px",
                textDecoration: "none",
                textAlign: "center",
                textTransform: "capitalize",
                padding: " 10px",
                fontWeight: "700",
                "&:hover": { color: "#ff7519" },
                cursor: "pointer",
                // backgroundColor: "#FDF2F0",
              }}
            >
              Categories
            </Typography>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories?.map((c, i) => (
                <Box key={i}>
                  <List to={`/search/category/${c}`}>
                    <Typography
                      variant="h4"
                      sx={{
                        color: "	#F0FFF0",
                        paddingTop: "-55px",
                        marginTop: "-2px",
                        textAlign: "center",
                        fontSize: "16px",
                        textDecoration: "none",
                        textTransform: "capitalize",
                        opacity: "1",
                        fontWeight: "600",
                        "&:hover": { color: "#ff7519" },
                      }}
                      inputprops={{ disableUnderline: true }}
                    >
                      {c}
                    </Typography>
                  </List>
                </Box>
              ))
            )}
            <Divider sx={{ backgroundColor: "#FFFFFF" }} showlabels="true" />
          </Drawer>
          <Box component="main" sx={{ p: 3 }}>
            <Toolbar />
            {/* <Typography> */}
            <Routes>
              <Route path="/seller/:id" element={<SellerScreen />}></Route>
              <Route path="/cart/:id" element={<CartScreen />}></Route>

              <Route path="/carttshirt/:id" element={<CartScreen />}></Route>
              <Route
                path="/search/name"
                element={<SearchScreen />}
                exact
              ></Route>

              <Route path="/cart" element={<CartScreen />}></Route>

              <Route path="/signin" element={<SigninScreen />}></Route>
              <Route path="/account" element={<AccountScreen />}></Route>
              <Route
                path="/accountcreation"
                element={<AccountCreation />}
              ></Route>
              <Route path="/adminin" element={<AdmininScreen />}></Route>
              <Route
                path="/shipping"
                element={<ShippingAddressScreen />}
              ></Route>
              <Route path="/payment" element={<PaymentMethodScreen />}></Route>
              <Route path="/placeorder" element={<PlaceOrderScreen />}></Route>
              <Route path="/order/:id" element={<OrderScreen />}></Route>
              <Route path="/register" element={<RegisterScreen />}></Route>
              <Route
                path="/search/name"
                element={<SearchScreen />}
                exact
              ></Route>
              <Route
                path="/productlist/seller"
                element={
                  <SellerRoute>
                    <ProductListScreen />
                  </SellerRoute>
                }
                exact
              ></Route>

              <Route
                path="/OrderList/seller"
                element={
                  <SellerRoute>
                    <OrderListScreen />
                  </SellerRoute>
                }
                exact
              ></Route>
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <ProfileScreen />
                  </PrivateRoute>
                }
              />
              <Route
                path="/productlist"
                element={
                  <AdminRoute>
                    <ProductListScreen />
                  </AdminRoute>
                }
                exact
              />

              <Route
                path="/orderlist"
                element={
                  <AdminRoute>
                    <OrderListScreen />
                  </AdminRoute>
                }
                exact
              />

              <Route
                path="/search/name/:name"
                element={<SearchScreen />}
                exact
              ></Route>

              <Route
                path="/search/categorygroup/:categorygroup"
                element={<SearchScreen />}
                exact
              ></Route>
              <Route
                path="/search/categorytype/:categorytype"
                element={<SearchScreen />}
                exact
              ></Route>
              {/* <Route
              path="/search/category/:category/name/:name"
              element={<SearchScreen />}
              exact
            ></Route> */}
              <Route
                path="/search/category:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
                element={<SearchScreen />}
                exact
              ></Route>

              <Route
                path="/productlist/seller"
                element={
                  <SellerRoute>
                    <ProductListScreen />
                  </SellerRoute>
                }
              />
              <Route
                path="/orderlist/seller"
                element={
                  <SellerRoute>
                    <OrderListScreen />
                  </SellerRoute>
                }
              />
              <Route
                path="/products/new"
                element={<ProductEditScreen />}
                exact
              ></Route>
              <Route
                path="/product/:id/edit"
                element={<ProductEditScreen />}
                exact
              ></Route>

              <Route
                path="/user/:id/edit"
                element={
                  <AdminRoute>
                    <UserEditScreen />
                  </AdminRoute>
                }
              />
              <Route
                path="/userlist"
                element={
                  <AdminRoute>
                    <UserListScreen />
                  </AdminRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <AdminRoute>
                    <DashboardScreen />
                  </AdminRoute>
                }
              />

              <Route
                path="/productlist/pageNumber/:pageNumber"
                element={
                  <AdminRoute>
                    <ProductListScreen />
                  </AdminRoute>
                }
              />
              {/* <Route
              path="/Home"
              element={
                <AdminRoute>
                  <HomeScreens />
                </AdminRoute>
              }
            /> */}

              <Route
                path="/search/category/:category"
                element={<SearchScreen />}
                exact
              ></Route>
              <Route
                path="/search/category/:category/name/:name"
                element={<SearchScreen />}
                exact
              ></Route>
              <Route
                path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
                element={<SearchScreen />}
                exact
              ></Route>
              <Route
                path="/map"
                element={
                  <PrivateRoute>
                    <MapScreen />
                  </PrivateRoute>
                }
              />
              <Route
                path="/support"
                element={
                  <AdminRoute>
                    <SupportScreen />
                  </AdminRoute>
                }
              />

              <Route
                path="/product/:id"
                element={<ProductScreen />}
                exact
              ></Route>

              <Route
                path="/orderhistory"
                element={<OrderHistoryScreen />}
              ></Route>
              <Route path="/" element={<HomeScreen />} exact></Route>
            </Routes>
            {/* </Typography> */}
          </Box>
          <Paper
            sx={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              color: "#f4f4f4",
              alignItems: "center",
              zIndex: 999,
            }}
            elevation={3}
          >
            <BottomNavigation sx={{ backgroundColor: "#37474f" }} showlabels="true">
              {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
              <BottomNavigationAction label="All right reserved" />
            </BottomNavigation>
          </Paper>
        </Box>
      </div>
    </BrowserRouter>
  );
}

export default App;
