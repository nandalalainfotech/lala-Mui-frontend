import { CATEGORY_MASTER_CREATE_FAIL, CATEGORY_MASTER_CREATE_REQUEST, CATEGORY_MASTER_CREATE_RESET, CATEGORY_MASTER_CREATE_SUCCESS, CATEGORY_MASTER_ALLLIST_FAIL, CATEGORY_MASTER_ALLLIST_REQUEST, CATEGORY_MASTER_ALLLIST_SUCCESS, CATEGORY_MASTER_DEL_REQUEST, CATEGORY_MASTER_DEL_SUCCESS, CATEGORY_MASTER_DEL_FAIL, CATEGORY_MASTER_DEL_RESET, CATEGORY_MASTER_UPDATES_REQUEST, CATEGORY_MASTER_UPDATES_SUCCESS, CATEGORY_MASTER_UPDATES_FAIL, CATEGORY_MASTER_UPDATES_RESET } from "../constants/categoryMasterConstant";

export const categmastercreateReducer = (state = {}, action) => {
    switch (action.type) {
      case CATEGORY_MASTER_CREATE_REQUEST:
        return { loading: true };
      case CATEGORY_MASTER_CREATE_SUCCESS:
        return { loading: false, success: true, categMaster: action.payload };
      case CATEGORY_MASTER_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case CATEGORY_MASTER_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };


  export const categoryMasterallListReducer = (
    state = { loading: true, categorymasterallList: [] },action) => {
    switch (action.type) {
      case CATEGORY_MASTER_ALLLIST_REQUEST:
        return { loading: true };
      case CATEGORY_MASTER_ALLLIST_SUCCESS:
        return {
          loading: false,
          categorymasterallList: action.payload,
         
        };
      case CATEGORY_MASTER_ALLLIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const CategoryMasterDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case CATEGORY_MASTER_DEL_REQUEST:
        return { loading: true };
      case CATEGORY_MASTER_DEL_SUCCESS:
        return { loading: false, success: true };
      case CATEGORY_MASTER_DEL_FAIL:
        return { loading: false, error: action.payload };
      case CATEGORY_MASTER_DEL_RESET:
        return {};
      default:
        return state;
    }
  };

  export const categorymasterReducer = (state = {}, action) => {
    switch (action.type) {
      case CATEGORY_MASTER_UPDATES_REQUEST:
        return { loading: true };
      case CATEGORY_MASTER_UPDATES_SUCCESS:
        return { loading: false, success: true };
      case CATEGORY_MASTER_UPDATES_FAIL:
        return { loading: false, error: action.payload };
      case CATEGORY_MASTER_UPDATES_RESET:
        return {};
      default:
        return state;
    }
  };