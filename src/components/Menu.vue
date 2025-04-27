<template>
  <div class="partOne">
    <h1 class="green">{{ msg }}</h1>
    {{ currentScreen }}
    <ul>
      <li>
        <button @click="handleDebutPartie()" style="font-size: 0.8rem; padding: 4px 8px">
          Début de partie
        </button>
      </li>
      <li>
        <button @click="setCurrentScreen('cagnotte')" style="font-size: 0.8rem; padding: 4px 8px">
          Cagnotte
        </button>
      </li>
      <li>
        <button @click="setCurrentScreen('loterie')" style="font-size: 0.8rem; padding: 4px 8px">
          Loterie
        </button>
      </li>
      <li>
        <button @click="setCurrentScreen('loterie')" style="font-size: 0.8rem; padding: 4px 8px">
          Prêt
        </button>
      </li>
      <li>
        <button @click="setCurrentScreen('loterie')" style="font-size: 0.8rem; padding: 4px 8px">
          Historique
        </button>
      </li>
      <li>
        <button
          @click="setCurrentScreen('lotAleatoire')"
          style="font-size: 0.8rem; padding: 4px 8px"
        >
          Lot aléatoire
        </button>
      </li>
      <li>
        <button @click="setCurrentScreen('virprev')" style="font-size: 0.8rem; padding: 4px 8px">
          Virement/prélevement
        </button>
      </li>
    </ul>
    <template v-if="playerMoney[1] >= playerMoney[2]">
      Argent J1 : {{ playerMoney[1] }} €
      <br />
      Argent J2 : {{ playerMoney[2] }} €
    </template>
    <template v-else>
      Argent J2 : {{ playerMoney[2] }} €
      <br />
      Argent J1 : {{ playerMoney[1] }} €
    </template>
    <br />

    Cagnotte : {{ cagnotte }} €
  </div>

  <div class="partTwo">
    <template v-if="currentScreen === 'nouvellePartie'">
      <nouvellePartie></nouvellePartie>
    </template>
    <template v-else>
      <template v-if="currentScreen === 'cagnotte'">
        <Cagnotte @retirer-cagnotte="retirerCagnotte" @ajout-cagnotte="handleCagnotte"></Cagnotte>
      </template>
      <template v-else-if="currentScreen === 'loterie'">
        <Loterie @loterie-result="handleLoterie"></Loterie>
      </template>
      <template v-else-if="currentScreen === 'lotAleatoire'">
        <LotAleatoire @loterie-result="handleLoterie"></LotAleatoire>
      </template>
    </template>
  </div>
</template>

<script setup>
import LotAleatoire from './LotAleatoire.vue'
import Loterie from './Loterie.vue'
import nouvellePartie from './NouvellePartie.vue'
import Cagnotte from './Cagnotte.vue'

function handleLoterie({ joueur, argent }) {
  playerMoney.value[joueur] += argent
  setTimeout(() => {
    currentScreen.value = 'none'
  }, 2000)
}

function retirerCagnotte(joueur) {
  playerMoney.value[joueur] += cagnotte.value
  cagnotte.value = 0
  setTimeout(() => {
    currentScreen.value = 'none'
  }, 2000)
}

function handleCagnotte({ valeur, joueur }) {
  playerMoney.value[joueur] -= valeur
  cagnotte.value += parseInt(valeur, 10)

  setTimeout(() => {
    currentScreen.value = 'none'
  }, 2000)
}

function resetPartie() {
  if (confirm('Êtes-vous sûr de vouloir réinitialiser la partie ?')) {
    currentPlayer.value = 1
    playerMoney.value = { 1: 3500, 2: 3500 }
    cagnotte.value = 0
  }
}

function setCurrentScreen(screen) {
  currentScreen.value = screen
}

function handleDebutPartie() {
  resetPartie()
  setCurrentScreen('nouvellePartie')
}

defineProps({
  msg: {
    type: String,
    required: true,
  },
})

import { ref } from 'vue'

const currentPlayer = ref(1)
const cagnotte = ref(0)
const playerMoney = ref({ 1: 3500, 2: 3500 })
const currentScreen = ref('none')
</script>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
