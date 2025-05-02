import type { CollectionEntry } from "astro:content"

export const pager = (entries: CollectionEntry<"piece">[], currIdx: number) => {
  const prevEntry = entries[currIdx - 1]
  const nextEntry = entries[currIdx + 1]

  const prev = prevEntry ? "/" + prevEntry.id : "/"
  const next = nextEntry ? "/" + nextEntry.id : "/"

  return { prev, next }
}
