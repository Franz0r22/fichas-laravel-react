import { FloatingWhatsApp } from 'react-floating-whatsapp';
import styles from './WhatsAppButton.module.css';
import avatar from '@images/avatar.webp';

const WhatsAppButton = () => {
    return (
        <FloatingWhatsApp
            phoneNumber={import.meta.env.VITE_WHATSAPP_NUMBER}
            accountName={import.meta.env.VITE_APP_NAME}
            statusMessage="Te responderemos en breve.."
            chatMessage={`¡Hola! 🤝 \n¿Cómo te podemos ayudar?`}
            avatar={avatar}
            placeholder="Escribe un mensaje.."
            allowClickAway={true}
            className={styles.floatingWaMobile}
        />
    );
};

export default WhatsAppButton;
