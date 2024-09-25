import { Link, usePage } from '@inertiajs/react';
import { Row, Col } from "react-bootstrap";
import styles from './Breadcrumb.module.css';
import { HiArrowLongLeft } from "react-icons/hi2";
import { RxDividerVertical } from "react-icons/rx";

const Breadcrumb = ({ items = [] }) => {

  return (
    <Row>
      <Col className='px-0'>
        <div className={styles.breadCrumb}>
          <HiArrowLongLeft />
          <Link href='/'>
            Home
          </Link>
          {items.map((item, index) => (
            <span key={index}>
              <RxDividerVertical />
              {item.link ? (
                <Link href={item.link}>{item.name}</Link>
              ) : (
                <span>{item.name}</span>
              )}
            </span>
          ))}
        </div>
      </Col>
    </Row>
  );
};

export default Breadcrumb;
