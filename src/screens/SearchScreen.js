// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useParams } from 'react-router-dom';
// import { listProducts } from '../actions/productAction';
// import LoadingBox from '../components/LoadingBox';
// import MessageBox from '../components/MessageBox';
// import Product from '../components/Product';
// import Rating from '../components/Rating';
// import { prices, ratings } from '../utils';

// export default function SearchScreen(props) {
//   const {
//     name = 'all',
//     category = 'all',
//     min = 0,
//     max = 0,
//     rating = 0,
//     order = 'newest',
//     pageNumber = 1,
//   } = useParams();
//   const dispatch = useDispatch();
//   const productList = useSelector((state) => state.productList);
//   const { loading, error, products,gens, page, pages } = productList;
//   const productCategoryList = useSelector((state) => state.productCategoryList);
//   const {
//     loading: loadingCategories,
//     error: errorCategories,
//     categories,
//   } = productCategoryList;
//   useEffect(() => {
//     dispatch(
//       listProducts({
//         pageNumber,
//         name: name !== 'all' ? name : '',
//         category: category !== 'all' ? category : '',
//         min,
//         max,
//         rating,
//         order,
//       })
//     );
//   }, [category, dispatch, max, min, name, order, rating, pageNumber]);

//   const getFilterUrl = (filter) => {
//     const filterPage = filter.page || pageNumber;
//     const filterCategory = filter.category || category;
//     const filterName = filter.name || name;
//     const filterRating = filter.rating || rating;
//     const sortOrder = filter.order || order;
//     const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
//     const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
//     return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}/pageNumber/${filterPage}`;
//   };
//   return (
//     <div>
//       <div className="row">
//         {loading ? (
//           <LoadingBox></LoadingBox>
//         ) : error ? (
//           <MessageBox variant="danger">{error}</MessageBox>
//         ) : (
//           <div>{products.length} Results</div>
//         )}
//             <div>
//           Sort by{' '}
//           <select
//             value={order}
//             onChange={(e) => {
//               props.history.push(getFilterUrl({ order: e.target.value }));
//             }}
//           >
//             <option value="newest">Newest Arrivals</option>
//             <option value="lowest">Price: Low to High</option>
//             <option value="highest">Price: High to Low</option>
//             <option value="toprated">Avg. Customer Reviews</option>
//           </select>
//         </div>
//       </div>
//       <div className="row top">
//         <div className="col-1">
//           <h3>Department</h3>
//           <div>
//             {loadingCategories ? (
//               <LoadingBox></LoadingBox>
//             ) : errorCategories ? (
//               <MessageBox variant="danger">{errorCategories}</MessageBox>
//             ) : (
//               <ul>
//                 <li>
//                   <Link
//                     className={'all' === category ? 'active' : ''}
//                     to={getFilterUrl({ category: 'all' })}
//                   >
//                     Any
//                   </Link>
//                 </li>
//                 {categories.map((c) => (
//                   <li key={c}>
//                     <Link
//                       className={c === category ? 'active' : ''}
//                       to={getFilterUrl({ category: c })}
//                     >
//                       {c}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//           <div>
//             <h3>Price</h3>
//             <ul>
//             {prices.map((p) => (
//                 <li key={p.name}>
//                   <Link
//                     to={getFilterUrl({ min: p.min, max: p.max })}
//                     className={
//                       `${p.min}-${p.max}` === `${min}-${max}` ? 'active' : ''
//                     }
//                   >
//                   {p.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//             </div>
//           <div>
//             <h3>Avg. Customer Review</h3>
//             <ul>
//               {ratings.map((r) => (
//                 <li key={r.name}>
//                   <Link
//                     to={getFilterUrl({ rating: r.rating })}
//                     className={`${r.rating}` === `${rating}` ? 'active' : ''}
//                   >
//                     <Rating caption={' & up'} rating={r.rating}></Rating>
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//         <div className="col-3">
//           {loading ? (
//             <LoadingBox></LoadingBox>
//           ) : error ? (
//             <MessageBox variant="danger">{error}</MessageBox>
//           ) : (
//             <>
//               {products.length === 0 && (
//                 <MessageBox>No Product Found</MessageBox>
//               )}
//               <div className="row center">
//                 {products.map((product) => (
//                   <Product key={product._id} product={product}></Product>
//                 ))}
//               </div>
//               <div className="row center pagination">
//                 {[...Array(pages).keys()].map((x) => (
//                   <Link
//                     className={x + 1 === page ? 'active' : ''}
//                     key={x + 1}
//                     to={getFilterUrl({ page: x + 1 })}
//                   >
//                     {x + 1}
//                   </Link>
//                 ))}
//               </div>
//             </>


//           )}
//         </div>
//         <div className="col-3">
//           {loading ? (
//             <LoadingBox></LoadingBox>
//           ) : error ? (
//             <MessageBox variant="danger">{error}</MessageBox>
//           ) : (
//             <>
//               {gens.length === 0 && (
//                 <MessageBox>No Product Found</MessageBox>
//               )}
//               <div className="row center">
//                 {gens.map((gen) => (
//                   <Product key={gen._id} gen={gen}></Product>
//                 ))}
//               </div>
//               <div className="row center pagination">
//                 {[...Array(pages).keys()].map((x) => (
//                   <Link
//                     className={x + 1 === page ? 'active' : ''}
//                     key={x + 1}
//                     to={getFilterUrl({ page: x + 1 })}
//                   >
//                     {x + 1}
//                   </Link>
//                 ))}
//               </div>
//             </>


