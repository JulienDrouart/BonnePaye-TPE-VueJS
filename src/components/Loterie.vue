<template>
  <button @click="calcul()">Loterie</button>
  <div v-if="loterieDone">
    <p>Le joueur {{ joueur }} à remporté {{ argent }} € à la loterie !</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const loterieDone = ref(false)
const argent = ref(0)
const joueur = ref(0)

const emit = defineEmits(['loterie-result'])

function calcul() {
  joueur.value = Math.floor(Math.random() * 2) + 1
  argent.value = 1200
  loterieDone.value = true
  emit('loterie-result', { joueur: joueur.value, argent: argent.value })
}
</script>
