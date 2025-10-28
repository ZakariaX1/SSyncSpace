import { Router } from 'express';

const router = Router();

router.get('/info', (req, res) => {
  res.json({ 
    space: 'islam',
    message: 'Islam space API is working!',
    availableEndpoints: ['/info', '/prayer-times']
  });
});

router.get('/prayer-times', (req, res) => {
  res.json({
    location: 'Default',
    times: {
      fajr: '05:30',
      sunrise: '06:45',
      dhuhr: '12:30',
      asr: '15:45',
      maghrib: '18:15',
      isha: '19:30'
    }
  });
});

export default router;