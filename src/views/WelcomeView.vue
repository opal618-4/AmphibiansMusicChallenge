<template>
  <div class="welcome-view">
    <SideNav />
    <div class="welcome-content">
      <!-- <div class="welcome-badge">🐸 ZOO STATION</div> -->
      <h1 class="welcome-title">
        <span class="title-line">Match The <span class="accent">Sound</span> Challenge</span>
      </h1>
      <p class="welcome-subtitle">
        Listen carefully and identity the mystery call the pond.
      </p>
      <div class="welcome-features">
        <div class="feature">
          <!-- <div class="feature-icon">🐸</div> -->

          <span>❶ Study the species gallery</span> 
        </div>
        <div class="feature">
          <!-- <div class="feature-icon">🎧</div> -->
          <span>❷ Listen the mystery</span>
        </div>
        <div class="feature">
          <!-- <div class="feature-icon">🎮</div> -->
          <span>❸ Guess what it is</span>
        </div>
      </div>
      <button class="start-btn" @click="$router.push('/gallery')">
        Start
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="30" height="30">
          <line x1="5" y1="12" x2="19" y2="12"/>
          <polyline points="12 5 19 12 12 19"/>
        </svg>
      </button>

    </div>
    <div class="welcome-decoration">
      <div class="deco-circle c1"></div>
      <div class="deco-circle c2"></div>
      <div class="deco-circle c3"></div>
      <div class="leaf l1">🌿</div>
      <div class="leaf l2">🍃</div>
      <div class="leaf l3">🌱</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SideNav from '../components/SideNav.vue'
</script>

<style scoped>
.welcome-view {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 40px;
}

.welcome-content {
  text-align: center;
  z-index: 10;
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.welcome-badge {
  display: inline-block;
  padding: 8px 20px;
  background: var(--color-primary);
  color: white;
  border-radius: 30px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 2px;
  margin-bottom: 24px;
}

.welcome-title {
  font-size: 64px;
  font-weight: 800;
  line-height: 1.1;
  margin: 0 0 20px 0;
  color: var(--color-text);
}

.title-line {
  display: block;
}

.accent {
  color: var(--color-primary);
  font-size: 72px;
}

.welcome-subtitle {
  font-size: 20px;
  color: var(--color-text-muted);
  line-height: 1.6;
  margin: 0 0 40px 0;
  max-width: 550px;
  margin-left: auto;
  margin-right: auto;
}

.welcome-features {
  display: flex;
  gap: 32px;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 48px;
  margin-top: 100px;
}

.feature {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  color: var(--color-text-muted);
  font-weight: 500;
}

.feature-icon {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background: var(--color-card);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
}

.start-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 20px 60px;
  background: var(--color-text);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 25px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.start-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(26,35,50,0.35);
}

.welcome-decoration {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.deco-circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.08;
}

.c1 {
  width: 400px;
  height: 400px;
  background: var(--color-primary);
  top: -100px;
  right: -100px;
  animation: float 8s ease-in-out infinite;
}

.c2 {
  width: 250px;
  height: 250px;
  background: var(--color-primary);
  bottom: -50px;
  left: -50px;
  animation: float 10s ease-in-out infinite reverse;
}

.c3 {
  width: 150px;
  height: 150px;
  background: var(--color-primary);
  top: 40%;
  left: 10%;
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}

.leaf {
  position: absolute;
  font-size: 50px;
  animation: leafFloat 12s ease-in-out infinite;
}

.l1 { top: 15%; right: 15%; animation-delay: 0s; }
.l2 { bottom: 20%; left: 20%; animation-delay: -4s; }
.l3 { top: 60%; right: 25%; animation-delay: -8s; font-size: 30px; }

@keyframes leafFloat {
  0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
  50% { transform: translateY(-15px) rotate(10deg); opacity: 0.5; }
}

@media (min-width: 1900px) {
  .welcome-title {
    font-size: 90px;
  }
  .accent {
    font-size: 100px;
  }
  .welcome-subtitle {
    font-size: 35px;
    max-width: 1200px;
  }
  .welcome-features {
    gap: 60px;
    margin-top: 120px;
    margin-bottom: 60px;
  }
  .feature {
    font-size: 32px;
  }
  .start-btn {
    font-size: 38px;
    padding: 28px 90px;
  }
  .deco-circle.c1 {
    width: 900px;
    height: 900px;
    top: -200px;
    right: -200px;
  }
  .deco-circle.c2 {
    width: 500px;
    height: 500px;
    bottom: -100px;
    left: -100px;
  }
  .deco-circle.c3 {
    width: 350px;
    height: 350px;
    top: 35%;
    left: 8%;
  }
  .leaf {
    font-size: 90px;
  }
  .leaf.l3 {
    font-size: 50px;
  }
}
</style>
