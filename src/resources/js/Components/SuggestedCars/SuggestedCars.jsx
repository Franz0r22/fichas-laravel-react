import React from 'react'
import CarItem from '../CarItem/CarItem'
import { Row, Alert, Col } from 'react-bootstrap';
import CarCarousel from '../CarCarousel/CarCarousel';

const SuggestedCars = ({ suggestedCars }) => {
console.log(suggestedCars)
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
            <CarCarousel currentItems={SuggestedItems} />
        </Row>
    </div>
  )
}

export default SuggestedCars