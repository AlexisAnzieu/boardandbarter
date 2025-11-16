import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'

import payloadConfig from '@/payload.config'
import { AUTH_COOKIE_NAME } from '@/middleware'

const DEFAULT_REDIRECT_PATH = '/dashboard'

export async function GET(req: NextRequest) {
  const searchParams = new URL(req.url).searchParams
  const token = searchParams.get('token')
  const redirectParam = searchParams.get('redirectUrl') || DEFAULT_REDIRECT_PATH

  if (!token) {
    return new NextResponse('Missing token', { status: 400 })
  }

  try {
    const payloadInstance = await getPayload({ config: await payloadConfig })

    // Decode the SSO token to get user data from the external database
    const decoded = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
    const { cid, email, name } = decoded

    if (!cid || !email) {
      throw new Error('Invalid SSO token: missing required fields')
    }

    // Find or create user in local Payload database based on external ID
    const existingUsers = await payloadInstance.find({
      collection: 'users',
      depth: 0,
      limit: 1,
      where: {
        unifiedId: {
          equals: cid,
        },
      },
    })

    const sharedPassword = process.env.PAYLOAD_SSO_SHARED_PASSWORD
    if (!sharedPassword) {
      throw new Error('PAYLOAD_SSO_SHARED_PASSWORD is not configured')
    }

    const userData = {
      email,
      name,
      unifiedId: cid,
      password: sharedPassword,
    }

    // Update existing user or create new one
    if (existingUsers.docs.length > 0) {
      await payloadInstance.update({
        collection: 'users',
        id: existingUsers.docs[0].id,
        data: userData,
        depth: 0,
      })
    } else {
      await payloadInstance.create({
        collection: 'users',
        data: userData,
        depth: 0,
      })
    }

    // Login to generate a fresh local Payload token
    const loginResult = await payloadInstance.login({
      collection: 'users',
      data: {
        email,
        password: sharedPassword,
      },
      depth: 0,
    })

    if (!loginResult.token) {
      throw new Error('Failed to generate local authentication token')
    }

    const redirectPath = redirectParam.startsWith('/') ? redirectParam : DEFAULT_REDIRECT_PATH
    const redirectUrl = new URL(redirectPath, process.env.WEBSITE_URL)

    const response = NextResponse.redirect(redirectUrl.toString())

    response.cookies.set(AUTH_COOKIE_NAME, loginResult.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
    })

    return response
  } catch (error) {
    console.error('Auth callback failed', error)
    return new NextResponse('Token verification failed', { status: 401 })
  }
}
