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
            Open Dashboard
          </Link>
        </div>
      </header>

      <section className="hero">
        <div className="hero__text">
          <h1>Board Game Collection</h1>
          <p className="lead">
            Master your tabletop empire with BoardGameGeek-inspired tracking. Manage loans, trades,
            and wishlists like a true guild leader. Your quest for the perfect collection starts
            here.
          </p>
        </div>
        <div className="hero__card">
          <p className="hero__card-label">GUILD SIGNALS</p>
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
          <p className="hero__hint">Syncs from Payload collections every 5 minutes.</p>
        </div>
      </section>

      <section className="features">
        <article>
          <h3>Shared Vaults</h3>
          <p>
            Tag, rank, and lend every box—from grails to prototypes. Your collection, organized like
            an RPG inventory.
          </p>
        </article>
        <article>
          <h3>Matchmaking Radar</h3>
          <p>
            Auto-alert when a barter partner logs a wanted title. Never miss a legendary trade
            opportunity.
          </p>
        </article>
        <article>
          <h3>Locale Ready</h3>
          <p>
            Track notes en français or in English. Multi-language support for your international
            gaming guild.
          </p>
        </article>
      </section>
    </main>
  )
}
