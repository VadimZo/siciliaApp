//@ts-nocheck
export const setHiddenItems = (payload,i) => ({
    type: 'SET_HIDDEN_ITEMS',
    payload,
    i
});
export const setNavItems = (payload,i) => ({
    type: 'SET_NAV_ITEMS',
    payload,
    i
});
export const setCity = (payload) => ({
    type: 'SET_CITY',
    payload
});
export const fetchIpGeoRequest = () => ({
    type: 'FETCH_IP_GEO_REQUEST',
});

