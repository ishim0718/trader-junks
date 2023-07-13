import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query {
    user {
        _id
        username
        email
        address
        firstname
        lastname
        products{
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
query me {
    me {
        _id
        username
        email
        address
        products {
            _id
            name
            description
            price
            image
            link
        }
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
