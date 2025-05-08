<template>
  Historique
  <ul>
    <li v-for="(item, index) in history" :key="index">{{ item.heure }} - {{ item.message }}</li>
  </ul>
</template>
<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  history: {
    type: Array,
    required: true,
  },
})
</script>
