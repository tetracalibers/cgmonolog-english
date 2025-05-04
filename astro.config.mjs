// @ts-check
import { defineConfig } from "astro/config"
import svelte from "@astrojs/svelte"
import Icons from "unplugin-icons/vite"
import icon from "astro-icon"

import path, { dirname } from "node:path"
import { fileURLToPath } from "node:url"
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://astro.build/config
export default defineConfig({
  site: "https://cgmonolog-english.pages.dev/",
  devToolbar: {
    enabled: false
  },
  integrations: [svelte(), icon()],
  vite: {
    resolve: {
      alias: {
        $: path.resolve(__dirname, "./src")
      }
    },
    plugins: [
      Icons({
        compiler: "svelte"
      })
    ]
  }
})
