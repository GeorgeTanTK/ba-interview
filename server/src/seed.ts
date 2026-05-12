import type DatabaseNs from 'better-sqlite3';
import { formatAum } from './lib/format';

type Db = DatabaseNs.Database;

const FUND_FAMILIES: { name: string; code: string }[] = [
  { name: 'Helios',    code: 'H' },
  { name: 'Apollo',    code: 'A' },
  { name: 'Vega',      code: 'V' },
  { name: 'Orion',     code: 'O' },
  { name: 'Atlas',     code: 'T' },
  { name: 'Aurora',    code: 'U' },
  { name: 'Sirius',    code: 'S' },
  { name: 'Polaris',   code: 'P' },
  { name: 'Lyra',      code: 'L' },
  { name: 'Phoenix',   code: 'X' },
  { name: 'Andromeda', code: 'N' },
  { name: 'Cassini',   code: 'C' },
  { name: 'Galileo',   code: 'G' },
  { name: 'Nova',      code: 'W' },
  { name: 'Halo',      code: 'I' },
  { name: 'Zenith',    code: 'Z' },
  { name: 'Quantum',   code: 'Q' },
  { name: 'Pinnacle',  code: 'K' },
  { name: 'Summit',    code: 'Y' },
  { name: 'Beacon',    code: 'B' },
];

const FUND_THEMES: { name: string; assetClass: string; ticker: string }[] = [
  { name: 'Core US Equity',     assetClass: 'US Equity',    ticker: 'CUSX' },
  { name: 'International Core', assetClass: 'Intl Equity',  ticker: 'IEUX' },
  { name: 'Aggregate Bond',     assetClass: 'Fixed Income', ticker: 'FIBX' },
  { name: 'Emerging Markets',   assetClass: 'Emerging',     ticker: 'EMKX' },
  { name: 'Real Estate Income', assetClass: 'Real Estate',  ticker: 'REAX' },
  { name: 'Multi-Asset Blend',  assetClass: 'Multi-Asset',  ticker: 'MAFX' },
  { name: 'Growth Leaders',     assetClass: 'US Equity',    ticker: 'GRWX' },
  { name: 'Value Frontier',     assetClass: 'US Equity',    ticker: 'VALX' },
  { name: 'Income Plus',        assetClass: 'Fixed Income', ticker: 'INCX' },
  { name: 'Strategic Dynamic',  assetClass: 'Multi-Asset',  ticker: 'SPDX' },
];

const FUND_MANAGERS = [
  'James Reinholt','Sofia Marrone','Dev Patel','Ragna Bjork','Aiko Nakamura',
  'Lara Okonkwo','Mateo Castillo','Priya Shah','Noah Bergman','Yuki Tanaka',
  'Carla Mendes','Ibrahim Diallo','Hannah Lim','Ezra Cohen','Camille Dubois',
];

const FUND_STATUSES = ['Open','Open','Open','Open','Open','Open','Open','Soft-close','Soft-close','Closed'];

const CLIENT_PREFIXES = [
  'Northwind','Atlas','Brightline','Meridian','Cascade','Halcyon','Stonebridge','Eastfield','Westmark','Northfield',
  'Southshore','Granite','Harbor','Maple','Cedar','Birch','Ironwood','Silvercrest','Goldleaf','Riverstone',
];

const CLIENT_SUFFIXES = [
  'Pension','Family Office','Foundation','Wealth Partners','Endowment','Retail Channel','Trust','Capital','Holdings','Advisors',
];

const CLIENT_ADVISORS = FUND_MANAGERS;
const CLIENT_SEGMENTS = ['Institutional','Private','Retail'];
const CLIENT_STATUSES = ['Active','Active','Active','Active','Active','Active','Active','Onboarding','Onboarding','Lapsed'];

export function generateFunds() {
  const rows: {
    ticker: string;
    name: string;
    assetClass: string;
    manager: string;
    aum: string;
    aumMillions: number;
    nav: string;
    status: string;
  }[] = [];

  for (let f = 0; f < FUND_FAMILIES.length; f++) {
    for (let t = 0; t < FUND_THEMES.length; t++) {
      const family = FUND_FAMILIES[f];
      const theme = FUND_THEMES[t];
      const idx = f * FUND_THEMES.length + t;
      const aumMillions = 80 + ((idx * 137) % 30000);
      const nav = 8 + ((idx * 53) % 14000) / 100;
      rows.push({
        ticker: family.code + theme.ticker,
        name: `${family.name} ${theme.name}`,
        assetClass: theme.assetClass,
        manager: FUND_MANAGERS[idx % FUND_MANAGERS.length],
        aum: formatAum(aumMillions),
        aumMillions,
        nav: `$${nav.toFixed(2)}`,
        status: FUND_STATUSES[idx % FUND_STATUSES.length],
      });
    }
  }
  return rows;
}

export function generateClients() {
  const rows: {
    id: string;
    name: string;
    advisor: string;
    segment: string;
    aum: string;
    aumMillions: number;
    status: string;
  }[] = [];

  for (let p = 0; p < CLIENT_PREFIXES.length; p++) {
    for (let s = 0; s < CLIENT_SUFFIXES.length; s++) {
      const idx = p * CLIENT_SUFFIXES.length + s;
      const aumMillions = 50 + ((idx * 211) % 9500);
      rows.push({
        id: `C-${(1001 + idx).toString()}`,
        name: `${CLIENT_PREFIXES[p]} ${CLIENT_SUFFIXES[s]}`,
        advisor: CLIENT_ADVISORS[idx % CLIENT_ADVISORS.length],
        segment: CLIENT_SEGMENTS[idx % CLIENT_SEGMENTS.length],
        aum: formatAum(aumMillions),
        aumMillions,
        status: CLIENT_STATUSES[idx % CLIENT_STATUSES.length],
      });
    }
  }
  return rows;
}

export function seedFunds(db: Db) {
  const rows = generateFunds();
  const current = (db.prepare('SELECT COUNT(*) AS c FROM funds').get() as { c: number }).c;
  if (current === rows.length) return;
  db.exec('DELETE FROM funds');
  const insert = db.prepare(
    'INSERT INTO funds (ticker, name, asset_class, manager, aum, aum_millions, nav, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
  );
  db.transaction(() => {
    for (const r of rows) insert.run(r.ticker, r.name, r.assetClass, r.manager, r.aum, r.aumMillions, r.nav, r.status);
  })();
}

export function seedClients(db: Db) {
  const rows = generateClients();
  const current = (db.prepare('SELECT COUNT(*) AS c FROM clients').get() as { c: number }).c;
  if (current === rows.length) return;
  db.exec('DELETE FROM clients');
  const insert = db.prepare(
    'INSERT INTO clients (id, name, advisor, segment, aum, aum_millions, status) VALUES (?, ?, ?, ?, ?, ?, ?)'
  );
  db.transaction(() => {
    for (const r of rows) insert.run(r.id, r.name, r.advisor, r.segment, r.aum, r.aumMillions, r.status);
  })();
}
