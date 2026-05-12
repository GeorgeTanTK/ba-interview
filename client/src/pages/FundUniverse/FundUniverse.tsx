import type { Fund } from '@shared/funds'
import { HeliosTable } from '@/components/table/HeliosTable'
import { PageLayout } from '@/components/layout/PageLayout'
import { PageHeader } from '@/components/layout/PageHeader'
import {
  columns,
  filterChips,
  breadcrumbs,
  title,
  description,
} from './_shared/FundUniverse.constants'
import { FundUniverseLegend } from './_shared/FundUniverseLegend'
import { useFunds } from './_shared/useFunds'

export function FundUniversePage() {
  const { data: funds = [] } = useFunds()
  return (
    <PageLayout>
      <PageHeader
        breadcrumbs={breadcrumbs}
        title={title}
        description={description}
      />
      <HeliosTable<Fund> columns={columns} data={funds} filter={filterChips} />
      <FundUniverseLegend />
    </PageLayout>
  )
}
