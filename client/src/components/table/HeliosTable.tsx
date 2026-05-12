import { useMemo, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import {
  AllCommunityModule,
  ModuleRegistry,
  type ColDef,
} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import './HeliosTable.css'

ModuleRegistry.registerModules([AllCommunityModule])

type HeliosTableProps<T> = {
  columns: ColDef<T>[]
  data: T[]
  filter?: string[]
}

export function HeliosTable<T>({ columns, data, filter }: HeliosTableProps<T>) {
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState<string>('All')

  const quickFilterText = useMemo(() => {
    const parts: string[] = []
    if (search.trim()) parts.push(search.trim())
    if (activeFilter !== 'All') parts.push(activeFilter)
    return parts.join(' ')
  }, [search, activeFilter])

  const chips = ['All', ...(filter ?? [])]

  return (
    <div className="flex w-full min-h-0 flex-1 flex-col">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="h-10 rounded-xl pl-9 pr-12"
          />
          <kbd className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 rounded-md border bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
            /
          </kbd>
        </div>
        {chips.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {chips.map((c) => (
              <Button
                key={c}
                size="sm"
                variant={activeFilter === c ? 'default' : 'outline'}
                onClick={() => setActiveFilter(c)}
                className={cn(
                  'h-8 rounded-full px-3.5 text-[13px]',
                  activeFilter !== c && 'bg-background text-foreground',
                )}
              >
                {c}
              </Button>
            ))}
          </div>
        )}
      </div>
      <div className="ag-theme-quartz helios-table__grid min-h-0 flex-1">
        <AgGridReact
          rowData={data}
          columnDefs={columns}
          quickFilterText={quickFilterText}
          rowSelection={{ mode: 'multiRow' }}
          pagination
          paginationPageSize={25}
          paginationPageSizeSelector={[10, 25, 50, 100]}
          defaultColDef={{
            sortable: true,
            resizable: true,
            filter: true,
            flex: 1,
            minWidth: 120,
          }}
        />
      </div>
    </div>
  )
}

export default HeliosTable
