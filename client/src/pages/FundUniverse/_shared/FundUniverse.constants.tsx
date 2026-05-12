import type { ColDef } from "ag-grid-community";
import type { Fund } from "@shared/funds";
import { BadgeCell, AvatarCell } from "@/components/table/cells";
import { FundNameCell, FundStatusCell } from "./FundUniverse.cells";

export const columns: ColDef<Fund>[] = [
  { headerName: "Fund", field: "name", flex: 2, cellRenderer: FundNameCell },
  {
    headerName: "Asset Class",
    field: "assetClass",
    flex: 1,
    cellRenderer: BadgeCell,
  },
  {
    headerName: "Manager",
    field: "manager",
    flex: 1.4,
    cellRenderer: AvatarCell,
  },
  { headerName: "AUM", field: "aum", flex: 1, type: "rightAligned" },
  { headerName: "NAV", field: "nav", flex: 1, type: "rightAligned" },
  {
    headerName: "Status",
    field: "status",
    flex: 1,
    cellRenderer: FundStatusCell,
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

export const breadcrumbs = ["Research", "Funds", "Universe"];

export const title = "Fund Universe";

export const description =
  "All Helios-managed mutual funds and ETFs across the platform. Use the search to scope by name, ticker, manager, or asset class.";
