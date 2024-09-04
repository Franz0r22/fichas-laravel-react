import { Container, Row, Col } from 'react-bootstrap';
import { IoLocationSharp } from "react-icons/io5";

const Footer = () => {

  const Year = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center">
      <Container>
        <Row>
          <Col>
            <img src="/images/logo-agencia.png" alt="logo" width={200} />
          </Col>
          <Col>
            <h6 className='text-uppercase fw-bold'>
              Ubicación
            </h6>
            <span>
              <div className='d-flex justify-content-center align-items-center text-uppercase fs-14 text-sec '>
                <IoLocationSharp />
                ######
              </div>
            </span>
          </Col>
          <Col>
            <h6 className='text-uppercase fw-bold'>
              Contacto
            </h6>
            <span>
              <div className='d-flex justify-content-center align-items-center text-uppercase fs-14 text-sec '>
                <IoLocationSharp />
                ######
              </div>
            </span>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className='mt-4 fs-14'>
              <span>&copy;{`${Year} Laravel - React`}</span>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;