import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'

type Tab = { label: string; to: string }

type TopBarProps = {
  product?: string
  section?: string
  tabs?: Tab[]
  userInitials?: string
}

const defaultTabs: Tab[] = [
  { label: 'Funds', to: '/funds' },
  { label: 'Clients', to: '/clients' },
]

export function TopBar({
  product = 'Helios Capital',
  section = 'Research',
  tabs = defaultTabs,
  userInitials = 'NC',
}: TopBarProps) {
  return (
    <header className="flex items-center justify-between border-b bg-card px-8 py-3.5">
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-2">
          <span className="inline-block size-[22px] rounded-md bg-gradient-to-br from-indigo-600 to-indigo-400" />
          <span className="font-semibold">{product}</span>
        </div>
        {section && (
          <>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">{section}</span>
          </>
        )}
      </div>
      {tabs.length > 0 && (
        <nav className="flex gap-1">
          {tabs.map((t) => (
            <NavLink
              key={t.to}
              to={t.to}
              className={({ isActive }) =>
                cn(
                  'rounded-lg px-3.5 py-1.5 text-sm font-medium',
                  isActive
                    ? 'bg-muted text-foreground'
                    : 'text-muted-foreground hover:bg-muted/60',
                )
              }
            >
              {t.label}
            </NavLink>
          ))}
        </nav>
      )}
      <div className="flex items-center gap-2.5">
        <kbd className="rounded-md border bg-card px-1.5 py-0.5 font-mono text-xs text-muted-foreground">⌘K</kbd>
        <span className="inline-flex size-8 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
          {userInitials}
        </span>
      </div>
    </header>
  )
}
