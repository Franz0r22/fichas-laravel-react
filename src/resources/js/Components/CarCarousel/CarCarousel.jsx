import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import CarItem from '../CarItem/CarItem';

const CarCarousel = ({ currentItems }) => {
    return (
        <Swiper
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
                640: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
                1280: {
                    slidesPerView: 4,
                },
            }}
        >
            {currentItems.map((auto) => (
                <SwiperSlide key={auto.AUTOID}>
                    <CarItem auto={auto} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default CarCarousel;
