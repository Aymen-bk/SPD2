<template>
  <div class="card mb-3">
    <div class="card-body">
      <h5 class="card-title">{{ post.title }}</h5>
      <p class="card-text">{{ snippet }}</p>
      <div class="mb-2">
        <span v-for="tag in post.tags" :key="tag" 
              class="badge bg-secondary me-1" 
              style="cursor: pointer"
              @click="$emit('tag-clicked', tag)">
          {{ tag }}
        </span>
      </div>
      <router-link :to="'/post/' + post.id" class="btn btn-primary">Read More</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SinglePost',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    snippet() {
      return this.post.body.substring(0, 50) + '...'
    }
  }
}
</script>

<style scoped>
.card {
  transition: transform 0.2s;
}
.card:hover {
  transform: translateY(-2px);
}
</style> 