import { jwtVerify } from 'jose'
import { NextRequest, NextResponse } from 'next/server'

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default_secret',
)

const parseCookies = (cookieHeader: string): Record<string, string> => {
  return cookieHeader.split('; ').reduce(
    (cookies, cookie) => {
      const [name, value] = cookie.split('=')
      cookies[name] = value
      return cookies
    },
    {} as Record<string, string>,
  )
}

export async function middleware(request: NextRequest) {
  console.log('Middleware triggered for:', request.nextUrl.pathname)

  const cookiesHeader = request.headers.get('cookie') || ''
  const cookies = parseCookies(cookiesHeader)
  const token = cookies['token']?.trim()

  if (!token) {
    console.log('Token is missing')
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY)
    console.log('Decoded token:', payload)
    return NextResponse.next()
  } catch (err) {
    console.error('Invalid token:', err)
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/modules/:path*'],
}
