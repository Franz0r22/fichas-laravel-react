import { CarsProvider } from '@/Contexts/CarsContext';
import Navigation from "../Components/Navigation";
import Footer from "../Components/Footer";

export default function Layout({ children, layoutData }) {
    const initialData = layoutData?.carData || [];

    return (
        <CarsProvider initialData={initialData}>
            <Navigation />
            <main>
                <article>{children}</article>
            </main>
            <Footer />
        </CarsProvider>
    );
}
