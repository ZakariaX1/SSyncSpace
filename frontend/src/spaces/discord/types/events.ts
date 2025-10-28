export interface DiscordEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  attendees?: string[];
}

export interface DiscordEventsResponse {
  events: DiscordEvent[];
}

export interface CreateEventRequest {
  title: string;
  description: string;
  date: string;
}