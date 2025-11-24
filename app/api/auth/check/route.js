// app/api/auth/check/route.js
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 200 })
    }

    // Verify token
    const decoded = jwt.verify(token.value, JWT_SECRET)

    return NextResponse.json({ 
      authenticated: true,
      user: {
        userId: decoded.userId,
        email: decoded.email
      }
    }, { status: 200 })

  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 200 })
  }
}