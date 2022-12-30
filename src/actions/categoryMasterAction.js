import Axios from 'axios';
import { CATEGORY_MASTER_CREATE_FAIL, CATEGORY_MASTER_CREATE_REQUEST, CATEGORY_MASTER_CREATE_SUCCESS, CATEGORY_MASTER_ALLLIST_FAIL, CATEGORY_MASTER_ALLLIST_REQUEST, CATEGORY_MASTER_ALLLIST_SUCCESS, CATEGORY_MASTER_DEL_REQUEST, CATEGORY_MASTER_DEL_SUCCESS, CATEGORY_MASTER_DEL_FAIL, CATEGORY_MASTER_UPDATES_REQUEST, CATEGORY_MASTER_UPDATES_SUCCESS, CATEGORY_MASTER_UPDATES_FAIL } from '../constants/categoryMasterConstant';


export const createCategoryMaster = (categoryMaster) => async (dispatch, getState) => {

  const fd = new FormData();
  fd.append('name', categoryMaster.name);
  fd.append('checked', categoryMaster.checked);
  fd.append('parent', categoryMaster.parent);
  fd.append('description', categoryMaster.description);
  fd.append('coverimg', categoryMaster.coverimg[0]);
  dispatch({ type: CATEGORY_MASTER_CREATE_REQUEST });
  const { userSignin: { userInfo }, } = getState();
  try {
    const { data } = await Axios.post('/api/categorymaster', fd,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: CATEGORY_MASTER_CREATE_SUCCESS,
      payload: data.category,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: CATEGORY_MASTER_CREATE_FAIL, payload: message });
  }
};

export const CategoryMasterallLists = () => async (dispatch) => {
  dispatch({
    type: CATEGORY_MASTER_ALLLIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/categorymaster/categorymasterList/`);
    dispatch({ type: CATEGORY_MASTER_ALLLIST_SUCCESS, payload: data });

  } catch (error) {
    dispatch({ type: CATEGORY_MASTER_ALLLIST_FAIL, payload: error.message });
  }
};

export const deleteCategegoryMasterlist = (id) => async (dispatch, getState) => {
  dispatch({ type: CATEGORY_MASTER_DEL_REQUEST, payload: id });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    await Axios.delete(`/api/categorymaster/${id}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: CATEGORY_MASTER_DEL_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: CATEGORY_MASTER_DEL_FAIL, payload: message });
  }
};

export const updatecategoryMaster = (categoryObject) => async (dispatch, getState) => {
  const fd = new FormData();
  fd.append('name', categoryObject.name);
  fd.append('checked', categoryObject.checked);
  fd.append('parent', categoryObject.parent);
  fd.append('description', categoryObject.description);
  fd.append('coverimg', categoryObject.coverimg[0]);
  dispatch({ type: CATEGORY_MASTER_UPDATES_REQUEST, payload: categoryObject });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/categorymaster/${categoryObject.id}`, fd, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: CATEGORY_MASTER_UPDATES_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: CATEGORY_MASTER_UPDATES_FAIL, error: message });
  }
};