//@ts-nocheck
import React from 'react';
import {Button, Container} from "@material-ui/core";
import FormInput from "../components/CustomTextField";
import {useForm} from "react-hook-form";
import './sineIn.scss';
import {Link,useHistory} from "react-router-dom";
import Navcool from "../components/Header/Navcool";
import HeaderTopMobile from "../components/Header/HeaderMobile/HeaderTopMobile";
import Notification from "../components/Notification";
import {useDispatch, useSelector} from "react-redux";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {fetchSineIn} from "../store/ducks/user/actionCreators";

const screenWidth= window.innerWidth;

function SineIn() {

    const history= useHistory();
    let loadingStatus = useSelector(({userReducer})=>userReducer.status);
    const [notificationObj,setNotificationObj] = React.useState({});

    const [open, setOpen] = React.useState(false);

    const RegisterFormSchema = yup.object().shape({
        phone: yup.string().matches(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/, { message:"Неверный формат номера", excludeEmptyString: false }).required('Введите номер телефона'),
        password: yup.string().min(6, 'Минимальная длина пароля 6 символов').required('Введите пароль'),
    });



    const dispatch = useDispatch();
    const { handleSubmit, control, formState:{ errors }} = useForm({
        resolver: yupResolver(RegisterFormSchema)
    });
    const onSubmit = (data) => {
        dispatch(fetchSineIn(data));
    };


    React.useEffect(() => {
        if (loadingStatus == 'SUCCESS') {
            setNotificationObj({text:'Авторизация успешна!',type:"success"})
            setOpen(true);
            setTimeout(()=>history.push('/'),2000);
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
                        <div className="block__title">Войти</div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormInput control={control}  errors={errors.phone} required={true} name="phone" mask={true}/>
                            <FormInput control={control}  errors={errors.password} required={true} type="password" name="password" placeholder="Пароль"/>
                            <Button className="block__button" type="submit">Войти</Button>
                        </form>
                        <div className="block__bottom">
                            <span>Еще нет аккаунта?</span>
                            <Link to="/sineup">Зарегистрироваться</Link>
                        </div>
                        
                    </div>
                </Container>
            </div>
            {Object.keys(notificationObj).length !== 0 ? <Notification type={notificationObj.type} text={notificationObj.text} open={open} setOpen={setOpen} /> : null}
        </>

    );
}

export default SineIn;