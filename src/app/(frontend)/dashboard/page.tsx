import Link from 'next/link'

import { getUserFromCookie } from '@/lib/auth'
import '../styles.css'

function getGreeting(name?: string | null) {
  if (!name) return 'Operator'
  const [first] = name.split(' ')
  return first || 'Operator'
}

export default async function DashboardPage() {
  const user = await getUserFromCookie()

  const greeting = user?.name ? getGreeting(user.name) : getGreeting(user?.email)

  const highlights = [
    { label: 'Open deals', value: '24', trend: '+4 today' },
    { label: 'Awaiting pickup', value: '11', trend: '2 delayed' },
    { label: 'New barter requests', value: '7', trend: '3 VIP' },
  ]

  const timeline = [
    { title: 'Incoming: Ceramic set', meta: 'Yasmin (Harbor Co.)', time: '08:32' },
    { title: 'Outbound: Linen run', meta: 'Delaine Atelier', time: '09:10' },
    { title: 'Invoice approved', meta: 'La Brise Collective', time: '10:05' },
  ]

  return (
    <main className="dashboard">
      <header className="dashboard__header">
        <div>
          <p className="eyebrow">Live overview</p>
          <h1>Morning, {greeting}</h1>
          <p className="lead">Quick view of today&apos;s trading pulse.</p>
        </div>
        <div className="dashboard__actions">
          <Link className="button button--ghost" href="mailto:hello@boardandbarter.app">
            Need help?
          </Link>
        </div>
      </header>

      <section className="dashboard__stats">
        {highlights.map((item) => (
          <article key={item.label} className="dashboard__card">
            <p className="dashboard__card-label">{item.label}</p>
            <strong>{item.value}</strong>
            <span>{item.trend}</span>
          </article>
        ))}
      </section>

      <section className="dashboard__panel">
        <div className="dashboard__panel-header">
          <h2>Logbook</h2>
          <p>
            Last synced{' '}
            {new Intl.DateTimeFormat('en', { hour: '2-digit', minute: '2-digit' }).format(
              new Date(),
            )}
          </p>
        </div>
        <ul className="dashboard__timeline">
          {timeline.map((entry) => (
            <li key={entry.title}>
              <div>
                <p className="dashboard__timeline-title">{entry.title}</p>
                <p className="dashboard__timeline-meta">{entry.meta}</p>
              </div>
              <span>{entry.time}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
