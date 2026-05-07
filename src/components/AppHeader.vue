<template>
  <header class="header">
    <div class="header__inner">
      <div class="header__brand">
        <span class="header__icon">🛒</span>
        <div>
          <h1 class="header__title">Ma Liste</h1>
          <p class="header__sub">de course</p>
        </div>
      </div>

      <div class="header__right">
        <div class="header__stats">
          <StatBadge :value="store.total" label="articles" />
          <StatBadge :value="store.coches" label="cochés" variant="success" />
          <StatBadge :value="store.total - store.coches" label="restants" variant="warn" />
        </div>

        <!-- Toggle dark mode -->
        <button class="theme-toggle" @click="toggleTheme" :title="isDark ? 'Mode clair' : 'Mode sombre'">
          <Transition name="spin" mode="out-in">
            <span :key="isDark">{{ isDark ? '☀️' : '🌙' }}</span>
          </Transition>
        </button>
      </div>
    </div>

    <!-- Barre de progression -->
    <div class="header__progress">
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: store.progression + '%' }"></div>
      </div>
      <span class="progress-label">{{ store.progression }}% fait</span>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useListeStore } from '@/stores/liste'
import StatBadge from '@/components/StatBadge.vue'

const store = useListeStore()

const isDark = ref(false)

onMounted(() => {
  isDark.value = localStorage.getItem('theme') === 'dark'
  applyTheme()
})

function toggleTheme() {
  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  applyTheme()
}

function applyTheme() {
  document.documentElement.classList.toggle('dark', isDark.value)
}
</script>

<style scoped>
.header {
  background: var(--accent);
  padding: 24px 24px 16px;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: var(--shadow-md);
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
}

.header__brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header__icon  { font-size: 32px; }

.header__title {
  font-family: 'Playfair Display', serif;
  font-size: 26px;
  color: #fff;
  line-height: 1;
}

.header__sub {
  font-size: 11px;
  color: rgba(255,255,255,0.7);
  letter-spacing: 3px;
  text-transform: uppercase;
}

.header__right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header__stats {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

/* Toggle */
.theme-toggle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.25);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  transition: background 0.2s, transform 0.15s;
  flex-shrink: 0;
}

.theme-toggle:hover {
  background: rgba(255,255,255,0.25);
  transform: scale(1.1);
}

/* Progress */
.header__progress {
  display: flex;
  align-items: center;
  gap: 12px;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: rgba(255,255,255,0.25);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #fff;
  border-radius: 3px;
  transition: width 0.5s ease;
}

.progress-label {
  font-size: 11px;
  color: rgba(255,255,255,0.85);
  letter-spacing: 1px;
  white-space: nowrap;
}

/* Spin transition for emoji */
.spin-enter-active, .spin-leave-active { transition: all 0.2s ease; }
.spin-enter-from { opacity: 0; transform: rotate(-90deg) scale(0.5); }
.spin-leave-to   { opacity: 0; transform: rotate(90deg)  scale(0.5); }
</style>