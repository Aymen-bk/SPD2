<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '~/stores/user'

const router = useRouter()
const userStore = useUserStore()

onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search)
  const code = urlParams.get('code')
  if (code) {
    // Exchange code for access token
    try {
      // You need a backend proxy for this in production!
      const res = await fetch(`https://corsproxy.io/?https://connect.deezer.com/oauth/access_token.php?app_id=YOUR_DEEZER_APP_ID&secret=YOUR_DEEZER_APP_SECRET&code=${code}&output=json`)
      const data = await res.json()
      if (data.access_token) {
        userStore.setToken(data.access_token)
        router.replace('/')
      }
    } catch (e) {
      // Handle error
      router.replace('/login')
    }
  } else {
    router.replace('/login')
  }
})
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-[#18171c]">
    <img src="/images/deezer_logo.png" alt="Deezer Logo" class="mb-8 w-32">
    <div class="text-white text-xl font-bold mb-4">Connecting to Deezer...</div>
    <div class="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
</template> 