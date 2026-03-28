<template>
  <div class="progress-bar-container">
    <button class="nav-btn" :disabled="currentLevel === 0" @click="$emit('previous')">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
        <polyline points="15 18 9 12 15 6"/>
      </svg>
      Previous
    </button>

    <div class="progress-section">
      <span class="progress-label">PROGRESS</span>
      <div class="progress-segments">
        <div
          v-for="i in totalLevels"
          :key="i"
          class="progress-segment"
          :class="{
            completed: completedLevels.includes(i - 1),
            active: i - 1 === currentLevel,
            wrong: i - 1 === currentLevel && answerState === 'wrong'
          }"
        />
      </div>
    </div>

    <div class="level-indicator">
      <span class="level-text">Level <strong>{{ currentLevel + 1 }}</strong> of {{ totalLevels }}</span>
    </div>

    <button class="nav-btn" @click="$emit('next')">
      Next
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { AnswerState } from '../types'

defineProps<{
  currentLevel: number
  totalLevels: number
  completedLevels: number[]
  answerState: AnswerState
}>()

defineEmits<{
  previous: []
  next: []
}>()
</script>

<style scoped>
.progress-bar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: var(--color-card);
  border-radius: 16px;
  gap: 16px;
  box-shadow: 0 -2px 12px rgba(0,0,0,0.04);
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text);
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.nav-btn:hover:not(:disabled) {
  background: var(--color-bg-secondary);
}

.nav-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.progress-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.progress-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: var(--color-text-muted);
}

.progress-segments {
  display: flex;
  gap: 6px;
}

.progress-segment {
  width: 56px;
  height: 6px;
  border-radius: 3px;
  background: #d0d0c8;
  transition: background 0.4s ease;
}

.progress-segment.completed {
  background: var(--color-primary);
}

.progress-segment.active {
  background: var(--color-primary);
  opacity: 0.7;
}

.progress-segment.wrong {
  background: var(--color-wrong);
  opacity: 1;
}

.level-indicator {
  font-size: 14px;
  color: var(--color-text-muted);
}

.level-text strong {
  color: var(--color-primary);
  font-size: 18px;
}

@media (min-width: 1900px) {
  .progress-bar-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
    background: var(--color-card);
    border-radius: 16px;
    gap: 20px;
    box-shadow: 0 -2px 12px rgba(0,0,0,0.04);
  }

  .nav-btn {
    gap: 6px;
    font-size: 20px;
    font-weight: 500;
    padding: 15px 50px;
    border-radius: 8px;
  }

  .progress-label {
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 1.5px;
    color: var(--color-text-muted);
  }

  .progress-segments {
    display: flex;
    gap: 6px;
  }

  .progress-segment {
    width: 56px;
    height: 6px;
    border-radius: 3px;
    background: #d0d0c8;
    transition: background 0.4s ease;
  }

  .level-indicator {
    font-size: 18px;
    color: var(--color-text-muted);
  }

  .level-text strong {
    color: var(--color-primary);
    font-size: 18px;
  }
}
</style>
