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
    <button :disabled="!playerSelected" @click="emit('retirer-cagnotte', joueur)">Retirer</button>
    <input v-model="cagnotteValue" type="text" placeholder="Entrez une valeur" />
    <button :disabled="cagnotteValue <= 0 || !playerSelected" @click="valider">Valider</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const cagnotteValue = ref(0)
const joueur = ref(0)
const playerSelected = ref(false)

function selectPlayer(playerNumber) {
  joueur.value = playerNumber
  playerSelected.value = true
}

function valider() {
  emit('ajout-cagnotte', { valeur: cagnotteValue.value, joueur: joueur.value })
}
const emit = defineEmits(['ajout-cagnotte', 'retirer-cagnotte'])
</script>
