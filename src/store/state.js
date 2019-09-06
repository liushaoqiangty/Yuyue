const state={
    playFlag:false,//暂停/播放
    playerFlag:false, //播放页面是否显示
    playId:null,//正在播放音乐的ID
    playIndex:null,//正在播放音乐的索引
    playList:null, //正在播放音乐的所在的歌单
    playBtn: false,//播放按钮切换
    playPage:false,
    // favoriteList : JSON.parse(localStorage.getItem('favorite')),//歌曲收藏
    favoriteList:[]
}
export default state