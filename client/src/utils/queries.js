import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query getUser($username: String!) {
    user(username: $username) {
        _id
        username
        email
        address
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
        link
        addedBy
    }
}
`;

export const QUERY_SINGLE_PRODUCT = gql `
query getSingleProduct($productId: ID!) {
    product(productId: $productId) {
        _id
        name
        description
        price
        image
        link
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
            addedBy
        }
    }
}
`;