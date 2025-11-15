import React from 'react'

import { getUserFromCookie } from '@/lib/auth'
import './styles.css'

export default async function HomePage() {
  const user = await getUserFromCookie()

  const dashboardUrl = '/dashboard'
  const primaryCtaLabel = user ? 'Open dashboard' : 'Login'

  return (
    <main className="landing">
      <header className="landing__nav">
        <div className="brand">
          <span className="brand__mark">B&B</span>
          <div>
            <p className="brand__name">Board &amp; Barter</p>
            <p className="brand__tagline">Marketplace CRM</p>
          </div>
        </div>
        <div className="nav-actions">
          {user && <p className="nav-actions__welcome">Hi, {user.email}</p>}
          <a className="button button--primary" href={dashboardUrl}>
            {primaryCtaLabel}
          </a>
        </div>
      </header>

      <section className="hero">
        <div className="hero__text">
          <p className="eyebrow">Simple trading OS</p>
          <h1>Organize every conversation, trade, and delivery.</h1>
          <p className="lead">
            Board &amp; Barter gives artisan marketplaces one clean place to track deals, barter
            requests, and upcoming shipments. No more spreadsheets, just clarity.
          </p>
          <div className="cta-group">
            <a className="button button--primary" href={dashboardUrl}>
              {primaryCtaLabel}
            </a>
            <a className="button button--ghost" href="mailto:hello@boardandbarter.app">
              Talk to us
            </a>
          </div>
        </div>
        <div className="hero__card">
          <p className="hero__card-label">Live metrics</p>
          <div className="hero__stat">
            <p>Open deals</p>
            <strong>128</strong>
          </div>
          <div className="hero__stat">
            <p>Fulfillment rate</p>
            <strong>96%</strong>
          </div>
          <div className="hero__stat">
            <p>Avg. turnaround</p>
            <strong>3.5 days</strong>
          </div>
          <p className="hero__hint">Data syncs from the Payload admin.</p>
        </div>
      </section>

      <section className="features">
        <article>
          <h3>Shared boards</h3>
          <p>Assign every barter request to a clear owner and stay aligned without pings.</p>
        </article>
        <article>
          <h3>Smart reminders</h3>
          <p>Automatic nudges keep suppliers on track and customers in the loop.</p>
        </article>
        <article>
          <h3>Audit-ready</h3>
          <p>Every change is stored in Payload, so finance can export the truth anytime.</p>
        </article>
      </section>
    </main>
  )
}
