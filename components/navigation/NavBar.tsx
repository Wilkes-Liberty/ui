"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { MenuItem } from "@/lib/queries/menu"

// ---------------------------------------------------------------------------
// Column-grouping config for mega-menu panels.
// Keys are the parent item's URL path; values define labelled column groups.
// Items not listed in any group are appended to the last column.
// ---------------------------------------------------------------------------

type ColumnGroup = { label: string; urls: string[] }

const MEGA_MENU_GROUPS: Record<string, ColumnGroup[]> = {
  "/solutions": [
    {
      label: "Commercial",
      urls: [
        "/solutions/dotedu",
        "/solutions/accord",
        "/solutions/palisade",
        "/solutions/bulkhead",
      ],
    },
    {
      label: "Federal",
      urls: [
        "/solutions/dotgov",
        "/solutions/gazette",
        "/solutions/outpost",
        "/solutions/software-factory",
      ],
    },
  ],
  "/services": [
    {
      label: "Infrastructure & Security",
      urls: [
        "/services/private-infrastructure-engineering",
        "/services/zero-trust-identity-consulting",
        "/services/defense-technology-integration",
      ],
    },
    {
      label: "Modernization & Integration",
      urls: [
        "/services/headless-cms-implementation",
        "/services/enterprise-search-architecture",
        "/services/ai-integration",
        "/services/digital-modernization",
        "/services/custom-software-development",
        "/services/integration-engineering",
        "/services/digital-asset-solutions",
        "/services/intelligence-actionable-insights",
      ],
    },
  ],
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Normalize a URL to just its pathname for consistent matching. */
function pathname(url: string): string {
  try {
    return new URL(url, "http://x").pathname
  } catch {
    return url
  }
}

/** Given an item's URL, return the base path (first two segments). */
function basePath(url: string): string {
  const p = pathname(url)
  const parts = p.split("/").filter(Boolean)
  return parts.length > 0 ? `/${parts[0]}` : p
}

/** Group children into labelled columns for a mega-menu parent. */
function groupChildren(
  children: MenuItem[],
  groups: ColumnGroup[]
): { label: string; items: MenuItem[] }[] {
  const groupMap = new Map<string, MenuItem[]>()
  groups.forEach((g) => groupMap.set(g.label, []))

  const ungrouped: MenuItem[] = []

  children.forEach((child) => {
    const childPath = pathname(child.url)
    const matchedGroup = groups.find((g) =>
      g.urls.some((u) => pathname(u) === childPath)
    )
    if (matchedGroup) {
      groupMap.get(matchedGroup.label)!.push(child)
    } else {
      ungrouped.push(child)
    }
  })

  const result = groups.map((g) => ({
    label: g.label,
    items: groupMap.get(g.label)!,
  }))

  // Append ungrouped items to the last column
  if (ungrouped.length > 0 && result.length > 0) {
    result[result.length - 1].items.push(...ungrouped)
  }

  return result
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      className={`ml-1 h-4 w-4 shrink-0 transition-transform duration-200 ${
        open ? "rotate-180" : ""
      }`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {open ? (
        <>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </>
      ) : (
        <>
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </>
      )}
    </svg>
  )
}

// ---------------------------------------------------------------------------
// Mega-menu panel (two-column grouped)
// ---------------------------------------------------------------------------

function MegaMenuPanel({
  item,
  groups,
  onClose,
}: {
  item: MenuItem
  groups: ColumnGroup[]
  onClose: () => void
}) {
  const columns = groupChildren(item.children, groups)

  return (
    // w-full + left-0 are relative to the <nav> container (no relative on mega <li>)
    <div className="absolute left-0 top-full z-50 w-full">
      {/* invisible bridge — keeps menu open as mouse travels from trigger to panel */}
      <div className="h-1 w-full" />
      <div className="rounded-b-lg border border-t-0 border-gray-200 bg-white shadow-xl">
        <div className="grid grid-cols-2 gap-0 divide-x divide-gray-100 p-6">
          {columns.map((col) => (
            <div key={col.label} className="px-6 first:pl-0 last:pr-0">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
                {col.label}
              </p>
              <ul className="space-y-1">
                {col.items.map((child) => (
                  <li key={child.id}>
                    <Link
                      href={child.internal ? pathname(child.url) : child.url}
                      target={child.internal ? undefined : "_blank"}
                      rel={child.internal ? undefined : "noopener noreferrer"}
                      onClick={onClose}
                      className="block rounded px-2 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
                    >
                      {child.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-100 px-8 py-3">
          <Link
            href={item.internal ? pathname(item.url) : item.url}
            onClick={onClose}
            className="text-sm font-medium text-blue-700 hover:text-blue-900"
          >
            View All {item.title} →
          </Link>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Simple dropdown panel (single column — Platforms, Resources)
// ---------------------------------------------------------------------------

function DropdownPanel({
  item,
  showViewAll,
  onClose,
}: {
  item: MenuItem
  showViewAll?: boolean
  onClose: () => void
}) {
  return (
    <div className="absolute left-1/2 top-full z-50 mt-0 -translate-x-1/2">
      <div className="h-2 w-full" />
      <div className="w-64 rounded-b-lg border border-t-0 border-gray-200 bg-white shadow-xl">
        <ul className="py-2">
          {item.children.map((child) => (
            <li key={child.id}>
              <Link
                href={child.internal ? pathname(child.url) : child.url}
                target={child.internal ? undefined : "_blank"}
                rel={child.internal ? undefined : "noopener noreferrer"}
                onClick={onClose}
                className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
              >
                {child.title}
              </Link>
            </li>
          ))}
        </ul>
        {showViewAll && (
          <div className="border-t border-gray-100 px-4 py-2">
            <Link
              href={item.internal ? pathname(item.url) : item.url}
              onClick={onClose}
              className="text-sm font-medium text-blue-700 hover:text-blue-900"
            >
              View All {item.title} →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Mobile nav accordion
// ---------------------------------------------------------------------------

function MobileAccordionItem({
  item,
  groups,
  onClose,
}: {
  item: MenuItem
  groups?: ColumnGroup[]
  onClose: () => void
}) {
  const [open, setOpen] = useState(false)
  const hasChildren = item.children.length > 0

  if (!hasChildren) {
    return (
      <Link
        href={item.internal ? pathname(item.url) : item.url}
        onClick={onClose}
        className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100"
      >
        {item.title}
      </Link>
    )
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100"
        aria-expanded={open}
      >
        {item.title}
        <ChevronDown open={open} />
      </button>
      {open && (
        <div className="ml-4 mt-1 space-y-0.5">
          {groups ? (
            // Grouped mobile layout
            groupChildren(item.children, groups).map((col) => (
              <div key={col.label} className="mb-2">
                <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  {col.label}
                </p>
                {col.items.map((child) => (
                  <Link
                    key={child.id}
                    href={child.internal ? pathname(child.url) : child.url}
                    onClick={onClose}
                    className="block rounded-md px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {child.title}
                  </Link>
                ))}
              </div>
            ))
          ) : (
            // Flat mobile layout
            item.children.map((child) => (
              <Link
                key={child.id}
                href={child.internal ? pathname(child.url) : child.url}
                onClick={onClose}
                className="block rounded-md px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
              >
                {child.title}
              </Link>
            ))
          )}
          <Link
            href={item.internal ? pathname(item.url) : item.url}
            onClick={onClose}
            className="block rounded-md px-3 py-1.5 text-sm font-medium text-blue-700 hover:bg-gray-100"
          >
            View All {item.title} →
          </Link>
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main NavBar
// ---------------------------------------------------------------------------

export type NavBarProps = {
  items: MenuItem[]
}

export function NavBar({ items }: NavBarProps) {
  const [openItem, setOpenItem] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname_ = usePathname()
  const navRef = useRef<HTMLElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Close everything on route change
  useEffect(() => {
    setOpenItem(null)
    setMobileOpen(false)
  }, [pathname_])

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenItem(null)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenItem(null)
        setMobileOpen(false)
      }
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [])

  const handleMouseEnter = useCallback((id: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpenItem(id)
  }, [])

  const handleMouseLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpenItem(null), 120)
  }, [])

  const handleDropdownMouseEnter = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }, [])

  const closeMenu = useCallback(() => setOpenItem(null), [])

  return (
    <nav
      ref={navRef}
      className="relative border-b border-gray-200 bg-white"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-6 py-0">
        {/* ── Logo ─────────────────────────────────────────────────── */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 py-4 text-gray-900 no-underline hover:text-gray-700"
          aria-label="Wilkes & Liberty — home"
        >
          {/* Wordmark — swap for an <img> or SVG when the brand mark is ready */}
          <span className="text-lg font-semibold tracking-tight">
            Wilkes&nbsp;&amp;&nbsp;Liberty
          </span>
        </Link>

        {/* ── Desktop nav ──────────────────────────────────────────── */}
        <ul
          className="hidden lg:flex lg:items-stretch lg:gap-0"
          role="menubar"
          aria-label="Primary navigation"
        >
          {items.map((item) => {
            const hasChildren = item.children.length > 0
            const itemPath = pathname(item.url)
            const isOpen = openItem === item.id
            const megaGroups = MEGA_MENU_GROUPS[itemPath]
            const isMega = Boolean(megaGroups)

            return (
              <li
                key={item.id}
                // Mega-menu panels position against the <nav> (no relative here).
                // Simple dropdown panels position against the <li> (relative needed).
                className={`flex items-stretch ${isMega ? "" : "relative"}`}
                role="none"
                onMouseEnter={() =>
                  hasChildren ? handleMouseEnter(item.id) : undefined
                }
                onMouseLeave={hasChildren ? handleMouseLeave : undefined}
              >
                {hasChildren ? (
                  <>
                    <button
                      type="button"
                      role="menuitem"
                      aria-haspopup="true"
                      aria-expanded={isOpen}
                      onClick={() =>
                        setOpenItem(isOpen ? null : item.id)
                      }
                      className={`flex items-center px-4 py-4 text-sm font-medium transition-colors ${
                        isOpen
                          ? "text-gray-900"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {item.title}
                      <ChevronDown open={isOpen} />
                    </button>

                    {isOpen && (
                      <div
                        onMouseEnter={handleDropdownMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        {isMega ? (
                          <MegaMenuPanel
                            item={item}
                            groups={megaGroups}
                            onClose={closeMenu}
                          />
                        ) : (
                          <DropdownPanel
                            item={item}
                            showViewAll={item.children.length > 4}
                            onClose={closeMenu}
                          />
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.internal ? itemPath : item.url}
                    role="menuitem"
                    className="flex items-center px-4 py-4 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
                  >
                    {item.title}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>

        {/* ── Utility nav ──────────────────────────────────────────── */}
        <div className="hidden lg:flex lg:items-center lg:gap-3">
          <Link
            href="/federal"
            className="rounded-full border border-blue-800 px-4 py-1.5 text-sm font-medium text-blue-800 transition-colors hover:bg-blue-800 hover:text-white"
            aria-label="Federal buyers hub — capabilities, past performance, and capability statement"
          >
            Federal Buyers
          </Link>
          <Link
            href="/contact"
            className="rounded-md bg-gray-900 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-gray-700"
          >
            Contact Us
          </Link>
        </div>

        {/* ── Mobile hamburger ─────────────────────────────────────── */}
        <button
          type="button"
          className="flex items-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 lg:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          <HamburgerIcon open={mobileOpen} />
        </button>
      </div>

      {/* ── Mobile nav panel ─────────────────────────────────────── */}
      {mobileOpen && (
        <div
          id="mobile-nav"
          className="border-t border-gray-200 bg-white px-4 pb-6 pt-3 lg:hidden"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="space-y-1">
            {items.map((item) => {
              const itemPath = pathname(item.url)
              const megaGroups = MEGA_MENU_GROUPS[itemPath]
              return (
                <MobileAccordionItem
                  key={item.id}
                  item={item}
                  groups={megaGroups}
                  onClose={() => setMobileOpen(false)}
                />
              )
            })}
          </div>

          {/* Utility links in mobile */}
          <div className="mt-5 space-y-2 border-t border-gray-200 pt-5">
            <Link
              href="/federal"
              onClick={() => setMobileOpen(false)}
              className="block rounded-md border border-blue-800 px-4 py-2 text-center text-sm font-medium text-blue-800"
            >
              Federal Buyers
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="block rounded-md bg-gray-900 px-4 py-2 text-center text-sm font-medium text-white"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
