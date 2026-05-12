import type { ICellRendererParams } from "ag-grid-community";
import type { Fund } from "@shared/funds";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const FundNameCell = (p: ICellRendererParams<Fund>) => (
  <div className="flex flex-col justify-center leading-tight">
    <div className="font-semibold text-foreground">{p.data?.name}</div>
    <div className="font-mono text-[11px] tracking-wide text-muted-foreground">
      {p.data?.ticker}
    </div>
  </div>
);

export const FundStatusCell = (p: ICellRendererParams<Fund>) => {
  const status = p.value as Fund["status"];
  const styles =
    status === "Open"
      ? "bg-emerald-50 text-emerald-700 [&>span]:bg-emerald-500"
      : status === "Soft-close"
        ? "bg-amber-50 text-amber-700 [&>span]:bg-amber-500"
        : "bg-muted text-muted-foreground [&>span]:bg-muted-foreground";
  return (
    <Badge
      variant="secondary"
      className={cn("gap-1.5 px-2.5 py-1 font-medium", styles)}
    >
      <span className="size-1.5 rounded-full" />
      {status}
    </Badge>
  );
};
