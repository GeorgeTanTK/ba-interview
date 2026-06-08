import type DatabaseNs from 'better-sqlite3';
import type { Client } from '@shared/clients';
import { db as defaultDb } from '../../db';
import { formatAum } from '../../lib/format';
import {
    SELECT_ALL_CLIENTS,
    SELECT_CLIENT_BY_ID,
    SELECT_FUND_COUNT,
    SELECT_FUND_TOTAL_AUM,
} from './_shared/clients.constants';


type Db = DatabaseNs.Database;

export class ClientsService {
    constructor(private readonly db: Db = defaultDb) {}

    list(): Client[] {
        return this.db.prepare(SELECT_ALL_CLIENTS).all() as Client[];
    }

    get(id: string): Client | undefined {
        return this.db.prepare(SELECT_CLIENT_BY_ID).get(id) as Client | undefined;
    }

//   stats(): Stats {
//     const { total } = this.db.prepare(SELECT_FUND_COUNT).get() as { total: number };
//     const { totalAumMillions } = this.db
//       .prepare(SELECT_FUND_TOTAL_AUM)
//       .get() as { totalAumMillions: number };
//     return { total, totalAum: formatAum(totalAumMillions) };
//   }
}

export const clientsService = new ClientsService();
