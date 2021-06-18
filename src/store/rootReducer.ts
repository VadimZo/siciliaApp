//@ts-nocheck
import { combineReducers } from 'redux';
import {pizzaReducer} from "./ducks/pizza/reducer";
import {navItemsReducer} from "./ducks/navigation/reducer";
import {userReducer} from "./ducks/user/reducer";

export const rootReducer = combineReducers({pizzaReducer, navItemsReducer,userReducer});
