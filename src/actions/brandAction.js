import Axios from "axios";
import {
  BRAND_ADDRESS_FAIL,
  BRAND_ADDRESS_REQUEST,
  BRAND_ADDRESS_SUCCESS,
  BRAND_ADDRESS_UPDATE_FAIL,
  BRAND_ADDRESS_UPDATE_REQUEST,
  BRAND_ADDRESS_UPDATE_SUCCESS,
  BRAND_DELETE_FAIL,
  BRAND_DELETE_REQUEST,
  BRAND_DELETE_SUCCESS,
  BRAND_FAIL,
  BRAND_REQUEST,
  BRAND_SUCCESS,
  BRAND_UPDATE_FAIL,
  BRAND_UPDATE_REQUEST,
  BRAND_UPDATE_SUCCESS,
} from "../constants/brandConstant";

export const saveBrand = (brand) => async (dispatch, getState) => {
  const fd = new FormData();
  fd.append("image", brand.imageFile[0]);
  fd.append("name", brand.name);
  fd.append("checked", brand.checked);
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

export const updateBrand = (brandUpdate) => async (dispatch, getState) => {
  console.log("updateBrand", updateBrand);
  const fd = new FormData();
  fd.append("image", brandUpdate.imageFile[0]);
  fd.append("name", brandUpdate.name);
  fd.append("editor", brandUpdate.editor);
  fd.append("ckeditor", brandUpdate.ckeditor);
  fd.append("checked", brandUpdate.checked);
  dispatch({ type: BRAND_UPDATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/brand/${brandUpdate._id}`,fd, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: BRAND_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: BRAND_UPDATE_FAIL, error: message });
  }
};

export const deleteBrand = (brandId) => async (dispatch, getState) => {
  dispatch({ type: BRAND_DELETE_REQUEST, payload: brandId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
   
    await Axios.delete(`/api/brand/${brandId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    
    dispatch({ type: BRAND_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: BRAND_DELETE_FAIL, payload: message });
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

export const updateBrandAddress = (brandAddUpdate) => async (dispatch, getState) => {
  
  dispatch({ type: BRAND_ADDRESS_UPDATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/brandaddress/${brandAddUpdate.id}`,brandAddUpdate, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: BRAND_ADDRESS_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: BRAND_ADDRESS_UPDATE_FAIL, error: message });
  }
};

export const deleteBrandAddress = (brandAddressId) => async (dispatch, getState) => {
  dispatch({ type: BRAND_DELETE_REQUEST, payload: brandAddressId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
   
    await Axios.delete(`/api/brandaddress/${brandAddressId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    
    dispatch({ type: BRAND_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: BRAND_DELETE_FAIL, payload: message });
  }
};
