import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import { ADD_PRODUCT } from '../utils/mutations';

function Account(props) {
  const { loading, data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user
  }

  console.log(user)
  
  const [formState, setFormState] = useState({ name: '', description: '', price: '', image: '' }) ;
  const [addProduct, { error }] = useMutation(ADD_PRODUCT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    var num = parseInt(formState.price);
    console.log(num);
    try {  
        const mutationResponse = await addProduct({
            variables: {
                name: formState.name,
                description: formState.description,
                price: num,
                image: formState.image,
            }
        });
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
            <h3>
                Current Products for Sale:
            </h3>
            {user.product.map((product) => (
                <div key={product._id} className='my-2'>
                    <Link to={`products/${product._id}`}>
                        <h4>{product.name}</h4>
                        <img src={product.image} alt={product.name} />
                    </Link>
                </div>
            ))}
            </div>
            <div>
                <h3>Add a Product:</h3>
                <form onSubmit={handleFormSubmit}>
                    <div className='flex-row space-between my-2'>
                        <label htmlFor='name'>Product Name:</label>
                        <input
                            name='name'
                            type='text'
                            id='name'
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
                            type='number'
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
                    <div className="flex-row flex-end">
                      <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
            <h3>
              Order History for {user.firstname} {user.lastname}
            </h3>
          </>
        ) : null}
      </div>
    </>
  );
}

export default Account;

 
