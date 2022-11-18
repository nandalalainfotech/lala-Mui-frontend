import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
import { createReview, detailsWomen } from "../actions/womenAction";
import { WOMEN_REVIEW_CREATE_RESET } from "../constants/womenConstants";
// import ModalImage from "react-modal-image";
import ReactImageMagnify from 'react-image-magnify';
// import data from "../data";


export default function WomenScreen(props) {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { id: womenId } = params;
  const [qty, setQty] = useState(1);
  const womenDetails = useSelector((state) => state.womenDetails);
  const { loading, error, women } = womenDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;


  const womenReviewCreate = useSelector((state) => state.womenReviewCreate);
  const {
    
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = womenReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  // const [selectedImage, setSelectedImage] = useState('');
  useEffect(() => {
    if (successReviewCreate) {
      window.alert('Review Submitted Successfully');
      setRating('');
      setComment('');
      dispatch({ type: WOMEN_REVIEW_CREATE_RESET });
    }
    dispatch(detailsWomen(womenId));
  }, [dispatch, womenId, successReviewCreate]);
  const addToCartHandler = () => {
    navigate(`/cart/${womenId}?qty=${qty}`);
  };


  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(womenId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert('Please enter comment and rating');
    }
  };


  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div >
          <Link to="/Tshirt">Back to result</Link>
          <div className="row top">
            <div className="col-2">
            
               <ReactImageMagnify {...{
                smallImage: {
                  className: "large",
                  src: women.image,
                  width: 300,
                  height: 400,

                },
                largeImage: {
                  className: "small",
                  src: women.image,
                  width: 600,
                  height: 600,

                },


              }} />

            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{women.name}</h1>
                </li>
                <li>
                  <Rating
                    rating={women.rating}
                    numReviews={women.numReviews}
                  ></Rating>
                </li>
                <li>Price : ${women.price}</li>
               
                <li>
                  Description:
                  <p>{women.description}</p>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                
                  <li>
                    <div className="row">
                      <div>Price</div>
                      <div className="price">${women.price}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Status</div>
                      <div>
                        {women.countInStock > 0 ? (
                          <span className="success">In Stock</span>
                        ) : (
                          <span className="danger">Unavailable</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {women.countInStock > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div>Qty</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(women.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <button
                          onClick={addToCartHandler}
                          className="primary block"
                        >
                          Add to Cart
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div>
            <h2 id="reviews">Reviews</h2>
            {women.reviews.length === 0 && (
              <MessageBox>There is no review</MessageBox>
            )}
            <ul>
              {women.reviews.map((review) => (
                <li key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating rating={review.rating} caption=" "></Rating>
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </li>
              ))}
              <li>
                {userInfo ? (
                  <form className="form" onSubmit={submitHandler}>
                    <div>1
                      <h2>Write a customer review</h2>
                    </div>
                    <div>
                      <label htmlFor="rating">Rating</label>
                      <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      > 
                        <option  value="">Select...</option>
                        <option className="Rating" value="1">1     - Not intrested</option>
                        <option className="Rating" value="1.5">1.5 - Poor</option>
                        <option className="Rating" value="2">2     - Fair</option>
                        <option className="Rating" value="2.5">2.5 - Nice</option>
                        <option className="Rating" value="3">3     - Good</option>
                        <option className="Rating" value="3.5">3.5 - Very Good</option>
                        <option className="Rating" value="4">4     - Exelent</option>
                        <option className="Rating" value="4.5">4.5 - Outstanding</option>
                        <option className="Rating" value="5">5     - Marvelous</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="comment">Comment</label>
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <label />
                      <button className="primary" type="submit">
                        Submit
                      </button>
                    </div>
                    <div>
                      {loadingReviewCreate && <LoadingBox></LoadingBox>}
                      {errorReviewCreate && (
                        <MessageBox variant="danger">
                          {errorReviewCreate}
                        </MessageBox>
                      )}
                    </div>
                  </form>
                ) : (
                  <MessageBox>
                    Please <Link to="/signin">Sign In</Link> to write a review
                  </MessageBox>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
