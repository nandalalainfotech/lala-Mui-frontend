import Axios from "axios";
import {
  BRAND_ADDRESS_FAIL,
  BRAND_ADDRESS_REQUEST,
  BRAND_ADDRESS_SUCCESS,
  BRAND_FAIL,
  BRAND_REQUEST,
  BRAND_SUCCESS,
} from "../constants/brandConstant";

export const saveBrand = (brand) => async (dispatch, getState) => {
  console.log("brand", brand);
  const fd = new FormData();
  fd.append("image", brand.imageFile[0]);
  fd.append("name", brand.name);
  fd.append("editor", brand.editor.data);
  fd.append("ckeditor", brand.ckeditor.data);
  dispatch({ type: BRAND_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post("/api/brand", fd, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({
      type: BRAND_SUCCESS,
      payload: data.appsetting,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: BRAND_FAIL, payload: message });
  }
};

export const brandList = () => async (dispatch) => {
  dispatch({
    type: BRAND_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/brand/allbrand`);
    dispatch({ type: BRAND_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: BRAND_FAIL, payload: error.message });
  }
};

export const saveAddress = (address) => async (dispatch, getState) => {
  dispatch({ type: BRAND_ADDRESS_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post("/api/brandaddress", address, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    console.log("data", data);
    dispatch({
      type: BRAND_ADDRESS_SUCCESS,
      payload: data.appsetting,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: BRAND_ADDRESS_FAIL, payload: message });
  }
};

export const brandAddressList = () => async (dispatch) => {
  dispatch({
    type: BRAND_ADDRESS_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/brandaddress/brandaddresslist`);
    dispatch({ type: BRAND_ADDRESS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: BRAND_ADDRESS_FAIL, payload: error.message });
  }
};
