<script setup>
import { ref } from 'vue'
import { useUserStore } from '~/stores/user'
import { useSongStore } from '~/stores/song'

const userStore = useUserStore()
const query = ref('')
const tab = ref('tracks')
const results = ref({ tracks: [], albums: [], artists: [], playlists: [] })
const loading = ref(false)
const useSong = useSongStore()

async function searchDeezer() {
  if (!query.value) return
  loading.value = true
  const base = 'https://api.deezer.com/search'
  const q = encodeURIComponent(query.value)
  const fetchJson = async (type) => {
    const url = `https://corsproxy.io/?${base}/${type}?q=${q}`
    const res = await fetch(url)
    const data = await res.json()
    return data.data || []
  }
  results.value.tracks = await fetchJson('track')
  results.value.albums = await fetchJson('album')
  results.value.artists = await fetchJson('artist')
  results.value.playlists = await fetchJson('playlist')
  loading.value = false
}

function playTrack(track) {
  useSong.loadSong(track)
}
</script>

<template>
  <div class="px-12 pt-10 pb-4">
    <h1 class="text-3xl font-extrabold text-white mb-6">Search</h1>
    <div class="flex mb-6">
      <input v-model="query" @keyup.enter="searchDeezer" type="text" placeholder="Search for artists, tracks, albums, playlists..." class="w-full px-6 py-3 rounded-full bg-[#23222a] text-white text-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
      <button @click="searchDeezer" class="ml-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-3 rounded-full text-lg font-bold shadow-lg hover:scale-105 transition-transform">Search</button>
    </div>
    <div class="flex space-x-6 mb-6">
      <button v-for="t in ['tracks','albums','artists','playlists']" :key="t" @click="tab = t" :class="[tab === t ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white' : 'bg-[#23222a] text-gray-300', 'px-6 py-2 rounded-full font-bold text-lg transition']">{{ t.charAt(0).toUpperCase() + t.slice(1) }}</button>
    </div>
    <div v-if="loading" class="text-white text-lg">Loading...</div>
    <div v-else>
      <div v-if="tab === 'tracks'">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div v-for="track in results.tracks" :key="track.id" class="bg-[#23222a] rounded-xl p-4 flex flex-col items-center hover:bg-[#2d2c33] cursor-pointer" @click="playTrack(track)">
            <img :src="track.album.cover_medium" class="w-28 h-28 rounded-lg mb-2 object-cover" />
            <div class="text-white font-semibold text-base text-center">{{ track.title }}</div>
            <div class="text-gray-400 text-xs text-center">{{ track.artist.name }}</div>
          </div>
        </div>
      </div>
      <div v-else-if="tab === 'albums'">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div v-for="album in results.albums" :key="album.id" class="bg-[#23222a] rounded-xl p-4 flex flex-col items-center hover:bg-[#2d2c33] cursor-pointer" @click="playTrack(track)">
            <img :src="album.cover_medium" class="w-28 h-28 rounded-lg mb-2 object-cover" />
            <div class="text-white font-semibold text-base text-center">{{ album.title }}</div>
            <div class="text-gray-400 text-xs text-center">{{ album.artist.name }}</div>
          </div>
        </div>
      </div>
      <div v-else-if="tab === 'artists'">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div v-for="artist in results.artists" :key="artist.id" class="bg-[#23222a] rounded-xl p-4 flex flex-col items-center hover:bg-[#2d2c33] cursor-pointer" @click="playTrack(track)">
            <img :src="artist.picture_medium" class="w-28 h-28 rounded-full mb-2 object-cover" />
            <div class="text-white font-semibold text-base text-center">{{ artist.name }}</div>
          </div>
        </div>
      </div>
      <div v-else-if="tab === 'playlists'">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div v-for="playlist in results.playlists" :key="playlist.id" class="bg-[#23222a] rounded-xl p-4 flex flex-col items-center hover:bg-[#2d2c33] cursor-pointer" @click="playTrack(track)">
            <img :src="playlist.picture_medium" class="w-28 h-28 rounded-lg mb-2 object-cover" />
            <div class="text-white font-semibold text-base text-center">{{ playlist.title }}</div>
            <div class="text-gray-400 text-xs text-center">By {{ playlist.user.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>