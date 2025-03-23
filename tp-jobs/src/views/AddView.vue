<template>
  <div class="add-job">
    <h1>Add a New Job</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>Job Title:</label>
        <input type="text" v-model="job.title" required>
      </div>

      <div class="form-group">
        <label>Job Description:</label>
        <textarea v-model="job.description" required></textarea>
      </div>

      <button type="submit">Add Job</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      job: {
        title: '',
        description: ''
      }
    }
  },
  methods: {
    handleSubmit() {
      //post request to add new job
      fetch('http://localhost:3000/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.job)
      })
      .then(response => response.json())
      .then(data => {
        //reset form
        this.job.title = ''
        this.job.description = ''
        //navigate to jobs list
        this.$router.push({ name: 'Jobs' })
      })
      .catch(err => console.log(err))
    }
  }
}
</script>

<style>
.add-job {
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

button {
  background: crimson;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
}
</style> 