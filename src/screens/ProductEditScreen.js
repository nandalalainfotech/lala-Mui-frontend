import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from 'axios';
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import { createProduct, updateProduct, detailsProduct } from "../actions/productAction";
import LoadingBox from "../components/LoadingBox";
import Container from '@mui/material/Container';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import {makeStyles} from "@material-ui/core";
import { PRODUCT_DETAILS_RESET } from "../constants/productConstants";


export default function ProductEditScreen(props) {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const params = useParams();
  const { id: productId } = params;
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState();
  const [category, setCategory] = useState("");
  const [categorygroup, setCategorygroup] = useState("");
  const [categorytype, setCategorytype] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const productDetails = useSelector((state) => state.productDetails);
  const { product } = productDetails;
  const productUpdate = useSelector((state) => state.productUpdate);
  const productCreate = useSelector((state) => state.productCreate);
  const {
    success: successUpdate,
  } = productUpdate;

  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const [priceError, setPriceError] = useState("");
  const [countInStockError, setCountInStockError] = useState("");

  const validatePrice = (e) => {
    var pattern = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i);
    if (!pattern.test(e.target.value)) {
      setPriceError("Please enter number only");
    } else {
      setPriceError('');
      setPrice(e.target.value);
    }
  }

  const validateCountInStock = (e) => {
    var pattern = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i);
    if (!pattern.test(e.target.value)) {
      setCountInStockError("Please enter number only");
    } else {
      setCountInStockError('');
      setCountInStock(e.target.value);
    }
  }
  
  const dispatch = useDispatch();

  const createSteps = [
    'Create Product',
    'File Upload',
  ];
  const updateSteps = [
    'Update Product',
    'Update File',
  ];

  useEffect(() => {
    if (!product && productId) {
      
      dispatch(detailsProduct(productId));
    }
    if(product) {
      setName(product.name);
      setPrice(product.price);
      setCategory(product.category);
      setCategorygroup(product.categorygroup);
      setCategorytype(product.categorytype);
      setCountInStock(product.countInStock);
      setBrand(product.brand);
      setDescription(product.description);
    }
  }, [product,productId, dispatch,navigate]);

  const updateHandler = (e) => {
    e.preventDefault();
    if(!priceError && !countInStockError){
      dispatch(
        updateProduct({
          _id: productId,
          name,
          price,
          fileId:product.fileId,
          category,
          categorygroup,
          categorytype,
          brand,
          countInStock,
          description,
        })
      );
      dispatch({ type: PRODUCT_DETAILS_RESET });
        setActiveStep(activeStep + 1);
       
    }else{
      alert('Please enter correct values');
    }
  };
  const createHandler = (e) => {
    e.preventDefault();
    if(!priceError && !countInStockError){
      dispatch(createProduct({
        name,
        price,
        category,
        categorygroup,
        categorytype,
        brand,
        countInStock,
        description,
      })
    );
      setActiveStep(activeStep + 1);
    }else{
      alert('Please enter correct values');
    }
    
  }

  // const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  
  const onSelectFile = async (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  }
  const uploadFileHandler = async (e) => {
    const bodyFormData = new FormData();
    bodyFormData.append('image', imageFile);
   
    try {
      if(!product && !productId){
       const { data } = await Axios.post('/api/uploads',bodyFormData,{
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
          Product: `Bearer ${product}`,
        },
       });         
       dispatch(
        updateProduct({
          _id: createdProduct._id,
          name: createdProduct.name,
          brand: createdProduct.brand,
          category: createdProduct.category,
          categorygroup: createdProduct.categorygroup,
          categorytype: createdProduct.categorytype,
          description: createdProduct.description,
          price: createdProduct.price,
          countInStock: createdProduct.countInStock,
          fileId:data.image._id
          
        })
      );
      }
      if(product){
        await Axios.put(`/api/uploads/${product.fileId}`, bodyFormData, {
        // const { data } = await Axios.put(`/api/uploads/${product.fileId}`, bodyFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userInfo.token}`,
            Product: `Bearer ${product}`,
          },
         }); 
      }
      navigate('/productlist');
    } catch (error) {
      setErrorUpload(error.message);
    }
  };

  const theme = createTheme();

  const useStyles = makeStyles(() => ({
    label: {
      "& .css-1hv8oq8-MuiStepLabel-label.Mui-active":{fontSize:"14px"},
      "& .css-1hv8oq8-MuiStepLabel-label.Mui-disabled":{fontSize:"14px"},
      "& .Mui-disabled .MuiStepIcon-root": { fontSize:"30px" },
      "& .Mui-active .MuiStepIcon-root": { fontSize:"30px"  },
      "& .css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-completed": { fontSize:"30px",color:"green"  },
      "& .css-1hv8oq8-MuiStepLabel-label.Mui-completed": { fontSize:"14px"  },
      
    },
    cssLabel: {
      "&.css-1pysi21-MuiFormLabel-root-MuiInputLabel-root": {fontSize:"14px"},
      "& .css-1pysi21-MuiFormLabel-root-MuiInputLabel-root.Mui-focused":{fontSize:"14px"},
    },
    cssFocused: {
      "& .css-1pysi21-MuiFormLabel-root-MuiInputLabel-root.Mui-focused":{fontSize:"14px"},
    },
  }));

  const classes = useStyles();
 
  return (
    
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm" sx={{ my: { xs: 3, md: 6 , lg:10}, p: { xs: 2, md: 3} }} >
      <CssBaseline />
        {!product && !productId ?(
        <Stepper activeStep={activeStep} >
            {createSteps.map((label) => (
              <Step key={label}  className={classes.label}>
                <StepLabel style={{display:"flex", flexDirection:"column"}}>{label}</StepLabel>
              </Step>
            ))}
        </Stepper>
        ):product?(
        <Stepper activeStep={activeStep} >
          {updateSteps.map((label) => (
            <Step  key={label}>
              <StepLabel className={classes.label} style={{display:"flex", flexDirection:"column"}} >{label}</StepLabel>
            </Step>
          ))}
       </Stepper>
        ):<div></div>

        }
     
     {!product && !productId ?(
      activeStep === 0 ?(
       <Box component="form" onSubmit={createHandler} sx={{
        display: 'flex',
        width:'80%',
        flexDirection: 'column',
        alignItems: 'center',
        margin:'0px 10%',
        borderRadius:'5px',
        
      }}>
         <TextField 
           inputProps={{style: {fontSize: 14}}}
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused
            }
          }}
           size="small"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="off"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused
            }
          }}
           inputProps={{style: {fontSize: 14}}}
           size="small"
            margin="normal"
            required
            fullWidth   
            id="price"
            label="Price"
            name="price"
            autoComplete="off"
            onChange={(e) => validatePrice(e)}
          />
            <span style={{
              fontSize:"14px",
              color: 'red',
            }}>{priceError}</span> 
           <TextField
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused
            }
          }}
           inputProps={{style: {fontSize: 14}}}
           size="small"
            margin="normal"
            required
            fullWidth   
            id="category"
            label="Category"
            name="category"
            autoComplete="off"
            onChange={(e) => setCategory(e.target.value)}
          />
          <TextField
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused
            }
          }}
           inputProps={{style: {fontSize: 14}}}
           size="small"
            margin="normal"
            required
            fullWidth   
            id="category group"
            label="Category group"
            name="category group"
            autoComplete="off"
            onChange={(e) => setCategorygroup(e.target.value)}
          />
          <TextField
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused
            }
          }}
          inputProps={{style: {fontSize: 14}}}
           size="small"
            margin="normal"
            required
            fullWidth
            id="category text"
            label="Category text"
            name="category text"
            autoComplete="off"
            onChange={(e) => setCategorytype(e.target.value)}
          />
          <TextField
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused
            }
          }}
           inputProps={{style: {fontSize: 14}}}
           size="small"
            margin="normal"
            required
            fullWidth   
            id="brand"
            label="Brand"
            name="brand"
            autoComplete="off"
            onChange={(e) => setBrand(e.target.value)}
          />

           <TextField
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused
            }
          }}
          inputProps={{style: {fontSize: 14}}}
           size="small"
           variant="outlined"
            margin="normal"
            required
            fullWidth   
            id="countInStock"
            label="CountInStock"
            name="countInStock"
            autoComplete="off"
            onChange={(e) => validateCountInStock(e)}
            />
              <span style={{
                fontSize:"14px",
                color: 'red',
              }}>{countInStockError}</span> 
          <TextField
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused
            }
          }}
          inputProps={{style: {fontSize: 14}}}
           size="small"
            margin="normal"
            required
            fullWidth
            id="description"
            label="Description"
            name="description"
            autoComplete="off"
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            type="submit"
          >
            Create
          </Button>
       </Box>
      ):(
        <Box component="form" sx={{
          display: 'flex',
          width:'80%',
          flexDirection: 'column',
          alignItems: 'center',
          margin:'0px 10%',
          borderRadius:'5px',
          
        }}>
             <TextField style={{margin:"30px 0px"}}
            inputProps={{style: {fontSize: 14}}}
             size="small"
              required
              fullWidth   
              type="file"
              id="imageFile"
              name="imageFile"
              autoComplete="off"
              autoFocus
              onChange={(e)=>onSelectFile(e)}
            />           
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={uploadFileHandler}
            >
              Upload 
         </Button>
            
         </Box>
      )
     ):product?(
      activeStep === 0 ?(
        <Box component="form" onSubmit={updateHandler} sx={{
         display: 'flex',
         width:'80%',
         flexDirection: 'column',
         alignItems: 'center',
         margin:'0px 10%',
         borderRadius:'5px',
         
       }}>
          <TextField
            inputProps={{style: {fontSize: 14}}}
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused
              }
            }}
            size="small"
             margin="normal"
             required
             fullWidth
             id="name"
             label="Name"
             name="name"
             autoComplete="off"
             value={name}
             onChange={(e) => setName(e.target.value)}
           />
           <TextField
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused
            }
          }}
            inputProps={{style: {fontSize: 14}}}
            size="small"
             margin="normal"
             required
             fullWidth   
             id="price"
             label="Price"
             name="price"
             autoComplete="off"
             value={price}
             onChange={(e) => setPrice(e.target.value)}
           />
 
            <TextField
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused
              }
            }}
            inputProps={{style: {fontSize: 14}}}
            size="small"
             margin="normal"
             required
             fullWidth   
             id="category"
             label="Category"
             name="category"
             autoComplete="off"
             value={category}
             onChange={(e) => setCategory(e.target.value)}
           />
           <TextField
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused
              }
            }}
            inputProps={{style: {fontSize: 14}}}
            size="small"
             margin="normal"
             required
             fullWidth   
             id="category group"
             label="Category group"
             name="category group"
             autoComplete="off"
             value={categorygroup}
             onChange={(e) => setCategorygroup(e.target.value)}
           />
           <TextField
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused
            }
          }}
           inputProps={{style: {fontSize: 14}}}
            size="small"
             margin="normal"
             required
             fullWidth
             id="category text"
             label="Category text"
             name="category text"
             autoComplete="off"
             value={categorytype}
             onChange={(e) => setCategorytype(e.target.value)}
           />
           <TextField
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused
              }
            }}
            inputProps={{style: {fontSize: 14}}}
            size="small"
             margin="normal"
             required
             fullWidth   
             id="brand"
             label="Brand"
             name="brand"
             autoComplete="off"
             value={brand}
             onChange={(e) => setBrand(e.target.value)}
           />
 
            <TextField
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused
            }
          }}
           inputProps={{style: {fontSize: 14}}}
            size="small"
             margin="normal"
             required
             fullWidth   
             id="countInStock"
             label="CountInStock"
             name="countInStock"
             autoComplete="off"
             value={countInStock}
             onChange={(e) => setCountInStock(e.target.value)}
           />
           <TextField
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused
            }
          }}
           inputProps={{style: {fontSize: 14}}}
            size="small"
             margin="normal"
             required
             fullWidth
             id="description"
             label="Description"
             name="description"
             autoComplete="off"
             value={description}
             onChange={(e) => setDescription(e.target.value)}
           />
 
           <Button
             fullWidth
             variant="contained"
             sx={{ mt: 3, mb: 2 }}
             type="submit"
           >
             Update
           </Button>
        </Box>
       ):(
         <Box component="form" onSubmit={uploadFileHandler} sx={{
           display: 'flex',
           width:'80%',
           flexDirection: 'column',
           alignItems: 'center',
           margin:'0px 10%',
           borderRadius:'5px',
           
         }}>
              <TextField style={{margin:"30px 0px"}}
             inputProps={{style: {fontSize: 14}}}
              size="small"
               required
               fullWidth   
               type="file"
               id="imageFile"
               name="imageFile"
               autoComplete="off"
               autoFocus
               onChange={(e)=>onSelectFile(e)}
             />           
             <Button
               fullWidth
               variant="contained"
               sx={{ mt: 3, mb: 2 }}
               onClick={uploadFileHandler}
             >
               Upload 
          </Button>
             
          </Box>
       )
  
     ):<div><LoadingBox></LoadingBox></div>

     }
      </Container>
    </ThemeProvider>
  );
}
