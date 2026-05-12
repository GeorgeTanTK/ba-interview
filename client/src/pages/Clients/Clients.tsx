import { PageLayout } from '@/components/layout/PageLayout'
import { PageHeader } from '@/components/layout/PageHeader'

export function ClientsPage() {
  return (
    <PageLayout>
      <PageHeader
        breadcrumbs={['Research', 'Clients']}
        title="Clients"
        description="Client list coming soon."
      />
    </PageLayout>
  )
}
