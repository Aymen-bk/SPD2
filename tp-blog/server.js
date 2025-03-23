const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const POSTS_FILE = path.join(__dirname, 'src/data/posts.json');

// Get all posts
app.get('/api/posts', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
    res.json(data.posts);
  } catch (error) {
    res.status(500).json({ error: 'Error reading posts' });
  }
});

// Get single post
app.get('/api/posts/:id', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
    const post = data.posts.find(p => p.id === parseInt(req.params.id));
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error reading post' });
  }
});

// Create new post
app.post('/api/posts', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
    const newPost = {
      ...req.body,
      id: data.posts.length > 0 ? Math.max(...data.posts.map(p => p.id)) + 1 : 1
    };
    data.posts.push(newPost);
    fs.writeFileSync(POSTS_FILE, JSON.stringify(data, null, 2));
    res.json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Error creating post' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 