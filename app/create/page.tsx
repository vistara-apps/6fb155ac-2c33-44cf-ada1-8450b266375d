import { AppShell } from '@/components/AppShell'
import { CreateMemoryBook } from '@/components/CreateMemoryBook'

export default function CreatePage() {
  return (
    <AppShell>
      <div className="min-h-screen gradient-bg">
        <CreateMemoryBook />
      </div>
    </AppShell>
  )
}
