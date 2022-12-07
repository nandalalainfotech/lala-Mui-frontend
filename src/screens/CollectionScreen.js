import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { listProducts } from "../actions/productAction";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Product from "../components/Product";
import CircularProgress from "@mui/material/CircularProgress";
export default function CollectionScreen(props) {
  const { categorytype } = props;
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProducts({}));
  }, [dispatch]);
  return (
    <Box  style={{marginTop:20}}>
        <Box><Typography variant="h4">{categorytype+" "+"Collection"}</Typography></Box>
      <Box
        sx={{
          padding: 0,
          margin: 5,
          width: "100%",
          listStyle: "none",
          display: "flex",
          flexFlow: "wrap row",
          flexDirection: "row",
        
        }}
      >
        {loading ? (
          <CircularProgress></CircularProgress>
        ) : (
          <>
         
            {categorytype === "Men" && (
              
              <>
             {/* <Box> */}
                {products
                  ?.filter((product) => {
                    return product.category === "men";
                  })
                  .map((product) => (
                    <Product key={product._id} product={product}></Product>
                  ))}
                  {/* </Box> */}
              </>
            )}  
             {categorytype === "Women" &&(
                <>
                {products
                  ?.filter((product) => {
                    return product.category === "women";
                  })
                  .map((product) => (
                    <Product key={product._id} product={product}></Product>
                  ))}
              </>
            )}
            <>
            {categorytype === "Kids" &&(
                <>
                {products
                  ?.filter((product) => {
                    return product.category === "kids";
                  })
                  .map((product) => (
                    <Product key={product._id} product={product}></Product>
                  ))}
              </>
            )}
            </>
          </>
          
        )}
      </Box>
    </Box>
  );
}
