import type { ReactNode } from 'react'

type PageHeaderProps = {
  breadcrumbs?: string[]
  title: string
  description?: string
  actions?: ReactNode
}

export function PageHeader({ breadcrumbs, title, description, actions }: PageHeaderProps) {
  return (
    <div className="mb-6">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="mb-3 text-[13px] text-muted-foreground">
          {breadcrumbs.map((b, i) => (
            <span key={b}>
              {b}
              {i < breadcrumbs.length - 1 && <span className="mx-1.5">›</span>}
            </span>
          ))}
        </div>
      )}
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="mb-2 text-[32px] font-semibold tracking-tight">{title}</h1>
          {description && (
            <p className="max-w-xl text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {actions && <div className="flex shrink-0 gap-2">{actions}</div>}
      </div>
    </div>
  )
}
