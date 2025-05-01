<script lang="ts">
  import PauseIcon from "~icons/carbon/pause-filled"
  import PlayIcon from "~icons/carbon/play-filled-alt"
  import RepeatIcon from "~icons/carbon/repeat"
  import { LocalSpeaker } from "$/lib/speech-synthesis/speaker"

  interface Props {
    text: string
    speaker: LocalSpeaker
  }

  let { text, speaker = $bindable() }: Props = $props()

  const togglePlay = () => {
    if (speaker.isSpeaking) {
      speaker.pause()
    } else {
      speaker.resume(text)
    }
  }

  const PLAYBACK_SPEEDS = [1, 0.8, 0.75, 0.5]
  let speedIndex = $state(0)
  const changeSpeed = () => {
    speaker.rate = PLAYBACK_SPEEDS[++speedIndex % PLAYBACK_SPEEDS.length]
  }
  let currentSpeed = $derived(PLAYBACK_SPEEDS[speedIndex])
</script>

<div class="controls">
  {#if speaker}
    <button class="repeat-button" onclick={() => speaker.toggleRepeat()} class:--repeat={speaker.isRepeatON}>
      <RepeatIcon width="1.2em" height="1.2em" />
    </button>

    <button onclick={togglePlay} class="play-button">
      {#if speaker.isSpeaking}
        <PauseIcon />
      {:else}
        <PlayIcon />
      {/if}
    </button>

    <button class="speed-button" onclick={changeSpeed}>
      <span class="speed-label">{currentSpeed}x</span>
    </button>
  {/if}
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

  .controls {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);

    gap: 0.5rem;
    place-items: center;
    color: #a1c4fd;
  }

  .play-button {
    grid-column: 1 / -1;
    grid-row: 1 / -1;
  }

  .repeat-button {
    display: grid;
    place-items: center;
    padding-block: 0.2rem;
    border-radius: 9999px;
    border: 1px solid currentColor;
    width: 6ch;
  }
  .--repeat {
    color: #d939cd;
  }

  .play-button {
    display: flex;
    height: 3rem;
    width: 3rem;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    background-image: linear-gradient(135deg, #f6ceec 10%, #d939cd 100%);
    color: white;
  }

  .speed-button {
    color: #d939cd;
    display: flex;
    padding-block: 0.2rem;
    width: 6ch;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    border: 1px solid currentColor;
    height: fit-content;
  }
  .speed-label {
    font-size: 0.75rem;
    line-height: 1rem;
  }
</style>
