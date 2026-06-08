import { Hono } from 'hono';
import { clientsService } from './clients.service';

export const clientsRoute = new Hono();

clientsRoute.get('/', (c) => {
  return c.json(clientsService.list());
});

// fundsRoute.get('/stats', (c) => {
//   return c.json(clientsService.stats());
// });

clientsRoute.get('/:id', (c) => {
  const client = clientsService.get(c.req.param('id'));
  if (!client) return c.json({ error: 'Client not found' }, 404);
  return c.json(client);
});
