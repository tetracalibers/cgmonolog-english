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

<div class="volume">
  <button onclick={() => toggle(muted)}>
    {#if $muted}
      <VolumeMute />
    {:else}
      <VolumeUp />
    {/if}
  </button>

  <div class="volume-control">
    <RangeSlider bind:value={volumePercentage} max={100} step={1} />
  </div>
</div>

<style>
  button {
    appearance: none;
    background: none;
    border: 0;
    color: inherit;
    cursor: pointer;
    margin: 0;
    padding: 0;
  }

  .volume {
    position: relative;
    display: flex;
    justify-content: center;
  }
  .volume-control {
    opacity: 0;
    transition-property: opacity;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
    position: absolute;
    top: -0.25rem;
    left: 50%;
    width: 4rem;
    transform-origin: left;
    transform: rotate(-90deg);
  }

  .volume:hover .volume-control {
    opacity: 1;
  }
</style>
