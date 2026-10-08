import Hero from "../components/Hero/Hero";
import Category from "../components/Categories/CategorySection";
import ProductSection from "../components/Trending/ProductSection";
import ShopByOccasion from "../components/Occasion/Occasion";
import CustomerGallery from "../components/CustomerGallery/CustomerGallery";
import Testimonials from "../components/Testimonials/Testimonials";
import AIRecommendation_CTA from "../components/AIRecommendation-CTA/AIRecommendation-CTA";
import WhyEvelinas_Flowershop from "../components/WhyEvelina_Flowershop/WhyEvelina_Flowershop"; 
import CollectionCTA from "../components/CollectionCTA/CollectionCTA";

function Home() {
  return (
    <>
      <Hero />
      <Category />
      <ProductSection />
      <ShopByOccasion />
      <CustomerGallery />
      <Testimonials />
      <AIRecommendation_CTA />
      <WhyEvelinas_Flowershop />
      <CollectionCTA />
    </>
  );
}

export default Home;