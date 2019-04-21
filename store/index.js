import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import foot from './moudels/foot.js'
import mine from './moudels/mine.js'
import student from './moudels/student.js'
import typeProduct from './moudels/typeProduct.js'
import coupons from './moudels/coupons.js'
import purchaseProduct from './moudels/purchaseProduct.js'
import userInfo from './moudels/userInfo.js'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
  	foot,
    mine,
    student,
    typeProduct,
    coupons,
    purchaseProduct,
    userInfo
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})