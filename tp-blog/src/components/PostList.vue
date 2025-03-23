<template>
  <div class="post-list">
    <div v-if="posts.length === 0" class="text-center">
      <p>No posts found.</p>
    </div>
    <SinglePost
      v-for="post in posts"
      :key="post.id"
      :post="post"
      @tag-clicked="$emit('tag-clicked', $event)"
    />
  </div>
</template>

<script>
import SinglePost from './SinglePost.vue'

export default {
  name: 'PostList',
  components: {
    SinglePost
  },
  props: {
    posts: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.post-list {
  max-width: 800px;
  margin: 0 auto;
}
</style> 