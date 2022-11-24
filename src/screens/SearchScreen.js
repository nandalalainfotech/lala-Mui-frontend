// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useParams } from 'react-router-dom';
// import { listProducts } from '../actions/productAction';
// import LoadingBox from '../components/LoadingBox';
// import MessageBox from '../components/MessageBox';
// import Product from '../components/Product';
// import Rating from '../components/Rating';
// import { prices, ratings } from '../utils';

// export default function SearchScreen(props) {
//   const {
//     name = 'all',
//     category = 'all',
//     min = 0,
//     max = 0,
//     rating = 0,
//     order = 'newest',
//     pageNumber = 1,
//   } = useParams();
//   const dispatch = useDispatch();
//   const productList = useSelector((state) => state.productList);
//   const { loading, error, products,gens, page, pages } = productList;
//   const productCategoryList = useSelector((state) => state.productCategoryList);
//   const {
//     loading: loadingCategories,
//     error: errorCategories,
//     categories,
//   } = productCategoryList;
//   useEffect(() => {
//     dispatch(
//       listProducts({
//         pageNumber,
//         name: name !== 'all' ? name : '',
//         category: category !== 'all' ? category : '',
//         min,
//         max,
//         rating,
//         order,
//       })
//     );
//   }, [category, dispatch, max, min, name, order, rating, pageNumber]);

//   const getFilterUrl = (filter) => {
//     const filterPage = filter.page || pageNumber;
//     const filterCategory = filter.category || category;
//     const filterName = filter.name || name;
//     const filterRating = filter.rating || rating;
//     const sortOrder = filter.order || order;
//     const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
//     const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
//     return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}/pageNumber/${filterPage}`;
//   };
//   return (
//     <div>
//       <div className="row">
//         {loading ? (
//           <LoadingBox></LoadingBox>
//         ) : error ? (
//           <MessageBox variant="danger">{error}</MessageBox>
//         ) : (
//           <div>{products.length} Results</div>
//         )}
//             <div>
//           Sort by{' '}
//           <select
//             value={order}
//             onChange={(e) => {
//               props.history.push(getFilterUrl({ order: e.target.value }));
//             }}
//           >
//             <option value="newest">Newest Arrivals</option>
//             <option value="lowest">Price: Low to High</option>
//             <option value="highest">Price: High to Low</option>
//             <option value="toprated">Avg. Customer Reviews</option>
//           </select>
//         </div>
//       </div>
//       <div className="row top">
//         <div className="col-1">
//           <h3>Department</h3>
//           <div>
//             {loadingCategories ? (
//               <LoadingBox></LoadingBox>
//             ) : errorCategories ? (
//               <MessageBox variant="danger">{errorCategories}</MessageBox>
//             ) : (
//               <ul>
//                 <li>
//                   <Link
//                     className={'all' === category ? 'active' : ''}
//                     to={getFilterUrl({ category: 'all' })}
//                   >
//                     Any
//                   </Link>
//                 </li>
//                 {categories.map((c) => (
//                   <li key={c}>
//                     <Link
//                       className={c === category ? 'active' : ''}
//                       to={getFilterUrl({ category: c })}
//                     >
//                       {c}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//           <div>
//             <h3>Price</h3>
//             <ul>
//             {prices.map((p) => (
//                 <li key={p.name}>
//                   <Link
//                     to={getFilterUrl({ min: p.min, max: p.max })}
//                     className={
//                       `${p.min}-${p.max}` === `${min}-${max}` ? 'active' : ''
//                     }
//                   >
//                   {p.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//             </div>
//           <div>
//             <h3>Avg. Customer Review</h3>
//             <ul>
//               {ratings.map((r) => (
//                 <li key={r.name}>
//                   <Link
//                     to={getFilterUrl({ rating: r.rating })}
//                     className={`${r.rating}` === `${rating}` ? 'active' : ''}
//                   >
//                     <Rating caption={' & up'} rating={r.rating}></Rating>
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//         <div className="col-3">
//           {loading ? (
//             <LoadingBox></LoadingBox>
//           ) : error ? (
//             <MessageBox variant="danger">{error}</MessageBox>
//           ) : (
//             <>
//               {products.length === 0 && (
//                 <MessageBox>No Product Found</MessageBox>
//               )}
//               <div className="row center">
//                 {products.map((product) => (
//                   <Product key={product._id} product={product}></Product>
//                 ))}
//               </div>
//               <div className="row center pagination">
//                 {[...Array(pages).keys()].map((x) => (
//                   <Link
//                     className={x + 1 === page ? 'active' : ''}
//                     key={x + 1}
//                     to={getFilterUrl({ page: x + 1 })}
//                   >
//                     {x + 1}
//                   </Link>
//                 ))}
//               </div>
//             </>

