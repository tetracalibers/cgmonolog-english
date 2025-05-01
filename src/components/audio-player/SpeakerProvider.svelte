<script lang="ts">
  import { speakerCtx } from "$/lib/speech-synthesis/use-speaker"
  interface Props {
    children?: import("svelte").Snippet
  }

  let { children }: Props = $props()
</script>

{#await speakerCtx.init()}
  <p>waiting for the promise to resolve...</p>
{:then}
  {@render children?.()}
{:catch error}
  <p>Something went wrong: {error.message}</p>
{/await}
