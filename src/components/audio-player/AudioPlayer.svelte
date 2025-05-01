<script lang="ts">
  import { LocalSpeaker } from "$/lib/speech-synthesis/speaker"
  import Controls from "./view/Controls.svelte"
  import { speakerCtx } from "$/lib/speech-synthesis/use-speaker"

  interface Props {
    text: string
  }

  let { text }: Props = $props()
  let speaker = new LocalSpeaker()
</script>

{#if speaker.init(speakerCtx)}
  <Controls text={text} speaker={speaker} />
{/if}
