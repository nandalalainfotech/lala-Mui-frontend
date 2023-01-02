import Axios from "axios";
import { CAT_PRODUCT_FAIL, CAT_PRODUCT_REQUEST, CAT_PRODUCT_SUCCESS, CAT_QTY_CREATE_FAIL, CAT_QTY_CREATE_REQUEST, CAT_QTY_CREATE_SUCCESS } from "../constants/catBrandConstant";

export const saveCatologProduct = (catProduct) => async (dispatch, getState) => {
  console.log("Attribute=====>>>",catProduct);

    dispatch({ type: CAT_PRODUCT_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.post("/api/catProduct", catProduct, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({
        type: CAT_PRODUCT_SUCCESS,
        payload: data.appsetting,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: CAT_PRODUCT_FAIL, payload: message });
    }
  };


  export const creatQty = (Attribute) => async (dispatch, getState) => {
   
      dispatch({ type: CAT_QTY_CREATE_REQUEST });
      const {
        userSignin: { userInfo },
      } = getState();
      try {
        const { data } = await Axios.post("/api/", Attribute, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({
          type: CAT_QTY_CREATE_SUCCESS,
          payload: data.category,
        });
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: CAT_QTY_CREATE_FAIL, payload: message });
      }
    };