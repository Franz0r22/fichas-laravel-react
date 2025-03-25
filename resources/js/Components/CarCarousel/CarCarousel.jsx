import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from '@inertiajs/react';
import { Autoplay, Navigation } from 'swiper/modules';
import CarItem from '../CarItem/CarItem';
import styles from './CarCarousel.module.css';

import 'swiper/css';
import 'swiper/css/navigation';

const CarCarousel = ({ currentItems, hideViewAllButton = false, hideNavigation = false, width = "90%" }) => {
    useEffect(() => {
        const swiperInstance = document.querySelector('.swiper')?.swiper;
        if (swiperInstance) {
            swiperInstance.params.navigation.prevEl = document.querySelector('.customPrev');
            swiperInstance.params.navigation.nextEl = document.querySelector('.customNext');
            swiperInstance.navigation.init();
            swiperInstance.navigation.update();
        }
    }, []);

    return (
        <>          
            <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                autoplay={{
                    delay: 10000,
                    disableOnInteraction: false,
                }}
                loop={true}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 3 },
                }}
                style={{ width }}
            >
                {currentItems.map((auto) => (
                    <SwiperSlide key={auto.carId}>
                        <CarItem auto={auto} />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Botones personalizados de navegación */}
            {!hideNavigation && (
                <div className={styles.customSwiperButtons}>
                    <div className={`customPrev ${styles.customPrev}`}></div>
                    <div className={`customNext ${styles.customNext}`}></div>
                </div>
            )}

            {!hideViewAllButton && (
                <div className={styles.btnVermas}>
                    <Link
                        href={route('cars')}
                        className={`btnGlobal text-center spacing ${styles.verStock}`}
                    >
                        Ver stock completo
                    </Link>
                </div>
            )}
        </>
    );
};

export default CarCarousel;
