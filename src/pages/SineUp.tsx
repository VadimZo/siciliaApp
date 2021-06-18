//@ts-nocheck
import React from 'react';
import {Button, Container} from "@material-ui/core";
import FormInput from "../components/CustomTextField";
import {useForm} from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import './sineIn.scss';
import {Link,useHistory} from "react-router-dom";
import Navcool from "../components/Header/Navcool";
import HeaderTopMobile from "../components/Header/HeaderMobile/HeaderTopMobile";
import {useDispatch, useSelector} from 'react-redux';
import {fetchSineUp} from "../store/ducks/user/actionCreators";
import Notification from "../components/Notification";

const screenWidth= window.innerWidth;

function SineUp() {

    const history= useHistory();
    const loadingStatus = useSelector(({userReducer})=>userReducer.status);
    const [notificationObj,setNotificationObj] = React.useState({});

    const [open, setOpen] = React.useState(false);

    const RegisterFormSchema = yup.object().shape({
        phone: yup.string().matches(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/, { message:"Неверный формат номера", excludeEmptyString: false }).required('Введите номер телефона'),
        password: yup.string().min(6, '​Минимальная длина пароля 6 символов').required('Введите пароль'),
        password2: yup.string().oneOf([yup.ref('password')], 'Пароли не соответствуют'),
    });
  


    const dispatch = useDispatch();
    const { handleSubmit, control, formState:{ errors }} = useForm({
        resolver: yupResolver(RegisterFormSchema)
    });
    const onSubmit = (data) => {
        dispatch(fetchSineUp(data));
    };

    React.useEffect(() => {
        if (loadingStatus == 'SUCCESS') {
            setNotificationObj({text:'Регистрация успешна!',type:"success"})
            setOpen(true);
            setTimeout(()=>history.push('/sinein'),2000);
        } else if (loadingStatus == 'ERROR') {
            setNotificationObj({text:'Произошла ошибка!',type:"error"})
            setOpen(true);
        }
    }, [loadingStatus]);


    return (
        <>
            {
                screenWidth >= 615 ?<div className="navcool__container">
                                        <Container>
                                            <Navcool showItemsProps={true}/>
                                        </Container>
                                    </div>
                                   :<HeaderTopMobile/>
            }
            <div className="sineIn">
                <Container>
                    <div className="sineIn__block">
                        <div className="block__title">Регистрация</div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormInput 
                                control={control} 
                                name="phone" 
                                mask={true}
                                errors={errors.phone}
                                />
                            <FormInput 
                                control={control} 
                                type="password" 
                                name="password"
                                errors={errors.password}                   
                                placeholder="Пароль"/>
                            <FormInput 
                                control={control} 
                                type="password" 
                                name="password2" 
                                errors={errors.password2}                  
                                placeholder="Подтвердите пароль"/>
                            <Button disabled={loadingStatus === 'LOADING'} className="block__button" type="submit">Регистрация</Button>
                        </form>
                        <div className="block__bottom">
                            <span>Уже есть аккаунт?</span>
                            <Link to="/sinein">Войти</Link>
                        </div>                 
                    </div>
                </Container>
            </div>
            {Object.keys(notificationObj).length !== 0 ? <Notification type={notificationObj.type} text={notificationObj.text} open={open} setOpen={setOpen} /> : null}
        </>
    );
}
export default SineUp;