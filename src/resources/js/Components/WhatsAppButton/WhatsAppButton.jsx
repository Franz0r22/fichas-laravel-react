import { FloatingWhatsApp } from 'react-floating-whatsapp';

const WhatsAppButton = () => {
    return (
        <FloatingWhatsApp
            phoneNumber={import.meta.env.VITE_WHATSAPP_NUMBER}
            accountName={import.meta.env.VITE_APP_NAME}
            statusMessage="Te responderemos en breve.."
            chatMessage={`¡Hola! 🤝 \n¿Cómo te podemos ayudar?`}
            avatar={`../../images/avatar.webp`}
            placeholder="Escribe un mensaje.."
            allowClickAway={true}
        />
    );
};

export default WhatsAppButton;
