import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import AboutSection from "../components/About/AboutSection";
import StatsSection from "../components/Stats/StatsSection";
import TechnologySection from "../components/Technology/TechnologySection";
import ServicesSection from "../components/Services/ServicesSection";
import ProductsSection from "../components/Products/ProductsSection";
import Footer from "../components/Footer/Footer";
import ContactSection from "../components/Contact/ContactSection";


function Home() {
  return (
    <>
      {/* =========================================
          NAVBAR
      ========================================= */}

      <Navbar />


      {/* =========================================
          MAIN WEBSITE
      ========================================= */}

      <main className="pt-[88px]">

        {/* =========================================
            HERO
        ========================================= */}

        <section id="home">
          <Hero />
        </section>


        {/* =========================================
            ABOUT
        ========================================= */}

        <section id="about">
          <AboutSection />
        </section>


        {/* =========================================
            STATS
        ========================================= */}

        <StatsSection />


        {/* =========================================
            TECHNOLOGY
        ========================================= */}

        <TechnologySection />


        {/* =========================================
            SERVICES
        ========================================= */}

        <section id="services">
          <ServicesSection />
        </section>


        {/* =========================================
            PRODUCTS
        ========================================= */}

        <section id="products">
          <ProductsSection />
        </section>

        {/* =========================================
            CONTACT
        ========================================= */}

        <section id="contact">
          <ContactSection />
        </section>

      </main>


      {/* =========================================
          FOOTER
      ========================================= */}

      <Footer />
    </>
  );
}


export default Home;

