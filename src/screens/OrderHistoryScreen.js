import { deepPurple } from "@material-ui/core/colors";
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import Box from "@mui/material/Box";
import { alpha, styled } from "@mui/material/styles";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { listOrderMine } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import CircularProgress from '@mui/material/CircularProgress';

export default function OrderHistoryScreen(props) {

  const [pageSize, setPageSize] = useState(10);

 const navigate = useNavigate();
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);

  const detailHandler = (order) => {
    navigate(`/order/${order.row._id}`);
  };

  function getDate(orders) {
    return `${orders.row.createdAt.substring(0, 10) || ''}`;
  }

  function getTotal(orders) {
    return `${orders.row.totalPrice.toFixed(2) || ''}`;
  }

  function getPaid(orders) {
    return `${orders.row.isPaid ? orders.row.paidAt.substring(0, 10) : "No" || ''}`;
  }

  function getDelivered(orders) {
    return `${orders.row.isDelivered ? orders.row.deliveredAt.substring(0, 10): "No" || ''}`;
  }



  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "createdAt",
      headerName: "DATE",
      flex: 1,
      headerClassName: "super-app-theme--header",
      valueGetter: getDate,
    },
    {
      field: "totalPrice",
      headerName: "TOTAL",
      flex: 1,
      headerClassName: "super-app-theme--header",
      valueGetter: getTotal,
    },
    {
      field: "isPaid",
      headerName: "PAID",
      flex: 1,
      headerClassName: "super-app-theme--header",
      valueGetter: getPaid,
    },
    {
      field: "isDelivered",
      headerName: "DELIVERED",
      flex: 1,
      headerClassName: "super-app-theme--header",
      valueGetter: getDelivered,
    },
    {
      field: "actions",
      headerName: "ACTIONS",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (orders) => (
        <>
          <ContentPasteSearchIcon
            onClick={() => detailHandler(orders)}
            style={{ color: deepPurple[500], fontSize: 15, margin:30, cursor: "pointer" }}
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
      <h1>Order History</h1>
      {loading ? (
        <CircularProgress></CircularProgress>
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
            rows={orders}
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