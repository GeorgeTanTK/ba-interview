import type { ColDef } from "ag-grid-community";
import type { Client } from "@shared/clients";
import { BadgeCell, AvatarCell } from "@/components/table/cells";
import { ClientNameCell, ClientStatusCell } from "./Clients.cells";

export const columns: ColDef<Client>[] = [
  { headerName: "Client", field: "name", flex: 2, cellRenderer: ClientNameCell },
  {
    headerName: "ID",
    field: "id",
    flex: 1,
    cellRenderer: BadgeCell,
  },
  {
    headerName: "Name",
    field: "name",
    flex: 1.4,
    cellRenderer: AvatarCell,
  },
  {
    headerName: "Advisor",
    field: "advisor",
    flex: 1.4,
    cellRenderer: AvatarCell,
  },
  { headerName: "AUM", field: "aum", flex: 1, type: "rightAligned" },
  {
    headerName: "Status",
    field: "status",
    flex: 1,
    cellRenderer: ClientStatusCell,
  },
];

export const filterChips = [
  "US Equity",
  "Intl Equity",
  "Fixed Income",
  "EM",
  "Real Estate",
  "Multi-Asset",
];

export const breadcrumbs = ["Research", "Clients", "Universe"];

export const title = "Client Universe";

export const description =
  "All Helios-managed mutual slients and ETFs across the platform. Use the search to scope by name, ticker, manager, or asset class.";
