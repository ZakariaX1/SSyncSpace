import { DefaultSession } from 'next-auth'
import { UserRole } from '@prisma/client'

declare module 'next-auth' {
  interface Session {
    user?: {
      id: string
      role: UserRole
      isStaff: boolean
      discordId?: string | null
      username?: string | null
    } & DefaultSession['user']
  }
}
