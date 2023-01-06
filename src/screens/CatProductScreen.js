import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { IconButton } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import InfoIcon from "@mui/icons-material/Info";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { deepPurple, red } from "@material-ui/core/colors";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid } from "@mui/x-data-grid";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  FeaturesMasterListDetails,
  FeaturesValueListDetails,
} from "../actions/AttributeActions";
import { brandList } from "../actions/brandAction";
import {
  catProductList,
  deleteCatalogProd,
  saveCatologProduct,
  updateCatProduct,
} from "../actions/catProductAction";

import Dialog from "@mui/material/Dialog";
import CardMedia from "@mui/material/CardMedia";
// import Card from "@mui/material/Card";
import ClearIcon from "@mui/icons-material/Clear";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

function CatProductScreen() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [product, setProduct] = useState(0);
  const [feature, setFeature] = useState(0);
  const [brand, setBrand] = useState(0);
  const [relatProd, setRelatProduct] = useState(0);
  const [specific, setSpecific] = useState(0);

  const [category, setCategory] = useState(0);
  const [dropimg, setDropimg] = useState([]);

  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [newImg, setNewimg] = useState();
  const [tabIndex, setTabIndex] = useState(0);
  const [open, setOpen] = useState(false);
  // ----Save----
  const [featurestype, setFeaturestype] = useState("");
  const [featurestypevalue, setFeaturestypevalue] = useState("");
  const [brandId, setBrandId] = useState("");
  const [combination, setCombination] = useState("");

  // -------Edit-----
  const [catProdindId, setcatProdindId] = useState(0);
  const [newProdname, setNewProdname] = useState("");
  const [newsummary, setNewsummary] = useState("");
  const [newdescription, setNewdescription] = useState("");
  const [newfeature, setNewfeature] = useState("");
  const [newfeaturestypevalue, setNewfeaturestypevalue] = useState("");
  const [newbrandId, setNewbrandId] = useState();
  const [newcombination, setNewcombination] = useState("");
  const [newreference, setNewreference] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [newtaxexcluded, setNewtaxexcluded] = useState("");
  const [newtaxincluded, setNewtaxincluded] = useState("");

  const catalogProd = useSelector((state) => state.catalogProd);
  const { catProducts } = catalogProd;

  const FeaturesList = useSelector((state) => state.FeaturesList);
  const { Featuresdetails } = FeaturesList;

  const FeaturesValueList = useSelector((state) => state.FeaturesValueList);
  const { Featuresvaluedetails } = FeaturesValueList;

  const brandReduce = useSelector((state) => state.brandReduce);
  const { brandLists } = brandReduce;

  useEffect(() => {
    dispatch(catProductList());
    dispatch(FeaturesMasterListDetails());
    dispatch(brandList());
    dispatch(FeaturesValueListDetails());
  }, []);

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  const Combinations = `
  Combinations are the different variations of a product, with attributes like its size, 
  weight or color taking different values. Does your product require combinations?
`;

  const reference = `
  Your reference code for this product. Allowed special characters: .-_#.
`;

  const quantity = `
  How many products should be available for sale?
`;

  const price = `
  This is the net sales price for your customers. 
  The retail price will automatically be calculated using the applied tax rate.
`;
  price;

  const categories = `
  Where should the product be available on your site?
   The main category is where the product appears by default: this is the category which is seen in the product page's URL.
   Disabled categories are written in italics.
`;

  const newcategories = `
If you want to quickly create a new category, you can do it here.
 Don’t forget to then go to the Categories page to fill in the needed details (description, image, etc.).
 A new category will not automatically appear in your shop's menu, please read the Help about it.
`;

  const sale = `
The minimum quantity required to buy this product (set to 1 to disable this feature).
 E.g.: if set to 3,
 customers will be able to purchase the product only if they take at least 3 in quantity.
`;

  const level = `
The email will be sent to all the users who have the right to run the stock page.
 To modify the permissions, go to Advanced Parameters > Team
`;

  const delivery = `
Display delivery time for a product is advised for merchants selling in Europe to comply with the local laws.
`;

  const shipping = `
If a carrier has a tax, it will be added to the shipping fees. Does not apply to free shipping.
`;

  const retail = `
This is the net sales price for your customers. The retail price will automatically be calculated using the applied tax rate.
`;

  const unit = `
If your country's pricing laws or regulations require mandatory information about the base price of a unit,
 fill in the base price here (for example, price per kg, per liter, per meter).
`;

  const Cost = `
The cost price is the price you paid for the product. Do not include the tax.
 It should be lower than the retail price: the difference between the two will be your margin.
`;

  const Specific = `
You can set specific prices for customers belonging to different groups, different countries, etc.
`;

  const Priority = `
Sometimes one customer can fit into multiple price rules.
 Priorities allow you to define which rules apply first.
`;

  const condition = `
Not all shops sell new products.
 This option enables you to indicate the condition of the product.
 It can be required on some marketplaces.
`;
  const [CoverStatus, setCoverStatus] = useState("");
  const [dropImage, setDropZoneImage] = useState("");

  const [ImageSelect, setImageSelect] = useState("");
  const [ImageSelectblob, setImageSelectblob] = useState("");
  const [ImageDelete, setImageDelete] = useState("");

  const [checked, setChecked] = useState("");
  const handleChangeChekce = (event) => {
    setChecked(event.target.checked);
  };

  const ImagHandleSelect = (e, index) => {
    setImageSelectblob(e.target.src);
    setImageSelect(index);
    setImageDelete(0);
    setChecked(false);
    setCoverStatus("");
    setDropZoneImage(dropimg[index]);
  };

  const [selectedImages, setSelectedImages] = useState([]);
  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    setDropimg(selectedFilesArray);
    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages((previousImages) => previousImages.concat(imagesArray));

    // FOR BUG IN CHROME
    event.target.value = "";
  };

  function deleteHandler(image) {
    setSelectedImages(selectedImages.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  }
  function deleteHandlerpage() {
    setImageDelete("Delete");
    // setSelectedImages(selectedImages.filter((e) => e !== image));
    // URL.revokeObjectURL(image);
  }
  // eslint-disable-next-line no-unused-vars
  const [errorUpload, setErrorUpload] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const handleClickOpen = (e) => {
    setNewimg(e.target.src);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", dropImage);
    formData.append("coverstatus", CoverStatus);
    for (let i = 0; i < dropimg.length; i++) {
      formData.append("images", dropimg[i]);
    }
    for (var pair of formData.entries()) {
      console.log(pair[1]);
    }
    try {
      const { data } = await Axios.post("/api/uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
          Product: `Bearer ${product}`,
        },
      });

      dispatch(
        saveCatologProduct({
          prodname: e.prodname,
          fileId: data.image._id,
          summary: summary,
          description: description,
          featureId: featurestype,
          featurestypevalue: featurestypevalue,
          brand: brandId,
          search: e.search,
          reference: e.reference,
          combination: combination,
          quantity: e.quantity,
          taxexcluded: e.taxexcluded,
          taxincluded: e.taxincluded,
          qty: e.qty,
          mqty: e.mqty,
          SLocation: e.SLocation,
          newcheck: e.newcheck,
          denyorders: e.Denyorders,
          Alloworders: e.Alloworders,
          Usedefault: e.Usedefault,
          stockin: e.stockin,
          stockout: e.stockout,
          date: e.date,
          height: e.height,
          width: e.width,
          depth: e.depth,
          weight: e.weight,
        })
      );
      window.confirm("Product Details Saved SuccessFully!!");
    } catch (error) {
      setErrorUpload(error.message);
    }
  };
  const [CoverImages, setCoverImages] = useState("");

  const updateHandler = () => {
    dispatch(
      updateCatProduct({
        _id: catProdindId._id,
        prodname: newProdname,
        summary: newsummary,
        description: newdescription,
        featureId: newfeature,
        featurestypevalue: newfeaturestypevalue,
        brand: newbrandId,
        combination: newcombination,
        reference: newreference,
        quantity: newQuantity,
        taxexcluded: newtaxexcluded,
        taxincluded: newtaxincluded,
      })
    );
    window.confirm("Brand Details Updated SuccessFully!!");
  };

  const editHandler = (catProdIndId) => {
    console.log("catProdIndId", catProdIndId);
    setcatProdindId(catProdIndId);
    setNewProdname(catProdIndId.prodname);
    setNewsummary(catProdIndId.summary);
    setNewdescription(catProdIndId.description);
    setNewfeature(catProdIndId.featureId);
    setNewfeaturestypevalue(catProdIndId.featurestypevalue);
    setNewbrandId(catProdIndId.brand);
    setNewcombination(catProdIndId.combination);
    setNewreference(catProdIndId.reference);
    setNewQuantity(catProdIndId.quantity);
    setNewtaxexcluded(catProdIndId.taxexcluded);
    setNewtaxincluded(catProdIndId.taxincluded);
  };

  const catProddeleteHandler = (params) => {
   
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteCatalogProd(params.row._id));
    }
  };
  const handleChangeSaveImage = () => {
    if (checked === true) {
      setCoverImages(ImageSelectblob);
      setImageSelect("");
      setCoverStatus("coverimage");
    }
  };

  function getDate(orders) {
    return `${orders.row.createdAt.substring(0, 10) || ""}`;
  }

  function getFeatureName(catProducts) {
    return `${
      catProducts?.row?.featureId
        ? Featuresdetails?.find((x) => x?._id === catProducts?.row?.featureId)
            ?.featurename
        : ""
    }`;
  }

  function getBrandName(params) {
    return `${
      params?.row?.brand
        ? brandLists?.find((x) => x?._id === params?.row?.brand)?.name
        : ""
    }`;
  }

  const columns = [
    {
      field: "prodname",
      headerName: "Name",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "imageId",
      headerName: "Product Image",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        return (
          <Avatar
            onClick={handleClickOpen}
            // onMouseOut={handleClose}
            sx={{ height: "50px", width: "50px", cursor: "pointer" }}
            src={`/api/uploads/showCatProd/${params.row._id}`}
            alt="avatar"
          />
        );
      },
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      headerClassName: "super-app-theme--header",
      valueGetter: getDate,
    },
    {
      field: "featureId",
      headerName: "Feature",
      flex: 1,
      headerClassName: "super-app-theme--header",
      valueGetter: getFeatureName,
    },
    {
      field: "reference",
      headerName: "Reference",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "brand",
      headerName: "Brand",
      flex: 1,
      headerClassName: "super-app-theme--header",
      valueGetter: getBrandName,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "taxexcluded",
      headerName: "Price",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "actions",
      headerName: "ACTIONS",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <>
          <EditIcon
            onClick={() => editHandler(params.row)}
            style={{
              color: deepPurple[500],
              fontSize: 15,
              margin: 20,
              cursor: "pointer",
            }}
          />

          <DeleteIcon
            onClick={() => catProddeleteHandler(params)}
            style={{ color: red[500], fontSize: 15, cursor: "pointer" }}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Typography sx={{ fontSize: "25px", fontWeight: "400" }}>
          Products
        </Typography>

        <Box sx={{ ml: "auto" }}>
          <Button
            sx={{ mr: 3 }}
            variant="contained"
            startIcon={<AddCircleIcon />}
            onClick={() => setProduct(1)}
          >
            Add New Product
          </Button>

          <Button variant="outlined" sx={{ mr: 2 }}>
            Recommended Modules and Services
          </Button>

          <Button variant="outlined">Help</Button>
        </Box>
      </Box>

      <>
        {product === 1 ? (
          <Box
            sx={{ mt: "40px" }}
            component="form"
            onSubmit={handleSubmit(submitHandler)}
          >
            <Box>
              <Tabs value={tabIndex} onChange={handleTabChange}>
                <Tab label="Basic Settings" />
                <Tab label="Quantities" />
                <Tab label="Shipping" />
                <Tab label="Pricing" />
                <Tab label="SEO" />
                <Tab label="Options" />
              </Tabs>
            </Box>
            <Box sx={{ padding: 2 }}>
              {tabIndex === 0 && (
                <Grid container spacing={3}>
                  <Grid item xs={8}>
                    <Box>
                      <Box>
                        <Typography
                          sx={{ fontSize: "17px", fontWeight: "bold" }}
                        >
                          Enter Your Product Name
                        </Typography>
                        <Typography>
                          <TextField
                            fullWidth
                            id="margin-normal"
                            margin="normal"
                            {...register("prodname", { required: true })}
                            error={errors.prodname}
                            // onChange={handleChange.bind(this)}
                          />
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          border: "2px solid gray",
                          width: "100%",
                          // height: "250px",
                          mt: "40px",
                        }}
                      >
                        <Grid container spacing={2}>
                        <Grid item xs>
                            <Box
                              sx={{
                                display: "flex",
                                width: "100%",
                                flexDirection: "column",
                                alignItems: "center",
                                margin: "0px 10%",
                                borderRadius: "5px",
                              }}
                            >
                              Add Images
                              <br />
                              <Typography>up to 10 images</Typography>
                              <TextField
                                sx={{ margin: "10px 0px",border: "none" }}
                                inputProps={{
                                  style: { fontSize: 14 },
                                  multiple: true,
                                  accept: "image/*",
                                }}
                                fullWidth
                                type="file"
                                name="uploadedImages"
                                multiple
                                onChange={onSelectFile}
                              />
                              <br />
                            </Box>
                          </Grid>
                          <Grid item xs>
                            {ImageDelete === "Delete" ? (
                              <></>
                            ) : (
                              <>
                                {ImageSelectblob === ImageSelectblob && (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      width: "50%",
                                      flexDirection: "column",
                                      alignItems: "center",
                                      margin: "0px 10%",
                                      borderRadius: "5px",
                                    }}
                                  >
                                    <Box sx={{display:"flex"}}>
                                    <IconButton
                                      onClick={() =>
                                        deleteHandlerpage(ImageSelect)
                                      }
                                    >
                                      <ClearIcon
                                        sx={{ backgroundColor: "#999999",color:"#fff" }}
                                      />
                                    </IconButton>
                                    <Checkbox
                                      checked={checked}
                                      onChange={handleChangeChekce}
                                      inputProps={{
                                        "aria-label": "controlled",
                                      }}
                                    />
                                    </Box>
                                    <TextField
                                      inputProps={{ style: { fontSize: 14 } }}
                                      size="small"
                                      variant="outlined"
                                      margin="normal"
                                      fullWidth
                                      id="Caption"
                                      label="Caption"
                                      name="Caption"
                                      autoComplete="off"
                                      // onChange={(e) => validateCountInStock(e)}
                                    />
                                    <Button
                                      variant="contained"
                                      onClick={handleChangeSaveImage}
                                    >
                                      Save cover Image
                                    </Button>
                                  </Box>
                                )}
                              </>
                            )}
                          </Grid>
                        </Grid>
                        <List>
                          {/* <input type="file" multiple /> */}
                          {selectedImages.length > 0 &&
                            selectedImages.length > 10 && (
                              <p className="error">
                                You upload more than 10 images! <br />
                                <span>
                                  please delete{" "}
                                  <b> {selectedImages.length - 10} </b> of them{" "}
                                </span>
                              </p>
                            )}
                          <Box
                            sx={{
                              width: "auto",
                              listStyle: "none",
                              display: "flex",
                              flexFlow: "wrap row",
                              flexDirection: "row",
                              alignItems: "center",
                              m: 2,
                            }}
                          >
                            <ListItem>
                              {selectedImages.map((image, index) => {
                                return (
                                  <Box key={image} className="image">
                                    <CardMedia
                                      sx={{
                                        padding: 0,
                                        margin: 1,
                                        border:
                                          image === ImageSelectblob
                                            ? "2px solid #66CCFF"
                                            : "2px solid #999999",
                                        height: 140,
                                        width: 140,
                                      }}
                                      className="media"
                                      component="img"
                                      height="200"
                                      image={image}
                                      alt={name}
                                      id={index}
                                      onClick={(e) =>
                                        ImagHandleSelect(e, index)
                                      }
                                    />
                                    {image === CoverImages ? (
                                      <CardContent
                                        sx={{ margin: 1,mt:-2,backgroundColor: "#999999" }}
                                      >
                                        <Typography
                                          variant="body2"
                                          color="#fff"
                                        >
                                          Cover Image
                                        </Typography>
                                      </CardContent>
                                    ) : (
                                      <></>
                                    )}
                                     <Button
                                      onClick={() => deleteHandler(image)}
                                    >
                                      Remove
                                      {/* <ClearIcon
                                        sx={{ backgroundColor: "red" }}
                                      /> */}
                                    </Button>
                                  </Box>
                                );
                              })}
                            </ListItem>
                          </Box>
                        </List>
                      </Box>

                      <Typography
                        sx={{
                          mt: "50px",
                          fontSize: "20px",
                          fontWeight: "bold",
                        }}
                      >
                        Summary
                      </Typography>

                      <Box sx={{ mt: "40px" }}>
                        <CKEditor
                          editor={ClassicEditor}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            setSummary({ data });
                          }}
                        />
                      </Box>

                      <Typography
                        sx={{
                          mt: "50px",
                          fontSize: "20px",
                          fontWeight: "bold",
                        }}
                      >
                        Description
                      </Typography>

                      <Box sx={{ mt: "40px" }}>
                        <CKEditor
                          editor={ClassicEditor}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            setDescription({ data });
                          }}
                        />
                      </Box>

                      <Typography
                        sx={{
                          mt: "50px",
                          fontSize: "20px",
                          fontWeight: "bold",
                        }}
                      >
                        Features
                      </Typography>

                      <Typography>
                        <Button
                          sx={{ mt: "20px" }}
                          variant="outlined"
                          startIcon={<AddCircleIcon />}
                          onClick={() => setFeature(1)}
                        >
                          Add a feature
                        </Button>
                      </Typography>

                      <>
                        {feature === 1 ? (
                          <>
                            <Box sx={{ p: 2, m: 2 }}>
                              <Box
                                sx={{
                                  display: "flex",
                                  mt: "20px",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Typography>Feature</Typography>
                                <Typography>Predefined value</Typography>
                                <Typography>OR Customized value</Typography>
                              </Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  mt: "20px",
                                  justifyContent: "space-between",
                                }}
                              >
                                <FormControl sx={{ width: "30%" }}>
                                  <Select
                                    size="small"
                                    Featuresvaluedetails
                                    value={featurestype}
                                    onChange={(e) =>
                                      setFeaturestype(e.target.value)
                                    }
                                  >
                                    {Featuresdetails.map((Feature) => (
                                      <MenuItem
                                        key={Feature._id}
                                        value={Feature._id}
                                      >
                                        {Feature.featurename}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                                <FormControl sx={{ width: "30%" }}>
                                  <Select
                                    size="small"
                                    value={featurestypevalue}
                                    onChange={(e) =>
                                      setFeaturestypevalue(e.target.value)
                                    }
                                  >
                                    {Featuresvaluedetails?.filter((Feature) => {
                                      return (
                                        Feature.featuretype === featurestype
                                      );
                                    }).map((Feature) => (
                                      <MenuItem
                                        key={Feature._id}
                                        value={Feature._id}
                                      >
                                        {Feature.featurevalue}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                                <TextField
                                  id="outlined-size-small"
                                  size="small"
                                />
                              </Box>
                            </Box>
                          </>
                        ) : (
                          <></>
                        )}
                      </>

                      <Typography>
                        <Button
                          sx={{ mt: "20px" }}
                          variant="outlined"
                          startIcon={<AddCircleIcon />}
                          onClick={() => setBrand(1)}
                        >
                          Add a brand
                        </Button>
                      </Typography>

                      <>
                        {brand === 1 ? (
                          <>
                            <Box sx={{ p: 1, m: 1 }}>
                              <Box
                                sx={{
                                  display: "flex",
                                  mt: "10px",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Typography
                                  sx={{ fontSize: "20px", fontWeight: "700" }}
                                >
                                  Brand
                                </Typography>
                              </Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  mt: "20px",
                                  justifyContent: "space-between",
                                }}
                              >
                                <FormControl sx={{ width: "40%" }}>
                                  <Select
                                    value={brandId}
                                    onChange={(e) => setBrandId(e.target.value)}
                                  >
                                    {brandLists?.map((item, index) => (
                                      <MenuItem key={index} value={item._id}>
                                        {item.name}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Box>
                            </Box>
                          </>
                        ) : (
                          <></>
                        )}
                      </>

                      <Typography
                        sx={{
                          mt: "40px",
                          fontSize: "20px",
                          fontWeight: "bold",
                        }}
                      >
                        Related Product
                      </Typography>

                      <>
                        {relatProd === 1 ? (
                          <Typography sx={{ m: 2 }}>
                            <TextField
                              sx={{ width: "60%" }}
                              id="standard-bare"
                              variant="outlined"
                              {...register("search", { required: true })}
                              error={errors.search}
                              InputProps={{
                                endAdornment: (
                                  <IconButton>
                                    <SearchOutlined />
                                  </IconButton>
                                ),
                              }}
                            />
                          </Typography>
                        ) : (
                          <>
                            <Typography>
                              <Button
                                sx={{ mt: "20px" }}
                                variant="outlined"
                                startIcon={<AddCircleIcon />}
                                onClick={() => setRelatProduct(1)}
                              >
                                Add a related product
                              </Button>
                            </Typography>
                          </>
                        )}
                      </>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography
                      sx={{ mt: "0px", fontSize: "20px", fontWeight: "bold" }}
                    >
                      Combinations
                      <Tooltip title={Combinations}>
                        <InfoIcon />
                      </Tooltip>
                    </Typography>

                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel
                          value="Simple Product"
                          onChange={(e) => setCombination(e.target.value)}
                          control={<Radio />}
                          label="Simple Product"
                        />
                        <FormControlLabel
                          value="Product with combinations"
                          onChange={(e) => setCombination(e.target.value)}
                          control={<Radio />}
                          type="radio"
                          label="Product with combinations"
                        />
                      </RadioGroup>
                    </FormControl>

                    <Typography
                      sx={{ mt: "20px", fontSize: "20px", fontWeight: "bold" }}
                    >
                      Reference
                      <Tooltip title={reference}>
                        <InfoIcon />
                      </Tooltip>
                    </Typography>

                    <Typography>
                      <TextField
                        fullWidth
                        id="margin-normal"
                        margin="normal"
                        {...register("reference", { required: true })}
                      />
                    </Typography>

                    <Typography
                      sx={{ mt: "20px", fontSize: "20px", fontWeight: "bold" }}
                    >
                      Quantity
                      <Tooltip title={quantity}>
                        <InfoIcon />
                      </Tooltip>
                    </Typography>

                    <Typography>
                      <TextField
                        label="0"
                        fullWidth
                        id="margin-normal"
                        margin="normal"
                        {...register("quantity", { required: true })}
                      />
                    </Typography>

                    <Typography>
                      Advanced Settings in <ExitToAppIcon />
                      <span style={{ color: "blue" }}>Quantities</span>
                    </Typography>

                    <Typography
                      sx={{ mt: "30px", fontSize: "20px", fontWeight: "bold" }}
                    >
                      Price
                      <Tooltip title={price}>
                        <InfoIcon />
                      </Tooltip>
                    </Typography>

                    <Box sx={{ display: "flex", mt: "20px" }}>
                      <TextField
                        label="Tax excluded"
                        id="outlined-start-adornment"
                        {...register("taxexcluded", { required: true })}
                        sx={{ m: 1 }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">€</InputAdornment>
                          ),
                        }}
                      />

                      <TextField
                        label="Tax included"
                        {...register("taxincluded", { required: true })}
                        id="outlined-start-adornment"
                        sx={{ m: 1 }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">€</InputAdornment>
                          ),
                        }}
                      />
                    </Box>

                    <TextField
                      // select
                      label="Tax Rule"
                      fullWidth
                      id="margin-normal"
                      margin="normal"
                    >
                      <MenuItem>FR Taux standard (20%)</MenuItem>
                    </TextField>

                    <Typography>
                      Advanced Settings in <ExitToAppIcon />
                      <span style={{ color: "blue" }}>Pricing</span>
                    </Typography>

                    <Typography
                      sx={{ mt: "30px", fontSize: "20px", fontWeight: "bold" }}
                    >
                      categories
                      <Tooltip title={categories}>
                        <InfoIcon />
                      </Tooltip>
                    </Typography>

                    <Box
                      sx={{
                        width: "100%",
                        height: 400,
                        borderRadius: "2px",
                        border: "1px solid black",
                        mt: "30px",
                      }}
                    >
                      <Typography sx={{ m: 2 }}>
                        <TextField
                          fullWidth
                          id="standard-bare"
                          variant="outlined"
                          defaultValue="Search Categories"
                          InputProps={{
                            endAdornment: (
                              <IconButton>
                                <SearchOutlined />
                              </IconButton>
                            ),
                          }}
                        />
                      </Typography>

                      <Typography
                        sx={{ m: 2, fontSize: "17px", fontWeight: "bold" }}
                      >
                        ASSOCIATED CATEGORIES
                      </Typography>

                      <Typography sx={{ m: 2 }}>
                        <TextField fullWidth />
                      </Typography>
                    </Box>

                    <Typography
                      sx={{ mt: "30px", fontSize: "20px", fontWeight: "bold" }}
                    >
                      Create a new category
                      <Tooltip title={newcategories}>
                        <InfoIcon />
                      </Tooltip>
                    </Typography>

                    {category === 1 ? (
                      <>
                        <Box sx={{ m: 2, p: 1 }}>
                          <Typography>New Category name</Typography>

                          <Typography sx={{ mt: "20px" }}>
                            <TextField
                              id="outlined-size-small"
                              defaultValue="Category name"
                              size="small"
                            />
                          </Typography>

                          <Typography sx={{ mt: "20px" }}>
                            Parent of the category
                          </Typography>

                          <Typography sx={{ mt: "20px" }}>
                            <TextField
                              id="outlined-size-small"
                              defaultValue="Home"
                              size="small"
                            />
                          </Typography>

                          <Typography sx={{ mt: "20px" }}>
                            <Button variant="contained">Cancel</Button>
                            <Button variant="contained" sx={{ ml: "50px" }}>
                              Create
                            </Button>
                          </Typography>
                        </Box>
                      </>
                    ) : (
                      <>
                        <Typography>
                          <Button
                            sx={{ mt: "20px" }}
                            variant="outlined"
                            startIcon={<AddCircleIcon />}
                            onClick={() => setCategory(1)}
                          >
                            Create a Category
                          </Button>
                        </Typography>

                        <Typography>
                          <Button
                            type="submit"
                            sx={{ mt: "20px" }}
                            variant="contained"
                          >
                            Save
                          </Button>
                        </Typography>
                      </>
                    )}
                  </Grid>
                </Grid>
              )}
              {/* ************************************************************************* */}
              {tabIndex === 1 && (
                <Grid container>
                  <Grid item xs={12}>
                    <Box>
                      <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
                        Quantities
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        <Typography sx={{ mt: "20px", width: "100%" }}>
                          Quantity
                        </Typography>
                        <Typography sx={{ mt: "20px", width: "100%" }}>
                          Minimum quantity for sale
                          <Tooltip title={sale}>
                            <InfoIcon />
                          </Tooltip>
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        <Typography sx={{ mt: "20px", width: "100%" }}>
                          <TextField
                            size="small"
                            margin="normal"
                            id="qty"
                            name="qty"
                            autoComplete="off"
                            {...register("qty", { required: true })}
                            error={errors.qty}
                          />
                          {errors.qty && (
                            <span className="formError">qty is required</span>
                          )}
                        </Typography>
                        <Typography sx={{ mt: "20px", width: "100%" }}>
                          <TextField
                            size="small"
                            margin="normal"
                            id="categoryTittel"
                            name="mqty"
                            autoComplete="off"
                            {...register("mqty", { required: true })}
                            error={errors.mqty}
                          />
                          {errors.mqty && (
                            <span className="formError">
                              Minimum quantity is required
                            </span>
                          )}
                        </Typography>
                      </Box>

                      <Typography
                        sx={{
                          fontSize: "20px",
                          fontWeight: "bold",
                          mt: "30px",
                        }}
                      >
                        Stock
                      </Typography>

                      <Box>
                        <Typography sx={{ mt: "20px" }}>
                          Stock Location
                        </Typography>
                        <Typography sx={{ mt: "20px" }}>
                          <TextField
                            size="small"
                            margin="normal"
                            id="SLocation"
                            name="SLocation"
                            autoComplete="off"
                            {...register("SLocation", {
                              required: true,
                            })}
                            error={errors.SLocation}
                          />
                          {errors.SLocation && (
                            <span className="formError">
                              SLocation is required
                            </span>
                          )}
                        </Typography>
                      </Box>

                      <Box>
                        <Typography sx={{ mt: "20px", width: "100%" }}>
                          Low Stock Level
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          flexDirection: "row",
                          width: "100%",
                        }}
                      >
                        <Typography sx={{ mt: "20px", width: "100%" }}>
                          <TextField
                            size="small"
                            margin="normal"
                            id="SLevel"
                            label="SLevel"
                            autoComplete="off"
                            {...register("SLevel", { required: true })}
                            error={errors.SLevel}
                          />
                          {errors.SLevel && (
                            <span className="formError">Name is required</span>
                          )}
                        </Typography>

                        <Typography
                          sx={{
                            mt: "20px",
                            wordWrap: "break-word",
                            width: "100%",
                            fontSize: "15px",
                          }}
                        >
                          <Checkbox
                            value="newcheck"
                            {...register("newcheck", { required: true })}
                            error={errors.newcheck}
                          />{" "}
                          Send me an email when the quantity is below or equals
                          this level
                          <Tooltip title={level}>
                            <InfoIcon />
                          </Tooltip>
                        </Typography>
                      </Box>

                      <Typography
                        sx={{
                          fontSize: "20px",
                          fontWeight: "bold",
                          mt: "30px",
                        }}
                      >
                        Availability preferences
                      </Typography>

                      <Typography sx={{ mt: "20px" }}>
                        Behavior when out of stock
                      </Typography>

                      <FormControl>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          name="radio-buttons-group"
                        >
                          <FormControlLabel
                            value="Denyorders"
                            control={<Radio />}
                            label="Deny orders"
                            {...register("Denyorders", { required: true })}
                            error={errors.Denyorders}
                          />
                          <FormControlLabel
                            value="Alloworders"
                            control={<Radio />}
                            type="radio"
                            label="Allow orders"
                            {...register("Alloworders", { required: true })}
                            error={errors.Alloworders}
                          />
                          <FormControlLabel
                            value="Usedefault"
                            control={<Radio />}
                            label="Use default behavior (Deny orders)"
                            {...register("Usedefault", { required: true })}
                            error={errors.Usedefault}
                          />
                        </RadioGroup>
                      </FormControl>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mt: "30px",
                        }}
                      >
                        <Typography sx={{ width: "100%" }}>
                          Label when in stock
                        </Typography>
                        <Typography sx={{ width: "100%" }}>
                          Label when out of stock (and back order allowed)
                        </Typography>
                        <Typography sx={{ width: "100%" }}>
                          Availability date
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mt: "30px",
                        }}
                      >
                        <Typography sx={{ width: "100%" }}>
                          <TextField
                            size="small"
                            margin="normal"
                            id="stockin"
                            name="stockin"
                            autoComplete="off"
                            {...register("stockin", { required: true })}
                            error={errors.stockin}
                          />
                          {errors.stockin && (
                            <span className="formError">
                              stockin is required
                            </span>
                          )}
                        </Typography>
                        <Typography sx={{ width: "100%" }}>
                          <TextField
                            size="small"
                            margin="normal"
                            id="stockout"
                            name="stockout"
                            autoComplete="off"
                            {...register("stockout", {
                              required: true,
                            })}
                            error={errors.stockout}
                          />
                          {errors.stockout && (
                            <span className="formError">
                              stockout is required
                            </span>
                          )}
                        </Typography>
                        <Typography sx={{ width: "100%" }}>
                          <TextField
                            id="date"
                            size="small"
                            type="date"
                            sx={{ width: "60%", mt: "10px" }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            {...register("date", {
                              required: true,
                            })}
                          />
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              )}
              {tabIndex === 2 && (
                <Box>
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
                        Package Dimension
                      </Typography>

                      <Typography sx={{ mt: "30px" }}>
                        Charge additional shipping costs based on packet
                        dimensions covered here.
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mt: "30px",
                        }}
                      >
                        <Typography sx={{ width: "100%" }}>Width</Typography>
                        <Typography sx={{ width: "100%" }}>Height</Typography>
                        <Typography sx={{ width: "100%" }}>Depth</Typography>
                        <Typography sx={{ width: "100%" }}>Weight</Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mt: "20px",
                        }}
                      >
                        <OutlinedInput
                          sx={{ width: "100%", m: "0 10px" }}
                          id="outlined-adornment-weight"
                          endAdornment={
                            <InputAdornment position="end">cm</InputAdornment>
                          }
                          aria-describedby="outlined-weight-helper-text"
                          {...register("width", {
                            required: true,
                          })}
                          inputProps={{
                            "aria-label": "weight",
                          }}
                        />

                        <OutlinedInput
                          sx={{ width: "100%" }}
                          id="outlined-adornment-weight"
                          endAdornment={
                            <InputAdornment position="end">cm</InputAdornment>
                          }
                          {...register("height", {
                            required: true,
                          })}
                          aria-describedby="outlined-weight-helper-text"
                          inputProps={{
                            "aria-label": "weight",
                          }}
                        />

                        <OutlinedInput
                          sx={{ width: "100%", m: "0 10px" }}
                          id="outlined-adornment-weight"
                          endAdornment={
                            <InputAdornment position="end">cm</InputAdornment>
                          }
                          {...register("depth", {
                            required: true,
                          })}
                          aria-describedby="outlined-weight-helper-text"
                          inputProps={{
                            "aria-label": "weight",
                          }}
                        />

                        <OutlinedInput
                          sx={{ width: "100%" }}
                          id="outlined-adornment-weight"
                          endAdornment={
                            <InputAdornment position="end">kg</InputAdornment>
                          }
                          {...register("weight", {
                            required: true,
                          })}
                          aria-describedby="outlined-weight-helper-text"
                          inputProps={{
                            "aria-label": "weight",
                          }}
                        />
                      </Box>

                      <Typography
                        sx={{
                          fontSize: "20px",
                          fontWeight: "bold",
                          mt: "30px",
                        }}
                      >
                        Delivery Time
                        <Tooltip title={delivery}>
                          <InfoIcon />
                        </Tooltip>
                      </Typography>

                      <FormControl sx={{ mt: "20px" }}>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          name="radio-buttons-group"
                        >
                          <FormControlLabel
                            value="PayPal"
                            control={<Radio />}
                            label="None"
                          />
                          <FormControlLabel
                            value="Stripe"
                            control={<Radio />}
                            type="radio"
                            label="Default delivery time"
                          />
                          <FormControlLabel
                            value="rr"
                            control={<Radio />}
                            label="Specific delivery time to this product"
                          />
                        </RadioGroup>
                      </FormControl>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mt: "30px",
                        }}
                      >
                        <Typography sx={{ width: "100%" }}>
                          Delivery time of in-stock products:
                        </Typography>
                        <Typography sx={{ width: "100%" }}>
                          Delivery time of out-of-stock products with allowed
                          orders:
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mt: "30px",
                        }}
                      >
                        <Typography sx={{ width: "100%", m: "0 20px 0 0" }}>
                          <TextField
                            fullWidth
                            id="outlined-multiline-static"
                            defaultValue="Delivered within 3-4 days"
                          />
                        </Typography>
                        <Typography sx={{ width: "100%" }}>
                          <TextField
                            fullWidth
                            id="outlined-multiline-static"
                            defaultValue="Delivered within 5-7 days"
                          />
                        </Typography>
                      </Box>

                      <Typography
                        sx={{
                          fontSize: "20px",
                          fontWeight: "bold",
                          mt: "30px",
                        }}
                      >
                        Shipping fees
                        <Tooltip title={shipping}>
                          <InfoIcon />
                        </Tooltip>
                      </Typography>

                      <Typography sx={{ mt: "10px" }}>
                        Does this product incur additional shipping costs?
                      </Typography>

                      <Typography sx={{ mt: "10px" }}>
                        <TextField
                          id="outlined-start-adornment"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                €
                              </InputAdornment>
                            ),
                          }}
                          {...register("fees", {
                            required: true,
                          })}
                        />
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: "20px",
                          fontWeight: "bold",
                          mt: "30px",
                        }}
                      >
                        Available carriers
                      </Typography>

                      <FormGroup sx={{ mt: "20px" }}>
                        <FormControlLabel
                          control={<Checkbox defaultChecked />}
                          label="1 - PrestaShop (Pick up in-store)"
                        />
                        <FormControlLabel
                          control={<Checkbox defaultChecked />}
                          label="2 - My carrier (Delivery next day!)"
                        />
                        <FormControlLabel
                          control={<Checkbox defaultChecked />}
                          label="3 - My cheap carrier (Buy more to pay less!)"
                        />
                        <FormControlLabel
                          control={<Checkbox defaultChecked />}
                          label="4 - My light carrier (The lighter the cheaper!)"
                        />
                      </FormGroup>
                    </Grid>
                  </Grid>
                </Box>
              )}
              {tabIndex === 3 && (
                <Box>
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
                        Retail price
                        <Tooltip title={retail}>
                          <InfoIcon />
                        </Tooltip>
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mt: "30px",
                        }}
                      >
                        <Typography sx={{ width: "100%" }}>
                          Retail price (tax excl.)
                        </Typography>
                        <Typography sx={{ width: "100%" }}>
                          Retail price (tax incl.)
                        </Typography>
                        <Typography sx={{ width: "100%" }}>
                          Retail price per unit (tax excl.)
                          <Tooltip title={unit}>
                            <InfoIcon />
                          </Tooltip>
                        </Typography>
                        <Typography sx={{ width: "100%" }}></Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mt: "30px",
                        }}
                      >
                        <Typography sx={{ mt: "10px", width: "100%" }}>
                          <TextField
                            id="outlined-start-adornment"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  €
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Typography>
                        <Typography sx={{ mt: "10px", width: "100%" }}>
                          <TextField
                            id="outlined-start-adornment"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  €
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Typography>
                        <Typography sx={{ mt: "10px", width: "100%" }}>
                          <TextField
                            id="outlined-start-adornment"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  €
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Typography>

                        <Typography sx={{ mt: "10px", width: "100%" }}>
                          <TextField
                            id="outlined-start-adornment"
                            defaultValue="Per Kilo,per litre"
                          />
                        </Typography>
                      </Box>

                      <Typography sx={{ mt: "30px" }}>Tax rule</Typography>

                      <Typography sx={{ width: "40%" }}>
                        <TextField
                          // select
                          fullWidth
                          id="margin-normal"
                          margin="normal"
                        >
                          <MenuItem>FR Taux standard (20%)</MenuItem>
                        </TextField>
                      </Typography>

                      <FormGroup sx={{ mt: "20px" }}>
                        <FormControlLabel
                          control={<Checkbox defaultChecked />}
                          label="Display the On sale! lag on the product page, and on product listings."
                        />
                      </FormGroup>

                      <Typography
                        sx={{
                          fontSize: "20px",
                          fontWeight: "bold",
                          mt: "30px",
                        }}
                      >
                        Cost price
                        <Tooltip title={Cost}>
                          <InfoIcon />
                        </Tooltip>
                      </Typography>

                      <Typography sx={{ mt: "10px" }}>
                        Cost price (tax excl.)
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: "20px",
                          fontWeight: "bold",
                          mt: "30px",
                        }}
                      >
                        Specific price
                        <Tooltip title={Specific}>
                          <InfoIcon />
                        </Tooltip>
                      </Typography>

                      <Typography sx={{ mt: "10px" }}>
                        <Button
                          sx={{
                            mt: "20px",
                            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2);",
                          }}
                          variant="outlined"
                          startIcon={<AddCircleIcon />}
                          onClick={() => setSpecific(1)}
                        >
                          Add a specific price
                        </Button>
                      </Typography>

                      {specific === 1 ? (
                        <Box
                          sx={{
                            width: "100%",
                            height: "400px",
                            border: "0.1px solid lightgray",
                            mt: "20px",
                            borderRadius: "5px",
                            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2);",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: "bold",
                              mt: "20px",
                              m: 2,
                            }}
                          >
                            Specific price conditions
                          </Typography>

                          <Typography sx={{ m: 2 }}>For</Typography>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              m: 2,
                            }}
                          >
                            <Typography>
                              <TextField defaultValue="All Currencies" />
                            </Typography>
                            <Typography>
                              <TextField defaultValue="All Countries" />
                            </Typography>
                            <Typography>
                              <TextField defaultValue="All Groups" />
                            </Typography>
                          </Box>

                          <Typography sx={{ m: 2 }}>Customer</Typography>

                          <Typography sx={{ m: 2 }}>
                            <TextField defaultValue="All Customers" />
                          </Typography>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              m: 2,
                              width: "88%",
                            }}
                          >
                            <Typography>Available From</Typography>
                            <Typography>To</Typography>
                            <Typography>Starting at</Typography>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              m: 2,
                            }}
                          >
                            <Typography>
                              <TextField type="date" />
                            </Typography>
                            <Typography>
                              <TextField type="date" />
                            </Typography>
                            <Typography>
                              <TextField defaultValue="1" />
                            </Typography>
                          </Box>
                        </Box>
                      ) : (
                        <></>
                      )}

                      <Typography
                        sx={{
                          fontSize: "20px",
                          fontWeight: "bold",
                          mt: "30px",
                        }}
                      >
                        Priority management
                        <Tooltip title={Priority}>
                          <InfoIcon />
                        </Tooltip>
                      </Typography>

                      <Typography sx={{ mt: "20px" }}>Priorities</Typography>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mt: "30px",
                        }}
                      >
                        <FormControl sx={{ width: "100%", m: 2 }}>
                          <Select>
                            <MenuItem>Currency</MenuItem>
                            <MenuItem>Country</MenuItem>
                            <MenuItem>Group</MenuItem>
                          </Select>
                        </FormControl>

                        <FormControl sx={{ width: "100%", m: 2 }}>
                          <Select>
                            <MenuItem>Currency</MenuItem>
                            <MenuItem>Country</MenuItem>
                            <MenuItem>Group</MenuItem>
                          </Select>
                        </FormControl>

                        <FormControl sx={{ width: "100%", m: 2 }}>
                          <Select>
                            <MenuItem>Currency</MenuItem>
                            <MenuItem>Country</MenuItem>
                            <MenuItem>Group</MenuItem>
                          </Select>
                        </FormControl>

                        <FormControl sx={{ width: "100%", m: 2 }}>
                          <Select>
                            <MenuItem>Currency</MenuItem>
                            <MenuItem>Country</MenuItem>
                            <MenuItem>Group</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>

                      <FormGroup sx={{ mt: "20px" }}>
                        <FormControlLabel
                          control={<Checkbox defaultChecked />}
                          label="Apply to all products"
                        />
                      </FormGroup>
                    </Grid>
                  </Grid>
                </Box>
              )}
              {tabIndex === 4 && (
                <Box>
                  <Typography>SEO</Typography>
                </Box>
              )}
              {tabIndex === 5 && (
                <Box>
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
                        Visibility
                      </Typography>

                      <Typography sx={{ mt: "20px" }}>
                        Where do you want your product to appear?
                      </Typography>

                      <Typography sx={{ width: "40%", mt: "20px" }}>
                        <TextField
                          // select
                          fullWidth
                          id="margin-normal"
                          margin="normal"
                        >
                          <MenuItem>Everywhere</MenuItem>
                        </TextField>
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          flexDirection: "row",
                          width: "100%",
                        }}
                      >
                        <Typography sx={{ mt: "20px", width: "100%" }}>
                          <Checkbox
                            value="newcheck"
                            {...register("newcheck", { required: true })}
                            error={errors.newcheck}
                          />{" "}
                          Available for order
                        </Typography>

                        <Typography
                          sx={{
                            mt: "20px",
                            wordWrap: "break-word",
                            width: "100%",
                            fontSize: "15px",
                          }}
                        >
                          <Checkbox
                            value="newcheck"
                            {...register("newcheck", { required: true })}
                            error={errors.newcheck}
                          />{" "}
                          Web only (not sold in your retail store)
                        </Typography>
                      </Box>

                      <Typography sx={{ mt: "30px" }}>
                        <Typography>Tags</Typography>
                        <TextField
                          sx={{ width: "70%" }}
                          // select
                          fullWidth
                          id="margin-normal"
                          margin="normal"
                        ></TextField>
                      </Typography>

                      <Typography
                        sx={{
                          mt: "20px",
                          fontSize: "18px",
                          fontWeight: "bold",
                        }}
                      >
                        Condition & References
                      </Typography>

                      <Typography sx={{ mt: "10px" }}>
                        Condition
                        <Tooltip title={condition}>
                          <InfoIcon />
                        </Tooltip>
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          flexDirection: "row",
                          width: "100%",
                        }}
                      >
                        <Typography sx={{ mt: "10px", width: "100%" }}>
                          <TextField
                            fullWidth
                            id="margin-normal"
                            margin="normal"
                          ></TextField>
                        </Typography>

                        <Typography
                          sx={{
                            mt: "20px",
                            wordWrap: "break-word",
                            width: "100%",
                            fontSize: "15px",
                          }}
                        >
                          <Checkbox
                            value="newcheck"
                            {...register("newcheck", { required: true })}
                            error={errors.newcheck}
                          />{" "}
                          Display condition on product page
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          flexDirection: "row",
                          width: "80%",
                          mt: "30px",
                        }}
                      >
                        <Typography>ISBN</Typography>

                        <Typography>EAN-13 or JAN barcode</Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          flexDirection: "row",
                          width: "80%",
                        }}
                      >
                        <Typography>
                          <TextField
                            fullWidth
                            id="margin-normal"
                            margin="normal"
                          ></TextField>
                        </Typography>

                        <Typography>
                          <TextField
                            fullWidth
                            id="margin-normal"
                            margin="normal"
                          ></TextField>
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          flexDirection: "row",
                          width: "80%",
                          mt: "30px",
                        }}
                      >
                        <Typography>UPC barcode</Typography>

                        <Typography>MPN</Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          flexDirection: "row",
                          width: "80%",
                        }}
                      >
                        <Typography>
                          <TextField
                            fullWidth
                            id="margin-normal"
                            margin="normal"
                          ></TextField>
                        </Typography>

                        <Typography>
                          <TextField
                            fullWidth
                            id="margin-normal"
                            margin="normal"
                          ></TextField>
                        </Typography>
                      </Box>

                      <Typography>
                        <Button
                          type="submit"
                          sx={{ mt: "20px" }}
                          variant="contained"
                        >
                          Save
                        </Button>
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Box>
          </Box>
        ) : (
          <>
            {catProdindId ? (
              <Box
                sx={{ mt: "40px" }}
                component="form"
                onSubmit={handleSubmit(updateHandler)}
              >
                <Box>
                  <Tabs value={tabIndex} onChange={handleTabChange}>
                    <Tab label="Basic Settings" />
                    <Tab label="Quantities" />
                    <Tab label="Shipping" />
                    <Tab label="Pricing" />
                    <Tab label="SEO" />
                    <Tab label="Options" />
                  </Tabs>
                </Box>
                <Box sx={{ padding: 2 }}>
                  {}
                  {tabIndex === 0 && (
                    <Grid container spacing={3}>
                      <Grid item xs={8}>
                        <Box>
                          <Box>
                            <Typography
                              sx={{ fontSize: "17px", fontWeight: "bold" }}
                            >
                              Enter Your Product Name
                            </Typography>
                            <Typography>
                              <TextField
                                fullWidth
                                id="margin-normal"
                                margin="normal"
                                value={newProdname}
                                onChange={(e) => setNewProdname(e.target.value)}
                              />
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              border: "2px solid gray",
                              width: "100%",
                              height: "250px",
                              mt: "40px",
                            }}
                          >
                            <CardMedia
                                component="img"
                                height="125"
                                sx={{ border: "1px solid black", width: "25%",m :4 }}
                                image={`/api/uploads/editId/${catProdindId._id}`}
                              />
                          </Box>

                          <Typography
                            sx={{
                              mt: "50px",
                              fontSize: "20px",
                              fontWeight: "bold",
                            }}
                          >
                            Summary
                          </Typography>

                          <Box sx={{ mt: "40px" }}>
                            <CKEditor
                              editor={ClassicEditor}
                              data={newsummary}
                              onChange={(event, editor) => {
                                const data = editor.getData();
                                setNewdescription({ data });
                              }}
                            />
                          </Box>

                          <Typography
                            sx={{
                              mt: "50px",
                              fontSize: "20px",
                              fontWeight: "bold",
                            }}
                          >
                            Description
                          </Typography>

                          <Box sx={{ mt: "40px" }}>
                            <CKEditor
                              editor={ClassicEditor}
                              data={newdescription}
                              onChange={(event, editor) => {
                                const data = editor.getData();
                                setNewdescription({ data });
                              }}
                            />
                          </Box>

                          <Typography
                            sx={{
                              mt: "50px",
                              fontSize: "20px",
                              fontWeight: "bold",
                            }}
                          >
                            Features
                          </Typography>

                          <>
                            <Box sx={{ p: 2, m: 2 }}>
                              <Box
                                sx={{
                                  display: "flex",
                                  mt: "20px",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Typography>Feature</Typography>
                                <Typography>Predefined value</Typography>
                                <Typography>OR Customized value</Typography>
                              </Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  mt: "20px",
                                  justifyContent: "space-between",
                                }}
                              >
                                <FormControl sx={{ width: "30%" }}>
                                  <Select
                                    size="small"
                                    value={newfeature}
                                    onChange={(e) =>
                                      setNewfeature(e.target.value)
                                    }
                                  >
                                    {Featuresdetails?.map((Feature) => (
                                      <MenuItem
                                        key={Feature._id}
                                        value={Feature._id}
                                      >
                                        {Feature.featurename}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                                <FormControl sx={{ width: "30%" }}>
                                  <Select
                                    size="small"
                                    value={newfeaturestypevalue}
                                    onChange={(e) =>
                                      setNewfeaturestypevalue(e.target.value)
                                    }
                                  >
                                    {Featuresvaluedetails?.filter((Feature) => {
                                      return Feature.featuretype === newfeature;
                                    }).map((Feature) => (
                                      <MenuItem
                                        key={Feature._id}
                                        value={Feature._id}
                                      >
                                        {Feature.featurevalue}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                                <TextField
                                  id="outlined-size-small"
                                  size="small"
                                />
                              </Box>
                            </Box>
                          </>

                          <Box sx={{ p: 1, m: 1 }}>
                            <Box
                              sx={{
                                display: "flex",
                                mt: "10px",
                                justifyContent: "space-between",
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: "20px",
                                  fontWeight: "700",
                                }}
                              >
                                Brand
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                mt: "20px",
                                justifyContent: "space-between",
                              }}
                            >
                              <FormControl sx={{ width: "30%" }}>
                                <Select
                                  size="small"
                                  value={newbrandId}
                                  onChange={(e) =>
                                    setNewbrandId(e.target.value)
                                  }
                                >
                                  {brandLists?.map((item, index) => (
                                    <MenuItem key={index} value={item._id}>
                                      {item.name}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Box>
                          </Box>

                          <Typography
                            sx={{
                              mt: "40px",
                              fontSize: "20px",
                              fontWeight: "bold",
                            }}
                          >
                            Related Product
                          </Typography>

                          <>
                            {relatProd === 1 ? (
                              <Typography sx={{ m: 2 }}>
                                <TextField
                                  sx={{ width: "60%" }}
                                  id="standard-bare"
                                  variant="outlined"
                                  {...register("search", { required: true })}
                                  error={errors.search}
                                  InputProps={{
                                    endAdornment: (
                                      <IconButton>
                                        <SearchOutlined />
                                      </IconButton>
                                    ),
                                  }}
                                />
                              </Typography>
                            ) : (
                              <>
                                <Typography>
                                  <Button
                                    sx={{ mt: "20px" }}
                                    variant="outlined"
                                    startIcon={<AddCircleIcon />}
                                    onClick={() => setRelatProduct(1)}
                                  >
                                    Add a related product
                                  </Button>
                                </Typography>
                              </>
                            )}
                          </>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography
                          sx={{
                            mt: "0px",
                            fontSize: "20px",
                            fontWeight: "bold",
                          }}
                        >
                          Combinations
                          <Tooltip title={Combinations}>
                            <InfoIcon />
                          </Tooltip>
                        </Typography>

                        <FormControl>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                          >
                            <FormControlLabel
                              checked={newcombination}
                              onChange={(e) =>
                                setNewcombination(e.target.value)
                              }
                              control={<Radio />}
                              label="Simple Product"
                            />
                            <FormControlLabel
                              checked={newcombination}
                              onChange={(e) =>
                                setNewcombination(e.target.value)
                              }
                              control={<Radio />}
                              type="radio"
                              label="Product with combinations"
                            />
                          </RadioGroup>
                        </FormControl>

                        <Typography
                          sx={{
                            mt: "20px",
                            fontSize: "20px",
                            fontWeight: "bold",
                          }}
                        >
                          Reference
                          <Tooltip title={reference}>
                            <InfoIcon />
                          </Tooltip>
                        </Typography>

                        <Typography>
                          <TextField
                            fullWidth
                            id="margin-normal"
                            margin="normal"
                            value={newreference}
                            onChange={(e) => setNewreference(e.target.value)}
                          />
                        </Typography>

                        <Typography
                          sx={{
                            mt: "20px",
                            fontSize: "20px",
                            fontWeight: "bold",
                          }}
                        >
                          Quantity
                          <Tooltip title={quantity}>
                            <InfoIcon />
                          </Tooltip>
                        </Typography>

                        <Typography>
                          <TextField
                            label="0"
                            fullWidth
                            id="margin-normal"
                            margin="normal"
                            value={newQuantity}
                            onChange={(e) => setNewQuantity(e.target.value)}
                          />
                        </Typography>

                        <Typography>
                          Advanced Settings in <ExitToAppIcon />
                          <span style={{ color: "blue" }}>Quantities</span>
                        </Typography>

                        <Typography
                          sx={{
                            mt: "30px",
                            fontSize: "20px",
                            fontWeight: "bold",
                          }}
                        >
                          Price
                          <Tooltip title={price}>
                            <InfoIcon />
                          </Tooltip>
                        </Typography>

                        <Box sx={{ display: "flex", mt: "20px" }}>
                          <TextField
                            label="Tax excluded"
                            id="outlined-start-adornment"
                            value={newtaxexcluded}
                            onChange={(e) => setNewtaxexcluded(e.target.value)}
                            sx={{ m: 1 }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  €
                                </InputAdornment>
                              ),
                            }}
                          />

                          <TextField
                            label="Tax included"
                            value={newtaxincluded}
                            onChange={(e) => setNewtaxincluded(e.target.value)}
                            id="outlined-start-adornment"
                            sx={{ m: 1 }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  €
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Box>

                        <TextField
                          // select
                          label="Tax Rule"
                          fullWidth
                          id="margin-normal"
                          margin="normal"
                        >
                          <MenuItem>FR Taux standard (20%)</MenuItem>
                        </TextField>

                        <Typography>
                          Advanced Settings in <ExitToAppIcon />
                          <span style={{ color: "blue" }}>Pricing</span>
                        </Typography>

                        <Typography
                          sx={{
                            mt: "30px",
                            fontSize: "20px",
                            fontWeight: "bold",
                          }}
                        >
                          categories
                          <Tooltip title={categories}>
                            <InfoIcon />
                          </Tooltip>
                        </Typography>

                        <Box
                          sx={{
                            width: "100%",
                            height: 400,
                            borderRadius: "2px",
                            border: "1px solid black",
                            mt: "30px",
                          }}
                        >
                          <Typography sx={{ m: 2 }}>
                            <TextField
                              fullWidth
                              id="standard-bare"
                              variant="outlined"
                              defaultValue="Search Categories"
                              InputProps={{
                                endAdornment: (
                                  <IconButton>
                                    <SearchOutlined />
                                  </IconButton>
                                ),
                              }}
                            />
                          </Typography>

                          <Typography
                            sx={{ m: 2, fontSize: "17px", fontWeight: "bold" }}
                          >
                            ASSOCIATED CATEGORIES
                          </Typography>

                          <Typography sx={{ m: 2 }}>
                            <TextField fullWidth />
                          </Typography>
                        </Box>

                        <Typography
                          sx={{
                            mt: "30px",
                            fontSize: "20px",
                            fontWeight: "bold",
                          }}
                        >
                          Create a new category
                          <Tooltip title={newcategories}>
                            <InfoIcon />
                          </Tooltip>
                        </Typography>

                        {category === 1 ? (
                          <>
                            <Box sx={{ m: 2, p: 1 }}>
                              <Typography>New Category name</Typography>

                              <Typography sx={{ mt: "20px" }}>
                                <TextField
                                  id="outlined-size-small"
                                  defaultValue="Category name"
                                  size="small"
                                />
                              </Typography>

                              <Typography sx={{ mt: "20px" }}>
                                Parent of the category
                              </Typography>

                              <Typography sx={{ mt: "20px" }}>
                                <TextField
                                  id="outlined-size-small"
                                  defaultValue="Home"
                                  size="small"
                                />
                              </Typography>

                              <Typography sx={{ mt: "20px" }}>
                                <Button variant="contained">Cancel</Button>
                                <Button variant="contained" sx={{ ml: "50px" }}>
                                  Create
                                </Button>
                              </Typography>
                            </Box>
                          </>
                        ) : (
                          <>
                            <Typography>
                              <Button
                                sx={{ mt: "20px" }}
                                variant="outlined"
                                startIcon={<AddCircleIcon />}
                                onClick={() => setCategory(1)}
                              >
                                Create a Category
                              </Button>
                            </Typography>

                            <Typography>
                              <Button
                                type="submit"
                                sx={{ mt: "20px" }}
                                variant="contained"
                              >
                                Update
                              </Button>
                            </Typography>
                          </>
                        )}
                      </Grid>
                    </Grid>
                  )}
                  {tabIndex === 1 && (
                    <Grid container>
                      <Grid item xs={12}>
                        <Box>
                          <Typography
                            sx={{ fontSize: "20px", fontWeight: "bold" }}
                          >
                            Quantities
                          </Typography>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "100%",
                            }}
                          >
                            <Typography sx={{ mt: "20px", width: "100%" }}>
                              Quantity
                            </Typography>
                            <Typography sx={{ mt: "20px", width: "100%" }}>
                              Minimum quantity for sale
                              <Tooltip title={sale}>
                                <InfoIcon />
                              </Tooltip>
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "100%",
                            }}
                          >
                            <Typography sx={{ mt: "20px", width: "100%" }}>
                              <TextField
                                size="small"
                                margin="normal"
                                id="qty"
                                name="qty"
                                autoComplete="off"
                                {...register("qty", { required: true })}
                                error={errors.qty}
                              />
                              {errors.qty && (
                                <span className="formError">
                                  qty is required
                                </span>
                              )}
                            </Typography>
                            <Typography sx={{ mt: "20px", width: "100%" }}>
                              <TextField
                                size="small"
                                margin="normal"
                                id="categoryTittel"
                                name="mqty"
                                autoComplete="off"
                                {...register("mqty", { required: true })}
                                error={errors.mqty}
                              />
                              {errors.mqty && (
                                <span className="formError">
                                  Minimum quantity is required
                                </span>
                              )}
                            </Typography>
                          </Box>

                          <Typography
                            sx={{
                              fontSize: "20px",
                              fontWeight: "bold",
                              mt: "30px",
                            }}
                          >
                            Stock
                          </Typography>

                          <Box>
                            <Typography sx={{ mt: "20px" }}>
                              Stock Location
                            </Typography>
                            <Typography sx={{ mt: "20px" }}>
                              <TextField
                                size="small"
                                margin="normal"
                                id="SLocation"
                                name="SLocation"
                                autoComplete="off"
                                {...register("SLocation", {
                                  required: true,
                                })}
                                error={errors.SLocation}
                              />
                              {errors.SLocation && (
                                <span className="formError">
                                  SLocation is required
                                </span>
                              )}
                            </Typography>
                          </Box>

                          <Box>
                            <Typography sx={{ mt: "20px", width: "100%" }}>
                              Low Stock Level
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              flexDirection: "row",
                              width: "100%",
                            }}
                          >
                            <Typography sx={{ mt: "20px", width: "100%" }}>
                              <TextField
                                size="small"
                                margin="normal"
                                id="SLevel"
                                label="SLevel"
                                autoComplete="off"
                                {...register("SLevel", { required: true })}
                                error={errors.SLevel}
                              />
                              {errors.SLevel && (
                                <span className="formError">
                                  Name is required
                                </span>
                              )}
                            </Typography>

                            <Typography
                              sx={{
                                mt: "20px",
                                wordWrap: "break-word",
                                width: "100%",
                                fontSize: "15px",
                              }}
                            >
                              <Checkbox
                                value="newcheck"
                                {...register("newcheck", { required: true })}
                                error={errors.newcheck}
                              />{" "}
                              Send me an email when the quantity is below or
                              equals this level
                              <Tooltip title={level}>
                                <InfoIcon />
                              </Tooltip>
                            </Typography>
                          </Box>

                          <Typography
                            sx={{
                              fontSize: "20px",
                              fontWeight: "bold",
                              mt: "30px",
                            }}
                          >
                            Availability preferences
                          </Typography>

                          <Typography sx={{ mt: "20px" }}>
                            Behavior when out of stock
                          </Typography>

                          <FormControl>
                            <RadioGroup
                              aria-labelledby="demo-radio-buttons-group-label"
                              name="radio-buttons-group"
                            >
                              <FormControlLabel
                                value="Denyorders"
                                control={<Radio />}
                                label="Deny orders"
                                {...register("Denyorders", { required: true })}
                                error={errors.Denyorders}
                              />
                              <FormControlLabel
                                value="Alloworders"
                                control={<Radio />}
                                type="radio"
                                label="Allow orders"
                                {...register("Alloworders", { required: true })}
                                error={errors.Alloworders}
                              />
                              <FormControlLabel
                                value="Usedefault"
                                control={<Radio />}
                                label="Use default behavior (Deny orders)"
                                {...register("Usedefault", { required: true })}
                                error={errors.Usedefault}
                              />
                            </RadioGroup>
                          </FormControl>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              mt: "30px",
                            }}
                          >
                            <Typography sx={{ width: "100%" }}>
                              Label when in stock
                            </Typography>
                            <Typography sx={{ width: "100%" }}>
                              Label when out of stock (and back order allowed)
                            </Typography>
                            <Typography sx={{ width: "100%" }}>
                              Availability date
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              mt: "30px",
                            }}
                          >
                            <Typography sx={{ width: "100%" }}>
                              <TextField
                                size="small"
                                margin="normal"
                                id="stockin"
                                name="stockin"
                                autoComplete="off"
                                {...register("stockin", { required: true })}
                                error={errors.stockin}
                              />
                              {errors.stockin && (
                                <span className="formError">
                                  stockin is required
                                </span>
                              )}
                            </Typography>
                            <Typography sx={{ width: "100%" }}>
                              <TextField
                                size="small"
                                margin="normal"
                                id="stockout"
                                name="stockout"
                                autoComplete="off"
                                {...register("stockout", {
                                  required: true,
                                })}
                                error={errors.stockout}
                              />
                              {errors.stockout && (
                                <span className="formError">
                                  stockout is required
                                </span>
                              )}
                            </Typography>
                            <Typography sx={{ width: "100%" }}>
                              <TextField
                                id="date"
                                size="small"
                                type="date"
                                sx={{ width: "60%", mt: "10px" }}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                {...register("date", {
                                  required: true,
                                })}
                              />
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  )}
                  {tabIndex === 2 && (
                    <Box>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography
                            sx={{ fontSize: "20px", fontWeight: "bold" }}
                          >
                            Package Dimension
                          </Typography>

                          <Typography sx={{ mt: "30px" }}>
                            Charge additional shipping costs based on packet
                            dimensions covered here.
                          </Typography>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              mt: "30px",
                            }}
                          >
                            <Typography sx={{ width: "100%" }}>
                              Width
                            </Typography>
                            <Typography sx={{ width: "100%" }}>
                              Height
                            </Typography>
                            <Typography sx={{ width: "100%" }}>
                              Depth
                            </Typography>
                            <Typography sx={{ width: "100%" }}>
                              Weight
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              mt: "20px",
                            }}
                          >
                            <OutlinedInput
                              sx={{ width: "100%", m: "0 10px" }}
                              id="outlined-adornment-weight"
                              endAdornment={
                                <InputAdornment position="end">
                                  cm
                                </InputAdornment>
                              }
                              aria-describedby="outlined-weight-helper-text"
                              {...register("width", {
                                required: true,
                              })}
                              inputProps={{
                                "aria-label": "weight",
                              }}
                            />

                            <OutlinedInput
                              sx={{ width: "100%" }}
                              id="outlined-adornment-weight"
                              endAdornment={
                                <InputAdornment position="end">
                                  cm
                                </InputAdornment>
                              }
                              {...register("height", {
                                required: true,
                              })}
                              aria-describedby="outlined-weight-helper-text"
                              inputProps={{
                                "aria-label": "weight",
                              }}
                            />

                            <OutlinedInput
                              sx={{ width: "100%", m: "0 10px" }}
                              id="outlined-adornment-weight"
                              endAdornment={
                                <InputAdornment position="end">
                                  cm
                                </InputAdornment>
                              }
                              {...register("depth", {
                                required: true,
                              })}
                              aria-describedby="outlined-weight-helper-text"
                              inputProps={{
                                "aria-label": "weight",
                              }}
                            />

                            <OutlinedInput
                              sx={{ width: "100%" }}
                              id="outlined-adornment-weight"
                              endAdornment={
                                <InputAdornment position="end">
                                  kg
                                </InputAdornment>
                              }
                              {...register("weight", {
                                required: true,
                              })}
                              aria-describedby="outlined-weight-helper-text"
                              inputProps={{
                                "aria-label": "weight",
                              }}
                            />
                          </Box>

                          <Typography
                            sx={{
                              fontSize: "20px",
                              fontWeight: "bold",
                              mt: "30px",
                            }}
                          >
                            Delivery Time
                            <Tooltip title={delivery}>
                              <InfoIcon />
                            </Tooltip>
                          </Typography>

                          <FormControl sx={{ mt: "20px" }}>
                            <RadioGroup
                              aria-labelledby="demo-radio-buttons-group-label"
                              name="radio-buttons-group"
                            >
                              <FormControlLabel
                                value="PayPal"
                                control={<Radio />}
                                label="None"
                              />
                              <FormControlLabel
                                value="Stripe"
                                control={<Radio />}
                                type="radio"
                                label="Default delivery time"
                              />
                              <FormControlLabel
                                value="rr"
                                control={<Radio />}
                                label="Specific delivery time to this product"
                              />
                            </RadioGroup>
                          </FormControl>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              mt: "30px",
                            }}
                          >
                            <Typography sx={{ width: "100%" }}>
                              Delivery time of in-stock products:
                            </Typography>
                            <Typography sx={{ width: "100%" }}>
                              Delivery time of out-of-stock products with
                              allowed orders:
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              mt: "30px",
                            }}
                          >
                            <Typography sx={{ width: "100%", m: "0 20px 0 0" }}>
                              <TextField
                                fullWidth
                                id="outlined-multiline-static"
                                defaultValue="Delivered within 3-4 days"
                              />
                            </Typography>
                            <Typography sx={{ width: "100%" }}>
                              <TextField
                                fullWidth
                                id="outlined-multiline-static"
                                defaultValue="Delivered within 5-7 days"
                              />
                            </Typography>
                          </Box>

                          <Typography
                            sx={{
                              fontSize: "20px",
                              fontWeight: "bold",
                              mt: "30px",
                            }}
                          >
                            Shipping fees
                            <Tooltip title={shipping}>
                              <InfoIcon />
                            </Tooltip>
                          </Typography>

                          <Typography sx={{ mt: "10px" }}>
                            Does this product incur additional shipping costs?
                          </Typography>

                          <Typography sx={{ mt: "10px" }}>
                            <TextField
                              id="outlined-start-adornment"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    €
                                  </InputAdornment>
                                ),
                              }}
                              {...register("fees", {
                                required: true,
                              })}
                            />
                          </Typography>

                          <Typography
                            sx={{
                              fontSize: "20px",
                              fontWeight: "bold",
                              mt: "30px",
                            }}
                          >
                            Available carriers
                          </Typography>

                          <FormGroup sx={{ mt: "20px" }}>
                            <FormControlLabel
                              control={<Checkbox defaultChecked />}
                              label="1 - PrestaShop (Pick up in-store)"
                            />
                            <FormControlLabel
                              control={<Checkbox defaultChecked />}
                              label="2 - My carrier (Delivery next day!)"
                            />
                            <FormControlLabel
                              control={<Checkbox defaultChecked />}
                              label="3 - My cheap carrier (Buy more to pay less!)"
                            />
                            <FormControlLabel
                              control={<Checkbox defaultChecked />}
                              label="4 - My light carrier (The lighter the cheaper!)"
                            />
                          </FormGroup>
                        </Grid>
                      </Grid>
                    </Box>
                  )}
                  {tabIndex === 3 && (
                    <Box>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography
                            sx={{ fontSize: "20px", fontWeight: "bold" }}
                          >
                            Retail price
                            <Tooltip title={retail}>
                              <InfoIcon />
                            </Tooltip>
                          </Typography>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              mt: "30px",
                            }}
                          >
                            <Typography sx={{ width: "100%" }}>
                              Retail price (tax excl.)
                            </Typography>
                            <Typography sx={{ width: "100%" }}>
                              Retail price (tax incl.)
                            </Typography>
                            <Typography sx={{ width: "100%" }}>
                              Retail price per unit (tax excl.)
                              <Tooltip title={unit}>
                                <InfoIcon />
                              </Tooltip>
                            </Typography>
                            <Typography sx={{ width: "100%" }}></Typography>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              mt: "30px",
                            }}
                          >
                            <Typography sx={{ mt: "10px", width: "100%" }}>
                              <TextField
                                id="outlined-start-adornment"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      €
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </Typography>
                            <Typography sx={{ mt: "10px", width: "100%" }}>
                              <TextField
                                id="outlined-start-adornment"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      €
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </Typography>
                            <Typography sx={{ mt: "10px", width: "100%" }}>
                              <TextField
                                id="outlined-start-adornment"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      €
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </Typography>

                            <Typography sx={{ mt: "10px", width: "100%" }}>
                              <TextField
                                id="outlined-start-adornment"
                                defaultValue="Per Kilo,per litre"
                              />
                            </Typography>
                          </Box>

                          <Typography sx={{ mt: "30px" }}>Tax rule</Typography>

                          <Typography sx={{ width: "40%" }}>
                            <TextField
                              // select
                              fullWidth
                              id="margin-normal"
                              margin="normal"
                            >
                              <MenuItem>FR Taux standard (20%)</MenuItem>
                            </TextField>
                          </Typography>

                          <FormGroup sx={{ mt: "20px" }}>
                            <FormControlLabel
                              control={<Checkbox defaultChecked />}
                              label="Display the On sale! lag on the product page, and on product listings."
                            />
                          </FormGroup>

                          <Typography
                            sx={{
                              fontSize: "20px",
                              fontWeight: "bold",
                              mt: "30px",
                            }}
                          >
                            Cost price
                            <Tooltip title={Cost}>
                              <InfoIcon />
                            </Tooltip>
                          </Typography>

                          <Typography sx={{ mt: "10px" }}>
                            Cost price (tax excl.)
                          </Typography>

                          <Typography
                            sx={{
                              fontSize: "20px",
                              fontWeight: "bold",
                              mt: "30px",
                            }}
                          >
                            Specific price
                            <Tooltip title={Specific}>
                              <InfoIcon />
                            </Tooltip>
                          </Typography>

                          <Typography sx={{ mt: "10px" }}>
                            <Button
                              sx={{
                                mt: "20px",
                                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2);",
                              }}
                              variant="outlined"
                              startIcon={<AddCircleIcon />}
                              onClick={() => setSpecific(1)}
                            >
                              Add a specific price
                            </Button>
                          </Typography>

                          {specific === 1 ? (
                            <Box
                              sx={{
                                width: "100%",
                                height: "400px",
                                border: "0.1px solid lightgray",
                                mt: "20px",
                                borderRadius: "5px",
                                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2);",
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                  mt: "20px",
                                  m: 2,
                                }}
                              >
                                Specific price conditions
                              </Typography>

                              <Typography sx={{ m: 2 }}>For</Typography>

                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  m: 2,
                                }}
                              >
                                <Typography>
                                  <TextField defaultValue="All Currencies" />
                                </Typography>
                                <Typography>
                                  <TextField defaultValue="All Countries" />
                                </Typography>
                                <Typography>
                                  <TextField defaultValue="All Groups" />
                                </Typography>
                              </Box>

                              <Typography sx={{ m: 2 }}>Customer</Typography>

                              <Typography sx={{ m: 2 }}>
                                <TextField defaultValue="All Customers" />
                              </Typography>

                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  m: 2,
                                  width: "88%",
                                }}
                              >
                                <Typography>Available From</Typography>
                                <Typography>To</Typography>
                                <Typography>Starting at</Typography>
                              </Box>

                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  m: 2,
                                }}
                              >
                                <Typography>
                                  <TextField type="date" />
                                </Typography>
                                <Typography>
                                  <TextField type="date" />
                                </Typography>
                                <Typography>
                                  <TextField defaultValue="1" />
                                </Typography>
                              </Box>
                            </Box>
                          ) : (
                            <></>
                          )}

                          <Typography
                            sx={{
                              fontSize: "20px",
                              fontWeight: "bold",
                              mt: "30px",
                            }}
                          >
                            Priority management
                            <Tooltip title={Priority}>
                              <InfoIcon />
                            </Tooltip>
                          </Typography>

                          <Typography sx={{ mt: "20px" }}>
                            Priorities
                          </Typography>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              mt: "30px",
                            }}
                          >
                            <FormControl sx={{ width: "100%", m: 2 }}>
                              <Select>
                                <MenuItem>Currency</MenuItem>
                                <MenuItem>Country</MenuItem>
                                <MenuItem>Group</MenuItem>
                              </Select>
                            </FormControl>

                            <FormControl sx={{ width: "100%", m: 2 }}>
                              <Select>
                                <MenuItem>Currency</MenuItem>
                                <MenuItem>Country</MenuItem>
                                <MenuItem>Group</MenuItem>
                              </Select>
                            </FormControl>

                            <FormControl sx={{ width: "100%", m: 2 }}>
                              <Select>
                                <MenuItem>Currency</MenuItem>
                                <MenuItem>Country</MenuItem>
                                <MenuItem>Group</MenuItem>
                              </Select>
                            </FormControl>

                            <FormControl sx={{ width: "100%", m: 2 }}>
                              <Select>
                                <MenuItem>Currency</MenuItem>
                                <MenuItem>Country</MenuItem>
                                <MenuItem>Group</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>

                          <FormGroup sx={{ mt: "20px" }}>
                            <FormControlLabel
                              control={<Checkbox defaultChecked />}
                              label="Apply to all products"
                            />
                          </FormGroup>
                        </Grid>
                      </Grid>
                    </Box>
                  )}
                  {tabIndex === 4 && (
                    <Box>
                      <Typography>SEO</Typography>
                    </Box>
                  )}
                  {tabIndex === 5 && (
                    <Box>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography
                            sx={{ fontSize: "20px", fontWeight: "bold" }}
                          >
                            Visibility
                          </Typography>

                          <Typography sx={{ mt: "20px" }}>
                            Where do you want your product to appear?
                          </Typography>

                          <Typography sx={{ width: "40%", mt: "20px" }}>
                            <TextField
                              // select
                              fullWidth
                              id="margin-normal"
                              margin="normal"
                            >
                              <MenuItem>Everywhere</MenuItem>
                            </TextField>
                          </Typography>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              flexDirection: "row",
                              width: "100%",
                            }}
                          >
                            <Typography sx={{ mt: "20px", width: "100%" }}>
                              <Checkbox
                                value="newcheck"
                                {...register("newcheck", { required: true })}
                                error={errors.newcheck}
                              />{" "}
                              Available for order
                            </Typography>

                            <Typography
                              sx={{
                                mt: "20px",
                                wordWrap: "break-word",
                                width: "100%",
                                fontSize: "15px",
                              }}
                            >
                              <Checkbox
                                value="newcheck"
                                {...register("newcheck", { required: true })}
                                error={errors.newcheck}
                              />{" "}
                              Web only (not sold in your retail store)
                            </Typography>
                          </Box>

                          <Typography sx={{ mt: "30px" }}>
                            <Typography>Tags</Typography>
                            <TextField
                              sx={{ width: "70%" }}
                              // select
                              fullWidth
                              id="margin-normal"
                              margin="normal"
                            ></TextField>
                          </Typography>

                          <Typography
                            sx={{
                              mt: "20px",
                              fontSize: "18px",
                              fontWeight: "bold",
                            }}
                          >
                            Condition & References
                          </Typography>

                          <Typography sx={{ mt: "10px" }}>
                            Condition
                            <Tooltip title={condition}>
                              <InfoIcon />
                            </Tooltip>
                          </Typography>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              flexDirection: "row",
                              width: "100%",
                            }}
                          >
                            <Typography sx={{ mt: "10px", width: "100%" }}>
                              <TextField
                                fullWidth
                                id="margin-normal"
                                margin="normal"
                              ></TextField>
                            </Typography>

                            <Typography
                              sx={{
                                mt: "20px",
                                wordWrap: "break-word",
                                width: "100%",
                                fontSize: "15px",
                              }}
                            >
                              <Checkbox
                                value="newcheck"
                                {...register("newcheck", { required: true })}
                                error={errors.newcheck}
                              />{" "}
                              Display condition on product page
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              flexDirection: "row",
                              width: "80%",
                              mt: "30px",
                            }}
                          >
                            <Typography>ISBN</Typography>

                            <Typography>EAN-13 or JAN barcode</Typography>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              flexDirection: "row",
                              width: "80%",
                            }}
                          >
                            <Typography>
                              <TextField
                                fullWidth
                                id="margin-normal"
                                margin="normal"
                              ></TextField>
                            </Typography>

                            <Typography>
                              <TextField
                                fullWidth
                                id="margin-normal"
                                margin="normal"
                              ></TextField>
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              flexDirection: "row",
                              width: "80%",
                              mt: "30px",
                            }}
                          >
                            <Typography>UPC barcode</Typography>

                            <Typography>MPN</Typography>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              flexDirection: "row",
                              width: "80%",
                            }}
                          >
                            <Typography>
                              <TextField
                                fullWidth
                                id="margin-normal"
                                margin="normal"
                              ></TextField>
                            </Typography>

                            <Typography>
                              <TextField
                                fullWidth
                                id="margin-normal"
                                margin="normal"
                              ></TextField>
                            </Typography>
                          </Box>

                          <Typography>
                            <Button
                              type="submit"
                              sx={{ mt: "20px" }}
                              variant="contained"
                            >
                              Save
                            </Button>
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  )}
                </Box>
              </Box>
            ) : (
              <>
                <Box
                  sx={{
                    height: 560,
                    width: "100%",

                    "& .super-app-theme--header": {
                      backgroundColor: "#808080",
                      color: "#ffffff",
                    },
                    "& .css-1jbbcbn-MuiDataGrid-columnHeaderTitle": {
                      fontSize: 16,
                    },
                    ".css-o8hwua-MuiDataGrid-root .MuiDataGrid-cellContent": {
                      fontSize: 13,
                    },
                    ".css-bfht93-MuiDataGrid-root .MuiDataGrid-columnHeader--alignCenter .MuiDataGrid-columnHeaderTitleContainer":
                      {
                        backgroundColor: "#330033",
                        color: "#ffffff",
                      },
                    ".css-h4y409-MuiList-root": {
                      display: "grid",
                    },
                    ".css-1omg972-MuiDataGrid-root .MuiDataGrid-columnHeader--alignCenter .MuiDataGrid-columnHeaderTitleContainer":
                      {
                        backgroundColor: "#808080",
                      },
                  }}
                >
                  <DataGrid
                    sx={{
                      boxShadow: 10,
                      borderRadius: 0,
                      m: 2,
                    }}
                    columns={columns}
                    rows={catProducts ? catProducts : ""}
                    getRowId={(rows) => rows._id}
                    VerticalAlignment="Center"
                    rowHeight={64}
                    pagination
                    checkboxSelection
                  />
                </Box>
              </>
            )}

            <Dialog
              // fullWidth={fullWidth}
              // maxWidth={maxWidth}
              open={open}
              onClick={handleClose}
              sx={{
                width: 700,
                hight: 700,
              }}
            >
              <Box>
                <CardMedia
                  sx={{
                    cursor: "pointer",
                    justifycontent: "space-between",
                  }}
                  component="img"
                  // height="200"
                  image={newImg}
                  // alt={"subimgnew.filename"}
                  // onMouseOver={handleChangeimage}
                />
              </Box>
            </Dialog>
          </>
        )}
      </>
    </>
  );
}

export default CatProductScreen;
