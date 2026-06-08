import { PageLayout } from '@/components/layout/PageLayout'
import { PageHeader } from '@/components/layout/PageHeader'
import type { Client } from '@shared/clients'
import { HeliosTable } from '@/components/table/HeliosTable'
import {
  columns,
  breadcrumbs,
  title,
  description,
} from './_shared/Clients.constants'
import { useClients } from './_shared/useClients'

export function ClientsPage() {
  const { data: clients = [] } = useClients()
  return (
    <PageLayout>
      <PageHeader
        breadcrumbs={breadcrumbs}
        title={title}
        description={description}
      />
      <HeliosTable<Client> columns={columns} data={clients} />
    </PageLayout>
  )
}
