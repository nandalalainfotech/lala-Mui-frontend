import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { listKids } from "../actions/kidAction";
import { listProducts } from "../actions/productAction";
import { listTopSellers } from "../actions/userAction";
import { listWomens } from "../actions/womenAction";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";
// import LeftArrow from "../assets/left-arrow.svg"
// import RightArrow from "../assets/right-arrow.svg"

// materieal ui******************
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Carousel from "react-elastic-carousel";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
// import Carousel from 'react-material-ui-carousel'
import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from "../../node_modules/@material-ui/core/index";
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    imgPath: "/image/lala1.jpg",
  },
  {
    imgPath: "/image/lala2.jpg",
  },
  {
    imgPath: "/image/lala3.jpg",
  },
  // {
  //   imgPath: "/image/lala4.jpg",
  // },
  // {
  //   imgPath: "/image/lala5.jpg",
  // },
  // {
  //   imgPath: "/image/lala7.jpg",
  // },
];



export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const userTopSellersList = useSelector((state) => state.userTopSellersList);
  // const womenList = useSelector((state) => state.womenList);
  // const { womens } = womenList;
  // const kidList = useSelector((state) => state.kidList);
  // const { loading, error, kids } = kidList;
  const {
    loading: loadingSellers,
    error: errorSellers,
    users: sellers,
  } = userTopSellersList;
  useEffect(() => {
    dispatch(listProducts({}));
    dispatch(listTopSellers());
  }, [dispatch]);


  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  // const maxSteps = images.length;

  // const handleNext = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const breakPoints = [
    { width: 400, itemsToShow: 1 },
    { width: 500, itemsToShow: 2 },
    { width: 600, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 900, itemsToShow: 5 },
    { width: 1200, itemsToShow: 5 },
    { width: 1500, itemsToShow: 8 },
  ];


  return (
    <Box >
      <Box className="convey">
      <h2> <span>Top Sellers</span></h2> 
        <Box sx={{ flexGrow: 1, }}>
          <AutoPlaySwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >

            {images?.map((step, index) => (
              <Box>
                {Math.abs(activeStep - index) <= 2 ? (
                  <Box
                    component="img"
                    sx={{
                      height: { xs: 255, sm: 330, md: 430, lg: 470, xl: 470 },
                      display: "block",
                      width: { xs: 400, sm: 400, lg: 1800, xl: 1800 },
                      overflow: "hidden",
                      width: "100%",
                    }}
                    src={step.imgPath}
                    alt={step.label}
                  />
                ) : null}
              </Box>
            ))}
          </AutoPlaySwipeableViews>
        </Box>
      </Box>

      {/* <div>
        <Carousel  breakPoints={breakPoints}pagination={false}>
        {items.map(item => <div key={item.id}>{item.title}</div>)}
        </Carousel>
      </div> */}
 <h2>
 Product's Collection
      </h2>
      {loading ? (
        <CircularProgress></CircularProgress>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <Carousel
            className="new1"
            mouseTracking
            //  enableAutoPlay
            //  autoPlaySpeed={100}
            //  enableSwipe={true}
            pagination={false}
            breakPoints={breakPoints}
            enableMouseSwipe={true}
            pauseOnFocus={true}
            pauseOnHover={true}
          >
            {products?.map((menProduct) => (
              <Box>
                <Product  product={menProduct}></Product>
              </Box>
            ))}
          </Carousel>
        </>
      )}

      <h2>Men's collection</h2>
      {loading ? (
        <CircularProgress></CircularProgress>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
         <Carousel
         className="new1"
            mouseTracking
            // enableAutoPlay
            // autoPlaySpeed={800}
            enableSwipe={true}
            pagination={false}
            breakPoints={breakPoints}
            //  showArrows={false}
          >
            {products?.filter((menProduct) => {
                return menProduct.category=== "men";
              })
              .map((menProduct) => (
                <div>
                  <Product key={menProduct._id} product={menProduct}></Product>
                </div>
              ))}
          </Carousel>
        </>
      )}

      <h2>Women collection</h2>
      {loading ? (
        <CircularProgress></CircularProgress>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <Carousel className="new1"
            mouseTracking
            // enableAutoPlay
            // autoPlaySpeed={800}
            enableSwipe={true}
            pagination={false}
            breakPoints={breakPoints}
            disableArrowsOnEnd={false}
          >
            {products
              ?.filter((product) => {
                return product.category === "women";
              })
              .map((product) => (
                <div>
                  <Product key={product._id} product={product}></Product>
                </div>
              ))}
          </Carousel>
        </>
      )}

      <h2>Kids collection</h2>
      {loading ? (
        <CircularProgress></CircularProgress>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
         <Carousel className="new3"
            mouseTracking
            enableAutoPlay
            autoPlaySpeed={1500}
            enableSwipe={true}
            pagination={false}
            breakPoints={breakPoints}
            kXteup={false}
          >
            {products
              ?.filter((kidProduct) => {
                return kidProduct?.category === "kids";
              })
              .map((kidProduct) => (
                <div>
                  <Product key={kidProduct._id} product={kidProduct}></Product>
                </div>
              ))}
          </Carousel>
        </>
      )}
    </Box >
  );
}
