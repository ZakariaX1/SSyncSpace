import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const createEventSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(1000),
  startTime: z.string().datetime(),
  endTime: z.string().datetime().optional(),
  maxParticipants: z.number().optional(),
})

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      include: {
        host: {
          select: { name: true, username: true }
        }
      },
      orderBy: { startTime: 'asc' }
    })
    
    return NextResponse.json({ events })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.isStaff) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = createEventSchema.parse(body)
    
    const event = await prisma.event.create({
      data: {
        ...validatedData,
        startTime: new Date(validatedData.startTime),
        endTime: validatedData.endTime ? new Date(validatedData.endTime) : null,
        hostId: session.user.id,
      },
      include: {
        host: {
          select: { name: true, username: true }
        }
      }
    })
    
    return NextResponse.json({ event }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    )
  }
}
