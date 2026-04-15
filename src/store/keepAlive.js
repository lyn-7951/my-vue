import { defineStore } from 'pinia'

export const useKeepAliveStore = defineStore('keepAlive', {
  state: () => ({
    cachedViews: []
  }),
 
  actions: {
    addCachedView(viewName) {
      this.cachedViews.push(viewName)
    },
    removeCachedView(viewName) {
      const index = this.cachedViews.indexOf(viewName)
      this.cachedViews.splice(index, 1)
    },
    clearCachedViews() {
      this.cachedViews = []
    }
  },
  persist: true
})
