// Simulated database
let posts = [
  {
    id: 1,
    title: 'Getting Started with Vue.js',
    body: 'Vue.js is a progressive JavaScript framework that makes building user interfaces a breeze...',
    tags: ['vue', 'javascript', 'frontend'],
    createdAt: '2024-03-23T12:00:00.000Z'
  },
  {
    id: 2,
    title: 'Understanding Vue Components',
    body: 'Components are one of the most powerful features of Vue.js. They help you build reusable pieces of UI...',
    tags: ['vue', 'components'],
    createdAt: '2024-03-23T13:00:00.000Z'
  }
]

export function getPosts() {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...posts])
    }, 100)
  })
}

export function createPost(post) {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const newPost = {
        ...post,
        id: posts.length + 1
      }
      posts.push(newPost)
      resolve(newPost)
    }, 100)
  })
} 