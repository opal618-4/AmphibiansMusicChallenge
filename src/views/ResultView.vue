<template>
  <div class="result-view">
    <SideNav />

    <div class="result-content">
      <div class="result-badge" :class="badgeClass">
        <div class="result-icon">
          {{ scoreEmoji }}
        </div>
      </div>

      <h1 class="result-title">{{ resultTitle }}</h1>
      <p class="result-subtitle">{{ resultSubtitle }}</p>

      <div class="score-display">
        <div class="score-circle">
          <span class="score-number">{{ state.score }}</span>
          <span class="score-divider">/</span>
          <span class="score-total">{{ totalLevels }}</span>
        </div>
        <span class="score-label">Correct Answers</span>
      </div>

      <div class="result-species">
        <h3 class="species-title">Species You Encountered</h3>
        <div class="species-list">
          <div
            v-for="(level, i) in state.levels"
            :key="i"
            class="species-row"
          >
            <div class="species-img">
              <img :src="getFrogById(level.correctFrogId)?.habitatImage" :alt="getFrogById(level.correctFrogId)?.commonName" />
            </div>
            <div class="species-info">
              <span class="species-name">{{ getFrogById(level.correctFrogId)?.commonName }}</span>
              <span class="species-fact">{{ getFrogById(level.correctFrogId)?.funFact }}</span>
            </div>
            <div class="species-status" :class="state.completedLevels.includes(i) ? 'passed' : 'missed'">
              {{ state.completedLevels.includes(i) ? '✓' : '✗' }}
            </div>
          </div>
        </div>
      </div>

      <div class="result-actions">
        <!-- <button class="action-btn secondary" @click="$router.push('/scoreboard')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          Scoreboard
        </button> -->
        <button class="action-btn secondary" @click="goHome">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Exit
        </button>
        <button class="action-btn primary" @click="playAgain">
          Play Again
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
            <polyline points="23 4 23 10 17 10"/>
            <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useGameState } from '../composables/useGameState'
import { getFrogById } from '../data/frogs'
import SideNav from '../components/SideNav.vue'

const router = useRouter()
const { state, totalLevels, startGame, resetGame } = useGameState()

const scoreEmoji = computed(() => {
  const pct = state.score / totalLevels.value
  if (pct >= 0.8) return '🏆'
  if (pct >= 0.6) return '🌟'
  if (pct >= 0.4) return '👍'
  return '💪'
})

const badgeClass = computed(() => {
  const pct = state.score / totalLevels.value
  if (pct >= 0.8) return 'gold'
  if (pct >= 0.6) return 'silver'
  return 'bronze'
})

const resultTitle = computed(() => {
  const pct = state.score / totalLevels.value
  if (pct >= 0.8) return 'Amazing!'
  if (pct >= 0.6) return 'Great Job!'
  if (pct >= 0.4) return 'Good Try!'
  return 'Keep Practicing!'
})

const resultSubtitle = computed(() => {
  const pct = state.score / totalLevels.value
  if (pct >= 0.8) return 'You\'re a true amphibian expert!'
  if (pct >= 0.6) return 'You know your frog calls well!'
  return 'Try again to improve your score!'
})

function goHome() {
  resetGame()
  router.push('/')
}

function playAgain() {
  startGame()
  router.push('/game')
}

</script>

