import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: null,
    profile: null
  }),
  actions: {
    setToken(token) {
      this.token = token
      localStorage.setItem('deezer_token', token)
    },
    loadToken() {
      const token = localStorage.getItem('deezer_token')
      if (token) this.token = token
    },
    async fetchProfile() {
      if (!this.token) return
      const res = await fetch(`https://api.deezer.com/user/me?access_token=${this.token}`)
      const data = await res.json()
      this.profile = data
    },
    logout() {
      this.token = null
      this.profile = null
      localStorage.removeItem('deezer_token')
    }
  }
}) 