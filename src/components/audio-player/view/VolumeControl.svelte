<script lang="ts">
  import { run } from "svelte/legacy"

  import VolumeMute from "~icons/carbon/volume-mute"
  import VolumeUp from "~icons/carbon/volume-up"
  import RangeSlider from "./RangeSlider.svelte"

  import { getAudioContext } from "../core/context"
  import { toggle } from "../utils"

  const { volume, muted } = getAudioContext()

  let volumePercentage = $state(100)
  run(() => {
    $volume = volumePercentage / 100
  })
</script>

<div class="volume flex justify-center relative">
  <button onclick={() => toggle(muted)}>
    {#if $muted}
      <VolumeMute />
    {:else}
      <VolumeUp />
    {/if}
  </button>

  <div class="volume-control w-16 origin-left -rotate-90 absolute -top-1 left-[50%]">
    <RangeSlider bind:value={volumePercentage} max={100} step={1} />
  </div>
</div>

<style lang="postcss">
  .volume-control {
    @apply opacity-0 transition-opacity;
  }

  .volume:hover .volume-control {
    @apply opacity-100;
  }
</style>
