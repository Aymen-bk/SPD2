<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import MusicPlayer from '~/components/MusicPlayer.vue'
import ChevronUp from 'vue-material-design-icons/ChevronUp.vue';
import ChevronDown from 'vue-material-design-icons/ChevronDown.vue';
import ChevronRight from 'vue-material-design-icons/ChevronRight.vue';
import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue';
import { useSongStore } from '~/stores/song'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '~/stores/user'
import Home from 'vue-material-design-icons/Home.vue'
import Search from 'vue-material-design-icons/Magnify.vue'
import Library from 'vue-material-design-icons/Library.vue'
import Plus from 'vue-material-design-icons/Plus.vue'
import Heart from 'vue-material-design-icons/Heart.vue'
import Download from 'vue-material-design-icons/Download.vue'

const useSong = useSongStore()
const { isPlaying, currentTrack } = storeToRefs(useSong)
const route = useRoute()
const userStore = useUserStore()
const router = useRouter()

onMounted(async () => {
  isPlaying.value = false
  userStore.loadToken()
  if (userStore.token && !userStore.profile) {
    await userStore.fetchProfile()
  }
})

let openMenu = ref(false)
const showProfile = ref(false)
const userEmail = ref('')

onMounted(() => {
  userEmail.value = localStorage.getItem('userEmail') || 'User'
})

function logout() {
  localStorage.removeItem('loggedIn')
  localStorage.removeItem('userEmail')
  showProfile.value = false
  router.push('/login')
}

const menuItems = [
    { name: 'Home', icon: Home, route: '/' },
    { name: 'Search', icon: Search, route: '/search' },
    { name: 'Your Library', icon: Library, route: '/library' }
]

const libraryItems = [
    { name: 'Create Playlist', icon: Plus, route: '/playlist' },
    { name: 'Liked Songs', icon: Heart, route: '/liked' }
]
</script>

<template>
    <div class="min-h-screen bg-black">
        <!-- Sidebar -->
        <div class="fixed top-0 left-0 w-[240px] h-full bg-[#121212] p-6 flex flex-col justify-between">
            <div>
                <!-- Logo -->
                <div class="mb-8">
                    <img src="/images/deezer_logo.png" alt="Deezer" class="h-10" />
                </div>
                <!-- Main Menu -->
                <div class="mb-8">
                    <div v-for="item in menuItems" :key="item.name" class="mb-4">
                        <NuxtLink :to="item.route" class="flex items-center text-gray-400 hover:text-white transition-colors">
                            <component :is="item.icon" :size="24" class="mr-4" />
                            <span class="text-sm font-medium">{{ item.name }}</span>
                        </NuxtLink>
                    </div>
                </div>
                <!-- Library Menu -->
                <div>
                    <div v-for="item in libraryItems" :key="item.name" class="mb-4">
                        <NuxtLink :to="item.route" class="flex items-center text-gray-400 hover:text-white transition-colors">
                            <component :is="item.icon" :size="24" class="mr-4" />
                            <span class="text-sm font-medium">{{ item.name }}</span>
                        </NuxtLink>
                    </div>
                </div>
            </div>
            <!-- Profile Icon at Bottom -->
            <div class="mb-28">
                <div class="relative flex flex-col items-center">
                    <img src="/avatar.png" alt="Profile" class="w-10 h-10 rounded-full cursor-pointer border-2 border-purple-500" @click="showProfile = !showProfile" />
                    <div v-if="showProfile" class="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-40 bg-[#23222a] rounded-lg shadow-lg p-2 flex flex-col items-center z-50" style="min-width: 140px;">
                        <div class="text-white font-semibold mb-2">{{ userEmail }}</div>
                        <button @click="logout" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Logout</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Main Content -->
        <div class="ml-[240px] min-h-screen bg-gradient-to-b from-[#1e1e1e] to-black relative">
            <slot />
        </div>
    </div>

    <MusicPlayer v-if="currentTrack"/>
</template>