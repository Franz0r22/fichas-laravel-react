import React from 'react'
import { Row, Alert, Col } from 'react-bootstrap';
import CarCarousel from '../CarCarousel/CarCarousel';

const SuggestedCars = ({ suggestedCars, hideNavigation = false }) => {

const SuggestedItems = suggestedCars.ads;
  if (!suggestedCars) {
    return <div>Cargando autos sugeridos...</div>
  }

  if (suggestedCars.error) {
    return <div>Error: {suggestedCars.error}</div>
  }

  if (suggestedCars.length === 0) {
    return <div>No hay autos sugeridos disponibles.</div>
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