import React, { useEffect, useState } from 'react';
// import { Carousel } from 'react-responsive-carousel';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
import { createReview, detailsSaree } from "../actions/sareeAction";
import { SAREE_REVIEW_CREATE_RESET } from "../constants/sareeConstants";
import data from '../data';

// import ReactImageMagnify from 'react-image-magnify';




export default function SareeScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const { id: SareeId } = params;
    const [qty, setQty] = useState(1);
    const sareeDetails = useSelector((state) => state.sareeDetails || []);
    const { loading, error, Saree } = sareeDetails;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const sareeReviewCreate = useSelector((state) => state.sareeReviewCreate || []);
    const {
        loading: loadingReviewCreate,
        error: errorReviewCreate,
        success: successReviewCreate,
    } = sareeReviewCreate;



    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    useEffect(() => {
        console.log("data", data);
        if (successReviewCreate) {
            console.log("data", data?.length);
            window.alert('Review Submitted Successfully');
            setRating('');
            setComment('');
            dispatch({ type: SAREE_REVIEW_CREATE_RESET });
        }
        dispatch(detailsSaree(SareeId));
    }, [dispatch, SareeId, successReviewCreate]);
    const addToCartHandler = () => {
        navigate(`/cart/${SareeId}?qty=${qty}`);
    };
    const submitHandler = (e) => {
        e.preventDefault();
        if (comment && rating) {
            dispatch(
                createReview(SareeId, { rating, comment, name: userInfo.name })
            );
        } else {
            alert('Please enter comment and rating');
        }
    };
    // const dispatch = useDispatch();
    // const productList = useSelector((state) => state.productList);
    // // console.log(productList)
    // const { loading, error } = productList;

    // useEffect(() => {
    //     dispatch(listProducts())}, [dispatch]);

    return (

        <div>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <div>
                    <Link to="/">go</Link>
                    <div className="row top">
                        <div className="col-2">
                            <img
                                className="medium"
                                src={Saree.image}
                                alt={Saree.name}
                            ></img>
                        </div>
                        <div className="col-1">
                            <ul>
                                <li>
                                    <h1>{Saree.name}</h1>
                                </li>
                                <li>
                                    <Rating
                                        rating={Saree.rating}
                                        numReviews={Saree.numReviews}
                                    ></Rating>
                                </li>
                                <li>Price : ${Saree.price}</li>
                                <li>
                                    Description:
                                    <p>{Saree.description}</p>
                                </li>
                            </ul>
                        </div>
                        <div className="col-1">
                            <div className="card card-body">
                                <ul>
                                    {/* <li>
                    Seller{' '}
                    <h2>
                      <Link to={`/seller/${product.seller._id}`}>
                        {product.seller.seller.name}
                      </Link>
                    </h2>
                    <Rating
                      rating={product.seller.seller.rating}
                      numReviews={product.seller.seller.numReviews}
                    ></Rating>
                  </li> */}
                                    <li>
                                        <div className="row">
                                            <div>Price</div>
                                            <div className="price">${Saree.price}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Status</div>
                                            <div>
                                                {Saree.countInStock > 0 ? (
                                                    <span className="success">In Stock</span>
                                                ) : (
                                                    <span className="danger">Unavailable</span>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                    {Saree.countInStock > 0 && (
                                        <>
                                            <li>
                                                <div className="row">
                                                    <div>Qty</div>
                                                    <div>
                                                        <select
                                                            value={qty}
                                                            onChange={(e) => setQty(e.target.value)}
                                                        >
                                                            {[...Array(Saree.countInStock).keys()].map(
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
                        {/* {Saree.reviews.length === 0 && ( */}
                        <MessageBox>There is no review</MessageBox>
                        {/* )} */}
                        <ul>
                            {/* {Saree.reviews.map((review) => (
                                <li key={review._id}>
                                    <strong>{review.name}</strong>
                                    <Rating rating={review.rating} caption=" "></Rating>
                                    <p>{review.createdAt.substring(0, 10)}</p>
                                    <p>{review.comment}</p>
                                </li>
                            ))} */}
                            <li>
                                {userInfo ? (
                                    <form className="form" onSubmit={submitHandler}>
                                        <div>
                                            <h2>Write a customer review</h2>
                                        </div>
                                        <div>
                                            <label htmlFor="rating">Rating</label>
                                            <select
                                                id="rating"
                                                value={rating}
                                                onChange={(e) => setRating(e.target.value)}
                                            >
                                                <option value="">Select...</option>
                                                <option value="1">1- Poor</option>
                                                <option value="2">2- Fair</option>
                                                <option value="3">3- Good</option>
                                                <option value="4">4- Very good</option>
                                                <option value="5">5- Excelent</option>
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

    )
};