import type { CollectionEntry } from "astro:content"

export const home = () => {
  const origin = import.meta.env.DEV ? "http://localhost:4321" : import.meta.env.SITE
  const base = origin + import.meta.env.BASE_URL
  return base
}

export const pager = (entries: CollectionEntry<"piece" | "scene">[], currIdx: number) => {
  const prevEntry = entries[currIdx - 1]
  const nextEntry = entries[currIdx + 1]

  const prevSlug = prevEntry ? prevEntry.slug : null
  const nextSlug = nextEntry ? nextEntry.slug : null

  const base = home()

  const prev = prevSlug ? base + prevSlug : base
  const next = nextSlug ? base + nextSlug : base

  return { prev, next }
}
