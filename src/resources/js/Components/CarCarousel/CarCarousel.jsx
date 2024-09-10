import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import CarItem from '../CarItem/CarItem';

import 'swiper/css';
import 'swiper/css/navigation';

const CarCarousel = ({ currentItems }) => {
    return (
        <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            loop={true}
            navigation={true}
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
                <SwiperSlide key={auto.idauto}>
                    <CarItem auto={auto} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default CarCarousel;
