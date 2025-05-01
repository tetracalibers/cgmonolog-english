<script lang="ts">
  import PauseIcon from "~icons/carbon/pause-filled"
  import PlayIcon from "~icons/carbon/play-filled-alt"
  import RepeatIcon from "~icons/carbon/repeat"
  import SkipBackIcon from "~icons/carbon/skip-back"
  import SkipForwardIcon from "~icons/carbon/skip-forward"

  import { getAudioContext } from "../core/context"
  import { toggle, toHHMMSS } from "../utils"

  import RangeSlider from "./RangeSlider.svelte"
  import VolumeControl from "./VolumeControl.svelte"

  const PLAYBACK_SPEEDS = [1, 0.8, 0.75, 0.5]

  const { playing, playbackRate, paused, repeat, seekBy, currentTime, duration } = getAudioContext()

  let speedIndex = 0

  const handlePlaybackSpeedClick = () => {
    $playbackRate = PLAYBACK_SPEEDS[++speedIndex % PLAYBACK_SPEEDS.length]
  }
</script>

<div class="_card h-40 w-[290px] px-6 py-6 flex flex-col justify-center items-center rounded-lg text-slate-400">
  <div class="flex items-center space-x-3">
    <button onclick={() => toggle(repeat)}>
      <RepeatIcon class={`${$repeat ? "text-purple-400" : "text-slate-300"}`} />
    </button>

    <button onclick={() => seekBy(-1 * $currentTime)}>
      <SkipBackIcon />
    </button>
    <button
      onclick={() => toggle(paused)}
      class="_play-button w-12 h-12 rounded-full flex justify-center items-center text-white bg-gradient-to-br from-[#5583EE] to-[#41D8DD]"
    >
      {#if $playing}
        <PauseIcon />
      {:else}
        <PlayIcon />
      {/if}
    </button>

    <button onclick={() => seekBy($duration - $currentTime)}>
      <SkipForwardIcon />
    </button>

    <button
      class="w-[4ch] h-5 flex items-center justify-center rounded-full border border-current"
      onclick={handlePlaybackSpeedClick}
    >
      <span class="text-xs font-semibold">{$playbackRate}x</span>
    </button>
  </div>

  <div class="mt-4 w-full flex items-center space-x-2">
    <span class="text-sm">{toHHMMSS($currentTime)}</span>
    <RangeSlider max={$duration} bind:value={$currentTime} />
    <span class="text-sm">{toHHMMSS($duration)}</span>
    <VolumeControl />
  </div>
</div>

<style>
  ._card {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
</style>
