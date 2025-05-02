import { getCollection } from "astro:content"

export const getPieces = async () => {
  const entries = await getCollection("piece")
  return entries.sort((a, b) => a.data.index - b.data.index)
}
