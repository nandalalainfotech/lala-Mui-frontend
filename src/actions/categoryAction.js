import { CATEGORY_CREATE_FAIL, CATEGORY_CREATE_REQUEST, CATEGORY_CREATE_SUCCESS, CATEGORY_LIST_FAIL, CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS } from "../constants/categoryConstants";
import Axios from 'axios';


export const createCategory = (category) => async (dispatch, getState) => {
  console.log("category=======>>>",category);
    dispatch({ type: CATEGORY_CREATE_REQUEST });
    const {userSignin: { userInfo },} = getState();
    try {
      const { data } = await Axios.post('/api/category',category,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: CATEGORY_CREATE_SUCCESS,
        payload: data.category,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: CATEGORY_CREATE_FAIL, payload: message });
    }
  };

  export const categoryListDetails = () => async (dispatch) => {
    dispatch({
      type: CATEGORY_LIST_REQUEST,
    });
    try {
      const { data } = await Axios.get(`/api/category/List/`);
      dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data });
     
    } catch (error) {
      dispatch({ type: CATEGORY_LIST_FAIL, payload: error.message });
    }
  };