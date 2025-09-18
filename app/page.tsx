import { AppShell } from '@/components/AppShell'
import { HeroSection } from '@/components/HeroSection'
import { MemoryBookGrid } from '@/components/MemoryBookGrid'

export default function HomePage() {
  return (
    <AppShell>
      <div className="min-h-screen gradient-bg">
        <HeroSection />
        <div className="px-4 pb-8">
          <MemoryBookGrid />
        </div>
      </div>
    </AppShell>
  )
}
