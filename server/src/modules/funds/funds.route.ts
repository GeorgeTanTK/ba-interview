import { Hono } from 'hono';
import { fundsService } from './funds.service';

export const fundsRoute = new Hono();

fundsRoute.get('/', (c) => {
  return c.json(fundsService.list());
});

fundsRoute.get('/stats', (c) => {
  return c.json(fundsService.stats());
});

fundsRoute.get('/:ticker', (c) => {
  const fund = fundsService.get(c.req.param('ticker'));
  if (!fund) return c.json({ error: 'Fund not found' }, 404);
  return c.json(fund);
});
