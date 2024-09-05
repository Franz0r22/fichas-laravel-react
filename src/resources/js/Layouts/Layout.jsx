import Navigation from "../Components/Navigation/Navigation";
import Footer from "../Components/Footer/Footer";
import WhatsAppButton from "../Components/WhatsAppButton/WhatsAppButton";

export default function Layout({ children }) {
    return (
        <>
            <Navigation />
            <main>
                <article>{children}</article>
            </main>
            <WhatsAppButton />
            <Footer />
        </>
    );
}
