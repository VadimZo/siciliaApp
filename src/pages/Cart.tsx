//@ts-nocheck

//@ts-nocheck
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Button, Container} from "@material-ui/core";
import Navcool from "../components/Header/Navcool";
import HeaderTopMobile from "../components/Header/HeaderMobile/HeaderTopMobile";
import {useDispatch, useSelector} from "react-redux";
import './cart.scss';
import {CartItemRemove} from "../store/ducks/pizza/actionCreators";
import {Link} from "react-router-dom";

const screenWidth= window.innerWidth;


function Cart() {

    const resultObj = {};
    const dispatch = useDispatch();
    const items = useSelector(({pizzaReducer})=>pizzaReducer.cartItems);
    const totalPrice = useSelector(({pizzaReducer})=>pizzaReducer.totalPrice);

    const [numPerson, setNumPerson] = useState(1);

    const resulter = items.reduce((acc, item) => {
        acc[item.name] = acc[item.name] ? [...acc[item.name], item] : [item];
        return acc;
    }, {});


    Object.keys(resulter).map((name) => {

        const elemes = [];
        let i = 0;

        const sortItems = Object.values(resulter[name]).sort((prev, next) => {
            if (prev.name === next.name) {
                return prev.price - next.price;
            }
        });
        sortItems.forEach((elem, index) => {
            const firstItemFromCurrentSize = elemes[i] ? elemes[i][0] : null;

            if (
                firstItemFromCurrentSize &&
                JSON.stringify(sortItems[index - 1]) !==
                JSON.stringify(sortItems[index])
            ) i++;

            if (!elemes[i]) {
                elemes[i] = [];
                elemes[i] = [...elemes[i],elem];
            }

            if (
                JSON.stringify(sortItems[index - 1]) ===
                JSON.stringify(sortItems[index])
            ) {
               elemes[i] = [...elemes[i],elem];
            }
        });
        console.log(elemes);
        resultObj[name] = elemes;
    });
 //   const cartSortedItems=Object.values(resulter).filter((v,i,a)=>a.findIndex(t=>(JSON.stringify(t) === JSON.stringify(v)))===i);
    //Object.values(resulter).filter((v,i,a)=>a.findIndex(t=>(t.name === v.name && t.price===v.price)===i)

    // const uniqueArray = Object.values(resulter).filter((item, index) => {
    //   return index ===Object.values(resulter).findIndex(obj => {
    //     return JSON.stringify(obj) === JSON.stringify(item);
    //   });
    // });



    const getSum=(arr)=>{
       return arr.reduce((result,item)=>{
            return result + item.price;
        },0)
    }

    const plusItem=(payload)=>{
        dispatch({
            type: 'PLUS_ITEM_TO_CART',
            payload
        });
    }
    const minusItem= (payload) => {
        dispatch({
            type: 'MINUS_ITEM_TO_CART',
            payload
        })
    };

    const removeCartItem=(payload)=>{
        dispatch(CartItemRemove(payload));
    }

    return (
        <>
            {
                screenWidth >= 615 ?<div className="navcool__container">
                        <Container>
                            <Navcool showItemsProps={true} numCartItems={items.length}/>
                        </Container>
                    </div>
                    :<HeaderTopMobile numCartItems={items.length}/>
            }

            <div className="cart">
                <h1>Корзина</h1>
                { items.length >0 ?
                    <ul className="cart__items">
                        {
                            Object.values(resultObj).map((item,index)=>{
                                return item.map(el=>{
                                    return(
                                        <li className="cart__items-list">
                                            <div className="img" style={{backgroundImage: `url(${el[0].imageUrl})`,backgroundSize:'cover',backgroundRepeat:'no-repeat'}}/>
                                            <div className="cart__item-info">
                                                <div className="cart__title-wrapper">
                                                    <h3 className="cart__item-title">{el[0].name}</h3>
                                                    <svg onClick={()=>removeCartItem(el[0])} className="cart__trash" width="24" height="24" viewBox="0 0 24 24"
                                                         fill="none">
                                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                                              d="M7.41667 21.1667C6.40558 21.1667 5.58333 20.3444 5.58333 19.3333V8.33331H3.75V6.49998H6.5H7.41667V4.66665C7.41667 3.65556 8.23892 2.83331 9.25 2.83331H14.75C15.7611 2.83331 16.5833 3.65556 16.5833 4.66665V6.49998H17.5H20.25V8.33331H18.4167V19.3333C18.4167 20.3444 17.5944 21.1667 16.5833 21.1667H7.41667ZM14.75 4.66665H9.25V6.49998H14.75V4.66665ZM15.6667 8.33331H8.33333H7.41667V19.3333H16.5842L16.5833 8.33331H15.6667ZM11.0814 10.5504H9.24805V17.8837H11.0814V10.5504ZM14.748 10.5504H12.9147V17.8837H14.748V10.5504Z"
                                                              fill="#DFDFDF"></path>
                                                    </svg>
                                                </div>
                                                {el[0].size ? <div className="cart__weight-size">{el[0].size}см, {el[0].weight}г</div> : <div className="cart__weight-size">{el[0].weight}г</div>}
                                                <p>{el[0].description} </p>
                                                <div className="cart__item-bottom">
                                                    <div className="cart__bottom-wrapper">
                                                        <div onClick={()=>minusItem(el[0])} className="cart__bottom-minus">
                                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                                <path d="M13 9H3V7H13V9Z" fill="#0096B7"></path>
                                                            </svg>
                                                        </div>
                                                        <div className="cart__bottom-number">{el.length}</div>
                                                        <div onClick={()=>plusItem(el[0])} className="cart__bottom-plus">
                                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                                <path d="M3 7H7V3H9V7H13V9H9V13H7V9H3V7Z" fill="#0096B7"></path>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <div className="cart__bottom-price">
                                                        {getSum(el)} ₽
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    )})
                            })
                        }
                    </ul>
                    :
                    <>
                        <h2>Вы не добавили ни одного блюда в корзину</h2>
                        <Link to='/'>
                            <Button variant="contained" color="primary">Вернуться в меню</Button>
                        </Link>
                    </>
                }
            </div>
            {items.length >0 && <div className="cart__bottom">
                <div className="cart__person-number">
                    <div>Количество персон</div>
                    <div className="cart__bottom-wrapper">
                        <div onClick={()=>setNumPerson(prev=> prev>1 ?  prev-1 :  1)} className="cart__bottom-minus">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M13 9H3V7H13V9Z" fill="#0096B7"></path>
                            </svg>
                        </div>
                        <div className="cart__bottom-number">{numPerson}</div>
                        <div onClick={()=>setNumPerson(prev=>prev+1)} className="cart__bottom-plus">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M3 7H7V3H9V7H13V9H9V13H7V9H3V7Z" fill="#0096B7"></path>
                            </svg>
                        </div>
                    </div>
                </div>
                <h2 className="totalPrice">{totalPrice}₽</h2>
                <Button className="cart__bottom-btn" variant="contained" color="secondary">Оформить заказ</Button>
            </div>}
        </>

    );
}

export default Cart;