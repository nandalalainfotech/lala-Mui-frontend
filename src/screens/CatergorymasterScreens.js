import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { useForm } from "react-hook-form";
import {
  CategoryChildListDetails,
  categoryMasterListDetails,
  createCategorymaster,
  createChildCategory,
  createSubCategory,
  subCategoryListDetails,
} from "../actions/categoryAction";
import { useDispatch, useSelector } from "react-redux";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MenuItem } from "../../node_modules/@material-ui/core/index";

export default function CatergorymasterScreens() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
  } = useForm();
  const {
    register: register3,
    handleSubmit: handleSubmit3,
    formState: { errors: errors3 },
  } = useForm();

  const categoryMasterList = useSelector((state) => state.categoryMasterList);
  const { categoryMasterdetails } = categoryMasterList;
  console.log(
    "categoryMasterdetails==================>>6666660",
    categoryMasterdetails
  );

  const subCategoryList = useSelector((state) => state.subCategoryList);
  const { subCategory } = subCategoryList;

  console.log("subCategory===============>>>", subCategory);

  const [categorysubname, setCategoryname] = useState("");
  const [subCategorygroup, setsubCategorygroup] = useState("");
  const [categorychildname, setChildCategoryname] = useState("");

  const createHandler = (e) => {
    dispatch(
      createCategorymaster({
        categoryTittel: e.categoryTittel,
        categoryName: e.categoryName,
        categorystatus: e.categorystatus,
      })
    );
    window.confirm("Category Saved Successfully!!");
    event.target.reset();
  };

  const createSubHandler = (e) => {
    dispatch(
      createSubCategory({
        categoryname: categorysubname,
        categorygroup: e.categorygroup,
        subcategorystatus: e.subcategorystatus,
      })
    );
    window.confirm("Category Saved Successfully!!");
    event.target.reset();
  };
  const createSubChildHandler = (e) => {
    dispatch(
      createChildCategory({
        categorygorup: subCategorygroup,
        categorytype: e.categorytype,
        subchildcategorystatus: e.subcategorystatus,
      })
    );
    window.confirm("Category Saved Successfully!!");
    event.target.reset();
  };
  const theme = createTheme();
  useEffect(() => {
    dispatch(categoryMasterListDetails());
    dispatch(subCategoryListDetails());
    dispatch(CategoryChildListDetails());
  }, [dispatch]);
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container
          component="main"
          maxWidth="sm"
          sx={{ my: { xs: 3, md: 6, lg: 10 }, p: { xs: 2, md: 1 } }}
        >
          <CssBaseline />

          <Box
            onSubmit={handleSubmit(createHandler)}
            component="form"
            sx={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "0px",
              p: 5,
              border: "1px solid #000000",
            }}
          >
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              {" "}
              Create Categories
            </Typography>
            <TextField
              size="small"
              margin="normal"
              fullWidth
              id="categoryTittel"
              label="Category Tittel"
              name="categoryTittel"
              autoComplete="off"
              {...register("categoryTittel", { required: true })}
              error={errors.categoryTittel}
            />
            {errors.categoryTittel && (
              <span className="formError">Category Tittel is required</span>
            )}
            <TextField
              inputProps={{ style: { fontSize: 14 } }}
              size="small"
              margin="normal"
              fullWidth
              id="categoryName"
              label="Category Name"
              name="categoryName"
              autoComplete="off"
              {...register("categoryName", { required: true })}
              error={errors.categoryName}
            />
            {errors.categoryName && (
              <span className="formError">Category Name is required</span>
            )}
            <TextField
              inputProps={{ style: { fontSize: 14 } }}
              size="small"
              margin="normal"
              fullWidth
              id="categorystatus"
              label="status"
              name="categorystatus"
              autoComplete="off"
              {...register("categorystatus", { required: true })}
              error={errors.categorystatus}
            />
            {errors.categorystatus && (
              <span className="formError">status is required</span>
            )}

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              type="submit"
            >
              Create
            </Button>
          </Box>
        </Container>
      </ThemeProvider>

      <ThemeProvider theme={theme}>
        <Container
          component="main"
          maxWidth="sm"
          sx={{ my: { xs: 3, md: 6, lg: 10 }, p: { xs: 2, md: 1 } }}
        >
          <CssBaseline />

          <Box
            onSubmit={handleSubmit2(createSubHandler)}
            component="form"
            sx={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "0px",
              p: 5,
              border: "1px solid #000000",
            }}
          >
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              {" "}
              Create Sub Categories
            </Typography>
            <FormControl fullWidth sx={{ mt: 1 }}>
              <InputLabel>Category Name</InputLabel>
              <Select
                id="standard-simple-select"
                value={categorysubname}
                label="Category Name"
                onChange={(e) => setCategoryname(e.target.value)}
              >
                {categoryMasterdetails?.map((item, index) => (
                  <MenuItem key={index} value={item.categoryname}>
                    {item.categoryname}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              inputProps={{ style: { fontSize: 14 } }}
              size="small"
              margin="normal"
              fullWidth
              id="categorygroup"
              label="Category group"
              name="categorygroup"
              autoComplete="off"
              {...register2("categorygroup", { required: true })}
              error={errors2.categorygroup}
            />
            {errors.categorygroup && (
              <span className="formError">Category group is required</span>
            )}
            <TextField
              inputProps={{ style: { fontSize: 14 } }}
              size="small"
              margin="normal"
              fullWidth
              id="subcategorystatus"
              label="status"
              name="subcategorystatus"
              autoComplete="off"
              {...register2("subcategorystatus", { required: true })}
              error={errors2.subcategorystatus}
            />
            {errors2.subcategorystatus && (
              <span className="formError">status is required</span>
            )}

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              type="submit"
            >
              Create
            </Button>
          </Box>
        </Container>
      </ThemeProvider>
      <ThemeProvider theme={theme}>
        <Container
          component="main"
          maxWidth="sm"
          sx={{ my: { xs: 3, md: 6, lg: 10 }, p: { xs: 2, md: 1 } }}
        >
          <CssBaseline />

          <Box
            onSubmit={handleSubmit3(createSubChildHandler)}
            component="form"
            sx={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "0px",
              p: 5,
              border: "1px solid #000000",
            }}
          >
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              {" "}
              Create Sub child Categories
            </Typography>
            <FormControl fullWidth sx={{ mt: 1 }}>
              <InputLabel>Category Name</InputLabel>
              <Select
                id="standard-simple-select"
                value={categorychildname}
                label="Category Name"
                onChange={(e) => setChildCategoryname(e.target.value)}
              >
                {subCategory?.map((item, index) => (
                  console.log("subCategory",subCategory),
                  <MenuItem key={index} value={item.categoryname}>
                    {item.categoryname}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mt: 1 }}>
              <InputLabel>Category Group</InputLabel>
              <Select
                id="standard-simple-select"
                value={subCategorygroup}
                label="Category Group"
                onChange={(e) => setsubCategorygroup(e.target.value)}
              >
                {subCategory?.filter((item) => {
                      return item.categorysubname === categorychildname;
                    }).map((item, index) => (
                  <MenuItem key={index} value={item.subcategorygroup}>
                    {item.subcategorygroup}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              inputProps={{ style: { fontSize: 14 } }}
              size="small"
              margin="normal"
              fullWidth
              id="categorytype"
              label="Category Type"
              name="categorytype"
              autoComplete="off"
              {...register3("categorytype", { required: true })}
              error={errors3.categorytype}
            />
            {errors.categorytype && (
              <span className="formError">Category text is required</span>
            )}
            <TextField
              inputProps={{ style: { fontSize: 14 } }}
              size="small"
              margin="normal"
              fullWidth
              id="subcategorystatus"
              label="status"
              name="subcategorystatus"
              autoComplete="off"
              {...register3("subcategorystatus", { required: true })}
              error={errors3.subcategorystatus}
            />
            {errors3.subcategorystatus && (
              <span className="formError">status is required</span>
            )}

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              type="submit"
            >
              Create
            </Button>
          </Box>
        </Container>
      </ThemeProvider>
      <Box
        sx={{
          height: 460,
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
        }}
      ></Box>
    </>
  );
}
