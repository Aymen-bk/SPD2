<template>
  <div class="home">
    <h1>Welcome to Job Finder</h1>
    <div class="welcome-content">
      <p class="welcome-text">Your one-stop platform for managing job listings. Add, edit, or browse through available positions with ease.</p>
      <button @click="goToJobs" class="cta-button">View All Jobs</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToJobs() {
      this.$router.push({ name: 'Jobs' })
    }
  }
}
</script>

<style>
.home {
  padding: 20px;
  text-align: center;
}

.welcome-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.logo {
  max-width: 200px;
  margin-bottom: 30px;
}

h1 {
  color: #2c3e50;
  font-size: 2.5em;
  margin-bottom: 20px;
}

.welcome-text {
  font-size: 1.2em;
  line-height: 1.6;
  color: #666;
  margin-bottom: 40px;
}

.cta-button {
  background: crimson;
  color: white;
  font-size: 1.2em;
  padding: 15px 40px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s, background 0.2s;
}

.cta-button:hover {
  background: #a51329;
  transform: translateY(-2px);
}

.cta-button:active {
  transform: translateY(0);
}
</style>
