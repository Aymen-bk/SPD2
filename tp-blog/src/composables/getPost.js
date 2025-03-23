import { getPosts } from './getPosts'

export async function getPost(id) {
  const posts = await getPosts()
  const post = posts.find(p => p.id === parseInt(id))
  
  if (!post) {
    throw new Error(`Post with id ${id} not found`)
  }
  
  return post
} 