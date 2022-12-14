import { APPLICATION_SETTING_FAIL, APPLICATION_SETTING_REQUEST, APPLICATION_SETTING_SUCCESS } from "../constants/applicationConstant";
import Axios from 'axios';


export const saveApplicationSetting = (appsetting) => async (dispatch, getState) => {
    console.log("appsetting", appsetting);
    dispatch({ type: APPLICATION_SETTING_REQUEST });
    const {userSignin: { userInfo },} = getState();
    try {
      const { data } = await Axios.post('/api/application',appsetting,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: APPLICATION_SETTING_SUCCESS,
        payload: data.appsetting,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: APPLICATION_SETTING_FAIL, payload: message });
    }
  };