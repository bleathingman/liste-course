import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useListeStore = defineStore('liste', () => {
  // ─── State ───────────────────────────────────────────────
  const articles = ref(
    JSON.parse(localStorage.getItem('liste-course') || '[]')
  )

  const categoriesDefaut = [
    { id: 'fruits',     label: 'Fruits & Légumes',   emoji: '🍎' },
    { id: 'viande',     label: 'Viande & Poisson',    emoji: '🥩' },
    { id: 'laitage',    label: 'Laitages',             emoji: '🧀' },
    { id: 'boulangerie',label: 'Boulangerie',          emoji: '🥖' },
    { id: 'epicerie',   label: 'Épicerie',             emoji: '🥫' },
    { id: 'surgeles',   label: 'Surgelés',             emoji: '❄️' },
    { id: 'boisson',    label: 'Boissons',             emoji: '🥤' },
    { id: 'hygiene',    label: 'Hygiène & Beauté',     emoji: '🧴' },
    { id: 'maison',     label: 'Maison & Entretien',   emoji: '🏠' },
    { id: 'animaux',    label: 'Animaux',              emoji: '🐾' },
    { id: 'bebe',       label: 'Bébé',                 emoji: '👶' },
    { id: 'autre',      label: 'Autre',                emoji: '📦' },
  ]

  const categoriesCustom = ref(
    JSON.parse(localStorage.getItem('liste-course-cats') || '[]')
  )

  const categories = computed(() => [
    ...categoriesDefaut,
    ...categoriesCustom.value,
  ])

  const filtreCat = ref('tous')
  const searchQuery = ref('')

  // ─── Getters ─────────────────────────────────────────────
  const total      = computed(() => articles.value.length)
  const coches     = computed(() => articles.value.filter(a => a.fait).length)
  const progression = computed(() =>
    total.value === 0 ? 0 : Math.round((coches.value / total.value) * 100)
  )

  const articlesFiltres = computed(() =>
    articles.value
      .filter(a => filtreCat.value === 'tous' || a.categorie === filtreCat.value)
      .filter(a => a.nom.toLowerCase().includes(searchQuery.value.toLowerCase()))
  )

  const articlesByCategorie = computed(() => {
    const grouped = {}
    articlesFiltres.value.forEach(a => {
      if (!grouped[a.categorie]) grouped[a.categorie] = []
      grouped[a.categorie].push(a)
    })
    return grouped
  })

  // ─── Persistance ─────────────────────────────────────────
  function sauvegarder() {
    localStorage.setItem('liste-course', JSON.stringify(articles.value))
  }

  function sauvegarderCats() {
    localStorage.setItem('liste-course-cats', JSON.stringify(categoriesCustom.value))
  }

  // ─── Actions articles ─────────────────────────────────────
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
    if (article) { article.fait = !article.fait; sauvegarder() }
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
    if (article) { Object.assign(article, modifications); sauvegarder() }
  }

  // ─── Actions catégories ───────────────────────────────────
  function ajouterCategorie({ label, emoji }) {
    if (!label.trim()) return
    const id = 'custom_' + Date.now()
    categoriesCustom.value.push({ id, label: label.trim(), emoji: emoji || '🏷️', custom: true })
    sauvegarderCats()
    return id
  }

  function supprimerCategorieCustom(id) {
    categoriesCustom.value = categoriesCustom.value.filter(c => c.id !== id)
    // Reclasser les articles orphelins dans "autre"
    articles.value.forEach(a => { if (a.categorie === id) a.categorie = 'autre' })
    sauvegarderCats()
    sauvegarder()
  }

  function getCategorieInfo(id) {
    return categories.value.find(c => c.id === id) || categoriesDefaut.at(-1)
  }

  return {
    articles,
    categories,
    categoriesCustom,
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
    ajouterCategorie,
    supprimerCategorieCustom,
    getCategorieInfo,
  }
})