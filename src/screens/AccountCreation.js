import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useNavigate } from '../../node_modules/react-router-dom/dist/index';
// import { useNavigate } from 'react-router-dom';
import data from '../data';

// console.log('accountscreen', data);
export default function AccountCreation(props) {
    console.log("props", props)
    const navigate = useNavigate();
    // const AccountCreation = props => {
    //     const { username, email, city, phone } =
    //       (props.location && props.location.state) ||
    // const email=()=>{
    //     const {fname,lname}=useParams();
    //     const location=useLocation();
    //     console.log('location');
    // }
    useEffect(() => {
        const accountInfo = localStorage.getItem('accountInfo')
        if (accountInfo) {
            navigate('')
        }
    },)

    return (

        <div key='value' className='Home'>

            <h1>This Email is already being used for an Amazon account.Would you like to convert it to an Amazon Business account?</h1>

            <p> If you<strong> choose to convert the account</strong> for<span> &lt;{localStorage.getItem('Email', JSON.stringify(data))}&gt; </span>
                to an amazon business account:</p>

            <h4> Your orders and payment methods will carry over and can be seen by people you add to your account.</h4>
            {/* <div>
                    <label />
                    {/* <div className="third" type="submit"
                        onClick={() => navigate("/")}> Convert to a business account
                    </div> */}
            {/* <>
                New customer?{''}
                <div className='round'
                    onClick={() => navigate("/account")}>Start here</div>
            </> */}
            <div className='round'>
                <button onClick={() => navigate("/account")}>Start here</button>


            </div>



        </div >

    );
}
