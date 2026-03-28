<template>
  <div
    class="frog-gallery-card"
    @click="$emit('click')"
  >
    <div class="card-image">
      <img :src="frog.habitatImage" :alt="frog.commonName" />
    </div>
    <div class="card-info">
      <h3 class="card-name">{{ frog.commonName }}</h3>
      <p class="card-scientific">{{ frog.scientificName }}</p>
      <button class="listen-btn" :class="{ playing: isPlaying }" @click.stop="$emit('listen')">
        <svg v-if="!isPlaying" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
          <path d="M15.54 8.46a5 5 0 010 7.07"/>
        </svg>
        <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
          <rect x="6" y="4" width="4" height="16"/>
          <rect x="14" y="4" width="4" height="16"/>
        </svg>
        {{ isPlaying ? 'Stop' : 'Listen' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FrogSpecies } from '../types'

defineProps<{
  frog: FrogSpecies
  isPlaying?: boolean
}>()

defineEmits<{
  click: []
  listen: []
}>()
</script>

<style scoped>
.frog-gallery-card {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--color-card);
  border-radius: 16px;
  padding: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}

.frog-gallery-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.08);
  border-color: var(--color-primary);
}

.card-image {
  width: 72px;
  height: 72px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-info {
  flex: 1;
  min-width: 0;
}

.card-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 2px 0;
}

.card-scientific {
  font-size: 12px;
  color: var(--color-text-muted);
  font-style: italic;
  margin: 0 0 8px 0;
}

.listen-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 16px;
  border-radius: 20px;
  border: 1.5px solid var(--color-border);
  background: var(--color-bg);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  color: var(--color-text);
  transition: all 0.2s ease;
}

.listen-btn:hover {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.listen-btn.playing {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

@media (min-width: 1900px) {
  .frog-gallery-card {
    display: flex;
    align-items: center;
    gap: 25px;
    background: var(--color-card);
    border-radius: 16px;
    padding: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid transparent;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  }

  .frog-gallery-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.08);
    border-color: var(--color-primary);
  }

  .card-image {
    width: 120px;
    height: 120px;
    border-radius: 12px;
    overflow: hidden;
    flex-shrink: 0;
  }

  .card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .card-info {
    flex: 1;
    min-width: 0;
  }

  .card-name {
    font-size: 28px;
    font-weight: 700;
    color: var(--color-text);
    margin: 0 0 8px 0;
  }

  .card-scientific {
    font-size: 20px;
    color: var(--color-text-muted);
    font-style: italic;
    margin: 0 0 16px 0;
  }

  .listen-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 10px 16px;
    border-radius: 20px;
    border: 1.5px solid var(--color-border);
    background: var(--color-bg);
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
    color: var(--color-text);
    transition: all 0.2s ease;
  }

  .listen-btn svg {
    width: 30px;
    height: 30px;
  }
}
</style>
