import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createReview, detailsProduct, listProducts } from "../actions/productAction";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { PRODUCT_REVIEW_CREATE_RESET } from "../constants/productConstants";
// import ModalImage from "react-modal-image";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Rating from "@mui/material/Rating";
// import Reviews from "@mui/material/Reviews";
import Select from "@mui/material/Select";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Typography from "@mui/material/Typography";
import Axios from "axios";
import ReactImageMagnify from "react-image-magnify";
import CardMedia from "@mui/material/CardMedia";
import { CircularProgress, DialogContent } from "../../node_modules/@material-ui/core/index";
// import { CenterFocusStrong } from "../../node_modules/@mui/icons-material/index";
import Carousel from "react-elastic-carousel";
import Product from "../components/Product";
export default function ProductScreen() {
  const productList = useSelector((state) => state.productList);
  const { products } = productList;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { id: productId } = params;

  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [image, setImage] = useState();

  useEffect(() => {
    const fetchBusinesses = async () => {
      const img = await Axios.get(`/api/uploads/show/${productId}`, {
        responseType: "blob",
      });
      setImage(URL.createObjectURL(img.data));
    };
    fetchBusinesses();
    if (successReviewCreate) {
      window.alert("Review Submitted Successfully");
      setRating("");
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    dispatch(listProducts({}));
    dispatch(detailsProduct(productId));


  }, [dispatch, productId, successReviewCreate]);

  const addToCartHandler = () => {
    navigate(`/cart/${productId}?qty=${qty}`);
  };

  const addToHandler = () => {
    navigate(`/signin`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(productId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert("Please enter comment and rating");
    }
  };

  const handleChange = (event) => {
    setRating(event.target.value);
  };

  const breakPoints = [
    { width: 400, itemsToShow: 1 },
    { width: 500, itemsToShow: 2 },
    { width: 600, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 900, itemsToShow: 5 },
    { width: 1200, itemsToShow: 5 },
    { width: 1500, itemsToShow: 7 },
    { width: 2000, itemsToShow: 9 },
  ];

  return (
    <Box sx={{ flexGrow: 1, marginTop: 3 }}>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Grid container spacing={2}>
          <Grid
            item
            sx={{
              zIndex: 1,
              display: {
                xs: "none",
                md: "block",
                sm: "block",
                lg: "block",
                xl: "block",
              },
            }}
          >
            <Box
              sx={{
                borderRadius: 0,
                width: "auto",
                m: 3,
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              }}
            >
              <ReactImageMagnify
                {...{
                  smallImage: {
                    className: "large",
                    src: `${image}`,
                    width: 380,
                    height: 490,
                  },
                  largeImage: {
                    className: "small",
                    src: `${image}`,
                    width: 600,
                    height: 600,
                  },
                }}
              />
            </Box>
          </Grid>

          <Grid
            item
            sx={{
              display: {
                xs: "block",
                md: "none",
                sm: "none",
                lg: "none",
                xl: "none",
              },
            }}
          >
            <Box>
              <CardMedia
                sx={{
                  borderRadius: 0,
                  width: "100%",
                  marginTop: 3,
                  height: "100%",
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                }}
                component="img"
                src={image}
              ></CardMedia>
            </Box>
          </Grid>

          <Grid item xs sx={{ zIndex: 0 }}>
            <Box>
              <Card
                style={{
                  padding: 30,
                  borderRadius: 0,
                  margin: 20,
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                }}
              >
                <Box>
                  <Typography
                    variant="h5"
                    gutterBottom
                    style={{ color: "#A02020", textTransform: 'capitalize' }}
                  >
                    {product.name}
                  </Typography>

                  <Typography variant="body1" gutterBottom>
                    <Rating>
                      Value={product.rating}
                      {/* numReviews={product.numReviews} */}
                    </Rating>
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {product.numReviews + "reviews"}
                  </Typography>

                  <Typography
                    variant="body1"
                    style={{ color: "#A02020", textTransform: 'capitalize' }}
                    gutterBottom
                  >
                    <strong>Price :</strong> ₹{product.price}
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{ color: "#A02020", textTransform: 'capitalize' }}
                    gutterBottom
                  >
                    <strong>Brand :</strong> {product.brand}
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{ color: "#A02020", textTransform: 'capitalize' }}
                    gutterBottom
                  >
                    <strong>Category :</strong> {product.category}
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{ color: "#A02020", textTransform: 'capitalize' }}
                    gutterBottom
                  >
                    <strong>Description :</strong> {product.description}
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{ color: "#A02020", textTransform: 'capitalize' }}
                    gutterBottom
                  >
                    <strong> Category Group :</strong> {product.categorygroup}
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{ color: "#A02020", textTransform: 'capitalize' }}
                    gutterBottom
                  >
                    <strong>Category Type :</strong> {product.categorytype}
                  </Typography>
                </Box>
              </Card>
            </Box>

            <Box>
              <Card
                style={{
                  padding: 30,
                  borderRadius: 0,
                  margin: 20,
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                }}
              >
                <Box>
                  <Typography
                    variant="body1"
                    style={{ color: "#A02020" }}
                    gutterBottom
                  >
                    <strong>Price :</strong> ₹{product.price}
                  </Typography>

                  <Typography
                    variant="body1"
                    style={{ color: "#A02020" }}
                    gutterBottom
                  >
                    <strong>Status :</strong>{" "}
                    {product.countInStock > 0 ? (
                      <span style={{ color: "green" }}>In Stock</span>
                    ) : (
                      <span style={{ color: "red" }}>Unavailable</span>
                    )}
                  </Typography>

                  {product.countInStock > 0 && (
                    <>
                      <Typography
                        variant="body1"
                        style={{ color: "#A02020" }}
                        component="span"
                      >
                        <strong>Qty:</strong>
                        <FormControl
                          sx={{ marginLeft: 2, width: "90%" }}
                          size="small"
                        >
                          <Select
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <MenuItem key={x + 1} value={x + 1}>
                                  {x + 1}
                                </MenuItem>
                              )
                            )}
                          </Select>
                        </FormControl>
                      </Typography>
                      {userInfo ? (
                        <Button
                          variant="contained"
                          onClick={addToCartHandler}
                          sx={{ marginTop: 2, marginLeft: { xs: 2, sm: 2, md: 6, lg: 6 }, width: "90%" }}
                        >
                          {" "}
                          Add to Cart
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          onClick={addToHandler}
                          sx={{ marginTop: 2, width: "100%" }}
                        >
                          {" "}
                          Add to Cart
                        </Button>
                      )}
                    </>
                  )}
                </Box>
              </Card>
            </Box>

            <Box>
              <Card
                style={{
                  padding: 30,
                  borderRadius: 0,
                  margin: 20,
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                }}
              >
                <Box >
                  <Typography
                    variant="h6"
                    gutterBottom
                    style={{ color: "#A02020" }}
                  >
                    Ratings & Reviews
                    {product.reviews.length === 0 && (
                      <span style={{ fontSize: 17 }}>
                        <MessageBox>There is no review</MessageBox>
                      </span>
                    )}
                  </Typography>

                  <div>
                    {product.reviews.map((review) => (
                      <Typography
                        variant="body1"
                        gutterBottom
                        key={review._id}
                        component="span"
                      >
                        <strong>{review.name}</strong>
                        <p>
                          <Rating
                            defaultValue={review.rating}
                            caption=" "
                          ></Rating>
                        </p>
                        <p>{review.createdAt.substring(0, 10)}</p>
                        <p>{review.comment}</p>
                      </Typography>
                    ))}

                    {userInfo ? (
                      <Box
                        sx={{ display: "flex", flexDirection: "column" }}
                        component="form"
                        onSubmit={submitHandler}
                      >
                        <Typography variant="h5" style={{ color: "#A02020" }}>
                          Write a customer review
                        </Typography>

                        <Box sx={{ minWidth: 120 }}>
                          <FormControl fullWidth sx={{ m: 3, width: "83.5%", justifycontent: 'center' }}>
                            <InputLabel id="demo-simple-select-label">
                              Rating
                            </InputLabel>
                            <Select
                              id="demo-simple-select-label"
                              // id="demo-simple-select"
                              // value={Rating}
                              label="Rating"
                              onChange={handleChange}
                            >
                              <MenuItem value={1}>1- Poor</MenuItem>
                              <MenuItem value={2}>2- Fair</MenuItem>
                              <MenuItem value={3}>3- Good</MenuItem>
                              <MenuItem value={4}>4- Very good</MenuItem>
                              <MenuItem value={5}>5- Excelent</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>

                        <Box sx={{ m: 3, width: "83%", justifycontent: 'center' }}>
                          <TextareaAutosize
                            minRows={5}
                            placeholder="Comment"
                            id="comment"
                            style={{ width: "100%" }}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          />
                        </Box>

                        <Button variant="contained" type="submit" sx={{ m: 3, width: '83.5%' }}>
                          Submit
                        </Button>

                        <div>
                          {loadingReviewCreate && <LoadingBox></LoadingBox>}
                          {errorReviewCreate && (
                            <MessageBox variant="danger">
                              {errorReviewCreate}
                            </MessageBox>
                          )}
                        </div>
                      </Box>
                    ) : (
                      <Box sx={{ fontWeight: 500, fontSize: 20, textAlign: 'center' }}>
                        <DialogContent>
                          Please{" "}
                          <Button color="secondary" href="/signin">
                            Sign In
                          </Button>{" "}
                          to write a review
                        </DialogContent>
                      </Box>
                    )}
                  </div>
                </Box>
              </Card>
            </Box>
          </Grid>
        </Grid>

      )}
      <hr style={{ margin: '10px 0px' }}></hr>
      <>
        <Typography
          variant="h4"
          sx={{ '&:hover': { color: "#6633FF", textDecoration: "underline" }, my: 3 }}
        >
          Products related to this item
        </Typography>
        <Card
          sx={{
            borderRadius: 0,
            py:3,
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
        >

          {loading ? (
            <CircularProgress></CircularProgress>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <Carousel
              className="new1"
              mouseTracking
              enableSwipe={true}
              pagination={false}
              breakPoints={breakPoints}
              disableArrowsOnEnd={false}
            >
              {
                products?.filter((item) => {
                  return (item?.categorygroup === product?.categorygroup) && (item?._id != product?._id);
                })
                  .map((categorys) => (<>
                    <Box key={categorys?._id}>
                      <Product product={categorys}></Product>
                    </Box>
                  </>
                  ))
              }
            </Carousel>
          )
          }
        </Card>
      </>
    </Box>
  );
}
