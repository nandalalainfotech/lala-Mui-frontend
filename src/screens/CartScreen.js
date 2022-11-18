import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartAction";
import MessageBox from "../components/MessageBox";

export default function CartScreen(props) {
  const navigate = useNavigate();
  const params = useParams();
  const productId = params.id;
  // const tshirtId = params.id;
  const { search } = useLocation();
  const qtyInUrl = new URLSearchParams(search).get("qty");
  const qty = qtyInUrl ? Number(qtyInUrl) : 1;
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { cartItems, error } = cart;
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
    // else if (tshirtId) {
    //   dispatch(addToCart(tshirtId, qty));
    // }
  }, [dispatch, productId, qty]);
  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/shipping");
  };
  return (
    <div className="row top">
      <div className="col-2">
        <h1>Shopping Cart</h1>
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {cartItems.length === 0 ? (
          <>
            {userInfo ? (
              <div className="cart img-container">
                <div className="card card21">
                  <img className="cartin" src="/image/carts.jpg" />
                  <MessageBox>Cart is empty.</MessageBox>
                </div>
              </div>
            ) : (
              <>
                <div className="cart img-container">
                  <div className="card card22">
                    <img className="cartin" src="/image/carts.jpg" />
                    <MessageBox style={"color:red"}>Cart is empty.</MessageBox>
                    <Link to="/signin">
                      <button className="carts1">Sign In</button>
                    </Link>
                    <Link to="/register">
                      <button className="carts2">Register</button>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.product}>
                <div className="row">
                  <div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="small"
                    ></img>
                  </div>
                  <div className="min-30">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div>
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>${item.price}</div>
                  <div>
                    <button
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {userInfo ? (
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </h2>
            </li>
            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                className="primary block"
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
      ):(<></>)}
    </div>
  );
}
