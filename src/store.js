import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { addressListReducer } from "./reducers/addressReducers";
import {
  cartDeleteReducer,
  cartReducer,
  cartReducerItems,
  cartUpdateReducer,
  userCartListReducer,
} from "./reducers/cartReducers";
import {
  orderCreateReducer,
  orderDeleteReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListReducer,
  orderMineListReducer,
  orderPayReducer,
  orderSummaryReducer,
} from "./reducers/orderReducers";
import {
  productCategoryListReducer,
  productCategorygroupListReducer,
  productCategorytypeListReducer,
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productReviewCreateReducer,
  productUpdateReducer,
  productMenListReducer,
  productWomenListReducer,
  productKidsListReducer,
} from "./reducers/productReducers";
import {
  userAddressMapReducer,
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userRegisterReducer,
  userSigninReducer,
  userAccountReducer,
  userAccountcreationReducer,
  userAdmininReducer,
  userTopSellerListReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import { SareeListReducer, SareeDetailsReducer } from "./reducers/sareeReducer";
import {
  womenCategoryListReducer,
  womenCreateReducer,
  womenDeleteReducer,
  womenDetailsReducer,
  womenListReducer,
  womenReviewCreateReducer,
  womenUpdateReducer,
} from "./reducers/womenReducers";
// import { cartWomenReducer } from './reducers/cartWomenReducers';
import {
  kidCategoryListReducer,
  kidCreateReducer,
  kidDeleteReducer,
  kidDetailsReducer,
  kidListReducer,
  kidReviewCreateReducer,
  kidUpdateReducer,
} from "./reducers/kidReducer";
import { applicationSettingReducer, appSettingListReducer } from "./reducers/applicationReducer";
import { otpListReducer, userOtpReducer } from "./reducers/otpReducer";
import { categoryCreateReducer, categoryListReducer, categorymasterCreateReducer, categoryMasterListReducer, childcategoryCreateReducer, ChildCategoryListReducer, subcategoryCreateReducer, subCategoryListReducer } from "./reducers/categoryReducers";
import { AttributeCreateReducer, attributeDeleteReducer, AttributeMasterListReducer, attributeUpdateReducer, AttributeValueCreateReducer, attributeValueDeleteReducer, AttributeValueListReducer, attributeValueUpdateReducer, featureDeleteReducer, FeaturesCreateReducer, FeaturesListReducer, FeaturesValueCreateReducer, FeaturesValueListReducer, featureValueDeleteReducer, feautureUpdateReducer, feautureValueUpdateReducer } from "./reducers/AttributeReducers";
import { brandAddressDeleteReducer, brandAddressListReducer, brandAddressReducer, brandAddressUpdateReducer, brandDeleteReducer, brandListReducer, brandReducer, brandUpdateReducer } from "./reducers/brandReducer";
import { categmastercreateReducer, categoryMasterallListReducer, CategoryMasterDeleteReducer, categorymasterReducer } from "./reducers/categoryMasterReducer";
import { catalogProdReducer, catalogProdUpdateReducer, catProddeleteReducer, catProductReducer } from "./reducers/catProductReducer";
// import { cartKidReducer } from './reducers/cartKidReducers';
// import { suitDetailsReducer, suitListReducer, suitReviewCreateReducer } from './reducers/suitReducers';
// import { cartKidReducer } from './reducers/cartKidReducers';
// import { cartWomenReducer } from './reducers/cartWomenReducers';

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },

  userAccount: {
    accountInfo: localStorage.getItem("data")
      ? JSON.parse(localStorage.getItem("data"))
      : null,
  },
  userAccountCreation: {
    accountcreationInfo: localStorage.getItem("accountcreationInfo")
      ? JSON.parse(localStorage.getItem("accountcreationInfo"))
      : null,
  },
  userAdminin: {
    adminInfo: localStorage.getItem("adminInfo")
      ? JSON.parse(localStorage.getItem("adminInfo"))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem("usercart")
      ? JSON.parse(localStorage.getItem("usercart"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: "PayPal",
  },
};

const reducer = combineReducers({
  addressesList: addressListReducer,
  productList: productListReducer,
  productMenList: productMenListReducer,
  productWomenList: productWomenListReducer,
  productKidsList: productKidsListReducer,
  womenList: womenListReducer,
  userCartListItem: userCartListReducer,
  cartItems: cartReducerItems,
  cartDelete: cartDeleteReducer,
  cartUpdate: cartUpdateReducer,
  kidList: kidListReducer,
  applicationCreate: applicationSettingReducer,
  brandCreate: brandReducer,
  brandReduce: brandListReducer,
  brandAddressCreate: brandAddressReducer,
  brandAddreList: brandAddressListReducer,
  brandUpdate: brandUpdateReducer,
  brandDelete: brandDeleteReducer,
  brandAddressDelete: brandAddressDeleteReducer,
  brandAddressUpdate: brandAddressUpdateReducer,
  catProductSave: catProductReducer,
  catalogProd: catalogProdReducer,
  catalogProdUpdate: catalogProdUpdateReducer,
  catProddelete: catProddeleteReducer,
  applicationList: appSettingListReducer,
  userOtp: userOtpReducer,
  otpLists: otpListReducer,

  productDetails: productDetailsReducer,
  womenDetails: womenDetailsReducer,

  kidDetails: kidDetailsReducer,
  cart: cartReducer,

  // cart: cartWomenReducer,
  AttributeCreate:AttributeCreateReducer,
  attributeMasterList:AttributeMasterListReducer,
  AttributeValueCreate:AttributeValueCreateReducer,
  AttributeValueList:AttributeValueListReducer,
  FeaturesCreate:FeaturesCreateReducer,
  FeaturesList:FeaturesListReducer,
  CreateFeaturesValue:FeaturesValueCreateReducer,
  FeaturesValueList:FeaturesValueListReducer,
  attributeUpdate:attributeUpdateReducer,
  attributeDelete:attributeDeleteReducer,
  attributeValueUpdate:attributeValueUpdateReducer,
  attributeValueDelete:attributeValueDeleteReducer,
  feautureUpdate:feautureUpdateReducer,
  feautureValueUpdate:feautureValueUpdateReducer,
  featureDelete:featureDeleteReducer,
  featureValueDelete:featureValueDeleteReducer,
  // cart: cartKidReducer,
  userSignin: userSigninReducer,
  userAccount: userAccountReducer,

  categoryList: categoryListReducer,
  childcategory:childcategoryCreateReducer,
  ChildCategoryLis:ChildCategoryListReducer,
  subcategoryCreate:subcategoryCreateReducer,
  subCategoryList:subCategoryListReducer,
  categoryMasterList: categoryMasterListReducer,
  categoryMasterCreate:categorymasterCreateReducer,
  categoryCreate:categoryCreateReducer,
  userAccountCreation: userAccountcreationReducer,
  userAdminin: userAdmininReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMineList: orderMineListReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  productCreate: productCreateReducer,
  womenCreate: womenCreateReducer,
  kidCreate: kidCreateReducer,
  productUpdate: productUpdateReducer,
  womenUpdate: womenUpdateReducer,
  kidUpdate: kidUpdateReducer,
  productDelete: productDeleteReducer,
  womenDelete: womenDeleteReducer,
  kidDelete: kidDeleteReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  orderDeliver: orderDeliverReducer,
  userList: userListReducer,
  userUpdate: userUpdateReducer,
  userDelete: userDeleteReducer,
  userTopSellersList: userTopSellerListReducer,
  productCategoryList: productCategoryListReducer,
  productCategorygroupList: productCategorygroupListReducer,
  productCategorytypeList: productCategorytypeListReducer,
  womenCategoryList: womenCategoryListReducer,
  kidCategoryList: kidCategoryListReducer,
  productReviewCreate: productReviewCreateReducer,
  womenReviewCreate: womenReviewCreateReducer,
  kidReviewCreate: kidReviewCreateReducer,
  userAddressMap: userAddressMapReducer,
  orderSummary: orderSummaryReducer,
  sareeReducer: SareeListReducer,
  sareeDetails: SareeDetailsReducer,
  CategoryMasterCreate:categmastercreateReducer,
  CategoryMasterallList:categoryMasterallListReducer,
  CategoryMasterDelete:CategoryMasterDeleteReducer,
  CategoryMasterUpdate:categorymasterReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
document.cookie = "name=sri";
export default store;
