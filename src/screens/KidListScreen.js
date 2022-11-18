import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  createKid,
  deleteKid,
  listKids,
} from "../actions/kidAction";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  KID_CREATE_RESET,
  KID_DELETE_RESET,
} from "../constants/kidConstants";
import { Link } from "react-router-dom";


export default function KidListScreen(props) {
  const navigate = useNavigate();
  const { pageNumber = 1 } = useParams();
  const { pathname } = useLocation();
  const sellerMode = pathname.indexOf('/seller') >= 0;
  const kidList = useSelector((state) => state.kidList);
  const { loading, error, kids, page, pages } = kidList;
  const kidCreate = useSelector((state) => state.kidCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    kid: createdKid,
  } = kidCreate;
  const kidDelete = useSelector((state) => state.kidDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = kidDelete;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: KID_CREATE_RESET });
      navigate(`/kid/${createdKid._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: KID_DELETE_RESET });
    }
    dispatch(
      listKids({ seller: sellerMode ? userInfo._id : '', pageNumber })
    );
  }, [
    createdKid,
    dispatch,
    navigate,
    sellerMode,
    successCreate,
    successDelete,
    userInfo._id,
    pageNumber,
  ]);
  const deleteHandler = (kid) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteKid(kid._id));
    }
  };
  const createHandler = () => {
    dispatch(createKid());
  };
  return (
    <div>
      <div className="row">
        <h1>Kids</h1>
        <button type="button" className="primary" onClick={createHandler}>
          Create Kid
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
              {kids.map((kid) => (
                <tr key={kid._id}>
                  <td>{kid._id}</td>
                  <td>{kid.name}</td>
                  <td>{kid.price}</td>
                  <td>{kid.category}</td>
                  <td>{kid.brand}</td>
                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() =>
                        navigate(`/kid/${kid._id}/edit`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="small"
                      onClick={() => deleteHandler(kid)}
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
                to={`/kidlist/pageNumber/${x + 1}`}
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
