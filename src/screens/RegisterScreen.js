import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { register } from '../actions/userAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function RegisterScreen(props) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Password and confirm password are not match');
    } else {
      dispatch(register(name, email, password, mobile));
    }
  };
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  return (
      <div className='formtion tempimg'>
        <div className='signincard'>
          <form className=" signinform" onSubmit={submitHandler}>
            <div>
              <label style={{ textAlign: 'center' }}><i className="fa fa-user"></i>&nbsp;<b>Create Account</b></label>
            </div>
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
            <div>
              <label className="signinlabel" htmlFor="name">Name</label>
              <input className="signininput" style={{ margin: '0px 50px' }}
                type="text"
                id="name"
                placeholder="Enter first name"
                required
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label className="signinlabel" htmlFor="mobile">Mobile Number</label>
              <input className="signininput" style={{ margin: '0px 50px' }}
                type="Mobile Number"
                id="Mobile Number"
                placeholder="Enter mobile number "
                required
                onChange={(e) => setMobile(e.target.value)}
              ></input>
            </div>
            <div>
              <label className="signinlabel" htmlFor="email">Email (Optional)</label>
              <input className="signininput" style={{ margin: '0px 50px' }}
                type="email"
                id="email"
                placeholder="Enter email"
                required
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="password" className="signinlabel">Password</label>
              <input style={{ margin: '0px 50px' }}  className="signininput" 
                type="password"
                id="password"
                placeholder="Enter at least 4 characters"
                required
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div>
              <label className="signinlabel" htmlFor="confirmPassword">Confirm Password</label>
              <input className="signininput" style={{ margin: '0px 50px' }}
                type="password"
                id="confirmPassword"
                placeholder="Enter confirm password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
              {/* <span className="signinlabel"> <i className="fa fa-info" style={{ fontSize: '1.3rem', marginTop: '3px' }} aria-hidden="true">&nbsp;&nbsp;Passwords must be at least 6 characters.</i></span> */}

              <span className='signinlabel' style={{ fontSize: '13px', marginTop: '10px' }}><b>We will send you a text to verify your phone.</b></span>
              <span className='signinlabel' style={{ fontSize: '13px' }}><b>Message and Data rates may apply.</b></span>
            </div>
            <div>
              <button className="signsubmit" type="submit">
                Continue
              </button>
            </div>
            <div>
              <label className='reglink' style={{ textAlign: 'center', fontSize: '12px' }}>
                Already have an account?{' '}&nbsp;&nbsp;
                <Link to={`/signin`}><b style={{ fontSize: '13px' }}>Sign-In</b>&nbsp;<i style={{fontSize:'12px' }} className="fa fa-caret-right" aria-hidden="true"></i></Link>
              </label>
              <label className='reglink' style={{ textAlign: 'center', fontSize: '12px' }}>
                Buying for Work?{' '}&nbsp;
                <Link to={`/account`}><b style={{ fontSize: '13px' }}>Create a free business account</b>&nbsp;<i style={{fontSize:'12px' }} className="fa fa-caret-right" aria-hidden="true"></i> </Link>
              </label>
            </div>
          </form>
        </div>
      </div>
  );
}