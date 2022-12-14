import {
  APPLICATION_SETTING_FAIL,
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
