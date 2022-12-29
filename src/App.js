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
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";

import {
  listProductCategories,
  listProductCategorygroup,
  listProductCategorytype,
} from "./actions/productAction";
import { listSareeCategories } from "./actions/sareeAction";
import AdminRoute from "./components/AdminRoute";
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
import { applicatinSettingList } from "./actions/applicationAction";
import { userCartList } from "./actions/cartAction";
import Badge from "@material-ui/core/Badge";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CollectionScreen from "./screens/CollectionScreen";
import ApplicationScreen from "./screens/ApplicationScreen";
import Footer from "./components/Footer";
import Paper from "@mui/material/Paper";
import { otpList } from "./actions/otpAction";

import OtpScreen from "./screens/OtpScreen";
import OtpVerifyScreen from "./screens/OtpVerifyScreen";
import RegOtpVerifyScreen from "./screens/RegOtpVerifyScreen";
import CategoryScreen from "./screens/CategoryScreen";
import CategoryMasterScreen from "./screens/CategoryMasterScreen";
import CatergorymasterScreens from "./screens/CatergorymasterScreens";
import { categoryMasterListDetails } from "./actions/categoryAction";
import CategoryMasterFormScreen from "./screens/CategoryMasterFormScreen";
import { AttributeMasterListDetails } from "./actions/AttributeActions";
import AttributesScreen from "./screens/AttributesScreen";
import TextEditScreen from "./screens/TextEditScreen";
import PrestaProductScreen from "./screens/PrestaProductScreen";
import BrandScreen from "./screens/BrandScreen";
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

// const classes = useStyles();

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
  firstchild: {
    height: "25%",
    background: "#FF0000",
    borderRadius: 0,
    color: "white",
    paddingTop: "2em",
    paddingBottom: "2em",
    fontFamily: "Brush Script MT",
  },
  // firstchild:{
  //   fontFamily:'Brush Script MT',
  // }
}));

const Style = withStyles((theme) => ({
  badge: {
    backgroundColor: "#FF66FF",
    top: 9,
    left: 23,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "relative",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      // border: "1px solid currentColor",
      // content: '""',
    },
  },
}))(Badge);

