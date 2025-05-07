<template>
  Changement de tour
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
  <button :disabled="!playerSelected" @click="changementtour()">Ajouter un tour</button>
</template>

<script setup>
import { ref } from 'vue'
const joueur = ref(0)
const playerSelected = ref(false)
const emit = defineEmits(['action'])

function selectPlayer(playerNumber) {
  joueur.value = playerNumber
  playerSelected.value = true
}

function changementtour() {
  emit('action', joueur.value)
}
</script>
