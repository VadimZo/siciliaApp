//@ts-nocheck
import React, {useMemo} from 'react';
import {Container, Grid} from "@material-ui/core";
import {LayoutBlock, LoadingBlock} from "../index";
import { fetchPizza} from "../../store/ducks/pizza/actionCreators";
import {useDispatch, useSelector} from "react-redux";
import Header from "../Header/Header";

 const Main = () => {
    const dispatch = useDispatch();

     React.useEffect(() => {
        dispatch(fetchPizza());
    }, [dispatch]);

    const isLoaded = useSelector(({pizzaReducer})=>pizzaReducer.isLoaded);
    const objectItems = useSelector(({pizzaReducer})=>pizzaReducer.items);
    const typesObject = useMemo(() => Object.values(objectItems).reduce((acc,item)=>{
       acc[item.types] =  acc[item.types] ? [...acc[item.types],item]:[item];
       return acc;
    },[]), [objectItems]);


     const handleAddItemToCart = (obj) => {
         dispatch({
             type: 'ADD_ITEM_TO_CART',
             payload: obj,
         });
     };


    return (
        <>
        <Header/>
        <Container style={{marginTop:20+'px'}}>
            {isLoaded ? Object.keys(typesObject).map((title,index) => (
                <div key={index}>
                    <div className="pizza-block__types-name">{title}</div>
                    <Grid container spacing={4}>
                        {typesObject[title].map((item,index)=>(
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <LayoutBlock onAddItemToCart={handleAddItemToCart} key={`${item.name}_${index}`} {...item}/>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            )):Array(12).fill(0).map((_,index)=> <LoadingBlock key={index} />)}
        </Container>
        </>

    );
}

export default Main;