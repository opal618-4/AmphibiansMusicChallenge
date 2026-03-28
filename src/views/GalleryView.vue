<template>
  <div class="gallery-view">
    <SideNav />

    <button class="back-btn" @click="$router.push('/')">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">
        <polyline points="15 18 9 12 15 6"/>
      </svg>
    </button>

    <div class="gallery-content">
      <h1 class="gallery-title">Species Gallery</h1>
      <p class="gallery-subtitle">Study the voices of the pond before playing. Click it to see more!</p>

      <div class="gallery-grid">
        <FrogGalleryCard
          v-for="frog in frogs"
          :key="frog.id"
          :frog="frog"
          :is-playing="isPlaying && currentFrogId === frog.id"
          @click="goToDetail(frog.id)"
          @listen="toggleSound(frog)"
        />
      </div>

      <div class="gallery-actions">
        <a class="action-btn secondary" href="https://amphibiaweb.org/search/index.html">
          Learn More
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
            <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
            <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
          </svg>
        </a>
        <button class="action-btn primary" @click="$router.push('/game')">
          Start The Game
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { frogs } from '../data/frogs'
import { useAudio } from '../composables/useAudio'
import type { FrogSpecies } from '../types'
import SideNav from '../components/SideNav.vue'
import FrogGalleryCard from '../components/FrogGalleryCard.vue'

const router = useRouter()
const { isPlaying, currentFrogId, toggleFrogSound } = useAudio()

function goToDetail(frogId: string) {
  router.push(`/spotlight/${frogId}`)
}

function toggleSound(frog: FrogSpecies) {
  toggleFrogSound(frog)
}
</script>

<style scoped>
.gallery-view {
  min-height: 100vh;
  padding: 40px 80px 40px 80px;
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

.gallery-content {
  max-width: 960px;
  margin: 0 auto;
}

.gallery-title {
  text-align: center;
  font-size: 42px;
  font-weight: 800;
  margin: 0 0 8px 0;
  color: var(--color-text);
}

.gallery-subtitle {
  text-align: center;
  font-size: 16px;
  color: var(--color-text-muted);
  margin: 0 0 40px 0;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 48px;
}

.gallery-actions {
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

@media (min-width: 1900px) {
  .gallery-view {
    min-height: 100vh;
    padding: 80px 80px 80px 80px;
    position: relative;
  }

  .back-btn {
    position: fixed;
    top: 32px;
    left: 32px;
    width: 60px;
    height: 60px;
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

  .gallery-content {
    max-width: 1600px;
    margin: 0 auto;
  }

  .gallery-title {
    text-align: center;
    font-size: 60px;
    font-weight: 800;
    margin: 0 0 15px 0;
    color: var(--color-text);
  }

  .gallery-subtitle {
    text-align: center;
    font-size: 25px;
    color: var(--color-text-muted);
    margin: 0 0 40px 0;
  }

  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-bottom: 70px;
  }

  .action-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 20px 45px;
    border-radius: 50px;
    font-size: 28px;
    font-weight: 700;
  }

  .action-btn svg {
    width: 30px;
    height: 30px;
  }
}
</style>
