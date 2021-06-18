//@ts-nocheck

const initialPizzaState = {
    items: [],
    cartItems:[],
    totalPrice: 0,
    totalCount: 0,
    currentItem: null,
    category: null,
    isLoaded: '',
};



export const pizzaReducer=(state=initialPizzaState, action)=>{
    switch (action.type) {
        case 'FETCH_PIZZA_REQUEST': {
            return {
                ...state,
                isLoaded: false,
            }
        }
        case 'SET_PIZZA': {
            return {
                ...state,
                items: action.payload,
                isLoaded: true,
            }
        }
        case 'SET_CATEGORY': {
            return {
                ...state,
                category: action.payload,
            }
        }
        case 'FETCH_IP_GEO_REQUEST': {
            return {
                ...state,
                category: action.payload,
            }
        }
        case 'ADD_ITEM_TO_CART': {
             const currentCartItems = state.cartItems ? [...state.cartItems,action.payload] : [action.payload];
            const totalPrice = currentCartItems.reduce((result,item)=>{
               return result + item.price ;
            },0)
            return {
                ...state,
                cartItems: currentCartItems,
                totalPrice:totalPrice,
                totalCount: state.totalCount+1,
            }
        }
        case 'PLUS_ITEM_TO_CART': {
            const currentCartItems = [...state.cartItems,action.payload];
            const totalPrice = state.totalPrice + action.payload.price;
            return {
                ...state,
                cartItems: currentCartItems,
                totalPrice:totalPrice
            }
        }
        case 'MINUS_ITEM_TO_CART': {
            const index = state.cartItems.findIndex(item=>JSON.stringify(item)===JSON.stringify(action.payload));
            const totalPrice = state.totalPrice - action.payload.price;
             return {
                ...state,
                cartItems:  state.cartItems.length >= 1 ? [...state.cartItems.slice(0, index),...state.cartItems.slice(index+1)] : state.cartItems=[],
                totalPrice:totalPrice,
             }
        }
        case 'REMOVE_CART_ITEM': {
            const newCartItems= state.cartItems.filter(item=>{
                return JSON.stringify(item)!==(JSON.stringify(action.payload));
            });

            const deletedItems= state.cartItems.filter(item=>{
                return (item.name===action.payload.name && item.price===action.payload.price);
            });

            const totalPrice=deletedItems.reduce((result,item)=>{
                return result - item.price;
            },state.totalPrice);

             return {
                ...state,
                 cartItems: newCartItems,
                 totalPrice: totalPrice
             }
        }
        default: return state
    }
}