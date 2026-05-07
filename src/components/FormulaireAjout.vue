<template>
  <section class="formulaire">
    <h2 class="formulaire__title">Ajouter un article</h2>

    <form class="formulaire__form" @submit.prevent="soumettre">
      <!-- Nom -->
      <div class="field field--grow">
        <label class="field__label" for="nom">Article *</label>
        <input
          id="nom"
          v-model="form.nom"
          class="field__input"
          type="text"
          placeholder="ex: Tomates cerises..."
          autocomplete="off"
          ref="inputRef"
        />
      </div>

      <!-- Quantité -->
      <div class="field field--sm">
        <label class="field__label" for="qty">Quantité</label>
        <input
          id="qty"
          v-model="form.quantite"
          class="field__input"
          type="text"
          placeholder="500g, ×3…"
        />
      </div>

      <!-- Catégorie + bouton créer -->
      <div class="field field--md">
        <label class="field__label" for="cat">Catégorie</label>
        <div class="cat-row">
          <select id="cat" v-model="form.categorie" class="field__input field__select">
            <optgroup label="Catégories par défaut">
              <option
                v-for="c in store.categories.filter(c => !c.custom)"
                :key="c.id"
                :value="c.id"
              >{{ c.emoji }} {{ c.label }}</option>
            </optgroup>
            <optgroup v-if="store.categoriesCustom.length" label="Mes catégories">
              <option
                v-for="c in store.categoriesCustom"
                :key="c.id"
                :value="c.id"
              >{{ c.emoji }} {{ c.label }}</option>
            </optgroup>
          </select>
          <button
            type="button"
            class="btn-new-cat"
            @click="toggleNouvelleCategorie"
            :title="showNouvelleCategorie ? 'Annuler' : 'Créer une catégorie'"
          >{{ showNouvelleCategorie ? '✕' : '+' }}</button>
        </div>
      </div>

      <!-- Bouton ajouter -->
      <button class="btn-add" type="submit" title="Ajouter">
        <span>+</span>
      </button>
    </form>

    <!-- Formulaire nouvelle catégorie -->
    <Transition name="slide">
      <div v-if="showNouvelleCategorie" class="nouvelle-cat">
        <span class="nouvelle-cat__label">Nouvelle catégorie</span>
        <input
          v-model="nouvelleCat.emoji"
          class="field__input nouvelle-cat__emoji"
          type="text"
          placeholder="🏷️"
          maxlength="2"
        />
        <input
          v-model="nouvelleCat.label"
          class="field__input nouvelle-cat__nom"
          type="text"
          placeholder="Nom de la catégorie..."
          @keyup.enter="creerCategorie"
        />
        <button type="button" class="btn-creer" @click="creerCategorie">Créer</button>
      </div>
    </Transition>

    <!-- Catégories custom existantes -->
    <div v-if="store.categoriesCustom.length" class="cats-custom">
      <span class="cats-custom__label">Mes catégories</span>
      <span
        v-for="cat in store.categoriesCustom"
        :key="cat.id"
        class="cat-tag"
      >
        {{ cat.emoji }} {{ cat.label }}
        <button class="cat-tag__del" @click="store.supprimerCategorieCustom(cat.id)" title="Supprimer">✕</button>
      </span>
    </div>

    <!-- Note optionnelle -->
    <div class="formulaire__note">
      <input
        v-model="form.note"
        class="field__input field__input--note"
        type="text"
        placeholder="Note (optionnelle)…"
      />
    </div>

    <!-- Feedback -->
    <Transition name="fade">
      <p v-if="ajoutFeedback" class="feedback">✓ Article ajouté !</p>
    </Transition>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useListeStore } from '@/stores/liste'

const store = useListeStore()
const inputRef = ref(null)
const ajoutFeedback = ref(false)
const showNouvelleCategorie = ref(false)

const form = reactive({
  nom: '',
  quantite: '',
  categorie: 'autre',
  note: '',
})

const nouvelleCat = reactive({ emoji: '', label: '' })

function soumettre() {
  if (!form.nom.trim()) return
  store.ajouterArticle({ ...form })
  form.nom = ''
  form.quantite = ''
  form.note = ''
  ajoutFeedback.value = true
  setTimeout(() => (ajoutFeedback.value = false), 1800)
  inputRef.value?.focus()
}

