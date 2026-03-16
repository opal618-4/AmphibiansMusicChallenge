<template>
  <div class="detail-view" v-if="frog">
    <SideNav />

    <button class="back-btn" @click="$router.push('/gallery')">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">
        <polyline points="15 18 9 12 15 6"/>
      </svg>
    </button>

    <!-- Hero Section -->
    <div class="hero-section">
      <img :src="frog.image" :alt="frog.commonName" class="hero-bg" />
      <div class="hero-gradient"></div>
      <div class="hero-text">
        <span class="species-badge">SPECIES FOCUS</span>
        <h1 class="hero-name">{{ frog.commonName }}</h1>
        <p class="hero-scientific">{{ frog.scientificName }}</p>
      </div>
    </div>

    <!-- Taxonomy Badges -->
    <div class="taxonomy-row">
      <div class="taxonomy-badge">
        <span class="taxonomy-value">{{ frog.kingdom }}</span>
        <span class="taxonomy-label">Kingdom</span>
      </div>
      <div class="taxonomy-badge">
        <span class="taxonomy-value">{{ frog.genus }}</span>
        <span class="taxonomy-label">Genus</span>
      </div>
      <div class="taxonomy-badge">
        <span class="taxonomy-value">{{ frog.frogClass }}</span>
        <span class="taxonomy-label">Class</span>
      </div>
      <div class="taxonomy-badge">
        <span class="taxonomy-value">{{ frog.family }}</span>
        <span class="taxonomy-label">Family</span>
      </div>
    </div>

    <!-- Species Overview -->
    <div class="overview-section">
      <h2 class="section-title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
        </svg>
        Species Overview
      </h2>
      <p class="overview-text">{{ frog.description }}</p>
    </div>

    <!-- Info Cards Row -->
    <div class="info-cards-row">
      <!-- Habitat Card -->
      <div class="info-card">
        <div class="info-card-header">
          <div class="info-card-label">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
              <circle cx="12" cy="12" r="10"/>
              <path d="M2 12h20"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            HABITAT
          </div>
          <a :href="frog.learnMore" target="_blank" class="native-range-btn">See Native Range</a>
        </div>
        <p class="info-card-text">{{ frog.habitat }}</p>
      </div>

      <!-- Unique Call Card -->
      <div class="info-card">
        <div class="info-card-header">
          <div class="info-card-label">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M15.54 8.46a5 5 0 010 7.07"/>
            </svg>
            UNIQUE CALL
          </div>
          <button class="listen-detail-btn" :class="{ playing: isCurrentlyPlaying }" @click="toggleSound">
            <svg v-if="!isCurrentlyPlaying" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M15.54 8.46a5 5 0 010 7.07"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
              <rect x="6" y="4" width="4" height="16"/>
              <rect x="14" y="4" width="4" height="16"/>
            </svg>
            {{ isCurrentlyPlaying ? 'Stop' : 'Listen' }}
          </button>
        </div>
        <p class="info-card-text">{{ frog.callDescription }}</p>
      </div>
    </div>

    <!-- Bottom Cards Row -->
    <div class="bottom-cards-row">
      <!-- Fun Fact Card -->
      <div class="fun-fact-card">
        <h3 class="fun-fact-title">
          💡 Did you know?
        </h3>
        <p class="fun-fact-text">{{ frog.funFact }}</p>
      </div>

      <!-- Size Comparison Card -->
      <div class="size-card">
        <h3 class="size-title">{{ frog.sizeText }}</h3>
        <div class="size-image">
          <img :src="frog.sizeImage" alt="Size comparison" />
        </div>
      </div>
    </div>

    <!-- Next Species Navigation (clearly visible) -->
    

    <!-- Action buttons -->
    <div class="detail-actions">
      <div class="next-species-nav" v-if="prevFrog">
      <button class="action-btn secondary" @click="goToPreviousSpecies">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
          <line x1="19" y1="12" x2="5" y2="12"/>
          <polyline points="12 19 5 12 12 5"/>
        </svg>
        <span class="next-species-label">{{ prevFrog.commonName }}</span>
      </button>
    </div>
      <a class="action-btn secondary" :href="frog.learnMore" target="_blank">
        Learn More
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
          <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
          <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
        </svg>
      </a>
      <button v-if="!nextFrog" class="action-btn primary" @click="handleNext">
        {{ fromGame ? 'Next Level' : 'Start The Game' }}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
          <line x1="5" y1="12" x2="19" y2="12"/>
          <polyline points="12 5 19 12 12 19"/>
        </svg>
      </button>
      <div class="next-species-nav" v-if="nextFrog">
      <button class="action-btn secondary" @click="goToNextSpecies">
        <span class="next-species-label">{{ nextFrog.commonName }}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
          <line x1="5" y1="12" x2="19" y2="12"/>
          <polyline points="12 5 19 12 12 19"/>
        </svg>
      </button>
    </div>
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
const { isPlaying, currentFrogId, toggleFrogSound } = useAudio()
const { state, goToNextLevel } = useGameState()

