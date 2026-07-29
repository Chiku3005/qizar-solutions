import Footer from "../components/Footer/Footer";
import WhyChoose from "../components/WhyChoose/WhyChoose";
import ProductsSection from "../components/Products/ProductsSection";
import StatsSection from "../components/Stats/StatsSection";
import ServicesSection from "../components/Services/ServicesSection";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import AboutSection from "../components/About/AboutSection";


function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutSection />
    </>
  );
}

export default Home;