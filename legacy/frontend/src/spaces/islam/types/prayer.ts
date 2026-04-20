export interface PrayerTimes {
  location: string;
  times: {
    fajr: string;
    sunrise: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  };
}

export interface PrayerTimeRequest {
  latitude: number;
  longitude: number;
  method?: string;
}