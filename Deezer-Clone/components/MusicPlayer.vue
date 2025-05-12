<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import MusicPlayerVolume from '~/components/MusicPlayerVolume.vue'
import Heart from 'vue-material-design-icons/Heart.vue'
import HeartOutline from 'vue-material-design-icons/HeartOutline.vue'
import PictureInPictureBottomRight from 'vue-material-design-icons/PictureInPictureBottomRight.vue'
import Play from 'vue-material-design-icons/Play.vue'
import Pause from 'vue-material-design-icons/Pause.vue'
import SkipBackward from 'vue-material-design-icons/SkipBackward.vue'
import SkipForward from 'vue-material-design-icons/SkipForward.vue'
import Repeat from 'vue-material-design-icons/Repeat.vue'
import RepeatOnce from 'vue-material-design-icons/RepeatOnce.vue'
import Shuffle from 'vue-material-design-icons/Shuffle.vue'
import QueueFirstInLastOut from 'vue-material-design-icons/QueueFirstInLastOut.vue'
import PlaylistPlus from 'vue-material-design-icons/PlaylistPlus.vue'
import PlaylistCheck from 'vue-material-design-icons/PlaylistCheck.vue'

import { useSongStore } from '~/stores/song'
const useSong = useSongStore()
const { isPlaying, audio, currentTrack, currentArtist, repeat, shuffle, queue } = storeToRefs(useSong)

let isHover = ref(false)
let isTrackTimeCurrent = ref(null)
let isTrackTimeTotal = ref(null)
let seeker = ref(null)
let seekerContainer = ref(null)
let range = ref(0)
let showQueue = ref(false)
let showPlaylistDialog = ref(false)
let newPlaylistName = ref('')
let selectedPlaylist = ref('')

const progress = ref(0)

onMounted(() => {
    if (audio.value) {
        setTimeout(() => {
            timeupdate()
            loadmetadata()
        }, 300)
    }

    if (currentTrack.value) { 
        seeker.value.addEventListener("input", function () {
            const time = audio.value.duration * (seeker.value.value / 100);
            audio.value.currentTime = time;
        });

        seekerContainer.value.addEventListener("click", function (e) {
            const rect = seekerContainer.value.getBoundingClientRect();
            const clickPosition = (e.clientX - rect.left) / rect.width;
            const time = audio.value.duration * clickPosition;
            audio.value.currentTime = time;
            seeker.value.value = clickPosition * 100;
        });
    }
})

const timeupdate = () => {
    audio.value.addEventListener("timeupdate", function () {
        if (!audio.value.duration) return;
        
        var minutes = Math.floor(audio.value.currentTime / 60);
        var seconds = Math.floor(audio.value.currentTime - minutes * 60);
        isTrackTimeCurrent.value = minutes+':'+seconds.toString().padStart(2, '0')
        
        const value = (audio.value.currentTime / audio.value.duration) * 100;
        range.value = value;
        if (seeker.value) {
            seeker.value.value = value;
        }
    });
}

const loadmetadata = () => {
    audio.value.addEventListener('loadedmetadata', function() {
        const duration = audio.value.duration;
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        isTrackTimeTotal.value = minutes+':'+seconds.toString().padStart(2, '0')
    });
}

watch(() => audio.value, () => {
    timeupdate()
    loadmetadata()
})

watch(() => isTrackTimeCurrent.value, (time) => {
    if (time && time == isTrackTimeTotal.value) {
        if (repeat.value === 'one') {
            audio.value.currentTime = 0;
            audio.value.play();
        } else if (repeat.value === 'all' && queue.value.length > 0) {
            useSong.nextSong();
        } else if (queue.value.length > 0) {
            useSong.nextSong();
        }
    }
})

function togglePlay() {
    if (!audio.value) return;
    if (isPlaying.value) {
        audio.value.pause();
        isPlaying.value = false;
    } else {
        audio.value.play().catch(error => {
            console.error('Error playing audio:', error);
            isPlaying.value = false;
        });
        isPlaying.value = true;
    }
}

