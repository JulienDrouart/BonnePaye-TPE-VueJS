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
    Argent J1 : {{ playerMoney[1] }} €
    <br />
    Argent J2 : {{ playerMoney[2] }} €
    <br />
    Argent J3 : {{ playerMoney[3] }} €
    <br />
    Argent J4 : {{ playerMoney[4] }} €
    <br />
    Cagnotte : {{ cagnotte }} €
  </div>

  <div class="partTwo">
    <template v-if="currentScreen === 'nouvellePartie'">
      <nouvellePartie></nouvellePartie>
    </template>
    <template v-else>
      <template v-switch="currentScreen">
        <template v-case="'cagnotte'">
          <p>Écran Cagnotte</p>
        </template>
        <template v-case="'loterie'">
          <p>Écran Loterie</p>
        </template>
        <template v-case="'lotAleatoire'">
          <p>Écran Lot aléatoire</p>
        </template>
        <template v-default>
          <p>Écran inconnu</p>
        </template>
      </template>
    </template>
  </div>
</template>

<script setup>
import nouvellePartie from './NouvellePartie.vue'

function resetPartie() {
  playerMoney.value = { 1: 3500, 2: 3500, 3: 3500, 4: 3500 }
  cagnotte.value = 0
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
const playerMoney = ref({ 1: 3500, 2: 3500, 3: 3500, 4: 3500 })
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
