import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { KPICards } from "@/components/home/kpi-cards"
import { RoundsPanel } from "@/components/home/rounds-panel"
import { Sugarboard } from "@/components/home/sugarboard"
import { FeaturesSection } from "@/components/home/features-section"

export default function HomePage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 lg:px-10 py-10 page-view">
          <HeroSection />
          <KPICards />
          <div className="flex flex-col lg:flex-row gap-8 items-stretch lg:h-[760px]">
            <RoundsPanel />
            <Sugarboard />
          </div>
          <FeaturesSection />
        </main>
        <Footer />
      </div>
    </div>
  )
}
