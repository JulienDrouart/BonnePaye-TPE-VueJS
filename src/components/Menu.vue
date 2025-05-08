<template>
  <div class="partOne">
    <h1 class="green">{{ msg }}</h1>
    <ul>
      <li>
        <button @click="setCurrentScreen('cagnotte')" style="font-size: 0.8rem; padding: 4px 8px">
          Cagnotte
        </button>
      </li>
      <li>
        <button @click="setCurrentScreen('changeTour')" style="font-size: 0.8rem; padding: 4px 8px">
          Changement de tour
        </button>
      </li>
      <li>
        <button @click="handleDebutPartie()" style="font-size: 0.8rem; padding: 4px 8px">
          Début de partie
        </button>
      </li>
      <li>
        <button @click="setCurrentScreen('historique')" style="font-size: 0.8rem; padding: 4px 8px">
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
        <button @click="setCurrentScreen('loterie')" style="font-size: 0.8rem; padding: 4px 8px">
          Loterie
        </button>
      </li>
      <li>
        <button @click="setCurrentScreen('pret')" style="font-size: 0.8rem; padding: 4px 8px">
          Prêt
        </button>
      </li>
      <li>
        <button @click="setCurrentScreen('virprev')" style="font-size: 0.8rem; padding: 4px 8px">
          Virement/prélevement
        </button>
      </li>
    </ul>

    Joueur 1 :<br />
    <span :style="{ color: moneyStore.playerMoney[1] <= 0 ? 'red' : 'inherit' }">
      {{ moneyStore.playerMoney[1] }} €
    </span>
    <template v-if="moneyStore.pret[1] > 0"><br />Prêt : {{ moneyStore.pret[1] }} €</template><br />
    Tour : {{ moneyStore.tour[1] }}<br />
    <br />

    Joueur 2 :<br />
    <span :style="{ color: moneyStore.playerMoney[1] <= 0 ? 'red' : 'inherit' }">
      {{ moneyStore.playerMoney[2] }} €
    </span>
    <template v-if="moneyStore.pret[2] > 0"><br />Prêt : {{ moneyStore.pret[2] }} €</template><br />
    Tour : {{ moneyStore.tour[2] }}<br />
    <br /><br />

    Cagnotte : {{ moneyStore.cagnotte }} €
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
      <template v-else-if="currentScreen === 'virprev'">
        <VirementPrelevement @vir-prev="handleVirPrev"></VirementPrelevement>
      </template>
      <template v-else-if="currentScreen === 'historique'">
        <Historique></Historique>
      </template>
      <template v-else-if="currentScreen === 'pret'">
        <Pret @pret="handlePret"></Pret>
      </template>
      <template v-else-if="currentScreen === 'changeTour'">
        <ChangementTour @action="handleChangementTour"></ChangementTour>
      </template>
    </template>
  </div>
</template>

<script setup>
import LotAleatoire from './LotAleatoire.vue'
import Loterie from './Loterie.vue'
import nouvellePartie from './NouvellePartie.vue'
import Cagnotte from './Cagnotte.vue'
import Historique from './Historique.vue'
import Pret from './Pret.vue'

function handlePret({ valeur, joueur, action }) {
  if (action === 'askPret') {
    moneyStore.pret[joueur] += parseInt(valeur, 10)
    moneyStore.playerMoney[joueur] += parseInt(valeur, 10)
  } else if (action === 'refundPret') {
    const refund = parseInt(valeur, 10) * 1.1
    moneyStore.playerMoney[joueur] -= refund
    moneyStore.pret[joueur] -= parseInt(valeur, 10)
  }
  setTimeout(() => {
    currentScreen.value = 'none'
  }, 2000)
}

function handleLoterie({ joueur, argent }) {
  moneyStore.playerMoney[joueur] += argent
  moneyStore.history.push({
    heure: new Date().toLocaleTimeString(),
    message: `Le joueur ${joueur} a remporté ${argent}€ à la loterie`,
  })
  setTimeout(() => {
    currentScreen.value = 'none'
  }, 2000)
}

function handleChangementTour(joueur) {
  moneyStore.tour[joueur] += 1
  const pret = moneyStore.pret[joueur]
  if (pret > 0) {
    moneyStore.playerMoney[joueur] -= pret / 10
  }
  moneyStore.playerMoney[joueur] += 3500
  moneyStore.history.push({
    heure: new Date().toLocaleTimeString(),
    message: `Le joueur ${joueur} a pris un tour`,
  })
  setTimeout(() => {
    currentScreen.value = 'none'
  }, 2000)
}

function retirerCagnotte(joueur) {
  moneyStore.playerMoney[joueur] += moneyStore.cagnotte.value
  moneyStore.cagnotte = 0
  setTimeout(() => {
    currentScreen.value = 'none'
  }, 2000)
}

function handleCagnotte({ valeur, joueur }) {
  moneyStore.playerMoney[joueur] -= valeur
  moneyStore.cagnotte += parseInt(valeur, 10)

  setTimeout(() => {
    currentScreen.value = 'none'
  }, 2000)
}

function resetPartie() {
  if (confirm('Êtes-vous sûr de vouloir réinitialiser la partie ?')) {
    moneyStore.playerMoney = { 1: 3500, 2: 3500 }
    moneyStore.cagnotte = 0
    moneyStore.pret = { 1: 0, 2: 0 }
    moneyStore.tour = { 1: 0, 2: 0 }
    moneyStore.history = []
  }
}

function setCurrentScreen(screen) {
  currentScreen.value = screen
}

function handleDebutPartie() {
  resetPartie()
  setCurrentScreen('nouvellePartie')
}

function handleVirPrev({ joueur, value, action }) {
  if (action === 'retrait') {
    moneyStore.playerMoney[joueur] -= parseInt(value)
  } else if (action === 'prelevement') {
    moneyStore.playerMoney[joueur] += parseInt(value)
  }
  setTimeout(() => {
    currentScreen.value = 'none'
  }, 500)
}

defineProps({
  msg: {
    type: String,
    required: true,
  },
})

import { ref } from 'vue'
import { save } from '@/store/save'
import VirementPrelevement from './VirementPrelevement.vue'
import ChangementTour from './ChangementTour.vue'

const moneyStore = save()

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
