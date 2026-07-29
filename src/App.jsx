import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import AboutSection from "./components/About/AboutSection";
import ProductsSection from "./components/Products/ProductsSection";
import ServicesSection from "./components/Services/ServicesSection";
import ContactSection from "./components/Contact/ContactSection";
import Footer from "./components/Footer/Footer";


function App() {
  return (
    <>
      <Navbar />

      <section id="home">
        <Hero />
      </section>

      <section id="about">
  <AboutSection />
</section>

     <section id="services">
  <ServicesSection />
</section>

      <section id="products">
  <ProductsSection />
</section>

      <section id="contact">
        <h1>Contact Us</h1>
        <p>Get in touch with Qizar Solutions.</p>
      </section>
    </>
  );
}

export default App;
