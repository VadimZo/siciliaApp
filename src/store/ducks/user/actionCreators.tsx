//@ts-nocheck
export const fetchSineUp = (payload) => ({
    type: 'FETCH_SINE_UP',
    payload,
});
export const fetchSineIn = (payload) => ({
    type: 'FETCH_SINE_IN',
    payload,
});
export const fetchUserData = () => ({
    type: 'FETCH_USER_DATA',
});
export const setUserLoadingStatus = (payload) => ({
    type: 'SET_USER_LOADING_STATUS',
    payload,
  });
  export const setUserData = (payload) => ({
    type: 'SET_USER_DATA',
    payload,
  });
