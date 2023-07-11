import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

function Signup(props) {
  const [formState, setFormState] = useState({ 
    email: '', 
    password: '', 
    firstname: '',
    lastname: '',
    addressLines: '',
    locality: '',
    administrativeArea: '',
    postalCode: '',
    });
  const formattedAddress = "";
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

      await fetch("https://addressvalidation.googleapis.com/v1:validateAddress?key=AIzaSyDSUiY4jXZTrr3I1lYuikW54okCCCgcXyY", {
        method: "POST",
        body: JSON.stringify({
          address: {
            regionCode: "US",
            addressLines: addressLines,
            locality: locality,
            administrativeArea: administrativeArea,
            postalCode: postalCode,
          },
          enableUspsCass: true
        }),
      })
      .then(res => res.json())
      .then(json[1].formattedAddress = formattedAddress);

    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
        address: formattedAddress,
      }
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container my-1">
      <Link to="/login">← Go to Login</Link>

      <h2>Signup</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="firstName">First Name:</label>
          <input
            placeholder="First"
            name="firstName"
            type="firstName"
            id="firstName"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="lastName">Last Name:</label>
          <input
            placeholder="Last"
            name="lastName"
            type="lastName"
            id="lastName"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Address:</label>
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="addressLines">Street Line:</label>
          <input
            name="addressLines"
            type="text"
            id="addressLines"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="locality">City:</label>
          <input
            name="locality"
            type="text"
            id="locality"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="administrativeArea">State:</label>
          <input
            name="administrativeArea"
            type="text"
            id="administrativeArea"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="postalCode">Zip Code:</label>
          <input
            name="postalCode"
            type="adress"
            id="postalCode"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
