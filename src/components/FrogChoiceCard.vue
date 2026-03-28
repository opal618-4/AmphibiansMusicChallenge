<template>
  <div
    class="frog-choice-card"
    :class="{
      'is-selected': isSelected,
      'is-correct': isSelected && answerState === 'correct',
      'is-wrong': isSelected && answerState === 'wrong',
      'is-disabled': answerState !== 'idle'
    }"
    @click="$emit('select')"
  >
    <div class="choice-image">
      <img :src="frog.habitatImage" :alt="frog.commonName" />
    </div>
    <div class="choice-info">
      <h3 class="choice-name">{{ frog.commonName }}</h3>
      <p class="choice-scientific">{{ frog.scientificName }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FrogSpecies, AnswerState } from '../types'

defineProps<{
  frog: FrogSpecies
  isSelected: boolean
  answerState: AnswerState
}>()

defineEmits<{
  select: []
}>()
</script>

<style scoped>
.frog-choice-card {
  display: flex;
  align-items: center;
  gap: 14px;
  background: var(--color-card);
  border-radius: 16px;
  padding: 14px 18px;
  cursor: pointer;
  transition: all 0.1s ease;
  border: 2px solid transparent;
  box-shadow: 0 5px 20px rgba(25, 18, 18, 0.04);
  flex: 1;
}

.frog-choice-card:hover:not(.is-disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.08);
  border-color: var(--color-primary);
}

.frog-choice-card.is-correct {
  background: var(--color-correct-bg);
  border-color: var(--color-correct);
  animation: correctPulse 0.2s ease;
}

.frog-choice-card.is-wrong {
  background: var(--color-wrong-bg);
  border-color: var(--color-wrong);
  animation: shake 0.1s ease;
}

.frog-choice-card.is-disabled:not(.is-selected) {
  opacity: 0.5;
  cursor: not-allowed;
}

@keyframes correctPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.03); }
  100% { transform: scale(1); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-8px); }
  40% { transform: translateX(8px); }
  60% { transform: translateX(-4px); }
  80% { transform: translateX(4px); }
}

.choice-image {
  width: 56px;
  height: 56px;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
}

.choice-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.choice-info {
  flex: 1;
}

.choice-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 2px 0;
}

.choice-scientific {
  font-size: 12px;
  color: var(--color-text-muted);
  font-style: italic;
  margin: 0;
}

.is-correct .choice-name {
  color: var(--color-correct);
}

.is-wrong .choice-name {
  color: var(--color-wrong);
}


@media (min-width: 1900px) {
  .frog-choice-card {
    display: flex;
    align-items: center;
    gap: 20px;
    background: var(--color-card);
    border-radius: 16px;
    padding: 14px 18px;
    cursor: pointer;
    transition: all 0.1s ease;
    border: 2px solid transparent;
    box-shadow: 0 5px 20px rgba(25, 18, 18, 0.04);
    flex: 1;
  }
  .choice-image {
    width: 100px;
    height: 100px;
    border-radius: 10px;
    overflow: hidden;
    flex-shrink: 0;
  }

  .choice-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .choice-name {
    font-size: 30px;
    font-weight: 700;
    color: var(--color-text);
    margin: 0 0 10px 0;
  }
  .choice-scientific {
    font-size: 20px;
    color: var(--color-text-muted);
    font-style: italic;
    margin: 0;
  }
}
</style>
