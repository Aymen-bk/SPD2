<script setup>
import { ref } from 'vue'
import { useSongStore } from '~/stores/song'
import { storeToRefs } from 'pinia'
import Play from 'vue-material-design-icons/Play.vue'
import Pause from 'vue-material-design-icons/Pause.vue'

const useSong = useSongStore()
const { playlists, isPlaying, currentTrack } = storeToRefs(useSong)

const newPlaylistName = ref('')

function createPlaylist() {
  if (newPlaylistName.value.trim()) {
    useSong.createPlaylist(newPlaylistName.value.trim())
    newPlaylistName.value = ''
  }
}

function playTrack(track) {
  useSong.loadSong(track)
}
</script>

<template>
  <div class="p-8">
    <h2 class="text-2xl font-bold text-white mb-6">Your Playlists</h2>
    <form @submit.prevent="createPlaylist" class="mb-6 flex gap-4">
      <input v-model="newPlaylistName" type="text" placeholder="New playlist name" class="px-4 py-2 rounded bg-[#23222a] text-white" />
      <button type="submit" class="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded">Create</button>
    </form>
    <div v-if="playlists.length === 0" class="text-gray-400">No playlists yet. Create one above!</div>
    <div v-else>
      <div v-for="playlist in playlists" :key="playlist.name" class="mb-8">
        <h3 class="text-xl text-white font-semibold mb-2">{{ playlist.name }}</h3>
        <div v-if="playlist.tracks.length === 0" class="text-gray-400 mb-4">No songs in this playlist yet.</div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="track in playlist.tracks" :key="track.id" class="bg-[#282828] p-4 rounded-lg flex items-center">
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
    </div>
  </div>
</template> 