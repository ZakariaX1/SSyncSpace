// TODO: This is a DTO (Data Transfer Object) — the shape that LEAVES the backend.
// Currently it mismatches the backend Prisma model:
// - Prisma: scheduledFor (DateTime), status (enum EventStatus with PERMISSION_PENDING, SCHEDULED, etc.)
// - Frontend here: date (string), status (simple lowercase string)
// 
// To fix:
// 1. Backend: Create a mapping function that transforms Prisma DiscordEvents to this DTO shape:
//    - scheduledFor → date (ISO string)
//    - status (enum) → status (normalized lowercase: 'pending' | 'scheduled' | 'ongoing' | 'completed' | 'cancelled')
// 2. Backend API: Return this DTO, not the raw Prisma model.
// 3. Frontend: Keep this DTO interface unchanged (it's the source of truth for what backend sends).
// 
// Example backend mapper:
// function eventToDTO(event: DiscordEvents): DiscordEvent {
//   return {
//     id: event.id,
//     title: event.title,
//     description: event.description,
//     date: event.scheduledFor.toISOString(),
//     status: mapStatus(event.status),  // SCHEDULED → 'scheduled'
//   };
// }

export interface DiscordEvent {
  id: number;
  title: string;
  description: string;
  date: string;  // ISO datetime string from backend
  status: 'pending' | 'scheduled' | 'ongoing' | 'completed' | 'cancelled';  // normalized lowercase
}

export interface CreateEventRequest {
  title: string;
  description: string;
  date: string;
}