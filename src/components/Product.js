import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { Link } from "react-router-dom";
// import Box from '@mui/material/Box';

export default function Product(PropTypes) {
  const { product } = PropTypes;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  console.log("product======>>",product);

  return (
    <Card
      key={product._id}
      sx={{
        width: "100%",
        height: 450,
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
              width: "100%"
            },
          }}
          component="img"
          
          height="200"
          image={`/api/uploads/show/${product._id}`}
          alt={product.prodname}
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
          <Typography gutterBottom variant="h6" component="div" sx={{m: 1,fontSize: "12px"}}>
            {product.prodname}
          </Typography>
        
          
          <Typography gutterBottom variant="h6" component="div" sx={{m: 2,fontSize: "14px"}}>
            {product.taxexcluded}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
}
