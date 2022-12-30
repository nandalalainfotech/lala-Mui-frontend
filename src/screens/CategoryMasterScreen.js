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
// import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { CategoryMasterallLists, deleteCategegoryMasterlist } from '../actions/categoryMasterAction';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import { CATEGORY_MASTER_DEL_RESET } from '../constants/categoryMasterConstant';
import { Switch, } from '@material-ui/core';
import VisibilityIcon from '@mui/icons-material/Visibility';
// import Avatar from "@mui/material/Avatar";
export default function CategoryMasterScreen() {
  const CategoryMasterallList = useSelector((state) => state.CategoryMasterallList);
  const { categorymasterallList,loading } = CategoryMasterallList;
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
  // const handleClickOpen = (e) => {
  //   setNewimg(e.target.src);
  //   setOpen(true);
  // };
  const columns = [
    {
      field: '_id',
      headerName: 'ID',
      dataKey: "serial",
      renderCell: (params) => {
        return (
          params.id)

      },
      flex: 1
    },
    // {
    //   field: "imageFile",
    //   headerName: "Images",
    //   flex: 1,
    //   headerClassName: "super-app-theme--header",
    //   renderCell: (params) => {
    //     return (
    //       <Avatar
    //         // onClick={handleClickOpen}
    //         sx={{ height: "50px", width: "50px", cursor: "pointer" }}
    //         src={`/api/brand/show/${params.row.coverimg}`}
    //         alt={params.row.coverimg}
    //       />
    //     );
    //   },
    // },
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
      renderCell: (params) => {
        if (params.row.checked == true) {
          return (<Switch checked />)
        } else {
          return (<Switch />)
        }
      }
    },
    {
      field: 'parent',
      headerName: 'View ',
      renderCell: () => (
        <>
          <VisibilityIcon />
        </>
      ),
      type: 'number',
      flex: 1,
      editable: true,
    },
    {
      field: "View",
      headerName: "Actions",
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
      <Box sx={{
        height: 560,
        width: "100%",
      }}>
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
          loading={loading}
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


