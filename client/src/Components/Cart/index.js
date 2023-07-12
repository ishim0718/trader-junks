// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { loadStripe } from '@stripe/stripe-js';
// import { useLazyQuery } from '@apollo/react-hooks';

// import CartItem from '../CartItem';
// import Auth from '../../utils/auth';

// import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
// import { QUERY_CHECKOUT } from '../../utils/queries';
// import { idbPromise } from '../../utils/helpers';

// import './style.css';

// const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

// const Cart = () => {
//     const dispatch = useDispatch();
//     const cart = useSelector(state => state.cart);
//     const cartOpen = useSelector(state => state.cartOpen);

//     const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

//     useEffect(() => {
//         async function getCart() {
//             const cart = await idbPromise('cart', 'get');
//             dispatch({
//                 type: ADD_MULTIPLE_TO_CART,
//                 products: [...cart]
//             });
//         };

//         if (!cart.length) {
//             getCart();
//         }
//     }, [cart.length, dispatch]);

//     function toggleCart() {
//         dispatch({ type: TOGGLE_CART });
//     };

//     useEffect(() => {
//         if (data) {
//             stripePromise.then(res => {
//                 res.redirectToCheckout({ sessionId: data.checkout.session });
//             });
//         }
//     }, [data]
//     );

//     function calculateTotal() {
//         let sum = 0;
//         cart.forEach(item => {
//             sum += item.price * item.purchaseQuantity;
//         });
//         return sum.toFixed(2);
//     };

//     function submitCheckout() {
//         const productIds = [];

//         cart.forEach(item => {
//             for (let i = 0; i < item.purchaseQuantity; i++) {
//                 productIds.push(item._id);
//             }
//         });

//         getCheckout({
//             variables: { products: productIds }
//         });
//     };

//     if (!cartOpen) {
//         return (
//             <div className="cart-closed" onClick={toggleCart}>
//                 <span role="img" aria-label="cart">🛒</span>
//             </div>
//         );
//     }

//     return (
//         <div className="cart">
//             <div className="close" onClick={toggleCart}>[close]</div>
//             <h2>Shopping Cart</h2>
//             <div>
//                 {cart.length ? (
//                     <div>
//                         {cart.map(item => (
//                             <CartItem key={item._id} item={item} />
//                         ))}
//                         <div className="flex-row space-between">
//                             <strong>Total: ${calculateTotal()}</strong>
//                             {
//                                 Auth.loggedIn() ?
//                                     <button onClick={submitCheckout}>
//                                         Checkout
//                                     </button>
//                                     :
//                                     <span>(log in to check out)</span>
//                             }
//                         </div>
//                     </div>
//                 ) : (
//                     <h3>
//                         <span role="img" aria-label="warning">
//                         ⚠️
//                         </span>
//                         You haven't added anything to your cart yet!
//                     </h3>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Cart;