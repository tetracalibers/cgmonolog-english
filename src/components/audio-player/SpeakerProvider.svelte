<script lang="ts">
  import { onMount } from "svelte"
  import { speakerCtx } from "$/lib/speech-synthesis/use-speaker"

  onMount(async () => {
    await speakerCtx.init()
  })
</script>

<!-- <Drawer><SelectVoice bind:activeVoice={activeVoice} bind:voices={voices} /></Drawer> -->
<slot />
