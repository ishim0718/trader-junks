import React from "react";
import { Link } from 'react-router-dom'

const ProductList = (products) => {
  if (!products.length) {
    return <h3>No Products Have Been Listed Yet!</h3>
  }

return (
  <div>
  {products.map((product) => (
    <div key={product._id} className="card mb-3">
      <Link to={`/products/${product._id}`}>
      <h3>{product.name}</h3>
      <img src={product.image} alt={product.description} />
      </Link>
      <p>Price: {product.price}</p>
      <p>Added By: {product.addedBy}</p>
    </div>
  ))}
  </div>
)
  }
export default ProductList