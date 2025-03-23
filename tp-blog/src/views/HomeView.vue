<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div class="col-md-9">
          <PostList 
            :posts="filteredPosts"
            @tag-clicked="handleTagSelect"
          />
        </div>
        <div class="col-md-3">
          <TagCloud 
            :tags="allTags"
            :selectedTag="selectedTag"
            @tag-selected="handleTagSelect"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostList from '@/components/PostList.vue'
import TagCloud from '@/components/TagCloud.vue'
import { ref, computed, onMounted } from 'vue'
import { getPosts } from '@/services/api'

export default {
  name: 'HomeView',
  components: {
    PostList,
    TagCloud
  },
  setup() {
    const posts = ref([])
    const selectedTag = ref(null)

    const filteredPosts = computed(() => {
      if (!selectedTag.value) return posts.value
      return posts.value.filter(post => post.tags.includes(selectedTag.value))
    })

    const allTags = computed(() => {
      const tags = new Set()
      posts.value.forEach(post => {
        post.tags.forEach(tag => tags.add(tag))
      })
      return Array.from(tags)
    })

    const handleTagSelect = (tag) => {
      selectedTag.value = tag
    }

    onMounted(async () => {
      try {
        posts.value = await getPosts()
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    })

    return {
      posts,
      selectedTag,
      filteredPosts,
      allTags,
      handleTagSelect
    }
  }
}
</script> 