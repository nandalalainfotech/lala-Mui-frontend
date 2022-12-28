import {
  ATTRIBUTE_CREATE_FAIL,
  ATTRIBUTE_CREATE_REQUEST,
  ATTRIBUTE_CREATE_RESET,
  ATTRIBUTE_CREATE_SUCCESS,
  ATTRIBUTE_LIST_FAIL,
  ATTRIBUTE_LIST_REQUEST,
  ATTRIBUTE_LIST_SUCCESS,
  ATTRIBUTE_VALUE_CREATE_FAIL,
  ATTRIBUTE_VALUE_CREATE_REQUEST,
  ATTRIBUTE_VALUE_CREATE_RESET,
  ATTRIBUTE_VALUE_CREATE_SUCCESS,
  ATTRIBUTE_VALUE_LIST_FAIL,
  ATTRIBUTE_VALUE_LIST_REQUEST,
  ATTRIBUTE_VALUE_LIST_SUCCESS,
  FEATURES_CREATE_FAIL,
  FEATURES_CREATE_REQUEST,
  FEATURES_CREATE_RESET,
  FEATURES_CREATE_SUCCESS,
  FEATURES_LIST_FAIL,
  FEATURES_LIST_REQUEST,
  FEATURES_LIST_SUCCESS,
  FEATURES_VALUE_CREATE_FAIL,
  FEATURES_VALUE_CREATE_REQUEST,
  FEATURES_VALUE_CREATE_RESET,
  FEATURES_VALUE_CREATE_SUCCESS,
  FEATURES_VALUE_LIST_FAIL,
  FEATURES_VALUE_LIST_REQUEST,
  FEATURES_VALUE_LIST_SUCCESS,
} from "../constants/AttributesConstants";

export const AttributeCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ATTRIBUTE_CREATE_REQUEST:
      return { loading: true };
    case ATTRIBUTE_CREATE_SUCCESS:
      return { loading: false, success: true, category: action.payload };
    case ATTRIBUTE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ATTRIBUTE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const AttributeMasterListReducer = (
  state = { loading: true, attributeMasterdetails: [] },
  action
) => {
  switch (action.type) {
    case ATTRIBUTE_LIST_REQUEST:
      return { loading: true };
    case ATTRIBUTE_LIST_SUCCESS:
      return {
        loading: false,
        attributeMasterdetails: action.payload,
      };
    case ATTRIBUTE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const AttributeValueCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ATTRIBUTE_VALUE_CREATE_REQUEST:
      return { loading: true };
    case ATTRIBUTE_VALUE_CREATE_SUCCESS:
      return { loading: false, success: true, category: action.payload };
    case ATTRIBUTE_VALUE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ATTRIBUTE_VALUE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const AttributeValueListReducer = (
  state = { loading: true, attributeValuedetails: [] },
  action
) => {
  switch (action.type) {
    case ATTRIBUTE_VALUE_LIST_REQUEST:
      return { loading: true };
    case ATTRIBUTE_VALUE_LIST_SUCCESS:
      return {
        loading: false,
        attributeValuedetails: action.payload,
      };
    case ATTRIBUTE_VALUE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// *************************************************************************
export const FeaturesCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case FEATURES_CREATE_REQUEST:
      return { loading: true };
    case FEATURES_CREATE_SUCCESS:
      return { loading: false, success: true, category: action.payload };
    case FEATURES_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case FEATURES_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const FeaturesListReducer = (
  state = { loading: true, Featuresdetails: [] },
  action
) => {
  switch (action.type) {
    case FEATURES_LIST_REQUEST:
      return { loading: true };
    case FEATURES_LIST_SUCCESS:
      return {
        loading: false,
        Featuresdetails: action.payload,
      };
    case FEATURES_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
// *******************************************************************

export const FeaturesValueCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case FEATURES_VALUE_CREATE_REQUEST:
      return { loading: true };
    case FEATURES_VALUE_CREATE_SUCCESS:
      return { loading: false, success: true, category: action.payload };
    case FEATURES_VALUE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case FEATURES_VALUE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const FeaturesValueListReducer = (
  state = { loading: true, Featuresvaluedetails: [] },
  action
) => {
  switch (action.type) {
    case FEATURES_VALUE_LIST_REQUEST:
      return { loading: true };
    case FEATURES_VALUE_LIST_SUCCESS:
      return {
        loading: false,
        Featuresvaluedetails: action.payload,
      };
    case FEATURES_VALUE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
