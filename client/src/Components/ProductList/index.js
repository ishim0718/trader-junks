import React, { useEffect } from 'react';
import ProductItem from '../ProductItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

function ProductList({filteredItems, query}) {
  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    } else if (!loading) {
      idbPromise('products', 'get').then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      // console.log(`filtered items: ${JSON.stringify(products)}`)
      if (typeof(filteredItems) === 'undefined' || typeof(filteredItems) === null || filteredItems.length === 0 || query === "") {
        return state.products;
      } else {
        console.log(`query: ${query} & filteredItems: ${JSON.stringify(filteredItems)}`)
        return filteredItems;
      }
    }

    return state.products.filter(
      (product) => product.category._id === currentCategory
    );
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {state.products.length ? (
        <span className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              addedBy={product.addedBy}
            />
          ))}
        </span>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <div>Loading...</div> : null}
    </div>
  );
}

export default ProductList;
