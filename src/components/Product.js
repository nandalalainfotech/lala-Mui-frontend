import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Axios from 'axios';
import { useEffect, useState,} from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const styles = theme => ({
  cart: {
    padding: "6px 16px",
    borderRadius: 0,
    border: "2px solid #000",
    backgroundColor: "white",
    color: "black",
    transition: "background 1s, color 1s",
    "&:hover": {
      backgroundColor: "#000",
      color: "#fff"
    }
  }
});

export default function Product(props) {
  const { product } = props;
  const [image, setImage] = useState()
  useEffect(() => {
    async function fetchData() {
      const  imageData =  await Axios.get(`/api/uploads/show/${product._id}`, { responseType: 'blob' });
      setImage(URL.createObjectURL(imageData.data));
    }
    fetchData();
  }, [product]);




  return (
     <Card key={product._id} sx={{ maxWidth: 345, margin:1 ,  transition: "transform .5s ease",
     "&:hover": {
      transform: "scale(1.1)"
     }}}
    >
      <Link to={`/product/${product._id}`}><CardMedia
        sx={{transition: "transform .5s ease",
        "&:hover": {
          transform: "scale(1.1)"
        }}}
        component="img"
        height="180"
        image={image}
        alt={product.name}
      /></Link>
      <Link style={{ textDecoration: "none",
                         color: "#263238",}} to={`/product/${product._id}`}><CardContent>
         <Typography gutterBottom variant="h6" component="div">
         {product.name}
        </Typography>
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating>
        <Typography gutterBottom variant="h6" component="div">
        ₹{product.price}
        </Typography>
        </CardContent></Link>
    </Card>
    
  );
}