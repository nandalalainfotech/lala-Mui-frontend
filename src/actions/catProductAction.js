import Axios from "axios";
import {
  CAT_PRODUCT_DELETE_FAIL,
  CAT_PRODUCT_DELETE_REQUEST,
  CAT_PRODUCT_DELETE_SUCCESS,
  CAT_PRODUCT_FAIL,
  CAT_PRODUCT_REQUEST,
  CAT_PRODUCT_SAVE_FAIL,
  CAT_PRODUCT_SAVE_REQUEST,
  CAT_PRODUCT_SAVE_SUCCESS,
  CAT_PRODUCT_SUCCESS,
  CAT_PRODUCT_UPDATE_FAIL,
  CAT_PRODUCT_UPDATE_REQUEST,
  CAT_PRODUCT_UPDATE_SUCCESS
} from "../constants/catBrandConstant";

export const saveCatologProduct =
  (catProduct) => async (dispatch, getState) => {
    dispatch({ type: CAT_PRODUCT_SAVE_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.post("/api/catProduct", catProduct, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({
        type: CAT_PRODUCT_SAVE_SUCCESS,
        payload: data.appsetting,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: CAT_PRODUCT_SAVE_FAIL, payload: message });
    }
  };

export const catProductList = () => async (dispatch) => {
  dispatch({
    type: CAT_PRODUCT_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/catProduct/allcatProduct`);
    dispatch({ type: CAT_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CAT_PRODUCT_FAIL, payload: error.message });
  }
};

export const updateCatProduct = (catProdUpdate) => async (dispatch, getState) => {
  console.log("catProdUpdate", catProdUpdate);
  dispatch({ type: CAT_PRODUCT_UPDATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/catProduct/${catProdUpdate._id}`,catProdUpdate, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: CAT_PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: CAT_PRODUCT_UPDATE_FAIL, error: message });
  }
};



export const deleteCatalogProd = (catProductId) => async (dispatch, getState) => {
  dispatch({ type: CAT_PRODUCT_DELETE_REQUEST, payload: catProductId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
   
    await Axios.delete(`/api/catProduct/${catProductId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    
    dispatch({ type: CAT_PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: CAT_PRODUCT_DELETE_FAIL, payload: message });
  }
};
