import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
// import Select from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
// import MenuItem from "@mui/material/MenuItem";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useDispatch, useSelector } from "react-redux";
import { FormControl, Switch, } from '@material-ui/core';
import { CategoryMasterallLists, createCategoryMaster, updatecategoryMaster } from '../actions/categoryMasterAction';
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import CardMedia from '@mui/material/CardMedia';
// import Radio from '@mui/material/Radio';
// import FormLabel from '@mui/material/FormLabel';
// import { getMuiTheme } from "../styles/Styles";
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

export default function CategoryMasterFormScreen() {

    const CategoryMasterallList = useSelector((state) => state.CategoryMasterallList);
    const { categorymasterallList } = CategoryMasterallList;
    console.log("categorymasterallList-------->>>", categorymasterallList)

    const params = useParams();
    const categoryMasterId = params.id;

    const categoryObj = categorymasterallList?.find((item) => (item._id === categoryMasterId))
    // console.log("categorymasterallList--categoryObj123----------->>>>", categoryObj);
    const { handleSubmit, register, formState: { errors },
    } = useForm();
    // eslint-disable-next-line no-unused-vars
    const [name, setName] = useState(categoryObj?.name);
    // eslint-disable-next-line no-unused-vars
    const [checked, setchecked] = useState(categoryObj?.checked);
    // eslint-disable-next-line no-unused-vars
    const [parent, setParent] = useState(categoryObj?.parent);
    // eslint-disable-next-line no-unused-vars
    const [description, setDescription] = useState(categoryObj?.description);
    // eslint-disable-next-line no-unused-vars
    const [coverimg, setcoverimg] = useState(categoryObj?.coverimg);
    // eslint-disable-next-line no-unused-vars
    // const [catThumbnail, setcatThumbnail] = useState('');
    // eslint-disable-next-line no-unused-vars
    // const [menuThumbnail, setmenuThumbnail] = useState('');
    // const [image, setimage] = useState('');
    const dispatch = useDispatch();
    const theme = createTheme();
    const createHandler = (e) => {
        console.log("e------------", e)
        if (categoryObj) {
            dispatch(
                updatecategoryMaster({
                    id: categoryObj?._id,
                    name: name,
                    checked: checked,
                    parent: parent,
                    description: description,
                    coverimg: coverimg,
                    // catThumbnail: e.catThumbnail,
                    // menuThumbnail: e.menuThumbnail
                }))
            window.confirm("Category Updated Successfully!!");
            event.target.reset()
        } else {
            dispatch(
                createCategoryMaster({
                    name: e.name,
                    checked: e.checked,
                    parent: e.parent ? e.parent : parent,
                    description: e.description,
                    coverimg: e.coverimg,
                    // catThumbnail: e.catThumbnail,
                    // menuThumbnail: e.menuThumbnail
                })
            );
            window.confirm("New Category Added Successfully!!");
            event.target.reset()
        }
    };

    const switchHandler = (event) => {
        setchecked(!event.target.checked);
    };

    function handleChange(e) {
        setcoverimg(e.target.files);
    }

    const useStyles = makeStyles(() => ({
        label: {
            "& .css-1hv8oq8-MuiStepLabel-label.Mui-active": { fontSize: "14px" },
            "& .css-1hv8oq8-MuiStepLabel-label.Mui-disabled": { fontSize: "14px" },
            "& .Mui-disabled .MuiStepIcon-root": { fontSize: "30px" },
            "& .Mui-active .MuiStepIcon-root": { fontSize: "30px" },
            "& .css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-completed": {
                fontSize: "30px",
                color: "green",
            },
            "& .css-1hv8oq8-MuiStepLabel-label.Mui-completed": { fontSize: "14px" },
        },
        cssLabel: {
            "&.css-1pysi21-MuiFormLabel-root-MuiInputLabel-root": {
                fontSize: "14px",
            },
            "& .css-1pysi21-MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
                fontSize: "14px",
            },
        },
        cssFocused: {
            "& .css-1pysi21-MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
                fontSize: "14px",
            },
        },
        selected: {
            bgcolor: 'red',
            color: "white"
        }
    }));

    const classes = useStyles();
    useEffect(() => {
        dispatch(CategoryMasterallLists());

    }, [dispatch])

    const renderTree = (nodes) => (
        <TreeItem key={nodes._id} nodeId={nodes._id} label={nodes.name} >
            {Array.isArray(nodes.children)
                ? nodes.children.map((node) => renderTree(node))
                : null}
        </TreeItem>
    );
    const handleSelectedItems = (event, nodeId) => {
        console.log("treeeeeviewww======nodeId=>>>>>>", nodeId);
        setParent(nodeId)
    }
    return (
        <Box sx={{ backgroundColor: '#fff' }}>
            {categoryMasterId ? <>
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
                                    Category Update
                                </Typography>
                                <TextField
                                    size="small"
                                    margin="normal"
                                    fullWidth
                                    id="categoryTittel"
                                    label="Name"
                                    name="name"
                                    autoComplete="off"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                {errors.name && (
                                    <span className="formError">
                                        Name is required
                                    </span>
                                )}

                                <InputLabel> Displayed</InputLabel>
                                <Switch onChange={(e) => setchecked(e.target.checked)} checked={checked} />
                                <InputLabel sx={{ mb: 1 }}> Parent category</InputLabel>
                                <TreeView
                                    aria-label="rich object"
                                    defaultCollapseIcon={<ExpandMoreIcon />}
                                    defaultExpanded={['root']}
                                    defaultExpandIcon={<ChevronRightIcon />}
                                    // onChange={(nodeId) => setParent(nodeId)}
                                    onNodeSelect={handleSelectedItems}
                                    sx={{
                                        border: '1px solid black', p: 3,
                                        ".MuiTreeItem-root": {
                                            ".Mui-focused:not(.Mui-selected)": classes.focused,
                                            ".Mui-selected, .Mui-focused.Mui-selected, .Mui-selected:hover":
                                                classes.selected,
                                        }
                                    }}
                                >
                                    {categorymasterallList?.map((item) => renderTree(item))}
                                </TreeView>

                                <InputLabel sx={{ mt: 1 }}>Description</InputLabel>
                                <TextareaAutosize
                                    minRows={5}
                                    placeholder="Type in here..."
                                    id="comment"
                                    style={{ width: "100%" }}
                                    name="description"
                                    value={description}
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
                                    onChange={handleChange}

                                />
                                <CardMedia
                                    component="img"
                                    height="125"
                                    sx={{ border: "1px solid black", width: "25%" }}
                                    image={`/api/categorymaster/show/${categoryObj?.coverimg}`}
                                    alt={categoryObj?.coverimg}
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
            </> :
                <Box>
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
                                    <FormControl fullWidth sx={{ mt: 1 }}>
                                        <TextField
                                            InputLabelProps={{
                                                classes: {
                                                    root: classes.cssLabel,
                                                    focused: classes.cssFocused,
                                                },
                                            }}
                                            size="small"
                                            margin="normal"
                                            fullWidth
                                            id="categoryTittel"
                                            label="Name"
                                            name="name"
                                            autoComplete="off"
                                            onChange={(e) => setName(e.target.value)}
                                            inputProps={register("name")}
                                            // {...register("name", { required: true })}
                                            error={errors.name}
                                        />
                                    </FormControl>
                                    {errors.name && (
                                        <span className="formError">
                                            Name is required
                                        </span>
                                    )}

                                    <InputLabel> Displayed</InputLabel>
                                    <Switch onChange={switchHandler} {...register("checked")} />
                                    {/* <span >{checked===true?"yes":"No"}</span> */}

                                    <InputLabel sx={{ mb: 1 }}> Parent category</InputLabel>
                                    <TreeView
                                        aria-label="rich object"
                                        defaultCollapseIcon={<ExpandMoreIcon />}
                                        defaultExpanded={['root']}
                                        defaultExpandIcon={<ChevronRightIcon />}
                                        // onChange={(nodeId) => setParent(nodeId)}
                                        onNodeSelect={handleSelectedItems}
                                        sx={{
                                            border: '1px solid black', p: 3,
                                            ".MuiTreeItem-root": {
                                                ".Mui-focused:not(.Mui-selected)": classes.focused,
                                                ".Mui-selected, .Mui-focused.Mui-selected, .Mui-selected:hover":
                                                    classes.selected,

                                            }
                                        }}
                                    >
                                        {categorymasterallList?.map((item) => renderTree(item))}
                                    </TreeView>


                                    <InputLabel sx={{ mt: 1 }}>Description</InputLabel>

                                    <TextareaAutosize
                                        minRows={5}
                                        placeholder="Type in here..."
                                        id="comment"
                                        style={{ width: "100%" }}
                                        name="description"
                                        // value={comment}    
                                        onChange={(e) => setDescription(e.target.value)}
                                        {...register("description")}
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
                </Box>
            }
        </Box>

    )
}

