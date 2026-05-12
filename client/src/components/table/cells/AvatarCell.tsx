import type { ICellRendererParams } from 'ag-grid-community'

const initials = (name: string) =>
  name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()

export function AvatarCell(p: ICellRendererParams) {
  const name = String(p.value ?? '')
  return (
    <div className="flex items-center gap-2.5">
      <span className="inline-flex size-6 items-center justify-center rounded-full bg-muted text-[10px] font-semibold text-muted-foreground">
        {initials(name)}
      </span>
      <span className="text-foreground">{name}</span>
    </div>
  )
}
