import { reactive, computed } from 'vue'
import type { GameState } from '../types'
import { gameLevels, getFrogById } from '../data/frogs'

const state = reactive<GameState>({
  phase: 'welcome',
  currentLevel: 0,
  score: 0,
  selectedFrogId: null,
  answerState: 'idle',
  levels: gameLevels,
  completedLevels: [],
  wrongAttempts: 0
})

export function useGameState() {
  const currentLevelData = computed(() => state.levels[state.currentLevel])

  const correctFrog = computed(() => {
    if (!currentLevelData.value) return null
    return getFrogById(currentLevelData.value.correctFrogId) ?? null
  })

  const choiceFrogs = computed(() => {
    if (!currentLevelData.value) return []
    return currentLevelData.value.choices
      .map(id => getFrogById(id))
      .filter(f => f !== undefined)
  })

  const totalLevels = computed(() => state.levels.length)

  const isLastLevel = computed(() => state.currentLevel >= state.levels.length - 1)

  function startGame() {
    state.phase = 'playing'
    state.currentLevel = 0
    state.score = 0
    state.selectedFrogId = null
    state.answerState = 'idle'
    state.completedLevels = []
    state.wrongAttempts = 0
  }

  function selectAnswer(frogId: string) {
    if (state.answerState !== 'idle') return

    state.selectedFrogId = frogId
    const correct = currentLevelData.value?.correctFrogId === frogId

    if (correct) {
      state.answerState = 'correct'
      state.score++
      state.completedLevels.push(state.currentLevel)

      // green highlight for 3 seconds
      setTimeout(() => {
        state.phase = 'correct-page'
      }, 1000)

      // correct page for 5 seconds, then info page
      setTimeout(() => {
        state.phase = 'info'
      }, 2000)
    } else {
      state.answerState = 'wrong'
      state.wrongAttempts++

      // red highlight for 3 seconds, then reset to idle
      setTimeout(() => {
        state.answerState = 'idle'
        state.selectedFrogId = null
      }, 1000)
    }
  }

  function goToNextLevel() {
    if (isLastLevel.value) {
      state.phase = 'result'
    } else {
      state.currentLevel++
      state.selectedFrogId = null
      state.answerState = 'idle'
      state.wrongAttempts = 0
      state.phase = 'playing'
    }
  }

  function goToPreviousLevel() {
    if (state.currentLevel > 0) {
      state.currentLevel--
      state.selectedFrogId = null
      state.answerState = 'idle'
      state.wrongAttempts = 0
      state.phase = 'playing'
    }
  }

  function setPhase(phase: GameState['phase']) {
    state.phase = phase
  }

  function resetGame() {
    state.phase = 'welcome'
    state.currentLevel = 0
    state.score = 0
    state.selectedFrogId = null
    state.answerState = 'idle'
    state.completedLevels = []
    state.wrongAttempts = 0
  }

  return {
    state,
    currentLevelData,
    correctFrog,
    choiceFrogs,
    totalLevels,
    isLastLevel,
    startGame,
    selectAnswer,
    goToNextLevel,
    goToPreviousLevel,
    setPhase,
    resetGame
  }
}
