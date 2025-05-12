<script setup>
import { useUserStore } from '~/stores/user'
const userStore = useUserStore()
</script>

<template>
  <div class="px-12 pt-10 pb-4">
    <h1 class="text-3xl font-extrabold text-white mb-6">Profile</h1>
    <div v-if="!userStore.profile" class="text-gray-400">Please log in to view your profile.</div>
    <div v-else class="flex items-center bg-[#23222a] rounded-xl p-8 shadow-lg">
      <img :src="userStore.profile.picture || '/images/deezer_logo.png'" class="w-32 h-32 rounded-full object-cover mr-8 border-4 border-purple-500" />
      <div>
        <div class="text-3xl font-bold text-white mb-2">{{ userStore.profile.name }}</div>
        <div class="text-lg text-gray-400 mb-2">Country: {{ userStore.profile.country }}</div>
        <div class="text-lg text-gray-400 mb-2">ID: {{ userStore.profile.id }}</div>
        <div class="text-lg text-gray-400 mb-2">Type: {{ userStore.profile.type }}</div>
        <div class="text-lg text-gray-400 mb-2">Status: {{ userStore.profile.status }}</div>
      </div>
    </div>
  </div>
</template> 