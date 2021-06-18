//@ts-nocheck
import React, {useEffect, useRef} from 'react';
import './header.scss';
import {useDispatch, useSelector} from "react-redux";
import {fetchIpGeoRequest} from "../../store/ducks/navigation/actionCreators";
import HeaderMobile from "./HeaderMobile/HeaderMobile";
import HeaderComputer from "./HeaderComputer";


function Header(){

    const dispatch=useDispatch();
    const numCartItems = useSelector(({pizzaReducer})=>pizzaReducer.cartItems.length);
    const screenWidth= window.innerWidth; //615

   useEffect(() => {
       dispatch(fetchIpGeoRequest());
   },[dispatch]);

    return (
        <>
            {
                screenWidth <= 615 ? <HeaderMobile numCartItems={numCartItems} /> :<HeaderComputer numCartItems={numCartItems} />
            }
        </>

    );
}





export default Header;