function updateProgress() {
    if (audio.value && audio.value.duration) {
        progress.value = (audio.value.currentTime / audio.value.duration) * 100
    }
}

if (audio.value) {
    audio.value.ontimeupdate = updateProgress
}

function toggleLike() {
    if (currentTrack.value) useSong.toggleLike(currentTrack.value)
}

function togglePlaylist() {
    if (currentTrack.value) {
        showPlaylistDialog.value = true
    }
}

function confirmAddToPlaylist() {
    if (selectedPlaylist.value) {
        useSong.addTrackToPlaylist(selectedPlaylist.value, currentTrack.value)
        showPlaylistDialog.value = false
        selectedPlaylist.value = ''
        newPlaylistName.value = ''
    } else if (newPlaylistName.value.trim()) {
        useSong.createPlaylist(newPlaylistName.value.trim())
        useSong.addTrackToPlaylist(newPlaylistName.value.trim(), currentTrack.value)
        showPlaylistDialog.value = false
        selectedPlaylist.value = ''
        newPlaylistName.value = ''
    }
}
</script>

<template>
    <div
        id="MusicPlayer"
        v-if="currentTrack"
        class="
            fixed
            flex
            items-center
            justify-between
            bottom-0
            w-full
            z-50
            h-[90px]
            bg-[#181818]
            border-t
            border-t-[#272727]
        "
    >
        <div class="flex items-center w-1/4">
            <div class="flex items-center ml-4">
                <img class="rounded-sm shadow-2xl" width="55" :src="currentTrack.album.cover_medium">
                <div class="ml-4">
                    <div class="text-[14px] text-white hover:underline cursor-pointer">
                        {{ currentTrack.title }}
                    </div>
                    <div class="text-[11px] text-gray-500 hover:underline hover:text-white cursor-pointer">
                        {{ currentTrack.artist.name }}
                    </div>
                </div>
            </div>
            <div class="flex items-center ml-8">
                <button @click="toggleLike">
                    <Heart v-if="useSong.isLiked(currentTrack)" fillColor="#1BD760" :size="20" />
                    <HeartOutline v-else fillColor="#FFFFFF" :size="20" />
                </button>
                <button class="ml-4" @click="togglePlaylist">
                    <PlaylistCheck v-if="useSong.isInPlaylist(currentTrack)" fillColor="#1BD760" :size="20" />
                    <PlaylistPlus v-else fillColor="#FFFFFF" :size="20" />
                </button>
                <PictureInPictureBottomRight class="ml-4" fillColor="#FFFFFF" :size="18" />
            </div>
        </div>

        <div class="max-w-[35%] mx-auto w-2/4 mb-3">
            <div class="flex-col items-center justify-center">
                <div class="buttons flex items-center justify-center h-[30px]">
                    <button class="mx-2" @click="useSong.toggleShuffle">
                        <Shuffle :fillColor="shuffle ? '#1BD760' : '#FFFFFF'" :size="25" />
                    </button>
                    <button class="mx-2">
                        <SkipBackward fillColor="#FFFFFF" :size="25" @click="useSong.prevSong"/>
                    </button>
                    <button class="p-1 rounded-full mx-3 bg-white" @click="togglePlay">
                        <Play v-if="!isPlaying" fillColor="#181818" :size="25" />
                        <Pause v-else fillColor="#181818" :size="25" />
                    </button>
                    <button class="mx-2">
                        <SkipForward fillColor="#FFFFFF" :size="25" @click="useSong.nextSong"/>
                    </button>
                    <button class="mx-2" @click="useSong.toggleRepeat">
                        <Repeat v-if="repeat === 'none'" fillColor="#FFFFFF" :size="25" />
                        <RepeatOnce v-else-if="repeat === 'one'" fillColor="#1BD760" :size="25" />
                        <Repeat v-else fillColor="#1BD760" :size="25" />
                    </button>
                </div>

                <div class="flex items-center h-[25px]">
                    <div v-if="isTrackTimeCurrent" class="text-white text-[12px] pr-2 pt-[11px]">{{ isTrackTimeCurrent }}</div>
                    <div
                        ref="seekerContainer"
                        class="w-full relative mt-2 mb-3"
                        @mouseenter="isHover = true"
                        @mouseleave="isHover = false"
                    >
                        <input
                            v-model="range"
                            ref="seeker"
                            type="range"
                            class="
                                absolute
                                rounded-full
                                my-2
                                w-full
                                h-0
                                z-40
                                appearance-none
                                bg-opacity-100
                                focus:outline-none
                                accent-white
                            "
                            :class="{ 'rangeDotHidden': !isHover }"
                        >
                        <div
                            class="pointer-events-none mt-[6px] absolute h-[4px] z-10 inset-y-0 left-0 w-0"
                            :style="`width: ${range}%;`"
                            :class="isHover ? 'bg-green-500' : 'bg-white'"
                        />
                        <div class="absolute h-[4px] z-[-0] mt-[6px] inset-y-0 left-0 w-full bg-gray-500 rounded-full" />
                    </div>
                    <div v-if="isTrackTimeTotal" class="text-white text-[12px] pl-2 pt-[11px]">{{ isTrackTimeTotal }}</div>
                </div>
            </div>
        </div>

        <div class="flex items-center w-1/4 justify-end pr-10">
            <button class="mr-4" @click="showQueue = !showQueue">
                <QueueFirstInLastOut fillColor="#FFFFFF" :size="25" />
            </button>
            <MusicPlayerVolume />
        </div>

        <!-- Queue Sidebar -->
        <div v-if="showQueue" class="fixed right-0 bottom-[90px] w-[400px] h-[calc(100vh-90px)] bg-[#181818] border-l border-[#272727] overflow-y-auto z-50">
            <div class="p-4">
                <h2 class="text-white text-xl mb-4">Queue</h2>
                <div v-if="queue.length === 0" class="text-gray-500">No tracks in queue</div>
                <div v-for="track in queue" :key="track.id" class="flex items-center p-2 hover:bg-[#272727] rounded cursor-pointer" @click="useSong.loadSong(track)">
                    <img :src="track.album?.cover_small || track.cover_small" class="w-10 h-10 rounded" />
                    <div class="ml-3">
                        <div class="text-white text-sm">{{ track.title }}</div>
                        <div class="text-gray-500 text-xs">{{ track.artist?.name || track.artist }}</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Add this after the player bar -->
        <div v-if="showPlaylistDialog" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div class="bg-[#23222a] p-6 rounded-lg w-[350px]">
                <h3 class="text-white text-lg mb-4">Add to Playlist</h3>
                <div v-if="useSong.playlists.length > 0" class="mb-4">
                    <label class="text-gray-300 mb-2 block">Choose a playlist:</label>
                    <select v-model="selectedPlaylist" class="w-full p-2 rounded bg-[#181818] text-white">
                        <option value="" disabled>Select a playlist</option>
                        <option v-for="p in useSong.playlists" :key="p.name" :value="p.name">{{ p.name }}</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label class="text-gray-300 mb-2 block">Or create a new playlist:</label>
                    <input v-model="newPlaylistName" type="text" placeholder="New playlist name" class="w-full p-2 rounded bg-[#181818] text-white" />
                </div>
                <div class="flex justify-end gap-2">
                    <button @click="showPlaylistDialog = false" class="px-4 py-2 rounded bg-gray-500 text-white">Cancel</button>
                    <button @click="confirmAddToPlaylist" class="px-4 py-2 rounded bg-green-500 text-black">Add</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.rangeDotHidden[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 0;
    height: 0;
}
</style>