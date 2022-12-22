import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import {
  kidsProductList,
  listProducts,
  menProductList,
  womenProductList,
} from "../actions/productAction";
import { listTopSellers } from "../actions/userAction";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";
import InfiniteScroll from "react-infinite-scroll-component";

// materieal ui******************
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Carousel from "react-elastic-carousel";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { applicatinSettingList } from "../actions/applicationAction";
import { List } from "../../node_modules/@material-ui/core/index";
import { categoryListDetails } from "../actions/categoryAction";
// import { CarouselPage } from "../components/CarouselPage";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export default function HomeScreen() {
  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.categoryList);
  const { categorydetails } = categoryList;
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;

  const productMenList = useSelector((state) => state.productMenList);
  const { menProducts } = productMenList;
  const productWomenList = useSelector((state) => state.productWomenList);
  const { womenProducts } = productWomenList;
  const productKidsList = useSelector((state) => state.productKidsList);
  const { kidProducts } = productKidsList;
  const applicationList = useSelector((state) => state.applicationList);
  const { appSettingList } = applicationList;
  const userTopSellersList = useSelector((state) => state.userTopSellersList);
  const {
    // eslint-disable-next-line no-unused-vars
    loading: loadingSellers,
    // eslint-disable-next-line no-unused-vars
    error: errorSellers,
    // eslint-disable-next-line no-unused-vars
    users: sellers,
  } = userTopSellersList;
  // setProductdetils(products)

  // const[newproduct,setNewProduct] = useState()
  // console.log("productdetils",newproduct);

  useEffect(() => {
    dispatch(categoryListDetails());
    dispatch(listProducts({}));
    dispatch(menProductList());
    dispatch(womenProductList());
    dispatch(kidsProductList());
    dispatch(listTopSellers());
    dispatch(applicatinSettingList());
  }, [dispatch]);

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  const navigate = useNavigate();
  const Open = () => {
    navigate("/cart");
  };

  const breakPoints = [
    { width: 400, itemsToShow: 1,itemsToScroll:  1 },
    { width: 500, itemsToShow: 2,itemsToScroll: 2 },
    { width: 600, itemsToShow: 2,itemsToScroll: 2 },
    { width: 768, itemsToShow: 3,itemsToScroll: 3 },
    { width: 900, itemsToShow: 5,itemsToScroll: 5 },
    { width: 1200, itemsToShow: 5,itemsToScroll: 5 },
    { width: 1500, itemsToShow: 7,itemsToScroll: 7 },
    { width: 2000, itemsToShow: 9,itemsToScroll: 9 },
  ];

  const [allKidProducts, setAllKidProducts] = useState(kidProducts);
  const [hasMore] = useState(true);
  const [lastPosition, setLastPosition] = useState(0);
  const perPage = 4;

  const loadProducts = () => {
    setTimeout(() => {
      setAllKidProducts((prev) => [...prev, ...prev]);
    }, 1000);

    setLastPosition(lastPosition + perPage);
  };

  // console.log("products", products);

 

  return (
    <Box>
      <Box className="convey">
        <h2 className="topseller">
          {" "}
          <span>Top Sellers</span>
        </h2>
        <Box sx={{ flexGrow: 1 }}>
          <AutoPlaySwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
            onClick={Open}
          >
            {appSettingList?.map((step, index) => (
              <Box key={index}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <Box
                    component="img"
                    sx={{
                      height: { xs: 255, sm: 330, md: 430, lg: 470, xl: 470 },
                      display: "block",
                      width: { xs: 400, sm: 400, lg: 1800, xl: 1800 },
                      overflow: "hidden",
                      cursor: "pointer",
                      // eslint-disable-next-line no-dupe-keys
                      width: "100%",
                    }}
                    src={`/api/application/show/${step.filename}`}
                    alt={step.filename}
                  />
                ) : null}
              </Box>
            ))}
          </AutoPlaySwipeableViews>
        </Box>
      </Box>

      <Box>
        {/* <CarouselPage ></CarouselPage> */}

        {categorydetails?.map((categoryitem,index) => (
          <>
          <List key={index}>
            <Link  to="/collectionlist/men"><Typography variant="h4">{categoryitem.categorytittel}</Typography></Link>
          </List>
          <Carousel
            className="new1"
            mouseTracking
            enableSwipe={true}
            pagination={false}
            breakPoints={breakPoints}
          >
          {products
          ?.filter((product) => {
            return product.categorytitle === categoryitem.categorytittel;
          })
          .map((product) => (
            <Box key={product._id}>
              <Product product={product}></Product>
            </Box>
          ))} 
          </Carousel>
          </>
        ))}

        {/* {products
          ?.filter((product) => {
            return product.categorytitle === "Men Collection";
          })
          .map((product) => (
            <Box key={product._id}>
              <Product product={product}></Product>
            </Box>
          ))} */}
      </Box>

      <Link
        to="/collectionlist/men"
        style={{
          color: "black",
          textDecoration: "none",
          textTransform: "capitalize",
        }}
      >
        <Typography
          variant="h4"
          sx={{ "&:hover": { color: "#6633FF", textDecoration: "underline" } }}
        >
          Men&#39;s collection
        </Typography>
      </Link>
      {loading ? (
        <CircularProgress></CircularProgress>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <Carousel
            className="new1"
            mouseTracking
            enableSwipe={true}
            pagination={false}
            // initialActiveIndex={3}
            breakPoints={breakPoints}
          >
            {menProducts?.map((menProduct) => (
              <Box key={menProduct._id}>
                <Product product={menProduct}></Product>
              </Box>
            ))}
          </Carousel>
        </>
      )}

      <Link
        to="/collectionlist/women"
        style={{
          color: "black",
          textDecoration: "none",
          textTransform: "capitalize",
        }}
      >
        <Typography
          variant="h4"
          sx={{ "&:hover": { color: "#6633FF", textDecoration: "underline" } }}
        >
          Women collection
        </Typography>
      </Link>
      {loading ? (
        <CircularProgress></CircularProgress>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <Carousel
            className="new1"
            mouseTracking
            enableSwipe={true}
            pagination={false}
            breakPoints={breakPoints}
            disableArrowsOnEnd={false}
          >
            {womenProducts?.map((womenProduct) => (
              <Box key={womenProduct._id}>
                <Product product={womenProduct}></Product>
              </Box>
            ))}
          </Carousel>
        </>
      )}

      <Link
        to="/collectionlist/kids"
        style={{
          color: "black",
          textDecoration: "none",
          textTransform: "capitalize",
        }}
      >
        <Typography
          sx={{ "&:hover": { color: "#6633FF", textDecoration: "underline" } }}
          variant="h4"
        >
          Kids collection
        </Typography>
      </Link>
      {loading ? (
        <CircularProgress></CircularProgress>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <InfiniteScroll
            dataLength={allKidProducts.length}
            next={loadProducts}
            hasMore={hasMore}
            // loader={<h4>Loading...</h4>}
          >
            <Carousel
              className="new3"
              mouseTracking
              enableAutoPlay
              autoPlaySpeed={1500}
              enableSwipe={true}
              pagination={false}
              breakPoints={breakPoints}
              kXteup={false}
            >
              {kidProducts?.map((kidProduct) => (
                <Box key={kidProduct._id}>
                  <Product product={kidProduct}></Product>
                </Box>
              ))}
            </Carousel>
          </InfiniteScroll>
        </>
      )}
    </Box>
  );
}
