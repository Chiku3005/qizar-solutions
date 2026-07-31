import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import AboutSection from "./components/About/AboutSection";
import ProductsSection from "./components/Products/ProductsSection";
import Clients from "./components/Clients/ClientsSection";
import Services from "./components/Services/ServicesSection";
import CTA from "./components/CTA/CTASection";
import Contact from "./components/Contact/ContactSection";
import Footer from "./components/Footer/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutSection />
      <Services />
      <ProductsSection />
      <Clients />
      <CTA />
      <Contact />
      <Footer />
    </>
  );
}

export default Home;