import { ref, onMounted, onUnmounted } from 'vue'
import fs from 'fs'
import path from 'path'

const JSON_FILE_PATH = path.join(process.cwd(), 'src/data/posts.json')

export function useJsonStorage() {
  const posts = ref([])
  let watcher = null

  const readJsonFile = () => {
    try {
      const data = JSON.parse(fs.readFileSync(JSON_FILE_PATH, 'utf8'))
      posts.value = data.posts
    } catch (error) {
      console.error('Error reading JSON file:', error)
      posts.value = []
    }
  }

  const writeJsonFile = (newPosts) => {
    try {
      fs.writeFileSync(JSON_FILE_PATH, JSON.stringify({ posts: newPosts }, null, 2))
      posts.value = newPosts
    } catch (error) {
      console.error('Error writing to JSON file:', error)
    }
  }

  const addPost = (post) => {
    const newPost = {
      ...post,
      id: posts.value.length > 0 ? Math.max(...posts.value.map(p => p.id)) + 1 : 1
    }
    const newPosts = [...posts.value, newPost]
    writeJsonFile(newPosts)
    return newPost
  }

  const getPost = (id) => {
    return posts.value.find(p => p.id === parseInt(id))
  }

  const setupFileWatcher = () => {
    watcher = fs.watch(JSON_FILE_PATH, (eventType) => {
      if (eventType === 'change') {
        readJsonFile()
      }
    })
  }

  onMounted(() => {
    readJsonFile()
    setupFileWatcher()
  })

  onUnmounted(() => {
    if (watcher) {
      watcher.close()
    }
  })

  return {
    posts,
    addPost,
    getPost
  }
} 