import type DatabaseNs from 'better-sqlite3';
import type { Fund, FundStats } from '@shared/funds';
import { db as defaultDb } from '../../db';
import { formatAum } from '../../lib/format';
import {
  SELECT_ALL_FUNDS,
  SELECT_FUND_BY_TICKER,
  SELECT_FUND_COUNT,
  SELECT_FUND_TOTAL_AUM,
} from './_shared/funds.constants';

type Db = DatabaseNs.Database;

export class FundsService {
  constructor(private readonly db: Db = defaultDb) {}

  list(): Fund[] {
    return this.db.prepare(SELECT_ALL_FUNDS).all() as Fund[];
  }

  get(ticker: string): Fund | undefined {
    return this.db.prepare(SELECT_FUND_BY_TICKER).get(ticker) as Fund | undefined;
  }

  stats(): FundStats {
    const { total } = this.db.prepare(SELECT_FUND_COUNT).get() as { total: number };
    const { totalAumMillions } = this.db
      .prepare(SELECT_FUND_TOTAL_AUM)
      .get() as { totalAumMillions: number };
    return { total, totalAum: formatAum(totalAumMillions) };
  }
}

export const fundsService = new FundsService();
