<template>
    <div class="jobs-container">
        <h1>Jobs</h1>
        
        <!--loading State -->
        <div v-if="isLoading" class="status-message loading">
            <h3>Waiting to load database...</h3>
            <p>Please make sure the JSON server is running:</p>
            <code>json-server --watch data/db.json</code>
        </div>

        <!--error State -->
        <div v-else-if="error" class="status-message error">
            <h3>{{ error }}</h3>
            <p>Please start the JSON server and refresh the page</p>
        </div>

        <!--jobs List -->
        <div v-else>
            <div v-for="job in jobs" :key="job.id" class="job-card">
                <div class="job-info">
                    <router-link :to="{name: 'jobdetails', params: {id: job.id}}">
                        <h2>{{ job.title }}</h2>
                    </router-link>
                </div>
                <div class="job-actions">
                    <button @click="editJob(job)" class="edit-btn">Edit</button>
                    <button @click="confirmDelete(job)" class="delete-btn">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            jobs: [],
            isLoading: true,
            error: null
        }
    },
    methods: {
        editJob(job) {
            this.$router.push({ name: 'editjob', params: { id: job.id }})
        },
        confirmDelete(job) {
            if (confirm(`Are you sure you want to delete the job: ${job.title}?`)) {
                this.deleteJob(job.id)
            }
        },
        deleteJob(id) {
            fetch(`http://localhost:3000/jobs/${id}`, {
                method: 'DELETE'
            })
            .then(() => {
                this.jobs = this.jobs.filter(job => job.id !== id)
            })
            .catch(err => {
                this.error = 'Could not connect to the database server'
            })
        },
        loadJobs() {
            this.isLoading = true
            this.error = null
            
            fetch('http://localhost:3000/jobs')
            .then(resp => {
                if (!resp.ok) {
                    throw new Error('Failed to fetch jobs')
                }
                return resp.json()
            })
            .then(data => {
                this.jobs = data
                this.isLoading = false
            })
            .catch(err => {
                this.error = 'Could not connect to the database server'
                this.isLoading = false
            })
        }
    },
    mounted() {
        this.loadJobs()
    }
}
</script>

<style>
.jobs-container {
    padding: 20px;
}

.status-message {
    max-width: 600px;
    margin: 40px auto;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
}

.status-message.loading {
    background: #f5f5f5;
    border: 2px dashed #666;
}

.status-message.error {
    background: #fff5f5;
    border: 2px solid #ff4444;
    color: #cc0000;
}

.status-message code {
    display: block;
    margin-top: 15px;
    padding: 10px;
    background: #2c3e50;
    color: white;
    border-radius: 4px;
    font-family: monospace;
}

.job-card {
    background: #f4f4f4;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.job-info {
    flex-grow: 1;
}

.job-info h2 {
    margin: 0;
    color: #2c3e50;
}

.job-actions {
    display: flex;
    gap: 10px;
}

.edit-btn {
    background: #2196F3;
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 4px;
    cursor: pointer;
}

.edit-btn:hover {
    background: #1976D2;
}

.delete-btn {
    background: #ff4444;
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 4px;
    cursor: pointer;
}

.delete-btn:hover {
    background: #cc0000;
}

a {
    text-decoration: none;
}
</style>