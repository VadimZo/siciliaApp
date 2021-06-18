//@ts-nocheck

import React from 'react';
import {Drawer} from "@material-ui/core";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

function CustomDrawer({toggle,stater,city}) {
    const isAuth = useSelector(({userReducer})=>!!userReducer.data);
    return (
        <Drawer anchor={'right'} open={stater} onClose={toggle}>
            <div className="header__drawer-menu">
                <ul className="header__drawer-list">
                    <li className="header__drawer-item">
                        <div className="header__drawer-item__container">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd"
                                      d="M20.0001 30C19.7971 30 19.5941 29.938 19.4201 29.814C19.1161 29.599 11.9711 24.44 12.0001 17.995C12.0001 13.589 15.5891 10 20.0001 10C24.4111 10 28.0001 13.589 28.0001 18C28.0291 24.44 20.8841 29.599 20.5801 29.814C20.4061 29.938 20.2031 30 20.0001 30ZM26.0001 18.005C26.0001 14.691 23.3091 12 20.0001 12C16.6911 12 14.0001 14.691 14.0001 18C13.9791 22.441 18.3891 26.427 20.0001 27.735C21.6121 26.428 26.0211 22.443 26.0001 18.005ZM24 18C24 20.206 22.206 22 20 22C17.794 22 16 20.206 16 18C16 15.794 17.794 14 20 14C22.206 14 24 15.794 24 18ZM22 18C22 16.897 21.103 16 20 16C18.897 16 18 16.897 18 18C18 19.103 18.897 20 20 20C21.103 20 22 19.103 22 18Z"
                                      fill="#0096B7">
                                </path>
                            </svg>
                            <div className="header__container-city">{city}</div>
                        </div>
                    </li>
                    <li className="header__drawer-item">
                        <a className="header__drawer-link" href="tel:8 (800) 737 77 78">Телефон доставки:<br/>
                            <span className="header__drawer-phone">8 (800) 737 77 78</span>
                        </a>
                    </li>
                    <li className="header__drawer-item text__sineIn">
                        {
                            isAuth ?
                                <Link style={{display:'flex',alignItems:'center'}} to="/profile">
                                    <div className="header__drawer-link">
                                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                  d="M13.002 11H27.002C28.104 11 29.002 11.897 29.002 13V27C29.002 28.103 28.105 29 27.002 29H13.002C11.899 29 11.002 28.103 11.002 27V23H13.002V27H27.002V13H13.002V17H11.002V13C11.002 11.897 11.899 11 13.002 11ZM24 20L19 24V21.001H11V19.001H19V16L24 20Z"
                                                  fill="#102327">
                                            </path>
                                        </svg>
                                    </div>
                                    <div>Личный кабинет</div>
                                </Link>
                                :
                                <Link style={{display:'flex',alignItems:'center'}} to="/sinein">
                                <div className="header__drawer-link">
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd"
                                              d="M13.002 11H27.002C28.104 11 29.002 11.897 29.002 13V27C29.002 28.103 28.105 29 27.002 29H13.002C11.899 29 11.002 28.103 11.002 27V23H13.002V27H27.002V13H13.002V17H11.002V13C11.002 11.897 11.899 11 13.002 11ZM24 20L19 24V21.001H11V19.001H19V16L24 20Z"
                                              fill="#102327">
                                        </path>
                                    </svg>
                                </div>
                                <div>Вход</div>
                                </Link>
                        }
                    </li>
                    <li className="header__drawer-item">
                        <a className="header__drawer-link" href="#">Сицилийский розыгрыш</a>
                    </li>
                    <li className="header__drawer-item">
                        <a className="header__drawer-link" href="#">Новости компании</a>
                    </li>
                    <li className="header__drawer-item">
                        <a className="header__drawer-link" href="#">Франчайзинг</a>
                    </li>
                    <li className="header__drawer-item">
                        <a className="header__drawer-link" href='#'>Условия доставки</a>
                    </li>
                    <li className="header__drawer-item">
                        <a className="header__drawer-link" href="#">Программа лояльности</a></li>
                    <li className="header__drawer-item">
                        <a className="header__drawer-link" href="#">Пиццерии</a>
                    </li>
                    <li className="header__drawer-item">
                        <a className="header__drawer-link" href="#">Вакансии</a>
                    </li>
                    <li className="header__drawer-item">
                        <a className="header__drawer-link" href="#">Запись на мероприятия</a>
                    </li>
                    <li className="header__drawer-item">
                        <a className="header__drawer-link" href="#">Оставить отзыв</a>
                    </li>
                </ul>
            </div>
        </Drawer>
    );
}

export default CustomDrawer;