<template>
  <div 
    class="waveform-container" 
    :class="{ 'is-playing': isPlaying, [`state-${answerState}`]: true }"
    @mouseenter="showTooltip = true"
    @mouseleave="showTooltip = false"
  >
    <Transition name="tooltip">
      <div v-if="showTooltip" class="custom-tooltip">
        {{ soundDescription }}
      </div>
    </Transition>
    <div class="waveform-bars">
      <div
        v-for="(bar, i) in bars"
        :key="i"
        class="waveform-bar"
        :style="{
          height: bar.height + 'px',
          animationDelay: bar.delay + 's',
          opacity: getBarOpacity(i)
        }"
      />
    </div>
    <div class="waveform-progress-track">
      <div class="waveform-progress-fill" :style="{ width: (progress * 100) + '%' }" />
    </div>
    <div class="waveform-time">
      <span>{{ formatTime(progress * duration) }}</span>
      <span class="waveform-label">SECRET CALL WAVEFORM</span>
      <span>{{ formatTime(duration) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const showTooltip = ref(false)

const props = withDefaults(defineProps<{
  isPlaying: boolean
  progress: number
  duration?: number
  answerState?: 'idle' | 'correct' | 'wrong'
  soundDescription?: string
}>(), {
  duration: 4,
  answerState: 'idle',
  soundDescription: 'Frog sound'
})

const bars = computed(() => {
  const count = 20
  return Array.from({ length: count }, (_, i) => {
    const center = count / 2
    const dist = Math.abs(i - center) / center
    const maxHeight = 40
    const minHeight = 12
    // Create a natural-looking waveform shape
    const h = maxHeight - (maxHeight - minHeight) * Math.pow(dist, 0.6) + Math.sin(i * 1.5) * 8
    return {
      height: Math.max(minHeight, h),
      delay: i * 0.05
    }
  })
})

function getBarOpacity(index: number): number {
  if (!props.isPlaying) return 0.4
  const progressIndex = Math.floor(props.progress * bars.value.length)
  return index <= progressIndex ? 1 : 0.4
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}
</script>

<style scoped>
.waveform-container {
  width: 100%;
  max-width: 520px;
  margin: 0 auto;
}

.waveform-bars {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 60px;
  margin-bottom: 8px;
}

.waveform-bar {
  width: 14px;
  border-radius: 10px;
  background: var(--color-primary);
  opacity: 0.4;
  transition: opacity 0.3s ease, background 0.3s ease;
}

.state-correct .waveform-bar {
  background: var(--color-correct);
}

.state-wrong .waveform-bar {
  background: var(--color-wrong);
}

.is-playing .waveform-bar {
  animation: pulse 1.2s ease-in-out infinite alternate;
}

@keyframes pulse {
  0% { transform: scaleY(0.7); }
  100% { transform: scaleY(1.1); }
}

.waveform-progress-track {
  width: 100%;
  height: 4px;
  background: #d0d0c8;
  border-radius: 2px;
  overflow: hidden;
}

.waveform-progress-fill {
  height: 100%;
  background: var(--color-primary);
  border-radius: 2px;
  transition: width 0.1s linear, background 0.3s ease;
}

.state-correct .waveform-progress-fill {
  background: var(--color-correct);
}

.state-wrong .waveform-progress-fill {
  background: var(--color-wrong);
}

.waveform-time {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  color: var(--color-text-muted);
  margin-top: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.waveform-label {
  font-weight: 600;
  font-size: 10px;
  letter-spacing: 1.5px;
}

.custom-tooltip {
  position: absolute;
  top: -45px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.85);
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  white-space: normal;
  word-wrap: break-word;
  max-width: 280px;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  pointer-events: none;
  line-height: 1.4;
}

.custom-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: rgba(0, 0, 0, 0.85);
}

.waveform-container {
  position: relative;
}

.tooltip-enter-active,
.tooltip-leave-active {
  transition: opacity 0.15s ease;
}

.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
}

@media (min-width: 1900px) {
  
  .waveform-container {
    width: 100%;
    max-width: 1040px;
    margin: 0 auto;
  }

  .waveform-bars {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    height: 80px;
    margin-bottom: 8px;
  }

  .waveform-bar {
    width: 20px;
    border-radius: 10px;
    background: var(--color-primary);
    opacity: 0.4;
    transition: opacity 0.3s ease, background 0.3s ease;
  }

  .waveform-time {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    color: var(--color-text-muted);
    margin-top: 8px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .waveform-label {
    font-weight: 600;
    font-size: 16px;
    letter-spacing: 1.5px;
  }

}
</style>
