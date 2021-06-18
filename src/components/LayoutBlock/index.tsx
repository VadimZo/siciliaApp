//@ts-nocheck
import React, {useEffect, useRef} from 'react';
import classNames from 'classnames';
import './layoutBlock.scss';
import {Button, Divider, Modal} from "@material-ui/core";
import CarouselMini from "./CarouselMini";
import Notification from "../Notification";
function LayoutBlock({_id, imageUrl,name,description,price,weight,badge,sizes,carousel,onAddItemToCart,types}) {

    const [notificationObj,setNotificationObj] = React.useState({});
    const [open, setOpen] = React.useState(false);

    const [openWindow, setOpenWindow] = React.useState(false);
    const [roundNumber, setRoundNumber]=React.useState(0);
    const modalRef = useRef();
    const btnRef = useRef();


    const handleOutsideClick= (e)=>{
        const path = e.path || (e.composedPath && e.composedPath())
            const modalBlock = modalRef.current;
            if (!path.includes(modalBlock)) {
                const btnOption = btnRef.current;
                if (!path.includes(btnOption)) setOpenWindow(false);
            }
    }

    const handleOpen =  ()=>{
        setOpenWindow(true);
    }

    useEffect(()=>{
        document.body.addEventListener('click',handleOutsideClick,false);
        return () => {
            document.removeEventListener('click', handleOutsideClick, false);
        }
    },[])

    const handleRoundClick = (i)=>{
        setRoundNumber(i);
    }


    const weightItems =weight && weight.map((item,i)=>{
        if(i===weight.length-1){
            return item + ' г ';
        }
        
        return item + ' г |' + ' ';
    })

    const onAddPizza=()=>{
        const obj={
            _id,
            name,
            imageUrl,
            price:price[roundNumber],
            size:sizes[roundNumber],
            weight:weight[roundNumber],
            description:description,
            types
        }
        setNotificationObj({text:'Товар успешно добавлен!',type:"success"})
        setOpen(true);
        onAddItemToCart(obj);
    }

return (
    <div className="pizza-block">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <div className="pizza-block__badge">
            {
               badge && badge.map((item,i) => (
                    <><span key={i}  className={classNames( {
                        'tomato': item ==="Острое" || item ==="HOT",
                        'green': item ==="NEW",
                        'orange': item ==="ХИТ",
                    })} >{item}</span><br/></>
                ))
            }
        </div>
        <h4 className="pizza-block__title">{name}</h4>
        <div className="pizza-block__description">
            {description}
        </div>
        <div className="pizza-block__weight">
            {weightItems}
        </div>
        <div className="pizza-block__bottom">
            {price && <div className="pizza-block__price">от {price[0]} ₽</div>}
            <Button ref={btnRef} onClick={handleOpen} className="button--add" outline="true">
                <span className="pizza-block__option">Выбрать</span>
            </Button>
        </div>
         <Modal
            disableScrollLock={true}
            className="layout-modal"
            open={openWindow}
            ref={modalRef}
            id={_id}
        >

            <div className="layout-modal__container">
                <div className="layout-modal__top">
                    <div className="right__title">{name}</div>
                    <div onClick={()=>setOpenWindow(false)} className="close"/>
                </div>
                <div className="layout-modal__left">
                    <CarouselMini roundNumber={roundNumber} carousel={carousel}/>
                </div>
                <div className="layout-modal__right">
                    <div className="right__title">{name}</div>
                    <div className="right__description">{description}</div>
                    <Divider/>
                    { sizes?.length>1 &&<span className="right__span-option">Выберите вариант:</span>}
                    <div className="right__option-container">
                        {
                           sizes?.length>1 && sizes.map((item, i) => (
                                <div key={`${item.name}_${i}`} className="right__item">
                                    <div className="right__container">
                                        <div onClick={()=>handleRoundClick(i)} className={classNames('right__first-round',
                                            {
                                                activeRound1: roundNumber === i,
                                        })}>
                                            <div className={classNames('right__second-round',{
                                                activeRound2: roundNumber === i,
                                            })}>
                                                <div className="right__sizes">{item} см</div>
                                                <div className="right__weight">{weight[i]}г</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <Divider/>
                    <div className="layout-modal__bottom">
                       {price && <div className="bottom__price">{price[roundNumber]} ₽</div>}
                        <Button onClick={onAddPizza} className="button--add">В корзину</Button>
                    </div>
                </div>
            </div>
        </Modal>
        {Object.keys(notificationObj).length !== 0 ? <Notification type={notificationObj.type} text={notificationObj.text} open={open} setOpen={setOpen} /> : null}
    </div>


);
}

export default LayoutBlock;