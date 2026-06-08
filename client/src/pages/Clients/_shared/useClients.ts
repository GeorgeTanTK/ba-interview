import { useQuery } from '@tanstack/react-query'
import type { Client } from '@shared/clients'

async function fetchClients(): Promise<Client[]> {
  const res = await fetch('/api/clients')
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export function useClients() {
  return useQuery({
    queryKey: ['clients'],
    queryFn: fetchClients,
  })
}
