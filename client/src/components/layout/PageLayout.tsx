import type { ReactNode } from 'react'
import { TopBar } from './TopBar'

type PageLayoutProps = {
  children: ReactNode
  section?: string
}

export function PageLayout({ children, section }: PageLayoutProps) {
  return (
    <div className="flex h-svh flex-col bg-[#fafafa] text-foreground">
      <TopBar section={section} />
      <main className="mx-auto flex w-full max-w-[1440px] min-h-0 flex-1 flex-col px-8 py-8">
        {children}
      </main>
    </div>
  )
}
