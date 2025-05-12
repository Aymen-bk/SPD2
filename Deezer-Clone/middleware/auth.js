export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    if (to.path !== '/login' && localStorage.getItem('loggedIn') !== 'true') {
      return navigateTo('/login')
    }
  }
}) 