function App() {
  let currentlyHovering = false;
  // eslint-disable-next-line no-unused-vars
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { usercarts } = useSelector((state) => state.userCartListItem);
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

  const categoryMasterList = useSelector((state) => state.categoryMasterList);
  const { categoryMasterdetails } = categoryMasterList;

  useEffect(() => {
    dispatch(userCartList(userInfo?._id));
    dispatch(listProductCategories());
    dispatch(listProductCategorygroup());
    dispatch(listProductCategorytype());
    dispatch(listSareeCategories());
    dispatch(applicatinSettingList());
    dispatch(otpList());
    dispatch(categoryMasterListDetails());
dispatch(AttributeMasterListDetails());
  }, [dispatch, userInfo]);

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
  const classes = useStyles();
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

  const [sidopen, setSidopen] = useState();

  const handleClick = () => {
    setSidopen(!sidopen);
  };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            position="fixed"
            style={{
              zIndex: 999,
              background: "linear-gradient(to bottom,  #C5E1A5  ,#673AB7 ",
            }}
          >
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
                        <Avatar
                          sx={{
                            animation: "spin 5s linear infinite",
                            "@keyframes spin": {
                              "0%": {
                                transform: "rotate(360deg)",
                              },
                              "100%": {
                                transform: "rotate(0deg)",
                              },
                            },
                          }}
                          alt="Remy Sharp"
                          src="/image/logo.png"
                        />
                        <Typography
                          className={classes.sideBarButtons}
                          variant="h4"
                          noWrap
                          component="span"
                          sx={{
                            display: { xs: "block", sm: "block", md: "block" },
                            "&:hover": { color: "#ff7519" },
                          }}
                        >
                          <div className="firstchild">Lala</div>
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
                      {userInfo?.isAuth?( <SearchBox />):(
                  <></>
                )}
                    </Box>
                  </div>
                </Grid>
                <Grid item xs={2}>
                  <div className="grid-elements">
                    <Box sx={{ flexGrow: 0, display: "flex-end" }}>
                      <Stack
                        direction="row"
                        spacing={{ xs: 1.5, sm: 1.5, md: 1.5, lg: 1.5 }}
                        sx={{ justifyContent: "flex-end" }}
                      >
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
                                  <>
                                    {usercarts?.length >= 0 && (
                                      <Style
                                        badgeContent={usercarts?.length}
                                        overlap="rectangular"
                                      >
                                        <>
                                          {userInfo.isSeller && userInfo ? (
                                            <Avatar
                                              sx={{
                                                border: "2px solid #fff",
                                                bgcolor: "inherit",
                                                "&:hover": { color: "#ff7519" },
                                              }}
                                            >
                                              <ShoppingCartCheckoutIcon />
                                            </Avatar>
                                          ) : (
                                            <Avatar
                                              sx={{
                                                mr: -2.5,
                                                border: "2px solid #fff",
                                                bgcolor: "inherit",
                                                "&:hover": { color: "#ff7519" },
                                              }}
                                            >
                                              <ShoppingCartCheckoutIcon />
                                            </Avatar>
                                          )}
                                        </>
                                      </Style>
                                    )}
                                  </>
                                ) : (
                                  <Box>
                                    <Avatar
                                      sx={{
                                        border: "2px solid #fff",
                                        bgcolor: "inherit",
                                        "&:hover": { color: "#ff7519" },
                                        // mr: -30,
                                        display: "flex",
                                      }}
                                    >
                                      <ShoppingCartCheckoutIcon />
                                    </Avatar>
                                  </Box>
                                )}
                              </Link>
                            </IconButton>
                          </Tooltip>
                        </Box>
                        <Box
                          sx={{
                            display: { xs: "none", sm: "none", md: "flex" },
                          }}
                        >
                          {userInfo?.isSeller && userInfo && (
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
                                    <>
                                      {userInfo.isAdmin &&
                                      userInfo.isSeller &&
                                      userInfo ? (
                                        <Avatar
                                          sx={{
                                            border: "2px solid #fff",
                                            bgcolor: "inherit",
                                            "&:hover": { color: "#ff7519" },
                                          }}
                                        >
                                          <StorefrontIcon />
                                        </Avatar>
                                      ) : (
                                        <Avatar
                                          sx={{
                                            mr: -2,
                                            border: "2px solid #fff",
                                            bgcolor: "inherit",
                                            "&:hover": { color: "#ff7519" },
                                          }}
                                        >
                                          <StorefrontIcon />
                                        </Avatar>
                                      )}
                                    </>
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
                          {userInfo && userInfo.isAdmin && (
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
                                        border: "2px solid #fff",
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
                                    to="/support"
                                  >
                                    Support
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
                                    to="/application"
                                  >
                                    Application Setting
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
                                          border: "2px solid #fff",
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
                                      border: "2px solid #fff",
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
                                      border: "2px solid #fff",
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
                        {/* <Box>
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
                        </Box> */}
                      </Stack>
                    </Box>
                  </div>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>

          {/* {userInfo &&  ( */}
         {userInfo?.isAuth?( <AppBar
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
              background: "#fff",
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
                    // onMouseOver={(e) => setAnchorEl4(e.currentTarget)}
                    onClick={(e) => setAnchorEl4(e.currentTarget)}
                    // onMouseOver={handleClick1}
                    onMouseLeave={handleCloseHover}
                    color="inherit"
                    sx={{
                      "&:hover": { color: "#ff7519" },
                      fontSize: { sm: "14px", md: "16px", lg: "16px" },
                      marginRight: { lg: "20px", xl: "20px" },
                      cursor: "pointer",
                      color: "#37474f",
                      fontWeight: "bold",
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
                        <Link to="search/categorytype/trackpants">
                          trackpants&shorts
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/tracksuits">
                          tracksuits
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/sweatshirt">
                          Jackets&sweetshirts
                        </Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/sports-accessories">
                          sportsaccessories
                        </Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/swirm-wear">
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
                        <Link to="search/categorytype/small-wearble">
                          small wearables
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/fitnes">
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
                          to="search/categorygroup/fashion"
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
                          to="search/categorytype/wallet"
                        >
                          wallets
                        </Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/belt">belts</Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/perfume">
                          perfume&bodymists
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/helmet">helmets</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/trimmers">trimmers</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/deodorant">
                          Deodorants
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/tie">
                          tiles,cuffkins & pocketsquares
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/accessory-gift-seat">
                          accessory gift seat
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/caps-hates">
                          caps&hates
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/muffalear-scarves-gloves">
                          muffalear,scarves &gloves
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/phone-cases">
                          phone cases
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/rings-wrist-wear">
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
                          to="search/categorygroup/Bags-Backpacks"
                        >
                          Bags&Backpacks
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/categorygroup/luggages-trolleys"
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
                    onClick={(e) => setAnchorEl5(e.currentTarget)}
                    // onMouseOver={handleClick2}
                    onMouseLeave={handleCloseHover}
                    color="inherit"
                    sx={{
                      "&:hover": { color: "#ff7519" },
                      fontSize: { sm: "14px", md: "16px", lg: "16px" },
                      marginRight: { lg: "20px", xl: "20px" },
                      cursor: "pointer",
                      color: "#37474f",
                      fontWeight: "bold",
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
                          to="search/categorygroup/indian-fusion-wear"
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
                        <Link to="search/categorytype/kurtas-suits">
                          kurtas&suits
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/kurits-tunics">
                          kurits,tunics&tops
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/sarees">sarees</Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/ethnic-wear">
                          ethnic wear
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/laggins-salwars-chudidars">
                          laggins,salwars & chudidars
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/skirts-Palazzos">
                          Skirts & Palazzos
                        </Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/dress-materials">
                          Dress Materials
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/lehenga-cholis">
                          Lehenga Cholis
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/dupattas-shawls">
                          Dupattas & Shawls
                        </Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/jackets">Jackets</Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/categorygroup/belts-scarves"
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
                          to="search/categorygroup/watches-wearables"
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
                          to="search/categorygroup/western-wear"
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
                        <Link to="search/categorytype/dresses">Dresses</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/tops">Tops</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/T-shirts">Tshirts</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/Jeans">Jeans</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/shorts-skirts">
                          Shorts & Skirts
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/co-ords">Co-ords</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/playsuits">
                          Playsuits
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/jumpsuits">
                          Jumpsuits
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/shrugs">Shrugs</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/sweaters-sweatshirts">
                          Sweaters&Sweatshirts
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/jackets-coats">
                          Jackets & Coats
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/blazers-waistcoats">
                          Blazers & Waistcoats
                        </Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/categorygroup/plus-size"
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
                          to="search/categorygroup/maternity"
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
                          to="search/categorygroup/sunglasses-frames"
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
                          to="search/categorygroup/foot-wear"
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
                        <Link to="search/categorytype/flats">Flats</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/casual-shoes">
                          Casual Shoes
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/heels">Heels</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/boots">Boots</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/sports-shoes-floaters">
                          SportsShoes&Floaters
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/categorygroup/sports-activy-wear"
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
                        <Link to="search/categorytype/clothing">Clothing</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/Footwear">Footwear</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/sports-accessories">
                          Sports Accessories
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/sports-equipment">
                          Sports Equipment
                        </Link>
                      </MenuItem>
                    </div>
                    <div className="row">
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/categorygroup/lingerie-sleepwear"
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
                        <Link to="search/categorytype/bra">Bra</Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/briefs">Briefs</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/shapewear">
                          Shapewear
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/sleepwear-loungewear">
                          Sleepwear & Loungewear
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/swimwear">Swimwear</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/camisoles-thermal">
                          Camisoles & Thermals
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/categorygroup/beauty-personal-care"
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
                        <Link to="search/categorytype/makeup">Makeup</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/skincare">Skincare</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/premium-beauty">
                          Premium Beauty
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/lipsticks">
                          Lipsticks
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/fragrances">
                          Fragrances
                        </Link>
                      </MenuItem>
                    </div>
                    <div className="row">
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/categorygroup/gadgets"
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
                        <Link to="search/categorytype/smart-wearble">
                          SmartWearables
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/fitness-gadgets">
                          FitnessGadgets
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/headphone">
                          Headphones
                        </Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/speakers">Speakers</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/categorygroup/jewellery"
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
                        <Link to="search/categorytype/fashion-jewellery">
                          FashionJewellery
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/fine-jewellery">
                          Fine Jewellery
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/earrings">Earrings</Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/categorygroup/backpacks"
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
                          to="search/categorygroup/handbags-bags-wallets"
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
                          to="search/categorygroup/luggages-trolleys"
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
                    onClick={(e) => setAnchorEl6(e.currentTarget)}
                    onMouseLeave={handleCloseHover}
                    color="inherit"
                    sx={{
                      "&:hover": { color: "#ff7519" },
                      fontSize: { sm: "14px", md: "16px", lg: "16px" },
                      marginRight: { lg: "20px", xl: "20px" },
                      cursor: "pointer",
                      color: "#37474f",
                      fontWeight: "bold",
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
                          to="search/categorygroup/boys-clothing"
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
                        <Link to="search/categorytype/T-Shirts">T-Shirts</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/Shirts">Shirts</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/Shorts">Shorts</Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/jeans">Jeans</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/Trousers">Trousers</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/clothing-sets">
                          Clothing Sets
                        </Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/Ethnic-wear">
                          Ethnic Wear
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/track-pants-pyjamas">
                          Track Pants & Pyjamas
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/jacket-sweater-sweatshirts">
                          Jacket,Sweater & Sweatshirts
                        </Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/party-wear">
                          Party Wear
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/innerwear-thermals">
                          Innerwear & Thermals
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/nightwear-loungewear">
                          Nightwear & Loungewear
                        </Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/value-packs">
                          Value Packs
                        </Link>
                      </MenuItem>
                    </div>
                    <div className="row">
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/categorygroup/girls-clothing"
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
                        <Link to="search/categorytype/dress">Dresses</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/top">Tops</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/T-shirt">Tshirts</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/clothing-set">
                          Clothing Sets
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/lehenga-choli">
                          Lehenga choli
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/kurta-sets">
                          Kurta Sets
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/party-wears">
                          Party wear
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/dungarees-jumpsuits">
                          Dungarees & Jumpsuits
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/skirts-shorts">
                          Skirts & shorts
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/tights-leggings">
                          Tights & Leggings
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/jeans-trousers-capris">
                          Jeans,Trousers &Capris
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/jacket-sweater">
                          Jacket,Sweater&Sweatshirts
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/innerwear-thermal">
                          Innerwear & Thermals
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/nightwear-loungewears">
                          Nightwear & Loungewear
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/value-Pack">
                          Value Packs
                        </Link>
                      </MenuItem>
                    </div>
                    <div className="row">
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/categorygroup/foot-wears"
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
                        <Link to="search/categorytype/casual-shoes">
                          Casual Shoes
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/flipflops">
                          Flipflops
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/Sports-shoes">
                          Sports Shoes
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/flat">Flats</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/Sandals">Sandals</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/school-shoes">
                          School Shoes
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/Socks">Socks</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/categorygroup/toys"
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
                        <Link to="search/categorytype/learning-development">
                          Learning&Development
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/activity-toys">
                          Activity Toys
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/soft-toys">
                          Soft Toys
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/action-figure-play">
                          Action Figure / Play set
                        </Link>
                      </MenuItem>
                    </div>
                    <div className="row">
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/categorygroup/infants"
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
                        <Link to="search/categorytype/bodysuits">
                          Bodysuits
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/rompers-sleepsuits">
                          Rompers&Sleepsuits
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/clothing-sets">
                          Clothing Sets
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/t-shirts-tops">
                          Tshirts & Tops
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/dress">Dresses</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/bottom-wear">
                          Bottom wear
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/winter-wear">
                          Winter Wear
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/innerwear-sleepwear">
                          Innerwear & Sleepwear
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/infant-care">
                          Infant Care
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/categorygroup/home-bath"
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
                          to="search/categorygroup/personal-care"
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
                          to="search/categorygroup/kids-accessories"
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
                        <Link to="search/categorytype/bags-backpacks">
                          Bags&Backpacks
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/watches">Watches</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/kids-Jewellery-Hair-accessory">
                          Jewellery & Hairaccessory
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/sunglass">
                          Sunglasses
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/masks-protective-gears">
                          Masks & ProtectiveGears
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/caps-hat">
                          Caps & Hats
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/categorygroup/brands"
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
                        <Link to="search/categorytype/pantaloons">
                          Pantaloons
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/united-Colors">
                          UnitedColors of BenettonKids
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/yk">YK</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/us-kids">
                          U.S. Polo Assn. Kids
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/mothercare">
                          Mothercare
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/hrx">HRX</Link>
                      </MenuItem>
                    </div>
                  </Menu>

                  {/*********************Kids Section End ************/}
                  {/********************* Home & Living Section End ************/}

                  <Button
                    aria-controls="simple-menu7"
                    aria-haspopup="true"
                    //  onClick={(e) => setAnchorEl7(e.currentTarget)}
                    onClick={(e) => setAnchorEl7(e.currentTarget)}
                    onMouseLeave={handleCloseHover}
                    color="inherit"
                    sx={{
                      "&:hover": { color: "#ff7519" },
                      fontSize: { sm: "14px", md: "16px", lg: "16px" },
                      marginRight: { lg: "20px", xl: "20px" },
                      cursor: "pointer",
                      color: "#37474f",
                      fontWeight: "bold",
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
                          to="search/categorygroup/bed-linen"
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
                        <Link to="search/categorytype/bed-runners">
                          {" "}
                          Bed Runners
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/mattress-protectors">
                          Mattress Protectors
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/bedsheets">
                          Bedsheets
                        </Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/bedding-sets">
                          Bedding Sets
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/blankets-quilts-dohars">
                          Blankets,Quilts & Dohars
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/pillows-pillow-covers">
                          Pillows & Pillow Covers
                        </Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/category/home-Bed-Covers">
                          Bed Covers
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/diwan-sets">
                          Diwan Sets
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/chair-pads-covers">
                          Chair Pads & Covers
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/sofa-cover">
                          Sofa Covers
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/categorygroup/flooring"
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
                        <Link to="search/categorytype/floor-Runners">
                          Floor Runners
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/carpets">Carpets</Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/floor-mats-dhurries">
                          Floor Mats & Dhurries
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/door-mats">
                          Door Mats
                        </Link>
                      </MenuItem>
                    </div>
                    <div className="row">
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/categorygroup/bath"
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
                        <Link to="search/categorytype/bath-towels">
                          Bath Towels
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/hand-face-towels">
                          Hand & Face Towels
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/beach-towels">
                          Beach Towels
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/towels-set">
                          Towels Set
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/bath-rugs">
                          Bath Rugs
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/bath-robes">
                          Bath Robes
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/bathroom-accessories">
                          Bathroom Accessories
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/shower-curtains">
                          ShowerCurtains
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/categorygroup/lamps-lighting"
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
                        <Link to="search/categorytype/floor-lamps">
                          Floor Lamps
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/ceiling-lamps">
                          CeilingLamps
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/table-lamps">
                          Table Lamps
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/wall-lamps">
                          Wall Lamps
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/outdoor-lamps">
                          Outdoor Lamps
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/string-lights">
                          String Lights
                        </Link>
                      </MenuItem>
                    </div>
                    <div className="row">
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/categorygroup/home-Decor"
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
                        <Link to="search/categorytype/plants">
                          Plants & Planters
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/aromas-candles">
                          Aromas & Candles
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/clock">Clocks</Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/mirrors">Mirrors</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/wall-decor">
                          Wall Decor
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/festive-decor">
                          Festive Decor
                        </Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/pooja-essentials">
                          Pooja Essentials
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/wall-shelves">
                          Wall Shelves
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/fountains">
                          Fountains
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/showpieces-vases">
                          Show pieces& Vases
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/ottoman">Ottoman</Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/categorygroup/cushions-cushion-covers"
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
                          to="search/categorygroup/curtains"
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
                          to="search/categorygroup/home-gift-sets"
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
                          to="search/categorygroup/kitchen-table"
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
                        <Link to="search/categorytype/table-runners">
                          Table Runners
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/dinnerware-serveware">
                          Dinnerware & Serveware
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/cups-mugs">
                          Cups and Mugs
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/bakeware-cookware">
                          Bakeware & Cookware
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/kitchen-storage-tools">
                          Kitchen Storage & Tools
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/bar-drinkware">
                          Bar & Drinkware
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/table-covers-furnishings">
                          TableCovers&Furnishings
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/categorygroup/storages"
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
                        <Link to="search/categorytype/bins">Bins</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/hangers">Hangers</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/organisers">
                          Organisers
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/hooks-holders">
                          Hooks & Holders
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/laundry-bags">
                          Laundry Bags
                        </Link>
                      </MenuItem>
                    </div>

                    <div className="row">
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/categorygroup/brand"
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
                        <Link to="search/categorytype/h-m">H&M</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/marks-spencer">
                          Marks & Spencer
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/home-centre">
                          Home Centre
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/spaces">Spaces</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/d-decor">
                          D&#39;Decor
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/story-home">
                          Story@Home
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/pure-home-living">
                          PureHome&Living
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/swayam">Swayam</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/raymond-home">
                          Raymond Home
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/maspar">Maspar</Link>{" "}
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/trident">Trident</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/cortina">Cortina</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/random">Random</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/ellementry">
                          Ellementry
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/romee">ROMEE</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/nishagupta">
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
                    onClick={(e) => setAnchorEl8(e.currentTarget)}
                    onMouseLeave={handleCloseHover}
                    color="inherit"
                    sx={{
                      "&:hover": { color: "#ff7519" },
                      fontSize: { sm: "14px", md: "16px", lg: "16px" },
                      marginRight: { lg: "20px", xl: "20px" },
                      cursor: "pointer",
                      color: "#37474f",
                      fontWeight: "bold",
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
                          to="search/categorygroup/makeup"
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
                        <Link to="search/categorytype/lipstick">Lipstick</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/lip-gloss">
                          Lip Gloss
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/lip-liner">
                          Lip Liner
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/mascara">Mascara</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/eyeliner">Eyeliner</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/kajal">Kajal</Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/eyeshadow">
                          Eyeshadow
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/foundation">
                          Foundation
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/primer">Primer</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/concealer">
                          Concealer
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/compact">Compact</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/nail-polish">
                          Nail Polish
                        </Link>
                      </MenuItem>
                    </div>
                    <div className="row">
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/categorygroup/skincare-bath-body "
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
                        <Link to="search/categorytype/face-moisturiser">
                          Face Moisturiser
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/cleanser">Cleanser</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/masks-peel">
                          Masks & Peel
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/sunscreen">
                          Sunscreen
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/serum">Serum</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/face-wash">
                          Face Wash
                        </Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/eye-cream">
                          Eye Cream
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/lip-balm">Lip Balm</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/body-lotion ">
                          Body Lotion{" "}
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/body-wash">
                          Body Wash
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/body-scrup">
                          {" "}
                          Body Scrub
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/hand-cream">
                          Hand Cream{" "}
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/categorygroup/baby-care"
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
                          to="search/categorygroup/masks"
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
                          to="search/categorygroup/haircare"
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
                        <Link to="search/categorytype/shampoo">Shampoo</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/conditioner">
                          Conditioners
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/hair-cream">
                          Hair Cream
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/hair-oil">Hair Oil</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/hair-gel">Hair Gel</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/hair-color">
                          Hair Color
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/hair-serum">
                          Hair Serum
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/hair-accessory">
                          Hair Accessory
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/categorygroup/fragrances"
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
                        <Link to="search/categorytype/perfume">Perfume</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/deodorant">
                          Deodorant
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/body-mist">
                          Body Mist
                        </Link>
                      </MenuItem>
                    </div>
                    <div className="row">
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/categorygroup/appliances"
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
                        <Link to="search/categorytype/hair-straightener">
                          Hair Straightener
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/hair-dryer">
                          Hair Dryer
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/epilator">Epilator</Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/categorygroup/men-grooming"
                          style={{
                            lineHeight: "25px",
                            fontWeight: "bold",
                            color: "#0db7af",
                            textDecoration: "none",
                          }}
                        >
                          Men&#39;s Grooming
                        </Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/trimmers">Trimmers</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/beard-oil">
                          Beard Oil
                        </Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/hair-wax">Hair Wax</Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/categorygroup/beauty-gift-makeup"
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
                        <Link to="search/categorytype/beauty-gift">
                          Beauty Gift
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/makeup-kit">
                          Makeup Kit
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="search/categorygroup/premium-beauty"
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
                          to="search/categorygroup/wellness-hygiene"
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
                          to="search/categorygroup/top-brands"
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
                        <Link to="ssearch/categorytype/lakme">Lakme</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/maybelline">
                          Maybelline
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/loreal">Loreal</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/philips">Philips</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/bath-body-works">
                          Bath & Body Works
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/body-shop">
                          The Body Shop
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/biotique">Biotique</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/mamaearth">
                          Mamaearth
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/mcaffeine">
                          MCaffeine
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/nivea">Nivea</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/loreal-professionnel">
                          Loreal Professionnel
                        </Link>{" "}
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/kama-ayurveda">
                          Kama Ayerveda
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/m-a-c">M.A.C</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="search/categorytype/forest-essentials">
                          Forest Essentials
                        </Link>
                      </MenuItem>
                    </div>
                  </Menu>

                  {/*********************Beauty Section End ************/}
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>):(
            <></>
          )}
          {/* )} */}

         {userInfo?.isAuth? (<Drawer
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

                {/* {userInfo?.name} */}
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
              <>
                <>
                  {categories?.map((c, i) => (
                    <>
                      {categoryMasterdetails
                        ?.filter((item) => {
                          return item._id === c;
                        })
                        .map(
                          (item) => (
                            (
                              <Box key={i}>
                                <List>
                                  <Link
                                    style={{ textDecoration: "none" }}
                                    to={`/search/category/${item.categoryname}`}
                                  >
                                   
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

                                        cursor: "pointer",
                                        lineHeight: "2",

                                        "&:hover": { color: "#ff7519" },
                                      }}
                                      inputprops={{ disableUnderline: true }}
                                    >
                                      {item.categoryname}
                                    </Typography>
                                  </Link>
                                </List>
                              </Box>
                            )
                          )
                        )}
                    </>
                  ))}
                </>
              </>
            )}
            <Divider sx={{ backgroundColor: "#FFFFFF" }} showlabels="true" />
          </Drawer>):(
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

                  {/* {userInfo?.name} */}
                  <IconButton onClick={handleDrawerClose}>
                    {theme.direction === "ltr" ? (
                      <ChevronLeftIcon
                        sx={{
                          color: "white",
                          marginTop: "-10px",
                          marginLeft: 17,
                        }}
                      />
                    ) : (
                      <ChevronRightIcon />
                    )}
                  </IconButton>
                </Typography>
              </Stack>
              <Typography
                variant="h6"
                sx={{ color: "#fff", textAlign: "center" }}
              >
                Dashboard
              </Typography>
              <Divider sx={{ backgroundColor: "#FFFFFF" }} showlabels="true" />
              <List>
                <ListItemButton onClick={handleClick}>
                  <ListItemText sx={{ color: "#fff" }} primary="Catalog" />
                  {sidopen ? <ExpandLess sx={{ color: "#fff" }}/> : <ExpandMore sx={{ color: "#fff" }}/>}
                </ListItemButton>
                <Collapse in={sidopen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText sx={{ color: "#fff" }} primary="Products" />
                     
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
                      
                      <Link to='/categorymaster' style={{textDecoration:"none"}}><ListItemText sx={{ color: "#fff" }} primary="Categories" /></Link>
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
                      
                      <Link to='/attributes' style={{textDecoration:"none"}}><ListItemText sx={{ color: "#fff" }} primary="Attributes & Features" /></Link>
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
                      
                      <Link to='/brand' style={{textDecoration:"none"}}><ListItemText sx={{ color: "#fff" }} primary="Brand & Supplier" /></Link>
                    </ListItemButton>
                  </List>
                </Collapse>
              </List>
            </Drawer>
          )}
          <Box component="main" sx={{ p: 3, flexGrow: 1, minHeight: "100vh" }}>
            <Toolbar />
            {/* <Typography> */}
            <Routes>
            <Route
                path="/attributes"
                element={<AttributesScreen />}
              ></Route>
              <Route
                path="/categorysmaster"
                element={<CatergorymasterScreens />}
              ></Route>
               <Route path="/categorymaster" element={<CategoryMasterScreen/>}></Route>
               <Route path="/categoryFormmaster" element={<CategoryMasterFormScreen/>}></Route>
              <Route path="/categorys" element={<CategoryScreen />}></Route>
              <Route path="/seller/:id" element={<SellerScreen />}></Route>
              <Route path="/cart/:id" element={<CartScreen />}></Route>

              <Route path="/carttshirt/:id" element={<CartScreen />}></Route>
              <Route
                path="/search/name"
                element={<SearchScreen />}
                exact
              ></Route>

              <Route path="/cart" element={<CartScreen />}></Route>
              <Route
                path="/collectionlist/men"
                element={<CollectionScreen categorytype="Men" />}
              ></Route>
              <Route
                path="/collectionlist/women"
                element={<CollectionScreen categorytype="Women" />}
              ></Route>
              <Route
                path="/collectionlist/kids"
                element={<CollectionScreen categorytype="Kids" />}
              ></Route>
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
              <Route path="/otp" element={<OtpScreen />}></Route>
              <Route path="/otpVerify" element={<OtpVerifyScreen />}></Route>
              <Route path="/text" element={<TextEditScreen />}></Route>
              <Route path="/presta" element={<PrestaProductScreen />}></Route>
              <Route path="/brand" element={<BrandScreen />}></Route>
              <Route
                path="/regotpVerify"
                element={<RegOtpVerifyScreen />}
              ></Route>
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
                path="/application"
                element={
                  <AdminRoute>
                    <ApplicationScreen />
                  </AdminRoute>
                }
              />

              <Route
                path="/product/:id"
                element={<ProductScreen />}
                exact
              ></Route>
              <Route path="/footer" element={<Footer />} exact></Route>
              <Route
                path="/orderhistory"
                element={<OrderHistoryScreen />}
              ></Route>
              <Route path="/" element={<HomeScreen />} exact></Route>
            </Routes>
            {/* </Typography> */}
          </Box>

         {userInfo?.isAuth&&( <Paper
            sx={{
              position: "relative",
              bottom: 0,
              color: "#ff7519",
              alignItems: "center",
            }}
            elevation={0}
          >
            <Footer />
          </Paper>)}
        </Box>
      </div>
    </BrowserRouter>
  );
}

export default App;
