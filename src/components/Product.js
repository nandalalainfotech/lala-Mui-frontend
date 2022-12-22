import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useEffect } from "react";
// import Box from '@mui/material/Box';

export default function Product(PropTypes) {
  const { product } = PropTypes;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Card
      key={product._id}
      sx={{
        width: 225,
        margin: 2,
      }}
    >
      <Link to={`/product/${product._id}`}>
        <CardMedia
          className="media"
          sx={{
            transition: "transform .5s ease",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
          component="img"
          height="200"
          image={`/api/uploads/show/${product._id}`}
          alt={product.name}
        />
      </Link>
      <Link
        style={{
          textDecoration: "none",
          color: "#263238",
          textTransform: 'capitalize',
        }}
        to={`/product/${product._id}`}
      >
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {product.name}
          </Typography>
          <Rating
            defaultValue={product.rating}
            // numreviews={product.numReviews}
          ></Rating>
          <Typography gutterBottom variant="h6" component="div">
            {product.numReviews + "reviews"}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            ₹{product.price}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
}
