import { CarsProvider } from '@/Contexts/CarsContext';
import Navigation from "../Components/Navigation/Navigation";
import Footer from "../Components/Footer/Footer";

export default function Layout({ children }) {

    return (
        <>
            <Navigation />
            <main>
                <article>{children}</article>
            </main>
            <Footer />
        </>
    );
}
