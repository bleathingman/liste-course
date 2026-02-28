# 🛒 Liste de Course — Vue.js

Application de liste de course construite avec **Vue 3 + Vite + Pinia**.

## 📦 Stack

| Outil | Rôle |
|-------|------|
| [Vue 3](https://vuejs.org/) | Framework JS (Composition API) |
| [Vite](https://vitejs.dev/) | Build tool / dev server ultra-rapide |
| [Pinia](https://pinia.vuejs.org/) | State management (store global) |

---

## 🚀 Lancer le projet

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de dev
npm run dev

# → Ouvre http://localhost:5173
```

## 📁 Structure du projet

```
liste-course/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.js               ← Point d'entrée
    ├── App.vue               ← Composant racine
    ├── assets/
    │   └── main.css          ← CSS global
    ├── stores/
    │   └── liste.js          ← Store Pinia (toute la logique)
    └── components/
        ├── AppHeader.vue     ← En-tête + stats + progression
        ├── StatBadge.vue     ← Badge réutilisable
        ├── FormulaireAjout.vue ← Formulaire d'ajout
        ├── FiltresBar.vue    ← Recherche + filtres catégories
        ├── ListeArticles.vue ← Liste groupée par catégorie
        ├── ArticleItem.vue   ← Carte article (cocher/éditer/supprimer)
        └── AppFooter.vue     ← Pied de page
```

## ✨ Fonctionnalités

- ✅ Ajouter un article (nom, quantité, catégorie, note)
- ✅ Cocher / décocher les articles
- ✅ Modifier un article en ligne
- ✅ Supprimer un article
- ✅ Filtrer par catégorie
- ✅ Rechercher un article
- ✅ Barre de progression
- ✅ Effacer les cochés / vider la liste
- ✅ **Sauvegarde automatique** dans le `localStorage`
- ✅ Articles groupés par catégorie

## 🏗 Build pour la production

```bash
npm run build
# Fichiers générés dans /dist
```
