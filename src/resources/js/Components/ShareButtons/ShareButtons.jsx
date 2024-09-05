import React, { useState } from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  XIcon,
  WhatsappIcon,
} from 'react-share';
import { FaShareAlt } from 'react-icons/fa';
import styles from './ShareButtons.module.css'

const ShareButtons = ({ url, title }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Icono de compartir */}
      <button
        onClick={handleToggle}
        className={styles.btnShare}
      >
        <FaShareAlt title="Compartir"/>
      </button>

      {/* Opciones de compartir */}
      {isVisible && (
        <div className={styles.shareContainer}>
          <FacebookShareButton url={url} quote={title}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>

          <TwitterShareButton url={url} title={title}>
            <XIcon size={32} round />
          </TwitterShareButton>

          <WhatsappShareButton url={url} title={title}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </div>
      )}
    </div>
  );
};

export default ShareButtons;
