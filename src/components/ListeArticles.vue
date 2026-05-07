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
      <button class="btn-export" @click="exporter">
        <Transition name="fade" mode="out-in">
          <span :key="exportFeedback">{{ exportFeedback ? '✓ Copié !' : '📤 Exporter' }}</span>
        </Transition>
      </button>
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
import { ref } from 'vue'
import { useListeStore } from '@/stores/liste'
import ArticleItem from '@/components/ArticleItem.vue'

const store = useListeStore()
const exportFeedback = ref(false)

function confirmerVider() {
  if (confirm('Vider toute la liste ?')) store.viderListe()
}

function genererTexte() {
  const date = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })
  const lignes = [`🛒 Liste de course — ${date}`, '']

  // Articles à faire, groupés par catégorie
  const grouped = {}
  store.articles
    .filter(a => !a.fait)
    .forEach(a => {
      if (!grouped[a.categorie]) grouped[a.categorie] = []
      grouped[a.categorie].push(a)
    })

  Object.entries(grouped).forEach(([catId, articles]) => {
    const cat = store.getCategorieInfo(catId)
    lignes.push(`${cat.emoji} ${cat.label}`)
    articles.forEach(a => {
      const qty = a.quantite ? ` (${a.quantite})` : ''
      const note = a.note ? ` — ${a.note}` : ''
      lignes.push(`• ${a.nom}${qty}${note}`)
    })
    lignes.push('')
  })

  // Articles déjà cochés
  const coches = store.articles.filter(a => a.fait)
  if (coches.length) {
    lignes.push(`✅ Déjà dans le panier (${coches.length})`)
    coches.forEach(a => lignes.push(`• ✓ ${a.nom}`))
  }

  return lignes.join('\n').trim()
}

async function exporter() {
  const texte = genererTexte()

  // Web Share API — natif sur mobile
  if (navigator.share) {
    try {
      await navigator.share({ title: '🛒 Ma liste de course', text: texte })
      return
    } catch {
      // annulé par l'utilisateur, on ne fait rien
      return
    }
  }

  // Fallback : copie dans le presse-papier
  try {
    await navigator.clipboard.writeText(texte)
    exportFeedback.value = true
    setTimeout(() => (exportFeedback.value = false), 2000)
  } catch {
    // Dernier recours : prompt
    prompt('Copiez votre liste :', texte)
  }
}
</script>