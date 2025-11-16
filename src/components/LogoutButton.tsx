import React from 'react'
import { redirect } from 'next/navigation'
import { logout } from '@payloadcms/next/auth'

import payloadConfig from '@/payload.config'

const baseClassName = 'button'

type Variant = 'primary' | 'ghost'

function getClassName(variant: Variant) {
  const variantClass = variant === 'primary' ? 'button--primary' : 'button--ghost'
  return `${baseClassName} ${variantClass}`
}

export type LogoutButtonProps = {
  variant?: Variant
  label?: string
  redirectTo?: string
  allSessions?: boolean
}

export function LogoutButton({
  variant = 'ghost',
  label = 'Log out',
  redirectTo = '/',
}: LogoutButtonProps) {
  async function handleLogout() {
    'use server'

    const result = await logout({
      config: payloadConfig,
    })

    if (!result.success) {
      throw new Error(result.message)
    }

    redirect(redirectTo)
  }

  return (
    <form action={handleLogout} className="logout-form">
      <button className={getClassName(variant)} type="submit">
        {label}
      </button>
    </form>
  )
}
