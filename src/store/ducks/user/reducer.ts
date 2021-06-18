//@ts-nocheck
const initialUserState={
    data: undefined,
    status: 'NEVER',
  };
  
  export const userReducer = (state=initialUserState, action) => {
    switch (action.type) {
      case 'SET_USER_LOADING_STATUS':
        return{
            ...state,
            status: action.payload,
        }
      case 'SET_USER_DATA':
        return{
            ...state,
            data: action.payload,
            status: 'SUCCESS',
        }
      default: return state
  }
};