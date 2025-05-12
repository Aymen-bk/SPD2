<script setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import VolumeHigh from 'vue-material-design-icons/VolumeHigh.vue'
import VolumeMute from 'vue-material-design-icons/VolumeMute.vue'

import { useSongStore } from '~/stores/song'
const useSong = useSongStore()
const { volume } = storeToRefs(useSong)

const volumeSlider = ref(null)
const isHover = ref(false)
const previousVolume = ref(volume.value)

function toggleMute() {
    if (volume.value > 0) {
        previousVolume.value = volume.value
        useSong.setVolume(0)
    } else {
        useSong.setVolume(previousVolume.value)
    }
}

function handleVolumeChange(e) {
    const value = e.target.value
    useSong.setVolume(value / 100)
}

watch(() => volume.value, (newVolume) => {
    if (volumeSlider.value) {
        volumeSlider.value.value = newVolume * 100
    }
})
</script>

<template>
    <div class="flex items-center">
        <button @click="toggleMute" class="text-white hover:text-green-500">
            <VolumeHigh v-if="volume > 0" :size="25" />
            <VolumeMute v-else :size="25" />
        </button>
        <div
            class="relative w-[100px] ml-2"
            @mouseenter="isHover = true"
            @mouseleave="isHover = false"
        >
            <input
                ref="volumeSlider"
                type="range"
                min="0"
                max="100"
                :value="volume * 100"
                @input="handleVolumeChange"
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
                :style="`width: ${volume * 100}%;`"
                :class="isHover ? 'bg-green-500' : 'bg-white'"
            />
            <div class="absolute h-[4px] z-[-0] mt-[6px] inset-y-0 left-0 w-full bg-gray-500 rounded-full" />
        </div>
    </div>
</template>

<style scoped>
.rangeDotHidden[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 0;
    height: 0;
}
</style>