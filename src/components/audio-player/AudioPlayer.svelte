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

{#await speaker.init(speakerCtx)}
  <p>waiting for the promise to resolve...</p>
{:then instance}
  <Controls text={text} speaker={instance} />
{:catch error}
  <p>Something went wrong: {error.message}</p>
{/await}
