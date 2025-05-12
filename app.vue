<script setup>
import { useSongStore } from '~/stores/song'

const useSong = useSongStore()
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
body {
    @apply bg-black text-white;
}

.hide-scrollbar::-webkit-scrollbar {
    display: none;
}

.hide-scrollbar {
    -ms-overflow-style: none;  
    scrollbar-width: none;  
}
</style>