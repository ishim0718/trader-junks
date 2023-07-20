import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query getUser {
    user{
        _id
        username
        firstname
        lastname
        email
        address
        product{
        _id
        name
        description
        }
    }
}
`;

export const QUERY_PRODUCTS = gql`
query getProducts {
    products {
        _id
        name
        description
        price
        image
        addedBy
    }
}
`;

export const QUERY_SINGLE_PRODUCT = gql`
query getSingleProduct($productId: ID!) {
    product(productId: $productId) {
        _id
        name
        description
        price
        image
        addedBy
    }
}
`;

export const QUERY_ME = gql`
query getMe	{
    user {
      username
      firstname
      lastname
    }
	}
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;
