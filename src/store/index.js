import Vue from 'vue'
import Vuex from 'vuex'

// we first import the module
import tonaton from './tonaton'
import { firebaseMutations } from 'vuexfire'

Vue.use(Vuex)

const store = new Vuex.Store({
  mutations: {
    // your mutations
    ...firebaseMutations
  },
  modules: {
    // then we reference it
    tonaton
  }
})

// if we want some HMR magic for it, we handle
// the hot update like below. Notice we guard this
// code with "process.env.DEV" -- so this doesn't
// get into our production build (and it shouldn't).
if (process.env.DEV && module.hot) {
  module.hot.accept(['./tonaton'], () => {
    const newTonaton = require('./tonaton').default
    store.hotUpdate({ modules: { tonaton: newTonaton } })
  })
}

export default store
