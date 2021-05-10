import Vue from 'vue';
import Vuex from 'vuex';
import testStore from './modules/testStore'
import cateStore from './modules/cateStore'
import userStore from './modules/userStore'
Vue.use(Vuex);
const store = new Vuex.Store({
    modules:{
        test:testStore,
        cate:cateStore,
        user:userStore,
    }
})
export default store;