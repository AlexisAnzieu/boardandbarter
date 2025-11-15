import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { AUTH_COOKIE_NAME, buildAuthUrl } from '@/middleware'

export async function getUserFromCookie() {
  const payload = await getPayload({ config })
  const cookiesStore = await cookies()
  const token = cookiesStore.get(AUTH_COOKIE_NAME)?.value

  if (!token) {
    redirect(buildAuthUrl('/dashboard'))
  }

  const headers = new Headers()
  headers.set('Cookie', `${AUTH_COOKIE_NAME}=${token}`)

  const { user } = await payload.auth({
    headers,
  })

  if (!user) {
    redirect(buildAuthUrl('/dashboard'))
  }

  return user
}
