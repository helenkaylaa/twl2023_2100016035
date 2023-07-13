import { createStore } from 'vuex';

export default createStore({
  state: {
    pesananList: [],
  },
  mutations: {
    tambahkanPesanan(state, pesanan) {
      state.pesananList.push(pesanan);
    },
    resetPesanan(state) {
      state.pesananList = [];
    },
  },
});
