import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { IconButton } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import InfoIcon from "@mui/icons-material/Info";
import { Box, Tab, Tabs, Typography } from "@mui/material";
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
import { DropzoneArea } from "material-ui-dropzone";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { saveCatologProduct } from "../actions/catProductAction";
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

  const [tabIndex, setTabIndex] = useState(0);

  // ----Save----

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

  // eslint-disable-next-line no-unused-vars
  const [errorUpload, setErrorUpload] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    console.log("e", e);
    const formData = new FormData();
    formData.append("image", dropimg[0]);
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
          feature: e.feature,
          brand: e.brand,
          search: e.search,
          reference: e.reference,
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

  const handleChange = (files) => {
    setDropimg(files);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "firstName",
      headerName: "First name",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "lastName",
      headerName: "Last name",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "fullName",
      headerName: "Full name",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
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
                        <DropzoneArea onChange={handleChange.bind(this)} />
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
                                <TextField
                                  id="outlined-size-small"
                                  {...register("feature", { required: true })}
                                  error={errors.feature}
                                  size="small"
                                />
                                <TextField
                                  id="outlined-size-small"
                                  defaultValue="Choose a Value"
                                  size="small"
                                />
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
                                <TextField
                                  id="outlined-size-small"
                                  {...register("brand", { required: true })}
                                  error={errors.brand}
                                  size="small"
                                />
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
                          value="PayPal"
                          control={<Radio />}
                          label="Simple Product"
                        />
                        <FormControlLabel
                          value="Stripe"
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
                        error={errors.reference}
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
                        error={errors.quantity}
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
                        error={errors.taxexcluded}
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
                        error={errors.taxincluded}
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
                              width: "88%"
                            }}
                          >
                            <Typography>
                              Available From
                            </Typography>
                            <Typography>
                              To
                            </Typography>
                            <Typography>
                              Starting at
                            </Typography>
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
              rows={rows}
              //   getRowId={(rows) => rows._id}
              VerticalAlignment="Center"
              rowHeight={64}
              pagination
              checkboxSelection
            />
          </Box>
        )}
      </>
    </>
  );
}

export default CatProductScreen;
