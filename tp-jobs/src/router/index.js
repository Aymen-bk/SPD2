import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddView from '../views/AddView.vue'
import JobsView from '../views/jobs/JobsView'
import JobDetails from '../views/jobs/JobDetails'
import EditJob from '../views/jobs/EditJob.vue'
import ErrorPage from '../views/ErrorPage'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/add',
    name: 'add',
    component: AddView
  },
  {
    path: '/jobs',
    name: 'Jobs',
    component: JobsView
  },
  {
    path: '/jobs/:id',
    name: 'jobdetails',
    component: JobDetails,
    props: true // ACCEPT ANY ROUTE PARAMS AS A PROPS
  },
  {
    path: '/jobs/:id/edit',
    name: 'editjob',
    component: EditJob,
    props: true
  },
  //REDIRECT
  {
    path: '/all-jobs', //old route
    redirect: '/jobs' //route to be redirected to
  },
  //catch 404 pages (ALL PAGES THAT ARE NOT ON THE ROUTE ARRAY)
  {
    path: '/:catchAll(.*)', //MUST BE THE SAME AS THIS
    name: '404',
    component: ErrorPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
