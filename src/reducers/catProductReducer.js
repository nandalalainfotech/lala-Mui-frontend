import { CAT_PRODUCT_FAIL, CAT_PRODUCT_REQUEST, CAT_PRODUCT_RESET, CAT_PRODUCT_SUCCESS } from "../constants/catBrandConstant";


export const catProductReducer = (state = {}, brand) => {
    switch (brand.type) {
      case CAT_PRODUCT_REQUEST:
        return { loading: true };
      case CAT_PRODUCT_SUCCESS:
        return { loading: false, success: true, product: brand.payload };
      case CAT_PRODUCT_FAIL:
        return { loading: false, error: brand.payload };
      case CAT_PRODUCT_RESET:
        return {};
      default:
        return state;
    }
  };