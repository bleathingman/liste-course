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

      <div class="header__stats">
        <StatBadge :value="store.total" label="articles" />
        <StatBadge :value="store.coches" label="cochés" variant="success" />
        <StatBadge :value="store.total - store.coches" label="restants" variant="warn" />
      </div>
    </div>

    <!-- Barre de progression -->
    <div class="header__progress">
      <div class="progress-bar">
        <div
          class="progress-fill"
          :style="{ width: store.progression + '%' }"
        ></div>
      </div>
      <span class="progress-label">{{ store.progression }}% fait</span>
    </div>
  </header>
</template>

<script setup>
import { useListeStore } from '@/stores/liste'
import StatBadge from '@/components/StatBadge.vue'

const store = useListeStore()
</script>

<style scoped>
.header {
  background: var(--accent);
  padding: 24px 24px 16px;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 4px 24px rgba(0,0,0,0.15);
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

.header__icon {
  font-size: 32px;
}

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

.header__stats {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

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
</style>
