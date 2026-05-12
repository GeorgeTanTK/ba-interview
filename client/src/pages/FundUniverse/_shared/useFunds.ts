import { useQuery } from '@tanstack/react-query'
import type { Fund } from '@shared/funds'

async function fetchFunds(): Promise<Fund[]> {
  const res = await fetch('/api/funds')
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export function useFunds() {
  return useQuery({
    queryKey: ['funds'],
    queryFn: fetchFunds,
  })
}