//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from '../../node_modules/react-router-dom/dist/index';
import { listProducts } from '../actions/productAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';
import Rating from '../components/Rating';
import { prices, ratings } from '../utils';

export default function SearchScreen(props) {
  const {
    name = 'all',
    category = 'all',
    categorygroup = 'all',
    categorytype = 'all',
    min = 0,
    max = 0,
    rating = 0,
    order = 'newest',
    pageNumber = 1,
  } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  // const productCategorygroupList = useSelector((state) => state.productCategorygroupList);
  // const {
  //   loadinggrp: loadingCategoriesGroup,
  //   errorcategrp: errorCategoriesGroup,
  //   categoriesGroup,
  // } = productCategorygroupList;

  // const productCategorytypeList = useSelector((state) => state.productCategorytypeList);
  // const {
  //   loadingtype: loadingCategoriesType,
  //   errorcategtype: errorCategoriesType,
  //   categoriesType,
  // } = productCategorytypeList;
  // console.log("categoriesGroup----------------->>>", categoriesGroup)
  // console.log("categoriesType----------------->>>", categoriesType)
  useEffect(() => {
    dispatch(
      listProducts({
        pageNumber,
        name: name !== 'all' ? name : '',
        category: category !== 'all' ? category : '',
        categorygroup: categorygroup !== 'all' ? categorygroup : '',
        categorytype: categorytype !== 'all' ? categorytype : '',
        min,
        max,
        rating,
        order,
      })
    );
  }, [category, categorygroup, categorytype, dispatch, max, min, name, order, rating, pageNumber]);

  const getFilterUrl = (filter) => {
    const filterCategory = filter.category || category;
    const filterCategorygroup = filter.categorygroup || categorygroup;
    const filterCategorytype = filter.categorytype || categorytype;
    const filterName = filter.name || name;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    const filterRating = filter.rating || rating;
    const sortOrder = filter.order || order;
    const filterPage = filter.page || pageNumber;
    return (`/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}/pageNumber/${filterPage}`);
      // `/search/categorygroup/${filterCategorygroup}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}/pageNumber/${filterPage}`,
      // `/search/categorytype/${filterCategorytype}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}/pageNumber/${filterPage}`);
  };
  return (
    <div>
      <div className="row">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>{products.length} Results</div>
        )}
        <div>
          Sort by{' '}
          <select
            value={order}
            onChange={(e) => {
              navigate(getFilterUrl({ order: e.target.value }));
            }}
          >
            <option value="newest">Newest Arrivals</option>
            <option value="lowest">Price: Low to High</option>
            <option value="highest">Price: High to Low</option>
            <option value="toprated">Avg. Customer Reviews</option>
          </select>
        </div>
      </div>
      <div className="row top">
        <div className="col-1">
          <h3>Department</h3>
          <div>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              <ul>
                <li>
                  <Link
                    className={'all' === category ? 'active' : ''}
                    to={getFilterUrl({ category: 'all' })}
                  // to={`/search/category/sample category`}
                  >
                    Any
                  </Link>
                </li>
                {categories.map((c) => (
                  <li key={c}>
                    <Link
                      className={c === category ? 'active' : ''}
                      to={getFilterUrl({ category: c })}
                    // to={`/search/category/${c}`}


                    >
                      {c}
                    </Link>
                  </li>
                ))}


              </ul>
            )}

            {/* {loadingCategoriesGroup ? (
              <LoadingBox></LoadingBox>
            ) : errorCategoriesGroup ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              <ul>

                <li>
                  <Link
                    className={'all' === categorygroup ? 'active' : ''}
                    to={getFilterUrl({ categorygroup: 'all' })}
                  />

                </li>
                {categoriesGroup.map((c) => (
                  <li key={c}>
                    <Link
                      className={c === categorygroup ? 'active' : ''}
                      to={getFilterUrl({ categorygroup: c })}
                    // to={`/search/category/${c}`}


                    >
                      {c}
                    </Link>
                  </li>
                ))}
              </ul>
            )} */}
          </div>
          <div>
            <h3>Price</h3>
            <ul>
              {prices.map((p) => (
                <li key={p.name}>
                  <Link
                    to={getFilterUrl({ min: p.min, max: p.max })}
                    className={
                      `${p.min}-${p.max}` === `${min}-${max}` ? 'active' : ''
                    }
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Avg. Customer Review</h3>
            <ul>
              {ratings.map((r) => (
                <li key={r.name}>
                  <Link
                    to={getFilterUrl({ rating: r.rating })}
                    className={`${r.rating}` === `${rating}` ? 'active' : ''}
                  >
                    <Rating caption={' & up'} rating={r.rating}></Rating>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-3">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {products.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
              <div className="row center">
                {products.map((product) => (
                  <Product key={product._id} product={product}></Product>
                ))}
              </div>
              <div className="row center pagination">
                {[...Array(pages).keys()].map((x) => (
                  <Link
                    className={x + 1 === page ? 'active' : ''}
                    key={x + 1}
                    to={getFilterUrl({ page: x + 1 })}
                  >
                    {x + 1}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}