<template>
  <div class="tag-cloud">
    <h4>Tags</h4>
    <div class="tags">
      <span
        v-for="tag in tags"
        :key="tag"
        class="badge bg-secondary me-1 mb-1"
        :class="{ 'bg-primary': selectedTag === tag }"
        style="cursor: pointer"
        @click="$emit('tag-selected', tag === selectedTag ? null : tag)"
      >
        {{ tag }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TagCloud',
  props: {
    tags: {
      type: Array,
      required: true
    },
    selectedTag: {
      type: String,
      default: null
    }
  }
}
</script>

<style scoped>
.tag-cloud {
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.badge {
  transition: all 0.2s;
}

.badge:hover {
  opacity: 0.8;
}
</style> 