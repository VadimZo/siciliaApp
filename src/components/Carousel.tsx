//@ts-nocheck
import React from 'react';
import Slider from 'react-slick';

function SampleNextArrow(props) {
    const { onClick } = props;
    return (
            <svg onClick={onClick} className="arrow" width="33" height="57" viewBox="0 0 33 57"
                 fill="none">
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M25.6084 1.61006C26.3314 0.887768 27.2721 0.530308 28.2164 0.530308C29.1608 0.530308 30.1051 0.887768 30.8245 1.61006C32.2668 3.04727 32.2668 5.37997 30.8245 6.82087L9.41416 28.2095L30.8245 49.5982C32.2668 51.0391 32.2668 53.3718 30.8245 54.809C29.3858 56.2499 27.0507 56.2499 25.6084 54.809L1.59002 30.8149C0.147663 29.374 0.147663 27.045 1.59002 25.6041L25.6084 1.61006Z"
                      fill="white" fillOpacity="0.4" stroke="white" strokeOpacity="0.7"></path>
            </svg>
    );
}

function SamplePrevArrow(props) {
    const {onClick } = props;
    return (
        <svg onClick={onClick} className="arrow_2" width="33" height="57" viewBox="0 0 33 57" fill="none">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M25.6084 1.61006C26.3314 0.887768 27.2721 0.530308 28.2164 0.530308C29.1608 0.530308 30.1051 0.887768 30.8245 1.61006C32.2668 3.04727 32.2668 5.37997 30.8245 6.82087L9.41416 28.2095L30.8245 49.5982C32.2668 51.0391 32.2668 53.3718 30.8245 54.809C29.3858 56.2499 27.0507 56.2499 25.6084 54.809L1.59002 30.8149C0.147663 29.374 0.147663 27.045 1.59002 25.6041L25.6084 1.61006Z"
                  fill="white" fillOpacity="0.4" stroke="white" strokeOpacity="0.7">
            </path>
        </svg>
    );
}


function Carousel() {
    const settings = {
        dots: false,
        infinite: true,
        pauseOnHover: true,
        autoplay:true,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    return (
        <Slider {...settings}>
            <div>
                <img className="carousel__item" src="https://pizza-sicilia.ru/uploads/asset/file/1833/%D1%80%D0%BA_%D0%BD%D0%BE%D0%B2%D0%BE%D0%B5_%D0%BC%D0%B5%D0%BD%D1%8E_%D0%B4%D0%BB%D1%8F_%D1%81%D0%B0%D0%B9%D1%82%D0%B0_1920%D1%85560.jpg" />
            </div>
            <div>
                <img className="carousel__item" src="https://pizza-sicilia.ru/uploads/asset/file/1619/%D0%BF%D0%BE%D1%81%D1%82%D0%BD%D0%BE%D0%B5_%D0%BC%D0%B5%D0%BD%D1%8E_%D0%B4%D0%BB%D1%8F_%D1%81%D0%B0%D0%B9%D1%82%D0%B0_1920%D1%85560-min.jpg" />
            </div>
            <div>
                <img className="carousel__item" src="https://pizza-sicilia.ru/uploads/asset/file/1530/%D0%B4%D0%BB%D1%8F_%D1%81%D0%B0%D0%B9%D1%82%D0%B0_1920%D1%85560.jpg" />
            </div>
        </Slider>
    );
}

export default Carousel;