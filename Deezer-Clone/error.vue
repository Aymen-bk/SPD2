<script setup>
const props = defineProps({
  error: Object
})

const handleError = () => {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen text-white bg-black">
    <h1 class="text-4xl mb-4">Oops! Something went wrong</h1>
    <p class="text-xl mb-8">{{ error.message }}</p>
    <button 
      @click="handleError" 
      class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
    >
      Back to Home
    </button>
  </div>
</template>