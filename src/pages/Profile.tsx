//@ts-nocheck
import React from 'react';
import { Container} from "@material-ui/core";
import Navcool from "../components/Header/Navcool";
import HeaderTopMobile from "../components/Header/HeaderMobile/HeaderTopMobile";
import { useSelector} from "react-redux";
import './profile.scss';

const screenWidth= window.innerWidth;

function Profile() {
    let userData = useSelector(({userReducer})=>userReducer.data);
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

            <div className="profile">
                    <h1>Личный кабинет</h1>
                    <div className="profile__info">
                        <div>Ваш номер телефона:</div><div className="profile__phone">{(userData.phone || userData._doc.phone)}</div>
                    </div>

            </div>
        </>

    );
}

export default Profile;