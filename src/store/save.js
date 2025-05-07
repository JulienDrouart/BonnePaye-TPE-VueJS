import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'
export const save = defineStore(
  'save',
  () => {
    const cagnotte = ref(0)
    const playerMoney = ref({ 1: 3500, 2: 3500 })
    const pret = ref({ 1: 0, 2: 0 })
    const tour = ref({ 1: 0, 2: 0 })
    const history = ref([])
    return {
      cagnotte: cagnotte,
      playerMoney: playerMoney,
      pret: pret,
      tour: tour,
      history: history,
    }
  },
  {
    persist: true,
  },
)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(save, import.meta.hot))
}
