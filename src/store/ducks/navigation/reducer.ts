//@ts-nocheck
const initialNavItemsState = {
    NavNewItems:["Постное меню","Пицца","Комбо","Роллы","Закуски","Салаты","Супы","Гарниры"],
    NavHiddenItems:["Бизнес Ланч","Напитки","Десерты","Соусы","Детское меню"],
    city:"Москва",
    isLoaded: '',
    mobileItems:["Постное меню","Пицца","Комбо","Роллы","Закуски","Салаты","Супы","Гарниры","Бизнес Ланч","Напитки","Десерты","Соусы","Детское меню"]
};

export const navItemsReducer=(state=initialNavItemsState, action)=>{
    switch (action.type) {
        case 'SET_HIDDEN_ITEMS':{
            return{
                ...state,
                NavHiddenItems: [...state.NavHiddenItems, action.payload],
                NavNewItems: state.NavNewItems.slice(0,action.i),
            }
        }
        case 'SET_NAV_ITEMS':{
            return{
                ...state,
                NavNewItems: [...state.NavNewItems, action.payload],
                NavHiddenItems: state.NavHiddenItems.slice(0,action.i),
            }
        }
        case 'SET_CITY':{
            return{
                ...state,
                city:action.payload
            }
        }
        case 'TRANSLATE_CITY_REQUEST':{
            return{
                ...state,
                city:action.payload
            }
        }
        default: return state
    }
}