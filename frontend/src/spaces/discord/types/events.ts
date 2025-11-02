export interface DiscordEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
}

export interface CreateEventRequest {
  title: string;
  description: string;
  date: string;
}