// lib/auth.js
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const JWT_SECRET = process.env.JWT_SECRET || '53be7c7fae339a02831a46bb8763ed1ef62a0517fe8ed3fb96795f869662668a'

// Verify JWT token
export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    return decoded
  } catch (error) {
    return null
  }
}

// Get current user from cookies
export async function getCurrentUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')

  if (!token) {
    return null
  }

  return verifyToken(token.value)
}

// Check if user is authenticated
export async function isAuthenticated() {
  const user = await getCurrentUser()
  return user !== null
}