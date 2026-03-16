<template>
  <div class="detail-view" v-if="frog">
    <SideNav />

    <button class="back-btn" @click="$router.back()">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">
        <polyline points="15 18 9 12 15 6"/>
      </svg>
    </button>

    <!-- Tab bar -->
    <div class="tab-bar">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="tab"
        :class="{ active: tab.id === currentFrogId, locked: tab.locked }"
        @click="!tab.locked && $router.push(`/species/${tab.id}`)"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Content card -->
    <div class="detail-card">
      <div class="level-badge" v-if="fromGame">Level {{ currentLevel }} of 5</div>

      <div class="hero-image">
        <img :src="frog.image" :alt="frog.commonName" />
      </div>

      <div class="detail-header">
        <div class="detail-title-area">
          <h1 class="detail-name">{{ frog.commonName }}</h1>
          <p class="detail-scientific">{{ frog.scientificName }}</p>
        </div>
        <button class="listen-btn" @click="playSound">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M15.54 8.46a5 5 0 010 7.07"/>
          </svg>
          Listen
        </button>
      </div>

      <div class="detail-divider"></div>

      <p class="detail-description">{{ frog.description }}</p>

      <div class="habitat-section">
        <h2 class="habitat-title">Habitat</h2>
        <div class="habitat-content">
          <p class="habitat-text">{{ frog.habitat }}</p>
          <div class="habitat-image">
            <img :src="frog.habitatImage" :alt="`${frog.commonName} habitat`" />
          </div>
        </div>
      </div>

      <div class="fun-fact" v-if="frog.funFact">
        <span class="fun-fact-label">🌟 Fun Fact:</span>
        {{ frog.funFact }}
      </div>
    </div>

    <div class="detail-actions">
        <a class="action-btn secondary" @click="$router.push(`/spotlight/${currentFrogId}`)">
          Learn More
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
            <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
            <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
          </svg>
        </a>
      <button class="action-btn primary" @click="handleNext">
        {{ fromGame ? 'Next Level' : 'Start The Game' }}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
          <line x1="5" y1="12" x2="19" y2="12"/>
          <polyline points="12 5 19 12 12 19"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { frogs, getFrogById } from '../data/frogs'
import { useAudio } from '../composables/useAudio'
import { useGameState } from '../composables/useGameState'
import SideNav from '../components/SideNav.vue'

const route = useRoute()
const router = useRouter()
const { playFrogSound } = useAudio()
const { state, goToNextLevel } = useGameState()

const currentFrogId = computed(() => route.params.id as string)
const frog = computed(() => getFrogById(currentFrogId.value))
const fromGame = computed(() => route.query.fromGame === 'true')
const currentLevel = computed(() => Number(route.query.level || 1))

const tabs = computed(() => {
  if (!fromGame.value) {
    // In gallery mode — show all species
    return frogs.slice(0, 5).map(f => ({
      id: f.id,
      label: f.commonName,
      locked: false
    }))
  }
  // In game mode — show completed + current + locked
  const completed = state.completedLevels.map(i => {
    const level = state.levels[i]
    const f = getFrogById(level.correctFrogId)
    return { id: f!.id, label: f!.commonName, locked: false }
  })
  // Add remaining as locked
  const remaining = 5 - completed.length
  for (let i = 0; i < remaining; i++) {
    completed.push({ id: `locked-${i}`, label: `Lv.${completed.length + i + 1}`, locked: true })
  }
  return completed
})

function playSound() {
  if (frog.value) {
    playFrogSound(frog.value)
  }
}

function handleNext() {
  if (fromGame.value) {
    goToNextLevel()
    if (state.phase === 'result') {
      router.push('/result')
    } else {
      router.push('/game')
    }
  } else {
    router.push('/game')
  }
}
</script>

<style scoped>
.detail-view {
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

.tab-bar {
  display: flex;
  gap: 4px;
  justify-content: center;
  margin-bottom: 4px;
}

.tab {
  padding: 10px 20px;
  border: none;
  background: var(--color-card);
  border-radius: 12px 12px 0 0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  color: var(--color-text-muted);
  transition: all 0.3s ease;
}

.tab.active {
  background: var(--color-card);
  color: var(--color-text);
  font-weight: 700;
  font-size: 16px;
  padding: 12px 24px;
  box-shadow: 0 -2px 8px rgba(0,0,0,0.04);
}

.tab.locked {
  background: var(--color-text-muted);
  color: white;
  opacity: 0.5;
  cursor: not-allowed;
}

.detail-card {
  max-width: 860px;
  margin: 0 auto;
  background: var(--color-card);
  border-radius: 0 0 24px 24px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.level-badge {
  font-size: 14px;
  color: var(--color-text-muted);
  margin-bottom: 16px;
}

.level-badge strong {
  color: var(--color-text);
}

.hero-image {
  width: 100%;
  height: 220px;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 24px;
  background: var(--color-bg-secondary);
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detail-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;
}

.detail-name {
  font-size: 36px;
  font-weight: 800;
  color: var(--color-text);
  margin: 0 0 4px 0;
}

.detail-scientific {
  font-size: 15px;
  color: var(--color-primary);
  font-style: italic;
  margin: 0;
}

.listen-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  border-radius: 24px;
  border: 1.5px solid var(--color-border);
  background: var(--color-bg);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  color: var(--color-text);
  transition: all 0.2s ease;
  white-space: nowrap;
}

.listen-btn:hover {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.detail-divider {
  height: 1px;
  background: var(--color-border);
  margin: 16px 0 20px 0;
}

.detail-description {
  font-size: 15px;
  color: var(--color-text);
  line-height: 1.7;
  margin: 0 0 28px 0;
}

.habitat-section {
  margin-bottom: 24px;
}

.habitat-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 12px 0;
}

.habitat-content {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.habitat-text {
  flex: 1;
  font-size: 14px;
  color: var(--color-text-muted);
  line-height: 1.7;
  margin: 0;
}

.habitat-image {
  width: 280px;
  height: 160px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
  background: var(--color-bg-secondary);
}

.habitat-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.fun-fact {
  padding: 16px 20px;
  background: var(--color-bg);
  border-radius: 12px;
  font-size: 14px;
  color: var(--color-text);
  line-height: 1.5;
}

.fun-fact-label {
  font-weight: 700;
}

.detail-actions {
  max-width: 860px;
  margin: 24px auto 0;
  display: flex;
  justify-content: space-between;
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
</style>
