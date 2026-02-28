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

      <!-- Catégorie -->
      <div class="field field--md">
        <label class="field__label" for="cat">Catégorie</label>
        <select id="cat" v-model="form.categorie" class="field__input field__select">
          <option v-for="c in store.categories" :key="c.id" :value="c.id">
            {{ c.emoji }} {{ c.label }}
          </option>
        </select>
      </div>

      <!-- Bouton -->
      <button class="btn-add" type="submit" title="Ajouter">
        <span>+</span>
      </button>
    </form>

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

const form = reactive({
  nom: '',
  quantite: '',
  categorie: 'autre',
  note: '',
})

function soumettre() {
  if (!form.nom.trim()) return
  store.ajouterArticle({ ...form })
  form.nom = ''
  form.quantite = ''
  form.note = ''
  // feedback
  ajoutFeedback.value = true
  setTimeout(() => (ajoutFeedback.value = false), 1800)
  inputRef.value?.focus()
}
</script>

<style scoped>
.formulaire {
  background: var(--paper);
  border-radius: 8px;
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
.field--md   { width: 160px; }

.field__label {
  font-size: 9px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--muted);
}

.field__input {
  background: var(--bg);
  border: 1px solid var(--line);
  border-radius: 6px;
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
  box-shadow: 0 0 0 3px rgba(201,79,44,0.12);
}

.field__select {
  cursor: pointer;
}

.field__input--note {
  font-size: 12px;
  color: var(--muted);
  font-style: italic;
}

.formulaire__note {
  margin-top: 10px;
}

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

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
