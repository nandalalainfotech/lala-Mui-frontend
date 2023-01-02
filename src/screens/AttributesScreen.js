import { Tab, Tabs } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
// import { DataGridPro } from '@mui/x-data-grid-pro';
import { useEffect, useState } from "react";
// import Card from "@mui/material/Card";
import SearchIcon from "@mui/icons-material/Search";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { event } from "jquery";
import { ColorPicker } from "material-ui-color";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { MenuItem } from "../../node_modules/@material-ui/core/index";
import {
  AttributeCategory,
  AttributeMasterListDetails,
  AttributeValueListDetails,
  createAttributeVlaue,
  deleteAttribute,
  deleteAttributevalue,
  deletefeature,
  deletefeaturevalue,
  FeaturesCategory,
  FeaturesMasterListDetails,
  FeaturesValueCategory,
  FeaturesValueListDetails,
  updateAttribute,
  updateAttributeValue,
  updatefeature,
  updatefeatureValue,
} from "../actions/AttributeActions";
// import { useDemoData } from '@mui/x-data-grid-generator';
import { deepPurple, red } from "@material-ui/core/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import {
  ATTRIBUTE_DELETE_RESET,
  ATTRIBUTE_UPDATE_RESET,
  ATTRIBUTE_VALUE_DELETE_RESET,
  ATTRIBUTE_VALUE_UPDATE_RESET,
  FEATURES_DELETE_RESET,
  FEATURES_UPDATE_RESET,
  FEATURES_VALUE_DELETE_RESET,
  FEATURES_VALUE_UPDATE_RESET,
} from "../constants/AttributesConstants";
import CardMedia from "@mui/material/CardMedia";

