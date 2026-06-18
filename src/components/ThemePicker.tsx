import { useEffect, useId, useRef, useState } from 'react'
import { COLOR_SCHEMES } from '../theme/theme-context.ts'
import { useTheme } from '../theme/useTheme'

function PaletteIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path
        d="M12 2a10 10 0 1 0 0 20 2.5 2.5 0 0 0 2.5-2.5c0-.69-.28-1.32-.73-1.77A2.5 2.5 0 0 1 15 15.5V15a2 2 0 0 1 2-2h.5A2.5 2.5 0 0 0 20 10.5 8 8 0 0 0 12 2z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="7.5" cy="10.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="10.5" cy="7.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="8.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const headerBtnClass =
  'border-neutral-300/80 bg-white/90 text-neutral-800 shadow-sm hover:border-neutral-400 hover:bg-white dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:border-white/40 dark:hover:bg-white/15'

type ThemePickerProps = {
  className?: string
  /** Inline list for mobile drawer; default is header dropdown. */
  variant?: 'dropdown' | 'menu'
  onSelect?: () => void
}

function SchemeOptions({
  selectedId,
  onPick,
}: {
  selectedId: string
  onPick: (id: (typeof COLOR_SCHEMES)[number]['id']) => void
}) {
  return (
    <>
      {COLOR_SCHEMES.map((scheme) => {
        const selected = scheme.id === selectedId
        return (
          <button
            key={scheme.id}
            type="button"
            role="option"
            aria-selected={selected}
            onClick={() => onPick(scheme.id)}
            className={[
              'flex w-full items-start gap-3 rounded-xl rounded-tr-sm rounded-bl-sm px-3 py-3 text-left transition',
              selected
                ? 'bg-red-50 text-neutral-900 dark:bg-red-500/10 dark:text-white'
                : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-white/8',
            ].join(' ')}
          >
            <span className="mt-0.5 flex shrink-0 gap-1.5" aria-hidden>
              {scheme.swatches.map((c) => (
                <span
                  key={c}
                  className="inline-block h-5 w-5 rounded-full ring-2 ring-black/10 dark:ring-white/25"
                  style={{ backgroundColor: c }}
                />
              ))}
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2 font-semibold">
                {scheme.name}
                {selected ? <CheckIcon /> : null}
              </span>
              <span className="mt-0.5 block text-xs font-medium text-neutral-500 dark:text-neutral-400">
                {scheme.description}
              </span>
            </span>
          </button>
        )
      })}
    </>
  )
}

export function ThemePicker({ className = '', variant = 'dropdown', onSelect }: ThemePickerProps) {
  const { colorScheme, setColorScheme } = useTheme()
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open || variant !== 'dropdown') return
    function onPointerDown(e: PointerEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [open, variant])

  const active = COLOR_SCHEMES.find((s) => s.id === colorScheme)

  function pick(id: (typeof COLOR_SCHEMES)[number]['id']) {
    setColorScheme(id)
    setOpen(false)
    onSelect?.()
  }

  if (variant === 'menu') {
    return (
      <div role="listbox" aria-label="Color themes" className="flex flex-col gap-1">
        <SchemeOptions selectedId={colorScheme} onPick={pick} />
      </div>
    )
  }

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`Color theme: ${active?.name ?? 'Select theme'}`}
        title={`Theme: ${active?.name ?? 'Select theme'}`}
        onClick={() => setOpen((o) => !o)}
        className={[
          'inline-flex h-10 shrink-0 items-center gap-2 rounded-full border px-3 transition',
          headerBtnClass,
          className,
        ].join(' ')}
      >
        <PaletteIcon />
        <span className="max-w-[7rem] truncate text-xs font-semibold">{active?.name}</span>
        <span className="flex gap-1" aria-hidden>
          {active?.swatches.map((c) => (
            <span
              key={c}
              className="inline-block h-3.5 w-3.5 rounded-full ring-2 ring-black/10 dark:ring-white/25"
              style={{ backgroundColor: c }}
            />
          ))}
        </span>
      </button>

      {open ? (
        <div
          id={panelId}
          role="listbox"
          aria-label="Color themes"
          className="absolute right-0 top-[calc(100%+0.5rem)] z-[60] w-[min(18rem,calc(100vw-2rem))] rounded-2xl rounded-tr-md rounded-bl-md border border-neutral-200/90 bg-white p-2 shadow-xl shadow-neutral-900/10 dark:border-white/10 dark:bg-zinc-950 dark:shadow-black/50"
        >
          <p className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Color theme
          </p>
          <SchemeOptions selectedId={colorScheme} onPick={pick} />
          <p className="border-t border-neutral-200 px-3 py-2.5 text-[11px] leading-snug text-neutral-500 dark:border-white/10 dark:text-neutral-400">
            Use the sun/moon button for light or dark mode within each theme.
          </p>
        </div>
      ) : null}
    </div>
  )
}
