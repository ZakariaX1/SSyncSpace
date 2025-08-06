// Basic types for the application
// Note: Prisma types will be available after running npm run db:generate

// User roles
export type UserRole = 'GUEST' | 'MEMBER' | 'STAFF' | 'ADMIN'

// Event statuses
export type EventStatus = 'PLANNED' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED'

// Suggestion statuses  
export type SuggestionStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'IN_REVIEW'

// Base user interface
export interface User {
  id: string
  name?: string | null
  email?: string | null
  emailVerified?: Date | null
  image?: string | null
  discordId?: string | null
  username?: string | null
  discriminator?: string | null
  role: UserRole
  isStaff: boolean
  createdAt: Date
  updatedAt: Date
}

// Base event interface
export interface Event {
  id: string
  title: string
  description: string
  startTime: Date
  endTime?: Date | null
  status: EventStatus
  engagementCount: number
  maxParticipants?: number | null
  currentParticipants: number
  hostId: string
  createdAt: Date
  updatedAt: Date
}

// Base event suggestion interface
export interface EventSuggestion {
  id: string
  title: string
  description: string
  suggestedTime?: Date | null
  status: SuggestionStatus
  suggestedById: string
  adminNotes?: string | null
  createdAt: Date
  updatedAt: Date
}

// Extended user type with session data
export interface SessionUser extends User {
  id: string
  role: UserRole
  isStaff: boolean
  discordId?: string | null
  username?: string | null
}

// API Response types
export interface ApiResponse<T = any> {
  data?: T
  error?: string
  message?: string
}

// Event types with relations
export interface EventWithHost extends Event {
  host: {
    name: string | null
    username: string | null
  }
}

export interface EventSuggestionWithUser extends EventSuggestion {
  suggestedBy: {
    name: string | null
    username: string | null
  }
}

// Form data types
export interface CreateEventData {
  title: string
  description: string
  startTime: string
  endTime?: string
  maxParticipants?: number
}

export interface CreateSuggestionData {
  title: string
  description: string
  suggestedTime?: string
}

// Frontend component props
export interface EventCardProps {
  event: EventWithHost
  canEdit?: boolean
}

export interface SuggestionCardProps {
  suggestion: EventSuggestionWithUser
  canApprove?: boolean
}

// Navigation types
export interface NavLink {
  href: string
  label: string
  requiresAuth?: boolean
  requiresStaff?: boolean
}
