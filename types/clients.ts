export type Client = {
  id: string
  name: string
  advisor: string
  segment: 'Institutional' | 'Private' | 'Retail'
  aum: string
  status: 'Active' | 'Onboarding' | 'Lapsed'
}
