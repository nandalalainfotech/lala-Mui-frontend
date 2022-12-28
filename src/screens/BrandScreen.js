import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import {
  brandAddressList,
  brandList,
  saveAddress,
  saveBrand,
} from "../actions/brandAction";
import { DataGrid } from "@mui/x-data-grid";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MenuItem } from "../../node_modules/@material-ui/core/index";
import CardMedia from "@mui/material/CardMedia";
import Dialog from "@mui/material/Dialog";

function BrandScreen() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [brand, setBrand] = useState(0);
  const [branditem, setBranditem] = useState(0);
  const [brandaddress, setBrandaddress] = useState(0);
  const [supplier, setSupplier] = useState(0);
  const [brandId, setBrandId] = useState("");

  const [editor, setEditor] = useState("");
  const [ckeditor, setckeditor] = useState("");

  const [newImg, setNewimg] = useState();
  const [open, setOpen] = useState(false);

  const handleTabChange = (event, newBrand) => {
    setBrand(newBrand);
    setBranditem(0);
    setBrandaddress(0);
    setSupplier(0);
  };

  const handleClickOpen = (e) => {
    setNewimg(e.target.src);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  const theme = createTheme();

  const submitHandler = (e) => {
    dispatch(
      saveBrand({
        name: e.name,
        imageFile: e.imageFile,
        editor: editor,
        ckeditor: ckeditor,
      })
    );
    window.confirm("Brand Details Added SuccessFully!!");
    event.target.reset();
    setEditor("");
    setckeditor("");
  };

  const addresssubmitHandler = (e) => {
    dispatch(
      saveAddress({
        brand: brandId,
        lastname: e.lastname,
        firstname: e.firstname,
        address: e.address,
        address2: e.address2,
        zip: e.zip,
        city: e.city,
        country: e.country,
        dni: e.dni,
        phone: e.phone,
        mobile: e.mobile,
        other: e.other,
      })
    );
    window.confirm("Address Details Added SuccessFully!!");
    event.target.reset();
    setBrandId("");
  };

  const brandReduce = useSelector((state) => state.brandReduce);
  const { brandLists } = brandReduce;

  const brandAddreList = useSelector((state) => state.brandAddreList);
  const { brandAddLists } = brandAddreList;

  useEffect(() => {
    dispatch(brandList());
    dispatch(brandAddressList());
  }, [dispatch]);

  const columns = [
    {
      field: "imageFile",
      headerName: "Logo",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        console.log("params", params);
        return (
          <Avatar
            onClick={handleClickOpen}
            sx={{ height: "50px", width: "50px", cursor: "pointer" }}
            src={`/api/brand/show/${params.row.filename}`}
            alt={params.row.filename}
          />
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "ckeditor",
      headerName: "Description",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "editor",
      headerName: "Short Decription",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
  ];

  function getbrandId(brandAddLists) {
    console.log("brandAddLists", brandAddLists);
    let cat = brandAddLists.row.brand
      ? brandLists.find((x) => x._id === brandAddLists.row.brand)?.name
      : "arraa";
    return cat;
  }

  const brandcolumns = [
    {
      field: "brand",
      headerName: "Brand",
      flex: 1,
      headerClassName: "super-app-theme--header",
      valueGetter: getbrandId,
    },
    {
      field: "firstname",
      headerName: "First Name",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "lastname",
      headerName: "Last Name",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "zip",
      headerName: "Zip/Postal code",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "country",
      headerName: "Country",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "phone",
      headerName: "Mobile",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
  ];

  return (
    <>
      <Box sx={{}}>
        {brand === 0 && (
          <Box>
            {branditem === 1 ? (
              <Box sx={{ display: "flex" }}>
                <Typography sx={{ fontSize: "25px", fontWeight: "600" }}>
                  Add New
                </Typography>

                <Box sx={{ ml: "auto" }}>
                  <Button variant="outlined" sx={{ mr: 2 }}>
                    Recommended Modules and Services
                  </Button>

                  <Button variant="outlined">Help</Button>
                </Box>
              </Box>
            ) : (
              <>
                {brandaddress === 1 ? (
                  <Box sx={{ display: "flex" }}>
                    <Typography sx={{ fontSize: "25px", fontWeight: "600" }}>
                      Add New Address
                    </Typography>

                    <Box sx={{ ml: "auto" }}>
                      <Button variant="outlined" sx={{ mr: 2 }}>
                        Recommended Modules and Services
                      </Button>

                      <Button variant="outlined">Help</Button>
                    </Box>
                  </Box>
                ) : (
                  <Box sx={{ display: "flex" }}>
                    <Typography sx={{ fontSize: "25px", fontWeight: "600" }}>
                      Brands
                    </Typography>

                    <Box sx={{ ml: "auto" }}>
                      <Button
                        sx={{ mr: 3 }}
                        variant="contained"
                        startIcon={<AddCircleIcon />}
                        onClick={() => setBranditem(1)}
                      >
                        Add new brand
                      </Button>

                      <Button
                        sx={{ mr: 2 }}
                        variant="contained"
                        startIcon={<AddCircleIcon />}
                        onClick={() => setBrandaddress(1)}
                      >
                        Add new brand address
                      </Button>

                      <Button variant="outlined" sx={{ mr: 2 }}>
                        Recommended Modules and Services
                      </Button>

                      <Button variant="outlined">Help</Button>
                    </Box>
                  </Box>
                )}
              </>
            )}
          </Box>
        )}
        {brand === 1 && (
          <Box sx={{ display: "flex" }}>
            <Typography sx={{ fontSize: "25px", fontWeight: "600" }}>
              Suppliers
            </Typography>

            <Box sx={{ ml: "auto" }}>
              <Button
                sx={{ mr: 2 }}
                variant="contained"
                startIcon={<AddCircleIcon />}
                onClick={() => setSupplier(1)}
              >
                Add new supplier
              </Button>

              <Button variant="outlined" sx={{ mr: 2 }}>
                Recommended Modules and Services
              </Button>

              <Button variant="outlined">Help</Button>
            </Box>
          </Box>
        )}
      </Box>

      <Box>
        <Box>
          <Tabs value={brand} onChange={handleTabChange}>
            <Tab label="Brands" />
            <Tab label="Supplier" />
          </Tabs>
        </Box>
        <Box>
          {brand === 0 && (
            <Box>
              {branditem === 1 ? (
                <ThemeProvider theme={theme}>
                  <Container
                    component="main"
                    maxWidth="sm"
                    sx={{ my: { xs: 5, md: 6, lg: 5 }, p: { xs: 2, md: 1 } }}
                  >
                    <CssBaseline />
                    <Box
                      component="form"
                      onSubmit={handleSubmit(submitHandler)}
                      sx={{
                        display: "flex",
                        width: "100%",
                        flexDirection: "column",
                        alignItems: "left",
                        borderRadius: "2px",
                        p: 5,
                        border: "1px solid black",
                      }}
                    >
                      <Typography variant="h4" sx={{ textAlign: "center" }}>
                        Brands
                      </Typography>

                      <Typography>Name*:</Typography>
                      <TextField
                        sx={{ mt: "10px" }}
                        required
                        id="name"
                        name="name"
                        autoComplete="off"
                        {...register("name", { required: true })}
                        error={errors.name}
                      />
                      {errors.name && (
                        <span className="formError">Name is required</span>
                      )}

                      <Box sx={{ mt: "20px" }}>
                        <Typography sx={{ mb: "10px" }}>
                          Short Description:
                        </Typography>
                        <CKEditor
                          editor={ClassicEditor}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            setckeditor({ data });
                          }}
                        />
                      </Box>

                      <Box sx={{ mt: "20px" }}>
                        <Typography sx={{ mb: "10px" }}>
                          Description:
                        </Typography>
                        <CKEditor
                          editor={ClassicEditor}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            setEditor({ data });
                          }}
                        />
                      </Box>

                      <Typography sx={{ mt: "10px" }}>Logo:</Typography>
                      <TextField
                        style={{ margin: "10px 0px" }}
                        inputProps={{
                          style: { fontSize: 14 },
                          accept: "image/*",
                        }}
                        fullWidth
                        type="file"
                        id="imageFile"
                        name="imageFile"
                        autoComplete="off"
                        // onChange={(e) => onSelectFile(e)}
                        {...register("imageFile", { required: true })}
                        error={errors.imageFile}
                      />
                      {errors?.imageFile?.type === "required" && (
                        <span className="formError">File is required</span>
                      )}

                      <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        type="submit"
                      >
                        Submit
                      </Button>
                    </Box>
                  </Container>
                </ThemeProvider>
              ) : (
                <>
                  {brandaddress === 1 ? (
                    <ThemeProvider theme={theme}>
                      <Container
                        component="main"
                        maxWidth="sm"
                        sx={{
                          my: { xs: 5, md: 6, lg: 5 },
                          p: { xs: 2, md: 1 },
                        }}
                      >
                        <CssBaseline />
                        <Box
                          component="form"
                          onSubmit={handleSubmit(addresssubmitHandler)}
                          sx={{
                            display: "flex",
                            width: "100%",
                            flexDirection: "column",
                            alignItems: "left",
                            borderRadius: "2px",
                            p: 5,
                            border: "1px solid black",
                          }}
                        >
                          <Typography variant="h4" sx={{ textAlign: "center" }}>
                            Brands
                          </Typography>

                          <Typography>Brand</Typography>
                          <FormControl fullWidth sx={{ mt: 1 }}>
                            <Select
                              id="standard-simple-select"
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

                          <Typography sx={{ mt: "10px" }}>
                            Last Name*
                          </Typography>
                          <TextField
                            sx={{ mt: "10px" }}
                            required
                            id="lastname"
                            name="lastname"
                            autoComplete="off"
                            {...register("lastname", { required: true })}
                            error={errors.lastname}
                          />
                          {errors.lastname && (
                            <span className="formError">
                              Last Name is required
                            </span>
                          )}

                          <Typography sx={{ mt: "10px" }}>
                            First Name*
                          </Typography>
                          <TextField
                            sx={{ mt: "10px" }}
                            required
                            id="firstname"
                            name="firstname"
                            autoComplete="off"
                            {...register("firstname", { required: true })}
                            error={errors.firstname}
                          />
                          {errors.firstname && (
                            <span className="formError">
                              First Name is required
                            </span>
                          )}

                          <Typography sx={{ mt: "10px" }}>Address*</Typography>
                          <TextField
                            sx={{ mt: "10px" }}
                            required
                            id="address"
                            name="address"
                            autoComplete="off"
                            {...register("address", { required: true })}
                            error={errors.address}
                          />
                          {errors.address && (
                            <span className="formError">
                              Address is required
                            </span>
                          )}

                          <Typography sx={{ mt: "10px" }}>Address2</Typography>
                          <TextField
                            sx={{ mt: "10px" }}
                            required
                            id="address2"
                            name="address2"
                            autoComplete="off"
                            {...register("address2", { required: true })}
                            error={errors.address2}
                          />
                          {errors.address2 && (
                            <span className="formError">
                              Address is required
                            </span>
                          )}

                          <Typography sx={{ mt: "10px" }}>
                            Zip/Postal code
                          </Typography>
                          <TextField
                            sx={{ mt: "10px" }}
                            required
                            id="zip"
                            name="zip"
                            autoComplete="off"
                            {...register("zip", { required: true })}
                            error={errors.zip}
                          />
                          {errors.zip && (
                            <span className="formError">
                              Zip/Postal code is required
                            </span>
                          )}

                          <Typography sx={{ mt: "10px" }}>City*</Typography>
                          <TextField
                            sx={{ mt: "10px" }}
                            required
                            id="city"
                            name="city"
                            autoComplete="off"
                            {...register("city", { required: true })}
                            error={errors.city}
                          />
                          {errors.city && (
                            <span className="formError">City is required</span>
                          )}

                          <Typography sx={{ mt: "10px" }}>Country*</Typography>
                          <TextField
                            sx={{ mt: "10px" }}
                            required
                            id="country"
                            name="country"
                            autoComplete="off"
                            {...register("country", { required: true })}
                            error={errors.country}
                          />
                          {errors.country && (
                            <span className="formError">
                              Country is required
                            </span>
                          )}

                          <Typography sx={{ mt: "10px" }}>DNI</Typography>
                          <TextField
                            sx={{ mt: "10px" }}
                            required
                            id="dni"
                            name="dni"
                            autoComplete="off"
                            {...register("dni", { required: true })}
                            error={errors.dni}
                          />
                          {errors.dni && (
                            <span className="formError">DNI is required</span>
                          )}

                          <Typography sx={{ mt: "10px" }}>Phone</Typography>
                          <TextField
                            sx={{ mt: "10px" }}
                            required
                            id="phone"
                            name="phone"
                            autoComplete="off"
                            {...register("phone", { required: true })}
                            error={errors.phone}
                          />
                          {errors.phone && (
                            <span className="formError">Phone is required</span>
                          )}

                          <Typography sx={{ mt: "10px" }}>
                            Mobile phone
                          </Typography>
                          <TextField
                            sx={{ mt: "10px" }}
                            required
                            id="mobile"
                            name="mobile"
                            autoComplete="off"
                            {...register("mobile", { required: true })}
                            error={errors.mobile}
                          />
                          {errors.mobile && (
                            <span className="formError">
                              Mobile phone is required
                            </span>
                          )}

                          <Typography sx={{ mt: "10px" }}>Other</Typography>
                          <TextField
                            sx={{ mt: "10px" }}
                            required
                            id="other"
                            name="other"
                            autoComplete="off"
                            {...register("other", { required: true })}
                            error={errors.other}
                          />

                          <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            type="submit"
                          >
                            Save
                          </Button>
                        </Box>
                      </Container>
                    </ThemeProvider>
                  ) : (
                    <>
                      <Typography
                        sx={{
                          mt: "20px",
                          fontSize: "18px",
                          fontWeight: "bold",
                        }}
                      >
                        Brands
                      </Typography>
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
                          ".css-o8hwua-MuiDataGrid-root .MuiDataGrid-cellContent":
                            {
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
                        }}
                      >
                        <DataGrid
                          sx={{
                            boxShadow: 10,
                            borderRadius: 0,
                            m: 2,
                          }}
                          columns={columns}
                          rows={brandLists ? brandLists : ""}
                          getRowId={(rows) => rows._id}
                          VerticalAlignment="Center"
                          rowHeight={64}
                          pagination
                        />
                      </Box>

                      <Typography
                        sx={{
                          mt: "20px",
                          fontSize: "18px",
                          fontWeight: "bold",
                        }}
                      >
                        Brands Address Values
                      </Typography>
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
                          ".css-o8hwua-MuiDataGrid-root .MuiDataGrid-cellContent":
                            {
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
                        }}
                      >
                        <DataGrid
                          sx={{
                            boxShadow: 10,
                            borderRadius: 0,
                            m: 2,
                          }}
                          columns={brandcolumns}
                          rows={brandAddLists ? brandAddLists : ""}
                          getRowId={(rows) => rows._id}
                          VerticalAlignment="Center"
                          rowHeight={64}
                          pagination
                        />
                      </Box>
                    </>
                  )}
                </>
              )}
            </Box>
          )}
          {brand === 1 && (
            <Box>
              <Box>
                {supplier === 1 ? (
                  <Typography>
                    <LocalShippingIcon />
                    Suppliers
                  </Typography>
                ) : (
                  <>
                    <Typography>Supplier</Typography>
                  </>
                )}
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      <Dialog
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
            image={newImg}
          />
        </Box>
      </Dialog>
    </>
  );
}

export default BrandScreen;
