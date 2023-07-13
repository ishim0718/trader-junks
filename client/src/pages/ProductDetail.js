import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import ProductItem from "../Components/ProductItem";

// import Cart from '../components/Cart';
import { useStoreContext } from '../utils/GlobalState';
import {
  UPDATE_PRODUCTS,
} from '../utils/actions';
import { QUERY_PRODUCTS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';


function ProductDetail() {
    const [state, dispatch] = useStoreContext();
    const { id } = useParams();
  
    const [currentProduct, setCurrentProduct] = useState({});
  
    const { loading, data } = useQuery(QUERY_PRODUCTS);
  
    const { products } = state;
  
    useEffect(() => {
      // already in global store
      if (products.length) {
        setCurrentProduct(products.find((product) => product._id === id));
      }
      // retrieved from server
      else if (data) {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: data.products,
        });
  
        data.products.forEach((product) => {
          idbPromise('products', 'put', product);
        });
      }
      // get cache from idb
      else if (!loading) {
        idbPromise('products', 'get').then((indexedProducts) => {
          dispatch({
            type: UPDATE_PRODUCTS,
            products: indexedProducts,
          });
        });
      }
    }, [products, data, loading, dispatch, id]);
    return (
        <div className="container">
          {loading ? (
        <div>Loading...</div>
      ) : (
      <ProductItem 
        products={products}/>
      )}
        </div>
      );
    };

    export default ProductDetail;