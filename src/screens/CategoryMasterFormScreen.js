import React, { useState } from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useDispatch } from "react-redux";
import { FormControl, Switch, } from '@material-ui/core';
import { createCategoryMaster } from '../actions/categoryMasterAction';
export default function CategoryMasterFormScreen() {
    const { register, handleSubmit, formState: { errors },
    } = useForm();
    // eslint-disable-next-line no-unused-vars
    const [name, setName] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [checked, setchecked] = useState(true);
    // eslint-disable-next-line no-unused-vars
    const [parent, setParent] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [description, setDescription] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [coverimg, setcoverimg] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [catThumbnail, setcatThumbnail] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [menuThumbnail, setmenuThumbnail] = useState('');
    const dispatch = useDispatch();
    const theme = createTheme();

    const createHandler = (e) => {
        dispatch(
            createCategoryMaster({
                name: e.name,
                checked: e.checked,
                parent: 'sample',
                description: e.description,
                coverimg: e.coverimg,
                catThumbnail: e.catThumbnail,
                menuThumbnail: e.menuThumbnail
            })
        );
        window.confirm("New Category Added Successfully!!");
        event.target.reset()
    };
    const switchHandler = (event) => {
        setchecked(!event.target.checked);
    };

    return (
        <Box sx={{ backgroundColor: '#fff' }}>
            <Box component="div" sx={{ p: 2, display: 'flex', flexDirection: 'row', backgroundColor: '#fff' }} >
                <Typography component="h1" variant="h5">
                    Add new
                </Typography>
                <Box sx={{ ml: 'auto' }}>
                    <Button variant="outlined" >Help</Button>
                </Box>
            </Box>
            <Divider />
            <Box>
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
                                Category
                            </Typography>
                            <TextField
                                size="small"
                                margin="normal"
                                fullWidth
                                id="categoryTittel"
                                label="Name"
                                name="name"
                                autoComplete="off"
                                onChange={(e) => setName(e.target.value)}
                                {...register("name", { required: true })}
                                error={errors.name}
                            />
                            {errors.name && (
                                <span className="formError">
                                    Name is required
                                </span>
                            )}

                            <InputLabel> Displayed</InputLabel>
                            <Switch onChange={switchHandler} {...register("checked")} />

                            <FormControl fullWidth sx={{ mt: 1 }}>
                                <InputLabel> Parent category</InputLabel>
                                <Select
                                    id="standard-simple-select"
                                    value={'men'}
                                    label="Attributes Type"
                                    onChange={(e) => setParent(e.target.value)}
                                >
                                    <MenuItem value={1}>Dropdown List</MenuItem>
                                    <MenuItem value={2}>Radio Button</MenuItem>
                                    <MenuItem value={3}></MenuItem>
                                </Select>
                            </FormControl>

                            <InputLabel sx={{ mt: 1 }}>Description</InputLabel>
                            <TextareaAutosize
                                minRows={5}
                                placeholder="Type in here..."
                                id="comment"
                                style={{ width: "100%" }}
                                name="description"
                                // value={comment}    
                                {...register("description")}
                                onChange={(e) => setDescription(e.target.value)}
                            />


                            <InputLabel sx={{ mt: 1 }}>Category cover image</InputLabel>
                            <TextField
                                style={{ margin: "10px 0px" }}
                                inputProps={{ style: { fontSize: 14 }, accept: "image/*" }}
                                size="small"
                                fullWidth
                                type="file"
                                id="imageFile"
                                name="coverimg"
                                autoComplete="off"
                                {...register("coverimg")}
                            />

                            <InputLabel >Category thumbnail</InputLabel>
                            <TextField
                                style={{ margin: "10px 0px" }}
                                inputProps={{ style: { fontSize: 14 }, accept: "image/*" }}
                                size="small"
                                fullWidth
                                type="file"
                                id="imageFile"
                                name="catThumbnail"
                                autoComplete="off"
                                {...register("catThumbnail")}
                            />

                            <InputLabel>Menu thumbnails</InputLabel>
                            <TextField
                                style={{ margin: "10px 0px" }}
                                inputProps={{ style: { fontSize: 14 }, accept: "image/*" }}
                                size="small"
                                fullWidth
                                type="file"
                                id="imageFile"
                                name="menuThumbnail"
                                autoComplete="off"
                                {...register("menuThumbnail")}
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
                    </Container>
                </ThemeProvider>
            </Box>
            {/* <Box component="div" sx={{ p: 2, display: 'flex', flexDirection: 'row', backgroundColor: '#fff' }} >
                <Button variant="outlined" sx={{ mr: 'auto' }}>Cancel</Button>
                <Box sx={{ ml: 'auto' }}>
                    <Button variant="outlined" >Save</Button>
                </Box>
            </Box> */}
        </Box>
    )
}

