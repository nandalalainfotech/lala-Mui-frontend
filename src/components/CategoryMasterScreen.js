import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SettingsIcon from '@mui/icons-material/Settings';
import { DataGrid } from '@mui/x-data-grid';
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useNavigate } from "../../node_modules/react-router-dom/dist/index";
const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'firstName',
        headerName: 'Name',
        width: 150,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: 'Description',
        width: 150,
        editable: true,
    },
    {
        field: 'age',
        headerName: 'Position ',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'fullName',
        headerName: 'Displayed',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
        field: 'age',
        headerName: 'Actions ',
        type: 'number',
        width: 110,
        editable: true,
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function CategoryMasterScreen() {
    const navigate = useNavigate();
    const submitHandler = () => {
        navigate("/categoryFormmaster");
    }
    return (
        <Box sx={{ backgroundColor: '#eaebec' }}>
            <Box component="div" sx={{ p: 2, display: 'flex', flexDirection: 'row', backgroundColor: '#fff' }} >
                <Typography component="h1" variant="h5">
                    Categories
                </Typography>
                <Box sx={{ ml: 'auto' }}>
                    <Button variant="contained" sx={{ mr: 3, backgroundColor: '#21a6c1' }} onClick={submitHandler}><AddCircleOutlineIcon /> Add New Category</Button>
                    <Button variant="outlined" >Help</Button>
                </Box>
            </Box>
            <Divider />
            <Box sx={{ height: 400, width: '100%' }}>
                <Box component="div" sx={{ p: 2, display: 'flex', flexDirection: 'row', backgroundColor: '#fff' }} >
                    <Typography component="h1" variant="h5">
                        Categories
                    </Typography>
                    <Box component="div" sx={{ marginLeft: "auto" }}>
                        <SettingsIcon />
                    </Box>
                </Box>
                <DataGrid
                    rowReordering
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                />
            </Box>
        </Box>
    )
}


