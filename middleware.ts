// src/middleware.ts
// Route protection middleware with RBAC

import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicRoutes = ['/auth/login', '/auth/register', '/auth/error', '/api/auth']

const roleRoutes: Record<string, string[]> = {
  '/admin': ['ADMIN'],
  '/manager': ['MANAGER', 'ADMIN'],
  '/employee': ['EMPLOYEE', 'MANAGER', 'ADMIN'],
}

export default auth((req) => {
  const { pathname } = req.nextUrl
  const session = req.auth

  // Allow public routes
  if (publicRoutes.some((r) => pathname.startsWith(r))) {
    return NextResponse.next()
  }

  // Redirect unauthenticated users
  if (!session) {
    const loginUrl = new URL('/auth/login', req.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Check role-based access
  for (const [route, allowedRoles] of Object.entries(roleRoutes)) {
    if (pathname.startsWith(route)) {
      if (!allowedRoles.includes(session.user.role)) {
        // Redirect to appropriate dashboard
        const roleRedirects: Record<string, string> = {
          EMPLOYEE: '/employee/dashboard',
          MANAGER: '/manager/dashboard',
          ADMIN: '/admin/dashboard',
        }
        return NextResponse.redirect(
          new URL(roleRedirects[session.user.role] || '/auth/login', req.url)
        )
      }
    }
  }

  // Root redirect to role-specific dashboard
  if (pathname === '/') {
    const roleRedirects: Record<string, string> = {
      EMPLOYEE: '/employee/dashboard',
      MANAGER: '/manager/dashboard',
      ADMIN: '/admin/dashboard',
    }
    return NextResponse.redirect(
      new URL(roleRedirects[session.user.role] || '/auth/login', req.url)
    )
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
}
