import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import foot from './moudels/foot.js'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
  	foot,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})