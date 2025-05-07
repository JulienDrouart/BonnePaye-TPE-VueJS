<template>
  <div>
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
    <button :disabled="pretMontant < 1000 || !playerSelected" @click="pret('askPret')">
      Demander
    </button>
    <input v-model="pretMontant" type="text" placeholder="Entrez une valeur" />
    <button :disabled="pretMontant < 1000 || !playerSelected" @click="pret('refundPret')">
      Rembourser
    </button>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const pretMontant = ref(0)
const joueur = ref(0)
const playerSelected = ref(false)

function selectPlayer(playerNumber) {
  joueur.value = playerNumber
  playerSelected.value = true
}

function pret(action) {
  emit('pret', { valeur: pretMontant.value, joueur: joueur.value, action: action })
}
const emit = defineEmits(['pret'])
</script>