const currentFrogIdParam = computed(() => route.params.id as string)
const frog = computed(() => getFrogById(currentFrogIdParam.value))
const fromGame = computed(() => route.query.fromGame === 'true')

const isCurrentlyPlaying = computed(() => isPlaying.value && currentFrogId.value === frog.value?.id)

// Find the next frog in the gallery list
const prevFrog = computed(() => {
  const idx = frogs.findIndex(f => f.id === currentFrogIdParam.value)
  if (idx >= 0 && idx < frogs.length - 1) {
    return frogs[idx - 1]
  }
  return null
})
const nextFrog = computed(() => {
  const idx = frogs.findIndex(f => f.id === currentFrogIdParam.value)
  if (idx >= 0 && idx < frogs.length - 1) {
    return frogs[idx + 1]
  }
  return null
})

function toggleSound() {
  if (frog.value) {
    toggleFrogSound(frog.value)
  }
}

function goToPreviousSpecies() {
  if (prevFrog.value) {
    router.push(`/spotlight/${prevFrog.value.id}`)
  }
}
function goToNextSpecies() {
  if (nextFrog.value) {
    router.push(`/spotlight/${nextFrog.value.id}`)
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
  max-width: 960px;
  margin: 0 auto;
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

/* ===== Hero Section ===== */
.hero-section {
  position: relative;
  width: 100%;
  height: 280px;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 24px;
}

.hero-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(26,35,50,0.85) 0%, rgba(26,35,50,0.3) 50%, rgba(26,35,50,0.1) 100%);
}

.hero-text {
  position: absolute;
  bottom: 28px;
  left: 32px;
}

.species-badge {
  display: inline-block;
  background: var(--color-primary);
  color: white;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
  padding: 5px 14px;
  border-radius: 6px;
  margin-bottom: 10px;
}

.hero-name {
  font-size: 42px;
  font-weight: 800;
  color: white;
  margin: 0 0 4px 0;
  text-shadow: 0 2px 8px rgba(0,0,0,0.3);
}

.hero-scientific {
  font-size: 16px;
  color: rgba(255,255,255,0.8);
  font-style: italic;
  margin: 0;
}

/* ===== Taxonomy Badges ===== */
.taxonomy-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 28px;
}

.taxonomy-badge {
  background: var(--color-card);
  border-radius: 12px;
  padding: 14px 16px;
  border: 1.5px solid var(--color-border);
}

.taxonomy-value {
  display: block;
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 2px;
}

.taxonomy-label {
  display: block;
  font-size: 12px;
  color: var(--color-text-muted);
  font-weight: 500;
}

/* ===== Species Overview ===== */
.overview-section {
  margin-bottom: 24px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 10px 0;
}

.overview-text {
  font-size: 14px;
  color: var(--color-text-muted);
  line-height: 1.75;
  margin: 0;
}

/* ===== Info Cards Row ===== */
.info-cards-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
}

.info-card {
  background: var(--color-card);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.04);
}

.info-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.info-card-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1.2px;
  color: var(--color-text-muted);
  text-transform: uppercase;
}

.native-range-btn {
  display: inline-flex;
  align-items: center;
  padding: 7px 16px;
  border-radius: 20px;
  background: var(--color-text);
  color: white;
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}

.native-range-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(26,35,50,0.25);
}

.listen-detail-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 16px;
  border-radius: 20px;
  background: var(--color-text);
  color: white;
  font-size: 12px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.listen-detail-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(26,35,50,0.25);
}

.listen-detail-btn.playing {
  background: var(--color-primary);
}

.info-card-text {
  font-size: 13px;
  color: var(--color-text-muted);
  line-height: 1.65;
  margin: 0;
}

/* ===== Bottom Cards Row ===== */
.bottom-cards-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
}

.fun-fact-card {
  background: #fef9e7;
  border: 1.5px dashed #e3d5a0;
  border-radius: 16px;
  padding: 20px;
}

.fun-fact-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 8px 0;
}

.fun-fact-text {
  font-size: 13px;
  color: var(--color-text-muted);
  line-height: 1.6;
  margin: 0;
}

.size-card {
  background: var(--color-card);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 10px rgba(0,0,0,0.04);
}

.size-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 12px 0;
}

.size-image {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.size-image img {
  max-height: 100px;
  opacity: 0.9;
  border-radius: 10px;
}

/* ===== Next Species Navigation ===== */
.next-species-nav {
  /* display: flex;
  justify-content: flex-end;
  margin-bottom: 24px; */
}

.next-species-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 28px;
  border-radius: 14px;
  background: var(--color-card);
  border: 2px solid var(--color-border);
  font-size: 15px;
  font-weight: 700;
  color: var(--color-text);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}

.next-species-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
  transform: translateX(4px);
  box-shadow: 0 4px 16px rgba(45,90,61,0.15);
}

.next-species-label {
  font-size: 15px;
}

/* ===== Action Buttons ===== */
.detail-actions {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 40px;
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
  text-decoration: none;
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

/* ===== Animations ===== */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.hero-section,
.taxonomy-row,
.overview-section,
.info-cards-row,
.bottom-cards-row,
.next-species-nav {
  animation: fadeIn 0.5s ease;
}
</style>
