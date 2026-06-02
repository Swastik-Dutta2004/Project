import Footer from "../components/Footer";
import Hero from "../components/Hero";
import WhyBustify from "../components/WhyBustify";
import Cards from "@/components/Cards";
import TrendingPlace from "@/components/TrendingPlace";

const Home = () => {
  return (
    <main className="flex flex-col items-center w-full overflow-x-hidden">
      <Hero />
      <WhyBustify />
      <Cards />
      <TrendingPlace />
      <Footer />
    </main>
  );
};

export default Home;
