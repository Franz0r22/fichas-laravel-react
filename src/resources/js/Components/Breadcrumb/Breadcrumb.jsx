import { Link } from '@inertiajs/react'
import { Row, Col } from "react-bootstrap";
import styles from './Breadcrumb.module.css';

const Breadcrumb = ({ brandName, modelName, version }) => {
  return (
    <Row>
        <Col>
            <div className={styles.breadCrumb}>
                <Link href='/'>
                    Inicio
                </Link>
                    {'>'}
                <Link>
                    {brandName}
                </Link>
                    {'>'}
                <Link>
                    {modelName} 
                </Link>
                    {'>'}
                <span>
                    {version}
                </span>
            </div>
        </Col>
    </Row>
  )
}

export default Breadcrumb;
