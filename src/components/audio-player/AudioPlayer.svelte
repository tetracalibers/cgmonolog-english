<script lang="ts">
  import HeadlessAudioPlayer from "./core/HeadlessAudioPlayer.svelte"
  import Controls from "./view/Controls.svelte"

  interface Props {
    src: string
  }

  let { src }: Props = $props()
</script>

<HeadlessAudioPlayer src={src}>
  <Controls />
</HeadlessAudioPlayer>
