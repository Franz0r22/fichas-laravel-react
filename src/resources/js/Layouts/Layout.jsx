import Navigation from "../Components/Navigation/Navigation";
import Footer from "../Components/Footer/Footer";
import WhatsAppButton from "../Components/WhatsAppButton/WhatsAppButton";
import { Comparator } from "../Components/comparator/Comparator";

export default function Layout({ children }) {
    return (
        <>
            <Navigation />
            <Comparator></Comparator>
            <main>
                <article>{children}</article>
            </main>
            <WhatsAppButton />
            <Footer />
        </>
    );
}
