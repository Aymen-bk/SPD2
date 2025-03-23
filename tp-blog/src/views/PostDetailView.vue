<template>
  <div class="post-detail container" v-if="post">
    <div class="card">
      <div class="card-body">
        <h1 class="card-title">{{ post.title }}</h1>
        <div class="mb-3">
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="badge bg-secondary me-1"
            style="cursor: pointer"
            @click="router.push(`/?tag=${tag}`)"
          >
            {{ tag }}
          </span>
        </div>
        <p class="text-muted">
          Posted on {{ new Date(post.createdAt).toLocaleDateString() }}
        </p>
        <div class="card-text">{{ post.body }}</div>
      </div>
    </div>
  </div>
  <div v-else class="container text-center">
    <p>Loading...</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getPost } from '@/services/api'

export default {
  name: 'PostDetailView',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const post = ref(null)

    onMounted(async () => {
      const id = route.params.id
      try {
        post.value = await getPost(id)
      } catch (error) {
        console.error('Error fetching post:', error)
        router.push('/')
      }
    })

    return { post, router }
  }
}
</script>

<style scoped>
.post-detail {
  max-width: 800px;
}

.card-text {
  white-space: pre-wrap;
}
</style> 