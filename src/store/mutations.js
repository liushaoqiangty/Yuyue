import * as types from "./mutation-types";

const mutations = {
  [types.PLAY_ID](state, action) {
    state.playId = action;
  },
  [types.PLAY_BTN](state, action) {
    state.playBtn = action;
  },
  [types.PLAY_INDEX](state, index) {
    state.playIndex = index;
  },
  [types.PLAY_LIST](state, list) {
    state.playList = list;
  },
  [types.ADD_INDEX](state) {
    state.playIndex++;
  },
  [types.REDUCE_INDEX](state) {
    state.playIndex--;
  },
  [types.PLAY_PAGE](state, flag) {
    state.playPage = flag;
  },
  [types.PLAY_FLAG](state, flag) {
    state.playFlag = flag;
  },
  [types.ADD_FAVORITE](state, list) {
    let flag = true;
    // console.log(flag)
    for (var i = 0; i < state.favoriteList.length; i++) {
      if (state.favoriteList[i].id == list.id) {
            flag=false
            break;
      }
    }

    if (flag) {

      state.favoriteList.push(list);
      // flag=false
    }
  },
  [types.REDUCE_FAVORITE](state,id){
    
    //  state.favoriteList=state.favoriteList.filter(item=>{
    //   let list=[];
    //   if(item.id==id){
    //     list.push(item)
        
    //   }
    // })
    for(var i=0;i<state.favoriteList.length;i++){
      if(state.favoriteList[i].id==id){
        state.favoriteList.splice(i,1)
      }
    }
  }
};

export default mutations;
