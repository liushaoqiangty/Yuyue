import * as types from "./mutation-types";
const actions = {
  actGetPlayId({ commit }, id) {
    commit(types.PLAY_ID, id);
  },
  changePlayBtn({ commit }, bool) {
    commit(types.PLAY_BTN, bool);
  },
  actGetPlayIndex({ commit }, index) {
    commit(types.PLAY_INDEX, index);
  },
  actGetPlayList({ commit }, list) {
    commit(types.PLAY_LIST, list);
  },
  addIndex({ commit }) {
    commit(types.ADD_INDEX);
  },
  reduceIndex({ commit }) {
    commit(types.REDUCE_INDEX);
  },
  changePlayPage({ commit }, flag) {
    commit(types.PLAY_PAGE, flag);
  },
  changePlayFlag({ commit }, flag) {
    commit(types.PLAY_FLAG, flag);
  },
  addFavorite({ commit }, list) {
    commit(types.ADD_FAVORITE, list);
  },
  reduceFavorite({commit},id){
    commit(types.REDUCE_FAVORITE,id)
  }
};
export default actions;
