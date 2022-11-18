import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [sellerLogo1, setSellerLogo1] = useState('');
  
  const [sellerLogo2, setSellerLogo2] = useState('');
  const [sellerLogo3, setSellerLogo3] = useState('');
  const [sellerLogo4, setSellerLogo4] = useState('');
  const [sellerDescription, setSellerDescription] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;

  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
      if (user.seller) {
        setSellerName(user.seller.name);
        setSellerLogo1(user.seller.logo1);
        setSellerLogo2(user.seller.logo2);
        setSellerLogo3(user.seller.logo3);
        setSellerLogo4(user.seller.logo4);
        setSellerDescription(user.seller.description);
      }
    }
  }, [dispatch, userInfo._id, user]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update profile
    if (password !== confirmPassword) {
      alert('Password and Confirm Password Are Not Matched');
    } else {
      dispatch(
        updateUserProfile({
          userId: user._id,
          name,
          email,
          password,
          sellerName,
          sellerLogo1,
          sellerLogo2,
          sellerLogo3,
          sellerLogo4,
        
          sellerDescription,
        })
      );
    }
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>User Profile</h1>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
              {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox variant="success">
                Profile Updated Successfully
              </MessageBox>
            )}
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="confirmPassword">confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Enter confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>
            {user.isSeller && (
              <>
                <h2>Seller</h2>
                <div>
                  <label htmlFor="sellerName">Seller Name</label>
                  <input
                    id="sellerName"
                    type="text"
                    placeholder="Enter Seller Name"
                    value={sellerName}
                    onChange={(e) => setSellerName(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label htmlFor="sellerLogo">Seller Logo1</label>
                  <input
                    id="sellerLogo1"
                    type="text"
                    placeholder="Enter Seller Logo"
                    value={sellerLogo1}
                    onChange={(e) => setSellerLogo1(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label htmlFor="sellerLogo">Seller logo2</label>
                  <input
                    id="sellerLogo2"
                    type="text"
                    placeholder="Enter Seller Logo"
                    value={sellerLogo2}
                    onChange={(e) => setSellerLogo2(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label htmlFor="sellerLogo">sellerLogo3</label>
                  <input
                    id="sellerLogo2"
                    type="text"
                    placeholder="Enter Seller Logo"
                    value={sellerLogo3}
                    onChange={(e) => setSellerLogo3(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label htmlFor="sellerLogo">Seller logo4</label>
                  <input
                    id="sellerLogo2"
                    type="text"
                    placeholder="Enter Seller Logo"
                    value={sellerLogo4}
                    onChange={(e) => setSellerLogo4(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label htmlFor="sellerDescription">Seller Description</label>
                  <input
                    id="sellerDescription"
                    type="text"
                    placeholder="Enter Seller Description"
                    value={sellerDescription}
                    onChange={(e) => setSellerDescription(e.target.value)}
                  ></input>
                </div>
              </>
            )}
            <div>
              <label />
              <button className="primary" type="submit">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}