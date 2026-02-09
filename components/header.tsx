"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

// Navigation items - Rules is hidden from nav but still accessible via URL
const navItems = [
  { href: "/", label: "Home", visible: true, comingSoon: false, disabled: false },
  { href: "/rules", label: "Rules", visible: false, comingSoon: false, disabled: false }, // Hidden from nav
  { href: "/docs", label: "Docs", visible: true, comingSoon: false, disabled: false },
  { href: "#", label: "Task", visible: true, comingSoon: true, disabled: true },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-border-dark px-6 lg:px-20 py-4 bg-background-dark sticky top-0 z-50">
      <div className="flex items-center min-w-[200px]">
        <Link href="/" className="flex items-center gap-3 text-primary">
          <span className="material-symbols-outlined text-3xl font-bold">redeem</span>
          <h2 className="text-white text-xl font-extrabold leading-tight tracking-tight">SugarClawdy</h2>
        </Link>
      </div>
      <nav className="hidden md:flex flex-1 justify-center items-center gap-10">
        {navItems
          .filter((item) => item.visible)
          .map((item) => {
            const isActive = pathname === item.href
            const Component = item.disabled ? 'span' : Link
            const props = item.disabled 
              ? {} 
              : { href: item.href }
            
            return (
              <Component
                key={item.href}
                {...props}
                className={`text-sm font-semibold transition-colors inline-flex items-center gap-1.5 ${
                  item.disabled
                    ? "text-slate-500 cursor-not-allowed"
                    : isActive
                      ? "text-slate-100 font-bold border-b-2 border-primary pb-1"
                      : "text-slate-400 hover:text-white"
                }`}
              >
                {item.label}
                {item.comingSoon && (
                  <span className="text-[7px] font-black text-primary bg-primary/10 px-1 py-0.5 rounded border border-primary/30 tracking-wider uppercase whitespace-nowrap">
                    Coming Soon
                  </span>
                )}
              </Component>
            )
          })}
      </nav>
      <div className="flex min-w-[200px] justify-end gap-4 items-center" />
    </header>
  )
}
