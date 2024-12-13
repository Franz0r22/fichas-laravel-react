import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import styles from './CarImageGallery.module.css';

const CarImageGallery = ({ photos }) => {

    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    if (!photos || photos.length === 0) {
        return <div>No images available</div>;
    }

    return (
        <div className='mt-4'>
            {/* Swiper principal para la imagen grande */}
            <Swiper
                    style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                    }}
                    loop={true}
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className={styles.mySwiper2}
                >
                {photos.map((photo, index) => (
                    <SwiperSlide key={index} className={styles.swiperSlide}>
                        <img
                            src={photo}
                            alt={`Car Image ${index + 1}`}
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Swiper para las miniaturas */}
            <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className={styles.mySwiper}
            >
                {photos.map((photo, index) => (
                    <SwiperSlide key={index} className={styles.swiperSlide}>
                        <img
                            src={photo}
                            alt={`Thumbnail ${index + 1}`}
                            style={{ width: '100%', height: 'auto', cursor: 'pointer', borderRadius: '12px' }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default CarImageGallery;
