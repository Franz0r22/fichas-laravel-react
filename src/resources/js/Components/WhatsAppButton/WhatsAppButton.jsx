import { FloatingWhatsApp } from 'react-floating-whatsapp';
import avatar from '@public/images/avatar.webp';

const WhatsAppButton = () => {
    return (
        <FloatingWhatsApp
            phoneNumber={56937622734}
            accountName={import.meta.env.VITE_APP_NAME}
            statusMessage="Te responderemos en breve.."
            chatMessage={`¡Hola! 🤝 \n¿Cómo te podemos ayudar?`}
            avatar={avatar}
            placeholder="Escribe un mensaje.."
            allowClickAway={true}
        />
    );
};

export default WhatsAppButton;
