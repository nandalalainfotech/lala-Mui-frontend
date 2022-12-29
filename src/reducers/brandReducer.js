import {
  BRAND_ADDRESS_FAIL,
  BRAND_ADDRESS_REQUEST,
  BRAND_ADDRESS_RESET,
  BRAND_ADDRESS_SUCCESS,
  BRAND_FAIL,
  BRAND_REQUEST,
  BRAND_RESET,
  BRAND_SUCCESS,
  BRAND_UPDATE_FAIL,
  BRAND_UPDATE_REQUEST,
  BRAND_UPDATE_RESET,
  BRAND_UPDATE_SUCCESS,
} from "../constants/brandConstant";

export const brandReducer = (state = {}, brand) => {
  switch (brand.type) {
    case BRAND_REQUEST:
      return { loading: true };
    case BRAND_SUCCESS:
      return { loading: false, success: true, product: brand.payload };
    case BRAND_FAIL:
      return { loading: false, error: brand.payload };
    case BRAND_RESET:
      return {};
    default:
      return state;
  }
};

export const brandListReducer = (
  state = { loading: true, brandLists: [] },
  action
) => {
  switch (action.type) {
    case BRAND_REQUEST:
      return { loading: true };
    case BRAND_SUCCESS:
      return {
        loading: false,
        brandLists: action.payload,
      };
    case BRAND_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const brandUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case BRAND_UPDATE_REQUEST:
      return { loading: true };
    case BRAND_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case BRAND_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case BRAND_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const brandAddressReducer = (state = {}, address) => {
  switch (address.type) {
    case BRAND_ADDRESS_REQUEST:
      return { loading: true };
    case BRAND_ADDRESS_SUCCESS:
      return { loading: false, success: true, product: address.payload };
    case BRAND_ADDRESS_FAIL:
      return { loading: false, error: address.payload };
    case BRAND_ADDRESS_RESET:
      return {};
    default:
      return state;
  }
};

export const brandAddressListReducer = (
  state = { loading: true, brandAddLists: [] },
  action
) => {
  switch (action.type) {
    case BRAND_ADDRESS_REQUEST:
      return { loading: true };
    case BRAND_ADDRESS_SUCCESS:
      return {
        loading: false,
        brandAddLists: action.payload,
      };
    case BRAND_ADDRESS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};