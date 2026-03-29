<template>
  <div class="game-view">
    <SideNav />

    <button class="back-btn" @click="$router.back()">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">
        <polyline points="15 18 9 12 15 6"/>
      </svg>
    </button>

    <!-- CORRECT PAGE OVERLAY -->
    <Transition name="fade">
      <div v-if="state.phase === 'correct-page'" class="correct-overlay">
        <div class="correct-content">
          <div class="correct-circle">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="48" height="48">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <h2 class="correct-title">Correct</h2>
          <p class="correct-subtitle">You Identify The Sound Perfectly</p>
        </div>
        <SideNav />
      </div>
    </Transition>

    <!-- GAME CONTENT -->
    <div class="game-content" v-if="state.phase === 'playing' || state.phase === 'correct-highlight'">
      <h1 class="game-title">Match The Sound Challenge</h1>
      <p class="game-subtitle">Listen carefully and identify the mystery call of the pond.</p>

      <PlayButton
        :is-playing="isPlaying"
        :answer-state="state.answerState"
        @toggle="togglePlay"
      />

      <WaveformVisualizer
        :is-playing="isPlaying"
        :progress="playbackProgress"
        :answer-state="state.answerState"
        :sound-description="correctFrog?.callDescription || 'Frog sound'"
      />

      <div class="choices-section">
        <div class="choices-grid">
          <FrogChoiceCard
            v-for="frog in choiceFrogs"
            :key="frog.id"
            :frog="frog"
            :is-selected="state.selectedFrogId === frog.id"
            :answer-state="state.selectedFrogId === frog.id ? state.answerState : 'idle'"
            @select="handleSelect(frog.id)"
          />
        </div>
      </div>

      <ProgressBar
        :current-level="state.currentLevel"
        :total-levels="totalLevels"
        :completed-levels="state.completedLevels"
        :answer-state="state.answerState"
        @previous="handlePrevious"
        @next="handleNext"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGameState } from '../composables/useGameState'
import { useAudio } from '../composables/useAudio'
import SideNav from '../components/SideNav.vue'
import PlayButton from '../components/PlayButton.vue'
import WaveformVisualizer from '../components/WaveformVisualizer.vue'
import FrogChoiceCard from '../components/FrogChoiceCard.vue'
import ProgressBar from '../components/ProgressBar.vue'
import { frogs } from '../data/frogs'

const router = useRouter()
const {
  state,
  currentLevelData,
  correctFrog,
  choiceFrogs,
  totalLevels,
  startGame,
  selectAnswer,
  goToNextLevel,
  goToPreviousLevel,
} = useGameState()

const { isPlaying, playbackProgress, playFrogSound, stopCurrentSound } = useAudio()

onMounted(() => {
  if (state.phase !== 'playing' && state.phase !== 'correct-highlight' && state.phase !== 'correct-page') {
    startGame()
  }
})

function togglePlay() {
  if (isPlaying.value) {
    stopCurrentSound()
  } else if (correctFrog.value) {
    playFrogSound(correctFrog.value)
  }
}

function handleSelect(frogId: string) {
  selectAnswer(frogId)
}

function handlePrevious() {
  stopCurrentSound()
  goToPreviousLevel()
}

function handleNext() {
  stopCurrentSound()
  goToNextLevel()
  if (state.phase === 'result') {
    router.push('/result')
  }
}

// Watch for phase transitions to info page
watch(() => state.phase, (newPhase) => {
  if (newPhase === 'info') {
    stopCurrentSound()
    const frogId = currentLevelData.value?.correctFrogId
    if (frogId) {
      router.push({
        path: `/species/${frogId}`,
        query: {
          fromGame: 'true',
          level: String(state.currentLevel + 1)
        }
      })
    }
  }

  if (newPhase === 'correct-highlight') {
    // Phase is set via selectAnswer in game state
  }
})
const { preloadAudio } = useAudio()

onMounted(() => {
  preloadAudio(frogs)
})
</script>

<style scoped>
.game-view {
  min-height: 100vh;
  padding: 40px 80px 24px;
  position: relative;
  display: flex;
  flex-direction: column;
}

.back-btn {
  position: fixed;
  top: 32px;
  left: 32px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid var(--color-text);
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text);
  transition: all 0.3s ease;
  z-index: 100;
}

.back-btn:hover {
  background: var(--color-text);
  color: var(--color-bg);
}

.game-content {
  max-width: 960px;
  margin: 0 auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 100%;
}

.game-title {
  text-align: center;
  font-size: 42px;
  font-weight: 800;
  margin: 0;
  color: var(--color-text);
}

.game-subtitle {
  text-align: center;
  font-size: 16px;
  color: var(--color-text-muted);
  margin: 0 0 8px 0;
}

.choices-section {
  width: 100%;
  background: rgb(196, 196, 196, 0.3);
  border-radius: 20px;
  padding: 24px 24px 28px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
}

.choices-label {
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text-muted);
  margin: 0 0 16px 0;
}

.choices-grid {
  display: flex;
  gap: 16px;
}

/* Correct overlay */
.correct-overlay {
  position: fixed;
  inset: 0;
  background: var(--color-bg);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
}

.correct-content {
  text-align: center;
  animation: scaleIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.5); }
  to { opacity: 1; transform: scale(1); }
}

.correct-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 3px solid var(--color-correct);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  color: var(--color-correct);
}

.correct-title {
  font-size: 40px;
  font-weight: 800;
  color: var(--color-correct);
  margin: 0 0 8px 0;
}

.correct-subtitle {
  font-size: 18px;
  color: var(--color-correct);
  margin: 0;
  font-weight: 500;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (min-width: 1900px) {
  .game-view {
    min-height: 100vh;
    padding: 40px 80px 24px;
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .game-content {
    max-width: 1500px;
    margin: 0 auto;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    width: 100%;
  }

  .game-title {
    text-align: center;
    font-size: 48px;
    font-weight: 800;
    margin: 0;
    color: var(--color-text);
  }

  .game-subtitle {
    text-align: center;
    font-size: 20px;
    color: var(--color-text-muted);
    margin: 0 0 8px 0;
  }

  .choices-section {
    width: 100%;
    background: rgb(196, 196, 196, 0.3);
    border-radius: 20px;
    padding: 24px 24px 28px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.04);
    margin: 10px 0 10px 0;
  }

  .choices-grid {
    display: flex;
    gap: 30px;
  }

  /* Correct overlay */

  .correct-circle {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 3px solid var(--color-correct);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 24px;
    color: var(--color-correct);
  }

  .correct-title {
    font-size: 60px;
    font-weight: 800;
    color: var(--color-correct);
    margin: 0 0 8px 0;
  }

  .correct-subtitle {
    font-size: 25px;
    color: var(--color-correct);
    margin: 0;
    font-weight: 500;
  }
}
</style>
