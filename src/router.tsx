import { lazy, Suspense } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import { SectionScrollNav } from './components/SectionScrollNav'
import { SiteFooter } from './components/SiteFooter'

const HomePage = lazy(() => import('./pages/HomePage'))
const MenuPage = lazy(() => import('./pages/MenuPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))

function RouteFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center text-neutral-500 dark:text-neutral-400">
      <span className="animate-pulse text-sm tracking-wide">Loading…</span>
    </div>
  )
}

function AppLayout() {
  return (
    <div className="relative flex min-h-svh flex-col overflow-x-clip bg-white dark:bg-black">
      <SectionScrollNav />

      <main className="relative z-10 flex-1 bg-white dark:bg-black">
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
      </main>

      <SiteFooter />
    </div>
  )
}

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="menu" element={<MenuPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
    </Routes>
  )
}