function AttributesScreen() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    register: register1,
    handleSubmit: handleSubmit1,
    formState: { errors: errors1 },
  } = useForm();
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

  const {
    // register: register4,
    handleSubmit: handleSubmit4,
    // formState: { errors: errors4 },
  } = useForm();
  const dispatch = useDispatch();
  const [tabIndex, setTabIndex] = useState(0);
  const [tabIndexback, setTabIndexBack] = useState(0);
  const [Attribute, setAttribute] = useState(0);
  const [AttributeValue, setAttributeValue] = useState(0);
  const [attributestype, setAttributestype] = useState("");
  const [AttributeVlaue, setAttributeVlaue] = useState("");

  const [color, setColor] = useState(false);
  const [viewitem, setView] = useState();
  const [feautureview, setFeatureView] = useState();

  const [features, setFeatures] = useState(0);
  const [featuresValue, setFeaturesValue] = useState(0);
  const [featurestype, setFeaturestype] = useState("");
  // ************************Attribut Edit Section******************************************
  const [Attributedit, setAttributeEdit] = useState("");
  const [attributupdte, setAttriupdate] = useState("");
  const [attributupdtename, setAttriNameupdate] = useState("");

  const [Attributeditvalue, setAttributeeditValue] = useState("");
  const [AtteditType, setAttValueType] = useState("");
  const [AttEditvalue, setEditValue] = useState("");

  // *****************************Feature Edit Section*******************************************

  const [Featureedit, setFeatureEdit] = useState("");
  const [FeatureeditName, setFeatureNameEdit] = useState("");

  const [Featureeditvalue, setFeatureValueEdit] = useState("");
  const [FeatureeditvalueType, setFeaturestypeValueEdit] = useState("");
  const [FeaturEditvalue, setEditFeatureValue] = useState("");
  // const [backSpace, setBackSpace] = useState("");

  // console.log("tabIndex========>>>", backSpace);
  // *****************************Feature Edit Section End*******************************************
  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
    setAttribute(0);
    setFeatures(0);
    setAttributeValue(0);
    setFeaturesValue(0);
    setView(0);
    setFeatureView(0);
    setAttributeEdit(0);
    setAttributeeditValue(0);
    setFeatureEdit(0);
    setFeatureValueEdit(0);
    setTabIndexBack(0);
  };
  const attributeMasterList = useSelector((state) => state.attributeMasterList);
  const { attributeMasterdetails } = attributeMasterList;

  const AttributeValueList = useSelector((state) => state.AttributeValueList);
  const { attributeValuedetails } = AttributeValueList;

  const FeaturesList = useSelector((state) => state.FeaturesList);
  const { Featuresdetails } = FeaturesList;

  const FeaturesValueList = useSelector((state) => state.FeaturesValueList);
  const { Featuresvaluedetails } = FeaturesValueList;

  const attributeUpdate = useSelector((state) => state.attributeUpdate);
  const { success: successUpdate } = attributeUpdate;

  const attributeDelete = useSelector((state) => state.attributeDelete);
  const { success: successDelete } = attributeDelete;

  const attributeValueUpdate = useSelector(
    (state) => state.attributeValueUpdate
  );
  const { success: successvalueUpdate } = attributeValueUpdate;

  const attributeValueDelete = useSelector(
    (state) => state.attributeValueDelete
  );
  const { success: successvalueDelete } = attributeValueDelete;

  // *****************************Feature Edit Section*******************************************
  const feautureUpdate = useSelector((state) => state.feautureUpdate);
  const { success: successfeautureUpdate } = feautureUpdate;

  const featureDelete = useSelector((state) => state.featureDelete);
  const { success: successfeautureDelete } = featureDelete;

  const feautureValueUpdate = useSelector((state) => state.feautureValueUpdate);
  const { success: successfeauturevalueUpdate } = feautureValueUpdate;

  const featureValueDelete = useSelector((state) => state.featureValueDelete);
  const { success: successfeauturevalueDelete } = featureValueDelete;
  // *****************************Attribute Create Section*******************************************
  const createHandler = (e) => {
    dispatch(
      AttributeCategory({
        name: e.name,
        attributestype: attributestype,
      })
    );
    window.confirm("Attribute Saved Successfully!!");
    event.target.reset();
    setAttributestype("");
  };

  const createAttributeValue = (e) => {
    dispatch(
      createAttributeVlaue({
        value: e.value,
        attributeVlaue: AttributeVlaue,
        color: color.name,
        imageFile: e.imageFile,
      })
    );
    window.confirm("Attribute Value Saved Successfully!!");
    event.target.reset();
    setAttributeVlaue();
  };
  // *****************************Feature Create Section*******************************************
  const createFeature = (e) => {
    dispatch(
      FeaturesCategory({
        Featurename: e.fname,
      })
    );
    window.confirm("Features Saved Successfully!!");
    event.target.reset();
  };

  const createFeatureValue = (e) => {
    dispatch(
      FeaturesValueCategory({
        Featurevalue: e.fvalue,
        Featuretype: featurestype,
      })
    );
    window.confirm("Features Saved Successfully!!");
    event.target.reset();
    setFeaturestype();
  };

  const names = ["Dropdown List", "Radio Buttons", "Color or Texture"];

  // **********************************Attribute Edit Section *****************
  const editAttributeHandler = (attributeId) => {
    setAttributeEdit(attributeId);
    setAttriupdate(attributeId.attributetype);
    setAttriNameupdate(attributeId.attributename);
  };

  const editAttributeValueHandler = (valueId) => {
    setAttributeeditValue(valueId);
    setAttValueType(valueId.attributeVlaue);
    setEditValue(valueId.value);
    // setEditValueColor(valueId)
  };

  // *****************************Feature Edit Section*******************************************
  const editFeatureHandler = (FeatureId) => {
    setFeatureEdit(FeatureId);
    setFeatureNameEdit(FeatureId.featurename);
  };

  const editFeatureValueHandler = (FeaturevalueId) => {
    setFeatureValueEdit(FeaturevalueId);
    setFeaturestypeValueEdit(FeaturevalueId.featuretype);
    setEditFeatureValue(FeaturevalueId.featurevalue);
  };
  // *****************************Feature Edit Section End*******************************************

  // *****************************Attribute Update Section*******************************************
  const updatdHandler = () => {
    dispatch(
      updateAttribute({
        _id: Attributedit._id,
        attributename: attributupdtename,
        attributetype: attributupdte,
      })
    );
    window.confirm("Attribute Update Successfully!!");
    setAttributeEdit(0);
  };

  const UpdatEditValue = (e) => {
    dispatch(
      updateAttributeValue({
        _id: Attributeditvalue.id,
        atteditType: AtteditType,
        attEditvalue: AttEditvalue,
        imageFile: e.imageFile,
      })
    );
    window.confirm("Attribute Update Successfully!!");
    setAttributeeditValue(0);
  };

  const updateFeature = () => {
    dispatch(
      updatefeature({
        _id: Featureedit._id,
        featurename: FeatureeditName,
      })
    );
    window.confirm("Feature Update Successfully!!");
    setFeatureEdit(0);
  };

  const updateFeatureValue = () => {
    dispatch(
      updatefeatureValue({
        _id: Featureeditvalue.id,
        featuretype: FeatureeditvalueType,
        featurevalue: FeaturEditvalue,
      })
    );
    window.confirm("Feature Update Successfully!!");
    setFeatureValueEdit(0);
  };
  // *****************************Attribute delete Section*******************************************
  const deleteHandler = (attributed) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteAttribute(attributed.row._id));
    }
  };

  const deletevalueHandler = (attributedvalue) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteAttributevalue(attributedvalue.row.id));
    }
  };

  // *****************************Feature delete Section*******************************************
  const deleteFeatureHandler = (featureId) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deletefeature(featureId.row._id));
    }
  };

  const deleteFeaturevalueHandler = (featureIdvalue) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deletefeaturevalue(featureIdvalue.row.id));
    }
  };
  // *****************************Feature delete Section End*******************************************
  useEffect(() => {
    dispatch(FeaturesValueListDetails());
    dispatch(FeaturesMasterListDetails());
    dispatch(AttributeMasterListDetails());
    dispatch(AttributeValueListDetails());
    if (successUpdate) {
      dispatch({ type: ATTRIBUTE_UPDATE_RESET });
    }
    if (successDelete) {
      dispatch({ type: ATTRIBUTE_DELETE_RESET });
    }
    if (successvalueUpdate) {
      dispatch({ type: ATTRIBUTE_VALUE_UPDATE_RESET });
    }
    if (successvalueDelete) {
      dispatch({ type: ATTRIBUTE_VALUE_DELETE_RESET });
    }

    if (successfeautureUpdate) {
      dispatch({ type: FEATURES_UPDATE_RESET });
    }
    if (successfeautureDelete) {
      dispatch({ type: FEATURES_DELETE_RESET });
    }
    if (successfeauturevalueUpdate) {
      dispatch({ type: FEATURES_VALUE_UPDATE_RESET });
    }
    if (successfeauturevalueDelete) {
      dispatch({ type: FEATURES_VALUE_DELETE_RESET });
    }
  }, [
    dispatch,
    successUpdate,
    successDelete,
    successvalueUpdate,
    successfeautureUpdate,
    successfeautureDelete,
    successfeauturevalueUpdate,
  ]);
  const navigate = useNavigate();

  const backHandeler = () => {
    navigate(setTabIndexBack(2));
  };

  const theme = createTheme();

  function getsubCategoryId(attributeMasterdetails) {
    const attributeItem = attributeValuedetails
      ?.filter((item) => {
        return item.attributeVlaue === attributeMasterdetails.row._id;
      })
      .map((item) => {
        <Box key={item}></Box>;
        return {
          id: item._id,
          value: item.value,
          attributeVlaue: item.attributeVlaue,
          filename: item.filename,
        };
      });
    return attributeItem.length ? attributeItem.length : "";
  }

  var count = 1;
  function getnumId() {
    const numericId = count++;
    return numericId;
  }

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
      headerClassName: "super-app-theme--header",
      valueGetter: getnumId,
    },
    {
      field: "attributename",
      headerName: "Attribute Name",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "categoryId",
      headerName: "Values",
      flex: 1,
      headerClassName: "super-app-theme--header",
      valueGetter: getsubCategoryId,
    },
    {
      field: "attributetype",
      headerName: "Attribute Type",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "Edit",
      headerName: "Viwe",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        const attributeList = attributeValuedetails
          ?.filter((item) => {
            return item.attributeVlaue === params.row._id;
          })
          .map((item) => {
            <Box key={item}></Box>;
            return {
              id: item._id,
              value: item.value,
              attributeVlaue: item.attributeVlaue,
              filename: item.filename,
            };
          });
        if (attributeList.length === 0) {
          return (
            <ThemeProvider theme={theme}>
              <Chip icon={<SearchOffIcon />} label="View" />
            </ThemeProvider>
          );
        } else {
          return (
            <ThemeProvider theme={theme}>
              <Chip
                onClick={() => setView(params)}
                icon={<SearchIcon />}
                label="View"
              />
            </ThemeProvider>
          );
        }
      },
    },
    {
      field: "actions",
      headerName: "ACTIONS",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <>
          <EditIcon
            onClick={() => editAttributeHandler(params.row)}
            style={{
              color: deepPurple[500],
              fontSize: 15,
              margin: 20,
              cursor: "pointer",
            }}
          />

          <DeleteIcon
            onClick={() => deleteHandler(params)}
            style={{ color: red[500], fontSize: 15, cursor: "pointer" }}
          />
        </>
      ),
    },
  ];

  var count1 = 1;
  function getnumvalId() {
    const numericId = count1++;
    return numericId;
  }

  const valuecolumn = [
    {
      // field: "id",
      headerName: "ID",
      flex: 1,
      headerClassName: "super-app-theme--header",
      valueGetter: getnumvalId,
    },
    {
      field: "value",
      headerName: "Values",
      flex: 1,
      headerClassName: "super-app-theme--header",
      // valueGetter:getValue,
    },
    {
      field: "attributeVlaue",
      headerName: "Position",
      flex: 1,
      headerClassName: "super-app-theme--header",
      // valueGetter: getsubCategoryId,
    },
    {
      field: "filename",
      headerName: "Position",
      flex: 1,
      headerClassName: "super-app-theme--header",
      // valueGetter: getsubCategoryId,
    },
    {
      field: "vactions",
      headerName: "ACTIONS",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <>
          <EditIcon
            onClick={() => editAttributeValueHandler(params.row)}
            style={{
              color: deepPurple[500],
              fontSize: 15,
              margin: 20,
              cursor: "pointer",
            }}
          />

          <DeleteIcon
            onClick={() => deletevalueHandler(params)}
            style={{ color: red[500], fontSize: 15, cursor: "pointer" }}
          />
        </>
      ),
    },
  ];

  function getFeatureValue(Featuresdetails) {
    const FList = Featuresvaluedetails?.filter((item) => {
      return item.featuretype === Featuresdetails.row._id;
    }).map((item) => {
      <Box key={item}></Box>;
      return {
        id: item._id,
        featurevalue: item.featurevalue,
        featuretype: item.featuretype,
      };
    });

    return FList.length;
  }

  const featurecolumn = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
      headerClassName: "super-app-theme--header",
      valueGetter: getnumId,
    },
    {
      field: "featurename",
      headerName: "Feature Name",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "value",
      headerName: "Value",
      flex: 1,
      headerClassName: "super-app-theme--header",
      valueGetter: getFeatureValue,
    },
    {
      // field: "",
      headerName: "View",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        const FList = Featuresvaluedetails?.filter((item) => {
          return item.featuretype === params.row._id;
        }).map((item) => {
          <Box key={item}></Box>;
          return {
            id: item._id,
            featurevalue: item.featurevalue,
            featuretype: item.featuretype,
          };
        });
        if (FList.length === 0) {
          return (
            <ThemeProvider theme={theme}>
              <Chip icon={<SearchOffIcon />} label="View" />
            </ThemeProvider>
          );
        } else {
          return (
            <ThemeProvider theme={theme}>
              <Chip
                onClick={() => setFeatureView(params)}
                icon={<SearchIcon />}
                label="View"
              />
            </ThemeProvider>
          );
        }
      },
    },

    {
      field: "Factions",
      headerName: "ACTIONS",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <>
          <EditIcon
            onClick={() => editFeatureHandler(params.row)}
            style={{
              color: deepPurple[500],
              fontSize: 15,
              margin: 20,
              cursor: "pointer",
            }}
          />

          <DeleteIcon
            onClick={() => deleteFeatureHandler(params)}
            style={{ color: red[500], fontSize: 15, cursor: "pointer" }}
          />
        </>
      ),
    },
  ];

  const featurevaluecolumn = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      headerClassName: "super-app-theme--header",
      valueGetter: getnumId,
    },
    {
      field: "featurevalue",
      headerName: "Values",
      flex: 1,
      headerClassName: "super-app-theme--header",
      // valueGetter:getValue,
    },
    {
      field: "featuretype",
      headerName: "Feature Type",
      flex: 1,
      headerClassName: "super-app-theme--header",
      // valueGetter:getValue,
    },
    {
      field: "Fvactions",
      headerName: "ACTIONS",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <>
          <EditIcon
            onClick={() => editFeatureValueHandler(params.row)}
            style={{
              color: deepPurple[500],
              fontSize: 15,
              margin: 20,
              cursor: "pointer",
            }}
          />

          <DeleteIcon
            onClick={() => deleteFeaturevalueHandler(params)}
            style={{ color: red[500], fontSize: 15, cursor: "pointer" }}
          />
        </>
      ),
    },
  ];

  const assemList = attributeValuedetails
    ?.filter((item) => {
      return item.attributeVlaue === viewitem?.id;
    })
    .map((item) => {
      return {
        id: item._id,
        value: item.value,
        attributeVlaue: item.attributeVlaue,
        filename: item.filename,
      };
    });

  const FeautureList = Featuresvaluedetails?.filter((item) => {
    return item.featuretype === feautureview?.id;
  }).map((item) => {
    return {
      id: item._id,
      featurevalue: item.featurevalue,
      featuretype: item.featuretype,
    };
  });

  return (
    <Box>
      {tabIndex === 0 ? (
        <>
          {viewitem?.id ? (
            <Box sx={{ display: "flex", flexDerection: "row" }}>
              <Typography variant="h5">{viewitem.row.attributename}</Typography>
              <Box sx={{ ml: "auto" }}>
                <>
                  <Button
                    sx={{ mr: 3 }}
                    variant="contained"
                    type="Click"
                    onClick={() => setAttributeValue(2)}
                  >
                    Add New value
                  </Button>
                  <Button
                    sx={{
                      mr: 3,
                      border: "1px solid #6c868E",
                      color: "#6c868E",
                      "&:hover": { background: "#6c868E", color: "#fff" },
                    }}
                    type="Click"
                  >
                    Recommended Moudles and Service
                  </Button>
                  <Button
                    sx={{
                      border: "1px solid #6c868E",
                      color: "#6c868E",
                      "&:hover": { background: "#6c868E", color: "#fff" },
                    }}
                    type="Click"
                  >
                    Help
                  </Button>
                </>
              </Box>
            </Box>
          ) : (
            <>
              {AttributeValue === 2 ? (
                <>
                  <Box sx={{ display: "flex", flexDerection: "row" }}>
                    <Typography variant="h5">Add New Value</Typography>
                    <Box sx={{ ml: "auto" }}>
                      <>
                        <Button
                          sx={{
                            mr: 3,
                            border: "1px solid #6c868E",
                            color: "#6c868E",
                            "&:hover": { background: "#6c868E", color: "#fff" },
                          }}
                          type="Click"
                        >
                          Recommended Moudles and Service
                        </Button>
                        <Button
                          sx={{
                            border: "1px solid #6c868E",
                            color: "#6c868E",
                            "&:hover": { background: "#6c868E", color: "#fff" },
                          }}
                          type="Click"
                        >
                          Help
                        </Button>
                      </>
                    </Box>
                  </Box>
                </>
              ) : (
                <>
                  {Attribute === 0 ? (
                    <>
                      <Box sx={{ display: "flex", flexDerection: "row" }}>
                        <Typography variant="h5">Attributes</Typography>
                        <Box sx={{ ml: "auto" }}>
                          <>
                            <Button
                              variant="contained"
                              sx={{ mr: 3 }}
                              onClick={() => setAttribute(1)}
                            >
                              Add New Attribute
                            </Button>
                            <Button
                              sx={{ mr: 3 }}
                              variant="contained"
                              type="Click"
                              onClick={() => setAttributeValue(2)}
                            >
                              Add New value
                            </Button>
                            <Button
                              sx={{
                                mr: 3,
                                border: "1px solid #6c868E",
                                color: "#6c868E",
                                "&:hover": {
                                  background: "#6c868E",
                                  color: "#fff",
                                },
                              }}
                              type="Click"
                            >
                              Recommended Moudles and Service
                            </Button>
                            <Button
                              sx={{
                                border: "1px solid #6c868E",
                                color: "#6c868E",
                                "&:hover": {
                                  background: "#6c868E",
                                  color: "#fff",
                                },
                              }}
                              type="Click"
                            >
                              Help
                            </Button>
                          </>
                        </Box>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Box sx={{ display: "flex", flexDerection: "row" }}>
                        <Typography variant="h5">Add New Attribute</Typography>
                        <Box sx={{ ml: "auto" }}>
                          <>
                            <Button
                              sx={{
                                mr: 3,
                                border: "1px solid #6c868E",
                                color: "#6c868E",
                                "&:hover": {
                                  background: "#6c868E",
                                  color: "#fff",
                                },
                              }}
                              type="Click"
                            >
                              Recommended Moudles and Service
                            </Button>
                            <Button
                              sx={{
                                border: "1px solid #6c868E",
                                color: "#6c868E",
                                "&:hover": {
                                  background: "#6c868E",
                                  color: "#fff",
                                },
                              }}
                              type="Click"
                            >
                              Help
                            </Button>
                          </>
                        </Box>
                      </Box>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </>
      ) : (
        <>
          {featuresValue === 2 ? (
            <Box sx={{ display: "flex", flexDerection: "row" }}>
              <Typography variant="h5">Add New Feature</Typography>
              <Box sx={{ ml: "auto" }}>
                <Button
                  sx={{
                    mr: 3,
                    border: "1px solid #6c868E",
                    color: "#6c868E",
                    "&:hover": { background: "#6c868E", color: "#fff" },
                  }}
                  type="Click"
                >
                  Recommended Moudles and Service
                </Button>
                <Button
                  sx={{
                    border: "1px solid #6c868E",
                    color: "#6c868E",
                    "&:hover": { background: "#6c868E", color: "#fff" },
                  }}
                  type="Click"
                >
                  Help
                </Button>
              </Box>
            </Box>
          ) : (
            <>
              {feautureview?.id ? (
                <Box sx={{ display: "flex", flexDerection: "row" }}>
                  <Typography variant="h5">
                    {feautureview.row.featurename}
                  </Typography>
                  <Box sx={{ ml: "auto" }}>
                    <Button
                      sx={{ mr: 3 }}
                      variant="contained"
                      onClick={() => setFeaturesValue(2)}
                    >
                      Add New value
                    </Button>
                    <Button
                      sx={{
                        mr: 3,
                        border: "1px solid #6c868E",
                        color: "#6c868E",
                        "&:hover": { background: "#6c868E", color: "#fff" },
                      }}
                      type="Click"
                    >
                      Recommended Moudles and Service
                    </Button>
                    <Button
                      sx={{
                        border: "1px solid #6c868E",
                        color: "#6c868E",
                        "&:hover": { background: "#6c868E", color: "#fff" },
                      }}
                      type="Click"
                    >
                      Help
                    </Button>
                  </Box>
                </Box>
              ) : (
                <>
                  {features === 1 ? (
                    <Box sx={{ display: "flex", flexDerection: "row" }}>
                      <Typography variant="h5">Add New Feature</Typography>
                      <Box sx={{ ml: "auto" }}>
                        <Button
                          sx={{
                            mr: 3,
                            border: "1px solid #6c868E",
                            color: "#6c868E",
                            "&:hover": { background: "#6c868E", color: "#fff" },
                          }}
                          type="Click"
                        >
                          Recommended Moudles and Service
                        </Button>
                        <Button
                          sx={{
                            border: "1px solid #6c868E",
                            color: "#6c868E",
                            "&:hover": { background: "#6c868E", color: "#fff" },
                          }}
                          type="Click"
                        >
                          Help
                        </Button>
                      </Box>
                    </Box>
                  ) : (
                    <Box sx={{ display: "flex", flexDerection: "row" }}>
                      <Typography variant="h5">Features</Typography>
                      <Box sx={{ ml: "auto" }}>
                        <Button
                          variant="contained"
                          sx={{ mr: 3 }}
                          onClick={() => setFeatures(1)}
                        >
                          Add New Features
                        </Button>
                        <Button
                          sx={{ mr: 3 }}
                          variant="contained"
                          onClick={() => setFeaturesValue(2)}
                        >
                          Add New value
                        </Button>
                        <Button
                          sx={{
                            mr: 3,
                            border: "1px solid #6c868E",
                            color: "#6c868E",
                            "&:hover": { background: "#6c868E", color: "#fff" },
                          }}
                          type="Click"
                        >
                          Recommended Moudles and Service
                        </Button>
                        <Button
                          sx={{
                            border: "1px solid #6c868E",
                            color: "#6c868E",
                            "&:hover": { background: "#6c868E", color: "#fff" },
                          }}
                          type="Click"
                        >
                          Help
                        </Button>
                      </Box>
                    </Box>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
      <Box>
        <Divider
          fullWidth
          sx={{ backgroundColor: "#000000", mt: 3 }}
          showlabels="true"
        />
      </Box>
      <Box>
        <Tabs
          value={tabIndex}
          textColor="secondary"
          indicatorColor="secondary"
          // centered
          onChange={handleTabChange}
        >
          <Tab label="Attributes" />
          <Tab label="Features" />
        </Tabs>
      </Box>
      <Box>
        {tabIndex === 0 && (
          <>
            {/* {tabIndexback === 2 ?(
            <h1> Hi Naresh</h1>
          ):( */}
            {tabIndexback === 2 ? (
              <>
                <Box style={{ height: 560, width: "100%" }}>
                  <DataGrid
                    sx={{
                      boxShadow: 10,
                      borderRadius: 0,
                      m: 2,
                    }}
                    columns={columns}
                    rows={attributeMasterdetails ? attributeMasterdetails : ""}
                    getRowId={(rows) => rows._id}
                    VerticalAlignment="Center"
                    rowHeight={64}
                    pageSize={5}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                  />
                </Box>
              </>
            ) : (
              <>
                {Attributedit._id ? (
                  <Box>
                    <ThemeProvider theme={theme}>
                      <Container
                        component="main"
                        maxWidth="sm"
                        sx={{
                          my: { xs: 3, md: 6, lg: 10 },
                          p: { xs: 2, md: 1 },
                        }}
                      >
                        <CssBaseline />

                        <Box
                          component="form"
                          onSubmit={handleSubmit4(updatdHandler)}
                          sx={{
                            display: "flex",
                            width: "80%",
                            flexDirection: "column",
                            alignItems: "center",
                            margin: "0px 10%",
                            borderRadius: "5px",
                          }}
                        >
                          <Typography variant="h5" sx={{ textAlign: "center" }}>
                            {" "}
                            Update Attributes
                          </Typography>
                          <TextField
                            size="small"
                            margin="normal"
                            fullWidth
                            id="categoryTittel"
                            label="Name"
                            name="attributupdtename"
                            value={attributupdtename}
                            autoComplete="off"
                            onChange={(e) => setAttriNameupdate(e.target.value)}
                          />

                          <FormControl fullWidth sx={{ mt: 1 }}>
                            <InputLabel>Attributes Type</InputLabel>
                            <Select
                              id="standard-simple-select"
                              value={attributupdte}
                              label="Attributes Type"
                              onChange={(e) => setAttriupdate(e.target.value)}
                            >
                              {names.map((name) => (
                                <MenuItem key={name} value={name}>
                                  {name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>

                          <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            type="submit"
                          >
                            Update
                          </Button>
                        </Box>
                      </Container>
                    </ThemeProvider>
                  </Box>
                ) : (
                  <>
                    {Attribute === 1 ? (
                      <Box>
                        <ThemeProvider theme={theme}>
                          <Container
                            component="main"
                            maxWidth="sm"
                            sx={{
                              my: { xs: 3, md: 6, lg: 10 },
                              p: { xs: 2, md: 1 },
                            }}
                          >
                            <CssBaseline />

                            <Box
                              component="form"
                              onSubmit={handleSubmit(createHandler)}
                              sx={{
                                display: "flex",
                                width: "80%",
                                flexDirection: "column",
                                alignItems: "center",
                                margin: "0px 10%",
                                borderRadius: "5px",
                              }}
                            >
                              <Typography
                                variant="h5"
                                sx={{ textAlign: "center" }}
                              >
                                {" "}
                                Create Attributes
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

                              <FormControl fullWidth sx={{ mt: 1 }}>
                                <InputLabel>Attributes Type</InputLabel>
                                <Select
                                  id="standard-simple-select"
                                  value={attributestype}
                                  label="Attributes Type"
                                  onChange={(e) =>
                                    setAttributestype(e.target.value)
                                  }
                                >
                                  {names.map((name) => (
                                    <MenuItem key={name} value={name}>
                                      {name}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                              <Box sx={{ display: "flex" }}>
                                <Button
                                  variant="contained"
                                  sx={{ mt: 3, mb: 2, ml: 4 }}
                                  type="submit"
                                >
                                  Create
                                </Button>
                              </Box>
                            </Box>
                            <Button
                              variant="contained"
                              sx={{ mr: 4,position:"absolute" }}
                              type="Click"
                              onClick={backHandeler}
                            >
                              Cancel
                            </Button>
                          </Container>
                        </ThemeProvider>
                      </Box>
                    ) : (
                      <>
                        {Attributeditvalue.id ? (
                          <Box>
                            <ThemeProvider theme={theme}>
                              <Container
                                component="main"
                                maxWidth="sm"
                                sx={{
                                  my: { xs: 3, md: 6, lg: 10 },
                                  p: { xs: 2, md: 1 },
                                }}
                              >
                                <CssBaseline />

                                <Box
                                  component="form"
                                  onSubmit={handleSubmit1(UpdatEditValue)}
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
                                  <Typography
                                    variant="h5"
                                    sx={{ textAlign: "center" }}
                                  >
                                    {" "}
                                    Create Attributes Value
                                  </Typography>
                                  <FormControl fullWidth sx={{ mt: 1 }}>
                                    <InputLabel>Attributes Type</InputLabel>
                                    <Select
                                      id="standard-simple-select"
                                      value={AtteditType}
                                      label="Attributes Type"
                                      onChange={(e) =>
                                        setAttValueType(e.target.value)
                                      }
                                    >
                                      {attributeMasterdetails.map((detail) => (
                                        <MenuItem
                                          key={detail._id}
                                          value={detail._id}
                                        >
                                          {detail.attributename}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                  <TextField
                                    size="small"
                                    margin="normal"
                                    fullWidth
                                    id="value"
                                    label="Value"
                                    name="value"
                                    autoComplete="off"
                                    value={AttEditvalue}
                                    onChange={(e) =>
                                      setEditValue(e.target.value)
                                    }
                                  />

                                  <ColorPicker
                                    defaultValue="transparent"
                                    id="ColorPic"
                                    name="ColorPic"
                                    value={color}
                                    onChange={setColor}
                                  />

                                  <Typography variant="h6">Texture</Typography>
                                  <TextField
                                    style={{ margin: "10px 0px" }}
                                    inputProps={{
                                      style: { fontSize: 14 },
                                      accept: "image/*",
                                    }}
                                    size="small"
                                    fullWidth
                                    type="file"
                                    id="imageFile"
                                    name="imageFile"
                                    autoComplete="off"
                                    // onChange={(e) => onSelectFile(e)}
                                    {...register1("imageFile", {
                                      required: true,
                                    })}
                                    error={errors1.imageFile}
                                  />

                                  <CardMedia
                                    component="img"
                                    height="125"
                                    sx={{
                                      border: "1px solid black",
                                      width: "25%",
                                    }}
                                    image={`/api/AttributeValue/view/${Attributeditvalue?.filename}`}
                                    alt={Attributeditvalue.filename}
                                  />

                                  <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    type="submit"
                                  >
                                    Update
                                  </Button>
                                </Box>
                              </Container>
                            </ThemeProvider>
                          </Box>
                        ) : (
                          <>
                            {AttributeValue === 2 ? (
                              <Box>
                                <ThemeProvider theme={theme}>
                                  <Container
                                    component="main"
                                    maxWidth="sm"
                                    sx={{
                                      my: { xs: 3, md: 6, lg: 10 },
                                      p: { xs: 2, md: 1 },
                                    }}
                                  >
                                    <CssBaseline />

                                    <Box
                                      component="form"
                                      onSubmit={handleSubmit1(
                                        createAttributeValue
                                      )}
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
                                      <Typography
                                        variant="h5"
                                        sx={{ textAlign: "center" }}
                                      >
                                        {" "}
                                        Create Attributes Value
                                      </Typography>
                                      <FormControl fullWidth sx={{ mt: 1 }}>
                                        <InputLabel>Attributes Type</InputLabel>
                                        <Select
                                          id="standard-simple-select"
                                          value={AttributeVlaue}
                                          label="Attributes Type"
                                          onChange={(e) =>
                                            setAttributeVlaue(e.target.value)
                                          }
                                        >
                                          {attributeMasterdetails.map(
                                            (detail) => (
                                              <MenuItem
                                                key={detail._id}
                                                value={detail._id}
                                              >
                                                {detail.attributename}
                                              </MenuItem>
                                            )
                                          )}
                                        </Select>
                                      </FormControl>
                                      <TextField
                                        size="small"
                                        margin="normal"
                                        fullWidth
                                        id="value"
                                        label="Value"
                                        name="value"
                                        autoComplete="off"
                                        {...register1("value", {
                                          required: true,
                                        })}
                                        error={errors1.value}
                                      />
                                      {errors1.value && (
                                        <span className="formError">
                                          value is required
                                        </span>
                                      )}
                                      <ColorPicker
                                        defaultValue="transparent"
                                        id="ColorPic"
                                        name="ColorPic"
                                        value={color}
                                        onChange={setColor}
                                      />
                                      {errors1.ColorPic && (
                                        <span className="formError">
                                          ColorPic is required
                                        </span>
                                      )}
                                      <Typography variant="h6">
                                        Texture
                                      </Typography>
                                      <TextField
                                        style={{ margin: "10px 0px" }}
                                        inputProps={{
                                          style: { fontSize: 14 },
                                          accept: "image/*",
                                        }}
                                        size="small"
                                        fullWidth
                                        type="file"
                                        id="imageFile"
                                        name="imageFile"
                                        autoComplete="off"
                                        // onChange={(e) => onSelectFile(e)}
                                        {...register1("imageFile", {
                                          required: true,
                                        })}
                                        error={errors1.imageFile}
                                      />
                                      {errors1?.imageFile?.type ===
                                        "required" && (
                                        <span className="formError">
                                          File is required
                                        </span>
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
                              </Box>
                            ) : (
                              <>
                                <>
                                  {viewitem?.id ? (
                                    <Box style={{ height: 560, width: "100%" }}>
                                      <DataGrid
                                        sx={{
                                          boxShadow: 10,
                                          borderRadius: 0,
                                          m: 2,
                                        }}
                                        columns={valuecolumn}
                                        rows={assemList}
                                        getRowId={(rows) => rows.id}
                                        pageSize={5}
                                        rowsPerPageOptions={[5]}
                                        checkboxSelection
                                      />
                                      <Button
                                        sx={{ mr: 3 }}
                                        variant="contained"
                                        type="Click"
                                        onClick={backHandeler}
                                      >
                                        Back
                                      </Button>
                                    </Box>
                                  ) : (
                                    <>
                                      <Box
                                        style={{ height: 560, width: "100%" }}
                                      >
                                        <DataGrid
                                          sx={{
                                            boxShadow: 10,
                                            borderRadius: 0,
                                            m: 2,
                                          }}
                                          columns={columns}
                                          rows={
                                            attributeMasterdetails
                                              ? attributeMasterdetails
                                              : ""
                                          }
                                          getRowId={(rows) => rows._id}
                                          VerticalAlignment="Center"
                                          rowHeight={64}
                                          pageSize={5}
                                          rowsPerPageOptions={[10]}
                                          checkboxSelection
                                        />
                                      </Box>
                                    </>
                                  )}
                                </>
                              </>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
      </Box>

      <Box>
        {tabIndex === 1 && (
          <>
            {Featureedit._id ? (
              <Box>
                <ThemeProvider theme={theme}>
                  <Container
                    component="main"
                    maxWidth="sm"
                    sx={{ my: { xs: 3, md: 6, lg: 10 }, p: { xs: 2, md: 1 } }}
                  >
                    <CssBaseline />

                    <Box
                      onSubmit={handleSubmit2(updateFeature)}
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
                        Update Features
                      </Typography>
                      <TextField
                        size="small"
                        margin="normal"
                        fullWidth
                        id="fname"
                        label="Name"
                        name="fname"
                        autoComplete="off"
                        value={FeatureeditName}
                        onChange={(e) => setFeatureNameEdit(e.target.value)}
                      />

                      <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        type="submit"
                      >
                        Update
                      </Button>
                    </Box>
                  </Container>
                </ThemeProvider>
              </Box>
            ) : (
              <>
                {Featureeditvalue?.id ? (
                  <Box>
                    <ThemeProvider theme={theme}>
                      <Container
                        component="main"
                        maxWidth="sm"
                        sx={{
                          my: { xs: 3, md: 6, lg: 10 },
                          p: { xs: 2, md: 1 },
                        }}
                      >
                        <CssBaseline />

                        <Box
                          onSubmit={handleSubmit3(updateFeatureValue)}
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
                            Update Features Type
                          </Typography>
                          <FormControl fullWidth sx={{ mt: 1 }}>
                            <InputLabel>Feature Type</InputLabel>
                            <Select
                              id="standard-simple-select"
                              value={FeatureeditvalueType}
                              label="Attributes Type"
                              onChange={(e) =>
                                setFeaturestypeValueEdit(e.target.value)
                              }
                            >
                              {Featuresdetails.map((Feature) => (
                                <MenuItem key={Feature._id} value={Feature._id}>
                                  {Feature.featurename}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>

                          <TextField
                            size="small"
                            margin="normal"
                            fullWidth
                            id="fvalue"
                            label="Value"
                            name="fvalue"
                            autoComplete="off"
                            value={FeaturEditvalue}
                            onChange={(e) =>
                              setEditFeatureValue(e.target.value)
                            }
                          />

                          <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            type="submit"
                          >
                            Update
                          </Button>
                        </Box>
                      </Container>
                    </ThemeProvider>
                  </Box>
                ) : (
                  <>
                    {features === 1 ? (
                      <Box>
                        <ThemeProvider theme={theme}>
                          <Container
                            component="main"
                            maxWidth="sm"
                            sx={{
                              my: { xs: 3, md: 6, lg: 10 },
                              p: { xs: 2, md: 1 },
                            }}
                          >
                            <CssBaseline />

                            <Box
                              onSubmit={handleSubmit2(createFeature)}
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
                              <Typography
                                variant="h5"
                                sx={{ textAlign: "center" }}
                              >
                                {" "}
                                Create Features
                              </Typography>
                              <TextField
                                size="small"
                                margin="normal"
                                fullWidth
                                id="fname"
                                label="Name"
                                name="fname"
                                autoComplete="off"
                                {...register2("fname", { required: true })}
                                error={errors2.fname}
                              />
                              {errors2.name && (
                                <span className="formError">
                                  Name is required
                                </span>
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
                      </Box>
                    ) : (
                      <>
                        {featuresValue === 2 ? (
                          <Box>
                            <ThemeProvider theme={theme}>
                              <Container
                                component="main"
                                maxWidth="sm"
                                sx={{
                                  my: { xs: 3, md: 6, lg: 10 },
                                  p: { xs: 2, md: 1 },
                                }}
                              >
                                <CssBaseline />

                                <Box
                                  onSubmit={handleSubmit3(createFeatureValue)}
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
                                  <Typography
                                    variant="h5"
                                    sx={{ textAlign: "center" }}
                                  >
                                    {" "}
                                    Create Features Type
                                  </Typography>
                                  <FormControl fullWidth sx={{ mt: 1 }}>
                                    <InputLabel>Feature Type</InputLabel>
                                    <Select
                                      id="standard-simple-select"
                                      value={featurestype}
                                      label="Attributes Type"
                                      onChange={(e) =>
                                        setFeaturestype(e.target.value)
                                      }
                                    >
                                      {Featuresdetails.map((Feature) => (
                                        <MenuItem
                                          key={Feature._id}
                                          value={Feature._id}
                                        >
                                          {Feature.featurename}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>

                                  <TextField
                                    size="small"
                                    margin="normal"
                                    fullWidth
                                    id="fvalue"
                                    label="Value"
                                    name="fvalue"
                                    autoComplete="off"
                                    {...register3("fvalue", { required: true })}
                                    error={errors3.fvalue}
                                  />
                                  {errors3.name && (
                                    <span className="formError">
                                      Value is required
                                    </span>
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
                          </Box>
                        ) : (
                          <>
                            {feautureview?.id ? (
                              <Box style={{ height: 400, width: "100%" }}>
                                <DataGrid
                                  sx={{
                                    boxShadow: 10,
                                    borderRadius: 0,
                                    m: 2,
                                  }}
                                  columns={featurevaluecolumn}
                                  rows={FeautureList}
                                  getRowId={(rows) => rows.id}
                                  pageSize={5}
                                  rowsPerPageOptions={[5]}
                                  checkboxSelection
                                />
                              </Box>
                            ) : (
                              <Box style={{ height: 400, width: "100%" }}>
                                <DataGrid
                                  sx={{
                                    boxShadow: 10,
                                    borderRadius: 0,
                                    m: 2,
                                  }}
                                  columns={featurecolumn}
                                  rows={Featuresdetails ? Featuresdetails : ""}
                                  getRowId={(rows) => rows._id}
                                  pageSize={5}
                                  rowsPerPageOptions={[5]}
                                  checkboxSelection
                                />
                              </Box>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}

export default AttributesScreen;
