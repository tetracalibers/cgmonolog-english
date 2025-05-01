<script lang="ts">
  import { LocalSpeaker, type SpeakerContext } from "$/lib/speech-synthesis/speaker"
  import Controls from "./view/Controls.svelte"
  import { onMount } from "svelte"

  interface Props {
    text: string
    speakerCtx: SpeakerContext
  }

  let { text, speakerCtx }: Props = $props()
  let speaker = $state<LocalSpeaker | null>(null)

  onMount(() => {
    speaker = new LocalSpeaker(speakerCtx)
  })
</script>

<Controls text={text} speaker={speaker} />
