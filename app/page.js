import Hero from '@/components/Hero';
import About from '@/components/About';
import ProductGrid from '@/components/ProductGrid';
import WhyUs from '@/components/WhyUs';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <ProductGrid />
      <WhyUs />
      <Footer />
    </>
  );
}