function toggleNouvelleCategorie() {
  showNouvelleCategorie.value = !showNouvelleCategorie.value
  nouvelleCat.emoji = ''
  nouvelleCat.label = ''
}

function creerCategorie() {
  if (!nouvelleCat.label.trim()) return
  const id = store.ajouterCategorie({ label: nouvelleCat.label, emoji: nouvelleCat.emoji || '🏷️' })
  form.categorie = id
  showNouvelleCategorie.value = false
  nouvelleCat.emoji = ''
  nouvelleCat.label = ''
}
</script>

<style scoped>
.formulaire {
  background: var(--paper);
  border-radius: 12px;
  padding: 20px;
  margin: 20px 16px;
  box-shadow: var(--shadow);
  border: 1px solid var(--line);
  position: relative;
}

.formulaire__title {
  font-family: 'Playfair Display', serif;
  font-size: 16px;
  color: var(--ink);
  margin-bottom: 14px;
}

.formulaire__form {
  display: flex;
  gap: 10px;
  align-items: flex-end;
  flex-wrap: wrap;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.field--grow { flex: 1; min-width: 150px; }
.field--sm   { width: 90px; }
.field--md   { width: 180px; }

.field__label {
  font-size: 9px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--muted);
}

.field__input {
  background: var(--bg);
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 9px 12px;
  font-family: 'DM Mono', monospace;
  font-size: 13px;
  color: var(--ink);
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  width: 100%;
}

.field__input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(30,96,145,0.12);
}

.field__select { cursor: pointer; }

.field__input--note {
  font-size: 12px;
  color: var(--muted);
  font-style: italic;
}

/* Cat row */
.cat-row {
  display: flex;
  gap: 6px;
  align-items: center;
}

.cat-row .field__input { flex: 1; }

.btn-new-cat {
  width: 34px;
  height: 36px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px dashed var(--accent);
  background: var(--accent-light);
  color: var(--accent);
  font-size: 18px;
  cursor: pointer;
  transition: all 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-new-cat:hover { background: var(--accent); color: #fff; }

/* Nouvelle catégorie form */
.nouvelle-cat {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 10px;
  padding: 12px;
  background: var(--accent-light);
  border-radius: 8px;
  border: 1px dashed var(--accent);
}

.nouvelle-cat__label {
  font-size: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--accent);
  white-space: nowrap;
}

.nouvelle-cat__emoji { width: 52px; text-align: center; }
.nouvelle-cat__nom   { flex: 1; min-width: 120px; }

.btn-creer {
  padding: 9px 16px;
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-family: 'DM Mono', monospace;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.15s;
  white-space: nowrap;
}

.btn-creer:hover { background: var(--accent-dark); }

/* Catégories custom tags */
.cats-custom {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 10px;
}

.cats-custom__label {
  font-size: 9px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--muted);
}

.cat-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: var(--bg);
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 3px 10px 3px 10px;
  font-size: 11px;
  color: var(--ink);
}

.cat-tag__del {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--muted);
  font-size: 10px;
  padding: 0 0 0 2px;
  line-height: 1;
  transition: color 0.15s;
}

.cat-tag__del:hover { color: #e53e3e; }

/* Note */
.formulaire__note { margin-top: 10px; }

/* Bouton ajouter */
.btn-add {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--accent);
  border: none;
  color: #fff;
  font-size: 26px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.15s, background 0.2s;
  align-self: flex-end;
}

.btn-add:hover  { background: var(--accent-dark); transform: scale(1.08); }
.btn-add:active { transform: scale(0.94); }

/* Feedback */
.feedback {
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--success);
  color: #fff;
  font-size: 11px;
  letter-spacing: 1px;
  padding: 4px 16px;
  border-radius: 20px;
}

/* Transitions */
.fade-enter-active,  .fade-leave-active  { transition: opacity 0.3s; }
.fade-enter-from,    .fade-leave-to      { opacity: 0; }
.slide-enter-active, .slide-leave-active { transition: all 0.25s ease; }
.slide-enter-from,   .slide-leave-to     { opacity: 0; transform: translateY(-8px); }
</style>