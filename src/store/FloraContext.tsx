import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { MenuItem } from '../data/types'

/**
 * Flora is a café site, not a shop — there is no basket and no checkout.
 * This holds the small amount of UI state the overlays share.
 */
interface FloraState {
  searchOpen: boolean
  setSearchOpen: (v: boolean) => void
  menuOpen: boolean
  setMenuOpen: (v: boolean) => void
  /** The menu item shown in the detail dialog, if any. */
  product: MenuItem | null
  setProduct: (v: MenuItem | null) => void
}

const FloraCtx = createContext<FloraState | null>(null)

export function FloraProvider({ children }: { children: ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [product, setProduct] = useState<MenuItem | null>(null)

  const value = useMemo<FloraState>(
    () => ({ searchOpen, setSearchOpen, menuOpen, setMenuOpen, product, setProduct }),
    [searchOpen, menuOpen, product],
  )

  return <FloraCtx.Provider value={value}>{children}</FloraCtx.Provider>
}

export function useFlora() {
  const ctx = useContext(FloraCtx)
  if (!ctx) throw new Error('useFlora must be used inside <FloraProvider>')
  return ctx
}
