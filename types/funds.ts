export type Fund = {
  ticker: string
  name: string
  assetClass: string
  manager: string
  aum: string
  nav: string
  status: 'Open' | 'Soft-close' | 'Closed'
}

export type FundStats = {
  total: number
  totalAum: string
}
