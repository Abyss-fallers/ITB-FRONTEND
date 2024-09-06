import { jwtVerify } from 'jose'
import { NextRequest, NextResponse } from 'next/server'

const ACCESS_TOKEN_SECRET = new TextEncoder().encode(
  process.env.ACCESS_TOKEN_SECRET,
)
const REFRESH_TOKEN_SECRET = new TextEncoder().encode(
  process.env.REFRESH_TOKEN_SECRET,
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
  const cookiesHeader = request.headers.get('cookie') || ''
  const cookies = parseCookies(cookiesHeader)
  const accessToken = cookies['accessToken']?.trim()
  const refreshToken = cookies['refreshToken']?.trim()

  if (!accessToken || !refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    // Validate access token
    await jwtVerify(accessToken, ACCESS_TOKEN_SECRET)
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
        body: JSON.stringify({ token: refreshToken }),
      })

      if (response.ok) {
        const { data } = await response.json()
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          data

        const responseNext = NextResponse.next()
        responseNext.cookies.set('accessToken', newAccessToken)

        // Обновление refreshToken в cookies, если сервер его предоставляет
        if (newRefreshToken) {
          responseNext.cookies.set('refreshToken', newRefreshToken)
        }

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
