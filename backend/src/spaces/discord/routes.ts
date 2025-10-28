import { Router } from 'express';

const router = Router();

router.get('/info', (req, res) => {
  res.json({ 
    space: 'discord',
    message: 'Discord space API is working!',
    availableEndpoints: ['/info', '/events']
  });
});

router.get('/events', (req, res) => {
  res.json({
    events: [
      {
        id: 1,
        title: 'Gaming Night',
        description: 'Weekly gaming session',
        date: '2025-11-01T20:00:00Z',
        status: 'scheduled'
      }
    ]
  });
});

export default router;