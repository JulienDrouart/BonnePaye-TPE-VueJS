<template>
  <button
    @click="selectPlayer(1)"
    :style="playerSelected && joueur === 1 ? 'border: 2px solid #42b983;' : ''"
  >
    1
  </button>
  <button
    @click="selectPlayer(2)"
    :style="playerSelected && joueur === 2 ? 'border: 2px solid #42b983;' : ''"
  >
    2
  </button>
  <button :disabled="value <= 0 || !playerSelected" @click="handleForm('retrait')">Retirer</button>
  <button :disabled="value <= 0 || !playerSelected" @click="handleForm('prelevement')">
    Ajouter
  </button>
  <input v-model="value" type="text" placeholder="Entrez une valeur" />
</template>
<script setup>
const emit = defineEmits(['vir-prev'])

import { ref } from 'vue'
const value = ref(0)
const joueur = ref(0)
const playerSelected = ref(false)
function selectPlayer(playerNumber) {
  joueur.value = playerNumber
  playerSelected.value = true
}

function handleForm(action) {
  emit('vir-prev', { joueur: joueur.value, value: value.value, action: action })
}
</script>
