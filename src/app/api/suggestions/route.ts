import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const createSuggestionSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(1000),
  suggestedTime: z.string().datetime().optional(),
})

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    // Only staff/admin can view suggestions
    if (!session?.user?.isStaff) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const suggestions = await prisma.eventSuggestion.findMany({
      include: {
        suggestedBy: {
          select: { name: true, username: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    
    return NextResponse.json({ suggestions })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch suggestions' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.isStaff) {
      return NextResponse.json(
        { error: 'Only staff members can submit suggestions' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = createSuggestionSchema.parse(body)
    
    const suggestion = await prisma.eventSuggestion.create({
      data: {
        ...validatedData,
        suggestedTime: validatedData.suggestedTime ? new Date(validatedData.suggestedTime) : null,
        suggestedById: session.user.id,
      },
      include: {
        suggestedBy: {
          select: { name: true, username: true }
        }
      }
    })
    
    return NextResponse.json({ suggestion }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to create suggestion' },
      { status: 500 }
    )
  }
}
