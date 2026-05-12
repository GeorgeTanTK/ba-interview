import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';
import './db';
import { fundsRoute } from './modules/funds/funds.route';

const app = new Hono();

app.use('/*', cors());

app.get('/api/health', (c) => c.json({ ok: true }));

app.route('/api/funds', fundsRoute);

const port = 8787;
serve({ fetch: app.fetch, port });
console.log(`Server running on http://localhost:${port}`);
