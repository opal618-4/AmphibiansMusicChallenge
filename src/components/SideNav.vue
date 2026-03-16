<template>
  <nav class="side-nav">
    <button class="side-nav-btn" title="Home" @click="$router.push('/')">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    </button>
    <button class="side-nav-btn" title="Sound" @click="toggleMute">
      <svg v-if="!muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
        <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/>
      </svg>
      <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
        <line x1="23" y1="9" x2="17" y2="15"/>
        <line x1="17" y1="9" x2="23" y2="15"/>
      </svg>
    </button>
    <button class="side-nav-btn" title="Language">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
      </svg>
    </button>
    <button class="side-nav-btn" title="Help">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    </button>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const muted = ref(false)

function toggleMute() {
  muted.value = !muted.value
}
</script>

<style scoped>
.side-nav {
  position: fixed;
  right: 24px;
  top: 20%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 100;
}

.side-nav-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid var(--color-text);
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  color: var(--color-text);
  transition: all 0.3s ease;
}

.side-nav-btn:hover {
  background: var(--color-text);
  color: var(--color-bg);
}

.side-nav-btn svg {
  width: 20px;
  height: 20px;
}
</style>
