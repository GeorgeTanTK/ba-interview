import type { ICellRendererParams } from "ag-grid-community";
import type { Client } from "@shared/clients";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const ClientNameCell = (p: ICellRendererParams<Client>) => (
  <div className="flex flex-col justify-center leading-tight">
    <div className="font-semibold text-foreground">{p.data?.name}</div>
    <div className="font-mono text-[11px] tracking-wide text-muted-foreground">
      {p.data?.id}
    </div>
  </div>
);

// ivan.li@lgt.com

export const ClientStatusCell = (p: ICellRendererParams<Client>) => {
  const status = p.value as Client["status"];
  const styles =
    status === "Active"
      ? "bg-emerald-50 text-emerald-700 [&>span]:bg-emerald-500"
      : status === "Onboarding"
        ? "bg-amber-50 text-amber-700 [&>span]:bg-amber-500"
        : status === "Lapsed"
          ? "bg-amber-50 text-amber-700 [&>span]:bg-amber-500"
            :"bg-muted text-muted-foreground [&>span]:bg-muted-foreground";
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
