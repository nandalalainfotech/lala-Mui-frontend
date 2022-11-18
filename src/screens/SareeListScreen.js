import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation,useNavigate, useParams } from 'react-router-dom';
import {
  createSaree,
  deleteSaree,
  listSaree,
} from "../actions/sareeAction";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  SAREE_CREATE_RESET,
  SAREE_DELETE_RESET,
} from "../constants/sareeConstants";
import { Link } from "react-router-dom";


export default function SareeListScreen(props) {
  const navigate = useNavigate();
  const { pageNumber = 1 } = useParams();
  const { pathname } = useLocation();
  const sellerMode = pathname.indexOf('/seller') >= 0;
  const SareeList = useSelector((state) => state.SareeList);
  const { loading, error, Sarees, page, pages } = SareeList;
  const SareeCreate = useSelector((state) => state.SareeCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    Saree: createdSaree,
  } = SareeCreate;
  const SareeDelete = useSelector((state) => state.SareeDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = SareeDelete;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: SAREE_CREATE_RESET });
      navigate(`/Saree/${createdSaree._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: SAREE_DELETE_RESET });
    }
    dispatch(
      listSaree({ seller: sellerMode ? userInfo._id : '', pageNumber })
    );
  }, [
    createdSaree,
    dispatch,
    navigate,
    sellerMode,
    successCreate,
    successDelete,
    userInfo._id,
    pageNumber,
  ]);
  const deleteHandler = (Saree) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteSaree(Saree._id));
    }
  };
  const createHandler = () => {
    dispatch(createSaree());
  };
  return (
    <div>
      <div className="row">
        <h1>Saree</h1>
        <button type="button" className="primary" onClick={createHandler}>
          Create Saree
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
              {Sarees.map((Saree) => (
                <tr key={Saree._id}>
                  <td>{Saree._id}</td>
                  <td>{Saree.name}</td>
                  <td>{Saree.price}</td>
                  <td>{Saree.category}</td>
                  <td>{Saree.brand}</td>
                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() =>
                        navigate(`/Saree/${Saree._id}/edit`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="small"
                      onClick={() => deleteHandler(Saree)}
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
                to={`/Sareelist/pageNumber/${x + 1}`}
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
