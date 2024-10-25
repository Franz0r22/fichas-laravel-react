import { Container, Row, Col } from "react-bootstrap";
import { IoLocationSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";

const Footer = () => {
    const Year = new Date().getFullYear();

    return (
        <footer>
            <Container fluid className="bg-dark text-white mt-5 p-4 text-center"> 
                <Row >
                    <Col>
                        <img
                            src={`${window.assetBaseUrl}/images/logo-agencia.png`}
                            alt="logo"
                            width={200}
                        />
                    </Col>
                    <Col>
                        <h6 className="text-uppercase fw-bold">Ubicación</h6>
                        <span>
                            <div className="d-flex justify-content-center align-items-center text-uppercase fs-14 text-sec ">
                                <IoLocationSharp />
                                ######
                            </div>
                        </span>
                    </Col>
                    <Col>
                        <h6 className="text-uppercase fw-bold">Contacto</h6>
                        <span>
                            <div className="d-flex justify-content-center align-items-center text-uppercase fs-14 text-sec ">
                                <FaPhoneAlt />
                                ######
                            </div>
                        </span>
                    </Col>
                </Row>
            </Container>
            <Container fluid className="bg-dark text-center border-top">
                <Row>
                    <Col>
                        <div className="p-3 fs-12 text-white">
                            <span>&copy;{Year} ###### | Desarrollado por: <a href="https://agenciadestacados.cl">agenciadestacados.cl</a> | Integración de stock desarrollada por <a href="https://autosusados.cl">autosusados.cl</a></span>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
