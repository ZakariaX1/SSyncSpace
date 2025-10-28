import { Router } from 'express';

const router = Router();

router.get('/info', (req, res) => {
  res.json({ 
    space: 'root',
    message: 'Root space API is working!',
    availableEndpoints: ['/info']
  });
});

export default router;