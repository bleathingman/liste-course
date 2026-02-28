import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useListeStore = defineStore('liste', () => {
  // ─── State ───────────────────────────────────────────────
  const articles = ref(
    JSON.parse(localStorage.getItem('liste-course') || '[]')
  )

  const categories = [
    { id: 'fruits',   label: 'Fruits & Légumes', emoji: '🍎' },
    { id: 'viande',   label: 'Viande & Poisson',  emoji: '🥩' },
    { id: 'laitage',  label: 'Laitages',           emoji: '🧀' },
    { id: 'epicerie', label: 'Épicerie',            emoji: '🥫' },
    { id: 'boisson',  label: 'Boissons',            emoji: '🥤' },
    { id: 'hygiene',  label: 'Hygiène',             emoji: '🧴' },
    { id: 'autre',    label: 'Autre',               emoji: '📦' },
  ]

  const filtreCat = ref('tous')
  const searchQuery = ref('')

  // ─── Getters ─────────────────────────────────────────────
  const total = computed(() => articles.value.length)
  const coches = computed(() => articles.value.filter(a => a.fait).length)
  const progression = computed(() =>
    total.value === 0 ? 0 : Math.round((coches.value / total.value) * 100)
  )

  const articlesFiltres = computed(() => {
    return articles.value
      .filter(a => filtreCat.value === 'tous' || a.categorie === filtreCat.value)
      .filter(a => a.nom.toLowerCase().includes(searchQuery.value.toLowerCase()))
  })

  const articlesByCategorie = computed(() => {
    const grouped = {}
    articlesFiltres.value.forEach(a => {
      if (!grouped[a.categorie]) grouped[a.categorie] = []
      grouped[a.categorie].push(a)
    })
    return grouped
  })

  // ─── Actions ─────────────────────────────────────────────
  function sauvegarder() {
    localStorage.setItem('liste-course', JSON.stringify(articles.value))
  }

  function ajouterArticle({ nom, quantite, categorie, note }) {
    if (!nom.trim()) return
    articles.value.unshift({
      id: Date.now(),
      nom: nom.trim(),
      quantite: quantite || '',
      categorie: categorie || 'autre',
      note: note || '',
      fait: false,
      dateAjout: new Date().toISOString(),
    })
    sauvegarder()
  }

  function toggleFait(id) {
    const article = articles.value.find(a => a.id === id)
    if (article) {
      article.fait = !article.fait
      sauvegarder()
    }
  }

  function supprimerArticle(id) {
    articles.value = articles.value.filter(a => a.id !== id)
    sauvegarder()
  }

  function effacerCoches() {
    articles.value = articles.value.filter(a => !a.fait)
    sauvegarder()
  }

  function viderListe() {
    articles.value = []
    sauvegarder()
  }

  function modifierArticle(id, modifications) {
    const article = articles.value.find(a => a.id === id)
    if (article) {
      Object.assign(article, modifications)
      sauvegarder()
    }
  }

  function getCategorieInfo(id) {
    return categories.find(c => c.id === id) || categories.at(-1)
  }

  return {
    articles,
    categories,
    filtreCat,
    searchQuery,
    total,
    coches,
    progression,
    articlesFiltres,
    articlesByCategorie,
    ajouterArticle,
    toggleFait,
    supprimerArticle,
    effacerCoches,
    viderListe,
    modifierArticle,
    getCategorieInfo,
  }
})
