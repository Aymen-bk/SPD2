<template>
  <div class="edit-job" v-if="job">
    <h1>Edit Job</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>Job Title:</label>
        <input type="text" v-model="job.title" required>
      </div>

      <div class="form-group">
        <label>Job Description:</label>
        <textarea v-model="job.description" required></textarea>
      </div>

      <div class="actions">
        <button type="submit" class="save-btn">Save Changes</button>
        <button type="button" @click="cancel" class="cancel-btn">Cancel</button>
      </div>
    </form>
  </div>
  <div v-else>Loading job...</div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      job: null
    }
  },
  methods: {
    handleSubmit() {
      fetch(`http://localhost:3000/jobs/${this.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.job)
      })
      .then(() => {
        this.$router.push({ name: 'Jobs' })
      })
      .catch(err => console.log(err))
    },
    cancel() {
      this.$router.push({ name: 'Jobs' })
    }
  },
  mounted() {
    // Fetch the existing job data
    fetch(`http://localhost:3000/jobs/${this.id}`)
      .then(resp => resp.json())
      .then(data => this.job = data)
      .catch(err => console.log(err))
  }
}
</script>

<style>
.edit-job {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input, textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 5px;
}

textarea {
  height: 100px;
}

.actions {
  display: flex;
  gap: 10px;
  justify-content: flex-start;
}

.save-btn {
  background: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-btn {
  background: #777;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.save-btn:hover {
  background: #45a049;
}

.cancel-btn:hover {
  background: #666;
}
</style> 