<script lang="ts">
  import HeadlessAudioPlayer from "./core/HeadlessAudioPlayer.svelte"
  import Controls from "./view/Controls.svelte"

  export let src: string
</script>

<HeadlessAudioPlayer src={src}>
  <Controls />
</HeadlessAudioPlayer>
