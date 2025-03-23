<template>
  <div class="create-post container">
    <h2 class="mb-4">Create New Post</h2>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="title"
          required
        >
      </div>
      
      <div class="mb-3">
        <label for="body" class="form-label">Content</label>
        <textarea
          class="form-control"
          id="body"
          rows="10"
          v-model="body"
          required
        ></textarea>
      </div>
      
      <div class="mb-3">
        <label for="tags" class="form-label">Tags (comma separated)</label>
        <input
          type="text"
          class="form-control"
          id="tags"
          v-model="tagsInput"
          placeholder="tech, programming, vue"
        >
      </div>
      
      <button type="submit" class="btn btn-primary">Create Post</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { createPost } from '@/services/api'
import { useRouter } from 'vue-router'

export default {
  name: 'CreatePostView',
  setup() {
    const router = useRouter()
    const title = ref('')
    const body = ref('')
    const tagsInput = ref('')

    const handleSubmit = async () => {
      const tags = tagsInput.value
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)
      
      const post = {
        title: title.value,
        body: body.value,
        tags,
        createdAt: new Date().toISOString()
      }

      try {
        await createPost(post)
        router.push('/')
      } catch (error) {
        console.error('Error creating post:', error)
      }
    }

    return {
      title,
      body,
      tagsInput,
      handleSubmit
    }
  }
}
</script>

<style scoped>
.create-post {
  max-width: 800px;
}
</style> 