import { writable, type Writable } from "svelte/store"

interface SpeakerOption {
  rate?: number
  lang?: string
}

const defaultSpeakerOption = {
  rate: 0.7,
  lang: "en-US"
}

type UsingVoice = {
  defaultVoice: SpeechSynthesisVoice
  voices: SpeechSynthesisVoice[]
}

export class SpeakerContext {
  #defaultVoice: SpeechSynthesisVoice | null = null
  #seletedVoice: Writable<SpeechSynthesisVoice | null> = writable(null)
  #voices: SpeechSynthesisVoice[] = []

  constructor() {}

  init = async () => {
    const { defaultVoice, voices } = await this.getVoices()
    this.#voices = voices
    this.#defaultVoice = defaultVoice
  }

  private filterVoices(voices: SpeechSynthesisVoice[]) {
    return voices.filter((voice) => {
      return voice.lang === "en-US" || voice.name === "Kyoko"
    })
  }

  private findDefaultVoice(voices: SpeechSynthesisVoice[]) {
    return voices.find((voice) => voice.name === "Samantha")
  }

  private getUsingVoice = (voices: SpeechSynthesisVoice[]) => {
    return {
      defaultVoice: this.findDefaultVoice(voices),
      voices: this.filterVoices(voices)
    }
  }

  private getVoices = (): Promise<UsingVoice> => {
    return new Promise((resolve) => {
      const voices = speechSynthesis.getVoices()
      if (voices.length) {
        resolve(this.getUsingVoice(voices) as UsingVoice)
      }
      speechSynthesis.addEventListener("voiceschanged", () => {
        const voices = speechSynthesis.getVoices()
        resolve(this.getUsingVoice(voices) as UsingVoice)
      })
    })
  }

  get voices() {
    return this.#voices
  }

  get defaultVoice() {
    return this.#defaultVoice
  }

  get selectedVoice() {
    return this.#seletedVoice
  }

  selectVoice(name: string) {
    const voices = this.#voices
    const voice = voices.find((voice) => voice.name === name)
    if (!voice) {
      console.warn("Voice not found:", name)
      return
    }
    this.#seletedVoice.set(voice)
  }
}

export class LocalSpeaker {
  #ctx!: SpeakerContext
  #audio!: SpeechSynthesisUtterance
  #rate: Writable<number> = writable(1.0)
  #repeat: Writable<boolean> = writable(false)
  #status: Writable<"idle" | "playing" | "paused"> = writable("idle")

  init = async (ctx: SpeakerContext, option: SpeakerOption = defaultSpeakerOption) => {
    const { lang, rate } = option

    this.#ctx = ctx
    this.#audio = new SpeechSynthesisUtterance()
    this.#audio.lang = lang ?? defaultSpeakerOption.lang
    this.#audio.rate = rate ?? defaultSpeakerOption.rate
    this.#audio.voice = this.#ctx.defaultVoice ?? null

    this.#ctx.selectedVoice.subscribe((voice) => {
      if (!voice) return
      this.#audio.voice = voice
    })

    return Promise.resolve(this)
  }

  constructor() {}

  get activeVoice() {
    return this.#audio.voice
  }

  get status() {
    return this.#status
  }

  get repeat(): Writable<boolean> {
    return this.#repeat
  }

  get rate(): Writable<number> {
    return this.#rate
  }

  set rate(rate: number) {
    this.#rate.set(rate)
    this.#audio.rate = rate
  }

  set repeat(on: boolean) {
    this.#repeat.set(on)
  }

  speak(text: string) {
    this.stop()
    this.#audio.text = text
    this.#status.set("playing")

    this.#audio.onstart = () => this.#status.set("playing")
    this.#audio.onend = () => {
      this.#status.set("idle")
      const unsubscribe = this.#repeat.subscribe((on) => {
        if (on) {
          this.speak(text)
        }
      })
      unsubscribe()
    }
    this.#audio.onpause = () => this.#status.set("paused")
    this.#audio.onresume = () => this.#status.set("playing")

    window.speechSynthesis.speak(this.#audio)
  }

  stop() {
    window.speechSynthesis.cancel()
    this.#audio.onstart = null
    this.#audio.onend = null
    this.#audio.onpause = null
    this.#audio.onresume = null
  }

  pause() {
    window.speechSynthesis.pause()
  }

  resume() {
    window.speechSynthesis.resume()
  }
}
