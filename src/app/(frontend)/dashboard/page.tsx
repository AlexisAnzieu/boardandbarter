import { LogoutButton } from '@/components/LogoutButton'
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
    { label: 'Active trades', value: '18', trend: '4 awaiting confirmation' },
    { label: 'Ready to ship', value: '9', trend: 'Kingdom Death next' },
    { label: 'Watchlist matches', value: '5', trend: '2 bilingual notes' },
  ]

  const timeline = [
    { title: 'Sleeve check: Brass Birmingham', meta: 'Melanie • Club Meeple', time: '08:12' },
    { title: 'Swap confirmed: Ark Nova FR/EN', meta: 'Axel <-> Jo', time: '09:05' },
    { title: 'Courier booked: Frosthaven insert', meta: 'La Taniere', time: '10:44' },
  ]

  return (
    <main className="dashboard">
      <header className="dashboard__header">
        <div>
          <p className="eyebrow">BoardGameGeek palette</p>
          <h1>Morning, {greeting}</h1>
          <p className="lead">
            Here&apos;s what&apos;s happening across your shelves, swaps, and club drops.
          </p>
        </div>
        <div className="dashboard__header-actions">
          <LogoutButton label="Log out" />
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
          <h2>Collector logbook</h2>
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
