import { glob } from "astro/loaders"
import { defineCollection, z } from "astro:content"

const piece = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/piece" }),
  schema: z.object({
    shape: z.string(), // 単語やイディオムそのもののスペルや、その抽象形
    meaning: z.string(), // 意味
    type: z.enum(["large", "medium", "small", "single", "more", "word"]), // どのピースとして使われるか
    index: z.coerce.number().int(), // 順序決定に使われる、章番号など
    cite: z.string().optional(), // 出典
    examples: z
      .object({
        en: z.string(), // 英語フレーズ
        ja: z.string(), // 日本語訳
        scene: z.string().optional() // どういう状況か
      })
      .array()
  })
})

export const collections = { piece }
