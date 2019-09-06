const getters={
    getPlayId(state){
        return state.playId
    },
    getPlayBtn(state){
        return state.playBtn
    },
    getPlayIndex(state){
        return state.playIndex
    },
    getPlayList(state){
        return state.playList
    },
    getPlayPage(state){
        return state.playPage
    },
    getPlayFlag(state){
        return state.playFlag
    },
    getFavorites ( state ) {
        return state.favoriteList
    },
    
}
export default getters