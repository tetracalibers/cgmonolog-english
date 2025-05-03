<script lang="ts">
  import { ankiMode } from "./state.svelte"

  let { children } = $props()
</script>

<div data-anki-mode={ankiMode.enabled}>
  {@render children()}
</div>
