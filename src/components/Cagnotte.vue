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
    <button :disabled="cagnotteValue <= 0 || !playerSelected" @click="valider">Cagnotter</button>
    <input v-model="cagnotteValue" type="text" placeholder="Entrez une valeur" />
    <button :disabled="!playerSelected" @click="retirer">Vider</button>
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

function retirer() {
  emit('retirer-cagnotte', joueur.value)
}

const emit = defineEmits(['ajout-cagnotte', 'retirer-cagnotte'])
</script>
