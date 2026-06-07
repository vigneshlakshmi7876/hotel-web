import { useLayoutEffect } from 'react'
import darkChef from '../assets/about/dark-chef.png'
import lightChef from '../assets/about/light-chef.png'
import briyani from '../assets/menu/briyani.jpg'
import lollipop from '../assets/menu/lollipop.jpg'
import masalaDosa from '../assets/menu/masal-dosa.png'
import { ContactSection } from '../components/ContactSection'
import { CustomerReviews } from '../components/CustomerReviews'
import { FeaturedGlassRow } from '../components/FeaturedGlassRow'
import { ProductCard } from '../components/ProductCard'
import { SectionTitle } from '../components/SectionTitle'
import { menuItems } from '../data/menuItems'
import { type SectionId, SECTION_IDS, scrollToSection } from '../hooks/useActiveSection'

const priceById: Record<string, string> = {
  'ghee-roast': '₹ 320 /-',
  'masala-dosa': '₹ 280 /-',
  briyani: '₹ 420 /-',
  'bun-parotta': '₹ 240 /-',
  lollipop: '₹ 360 /-',
  parotta: '₹ 220 /-',
  tandoori: '₹ 480 /-',
}

/** Avatars sit between “Taste” and “of” (WorldPlate hero). */
function HeroAvatarInline() {
  const colors = ['bg-red-500', 'bg-emerald-500', 'bg-red-600']
  return (
    <span className="mx-1.5 inline-flex align-middle" aria-hidden>
      {colors.map((c, i) => (
        <span
          key={i}
          className={`inline-block h-8 w-8 rounded-full border-2 border-white shadow-md ring-2 ring-neutral-200 dark:border-neutral-900 dark:ring-white/30 ${c} ${i > 0 ? '-ml-2.5' : ''}`}
        />
      ))}
    </span>
  )
}

