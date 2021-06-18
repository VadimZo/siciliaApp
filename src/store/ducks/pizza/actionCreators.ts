//@ts-nocheck
export const fetchPizza = () => ({
    type: 'FETCH_PIZZA_REQUEST',
});

export const setPizza = (payload) => ({
    type: 'SET_PIZZA',
    payload
});

export const setCategory = (payload) => ({
    type: 'SET_CATEGORY',
    payload
});
export const CartItemRemove = (payload) => ({
    type: 'REMOVE_CART_ITEM',
    payload
});