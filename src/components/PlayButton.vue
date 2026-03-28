<template>
  <button
    class="play-button"
    :class="{ 'is-playing': isPlaying, [`state-${answerState}`]: true }"
    @click="$emit('toggle')"
  >
    <div class="play-ring">
      <div class="play-icon-wrapper">
        <svg v-if="!isPlaying" viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
          <polygon points="6 3 20 12 6 21 6 3"/>
        </svg>
        <svg v-else viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
          <rect x="5" y="3" width="5" height="18" rx="1"/>
          <rect x="14" y="3" width="5" height="18" rx="1"/>
        </svg>
      </div>
    </div>
    <span class="play-label">Play Secret Call</span>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  isPlaying: boolean
  answerState?: 'idle' | 'correct' | 'wrong'
}>()

defineEmits<{
  toggle: []
}>()
</script>

<style scoped>
.play-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.play-ring {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 3px solid var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;
}

.state-correct .play-ring {
  border-color: var(--color-correct);
}

.state-wrong .play-ring {
  border-color: var(--color-wrong);
}

.play-ring::before {
  content: '';
  position: absolute;
  inset: -8px;
  border-radius: 50%;
  border: 2px solid transparent;
  transition: border-color 0.3s ease;
}

.is-playing .play-ring::before {
  border-color: var(--color-primary);
  animation: ripple 1.5s ease-out infinite;
}

.state-correct.is-playing .play-ring::before {
  border-color: var(--color-correct);
}

.state-wrong.is-playing .play-ring::before {
  border-color: var(--color-wrong);
}

@keyframes ripple {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(1.3); opacity: 0; }
}

.play-icon-wrapper {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.3s ease;
}

.state-correct .play-icon-wrapper {
  background: var(--color-correct);
}

.state-wrong .play-icon-wrapper {
  background: var(--color-wrong);
}

.play-button:hover .play-icon-wrapper {
  transform: scale(1.05);
}

.play-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-primary);
}

.state-correct .play-label {
  color: var(--color-correct);
}

.state-wrong .play-label {
  color: var(--color-wrong);
}

@media (min-width: 1900px) {
  .play-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }

  .play-ring {
    width: 240px;
    height: 240px;
    border-radius: 50%;
    border: 3px solid var(--color-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    position: relative;
  }

  .play-icon-wrapper {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: var(--color-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    transition: all 0.3s ease;
  }

  .play-label {
    font-size: 20px;
    font-weight: 600;
    color: var(--color-primary);
  }
}
</style>
