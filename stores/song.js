import { defineStore } from 'pinia'

export const useSongStore = defineStore('song', {
  state: () => ({
    isPlaying: false,
    audio: null,
    currentTrack: null,
    currentArtist: null,
    queue: [],
    volume: 1,
    repeat: 'none', // none, one, all
    shuffle: false,
    likedTracks: [],
    playlist: [],
    playlists: [] // { name: string, tracks: [] }
  }),

  getters: {
    currentTrackId: (state) => state.currentTrack?.id,
    isCurrentTrack: (state) => (trackId) => state.currentTrack?.id === trackId,
    queueLength: (state) => state.queue.length,
    nextTrack: (state) => state.queue[0],
    previousTrack: (state) => state.queue[state.queue.length - 1]
  },

  actions: {
    async loadSong(track) {
      if (!track || !track.preview) {
        console.error('Invalid track data or no preview available');
        return;
      }

      this.currentTrack = track;
      this.currentArtist = track.artist;

      if (this.audio && this.audio.src) {
        this.audio.pause();
        this.isPlaying = false;
        this.audio.src = '';
      }

      this.audio = new Audio();
      this.audio.src = track.preview;
      this.audio.volume = this.volume;

      this.audio.onerror = (e) => {
        console.error('Error loading audio:', e);
        this.isPlaying = false;
      };

      try {
        await this.audio.play();
        this.isPlaying = true;
      } catch (error) {
        console.error('Error playing audio:', error);
        this.isPlaying = false;
      }
    },

    async playOrPauseSong() {
      if (!this.audio) return;

      try {
        if (this.audio.paused) {
          await this.audio.play();
          this.isPlaying = true;
        } else {
          this.audio.pause();
          this.isPlaying = false;
        }
      } catch (error) {
        console.error('Error toggling play state:', error);
        this.isPlaying = false;
      }
    },

    async playOrPauseThisSong(track) {
      if (!this.audio || !this.audio.src || (this.currentTrack?.id !== track.id)) {
        await this.loadSong(track);
        return;
      }

      await this.playOrPauseSong();
    },

    async nextSong() {
      if (!this.queue.length) return;

      const nextTrack = this.queue.shift();
      await this.loadSong(nextTrack);
    },

    async prevSong() {
      if (!this.currentTrack) return;

      // If we're more than 3 seconds into the song, restart it
      if (this.audio.currentTime > 3) {
        this.audio.currentTime = 0;
        return;
      }

      // Otherwise, play the previous track
      if (this.queue.length > 0) {
        const prevTrack = this.queue.pop();
        await this.loadSong(prevTrack);
      }
    },

    setVolume(value) {
      this.volume = value;
      if (this.audio) {
        this.audio.volume = value;
      }
    },

    toggleRepeat() {
      const modes = ['none', 'one', 'all'];
      const currentIndex = modes.indexOf(this.repeat);
      this.repeat = modes[(currentIndex + 1) % modes.length];
    },

    toggleShuffle() {
      this.shuffle = !this.shuffle;
      if (this.shuffle) {
        this.queue = [...this.queue].sort(() => Math.random() - 0.5);
      }
    },

    addToQueue(track) {
      this.queue.push(track);
    },

    clearQueue() {
      this.queue = [];
    },

    resetState() {
      this.isPlaying = false;
      this.audio = null;
      this.currentTrack = null;
      this.currentArtist = null;
      this.queue = [];
      this.volume = 1;
      this.repeat = 'none';
      this.shuffle = false;
    },

    toggleLike(track) {
      const idx = this.likedTracks.findIndex(t => t.id === track.id)
      if (idx === -1) {
        this.likedTracks.push(track)
      } else {
        this.likedTracks.splice(idx, 1)
      }
    },

    isLiked(track) {
      return this.likedTracks.some(t => t.id === track.id)
    },

    addToPlaylist(track) {
      if (!this.playlist.some(t => t.id === track.id)) {
        this.playlist.push(track)
      }
    },

    removeFromPlaylist(track) {
      this.playlist = this.playlist.filter(t => t.id !== track.id)
    },

    isInPlaylist(track) {
      return this.playlist.some(t => t.id === track.id)
    },

    createPlaylist(name) {
      if (!this.playlists.some(p => p.name === name)) {
        this.playlists.push({ name, tracks: [] })
      }
    },

    addTrackToPlaylist(playlistName, track) {
      const playlist = this.playlists.find(p => p.name === playlistName)
      if (playlist && !playlist.tracks.some(t => t.id === track.id)) {
        playlist.tracks.push(track)
      }
    },

    removeTrackFromPlaylist(playlistName, trackId) {
      const playlist = this.playlists.find(p => p.name === playlistName)
      if (playlist) {
        playlist.tracks = playlist.tracks.filter(t => t.id !== trackId)
      }
    }
  },
  persist: true
})