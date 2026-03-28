import Navigation from '@/components/sections/Navigation'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import FounderSection from '@/components/sections/FounderSection'
import TeamSection from '@/components/sections/Founder'
import ProductsSection from '@/components/sections/ProductsSection'
import ContactSection from '@/components/sections/ContactSection'
import Footer from '@/components/sections/Footer'
import HeroSection2 from '@/components/sections/HeroSection2'
import About from '@/components/sections/About'
import Products from '@/components/sections/Products'
import Contact from '@/components/sections/Contact'
import HeroSection3 from '@/components/sections/HeroSection3'

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <main className="pt-16">
        <HeroSection3 />
        <About />
        <Products/>
        <TeamSection />
        <Contact/>
      </main>
      <Footer />
    </div>
  )
}