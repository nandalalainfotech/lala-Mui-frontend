import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { accountin } from '../actions/userAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import data from '../data';

export default function AccountScreen(props) {
  console.log("props", props)
  const navigate = useNavigate();


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/accountcreation';

  const userAccount = useSelector((state) => state.userAccount);
  const { userInfo, loading, error } = userAccount;

  const dispatch = useDispatch();
  const submitHandler = (e) => {

    e.preventDefault();
    dispatch(accountin(email, password));

  };

  useEffect(() => {
    console.log("useraccount", data, userInfo);

    if (userInfo) {

      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div className='acdiv' style={{ width: '100%', height: '100%' }}>
      <div className="ac-container">
        <div className="ac-col">
          <form className="form" onSubmit={submitHandler} >
            <div>
              <span style={{ fontWeight: '700px', fontSize: '25px' }}>Let us create your free Amazon Business account</span>
            </div>
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
            <div>
              {/* <label htmlFor="email">Email address</label> */}
              <input className="ac-input"
                //  autoComplete={'email' + Math.random()} 

                type="email"
                id="email"
                pattern=".*"
                placeholder="Enter email"
                // pathName="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              {/* <label htmlFor="password">Phone Number</label> */}
              <input className="ac-input"
                type="password"
                id="password"
                placeholder="Enter password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div>
              <button className="acbutton" onclick={submitHandler}>
                Get Started
              </button>
            </div>
            <div>
              <div>
                <span><i>Make sure that you have information about your organisation to help us verify your business account faster.</i></span>
              </div>
              <div>
                <div className="tooltip">
                  <span style={{ color: '#56b4f3', fontSize: '13px',cursor:'pointer' }}> Why is verification Needed? <i style={{ fontSize: '10px' }} className="fa fa-chevron-down"></i>{''}</span>
                  <span className="tooltiptext">To ensure that identity of yours and
                    other business remain secure,We always confirm new business registeration.</span>
                </div>
                <label />
              </div>

            </div>
          </form>
        </div>

        <div style={{ backgroundColor: '#239dff', color: 'white' }}>
          <div className='ac-col'>
            <div className="">
              <h1 style={{ fontWeight: '700px', fontSize: '22px' }}>Reshape buying for your organisation</h1>
            </div>

            <div style={{ display: 'flex' }}>

              <img src="https://m.media-amazon.com/images/G/31/AmazonBusiness/Registration/desktop/quantity-discounts-icon._CB612297378_.svg" alt="GST Invoice &amp; Bulk Discounts" className="ac-svg"></img>
              <div>
                <p style={{ margin: '0px' }}> GST Invoice & Bulk Discounts</p>

                <span className="ac-p" style={{ fontWeight: '300' }}>Save up to 28% more with GST input credit and avail discounts on multi-unit purchases.</span>
              </div>
            </div>
            <br></br>
            <div style={{ display: 'flex' }}>
              <img src="https://m.media-amazon.com/images/G/31/AmazonBusiness/Registration/desktop/analytics-icon._CB612297378_.svg" alt="Business Analytics" className="ac-svg"></img>
              <div>
                <p style={{ margin: '0px' }}>Business Analytics</p>
                <p className="ac-p" style={{ fontWeight: '300' }}>Track and monitor spending by your organisation with dynamic charts and data tables.</p>
              </div>
            </div>
            <br></br>
            <div style={{ display: 'flex' }}>
              <img src="https://m.media-amazon.com/images/G/31/AmazonBusiness/Registration/desktop/add-users-icon._CB612297378_.svg" alt="Secure Your Account" className="ac-svg"></img>
              <div>
                <p style={{ margin: '0px' }}> Secure Your Account</p>
                <p className="ac-p" style={{ fontWeight: '300' }}>Add more colleagues to your account for making business purchases instead of sharing your login credentials.</p>
              </div>
            </div>
            <br></br>
            
          </div>
          <img className="city" src="/image/ama5.jpg" alt="" style={{ fontWeight: '300' }}></img>
          <div className="row center Learnlink">
            <p className="row center">Learn more about amazon Business{' '}</p>
          </div>
        </div >
      </div>
    </div>
  );
}
