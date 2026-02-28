<template>
  <div class="filtres">
    <!-- Recherche -->
    <div class="search-wrap">
      <span class="search-icon">🔍</span>
      <input
        v-model="store.searchQuery"
        class="search-input"
        type="text"
        placeholder="Rechercher..."
      />
      <button v-if="store.searchQuery" class="search-clear" @click="store.searchQuery = ''">✕</button>
    </div>

    <!-- Tabs catégories -->
    <div class="cats">
      <button
        class="cat-btn"
        :class="{ active: store.filtreCat === 'tous' }"
        @click="store.filtreCat = 'tous'"
      >
        Tout ({{ store.total }})
      </button>
      <button
        v-for="cat in store.categories"
        :key="cat.id"
        class="cat-btn"
        :class="{ active: store.filtreCat === cat.id }"
        @click="store.filtreCat = cat.id"
      >
        {{ cat.emoji }} {{ cat.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useListeStore } from '@/stores/liste'
const store = useListeStore()
</script>

<style scoped>
.filtres {
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Search */
.search-wrap {
  display: flex;
  align-items: center;
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 0 12px;
  box-shadow: var(--shadow);
}

.search-icon { font-size: 14px; margin-right: 8px; }

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  padding: 10px 0;
  font-family: 'DM Mono', monospace;
  font-size: 13px;
  color: var(--ink);
  outline: none;
}

.search-input::placeholder { color: var(--muted); }

.search-clear {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--muted);
  font-size: 13px;
  padding: 4px;
}

/* Cat tabs */
.cats {
  display: flex;
  gap: 6px;
  overflow-x: auto;
  padding-bottom: 4px;
  scrollbar-width: none;
}
.cats::-webkit-scrollbar { display: none; }

.cat-btn {
  padding: 6px 14px;
  border-radius: 20px;
  border: 1px solid var(--line);
  background: var(--paper);
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  color: var(--muted);
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
}

.cat-btn:hover { border-color: var(--accent); color: var(--accent); }

.cat-btn.active {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}
</style>
