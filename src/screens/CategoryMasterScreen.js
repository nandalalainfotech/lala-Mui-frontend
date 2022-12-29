import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// import SettingsIcon from '@mui/icons-material/Settings';
import { DataGrid } from '@mui/x-data-grid';
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useNavigate } from "../../node_modules/react-router-dom/dist/index";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { CategoryMasterallLists, deleteCategegoryMasterlist } from '../actions/categoryMasterAction';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import { CATEGORY_MASTER_DEL_RESET } from '../constants/categoryMasterConstant';

export default function CategoryMasterScreen() {
  const CategoryMasterallList = useSelector((state) => state.CategoryMasterallList);
  const { categorymasterallList } = CategoryMasterallList;
  const CategoryMasterDelete = useSelector((state) => state.CategoryMasterDelete);
  const {
    //   loading: loadingDelete,
    //   error: errorDelete,
    success: successDelete,
  } = CategoryMasterDelete;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [view, setView] = useState();
  const submitHandler = () => {
    navigate("/categoryFormmaster");
  }

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: CATEGORY_MASTER_DEL_RESET });
    }
    dispatch(CategoryMasterallLists())
  }, [dispatch, successDelete])

  const editHandler = (id) => {
    navigate(`/categorymaster/` + id);
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteCategegoryMasterlist(id));
    }
  };
  let CategoryMasterId = 1;
  function getCategoryMasterId() {
  let CategoryMasterIds = CategoryMasterId++
   return CategoryMasterIds
  }
  const columns = [
    { field: '_id', headerName: 'ID', valueGetter: getCategoryMasterId, flex: 1, },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      editable: true,
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
      editable: true,
    },
    {
      field: 'checked',
      headerName: 'Displayed',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <>
          <ZoomInIcon
            onClick={() => setView(params)}

            style={{
              // color: deepPurple[500],
              fontSize: 15,
              margin: 20,
              cursor: "pointer",
            }}
          />
        </>
      ),
    },
    {
      field: 'parent',
      headerName: 'Actions ',
      type: 'number',
      flex: 1,
      editable: true,
    },
    {
      field: "actions",
      headerName: "ACTIONS",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (

        <>
          <EditIcon
            onClick={() => editHandler(params.row._id)}
            style={{
              // color: deepPurple[500],
              fontSize: 15,
              margin: 20,
              cursor: "pointer",
            }}
          />

          <DeleteIcon
            onClick={() => deleteHandler(params.row._id)}
            style={{ fontSize: 15, cursor: "pointer" }}
          />
        </>
      ),
    },
  ];
  return (
    <Box>
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
      <Box sx={{ height: 500, width: '100%' ,mt:5 }}>
        {/* <Box component="div" sx={{ p: 2, display: 'flex', flexDirection: 'row', backgroundColor: '#fff' }} >
          <Typography component="h1" variant="h5">
            Categories
          </Typography>
          <Box component="div" sx={{ marginLeft: "auto" }}>
            <SettingsIcon />
          </Box>
        </Box> */}
        <DataGrid
          sx={{
            boxShadow: 10,
            borderRadius: 0,
            m: 2,
          }}
          columns={columns}
          rows={categorymasterallList ? categorymasterallList : ''}
          getRowId={(rows) => rows._id}
          VerticalAlignment="Center"
          rowHeight={64}
          //   pageSize={pageSize}
          //   onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          checkboxSelection
        />
      </Box>
    </Box>
  )
}


