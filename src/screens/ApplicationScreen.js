/* eslint-disable no-unused-vars */
import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { saveApplicationSetting } from "../actions/applicationAction";
import Axios from 'axios';
import { useSelector } from "react-redux";

function ApplicationScreen() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const theme = createTheme();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  
  const [bodyFormData, setbodyFormData] = useState("")

  const dispatch = useDispatch();

  // const onSelectFile = async (e) => {
  //   const file = e.target.files[0];
  //   setImageFile(file);
  // };

  const submitHandler = async (e) => {
    console.log("e", e);
    dispatch(
      saveApplicationSetting({
        name: e.name,
        imageFile: e.imageFile
      })
    ); 
    
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="sm"
        sx={{ my: { xs: 3, md: 6, lg: 10 }, p: { xs: 2, md: 1 } }}
      >
        <CssBaseline />
        <Box
          component="form"
          onSubmit={handleSubmit(submitHandler)}
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "0px",
            p: 5,
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
        >
          <Typography variant="h4">Application Setting</Typography>

          <TextField
            inputProps={{ style: { fontSize: 14 } }}
            size="small"
            margin="normal"
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="off"
            onChange={(e) => setName(e.target.value)}
            {...register("name", { required: true })}
            error={errors.name}
          />
          {errors.name && <span className="formError">Name is required</span>}

          <TextField
            style={{ margin: "10px 0px" }}
            inputProps={{ style: { fontSize: 14 }, accept: "image/*" }}
            size="small"
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
            Upload
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default ApplicationScreen;
