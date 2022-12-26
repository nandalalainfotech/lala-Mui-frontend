import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { MenuItem } from "../../node_modules/@material-ui/core/index";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
export default function CategoryMasterFormScreen() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const theme = createTheme();
    const createHandler = () => {
        // dispatch(
        //   createCategorymaster({
        //     categoryTittel: e.categoryTittel,
        //     categoryName: e.categoryName,
        //     categorystatus: e.categorystatus,
        //   })
        // );
        // window.confirm("Category Saved Successfully!!");
        // event.target.reset();
    };
    return (
        <Box sx={{ backgroundColor: '#eaebec' }}>
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
                                {...register("name", { required: true })}
                                error={errors.name}
                            />
                            {errors.name && (
                                <span className="formError">
                                    Name is required
                                </span>
                            )}
                            <FormGroup>
                                <FormControlLabel label="Displayed" control={<Switch defaultChecked />} />
                            </FormGroup>
                            <FormControl fullWidth sx={{ mt: 1 }}>
                                <InputLabel> Parent category</InputLabel>
                                <Select
                                    id="standard-simple-select"
                                    value={''}
                                    label="Attributes Type"
                                //   onChange={(e) => setChildCategoryname(e.target.value)}
                                >
                                    <MenuItem value={1}>Dropdown List</MenuItem>
                                    <MenuItem value={2}>Radio Button</MenuItem>
                                    <MenuItem value={3}></MenuItem>
                                </Select>
                            </FormControl>
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
            <Box component="div" sx={{ p: 2, display: 'flex', flexDirection: 'row', backgroundColor: '#fff' }} >
                <Button variant="outlined" sx={{ mr: 'auto' }}>Cancel</Button>
                <Box sx={{ ml: 'auto' }}>
                    <Button variant="outlined" >Save</Button>
                </Box>
            </Box>
        </Box>
    )
}

