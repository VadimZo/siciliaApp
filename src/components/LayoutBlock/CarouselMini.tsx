//@ts-nocheck
import React, {useEffect, useRef} from 'react';
import Slider from 'react-slick';
import './layoutBlock.scss';

function Carousel({carousel,roundNumber}) {
    const settings = {
        dots: false,
        infinite: true,
    };
   const slider = useRef();
    useEffect(() => {
        slider.current.slickGoTo(roundNumber);
    }, [roundNumber]);

    return (
        <Slider ref={slider} {...settings}>
            {
                carousel.map((item,i)=>(
                    <div key={`${item}_${i}`} className="slide-wrapper">
                        <img className="carousel-mini__item" src={item} />
                    </div>
                ))
            }
        </Slider>
    );
}

export default Carousel;