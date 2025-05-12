<script setup>
import { ref, onMounted } from 'vue'
import { useDeezerService } from '~/services/deezer'
import { useSongStore } from '~/stores/song'

const useSong = useSongStore()
const deezerService = useDeezerService()
const searchQuery = ref('')
const searchResults = ref([])
const trendingTracks = ref([])
const isLoading = ref(false)

onMounted(async () => {
    try {
        const chart = await deezerService.getChart()
        trendingTracks.value = chart.tracks.data
    } catch (error) {
        console.error('Error loading trending tracks:', error)
    }
})

async function handleSearch() {
    if (!searchQuery.value.trim()) return

    isLoading.value = true
    try {
        const results = await deezerService.searchTracks(searchQuery.value)
        searchResults.value = results.data
    } catch (error) {
        console.error('Error searching tracks:', error)
    } finally {
        isLoading.value = false
    }
}

function playTrack(track) {
    useSong.loadSong(track)
}

function addToQueue(track) {
    useSong.addToQueue(track)
}
</script>

<template>
    <div class="p-8">
        <!-- Search Bar -->
        <div class="mb-8">
            <div class="relative">
                <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search for songs, artists, or albums..."
                    class="w-full p-4 bg-[#282828] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    @keyup.enter="handleSearch"
                />
                <button
                    @click="handleSearch"
                    class="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-green-500"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            </div>
        </div>

        <!-- Search Results -->
        <div v-if="searchResults.length > 0" class="mb-8">
            <h2 class="text-2xl font-bold text-white mb-4">Search Results</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div
                    v-for="track in searchResults"
                    :key="track.id"
                    class="bg-[#282828] p-4 rounded-lg hover:bg-[#383838] transition-colors"
                >
                    <div class="flex items-center">
                        <img :src="track.album.cover_medium" class="w-16 h-16 rounded" />
                        <div class="ml-4 flex-1">
                            <h3 class="text-white font-semibold">{{ track.title }}</h3>
                            <p class="text-gray-400 text-sm">{{ track.artist.name }}</p>
                        </div>
                        <div class="flex space-x-2">
                            <button
                                @click="playTrack(track)"
                                class="p-2 text-white hover:text-green-500"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                            <button
                                @click="addToQueue(track)"
                                class="p-2 text-white hover:text-green-500"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Trending Tracks -->
        <div>
            <h2 class="text-2xl font-bold text-white mb-4">Trending Now</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div
                    v-for="track in trendingTracks"
                    :key="track.id"
                    class="bg-[#282828] p-4 rounded-lg hover:bg-[#383838] transition-colors"
                >
                    <div class="flex items-center">
                        <img :src="track.album.cover_medium" class="w-16 h-16 rounded" />
                        <div class="ml-4 flex-1">
                            <h3 class="text-white font-semibold">{{ track.title }}</h3>
                            <p class="text-gray-400 text-sm">{{ track.artist.name }}</p>
                        </div>
                        <div class="flex space-x-2">
                            <button
                                @click="playTrack(track)"
                                class="p-2 text-white hover:text-green-500"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                            <button
                                @click="addToQueue(track)"
                                class="p-2 text-white hover:text-green-500"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
    </div>
</template>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>