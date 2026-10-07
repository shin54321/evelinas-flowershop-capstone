import Hero from "../components/Hero/Hero";
import Category from "../components/Categories/CategorySection";
import ProductSection from "../components/Trending/ProductSection";
import ShopByOccasion from "../components/Occasion/Occasion";
import CustomerGallery from "../components/CustomerGallery/CustomerGallery";

function Home() {
  return (
    <>
      <Hero />
      <Category />
      <ProductSection />
      <ShopByOccasion />
      <CustomerGallery />
    </>
  );
}

export default Home;