<template>
  <div class="scoreboard-view">
    <SideNav />

    <button class="back-btn" @click="$router.back()">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">
        <polyline points="15 18 9 12 15 6"/>
      </svg>
    </button>

    <div class="scoreboard-content">
      <h1 class="scoreboard-title">Top pond explorer</h1>
      <p class="scoreboard-subtitle">Weekly Leaderboard &amp; Achievements</p>

      <!-- Tabs -->
      <!-- <div class="tab-bar">
        <button
          v-for="tab in tabs"
          :key="tab"
          class="tab"
          :class="{ active: activeTab === tab }"
          @click="activeTab = tab"
        >
          {{ tab }}
        </button>
      </div> -->

      <!-- Your Performance -->
      <div class="your-performance">
        <div class="perf-header">
          <span class="perf-label">YOUR PERFORMANCE</span>
          <span class="live-badge">LIVE STATS</span>
        </div>
        <div class="perf-body">
          <div class="perf-avatar">
            <div class="avatar-circle perf-avatar-circle">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="32" height="32">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
          </div>
          <div class="perf-info">
            <span class="perf-rank">Rank #{{ userRank }}</span>
            <span class="perf-message">{{ performanceMessage }}</span>
          </div>
          <div class="perf-score">
            <span class="perf-score-num">{{ state.score }}/{{ totalLevels }}</span>
            <span class="perf-accuracy">{{ userAccuracy }}% SCORE</span>
          </div>
        </div>
      </div>

      <!-- Leaderboard List -->
      <div class="leaderboard-list">
        <div
          v-for="entry in mockLeaderboard"
          :key="entry.rank"
          class="leaderboard-entry"
          :class="{ 'top-entry': entry.rank <= 3 }"
        >
          <div class="entry-left">
            <div class="entry-avatar">
              <div class="avatar-circle" :style="{ background: entry.avatarColor }">
                <span class="avatar-initial">{{ entry.username[0] }}</span>
              </div>
              <span class="rank-badge" :class="'rank-' + entry.rank">{{ entry.rank }}</span>
            </div>
            <div class="entry-info">
              <span class="entry-name">{{ entry.username }}</span>
              <span class="entry-title">
                <template v-if="entry.rank === 1">🏆</template>
                {{ entry.title }}
              </span>
            </div>
          </div>
          <div class="entry-right">
            <span class="entry-score">{{ entry.score }}/{{ entry.totalQuestions }}</span>
            <span class="entry-accuracy" :class="accuracyClass(entry.accuracy)">{{ entry.accuracy }}% ACCURACY</span>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="scoreboard-actions">
        <button class="action-btn secondary" @click="goHome">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Exit
        </button>
        <button class="action-btn primary" @click="playAgain">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
            <polyline points="23 4 23 10 17 10"/>
            <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/>
          </svg>
          Play Again
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useGameState } from '../composables/useGameState'
import { mockLeaderboard } from '../data/scoreboard'
import SideNav from '../components/SideNav.vue'

const router = useRouter()
const { state, totalLevels, resetGame, startGame } = useGameState()

const tabs = ['All Time', 'Weekly', 'Daily']
const activeTab = ref('All Time')

const userAccuracy = computed(() => {
  if (totalLevels.value === 0) return 0
  return Math.round((state.score / totalLevels.value) * 100)
})

const userRank = computed(() => {
  // Place user in the leaderboard based on score
  let rank = 1
  for (const entry of mockLeaderboard) {
    if (entry.score > state.score) rank++
  }
  return Math.max(rank, mockLeaderboard.length + 1)
})

const performanceMessage = computed(() => {
  const pct = state.score / totalLevels.value
  if (pct >= 0.8) return 'Outstanding, Champion!'
  if (pct >= 0.6) return 'Great work, Explorer!'
  if (pct >= 0.4) return 'Keep exploring, Scout!'
  return 'Keep practicing!'
})

function accuracyClass(accuracy: number) {
  if (accuracy >= 80) return 'accuracy-high'
  if (accuracy >= 60) return 'accuracy-mid'
  return 'accuracy-low'
}

function playAgain() {
  startGame()
  router.push('/game')
}

function goHome() {
  resetGame()
  router.push('/')
}
</script>

