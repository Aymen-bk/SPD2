<script setup>
import { useHead } from '#imports'
import { useSongStore } from '~/stores/song'
import { storeToRefs } from 'pinia'
import Play from 'vue-material-design-icons/Play.vue'
import Pause from 'vue-material-design-icons/Pause.vue'

const useSong = useSongStore()
const { likedTracks, isPlaying, currentTrack } = storeToRefs(useSong)

function playTrack(track) {
  useSong.loadSong(track)
}

useHead({
  title: 'Liked Songs - Spotify Clone',
  meta: [
    { name: 'description', content: 'View your liked songs in your Spotify clone.' }
  ]
})
</script>

<template>
  <div class="p-8">
    <h2 class="text-2xl font-bold text-white mb-6">Liked Songs</h2>
    <div v-if="likedTracks.length === 0" class="text-gray-400">No liked songs yet.</div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="track in likedTracks" :key="track.id" class="bg-[#282828] p-4 rounded-lg flex items-center">
        <img :src="track.album?.cover_medium || track.cover_medium" class="w-16 h-16 rounded" />
        <div class="ml-4 flex-1">
          <h3 class="text-white font-semibold">{{ track.title }}</h3>
          <p class="text-gray-400 text-sm">{{ track.artist?.name || track.artist }}</p>
        </div>
        <button @click="playTrack(track)" class="p-2 text-white hover:text-green-500">
          <Play v-if="!isPlaying || currentTrack?.id !== track.id" :size="24" />
          <Pause v-else :size="24" />
        </button>
      </div>
    </div>
  </div>
</template> 