import { GetTypeProducts } from '@/utils/http.js'
// 不同类型产品页
// 属性字段
const state = {
  history: [],
  science: [],
  grow: [],
  homepage: [],
  // 当前选中的
  selected: {}
}

// 等同于计算属性，该对象定义的属性是通过state
// 中的字段计算而来，可以在组件中定义为计算属性
const getters = {}

// 定义事件，state中字段的改变必须通过mutations中的方法改变
// 该对象中的方法可以有参数：
// 第一个参数固定为state对象，第二个是触发时传入的参数
// 使用store.commit(方法名,参数)
const mutations = {
  setProductCacheByType(state, ob){
  	state[ob.type] = ob.data;
  },
  setHomeProductCache(state, data) {
    if(data instanceof Array) {
      state.homepage = data;
    }
  },
  cacheProductSelected(state, data) {
    if(data instanceof Object) {
      state.selected = data;
    }
  },
  updateSelectProductInfoId(data, id) {
    state.selected.productInfoId = id;
  }  
}


// mutaions只能进行同步操作
// actions中定义的方法可以进行异步发作，在异步方法内进行commit操作
const actions = {
	changeData({ commit }, type){
		GetTypeProducts().then(data => {
			commit("changeData", {type: type,data: data.result});
		}).catch(data => {

		})
	}
}

export default {
  state,
  getters,
  mutations,
  actions
}