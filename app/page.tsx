import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import FounderSection from '@/components/FounderSection'
import TeamSection from '@/components/TeamSection'
import ProductsSection from '@/components/ProductsSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

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