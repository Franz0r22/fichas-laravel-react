import  Navigation  from "../Components/Navigation"
import Footer from "../Components/Footer";

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
