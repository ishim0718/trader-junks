import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import Cart from '../Components/Cart';
import { useStoreContext } from '../utils/GlobalState';
import {
  UPDATE_PRODUCTS,
  ADD_TO_CART,
  UPDATE_CART_QUANTITY,
  REMOVE_FROM_CART
} from '../utils/actions';
import { QUERY_PRODUCTS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';


function ProductDetail() {
    const [state, dispatch] = useStoreContext();
    const { id } = useParams();
  
    const [currentProduct, setCurrentProduct] = useState({});
  
    const { loading, data } = useQuery(QUERY_PRODUCTS);
  
    const { products, cart } = state;
  
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

    const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
    }
    const addToCart = () => {
      const itemInCart = cart.find((cartItem) => cartItem._id === id);
      if (itemInCart) {
        dispatch({
          type: UPDATE_CART_QUANTITY,
          _id: id,
          purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
        });
        idbPromise('cart', 'put', {
          ...itemInCart,
          purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
        });
      } else {
        dispatch({
          type: ADD_TO_CART,
          product: { ...currentProduct, purchaseQuantity: 1 },
        });
        idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
      }
    };
  };
  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id,
    });

    idbPromise('cart', 'delete', { ...currentProduct });
  }
    return (
      <>
      {currentProduct && cart ? (
        <div className="container">
          <Link to="/">← Back to Products</Link>
          
          <h2 className='my-2'>{currentProduct.name}</h2>

          <img src={`/images/${currentProduct.image}`} alt={currentProduct.name} />

          <p>{currentProduct.description}</p>

          <p>Price: ${currentProduct.price}</p>
          <button onClick={addToCart}>Add to Cart</button>
          <button disabled={!cart.find((p) => p._id === currentProduct.id)} onClick={removeFromCart}>Remove from Cart</button>
          
        </div>
      ) : null}
      {loading ? <div>Loading...</div>: null}
      <Cart />
      </>
    )
      }
      
 
    export default ProductDetail;