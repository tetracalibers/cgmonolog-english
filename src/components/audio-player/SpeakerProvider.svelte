<script lang="ts">
  import { onMount } from "svelte"
  import { speakerCtx } from "$/lib/speech-synthesis/use-speaker"
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();

  onMount(async () => {
    await speakerCtx.init()
  })
</script>

<!-- <Drawer><SelectVoice bind:activeVoice={activeVoice} bind:voices={voices} /></Drawer> -->
{@render children?.()}
