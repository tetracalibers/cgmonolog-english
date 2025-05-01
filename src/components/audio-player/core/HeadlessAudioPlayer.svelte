<script lang="ts">
  import { onMount } from "svelte"
  import { derived, writable } from "svelte/store"
  import { setAudioContext } from "./context"

  interface Props {
    /* props -------------------------------------- */
    src: string
    children?: import("svelte").Snippet
  }

  let { src, children }: Props = $props()

  /* state -------------------------------------- */

  let audio: HTMLAudioElement | null = $state(null)

  let duration = writable(0)
  let currentTime = writable(0)
  let volume = writable(1)
  let muted = writable(false)
  let ended = writable(false)
  let repeat = writable(false)
  let playbackRate = writable(1)
  let paused = writable(true)
  let playing = derived(paused, ($paused) => !$paused)

  /* methods ------------------------------------ */

  const seekBy = (n: number) => {
    $currentTime += n
  }

  const seekTo = (t: number) => {
    $currentTime = t
  }

  /* context ------------------------------------ */

  setAudioContext({
    currentTime,
    repeat,
    duration,
    playing,
    volume,
    muted,
    ended,
    paused,
    playbackRate,
    seekBy,
    seekTo
  })

  /* lifecycle ---------------------------------- */

  // 再生した音源を停止しなかった場合、読み込まれたページが破棄されるまでは音が止まらないため、
  // visibilityChangeイベントを利用するなどして必ず停止する
  const onVisibilityChange = () => {
    if (document.hidden) {
      // TODO: 音を止める処理
    }
  }

  onMount(() => {
    $duration = audio.duration

    // visibilityChangeイベントは、ブラウザの最小化や他のタブをアクティブにした場合など、表示・非表示が切り替わった際に発火するイベント
    document.addEventListener("visibilitychange", onVisibilityChange)
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange)
    }
  })
</script>

<div>
  <audio
    bind:volume={$volume}
    bind:duration={$duration}
    bind:currentTime={$currentTime}
    bind:muted={$muted}
    bind:paused={$paused}
    bind:ended={$ended}
    bind:playbackRate={$playbackRate}
    loop={$repeat}
    bind:this={audio}
    src={src}
    style="display: none;"
  ></audio>
  {@render children?.()}
</div>
