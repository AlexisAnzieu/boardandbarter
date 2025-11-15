import { errors } from 'jose'
import { NextRequest, NextResponse } from 'next/server'

export const AUTH_COOKIE_NAME = 'payload-token'

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
}

export async function middleware(req: NextRequest) {
  const authUrl = buildAuthUrl(req.nextUrl.pathname + req.nextUrl.search)
  const token = req.cookies.get(AUTH_COOKIE_NAME)?.value

  if (!token) {
    return NextResponse.redirect(authUrl)
  }

  try {
    return NextResponse.next()
  } catch (error) {
    if (error instanceof errors.JWTExpired) {
      return NextResponse.redirect(authUrl)
    }
    console.error('Unexpected auth middleware error', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export function buildAuthUrl(currentPath: string = '/') {
  const authBaseUrl = process.env.AUTH_URL
  const websiteId = process.env.AUTH_WEBSITE_ID
  const websiteUrl = process.env.WEBSITE_URL

  if (!authBaseUrl || !websiteId) {
    throw new Error('AUTH_URL and AUTH_WEBSITE_ID must be configured')
  }

  const callbackUrl = `${websiteUrl}/api/auth/callback?redirectUrl=${encodeURIComponent(currentPath)}`
  return `${authBaseUrl}/login?id=${websiteId}&callbackUrl=${encodeURIComponent(callbackUrl)}`
}
