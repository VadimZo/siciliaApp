//@ts-nocheck
import classNames from "classnames";
import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCategory} from "../../store/ducks/pizza/actionCreators";
import {Link} from "react-router-dom";

import {
    setHiddenItems,
    setNavItems
} from "../../store/ducks/navigation/actionCreators";
import CustomDrawer from "../CustomDrawer";
import {Badge} from "@material-ui/core";


const Navcool = ({showItemsProps,numCartItems}) => {
    const [stater, setState] =  useState({right: false});
    const [showItems,setshowItems]= useState(false);
    const toggleDrawer = (anchor, open) => (event) => {
        event.stopPropagation();
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({...stater, [anchor]: open});
    };


    const city = useSelector(({navItemsReducer}) => navItemsReducer.city);

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const navListRef = useRef();
    const navMoreRef = useRef();
    const hiddenListRef = useRef();

    let prevWidth = window.innerWidth;
    let requiredToDelete;


    const items = useSelector(({navItemsReducer}) => navItemsReducer.NavNewItems);

    const hiddenItems = useSelector(({navItemsReducer}) => navItemsReducer.NavHiddenItems);

    const activeCategory = useSelector(({category}) => category);

    const onClickCategory = (i) => {
        dispatch(setCategory(i));
    }

    const handleOpen = () => {
        setOpen(!open);
    }

    const handleResize = (e) => {
        const breakWidths = [];

        navListRef.current.childNodes.forEach((item) => {
            breakWidths.push(item.offsetWidth);
        });

        const availableSpace = navListRef.current.offsetWidth;
        const numOfVisibleItems = navListRef.current.childElementCount;
        const numOfHiddenItems = hiddenListRef.current.childElementCount;

        const currentSpaceItems = breakWidths.reduce((sum, item) => {
            return sum + item;
        }, 0);


        // margin * numOfVisibleItems
        if (availableSpace < currentSpaceItems + 33 * numOfVisibleItems) {
            dispatch(setHiddenItems(navListRef.current.childNodes[numOfVisibleItems - 1].innerText, numOfVisibleItems - 1));
            requiredToDelete = breakWidths[numOfVisibleItems - 1];
            prevWidth = window.innerWidth;
        }

        if (window.innerWidth > prevWidth + (33 + requiredToDelete || 33 * 2.5)) {
            //6 === NavHiddenItems +1
            if (numOfHiddenItems === 5) return;
            dispatch(setNavItems(hiddenListRef.current.childNodes[numOfHiddenItems - 1].innerText, numOfHiddenItems - 1));
        }
    };

    const checkWindow = () => {
        const breakWidths = [];
        const numOfItems = navListRef.current.childElementCount;

        navListRef.current.childNodes.forEach((item) => {
            breakWidths.push(item.offsetWidth);
        });

        let availableSpace = navListRef.current.offsetWidth;

        const check = (items) => {

            const currentSpaceItems = breakWidths.reduce((sum, item) => {
                return sum + item;
            }, 0);

            const requiredToDelete = breakWidths[items];

            delete breakWidths[items];

            if (availableSpace > currentSpaceItems + 33 * items + requiredToDelete || items == 0) return;
            dispatch(setHiddenItems(navListRef.current.childNodes[items].innerText, items));

            check(items - 1);
        }

        check(numOfItems - 1);
    };

    const handleScroll = () => {
        console.log(showItemsProps);
        if (window.pageYOffset >= 145) {
            setshowItems(true);
            return;
        }
        setshowItems(false);
    }
    useEffect(() => {
        if (showItemsProps===undefined) {
         window.addEventListener('scroll', handleScroll);
            return () => {
                window.removeEventListener('scroll', handleScroll)
            };
        } 
    }, []);


    useEffect(() => {
        checkWindow();

        //const more = navListRef.current.childElementCount > 1 ? "Ещё блюда" : "Категории";
        window.addEventListener('resize', handleResize, false);
        return () => {
            window.removeEventListener('resize', handleResize, false)
        }
    }, []);

    return (
        <>
            <nav className="header__nav">
                <div className="header__nav-wrapper">
                    {(showItemsProps || showItems) &&
                    <Link to="/"><svg className="sliceOfPizza" width="40" height="34" viewBox="0 0 40 34"
                         fill="none">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M13.1415 16.5875C15.9428 15.2644 13.8157 10.7434 11.0141 12.0646C8.2128 13.3874 10.3397 17.9091 13.1415 16.5875C11.9481 17.1504 14.3346 16.024 13.1415 16.5875ZM18.6284 23.9504C19.9764 24.6947 21.369 25.4077 22.8348 25.891C22.3927 23.9107 21.9505 21.9301 21.5086 19.9499C21.4193 19.5501 21.33 19.1504 21.2409 18.7506C21.2409 18.7506 20.3003 18.6149 19.9594 18.4508C19.0891 18.0317 18.6654 16.9899 18.9917 16.08C19.1364 15.677 19.4157 15.3289 19.7793 15.1027C19.8475 15.0604 20.3718 14.8563 20.3667 14.8333C19.5583 11.212 18.7502 7.59128 17.9421 3.97024C15.5553 4.81002 13.1608 5.71095 10.963 6.97972C9.10922 8.0501 7.46829 9.41254 5.95242 10.9188C5.46589 11.4026 4.99067 11.8979 4.52171 12.399C4.23556 12.7048 4.6548 13.1105 4.8805 13.4109C5.54152 14.2898 6.34277 15.0651 7.15148 15.805C9.40667 17.8679 11.887 19.6963 14.4295 21.3851C16.0028 18.6748 20.0344 21.2732 18.6284 23.9504C18.9792 23.283 18.6284 23.9504 18.6284 23.9504ZM39.9291 11.3845C40.3233 11.8595 38.9561 13.5712 38.7167 13.9543C38.2784 14.6562 37.8392 15.3576 37.4006 16.0592C36.1798 18.0124 34.8643 19.8939 33.8883 21.9848C32.691 24.5489 31.5301 27.1318 30.258 29.6597C29.7727 30.6242 29.2722 31.5908 28.7532 32.5266C28.188 33.5454 27.0235 33.6256 26.2354 33.2468C25.7828 33.0961 25.2951 32.9085 24.8854 32.6603C24.9261 32.6812 24.9672 32.7017 25.0086 32.7217C24.9714 32.7041 24.9175 32.6853 24.8839 32.6615C24.3908 32.3115 23.3543 31.7167 22.6951 31.1567C21.928 30.5058 21.1658 29.856 20.3747 29.2337C14.8772 24.9102 9.28656 20.6999 3.74534 16.4327C3.51726 17.4011 2.79223 17.6192 1.90254 17.479C1.19448 17.3677 0.215457 16.8904 0.0415685 16.1341C-0.129938 15.3886 0.259823 14.6118 0.651966 13.9963C1.1111 13.2759 1.52588 12.5131 2.01866 11.8153C4.01749 8.98274 6.66543 6.63822 9.51435 4.68928C12.3859 2.72453 15.6427 1.08197 19.142 0.729055C20.6632 0.575717 22.6698 0.610919 23.2051 2.30449C23.4159 2.97154 23.3585 3.85607 22.9624 4.44824C22.4801 5.16839 21.5517 4.99268 20.8156 4.87544C21.2245 6.4458 21.6476 8.00842 22.09 9.56954C23.0143 12.8284 24.0231 16.0637 24.8833 19.3411C25.3531 21.1313 25.8251 22.9186 26.2053 24.7306C26.3976 25.647 26.5727 26.5644 26.7261 27.4883C26.8023 27.9483 26.8598 28.4104 26.9211 28.8725C26.9544 29.1234 26.9092 29.7931 27.0941 29.9106C26.9262 23.8058 26.8732 17.6949 27.1343 11.5919C27.1665 10.835 27.1641 10.9379 26.4786 10.8487C26.063 10.7944 26.0972 10.8711 26.1565 10.4162C26.3223 9.14413 26.4876 7.87208 26.6531 6.60004C26.8044 5.43897 26.9553 4.2779 27.1066 3.11712C27.1927 2.45664 27.2784 1.79615 27.3642 1.13597C27.4413 0.545288 27.3511 0.49875 27.8998 0.570646C27.5205 3.48555 27.1411 6.40046 26.7618 9.31537C27.6229 9.42754 27.4925 9.42545 27.5973 8.62207C27.728 7.61612 27.859 6.60988 27.9897 5.60364C28.2041 3.9578 28.4182 2.31165 28.6323 0.665811C28.8556 0.695345 29.1013 0.612411 29.0688 0.862703C29.0316 1.1485 28.9944 1.43399 28.9571 1.71978C28.8282 2.71111 28.6993 3.70243 28.5701 4.69376C28.3628 6.2862 28.1556 7.87835 27.9484 9.47049C28.8098 9.58207 28.6796 9.58057 28.7842 8.7766C28.9152 7.77065 29.0459 6.76441 29.1769 5.75847C29.391 4.11233 29.6054 2.46648 29.8194 0.82064C30.3676 0.893132 30.2679 0.915506 30.1913 1.50529C30.1053 2.16577 30.0195 2.82596 29.9338 3.48615C29.7828 4.64722 29.6319 5.80829 29.4809 6.96906C29.3153 8.24111 29.1498 9.51315 28.9842 10.7852C28.925 11.2416 28.9771 11.1757 28.5599 11.1208C28.331 11.0907 28.1017 11.0609 27.8724 11.0307C27.1212 17.1779 27.4776 23.3869 27.9701 29.5395C29.2361 27.2562 30.5838 25.022 31.913 22.7757C32.2247 22.2494 32.5362 21.7229 32.8476 21.1963C33.0355 20.8789 33.2264 20.4944 33.0942 20.1218C32.9721 19.7778 32.7619 19.5681 32.8521 19.1746C33.0135 18.4691 38.8364 10.0653 39.9291 11.3845C39.841 11.278 40.0452 11.5241 39.9291 11.3845ZM26.2345 33.247C26.2854 33.2637 26.3343 33.2956 26.3816 33.3132C26.3328 33.2914 26.2836 33.269 26.2345 33.247C26.4024 33.3269 26.2449 33.2502 26.2345 33.247Z"
                              fill="#59BBD0">
                        </path>
                    </svg>
                    </Link>
                    }
                    <div className="header__nav-akcia">Акции</div>
                </div>

                <ul ref={navListRef} className="header__nav-list">
                    {
                        items.map((item, i) => (
                            <li to="#" onClick={() => onClickCategory(i)} className={classNames("header__nav-item", {
                                "activeCategory": activeCategory === i,
                                "shring0": (showItemsProps || showItems) == true,
                            })}>
                                <div>{item}</div>
                            </li>
                        ))
                    }
                    {(showItemsProps || showItems) &&
                    <div ref={navMoreRef} onClick={handleOpen} className={classNames("header__nav-morew", {
                        "open": open === true,
                    })}>
                        Ещё блюда
                        <ul ref={hiddenListRef} className='hidden-links'>
                            {open && <div className="hidden-links__triangle"></div>}
                            {hiddenItems.map(item => (
                                <li>
                                    <div>{item}</div>
                                </li>
                            ))
                            }
                        </ul>
                    </div>}
                </ul>
                {(showItemsProps || showItems) ? null :
                    <div ref={navMoreRef} onClick={handleOpen} className={classNames("header__nav-more", {
                        "open": open === true,
                    })}>
                        Ещё блюда
                        <ul ref={hiddenListRef} className='hidden-links'>
                            {open && <div className="hidden-links__triangle"></div>}
                            {hiddenItems.map(item => (
                                <li>
                                    <div>{item}</div>
                                </li>
                            ))
                            }
                        </ul>
                    </div>}
                {(showItemsProps || showItems) && <div className="header__container-right">
                    <Link to="/cart" className="header__right-cart">
                        <Badge badgeContent={numCartItems} color="secondary">
                            <svg className="d1lJvbJASHVpsaJuNPRGX" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd"
                                      d="M27.5783 16.748H28.9983C29.3103 16.748 29.6033 16.894 29.7943 17.14C29.9843 17.388 30.0463 17.71 29.9643 18.01L27.1653 28.273C26.9273 29.143 26.1333 29.748 25.2353 29.748H14.7623C13.8633 29.748 13.0693 29.143 12.8323 28.275L10.0333 18.011C9.95127 17.711 10.0143 17.389 10.2033 17.141C10.3933 16.894 10.6863 16.748 10.9983 16.748H12.4183L16.1303 10.252L17.8673 11.244L14.7213 16.748H25.2753L22.1303 11.244L23.8663 10.252L27.5783 16.748ZM14.7623 27.748H25.2343L27.6883 18.748H12.3083L14.7623 27.748ZM18.998 20.7479H16.998V25.7479H18.998V20.7479ZM22.998 20.7479H20.998V25.7479H22.998V20.7479Z"
                                      fill="#102327">
                                </path>
                            </svg>
                        </Badge>
                    </Link>
                    <div onClick={toggleDrawer('right', true)} style={{marginLeft: 10 + "px"}}
                         className="header__right-burger">
                        <svg className="header__right-icon" width="16" height="12" viewBox="0 0 16 12" fill="none">
                            <path d="M0 0H16V2H0V0ZM0 5H16V7H0V5ZM0 10H16V12H0V10Z" fill="black">
                            </path>
                        </svg>
                    </div>
                </div>}
            </nav>

            <CustomDrawer stater={stater.right} setState={setState} city={city} toggle={toggleDrawer('right', false)}/>
        </>
    )
}
export default Navcool;
