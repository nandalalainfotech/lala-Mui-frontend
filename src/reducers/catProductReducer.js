import {
  CAT_PRODUCT_DELETE_FAIL,
  CAT_PRODUCT_DELETE_REQUEST,
  CAT_PRODUCT_DELETE_RESET,
  CAT_PRODUCT_DELETE_SUCCESS,
  CAT_PRODUCT_FAIL,
  CAT_PRODUCT_REQUEST,
  CAT_PRODUCT_SAVE_FAIL,
  CAT_PRODUCT_SAVE_REQUEST,
  CAT_PRODUCT_SAVE_RESET,
  CAT_PRODUCT_SAVE_SUCCESS,
  CAT_PRODUCT_SUCCESS,
  CAT_PRODUCT_UPDATE_FAIL,
  CAT_PRODUCT_UPDATE_REQUEST,
  CAT_PRODUCT_UPDATE_SUCCESS,
  CAT_PRODUCT_UPDATE_RESET,
} from "../constants/catBrandConstant";

export const catProductReducer = (state = {}, brand) => {
  switch (brand.type) {
    case CAT_PRODUCT_SAVE_REQUEST:
      return { loading: true };
    case CAT_PRODUCT_SAVE_SUCCESS:
      return { loading: false, success: true, product: brand.payload };
    case CAT_PRODUCT_SAVE_FAIL:
      return { loading: false, error: brand.payload };
    case CAT_PRODUCT_SAVE_RESET:
      return {};
    default:
      return state;
  }
};

export const catalogProdReducer = (
  state = { loading: true, catProducts: [] },
  action
) => {
  switch (action.type) {
    case CAT_PRODUCT_REQUEST:
      return { loading: true };
    case CAT_PRODUCT_SUCCESS:
      return {
        loading: false,
        catProducts: action.payload,
      };
    case CAT_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const catalogProdUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case CAT_PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case CAT_PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case CAT_PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case CAT_PRODUCT_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const catProddeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CAT_PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case CAT_PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case CAT_PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case CAT_PRODUCT_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
