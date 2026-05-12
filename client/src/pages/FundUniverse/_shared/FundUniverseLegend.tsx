import { useFundStats } from './useFundStats'

export function FundUniverseLegend() {
  const { data } = useFundStats()
  return (
    <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-emerald-500" /> Open</span>
        <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-amber-500" /> Soft-close</span>
        <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-muted-foreground/40" /> Closed</span>
      </div>
      <div>
        Total funds <b className="font-semibold text-foreground">{data?.total ?? '—'}</b>
        {' · '}Total AUM <b className="font-semibold text-foreground">{data?.totalAum ?? '—'}</b>
      </div>
    </div>
  )
}
