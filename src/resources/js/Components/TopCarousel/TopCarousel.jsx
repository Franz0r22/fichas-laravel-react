import React, { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import PropTypes from 'prop-types';

const TopCarousel = ({ slides }) => {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            {slides.map((slide, i) => (
                <Carousel.Item key={i}>
                    <img
                        className="img-fluid"
                        width={'100%'}
                        height={'396'}
                        src={slide.image}
                        alt={slide.label}
                    />
                </Carousel.Item>
            ))}
        </Carousel>
    )
}

TopCarousel.propTypes = {
    slides: PropTypes.arrayOf(
        PropTypes.shape({
            image: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            // text: PropTypes.string.isRequired
        })
    ).isRequired
};

export default TopCarousel;
