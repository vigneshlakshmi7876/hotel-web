import { type SectionId, SECTION_IDS, scrollToSection } from '../hooks/useActiveSection'

type FeaturedGlassRowProps = {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  price: string
  /** Alternate image left / right on large screens */
  reverse?: boolean
  /** Tailwind `object-*` position for the circular photo crop */
  imageObjectPosition?: string
  /** Arbitrary CSS filter utility for tuning a dull/over-bright photo */
  imageFilter?: string
}

export function FeaturedGlassRow({
  title,
  description,
  imageSrc,
  imageAlt,
  price,
  reverse = false,
  imageObjectPosition = 'object-center',
  imageFilter = '[filter:saturate(1.28)_contrast(1.08)_brightness(1.04)]',
}: FeaturedGlassRowProps) {
  const isPhoto = /\.(jpe?g|webp)$/i.test(imageSrc)
  const panelClass =
    'glass-card relative isolate overflow-hidden rounded-[2.75rem] border border-neutral-300/40 bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_22px_52px_rgba(0,0,0,0.12)] dark:border-white/10 dark:bg-[#101012] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_28px_64px_rgba(0,0,0,0.6)]'

  return (
    <article className="relative">
      <div className={panelClass}>
        {/* soft warm glow behind the plate */}
        <div
          className={[
            'pointer-events-none absolute top-1/2 hidden h-[26rem] w-[26rem] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(239,68,68,0.15),transparent_65%)] blur-2xl lg:block',
            reverse ? 'right-[2%]' : 'left-[2%]',
          ].join(' ')}
          aria-hidden
        />

        <div
          className={[
            'relative z-10 grid items-center gap-7 p-6 sm:p-8 lg:grid-cols-2 lg:gap-6 lg:p-10',
          ].join(' ')}
        >
          {/* Plate */}
          <div className={['flex justify-center', reverse ? 'lg:order-2' : 'lg:order-1'].join(' ')}>
            <div className="relative aspect-square w-[15rem] sm:w-[18rem] lg:w-[21rem]">
              <div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-neutral-200 to-neutral-300 ring-1 ring-black/10 dark:from-neutral-800 dark:to-neutral-950 dark:ring-white/10"
                aria-hidden
              />
              {isPhoto ? (
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  width={640}
                  height={640}
                  loading="lazy"
                  decoding="async"
                  className={[
                    'absolute inset-0 h-full w-full rounded-full object-cover shadow-[0_24px_50px_rgba(0,0,0,0.35)]',
                    imageObjectPosition,
                    imageFilter,
                  ].join(' ')}
                />
              ) : (
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  width={640}
                  height={640}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full scale-110 object-contain drop-shadow-[0_24px_30px_rgba(0,0,0,0.45)]"
                />
              )}
            </div>
          </div>

          {/* Content */}
          <div
            className={[
              'text-center lg:text-left',
              reverse ? 'lg:order-1 lg:pr-4' : 'lg:order-2 lg:pl-4',
            ].join(' ')}
          >
            <h3 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white md:text-4xl">
              {title}
            </h3>
            <p className="mx-auto mt-3 max-w-md text-pretty text-base font-medium leading-relaxed text-neutral-700 dark:text-neutral-300 lg:mx-0">
              {description}
            </p>
            <p className="mt-6 text-4xl font-black leading-none tabular-nums text-neutral-900 dark:text-white md:text-5xl">
              {price}
            </p>
            <div className="mt-6 flex items-center justify-center gap-3 lg:justify-start">
              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="inline-flex h-11 min-w-[8.5rem] items-center justify-center rounded-xl bg-red-600 px-6 text-sm font-semibold text-white shadow-md transition hover:bg-red-700"
              >
                Order Now
              </button>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  const id = 'contact' as SectionId
                  if (SECTION_IDS.includes(id)) scrollToSection(id)
                }}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white shadow-md transition hover:bg-red-700"
                aria-label="Open contact to reserve"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden
                >
                  <path d="M6 8h12l-1.2 10H7.2z" />
                  <path d="M9.25 8V6.8a2.75 2.75 0 0 1 5.5 0V8" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
