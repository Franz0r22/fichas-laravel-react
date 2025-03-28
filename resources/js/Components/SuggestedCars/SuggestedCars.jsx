import React from 'react'
import { Row, Alert, Col } from 'react-bootstrap';
import CarCarousel from '../CarCarousel/CarCarousel';

const SuggestedCars = ({ suggestedCars, hideNavigation = false }) => {

const SuggestedItems = suggestedCars.ads;
  if (!suggestedCars || !suggestedCars.ads || suggestedCars.ads.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="mb-4">Autos Sugeridos</h2>
        <Row>
            <CarCarousel currentItems={SuggestedItems} hideViewAllButton={false} hideNavigation={hideNavigation} />
        </Row>
    </div>
  )
}

export default SuggestedCars