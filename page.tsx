// src/app/page.tsx
// Root page - middleware handles redirect to role-specific dashboard
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'

export default async function RootPage() {
  const session = await auth()

  if (!session) redirect('/auth/login')

  const roleRedirects: Record<string, string> = {
    EMPLOYEE: '/employee/dashboard',
    MANAGER: '/manager/dashboard',
    ADMIN: '/admin/dashboard',
  }

  redirect(roleRedirects[session.user.role] || '/auth/login')
}
