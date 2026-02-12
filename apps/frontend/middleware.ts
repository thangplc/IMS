import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // NOTE: We're using localStorage for token storage (client-side)
  // So middleware can't check auth. Auth check happens in layout.tsx
  
  // Just allow all routes, auth check in client components
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
