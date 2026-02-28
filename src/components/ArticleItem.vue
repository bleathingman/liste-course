<template>
  <li class="article" :class="{ 'article--fait': article.fait }">
    <!-- Mode lecture -->
    <template v-if="!enEdition">
      <!-- Checkbox -->
      <button
        class="article__check"
        :class="{ 'article__check--fait': article.fait }"
        @click="store.toggleFait(article.id)"
        :title="article.fait ? 'Décocher' : 'Cocher'"
      >
        <span v-if="article.fait">✓</span>
      </button>

      <!-- Contenu -->
      <div class="article__body">
        <span class="article__nom">{{ article.nom }}</span>
        <span v-if="article.quantite" class="article__qty">{{ article.quantite }}</span>
        <span v-if="article.note" class="article__note">📝 {{ article.note }}</span>
      </div>

      <!-- Actions -->
      <div class="article__actions">
        <button class="article__btn article__btn--edit" @click="startEdit" title="Modifier">✏️</button>
        <button class="article__btn article__btn--del" @click="store.supprimerArticle(article.id)" title="Supprimer">🗑</button>
      </div>
    </template>

    <!-- Mode édition -->
    <template v-else>
      <div class="edit-form">
        <input v-model="editForm.nom" class="edit-input edit-input--grow" placeholder="Article" />
        <input v-model="editForm.quantite" class="edit-input edit-input--sm" placeholder="Qté" />
        <input v-model="editForm.note" class="edit-input edit-input--grow" placeholder="Note" />
        <button class="edit-btn edit-btn--save" @click="sauvegarderEdit">✓</button>
        <button class="edit-btn edit-btn--cancel" @click="annulerEdit">✕</button>
      </div>
    </template>
  </li>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useListeStore } from '@/stores/liste'

const props = defineProps({
  article: { type: Object, required: true }
})

const store = useListeStore()
const enEdition = ref(false)

const editForm = reactive({
  nom: '',
  quantite: '',
  note: '',
})

function startEdit() {
  editForm.nom = props.article.nom
  editForm.quantite = props.article.quantite
  editForm.note = props.article.note
  enEdition.value = true
}

function sauvegarderEdit() {
  if (!editForm.nom.trim()) return
  store.modifierArticle(props.article.id, {
    nom: editForm.nom.trim(),
    quantite: editForm.quantite,
    note: editForm.note,
  })
  enEdition.value = false
}

function annulerEdit() {
  enEdition.value = false
}
</script>

<style scoped>
.article {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 10px 14px;
  transition: opacity 0.2s, background 0.2s;
}

.article:hover { background: #fff; }

.article--fait {
  opacity: 0.5;
  background: var(--bg);
}

/* Check */
.article__check {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid var(--line);
  background: transparent;
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: transparent;
  transition: all 0.2s;
}

.article__check:hover {
  border-color: var(--success);
}

.article__check--fait {
  background: var(--success);
  border-color: var(--success);
  color: #fff;
}

/* Body */
.article__body {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  min-width: 0;
}

.article__nom {
  font-size: 14px;
  color: var(--ink);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.article--fait .article__nom {
  text-decoration: line-through;
  color: var(--muted);
}

.article__qty {
  font-size: 11px;
  background: var(--line);
  padding: 2px 8px;
  border-radius: 10px;
  color: var(--muted);
  white-space: nowrap;
}

.article__note {
  font-size: 11px;
  color: var(--muted);
  font-style: italic;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Actions */
.article__actions {
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.15s;
}

.article:hover .article__actions { opacity: 1; }

.article__btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  padding: 4px 6px;
  border-radius: 4px;
  transition: background 0.15s;
}

.article__btn:hover { background: var(--line); }

/* Edit form */
.edit-form {
  display: flex;
  gap: 6px;
  align-items: center;
  flex: 1;
  flex-wrap: wrap;
}

.edit-input {
  background: var(--bg);
  border: 1px solid var(--accent);
  border-radius: 6px;
  padding: 6px 10px;
  font-family: 'DM Mono', monospace;
  font-size: 12px;
  color: var(--ink);
  outline: none;
}

.edit-input--grow { flex: 1; min-width: 80px; }
.edit-input--sm   { width: 70px; }

.edit-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.15s;
}

.edit-btn--save   { background: var(--success); color: #fff; }
.edit-btn--cancel { background: var(--line); color: var(--muted); }
.edit-btn:hover   { transform: scale(1.05); }
</style>