/** Promo strip: three faces + +40 badge (white banner). */
function PromoSocialProof() {
  return (
    <div className="mt-6 flex flex-col items-center gap-2 md:items-start">
      <div className="flex -space-x-2" aria-hidden>
        {['bg-red-600', 'bg-emerald-600', 'bg-amber-700'].map((c, i) => (
          <span
            key={i}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-[11px] font-bold text-white shadow-sm ${c}`}
          >
            {String.fromCharCode(65 + i)}
          </span>
        ))}
        <span className="z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-red-600 text-[11px] font-bold text-white shadow-sm">
          +40
        </span>
      </div>
      <p className="text-center text-sm font-semibold text-neutral-700 dark:text-neutral-300 md:text-left">
        People grabbed the offer.
      </p>
    </div>
  )
}

const deliveredShowcase = [
  {
    key: 'd1',
    title: 'Breakfast specials',
    description:
      'Masala dosa, filter coffee, and chutney flight — the same crisp edge every morning, fired on the tawa to order.',
    imageSrc: masalaDosa,
    imageAlt: 'Masala dosa platter',
    price: '₹ 280 /-',
    reverse: false,
    imageObjectPosition: 'object-center',
    imageFilter: '[filter:saturate(1.28)_contrast(1.08)_brightness(1.04)]',
  },
  {
    key: 'd2',
    title: 'House clay-pot briyani',
    description:
      'Seeraga samba rice, slow-cooked meat or veg, sealed with dough — bold spices, no shortcuts on ghee.',
    imageSrc: briyani,
    imageAlt: 'Briyani on a plate',
    price: '₹ 420 /-',
    reverse: true,
    imageObjectPosition: 'object-center',
    imageFilter: '[filter:saturate(1.28)_contrast(1.08)_brightness(1.04)]',
  },
  {
    key: 'd3',
    title: 'Signature ghee roast',
    description:
      'Paper-thin roast, lacquered with ghee, with milagai podi on the side — our most photographed plate.',
    imageSrc: menuItems.find((m) => m.id === 'ghee-roast')!.imageSrc,
    imageAlt: 'Ghee roast dosa',
    price: '₹ 320 /-',
    reverse: false,
    imageObjectPosition: 'object-[45%_58%]',
    imageFilter: '[filter:saturate(1.65)_contrast(1.18)_brightness(1.06)]',
  },
]

export default function HomePage() {
  useLayoutEffect(() => {
    const raw = window.location.hash.slice(1) as SectionId
    if (raw && SECTION_IDS.includes(raw)) {
      const el = document.getElementById(raw)
      if (el) {
        el.scrollIntoView({ behavior: 'auto', block: 'start' })
      }
    }
  }, [])

  return (
    <div className="overflow-x-hidden bg-white dark:bg-black">
      {/* #home — WorldPlate-style hero (dark canvas + light variant) */}
      <section
        id="home"
        className="scroll-mt-[5.5rem] border-b border-neutral-200 bg-white px-4 pb-16 pt-8 dark:border-0 dark:bg-black lg:pb-20 lg:pt-12"
      >
        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div className="order-2 flex flex-col text-center lg:order-1 lg:text-left">
            <h1 className="text-4xl font-bold leading-[1.12] tracking-tight text-neutral-900 dark:text-white md:text-5xl lg:text-6xl">
              Experience the{' '}
              <span className="inline-block border-b-[5px] border-red-500 pb-1 text-red-500 dark:border-red-500 dark:text-red-400">
                Taste
              </span>
              <HeroAvatarInline />
              <span className="text-neutral-900 dark:text-white"> of the </span>
              <span className="text-emerald-600 dark:text-emerald-400">World</span>
              <span className="text-neutral-400">.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-pretty text-base leading-relaxed text-neutral-600 dark:text-neutral-300 md:text-lg lg:mx-0">
              From classic favourites to bold regional plates, explore South Indian, North Indian, and
              Chinese dishes crafted with the same care every day.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <div className="flex h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-neutral-200 shadow-md ring-2 ring-neutral-100 dark:border-white/25 dark:ring-white/10">
                <img
                  src={lollipop}
                  alt=""
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => scrollToSection('menu')}
                className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-gradient-to-r from-red-600 via-red-500 to-red-700 px-10 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-600/30 transition hover:brightness-110 dark:from-red-600 dark:via-red-500 dark:to-emerald-700 dark:shadow-red-900/50"
              >
                Learn more
              </button>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <div
                className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-red-500/15 blur-3xl dark:bg-red-500/20"
                aria-hidden
              />
              <img
                src={briyani}
                alt="Biryani bowl with egg and garnish"
                width={1200}
                height={900}
                fetchPriority="high"
                decoding="async"
                className="relative z-10 w-full rounded-[2rem] border border-neutral-200 object-cover shadow-2xl shadow-neutral-900/15 dark:border-white/10 dark:shadow-black/50 lg:rounded-[2.25rem]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Promo banner */}
      <section
        aria-label="Promotional offer"
        className="relative z-20 -mt-6 bg-white px-4 pb-2 md:-mt-10 md:pb-4 dark:bg-black"
      >
        <div className="glass-card relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] rounded-tr-[1rem] rounded-bl-[1rem] border border-neutral-200/80 bg-white py-10 shadow-xl shadow-neutral-900/8 md:py-12 dark:border-white/10 dark:bg-[#101012] dark:shadow-none">
          {/* warm glass glow */}
          <div
            className="pointer-events-none absolute -left-10 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(239,68,68,0.28),transparent_70%)] blur-2xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-8 -top-10 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(239,68,68,0.28),transparent_70%)] blur-2xl"
            aria-hidden
          />

          <div className="relative flex flex-col gap-10 px-6 pt-2 md:flex-row md:items-center md:justify-between md:gap-8 md:px-10 md:pt-0">
            <div className="max-w-lg text-center md:text-left">
              <p className="text-2xl font-bold leading-snug tracking-tight text-neutral-900 dark:text-white md:text-3xl">
                Great food and lots of{' '}
                <span className="text-emerald-600 dark:text-emerald-400">discounted prices</span>
              </p>
              <PromoSocialProof />
            </div>

            <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-end sm:gap-6 md:pr-2">
              <div className="text-center sm:text-right">
                <p className="bg-gradient-to-br from-red-600 to-emerald-600 bg-clip-text text-6xl font-black leading-none tabular-nums text-transparent md:text-7xl lg:text-[5rem]">
                  50
                  <span className="align-top text-4xl font-black md:text-5xl">%</span>
                </p>
                <p className="mt-1 text-base font-bold tracking-wide text-neutral-800 dark:text-neutral-200">
                  offer on Now
                </p>
              </div>
              <div className="relative shrink-0 sm:-mb-2 md:-mr-4 md:mb-0 lg:-mr-8">
                <div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-red-400/45 to-emerald-500/35 blur-2xl"
                  aria-hidden
                />
                <img
                  src={lollipop}
                  alt=""
                  width={280}
                  height={280}
                  className="relative z-10 h-32 w-32 rounded-full border-[5px] border-white/80 object-cover shadow-xl [filter:saturate(1.2)_contrast(1.05)] sm:h-36 sm:w-36 md:h-40 md:w-40 dark:border-white/20"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our best delivered — blurred plate backdrop + glass cards */}
      <section
        aria-label="Featured dishes"
        className="relative -mt-2 overflow-hidden bg-white px-4 pb-24 pt-12 dark:bg-black md:pb-28 md:pt-16"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_20%,rgba(239,68,68,0.05),transparent_70%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_25%,rgba(239,68,68,0.08),transparent_70%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-[15%] top-[8%] h-[min(80vw,640px)] w-[min(80vw,640px)] opacity-[0.07] dark:opacity-[0.12]"
          aria-hidden
        >
          <img
            src={masalaDosa}
            alt=""
            className="h-full w-full rounded-full object-cover blur-3xl"
            width={900}
            height={900}
            decoding="async"
          />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <header className="mb-14 text-center md:mb-20">
            <SectionTitle before="Our Best " accent="Delivered" />
          </header>

          <div className="flex flex-col gap-10 md:gap-12">
            {deliveredShowcase.map((row) => (
              <FeaturedGlassRow
                key={row.key}
                title={row.title}
                description={row.description}
                imageSrc={row.imageSrc}
                imageAlt={row.imageAlt}
                price={row.price}
                reverse={row.reverse}
                imageObjectPosition={row.imageObjectPosition}
                imageFilter={row.imageFilter}
              />
            ))}
          </div>
        </div>
      </section>

      {/* #menu */}
      <section
        id="menu"
        className="scroll-mt-[5.5rem] bg-white px-4 py-16 dark:bg-black md:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <header className="mb-12 text-center md:mb-16">
            <SectionTitle before="Our " accent="Dishes" />
            <p className="mx-auto mt-6 max-w-xl text-pretty text-neutral-600 dark:text-neutral-400">
              South Indian classics, grills, and comfort plates — ask for spice levels and sharing
              portions. Tap the bag to reserve or enquire.
            </p>
          </header>

          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {menuItems.map((item, index) => (
              <ProductCard
                key={item.id}
                title={item.title}
                description={item.description}
                imageSrc={item.imageSrc}
                imageAlt={item.imageAlt}
                loading={index < 3 ? 'eager' : 'lazy'}
                priceLabel={priceById[item.id]}
                orderLink="#contact"
                imagePresentation={item.imagePresentation}
                imagePhotoObjectPosition={item.imagePhotoObjectPosition}
              />
            ))}
          </div>
        </div>
      </section>

      {/* #about — story + Meet our chef (glass, theme-aware chef art) */}
      <section
        id="about"
        className="scroll-mt-[5.5rem] border-y border-neutral-200 bg-neutral-50 px-4 py-16 dark:border-neutral-800 dark:bg-zinc-950 md:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <header className="mb-14 text-center md:mb-20">
            <SectionTitle before="Meet Our " accent="Chefs" />
          </header>

          <article className="glass-card relative rounded-[3rem] rounded-tr-[1.5rem] rounded-bl-[1.5rem] border border-neutral-200/90 bg-white shadow-xl shadow-neutral-900/10 dark:border-white/10 dark:bg-[#101012] dark:shadow-black/40">
            {/* clipped layer: soft blurred backdrop on the left */}
            <div
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-[3rem] rounded-tr-[1.5rem] rounded-bl-[1.5rem]"
              aria-hidden
            >
              <div className="absolute -left-12 top-1/2 hidden h-[28rem] w-[28rem] -translate-y-1/2 rounded-full opacity-20 blur-3xl lg:block">
                <img src={lollipop} alt="" className="h-full w-full rounded-full object-cover" />
              </div>
            </div>

            <div className="relative z-10 grid items-stretch gap-4 lg:grid-cols-2">
              {/* Chef — rises above the card top (card edge sits around the neck) */}
              <div className="relative flex min-h-[20rem] items-end justify-center px-4 lg:min-h-[26rem]">
                <img
                  src={lightChef}
                  alt="Executive chef presenting a plate"
                  width={560}
                  height={700}
                  loading="lazy"
                  decoding="async"
                  className="max-h-[24rem] w-auto max-w-full object-contain object-bottom dark:hidden lg:absolute lg:bottom-0 lg:max-h-[34rem]"
                />
                <img
                  src={darkChef}
                  alt="Executive chef presenting a plate"
                  width={560}
                  height={700}
                  loading="lazy"
                  decoding="async"
                  className="hidden max-h-[24rem] w-auto max-w-full object-contain object-bottom dark:block lg:absolute lg:bottom-0 lg:max-h-[34rem]"
                />
              </div>

              {/* Copy */}
              <div className="flex flex-col justify-center gap-8 p-8 lg:p-12 xl:p-14">
                <p className="text-pretty text-xl font-medium leading-relaxed text-neutral-700 dark:text-neutral-200 lg:text-2xl">
                  Our expert chefs bring passion, skill, and creativity to every dish, ensuring an
                  unforgettable dining experience. With years of experience and a love for flavors,
                  they craft each meal to perfection, using only the finest ingredients.
                </p>
                <div>
                  <button
                    type="button"
                    onClick={() => scrollToSection('menu')}
                    className="inline-flex h-12 min-w-[10rem] items-center justify-center rounded-2xl rounded-tr-[0.45rem] rounded-bl-[0.45rem] border border-red-500 px-8 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-400 dark:text-red-400 dark:hover:bg-white/5"
                  >
                    View All
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* #specials */}
      <section
        id="specials"
        className="scroll-mt-[5.5rem] border-b border-neutral-200 px-4 py-16 dark:border-neutral-800 md:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <header className="mb-12 text-center md:mb-16">
            <SectionTitle before="Today’s " accent="Specials" />
            <p className="mx-auto mt-6 max-w-xl text-pretty font-medium text-neutral-700 dark:text-neutral-200">
              Offers & highlights — limited runs, weekend grills, and chef’s trays worth planning around.
            </p>
          </header>

          <div className="grid gap-6 md:grid-cols-3">
            <article className="rounded-[1.5rem] border border-red-700 bg-red-600 p-8 text-white dark:border-red-600">
              <h3 className="text-xl font-bold">Weekend grill</h3>
              <p className="mt-3 text-sm font-medium leading-relaxed text-white/95">
                Mixed tandoori platters and family buckets —{' '}
                <span className="text-emerald-200">Fri–Sun</span> only while skewers last.
              </p>
            </article>
            <article className="rounded-[1.5rem] border border-emerald-600 bg-emerald-50 p-8 dark:border-emerald-600 dark:bg-zinc-950">
              <h3 className="text-xl font-bold text-emerald-900 dark:text-emerald-400">Chef’s thali</h3>
              <p className="mt-3 text-sm leading-relaxed text-emerald-900 dark:text-neutral-300">
                Ghee roast, sambar, poriyal, and dessert — one tray to taste the breadth of the menu.
              </p>
            </article>
            <article className="rounded-[1.5rem] border border-neutral-800 bg-neutral-950 p-8 text-white dark:border-neutral-700 dark:bg-zinc-950">
              <h3 className="text-xl font-bold text-red-400">Private events</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-300">
                Up to forty guests, custom menus, live dosa counter.{' '}
                <span className="text-emerald-300">Allergy tags</span> in clear block letters.
              </p>
            </article>
          </div>
        </div>
      </section>

      <CustomerReviews sectionId="reviews" />

      {/* #contact — no scroll-reveal here: bottom-of-page sections never finish the fade animation */}
      <section
        id="contact"
        className="relative scroll-mt-[5.5rem] overflow-hidden border-b border-neutral-200 bg-neutral-50 px-4 py-16 dark:border-neutral-800 dark:bg-black md:py-24"
      >
        <div
          className="pointer-events-none absolute -right-16 top-1/4 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(239,68,68,0.18),transparent_70%)] blur-2xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-12 bottom-1/4 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.15),transparent_70%)] blur-2xl"
          aria-hidden
        />

        <div className="relative z-10 mx-auto max-w-6xl">
          <header className="mx-auto mb-12 max-w-3xl text-center">
            <SectionTitle before="Reserve Your " accent="Table" />
            <p className="mx-auto mt-5 max-w-lg text-pretty text-lg font-medium text-neutral-700 dark:text-neutral-200">
              Reservations, private dining, and transfers — send a note below. Static map; live map
              loads only when you opt in and scroll it into view.
            </p>
          </header>

          <ContactSection />
        </div>
      </section>
    </div>
  )
}
