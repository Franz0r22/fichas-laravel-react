import { FloatingWhatsApp } from 'react-floating-whatsapp';

const WhatsAppButton = () => {
    return (
        <FloatingWhatsApp
            phoneNumber={123}
            accountName={import.meta.env.VITE_APP_NAME}
            statusMessage="Te responderemos en breve.."
            chatMessage={`¡Hola! 🤝 \n¿Cómo te podemos ayudar?`}
            avatar={`${window.assetBaseUrl}images/avatar.webp`}
            placeholder="Escribe un mensaje.."
            allowClickAway={true}
        />
    );
};

export default WhatsAppButton;
