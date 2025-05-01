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
  #repeat: boolean = false
  #queued: boolean = false
  #status: "idle" | "playing" | "paused" = "idle"

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

  get isSpeaking() {
    return this.#status === "playing"
  }

  get isPaused() {
    return this.#status === "paused"
  }

  get isRepeatON() {
    return this.#repeat
  }

  set rate(rate: number) {
    this.#audio.rate = rate
  }

  speak(text: string) {
    this.stop()
    this.#audio.text = text
    this.#queued = true
    this.#status = "playing"

    this.#audio.onstart = () => (this.#status = "playing")
    this.#audio.onend = () => {
      this.#status = "idle"
      if (this.isRepeatON) {
        this.speak(text)
      }
    }
    this.#audio.onpause = () => (this.#status = "paused")
    this.#audio.onresume = () => (this.#status = "playing")

    window.speechSynthesis.speak(this.#audio)
  }

  stop() {
    window.speechSynthesis.cancel()
  }

  pause() {
    window.speechSynthesis.pause()
  }

  resume() {
    window.speechSynthesis.resume()
  }

  repeatON() {
    if (this.#repeat) return
    this.#repeat = true
    this.#audio.onend = () => {
      this.speak(this.#audio.text)
    }
  }

  repeatOFF() {
    this.#repeat = false
    this.#audio.onend = null
  }

  toggleRepeat() {
    if (this.#repeat) {
      this.repeatOFF()
    } else {
      this.repeatON()
    }
  }
}
