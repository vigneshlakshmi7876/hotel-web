import type { MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { type SectionId, SECTION_IDS, scrollToSection } from '../hooks/useActiveSection'

const cardBody =
  'glass-card rounded-[2.75rem] rounded-tr-[1.4rem] rounded-bl-[1.4rem] border border-neutral-300/80 bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_20px_42px_rgba(0,0,0,0.1)] dark:border-white/10 dark:bg-[#101012] dark:shadow-[0_28px_60px_rgba(0,0,0,0.7)]'

type ProductCardProps = {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  loading: 'lazy' | 'eager'
  priceLabel?: string
  orderLink?: string
  imagePresentation?: 'photo'
  imagePhotoObjectPosition?: string
}

function goOrder(e: MouseEvent, orderLink: string) {
  if (!orderLink.startsWith('#')) return
  e.preventDefault()
  const id = orderLink.slice(1) as SectionId
  if (SECTION_IDS.includes(id)) scrollToSection(id)
}

function bagSvg() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-red-500 dark:text-red-400" aria-hidden>
      <path d="M6 8h12l-1.2 10H7.2z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M9.25 8V6.8a2.75 2.75 0 0 1 5.5 0V8" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  )
}

function BagButton({ orderLink, title }: { orderLink: string; title: string }) {
  const cls =
    'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-red-500/70 bg-black/20 transition hover:bg-red-500/10 dark:border-red-400/70 dark:bg-black/35 dark:hover:bg-red-500/10'

  if (orderLink.startsWith('#')) {
    return (
      <a
        href={orderLink}
        onClick={(e) => goOrder(e, orderLink)}
        className={cls}
        aria-label={`Reserve or enquire — ${title}`}
      >
        {bagSvg()}
      </a>
    )
  }
  return (
    <Link to={orderLink} className={cls} aria-label={`Reserve or enquire — ${title}`}>
      {bagSvg()}
    </Link>
  )
}

/** Compact WorldPlate-like tile: floating image + dark glass copy panel + price/bag row. */
export function ProductCard({
  title,
  description,
  imageSrc,
  imageAlt,
  loading,
  priceLabel,
  orderLink,
  imagePresentation,
  imagePhotoObjectPosition = 'object-center',
}: ProductCardProps) {
  const isPhoto = imagePresentation === 'photo'
  const imageShadow =
    'drop-shadow-[0_18px_30px_rgba(0,0,0,0.35)] dark:drop-shadow-[0_22px_34px_rgba(0,0,0,0.75)]'

  return (
    <article className="group relative flex flex-col">
      <div
        className={[
          'relative z-10 flex flex-1 flex-col p-5 sm:p-6',
          cardBody,
        ].join(' ')}
      >
        <div className="mb-5 flex items-center justify-center">
          {isPhoto ? (
            <div className={imageShadow}>
              <div className="aspect-square w-full max-w-[15rem] overflow-hidden rounded-[1.6rem] ring-1 ring-black/10 dark:ring-white/12">
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  width={800}
                  height={600}
                  loading={loading}
                  decoding="async"
                  className={[
                    'h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]',
                    imagePhotoObjectPosition,
                  ].join(' ')}
                />
              </div>
            </div>
          ) : (
            <div className={imageShadow}>
              <img
                src={imageSrc}
                alt={imageAlt}
                width={800}
                height={600}
                loading={loading}
                decoding="async"
                className="h-auto max-h-[11rem] w-auto max-w-full object-contain transition-transform duration-300 ease-out group-hover:scale-[1.04]"
              />
            </div>
          )}
        </div>

        <h3 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
            {title}
        </h3>
        <p className="mt-3 min-h-[4.5rem] text-pretty text-sm font-medium leading-relaxed text-neutral-600 dark:text-neutral-300">
          {description}
        </p>

        <div className="mt-4 flex items-end justify-between gap-3 border-t border-neutral-200/70 pt-4 dark:border-white/12">
          {priceLabel ? (
            <p className="text-[2rem] font-black leading-none tabular-nums text-neutral-900 dark:text-white">
              {priceLabel}
            </p>
          ) : (
            <span />
          )}
          {orderLink ? <BagButton orderLink={orderLink} title={title} /> : null}
        </div>
      </div>
    </article>
  )
}
