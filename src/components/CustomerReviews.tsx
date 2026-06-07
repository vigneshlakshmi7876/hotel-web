import tandooriBg from '../assets/menu/tandoori.jpg'
import { SectionTitle } from './SectionTitle'

const reviews = [
  {
    name: 'Priya N.',
    location: 'Chennai',
    rating: 5,
    text: 'We stayed two nights and ate here both evenings. The briyani was fragrant and the service felt genuinely warm — rare for a city hotel.',
  },
  {
    name: 'James M.',
    location: 'London',
    rating: 5,
    text: 'Outstanding tandoori and parotta. The dining room is quiet enough for a business dinner but still feels special. Will book again.',
  },
  {
    name: 'Ananya R.',
    location: 'Bengaluru',
    rating: 4,
    text: 'Breakfast dosa was crisp and the coffee was strong. Only small wait at peak hour — staff kept us updated. Lovely stay overall.',
  },
]

function initials(name: string) {
  const parts = name.replace(/\./g, '').split(/\s+/)
  const a = parts[0]?.[0] ?? '?'
  const b = parts[1]?.[0] ?? ''
  return (a + b).toUpperCase()
}

function Stars({ count }: { count: number }) {
  return (
    <span className="flex gap-0.5 text-red-600 dark:text-red-400" aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill={i < count ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="1.5"
          className={i < count ? '' : 'opacity-30'}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  )
}

export function CustomerReviews({ sectionId }: { sectionId?: string }) {
  return (
    <section
      id={sectionId}
      className="relative scroll-mt-[5.5rem] overflow-hidden border-y border-neutral-200 bg-neutral-100 px-4 py-16 dark:border-neutral-800 dark:bg-black md:py-24"
    >
      {/* Soft abstract backdrop — heavy blur orbs, no boxed food photo */}
      <div
        className="pointer-events-none absolute -right-[12%] top-1/2 h-[min(90vw,520px)] w-[min(90vw,520px)] -translate-y-1/2 opacity-[0.14] dark:opacity-[0.22]"
        aria-hidden
      >
        <img
          src={tandooriBg}
          alt=""
          className="h-full w-full rounded-full object-cover blur-[80px] [filter:saturate(1.4)_brightness(0.9)]"
          width={900}
          height={900}
          decoding="async"
        />
      </div>
      <div
        className="pointer-events-none absolute -left-[8%] bottom-[5%] h-[min(70vw,380px)] w-[min(70vw,380px)] opacity-[0.08] dark:opacity-[0.14]"
        aria-hidden
      >
        <img
          src={tandooriBg}
          alt=""
          className="h-full w-full rounded-full object-cover blur-[72px] [filter:saturate(1.2)_hue-rotate(15deg)]"
          width={600}
          height={600}
          decoding="async"
        />
      </div>
      <div
        className="pointer-events-none absolute right-[18%] top-[8%] h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(239,68,68,0.2),transparent_70%)] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-[12%] left-[20%] h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.16),transparent_70%)] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-neutral-100/90 via-neutral-100/75 to-neutral-100 dark:from-black/85 dark:via-black/70 dark:to-black"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <header className="mb-12 text-center md:mb-16">
          <SectionTitle before="What They " accent="Say?" />
        </header>

        <div className="grid gap-6 md:grid-cols-3 md:gap-5 lg:gap-8">
          {reviews.map((r) => (
            <article
              key={r.name}
              className="glass-card flex flex-col rounded-[2.5rem] rounded-tr-[1.1rem] rounded-bl-[1.1rem] border border-neutral-200/80 bg-white p-6 shadow-lg shadow-neutral-900/5 dark:border-white/10 dark:bg-[#101012] dark:shadow-black/40 md:p-7"
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-emerald-600 text-sm font-bold text-white shadow-md ring-2 ring-white/50 dark:ring-white/15"
                  aria-hidden
                >
                  {initials(r.name)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold leading-tight text-neutral-900 dark:text-white">{r.name}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="sr-only">{r.rating} out of 5 stars</span>
                    <Stars count={r.rating} />
                  </div>
                </div>
              </div>
              <p className="mt-5 flex-1 text-pretty text-sm font-medium leading-relaxed text-neutral-600 dark:text-neutral-300">
                {r.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
