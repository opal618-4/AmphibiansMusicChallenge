import { ref } from 'vue'
import type { FrogSpecies } from '../types'

const isPlaying = ref(false)
const playbackProgress = ref(0)
const currentFrogId = ref<string | null>(null)

const currentAudio = ref<HTMLAudioElement | null>(null)
const audioCache: Record<string, HTMLAudioElement> = {}

let animationFrame: number | null = null

function preloadAudio(frogs: FrogSpecies[]) {
  frogs.forEach(frog => {
    const audio = new Audio(frog.audioSrc)
    audio.preload = 'auto'
    audioCache[frog.id] = audio
  })
}

function stopCurrentSound() {
  if (currentAudio.value) {
    currentAudio.value.pause()
    currentAudio.value.currentTime = 0
  }

  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
    animationFrame = null
  }

  isPlaying.value = false
  playbackProgress.value = 0
  currentFrogId.value = null
}

function updateProgress() {
  if (!currentAudio.value) return

  const audio = currentAudio.value

  if (audio.duration) {
    playbackProgress.value = audio.currentTime / audio.duration
  }

  if (!audio.paused) {
    animationFrame = requestAnimationFrame(updateProgress)
  }
}

function playFrogSound(frog: FrogSpecies) {
  stopCurrentSound()

  const audio = audioCache[frog.id] || new Audio(frog.audioSrc)

  currentAudio.value = audio
  currentFrogId.value = frog.id
  audio.currentTime = 0

  audio.play()

  isPlaying.value = true
  updateProgress()

  audio.onended = () => {
    isPlaying.value = false
    playbackProgress.value = 0
    currentFrogId.value = null
  }
}

function toggleFrogSound(frog: FrogSpecies) {
  // If the same frog is currently playing, stop it
  if (isPlaying.value && currentFrogId.value === frog.id) {
    stopCurrentSound()
    return
  }
  // Otherwise play the new frog (stops any previous sound)
  playFrogSound(frog)
}

export function useAudio() {
  return {
    isPlaying,
    playbackProgress,
    currentFrogId,
    playFrogSound,
    toggleFrogSound,
    stopCurrentSound,
    preloadAudio
  }
}