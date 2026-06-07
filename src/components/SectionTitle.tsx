import type { ReactNode } from 'react'

type SectionTitleProps = {
  /** Plain leading text, e.g. "Our Best " */
  before: string
  /** Red · emerald gradient accent word(s), e.g. "Delivered" */
  accent: ReactNode
  /** Red · emerald L-corner brackets around the title (default on) */
  showBrackets?: boolean
}

/**
 * Unified section title — optional red · emerald L-corner frame with a white/ink heading
 * and a gradient accent word. Matches The Scarlet Grand brand across all sections.
 */
export function SectionTitle({ before, accent, showBrackets = true }: SectionTitleProps) {
  return (
    <div className="relative mx-auto flex justify-center px-6">
      <div className="relative inline-flex items-center py-1">
        {showBrackets ? (
          <>
            <span
              className="pointer-events-none absolute left-0 top-0 h-9 w-6 border-l-[3px] border-t-[3px] border-red-500 md:h-11 md:w-8"
              aria-hidden
            />
            <span
              className="pointer-events-none absolute bottom-0 right-0 h-9 w-6 border-b-[3px] border-r-[3px] border-emerald-500 md:h-11 md:w-8"
              aria-hidden
            />
          </>
        ) : null}
        <p className={`text-3xl font-bold tracking-tight text-neutral-900 dark:text-white md:text-4xl ${showBrackets ? 'px-7' : 'px-2'}`}>
          {before}
          <span className="bg-gradient-to-r from-red-500 via-red-500 to-emerald-500 bg-clip-text text-transparent">
            {accent}
          </span>
        </p>
      </div>
    </div>
  )
}
