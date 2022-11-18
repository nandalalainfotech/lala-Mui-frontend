import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  createWomen,
  deleteWomen,
  listWomens,
} from "../actions/womenAction";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  WOMEN_CREATE_RESET,
  WOMEN_DELETE_RESET,
} from "../constants/womenConstants";
import { Link } from "react-router-dom";


export default function WomenListScreen(props) {
  const navigate = useNavigate();
  const { pageNumber = 1 } = useParams();
  const { pathname } = useLocation();
  const sellerMode = pathname.indexOf('/seller') >= 0;
  const womenList = useSelector((state) => state.womenList);
  const { loading, error, womens, page, pages } = womenList;
  const womenCreate = useSelector((state) => state.womenCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    women: createdWomen,
  } = womenCreate;
  const womenDelete = useSelector((state) => state.womenDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = womenDelete;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: WOMEN_CREATE_RESET });
      navigate(`/women/${createdWomen._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: WOMEN_DELETE_RESET });
    }
    dispatch(
      listWomens({ seller: sellerMode ? userInfo._id : '', pageNumber })
    );
  }, [
    createdWomen,
    dispatch,
    navigate,
    sellerMode,
    successCreate,
    successDelete,
    userInfo._id,
    pageNumber,
  ]);
  const deleteHandler = (women) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteWomen(women._id));
    }
  };
  const createHandler = () => {
    dispatch(createWomen());
  };
  return (
    <div>
      <div className="row">
        <h1>Womens</h1>
        <button type="button" className="primary" onClick={createHandler}>
          Create Women
        </button>
      </div>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {womens.map((women) => (
                <tr key={women._id}>
                  <td>{women._id}</td>
                  <td>{women.name}</td>
                  <td>{women.price}</td>
                  <td>{women.category}</td>
                  <td>{women.brand}</td>
                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() =>
                        navigate(`/women/${women._id}/edit`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="small"
                      onClick={() => deleteHandler(women)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}


          
            </tbody>
          </table>
          <div className="row center pagination">
            {[...Array(pages).keys()].map((x) => (
              <Link
                className={x + 1 === page ? 'active' : ''}
                key={x + 1}
                to={`/womenlist/pageNumber/${x + 1}`}
              >
                {x + 1}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
