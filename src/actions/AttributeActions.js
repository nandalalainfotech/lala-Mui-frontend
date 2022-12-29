import Axios from 'axios';
import { ATTRIBUTE_CREATE_FAIL, ATTRIBUTE_CREATE_REQUEST, ATTRIBUTE_CREATE_SUCCESS, ATTRIBUTE_DELETE_FAIL, ATTRIBUTE_DELETE_REQUEST, ATTRIBUTE_DELETE_SUCCESS, ATTRIBUTE_LIST_FAIL, ATTRIBUTE_LIST_REQUEST, ATTRIBUTE_LIST_SUCCESS, ATTRIBUTE_UPDATE_FAIL, ATTRIBUTE_UPDATE_REQUEST, ATTRIBUTE_UPDATE_SUCCESS, ATTRIBUTE_VALUE_CREATE_FAIL, ATTRIBUTE_VALUE_CREATE_REQUEST, ATTRIBUTE_VALUE_CREATE_SUCCESS, ATTRIBUTE_VALUE_LIST_FAIL, ATTRIBUTE_VALUE_LIST_REQUEST, ATTRIBUTE_VALUE_LIST_SUCCESS, FEATURES_CREATE_FAIL, FEATURES_CREATE_REQUEST, FEATURES_CREATE_SUCCESS, FEATURES_LIST_FAIL, FEATURES_LIST_REQUEST, FEATURES_LIST_SUCCESS, FEATURES_VALUE_CREATE_FAIL, FEATURES_VALUE_CREATE_REQUEST, FEATURES_VALUE_CREATE_SUCCESS, FEATURES_VALUE_LIST_FAIL, FEATURES_VALUE_LIST_REQUEST, FEATURES_VALUE_LIST_SUCCESS } from '../constants/AttributesConstants';

  export const AttributeCategory = (Attribute) => async (dispatch, getState) => {
    dispatch({ type:  ATTRIBUTE_CREATE_REQUEST });
    const {userSignin: { userInfo },} = getState();
    try {
      const { data } = await Axios.post('/api/Attribute',Attribute,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: ATTRIBUTE_CREATE_SUCCESS,
        payload: data.category,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ATTRIBUTE_CREATE_FAIL, payload: message });
    }
  };

  export const AttributeMasterListDetails = () => async (dispatch) => {
    dispatch({
      type: ATTRIBUTE_LIST_REQUEST,
    });
    try {
      const { data } = await Axios.get(`/api/Attribute/Attributemaster/`);
      dispatch({ type: ATTRIBUTE_LIST_SUCCESS, payload: data });
     
    } catch (error) {
      dispatch({ type: ATTRIBUTE_LIST_FAIL, payload: error.message });
    }
  };


  export const createAttributeVlaue = (Attributevalue) => async (dispatch, getState) => {
    const fd = new FormData();
   
    fd.append('image', Attributevalue.imageFile[0]);
    fd.append('value', Attributevalue.value);
    fd.append('color', Attributevalue.color);
    fd.append('attributeVlaue', Attributevalue.attributeVlaue);
    dispatch({ type:  ATTRIBUTE_VALUE_CREATE_REQUEST });
    const {userSignin: { userInfo },} = getState();
    try {
      const { data } = await Axios.post('/api/AttributeValue',fd,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: ATTRIBUTE_VALUE_CREATE_SUCCESS,
        payload: data.Attributevalue,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ATTRIBUTE_VALUE_CREATE_FAIL, payload: message });
    }
  };

  export const AttributeValueListDetails = () => async (dispatch) => {
    dispatch({
      type: ATTRIBUTE_VALUE_LIST_REQUEST,
    });
    try {
      const { data } = await Axios.get(`/api/AttributeValue/Attributevalue/`);
      dispatch({ type: ATTRIBUTE_VALUE_LIST_SUCCESS, payload: data });
     
    } catch (error) {
      dispatch({ type: ATTRIBUTE_VALUE_LIST_FAIL, payload: error.message });
    }
  };

// **********************************************************************************************

  export const FeaturesCategory = (Features) => async (dispatch, getState) => {
    dispatch({ type:  FEATURES_CREATE_REQUEST });
    const {userSignin: { userInfo },} = getState();
    try {
      const { data } = await Axios.post('/api/Features',Features,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: FEATURES_CREATE_SUCCESS,
        payload: data.category,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: FEATURES_CREATE_FAIL, payload: message });
    }
  };

  export const FeaturesMasterListDetails = () => async (dispatch) => {
    dispatch({
      type: FEATURES_LIST_REQUEST,
    });
    try {
      const { data } = await Axios.get(`/api/Features/Flist/`);
      dispatch({ type: FEATURES_LIST_SUCCESS, payload: data });
     
    } catch (error) {
      dispatch({ type: FEATURES_LIST_FAIL, payload: error.message });

    }
  };
// ******************************************************************
export const FeaturesValueCategory = (Featuresvalue) => async (dispatch, getState) => {
  dispatch({ type:  FEATURES_VALUE_CREATE_REQUEST });
  const {userSignin: { userInfo },} = getState();
  try {
    const { data } = await Axios.post('/api/FeaturesValue',Featuresvalue,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: FEATURES_VALUE_CREATE_SUCCESS,
      payload: data.category,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: FEATURES_VALUE_CREATE_FAIL, payload: message });
  }
};

export const FeaturesValueListDetails = () => async (dispatch) => {
  dispatch({
    type: FEATURES_VALUE_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/FeaturesValue/Fvaluelist/`);
    dispatch({ type: FEATURES_VALUE_LIST_SUCCESS, payload: data });
   
  } catch (error) {
    dispatch({ type: FEATURES_VALUE_LIST_FAIL, payload: error.message });

  }
};

// *********************************update Section*******************************************

export const updateAttribute = (attributedit) => async (dispatch, getState) => {
  
  dispatch({ type: ATTRIBUTE_UPDATE_REQUEST, payload: attributedit });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/Attribute/${attributedit._id}`, attributedit, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type:ATTRIBUTE_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type:ATTRIBUTE_UPDATE_FAIL, error: message });
  }
};


// ***************************************************
export const deleteAttribute = (productId) => async (dispatch, getState) => {
  dispatch({ type: ATTRIBUTE_DELETE_REQUEST, payload: productId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {

    // await Axios.delete(`/api/uploads/${productId}`, {
    //   headers: { Authorization: `Bearer ${userInfo.token}` },
    // });
   
    await Axios.delete(`/api/Attribute/${productId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    
    dispatch({ type: ATTRIBUTE_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ATTRIBUTE_DELETE_FAIL, payload: message });
  }
};