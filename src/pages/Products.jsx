import Navbar from "../components/Navbar/Navbar";
import ProductsSection from "../components/Products/ProductsSection";
import Footer from "../components/Footer/Footer";

function Products() {

  return (
    <>

      <Navbar />

      <main className="pt-[100px]">

        <ProductsSection />

      </main>

      <Footer />

    </>
  );

}

export default Products;