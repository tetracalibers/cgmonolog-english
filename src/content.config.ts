import { glob } from "astro/loaders"
import { defineCollection, z } from "astro:content"

const piece = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/piece" }),
  schema: z.object({
    shape: z.string(), // 単語やイディオムそのもののスペルや、その抽象形
    meaning: z.string().optional(), // 意味
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

const scene = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/scene" }),
  schema: z.object({
    title: z.string(),
    index: z.coerce.number().int(),
    phrases: z
      .object({
        context: z.string(),
        examples: z
          .object({
            en: z.string(), // 英語フレーズ
            ja: z.string().optional(), // 日本語訳
            ipa: z.string().optional(), // 発音記号
            audio: z.string().array().optional(), // 英文読み上げ音声ファイルへのパス
            source: z.string().optional(), // 出典
            formality: z.number().int().min(0).max(3).optional() // フォーマル度
          })
          .array()
      })
      .array()
  })
})

export const collections = { piece, scene }