<style scoped>
.result-view {
  min-height: 100vh;
  padding: 40px 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.result-content {
  max-width: 640px;
  width: 100%;
  text-align: center;
  animation: fadeInUp 0.8s ease;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.result-badge {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.result-badge.gold {
  background: linear-gradient(145deg, #fbbf24, #f59e0b);
  box-shadow: 0 8px 24px rgba(245, 158, 11, 0.3);
}

.result-badge.silver {
  background: linear-gradient(145deg, #94a3b8, #64748b);
  box-shadow: 0 8px 24px rgba(100, 116, 139, 0.3);
}

.result-badge.bronze {
  background: linear-gradient(145deg, #d97706, #b45309);
  box-shadow: 0 8px 24px rgba(180, 83, 9, 0.3);
}

.result-icon {
  font-size: 40px;
}

.result-title {
  font-size: 36px;
  font-weight: 800;
  color: var(--color-text);
  margin: 0 0 8px 0;
}

.result-subtitle {
  font-size: 16px;
  color: var(--color-text-muted);
  margin: 0 0 32px 0;
}

.score-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-bottom: 36px;
}

.score-circle {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.score-number {
  font-size: 56px;
  font-weight: 800;
  color: var(--color-primary);
}

.score-divider {
  font-size: 32px;
  color: var(--color-text-muted);
}

.score-total {
  font-size: 32px;
  font-weight: 700;
  color: var(--color-text-muted);
}

.score-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.result-species {
  text-align: left;
  background: var(--color-card);
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 32px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
}

.species-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 16px 0;
}

.species-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.species-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid var(--color-border);
}

.species-row:last-child {
  border-bottom: none;
}

.species-img {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
}

.species-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.species-info {
  flex: 1;
  min-width: 0;
}

.species-name {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
}

.species-fact {
  display: block;
  font-size: 12px;
  color: var(--color-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.species-status {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  flex-shrink: 0;
}

.species-status.passed {
  background: var(--color-correct-bg);
  color: var(--color-correct);
}

.species-status.missed {
  background: var(--color-wrong-bg);
  color: var(--color-wrong);
}

.result-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 36px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.action-btn.primary {
  background: var(--color-text);
  color: white;
}

.action-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(26,35,50,0.35);
}

.action-btn.secondary {
  background: var(--color-card);
  color: var(--color-text);
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.action-btn.secondary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.1);
}

@media (min-width: 1900px) {
  .result-view {
    min-height: 100vh;
    padding: 30px 80px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .result-content {
    max-width: 1040px;
    width: 100%;
    text-align: center;
    animation: fadeInUp 0.8s ease;
  }

  .result-badge {
    width: 96px;
    height: 96px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
  }

  .result-icon {
    font-size: 40px;
  }

  .result-title {
    font-size: 36px;
    font-weight: 800;
    color: var(--color-text);
    margin: 0 0 8px 0;
  }

  .result-subtitle {
    font-size: 20px;
    color: var(--color-text-muted);
    margin: 0 0 26px 0;
  }

  .score-display {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    margin-bottom: 26px;
  }

  .score-circle {
    display: flex;
    align-items: baseline;
    gap: 4px;
  }

  .score-number {
    font-size: 56px;
    font-weight: 800;
    color: var(--color-primary);
  }

  .score-divider {
    font-size: 32px;
    color: var(--color-text-muted);
  }

  .score-total {
    font-size: 32px;
    font-weight: 700;
    color: var(--color-text-muted);
  }

  .score-label {
    font-size: 18px;
    font-weight: 600;
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }

  .result-species {
    text-align: left;
    background: var(--color-card);
    border-radius: 20px;
    padding: 24px;
    margin-bottom: 32px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  }

  .species-title {
    font-size: 20px;
    font-weight: 700;
    color: var(--color-text);
    margin: 0 0 16px 0;
  }

  .species-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .species-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 0;
    border-bottom: 1px solid var(--color-border);
  }

  .species-img {
    width: 80px;
    height: 80px;
    border-radius: 10px;
    overflow: hidden;
    flex-shrink: 0;
  }

  .species-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .species-info {
    flex: 1;
    min-width: 0;
  }

  .species-name {
    display: block;
    font-size: 22px;
    font-weight: 600;
    color: var(--color-text);
  }

  .species-fact {
    display: block;
    font-size: 16px;
    color: var(--color-text-muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .species-status {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 14px;
    flex-shrink: 0;
  }

  .result-actions {
    display: flex;
    justify-content: center;
    gap: 16px;
  }

  .action-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 16px 50px;
    border-radius: 50px;
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    border: none;
  }
}
</style>