//           )}
//         </div>
//         <div className="col-3">
//           {loading ? (
//             <LoadingBox></LoadingBox>
//           ) : error ? (
//             <MessageBox variant="danger">{error}</MessageBox>
//           ) : (
//             <>
//               {gens.length === 0 && (
//                 <MessageBox>No Product Found</MessageBox>
//               )}
//               <div className="row center">
//                 {gens.map((gen) => (
//                   <Product key={gen._id} gen={gen}></Product>
//                 ))}
//               </div>
//               <div className="row center pagination">
//                 {[...Array(pages).keys()].map((x) => (
//                   <Link
//                     className={x + 1 === page ? 'active' : ''}
//                     key={x + 1}
//                     to={getFilterUrl({ page: x + 1 })}
//                   >
//                     {x + 1}
//                   </Link>
//                 ))}
//               </div>
//             </>

//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "../../node_modules/react-router-dom/dist/index";
import { listProducts } from "../actions/productAction";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";
import { prices, ratings } from "../utils";
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
import Rating from "@mui/material/Rating";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

export default function SearchScreen(props) {
  const {
    name = "all",
    category = "all",
    categorygroup = "all",
    categorytype = "all",
    min = 0,
    max = 0,
    rating = 0,
    order = "newest",
    pageNumber = 1,
  } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  // const productCategorygroupList = useSelector((state) => state.productCategorygroupList);
  // const {
  //   loadinggrp: loadingCategoriesGroup,
  //   errorcategrp: errorCategoriesGroup,
  //   categoriesGroup,
  // } = productCategorygroupList;

  // const productCategorytypeList = useSelector((state) => state.productCategorytypeList);
  // const {
  //   loadingtype: loadingCategoriesType,
  //   errorcategtype: errorCategoriesType,
  //   categoriesType,
  // } = productCategorytypeList;
  // console.log("categoriesGroup----------------->>>", categoriesGroup)
  // console.log("categoriesType----------------->>>", categoriesType)
  useEffect(() => {
    dispatch(
      listProducts({
        pageNumber,
        name: name !== "all" ? name : "",
        category: category !== "all" ? category : "",
        categorygroup: categorygroup !== "all" ? categorygroup : "",
        categorytype: categorytype !== "all" ? categorytype : "",
        min,
        max,
        rating,
        order,
      })
    );
  }, [
    category,
    categorygroup,
    categorytype,
    dispatch,
    max,
    min,
    name,
    order,
    rating,
    pageNumber,
  ]);

  const getFilterUrl = (filter) => {
    const filterCategory = filter.category || category;
    const filterCategorygroup = filter.categorygroup || categorygroup;
    const filterCategorytype = filter.categorytype || categorytype;
    const filterName = filter.name || name;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    const filterRating = filter.rating || rating;
    const sortOrder = filter.order || order;
    const filterPage = filter.page || pageNumber;
    return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}/pageNumber/${filterPage}`;
    // `/search/categorygroup/${filterCategorygroup}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}/pageNumber/${filterPage}`,
    // `/search/categorytype/${filterCategorytype}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}/pageNumber/${filterPage}`);
  };
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  }));

  return (
    <div>
      <Box sx={{ flexgrow: 1, marginTop: 3 }}>
        <Grid container spacing={0}>
        <Grid item xs sx={{display:{xs:"block",sm:"none"}}}>
              <Box>
              <Grid item xs>
                <Box>
                  <Card
                    sx={{ marginTop: 1, maxWidth: 300, textAlign: "center" }}
                  >
                    <CardContent>
                      {loading ? (
                        <CircularProgress></CircularProgress>
                      ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                      ) : (
                        <Typography variant="h5">
                          {products.length} Results
                        </Typography>
                      )}
                      <Typography variant="h6">
                        Sort by
                        <FormControl
                          sx={{
                            m: 1,
                            minWidth: 200,
                            hiegth: 10,
                            flexDirection: "column",
                          }}
                        >
                          <Select
                            value={order}
                            onChange={(e) => {
                              navigate(getFilterUrl({ order: e.target.value }));
                            }}
                          >
                            <MenuItem value="newest">Newest Arrivals</MenuItem>
                            <MenuItem value="lowest">
                              Price: Low to High
                            </MenuItem>
                            <MenuItem value="highest">
                              Price: High to Low
                            </MenuItem>
                            <MenuItem value="toprated">
                              Avg. Customer Reviews
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
                </Grid>
                <Grid item xs>
                <Box sx={{marginLeft:8}}>
                  <Card
                    sx={{ marginTop: 1, maxWidth: 200, textAlign: "center" }}
                  >
                    <Typography variant="h6">Department</Typography>
                    {loadingCategories ? (
                      <CircularProgress></CircularProgress>
                    ) : errorCategories ? (
                      <MessageBox variant="danger">
                        {errorCategories}
                      </MessageBox>
                    ) : (
                      <CardContent>
                        <Link
                          style={{ textDecoration: "none" }}
                          className={"all" === category ? "active" : ""}
                          to={getFilterUrl({ category: "all" })}
                          // to={`/search/category/sample category`}
                        >
                          <Typography variant="h6">Any </Typography>
                        </Link>

                        {categories.map((c) => (
                          <Box key={c}>
                            <Link
                              style={{ textDecoration: "none" }}
                              className={c === category ? "active" : ""}
                              to={getFilterUrl({ category: c })}
                              // to={`/search/category/${c}`}
                            >
                              <Typography variant="h6">{c}</Typography>
                            </Link>
                          </Box>
                        ))}
                      </CardContent>
                    )}
                  </Card>
                </Box>
                </Grid>
                <Grid item xs>
                <Box sx={{marginLeft:8}}>
                  <Card
                    sx={{ marginTop: 1, maxWidth: 200, textAlign: "center" }}
                  >
                    <Typography variant="h6">Price</Typography>
                    <CardContent>
                      {prices.map((p) => (
                        <Typography key={p.name}>
                          <Link
                            style={{ textDecoration: "none" }}
                            to={getFilterUrl({ min: p.min, max: p.max })}
                            className={
                              `₹{p.min}-₹{p.max}` === `₹{min}-₹{max}`
                                ? "active"
                                : ""
                            }
                          >
                            <Typography variant="h6">{p.name}</Typography>
                          </Link>
                        </Typography>
                      ))}
                    </CardContent>
                  </Card>
                </Box>
                </Grid>
                <Grid item xs>
                <Box sx={{marginLeft:8}}>
                  <Card
                    sx={{ marginTop: 1, maxWidth: 200, textAlign: "center" }}
                  >
                    <Typography variant="h6">Avg. Customer Review</Typography>
                    <CardContent>
                      {ratings.map((r) => (
                        <Typography key={r.name}>
                          <Link
                            to={getFilterUrl({ rating: r.rating })}
                            className={
                              `${r.rating}` === `${rating}` ? "active" : ""
                            }
                          >
                            <Rating
                              caption={" & up"}
                              rating={r.rating}
                            ></Rating>
                          </Link>
                        </Typography>
                      ))}
                    </CardContent>
                  </Card>
                </Box>
                </Grid>
              </Box>
            </Grid>
            <Grid item  sx={{display:{xs:"none",sm:"block"}}}>
              <Box>
              <Grid item xs>
                <Box>
                  <Card
                    sx={{ marginTop: 1, maxWidth: 300, textAlign: "center" }}
                  >
                    <CardContent>
                      {loading ? (
                        <CircularProgress></CircularProgress>
                      ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                      ) : (
                        <Typography variant="h5">
                          {products.length} Results
                        </Typography>
                      )}
                      <Typography variant="h6">
                        Sort by
                        <FormControl
                          sx={{
                            m: 1,
                            minWidth: 200,
                            hiegth: 10,
                            flexDirection: "column",
                          }}
                        >
                          <Select
                            value={order}
                            onChange={(e) => {
                              navigate(getFilterUrl({ order: e.target.value }));
                            }}
                          >
                            <MenuItem value="newest">Newest Arrivals</MenuItem>
                            <MenuItem value="lowest">
                              Price: Low to High
                            </MenuItem>
                            <MenuItem value="highest">
                              Price: High to Low
                            </MenuItem>
                            <MenuItem value="toprated">
                              Avg. Customer Reviews
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
                </Grid>
                <Grid item xs>
                <Box>
                  <Card
                    sx={{ marginTop: 1, maxWidth: 200, textAlign: "center" }}
                  >
                    <Typography variant="h6">Department</Typography>
                    {loadingCategories ? (
                      <CircularProgress></CircularProgress>
                    ) : errorCategories ? (
                      <MessageBox variant="danger">
                        {errorCategories}
                      </MessageBox>
                    ) : (
                      <CardContent>
                        <Link
                          style={{ textDecoration: "none" }}
                          className={"all" === category ? "active" : ""}
                          to={getFilterUrl({ category: "all" })}
                          // to={`/search/category/sample category`}
                        >
                          <Typography variant="h6">Any </Typography>
                        </Link>

                        {categories.map((c) => (
                          <Box key={c}>
                            <Link
                              style={{ textDecoration: "none" }}
                              className={c === category ? "active" : ""}
                              to={getFilterUrl({ category: c })}
                              // to={`/search/category/${c}`}
                            >
                              <Typography variant="h6">{c}</Typography>
                            </Link>
                          </Box>
                        ))}
                      </CardContent>
                    )}
                  </Card>
                </Box>
                </Grid>
                <Grid item xs>
                <Box>
                  <Card
                    sx={{ marginTop: 1, maxWidth: 200, textAlign: "center" }}
                  >
                    <Typography variant="h6">Price</Typography>
                    <CardContent>
                      {prices.map((p) => (
                        <Typography key={p.name}>
                          <Link
                            style={{ textDecoration: "none" }}
                            to={getFilterUrl({ min: p.min, max: p.max })}
                            className={
                              `₹{p.min}-₹{p.max}` === `₹{min}-₹{max}`
                                ? "active"
                                : ""
                            }
                          >
                            <Typography variant="h6">{p.name}</Typography>
                          </Link>
                        </Typography>
                      ))}
                    </CardContent>
                  </Card>
                </Box>
                </Grid>
                <Grid item xs>
                <Box>
                  <Card
                    sx={{ marginTop: 1, maxWidth: 200, textAlign: "center" }}
                  >
                    <Typography variant="h6">Avg. Customer Review</Typography>
                    <CardContent>
                      {ratings.map((r) => (
                        <Typography key={r.name}>
                          <Link
                            to={getFilterUrl({ rating: r.rating })}
                            className={
                              `${r.rating}` === `${rating}` ? "active" : ""
                            }
                          >
                            <Rating
                              caption={" & up"}
                              rating={r.rating}
                            ></Rating>
                          </Link>
                        </Typography>
                      ))}
                    </CardContent>
                  </Card>
                </Box>
                </Grid>
              </Box>
            </Grid>

          

            <Grid item xs sx={{display:{xs:"none",sm:"block"}}}>
              <Box>
                {loading ? (
                  <CircularProgress></CircularProgress>
                ) : error ? (
                  <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                  <>
                    {products.length === 0 && (
                      <MessageBox>No Product Found</MessageBox>
                    )}
                    <Box
                      sx={{
                        padding: 0,
                        margin: 0,
                        listStyle: "none",
                        display: "flex",
                        flexFlow: "wrap row",
                        flexDirection: "row",
                        
                      }}
                    >
                      {products.map((product) => (
                        <Product key={product._id} product={product}></Product>
                      ))}
                    </Box>
                    <Box>
                      {[...Array(pages).keys()].map((x) => (
                        <Link
                          style={{ textDecoration: "none" }}
                          className={x + 1 === page ? "active" : ""}
                          key={x + 1}
                          to={getFilterUrl({ page: x + 1 })}
                        >
                          {x + 1}
                        </Link>
                      ))}
                    </Box>
                  </>
                )}
              </Box>
            </Grid>

            <Grid item xs sx={{marginTop:1,display:{xs:"block",sm:"none"}}}>
              <Box>
                {loading ? (
                  <CircularProgress></CircularProgress>
                ) : error ? (
                  <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                  <>
                    {products.length === 0 && (
                      <MessageBox>No Product Found</MessageBox>
                    )}
                    <Box
                      sx={{
                       xs:{ padding: 0,
                        margin: 5,
                        listStyle: "none",
                        display: "flex",
                        flexFlow: "wrap row",
                        flexDirection: "row",
                        justifyContent: "space-between",}
                      }}
                    >
                      {products.map((product) => (
                        <Product key={product._id} product={product}></Product>
                      ))}
                    </Box>
                    <Box>
                      {[...Array(pages).keys()].map((x) => (
                        <Link
                          style={{ textDecoration: "none" }}
                          className={x + 1 === page ? "active" : ""}
                          key={x + 1}
                          to={getFilterUrl({ page: x + 1 })}
                        >
                          {x + 1}
                        </Link>
                      ))}
                    </Box>
                  </>
                )}
              </Box>
            </Grid>
         
        </Grid>
      </Box>
    </div>
  );
}
