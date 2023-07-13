import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import { ADD_PRODUCT } from '../utils/mutations';

function Account() {
  const { data } = useQuery(QUERY_USER);
  let user;
  console.log(data)

  if (data) {
    user = data.user;
  }

  const [formState, setFormState] = useState({ name: '', description: '', price: '', image: '' }) ;
  const [addProduct, { error }] = useMutation(ADD_PRODUCT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
        const mutationResponse = await addProduct({
            variables: {
                name: formState.name,
                description: formState.description,
                price: formState.price,
                image: formState.image,
                addedBy: user
            }
        })
        console.log(mutationResponse)
    } catch (err) {
        console.log(err)
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
        ...formState,
        [name]: value,
    });
  }

  return (
    <>
      <div className="container my-1">
        <Link to="/">← Back to Products</Link>

        {user ? (
          <>
            <h2>
                {user.firstname} {user.lastname}'s Account:
            </h2>
            <div>
            <h2>
                Current Products for Sale:
            </h2>
            {user.products.map((product) => (
                <div key={product._id} className='my-2'>
                    <Link to={`products/${product._id}`}>
                        <h3>{product.name}</h3>
                        <img src={product.image} alt={product.name} />
                    </Link>
                </div>
            ))}
            </div>
            <div>
                <h2>Add a Product:</h2>
                <form onSubmit={handleFormSubmit}>
                    <div className='flex-row space-between my-2'>
                        <label htmlFor='product-name'>Product Name:</label>
                        <input
                            name='product-name'
                            type='text'
                            id='product'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex-row space-between my-2'>
                        <label htmlFor='description'>Description:</label>
                        <textarea
                            name='description'
                            type='text'
                            id='description'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex-row space-between my-2'>
                        <label htmlFor='price'>Price:</label>
                        <input
                            name='price'
                            type='text'
                            id='price'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex-row space-between my-2'>
                        <label htmlFor='image'>Image Link:</label>
                        <input
                            placeholder='Provide a link to an image'
                            name='image'
                            type='text'
                            id='image'
                            onChange={handleChange}
                        />
                    </div>
                </form>
            </div>
            <h2>
              Order History for {user.firstname} {user.lastname}
            </h2>
            {user.orders.map((order) => (
              <div key={order._id} className="my-2">
                <h3>
                  {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                </h3>
                <div className="flex-row">
                  {order.products.map(({ _id, image, name, price }, index) => (
                    <div key={index} className="card px-1 py-1">
                      <Link to={`/products/${_id}`}>
                        <img alt={name} src={`/images/${image}`} />
                        <p>{name}</p>
                      </Link>
                      <div>
                        <span>${price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        ) : null}
      </div>
    </>
  );
}

export default Account;

 
