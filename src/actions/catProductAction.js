import Axios from "axios";
import {
  CAT_PRODUCT_FAIL,
  CAT_PRODUCT_REQUEST,
  CAT_PRODUCT_SUCCESS
} from "../constants/catBrandConstant";

export const saveCatologProduct =
  (catProduct) => async (dispatch, getState) => {
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
