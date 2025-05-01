import type { Writable } from "svelte/store"

export const toggle = (store: Writable<boolean>) => {
  store.update((s) => !s)
}
