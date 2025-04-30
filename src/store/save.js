import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'
export const save = defineStore(
  'save',
  () => {
    const cagnotte = ref(0)
    const playerMoney = ref({ 1: 3500, 2: 3500 })
    return { cagnotte: cagnotte, playerMoney: playerMoney }
  },
  {
    persist: true,
  },
)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(save, import.meta.hot))
}
