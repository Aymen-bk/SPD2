import axios from 'axios';

export function useDeezerService() {
  const config = useRuntimeConfig();

  const deezerApi = axios.create({
    baseURL: config.public.deezerApiUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return {
    // Search for tracks
    async searchTracks(query) {
      try {
        const response = await deezerApi.get(`/search?q=${encodeURIComponent(query)}`);
        return response.data;
      } catch (error) {
        console.error('Error searching tracks:', error);
        throw error;
      }
    },

    // Get track details
    async getTrack(id) {
      try {
        const response = await deezerApi.get(`/track/${id}`);
        return response.data;
      } catch (error) {
        console.error('Error getting track:', error);
        throw error;
      }
    },

    // Get artist details
    async getArtist(id) {
      try {
        const response = await deezerApi.get(`/artist/${id}`);
        return response.data;
      } catch (error) {
        console.error('Error getting artist:', error);
        throw error;
      }
    },

    // Get artist's top tracks
    async getArtistTopTracks(id) {
      try {
        const response = await deezerApi.get(`/artist/${id}/top`);
        return response.data;
      } catch (error) {
        console.error('Error getting artist top tracks:', error);
        throw error;
      }
    },

    // Get album details
    async getAlbum(id) {
      try {
        const response = await deezerApi.get(`/album/${id}`);
        return response.data;
      } catch (error) {
        console.error('Error getting album:', error);
        throw error;
      }
    },

    // Get chart
    async getChart() {
      try {
        const response = await deezerApi.get('/chart');
        return response.data;
      } catch (error) {
        console.error('Error getting chart:', error);
        throw error;
      }
    }
  };
} 