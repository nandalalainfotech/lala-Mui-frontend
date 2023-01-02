import Axios from "axios";
import { CAT_PRODUCT_FAIL, CAT_PRODUCT_REQUEST, CAT_PRODUCT_SUCCESS } from "../constants/catBrandConstant";

export const saveCatologProduct = (catProduct) => async (dispatch, getState) => {
  const fd = new FormData();
  // fd.append("dropimg", catProduct.dropimg[0]);
  fd.append("prodname", catProduct.prodname);
  fd.append("summary", catProduct.summary.data);
  fd.append("description", catProduct.description.data);
  fd.append("feature", catProduct.feature);
  fd.append("brand", catProduct.brand);
  fd.append("search", catProduct.search);
  fd.append("reference", catProduct.reference);
  fd.append("quantity", catProduct.quantity);
  fd.append("taxexcluded", catProduct.taxexcluded);
  fd.append("taxincluded", catProduct.taxincluded);

    dispatch({ type: CAT_PRODUCT_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.post("/api/catProduct", fd, {
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