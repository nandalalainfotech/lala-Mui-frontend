import {
  APPLICATION_SETTING_FAIL,
  APPLICATION_SETTING_LIST_FAIL,
  APPLICATION_SETTING_LIST_REQUEST,
  APPLICATION_SETTING_LIST_SUCCESS,
  APPLICATION_SETTING_REQUEST,
  APPLICATION_SETTING_RESET,
  APPLICATION_SETTING_SUCCESS,
} from "../constants/applicationConstant";

export const applicationSettingReducer = (state = {}, action) => {
  switch (action.type) {
    case APPLICATION_SETTING_REQUEST:
      return { loading: true };
    case APPLICATION_SETTING_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case APPLICATION_SETTING_FAIL:
      return { loading: false, error: action.payload };
    case APPLICATION_SETTING_RESET:
      return {};
    default:
      return state;
  }
};

export const appSettingListReducer = (
  state = { loading: true, appSettingList: [] },action) => {
  switch (action.type) {
    case APPLICATION_SETTING_LIST_REQUEST:
      return { loading: true };
    case APPLICATION_SETTING_LIST_SUCCESS:
      return {
        loading: false,
        appSettingList: action.payload,
       
      };
    case APPLICATION_SETTING_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
