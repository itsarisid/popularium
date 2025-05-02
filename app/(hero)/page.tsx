import { About } from "@/components/hero/About";
import { Cta } from "@/components/hero/Cta";
import { FAQ } from "@/components/hero/FAQ";
import { Features } from "@/components/hero/Features";
import { Footer } from "@/components/hero/Footer";
import { Hero } from "@/components/hero/Hero";
import { HowItWorks } from "@/components/hero/HowItWorks";
import { Navbar } from "@/components/hero/Navbar";
import { Newsletter } from "@/components/hero/Newsletter";
import { Pricing } from "@/components/hero/Pricing";
import { ScrollToTop } from "@/components/hero/ScrollToTop";
import { Services } from "@/components/hero/Services";
import { Sponsors } from "@/components/hero/Sponsors";
import { Team } from "@/components/hero/Team";
import { Testimonials } from "@/components/hero/Testimonials";

export default function Home() {
  return (
    <>
      <Navbar />
       <Hero />
      <Sponsors />
      <About />
      {/*<HowItWorks />
      <Features />
      <Services />
      <Cta />
      <Testimonials />
      <Team />
      <Pricing />
      <Newsletter />
      <FAQ />
      <Footer /> */}
      <ScrollToTop />
    </>
  );
}
