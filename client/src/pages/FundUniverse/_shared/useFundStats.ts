import { useQuery } from '@tanstack/react-query'
import type { FundStats } from '@shared/funds'

async function fetchFundStats(): Promise<FundStats> {
  const res = await fetch('/api/funds/stats')
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export function useFundStats() {
  return useQuery({
    queryKey: ['funds', 'stats'],
    queryFn: fetchFundStats,
  })
}
