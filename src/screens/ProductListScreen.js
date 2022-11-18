import { deepPurple, red } from "@material-ui/core/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import { alpha, styled } from "@mui/material/styles";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { deleteProduct, listProducts } from "../actions/productAction";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET, PRODUCT_DETAILS_RESET, PRODUCT_UPDATE_RESET } from "../constants/productConstants";


export default function ProductListScreen() {
  const navigate = useNavigate();
  const { pageNumber = 1 } = useParams();
  const { pathname } = useLocation();
  const sellerMode = pathname.indexOf("/seller") >= 0;
  const productList = useSelector((state) => state.productList);

  const [pageSize, setPageSize] = useState(10);

  const { loading, error, products } = productList;

  const productDetails = useSelector((state) => state.productDetails);
  const { product } = productDetails;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;
  const productUpdate = useSelector((state) => state.productUpdate);
  const { success: successUpdate } = productUpdate;
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
    }
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
    }
    if (product) {
      dispatch({ type: PRODUCT_DETAILS_RESET });
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(
      listProducts({ seller: sellerMode ? userInfo._id : "", pageNumber })
    );
  }, [
    createdProduct,
    dispatch,
    navigate,
    sellerMode,
    successCreate,
    successUpdate,
    successDelete,
    userInfo._id,
    pageNumber,
    product,
  ]);

  const deleteHandler = (product) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteProduct(product.row._id));
    }
  };

  const createHandler = () => {
    navigate(`/products/new`);
  };


  const editHandler = (product) => {
    navigate(`/product/${product.row._id}/edit`);
  };

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "name",
      headerName: "NAME",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "price",
      headerName: "PRICE",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "category",
      headerName: "CATEGORY",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "categorygroup",
      headerName: "CATEGORY GROUP",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "brand",
      headerName: "BRAND",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "actions",
      headerName: "ACTIONS",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (products) => (
        <>
          <EditIcon
            onClick={() => editHandler(products)}
            style={{ color: deepPurple[500], fontSize: 15, margin:20, cursor: "pointer" }}
          />

          <DeleteIcon
            onClick={() => deleteHandler(products)}
            style={{ color: red[500], fontSize: 15, cursor: "pointer"}}
          />
        </>
      ),
    },
  ];

  const ODD_OPACITY = 0.2;

  const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: theme.palette.grey[200],
      "&:hover, &.Mui-hovered": {
        backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
        "@media (hover: none)": {
          backgroundColor: "transparent",
        },
      },
      "&.Mui-selected": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY + theme.palette.action.selectedOpacity
        ),
        "&:hover, &.Mui-hovered": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY +
              theme.palette.action.selectedOpacity +
              theme.palette.action.hoverOpacity
          ),
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            backgroundColor: alpha(
              theme.palette.primary.main,
              ODD_OPACITY + theme.palette.action.selectedOpacity
            ),
          },
        },
      },
    },
  }));

  return (
    <div>
      <div>
        <h1 >Products</h1>
        <Button  variant="contained" onClick={createHandler}>Create Product</Button>
      </div>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
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
        >
          <StripedDataGrid
            sx={{
              boxShadow: 10,
              borderRadius: 0,
              m: 2,
            }}
            columns={columns}
            rows={products}
            getRowId={(rows) => rows._id}
            VerticalAlignment="Center"
            rowHeight={34}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
            }
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
          />
        </Box>
      )}
    </div>
  );
}
