import type { ICellRendererParams } from 'ag-grid-community'
import { Badge } from '@/components/ui/badge'

export function BadgeCell(p: ICellRendererParams) {
  return (
    <Badge variant="outline" className="px-3 py-1 font-medium">
      {p.value}
    </Badge>
  )
}
