//@ts-nocheck
import React from 'react';
import Slider from 'react-slick';

function CarouselMobile() {
    const settings = {
        dots: true,
        infinite: true,
        pauseOnHover: true,
        autoplay:true,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <Slider {...settings}>
            <div>
                <img className="carousel__item" src="https://pizza-sicilia.ru/uploads/asset/file/1851/xl_%D1%80%D0%BA_%D0%BD%D0%BE%D0%B2%D0%BE%D0%B5_%D0%BC%D0%B5%D0%BD%D1%8E_800%D1%85800.jpg" />
            </div>
            <div>
                <img className="carousel__item" src="https://pizza-sicilia.ru/uploads/asset/file/1996/xl_800%D1%85800_%D1%81_%D0%BB%D0%BE%D0%B3%D0%BE-min__1_.jpg" />
            </div>
            <div>
                <img className="carousel__item" src="https://pizza-sicilia.ru/uploads/asset/file/1994/xl_%D0%A0%D0%9E%D0%97%D0%AB%D0%93%D0%A0%D0%AB%D0%A8_%D0%9F%D0%9E%D0%A1%D0%A2.jpg" />
            </div>
            <div>
                <img className="carousel__item" src="https://pizza-sicilia.ru/uploads/asset/file/1532/xl_%D0%BF%D0%BE%D0%B4%D0%B0%D1%80%D0%BA%D0%B8_800%D1%85800.jpg" />
            </div>
        </Slider>
    );
}

export default CarouselMobile;