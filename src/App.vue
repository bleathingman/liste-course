<template>
  <div class="app">
    <AppHeader />
    <main class="main">
      <FormulaireAjout />
      <FiltresBar />
      <ListeArticles />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
import FormulaireAjout from '@/components/FormulaireAjout.vue'
import FiltresBar from '@/components/FiltresBar.vue'
import ListeArticles from '@/components/ListeArticles.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>
