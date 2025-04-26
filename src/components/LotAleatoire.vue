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
  <button :disabled="!playerSelected" @click="calcul()">Prix aléatoire</button>
  <div v-if="loterieDone">
    <p>Le joueur {{ joueur }} a remporté {{ argent }} € !</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const loterieDone = ref(false)
const argent = ref(0)
const joueur = ref(0)
const playerSelected = ref(false)

const emit = defineEmits(['loterie-result'])

function selectPlayer(playerNumber) {
  joueur.value = playerNumber
  playerSelected.value = true
}

function calcul() {
  argent.value = Math.floor(Math.random() * (1500 - 100 + 1)) + 100
  loterieDone.value = true
  emit('loterie-result', { joueur: joueur.value, argent: argent.value })
}
</script>
