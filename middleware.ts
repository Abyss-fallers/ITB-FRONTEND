import { jwtVerify } from 'jose'
import { NextRequest, NextResponse } from 'next/server'

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET)

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
  const accessToken = cookies['accessToken']?.trim()
  const refreshToken = cookies['refreshToken']?.trim()

  if (!accessToken || !refreshToken) {
    console.log('Tokens are missing')
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    const { payload } = await jwtVerify(accessToken, SECRET_KEY)
    console.log('Decoded token:', payload)
    return NextResponse.next()
  } catch (err) {
    console.error('Access token invalid or expired:', err)

    // Handle token refresh
    try {
      const response = await fetch('http://localhost:4444/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: refreshToken }), // Correctly send the refresh token
      })

      if (response.ok) {
        const { data } = await response.json()
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          data

        const responseNext = NextResponse.next()
        responseNext.cookies.set('accessToken', newAccessToken)
        responseNext.cookies.set('refreshToken', newRefreshToken)
        return responseNext
      } else {
        throw new Error('Failed to refresh token')
      }
    } catch (refreshErr) {
      console.error('Error refreshing token:', refreshErr)
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
}

export const config = {
  matcher: ['/modules/:path*', '/profile/:path*'],
}