<style scoped>
.scoreboard-view {
  min-height: 100vh;
  padding: 40px 80px;
  position: relative;
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

.scoreboard-content {
  max-width: 700px;
  margin: 0 auto;
  animation: fadeInUp 0.6s ease;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.scoreboard-title {
  text-align: center;
  font-size: 42px;
  font-weight: 800;
  color: var(--color-text);
  margin: 0 0 6px 0;
}

.scoreboard-subtitle {
  text-align: center;
  font-size: 15px;
  color: var(--color-text-muted);
  margin: 0 0 28px 0;
}

/* Tabs */
.tab-bar {
  display: flex;
  background: var(--color-card);
  border-radius: 14px;
  padding: 4px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}

.tab {
  flex: 1;
  padding: 12px 0;
  border: none;
  background: transparent;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-muted);
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.25s ease;
}

.tab.active {
  background: white;
  color: var(--color-text);
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

/* Your Performance */
.your-performance {
  background: var(--color-text);
  color: white;
  border-radius: 20px;
  padding: 20px 24px;
  margin-bottom: 20px;
}

.perf-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.perf-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
  opacity: 0.7;
}

.live-badge {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1px;
  background: rgba(255,255,255,0.15);
  padding: 4px 10px;
  border-radius: 6px;
}

.perf-body {
  display: flex;
  align-items: center;
  gap: 16px;
}

.perf-avatar-circle {
  background: rgba(255,255,255,0.15) !important;
  color: rgba(255,255,255,0.7);
}

.avatar-circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.perf-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.perf-rank {
  font-size: 20px;
  font-weight: 800;
}

.perf-message {
  font-size: 13px;
  opacity: 0.7;
}

.perf-score {
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.perf-score-num {
  font-size: 28px;
  font-weight: 800;
}

.perf-accuracy {
  font-size: 11px;
  font-weight: 600;
  opacity: 0.6;
  letter-spacing: 0.5px;
}

/* Leaderboard List */
.leaderboard-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 32px;
}

.leaderboard-entry {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--color-card);
  border-radius: 16px;
  padding: 14px 20px;
  transition: all 0.2s ease;
}

.leaderboard-entry.top-entry {
  border: 1.5px solid var(--color-border);
}

.leaderboard-entry:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
}

.entry-left {
  display: flex;
  align-items: center;
  gap: 14px;
}

.entry-avatar {
  position: relative;
}

.entry-avatar .avatar-circle {
  width: 44px;
  height: 44px;
}

.avatar-initial {
  font-size: 18px;
  font-weight: 700;
  color: white;
}

.rank-badge {
  position: absolute;
  top: -4px;
  left: -4px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-size: 10px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.rank-1 {
  background: #f59e0b;
}

.rank-2 {
  background: #94a3b8;
}

.rank-3 {
  background: #d97706;
}

.rank-badge:not(.rank-1):not(.rank-2):not(.rank-3) {
  background: var(--color-text-muted);
}

.entry-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.entry-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-text);
}

.entry-title {
  font-size: 12px;
  color: var(--color-text-muted);
}

.entry-right {
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.entry-score {
  font-size: 22px;
  font-weight: 800;
  color: var(--color-text);
}

.entry-accuracy {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.accuracy-high {
  color: var(--color-correct);
}

.accuracy-mid {
  color: #d97706;
}

.accuracy-low {
  color: var(--color-text-muted);
}

/* Actions */
.scoreboard-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 48px;
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
  
.scoreboard-title {
  text-align: center;
  font-size: 42px;
  font-weight: 800;
  color: var(--color-text);
  margin: 0 0 6px 0;
}

.scoreboard-subtitle {
  text-align: center;
  font-size: 19px;
  color: var(--color-text-muted);
  margin: 0 0 28px 0;
}

.perf-label {
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 1.5px;
  opacity: 0.7;
}

.live-badge {
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 1px;
  background: rgba(255,255,255,0.15);
  padding: 4px 10px;
  border-radius: 6px;
}

.perf-body {
  display: flex;
  align-items: center;
  gap: 16px;
}
.perf-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.perf-rank {
  font-size: 20px;
  font-weight: 800;
}

.perf-message {
  font-size: 18px;
  opacity: 0.7;
}

.perf-score {
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: 2px;
}


.perf-score-num {
  font-size: 28px;
  font-weight: 800;
}

.perf-accuracy {
  font-size: 14px;
  font-weight: 600;
  opacity: 0.6;
  letter-spacing: 0.5px;
}

/* Leaderboard List */
.leaderboard-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 32px;
}

.leaderboard-entry {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--color-card);
  border-radius: 16px;
  padding: 14px 20px;
  transition: all 0.2s ease;
}

.entry-left {
  display: flex;
  align-items: center;
  gap: 14px;
}

.entry-avatar {
  position: relative;
}

.entry-avatar .avatar-circle {
  width: 44px;
  height: 44px;
}

.avatar-initial {
  font-size: 18px;
  font-weight: 700;
  color: white;
}

.rank-badge {
  position: absolute;
  top: -4px;
  left: -4px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-size: 15px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.entry-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.entry-name {
  font-size: 19px;
  font-weight: 700;
  color: var(--color-text);
}

.entry-title {
  font-size: 16px;
  color: var(--color-text-muted);
}

.entry-right {
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.entry-score {
  font-size: 22px;
  font-weight: 800;
  color: var(--color-text);
}

.entry-accuracy {
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

/* Actions */
.scoreboard-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 48px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}
}
</style>
