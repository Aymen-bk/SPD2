<template>
<div v-if="jobDetail">
    <h1>Job details {{ id }}</h1>
  <h3>{{ jobDetail.title }}</h3>
  <p>{{ jobDetail.description }}</p>
</div>
<div v-else >
    Loading job details
</div>
  
</template>

<script>

export default {
    props: ['id'],
    data() {
        return {
            jobDetail : null
        }
    },
    mounted() {
        fetch("http://localhost:3000/jobs/"+this.id)
        .then(resp => resp.json())
        .then(data => this.jobDetail = data)
        .catch(err => console.log(err))
    }
}
</script>

<style>

</style>