import { Link } from '@inertiajs/react'
import { Row, Col } from "react-bootstrap";
import styles from './Breadcrumb.module.css';
import { HiArrowLongLeft } from "react-icons/hi2";
import { RxDividerVertical } from "react-icons/rx";

const Breadcrumb = ({ brandName, modelName, version }) => {
  return (
    <Row>
        <Col className='px-0'>
            <div className={styles.breadCrumb}>
                <HiArrowLongLeft />
                <Link href='/'>
                    Home
                </Link>
                    <RxDividerVertical />
                <Link>
                    {brandName}
                </Link>
                    <RxDividerVertical />
                <Link>
                    {modelName} 
                </Link>
                    <RxDividerVertical />
                <span>
                    {version}
                </span>
            </div>
        </Col>
    </Row>
  )
}

export default Breadcrumb;
