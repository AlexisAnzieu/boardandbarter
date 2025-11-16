import React from 'react'

import { getUserFromCookie } from '@/lib/auth'
import './styles.css'
import Link from 'next/link'

export default async function HomePage() {
  return (
    <main className="landing">
      <header className="landing__nav">
        <div className="brand">
          <span className="brand__mark">B&B</span>
          <div>
            <p className="brand__name">Board &amp; Barter</p>
            <p className="brand__tagline">Collection &amp; barter HQ</p>
          </div>
        </div>
        <div className="nav-actions">
          <Link className="button button--primary" href="/dashboard">
            Open dashboard
          </Link>
        </div>
      </header>

      <section className="hero">
        <div className="hero__text">
          <p className="eyebrow">Tabletop trading OS</p>
          <h1>Curate every game loan, trade, and wish list drop.</h1>
          <p className="lead">
            Inspired by the BoardGameGeek colors you know, Board &amp; Barter keeps your shelves,
            swap queues, and delivery routes perfectly in sync for clubs, cafés, and collectors.
          </p>
        </div>
        <div className="hero__card">
          <p className="hero__card-label">Guild signals</p>
          <div className="hero__stat">
            <p>Games catalogued</p>
            <strong>642</strong>
          </div>
          <div className="hero__stat">
            <p>Trades cleared</p>
            <strong>92%</strong>
          </div>
          <div className="hero__stat">
            <p>Avg. turnaround</p>
            <strong>2.1 days</strong>
          </div>
          <p className="hero__hint">Syncs directly from Payload collections every 5 minutes.</p>
        </div>
      </section>

      <section className="features">
        <article>
          <h3>Shared vaults</h3>
          <p>Tag, rank, and lend every box—from grails to prototypes—without juggling sheets.</p>
        </article>
        <article>
          <h3>Matchmaking radar</h3>
          <p>Alert the right players when a barter partner logs a wanted title or variant.</p>
        </article>
        <article>
          <h3>Locale ready</h3>
          <p>Track notes en français or in English so every club host stays in the loop.</p>
        </article>
      </section>
    </main>
  )
}
