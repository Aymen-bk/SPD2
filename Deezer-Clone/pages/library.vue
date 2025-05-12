<script setup>
import { ref, onMounted, computed } from 'vue'
import { useDeezerService } from '~/services/deezer'
import { useSongStore } from '~/stores/song'
import Play from 'vue-material-design-icons/Play.vue'
import Pause from 'vue-material-design-icons/Pause.vue'
import { storeToRefs } from 'pinia'
import DotsHorizontal from 'vue-material-design-icons/DotsHorizontal.vue'
import Heart from 'vue-material-design-icons/Heart.vue'
import ClockTimeThreeOutline from 'vue-material-design-icons/ClockTimeThreeOutline.vue'

const DEMO_ALBUMS = [
  {
    id: 1,
    title: 'Chill Vibes',
    cover_medium: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=facearea&w=400&h=400',
    artist: { name: 'Lo-Fi Collective' },
    release_date: '2023-08-01',
    tracks: [
      { id: 101, title: 'Dreaming Away', duration: 180, preview: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
      { id: 102, title: 'Night Walk', duration: 200, preview: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
      { id: 103, title: 'Sunset Drive', duration: 210, preview: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' }
    ]
  },
  {
    id: 2,
    title: 'Jazz Essentials',
    cover_medium: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&h=400',
    artist: { name: 'Jazz Masters' },
    release_date: '2022-05-15',
    tracks: [
      { id: 201, title: 'Blue Skies', duration: 195, preview: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
      { id: 202, title: 'Late Night', duration: 185, preview: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
      { id: 203, title: 'Smooth Ride', duration: 205, preview: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' }
    ]
  },
  {
    id: 3,
    title: 'Indie Pop Hits',
    cover_medium: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&h=400',
    artist: { name: 'Indie Stars' },
    release_date: '2024-02-10',
    tracks: [
      { id: 301, title: 'Shine On', duration: 175, preview: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' },
      { id: 302, title: 'New Beginnings', duration: 190, preview: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
      { id: 303, title: 'Summer Nights', duration: 200, preview: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3' }
    ]
  }
]

const useSong = useSongStore()
const { isPlaying, currentTrack } = storeToRefs(useSong)
const deezerService = useDeezerService()

const albums = ref([])
const selectedAlbum = ref(null)
const tracks = ref([])
const isLoading = ref(false)
const isDemo = ref(false)
const userEmail = ref('')
const username = computed(() => userEmail.value.split('@')[0])

onMounted(() => {
  userEmail.value = localStorage.getItem('userEmail') || ''
})

onMounted(async () => {
  isLoading.value = true
  try {
    // Get chart albums as a demo (Deezer API does not provide a direct albums endpoint for browsing)
    const chart = await deezerService.getChart()
    albums.value = chart.albums.data
    if (albums.value.length > 0) {
      await selectAlbum(albums.value[0])
    } else {
      throw new Error('No albums from API')
    }
  } catch (e) {
    // Fallback to demo data
    albums.value = DEMO_ALBUMS
    isDemo.value = true
    await selectAlbum(DEMO_ALBUMS[0])
  } finally {
    isLoading.value = false
  }
})

async function selectAlbum(album) {
  selectedAlbum.value = album
  isLoading.value = true
  try {
    if (isDemo.value) {
      tracks.value = album.tracks
    } else {
      const albumData = await deezerService.getAlbum(album.id)
      tracks.value = albumData.tracks.data
    }
  } catch (e) {
    tracks.value = []
  } finally {
    isLoading.value = false
  }
}

function playTrack(track) {
  useSong.loadSong(track)
}
</script>

<template>
  <div class="p-8">
    <h2 class="text-2xl font-bold text-white mb-6">Your Library</h2>
    <div class="text-gray-400 mb-4 text-lg">Recommended for {{ username }}</div>
    <div v-if="isLoading" class="text-white">Loading...</div>
    <div v-else>
      <div class="flex flex-wrap gap-6 mb-10">
        <div
          v-for="album in albums"
          :key="album.id"
          class="flex flex-col items-center cursor-pointer group"
          @click="selectAlbum(album)"
        >
          <img :src="album.cover_medium" class="w-32 h-32 rounded-full shadow-lg border-4 border-[#23222a] group-hover:border-green-500 transition-all" />
          <span class="text-white mt-2 text-sm font-semibold group-hover:text-green-500">{{ album.title }}</span>
        </div>
      </div>
      <div v-if="selectedAlbum">
        <h3 class="text-xl text-white font-semibold mb-4">{{ selectedAlbum.title }}</h3>
        <div class="flex items-center mb-4">
          <img :src="selectedAlbum.cover_medium" class="w-20 h-20 rounded shadow-lg mr-4" />
          <div>
            <div class="text-white font-bold">{{ selectedAlbum.artist.name }}</div>
            <div class="text-gray-400 text-sm">Released: {{ selectedAlbum.release_date }}</div>
          </div>
        </div>
        <div v-if="tracks.length > 0">
          <table class="w-full text-left text-white">
            <thead>
              <tr class="border-b border-gray-700">
                <th class="py-2">#</th>
                <th>Title</th>
                <th>Duration</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(track, idx) in tracks" :key="track.id" class="hover:bg-[#23222a]">
                <td class="py-2 px-2">{{ idx + 1 }}</td>
                <td class="py-2 px-2">{{ track.title }}</td>
                <td class="py-2 px-2">{{ Math.floor(track.duration / 60) }}:{{ (track.duration % 60).toString().padStart(2, '0') }}</td>
                <td class="py-2 px-2">
                  <button @click="playTrack(track)" class="bg-green-500 hover:bg-green-600 text-black rounded-full p-2">
                    <Play v-if="!isPlaying || currentTrack?.id !== track.id" :size="20" />
                    <Pause v-else :size="20" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="text-gray-400">No tracks found for this album.</div>
      </div>
      <div v-else class="text-gray-400">No albums found in your library.</div>
    </div>
  </div>
</template>

<style scoped>
    .circle {
        width: 4px;
        height: 4px;
        background-color: rgb(189, 189, 189);
        border-radius: 100%;
    }
</style>