import { getCollection } from "astro:content"

const PIECE_SUBDIR_ORDER = ["puzzle", "distinction-s", "kirekire", "distinction-i"]

const subdir = (slug: string) => {
  return slug.split("/").filter(Boolean)[0]
}

export const getPieces = async () => {
  const entries = await getCollection("piece")
  return entries
    .sort((a, b) => a.data.index - b.data.index)
    .sort((a, b) => PIECE_SUBDIR_ORDER.indexOf(subdir(a.slug)) - PIECE_SUBDIR_ORDER.indexOf(subdir(b.slug)))
}

export const getScenes = async () => {
  const entries = await getCollection("scene")
  return entries.sort((a, b) => a.data.index - b.data.index)
}
