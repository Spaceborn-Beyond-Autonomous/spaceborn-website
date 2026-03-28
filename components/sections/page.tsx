import Navigation from '@/components/sections/Navigation'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import FounderSection from '@/components/sections/FounderSection'
import TeamSection from '@/components/sections/Founder'
import ProductsSection from '@/components/sections/ProductsSection'
import ContactSection from '@/components/sections/ContactSection'
import Footer from '@/components/sections/Footer'
import HeroSection2 from './HeroSection2'

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <main className="pt-16">
        <HeroSection />
        <AboutSection />
        <FounderSection />
        <TeamSection />
        <ProductsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}