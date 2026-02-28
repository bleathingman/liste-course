<template>
  <section class="liste">
    <!-- Vide -->
    <div v-if="store.articlesFiltres.length === 0" class="vide">
      <p class="vide__icon">🛒</p>
      <p class="vide__msg">Liste vide —<br />ajoutez vos articles !</p>
    </div>

    <!-- Articles groupés par catégorie -->
    <template v-else>
      <div
        v-for="(articles, catId) in store.articlesByCategorie"
        :key="catId"
        class="groupe"
      >
        <h3 class="groupe__titre">
          {{ store.getCategorieInfo(catId).emoji }}
          {{ store.getCategorieInfo(catId).label }}
          <span class="groupe__count">{{ articles.length }}</span>
        </h3>

        <TransitionGroup name="list" tag="ul" class="groupe__list">
          <ArticleItem
            v-for="article in articles"
            :key="article.id"
            :article="article"
          />
        </TransitionGroup>
      </div>
    </template>

    <!-- Actions globales -->
    <div v-if="store.total > 0" class="actions">
      <button class="btn-secondary" @click="store.effacerCoches">
        🧹 Effacer les cochés ({{ store.coches }})
      </button>
      <button class="btn-danger" @click="confirmerVider">
        🗑 Vider la liste
      </button>
    </div>
  </section>
</template>

<script setup>
import { useListeStore } from '@/stores/liste'
import ArticleItem from '@/components/ArticleItem.vue'

const store = useListeStore()

function confirmerVider() {
  if (confirm('Vider toute la liste ?')) {
    store.viderListe()
  }
}
</script>

<style scoped>
.liste {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 80px;
}

/* Empty */
.vide {
  text-align: center;
  padding: 60px 24px;
  background: var(--paper);
  border-radius: 8px;
  border: 1px dashed var(--line);
}

.vide__icon { font-size: 44px; margin-bottom: 12px; }
.vide__msg  { font-size: 13px; color: var(--muted); line-height: 1.6; }

/* Groupe */
.groupe__titre {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 6px;
}

.groupe__count {
  background: var(--line);
  border-radius: 10px;
  padding: 1px 8px;
  font-size: 10px;
}

.groupe__list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

/* Actions */
.actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 8px;
  border-top: 1px dashed var(--line);
}

.btn-secondary, .btn-danger {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  letter-spacing: 1px;
  padding: 8px 18px;
  border-radius: 6px;
  border: 1px solid var(--line);
  cursor: pointer;
  background: var(--paper);
  color: var(--muted);
  transition: all 0.2s;
}

.btn-secondary:hover { color: var(--accent); border-color: var(--accent); }
.btn-danger:hover    { color: #e53e3e; border-color: #e53e3e; }

/* Transitions */
.list-enter-active, .list-leave-active { transition: all 0.25s ease; }
.list-enter-from { opacity: 0; transform: translateX(-12px); }
.list-leave-to   { opacity: 0; transform: translateX(12px); }
</style>
