import Vue from 'vue';
import Vuex from 'vuex';
import testStore from './modules/testStore'
import cateStore from './modules/cateStore'
Vue.use(Vuex);
const store = new Vuex.Store({
    modules:{
        test:testStore,
        cate:cateStore
    }
})
export default store;