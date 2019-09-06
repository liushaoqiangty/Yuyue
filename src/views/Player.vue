 <template>
  <div class="player">
    <div class="cover"></div>

    <div class="container">
      <div class="header">
        <div class="first">
          <span class="fa fa-chevron-down fa-2x" @click="changePage"></span>
        </div>
        <div class="text">
          <h2>{{mytitle}}</h2>
          <h3>{{myauthor}}</h3>
        </div>
        <div></div>
      </div>
      <div class="content" @click="changeLyricShow">
        <div class="middle-l" :style="{display:!lyricShow?'none':'block'}">
          <div class="cd-wrapper">
            <div class="cd play" :class="!this.getPlayBtn && 'pause'">
              <img alt class="image" :src="img" />
            </div>
          </div>
        </div>
        <scroll
          :style="{display:lyricShow?'none':'block'}"
          v-if="lyric"
          class="lyric-wrapper"
          ref="lyricList"
          :data="lyric && lyric.lines"
        >
          <div class="lyric" v-if="lyric">
            <p
              v-for="(line,index) in lyric.lines"
              :key="index"
              ref="lyricLine"
              :class="{'current':currentLineNum===index}"
              class="text"
            >{{line.txt}}</p>
          </div>
        </scroll>
      </div>

      <div class="bottom">
        <div class="bar">
          <div class="timel">
            <span class="time time-l">{{ currentTime | format }}</span>
          </div>
          <div class="bar-line">
            <ProgressBar
              :percent="percent"
              @percentChangeEnd="percentChangeEnd"
              @percentChange="percentChange"
            ></ProgressBar>
          </div>
          <div class="timer">
            <span class="time time-r">{{ duration | format }}</span>
          </div>
        </div>
        <!-- controls="controls" autoplay="autoplay" loop="loop" -->
        <!-- <button @click="startPlay">播放</button>
        <button @click="pausePlay"> 暂停</button>-->
        <div class="bottom-btn">
          <audio
            v-show="audioShow"
            @ended="end"
            autoplay
            @canplay="getDuration"
            @timeupdate="updateTime"
            ref="music"
            :src="myurl"
            controls="controls"
          ></audio>
          <div v-show="!modelBtn">
            <span class="fa fa-refresh fa-2x"></span>
          </div>
          <div v-show="modelBtn">
            <span class="fa fa-random fa-2x"></span>
          </div>
          <div @click="prev">
            <span class="fa fa-step-backward fa-2x"></span>
          </div>
          <div v-show="!getPlayBtn" @click="startPlay">
            <span class="fa fa-play-circle-o fa-2x fa-3x"></span>
          </div>
          <div v-show="getPlayBtn" @click="pausePlay">
            <span class="fa fa-pause-circle-o fa-3x"></span>
          </div>
          <div @click="next">
            <span class="fa fa-step-forward fa-2x"></span>
          </div>
          <div>
            <span
              class="fa fa-heart-o fa-2x"
              @click="setPlayList(getPlayList[getPlayIndex])"
              :style="{color:heart ? 'red' : ''}"
            ></span>
          </div>
        </div>
      </div>
    </div>
    <!-- http://47.100.48.11:4000/lyric?id=386175 -->
  </div>
</template>
 
 <script>
// import { Toast } from "mint-ui";
import ProgressBar from "../components/progress-bar";
import Lyric from "lyric-parser";
import { mapGetters, mapActions } from "vuex";
import scroll from "../common/scroll";
import { Toast } from "vant";
// import { Toast } from 'mint-ui'
export default {
  name: "Player",
  data() {
    return {
      songUrl: {},
      lyric: null,
      songId: "",
      lyricShow: true,
      audioShow: false,
      duration: null,
      currentTime: [],
      modelBtn: false,
      currentLineNum: 0,
      playingLyric: null,
      percent: 0,
      move: false,
      img: "",
      heart: false
    };
  },
  created() {},
  computed: {
    ...mapGetters(["getPlayBtn","getPlayId","getPlayIndex","getPlayList","getPlayPage","getPlayFlag","getFavorites"]),
    myurl: function() {
      //音乐地址
      if (this.getPlayPage) {
        //音乐url
        return `https://music.163.com/song/media/outer/url?id=${this.getPlayList[this.getPlayIndex].id}.mp3`;
      }
    },
    mytitle: function() {
      //歌曲标题
      if (this.getPlayPage) {
        return `${this.getPlayList[this.getPlayIndex].name}`;
      }
    },
    myauthor: function() {
      //歌曲作者
      if (this.getPlayPage) {
        return `${this.getPlayList[this.getPlayIndex].singer}`;
      }
    }
  },
  mounted() {
    // console.log(this.$route);
    let paramsId = this.$route.params.id;
    this.songId = paramsId;
    this.getLyric(this.getPlayList[this.getPlayIndex].id);
    this.getSong(paramsId);
    // if(this.getPlayFlag){
    //   this.play()
    // }
  },
  methods: {
    ...mapActions(["changePlayBtn","actGetPlayIndex","actGetPlayList","addIndex","reduceIndex","changePlayFlag","changePlayPage","addFavorite","reduceFavorite"]),

    async getSong(id) {
      try {
        let res = await this.$http(
          `http://47.100.48.11:4000/song/detail?ids=${id}`
        );
        // res = res.data;
        // this.songUrl = res.data[0];
        // console.log(res.data[0].url);
        let list = res.data.songs[0];
        // this.songInfo = list
        this.img = list.al.picUrl;
        console.log(list);
        console.log(this.getPlayList);
        this.$nextTick(() => {});
      } catch (error) {
        console.log(error);
      }
    },
    async getLyric(id) {
      try {
        let res = await this.$http(`http://47.100.48.11:4000/lyric?id=${id}`);
        res = res.data;
        this.$nextTick(() => {
          this.lyric = new Lyric(res.lrc.lyric, this.handleLyric);
          // console.log(this.lyric);
          if (this.lyric && this.duration) {
            this.lyric.play();
            this.currentLineNum = 0;
            this.$refs.lyricList.scrollTo(0, 0, 1000);
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    handleLyric({ lineNum, txt }) {
      this.currentLineNum = lineNum;
      if (lineNum > 7) {
        let lineEl = this.$refs.lyricLine[lineNum - 7];
        this.$refs.lyricList.scrollToElement(lineEl, 1000); // 滚动到元素
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 1000); // 滚动到顶部
      }
      this.playingLyric = txt;
      // console.log(this.playingLyric);
    },
    startPlay() {
      // console.log(this.$refs.music);
      this.$refs.music.play();
      this.changePlayFlag(true);
      //  this.lyric.toggelePlay()//切换歌词播放状态
      this.changePlayBtn(true);
      // console.log(this.getPlayIndex);
    },
    pausePlay() {
      this.$refs.music.pause();
      this.changePlayFlag(false);
      //  this.lyric.toggelePlay()//切换歌词播放状态
      this.changePlayBtn(false);
    },
    next() {
      if (this.getPlayIndex < this.getPlayList.length - 1) {
        this.addIndex();
      } else {
        this.actGetPlayIndex(0);
      }
    },
    prev() {
      if (this.getPlayIndex > 0) {
        this.reduceIndex();
      } else {
        this.actGetPlayIndex(this.getPlayList.length - 1);
      }
    },
    percentChange(percent) {
      //歌曲进度条
      this.move = true;
      const currentTime = this.duration * percent;
      this.currentTime = currentTime;
      if (this.lyric) {
        this.lyric.seek(currentTime * 1000);
      }
    },
    percentChangeEnd(percent) {
      //歌曲进度条
      this.move = false;
      const currentTime = this.duration * percent;
      this.$refs.music.currentTime = currentTime;
      if (this.getPlayFlag) {
        this.$refs.music.play();
        this.changePlayFlag(true);
      }
      if (this.lyric) {
        this.lyric.seek(currentTime * 1000);
      }
    },
    end() {
      this.next();
    },
    getDuration() {
      //获取播放时长
      let stop = setInterval(() => {
        //获取播放总时长
        this.duration = this.$refs.music.duration;
        if (this.duration) {
          clearInterval(stop);
        }
      }, 150);
    },
    updateTime() {
      //已播放时长
      this.currentTime = this.$refs.music.currentTime; //获取audio当前播放时间
    },
    changePage() {
      // console.log("123");
      this.changePlayPage(false);
      // console.log(this.getPlayPage);
    },
    changeLyricShow() {
      this.lyricShow = !this.lyricShow;
    },
    //收藏音乐
    setPlayList(list) {
      if (!this.heart) {
        this.addFavorite(list);
        console.log(this.getFavorites);
        Toast("收藏成功");
      }
      if (this.heart) {
        this.reduceFavorite(list.id);
        console.log(this.getFavorites);
        Toast("取消收藏成功");
      }
      this.heart = !this.heart;

      // for(var i=0;i<this.getFavorites.length;i++){
      //   // for(var j=0;j<this.getFavorites.length;i++){

      //   // }
      //   if(this.getgetFavorites[i].id=list.id){
      //       console.log(list.id)
      //   }else{
      //     console.log("else")
      //   }
      // }
    },
    faListFlag() {
      this.heart = false;
    },
    unique4(arr) {
      //数组去重
      var hash = [];
      for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          if (arr[i].id === arr[j].id) {
            ++i;
          }
        }
        hash.push(arr[i]);
      }
      return hash;
    }
  },
  watch: {
    currentTime() {
      this.percent = this.currentTime / this.duration;
    },
    getPlayIndex() {
      // this.setLatelyPlays();
      this.faListFlag();

      if (this.getPlayFlag) {
        // console.log(this.getPlayFlag);
        if (this.getPlayList[this.getPlayIndex]) {
          this.getSong(this.getPlayList[this.getPlayIndex].id);
          // console.log(this.getPlayIndex);
          this.getLyric(this.getPlayList[this.getPlayIndex].id);
          return;
        }
        this.img = `${this.getPlayList[this.getPlayIndex].img}`;
      }
    },
    getPlayFlag(a, b) {
      console.log(a, "aaaaaaaaaaa");
      console.log(b, "bbbbbbbbbbbbb");
      if (a) {
        this.startPlay();
      }
      if (b) {
        this.pausePlay();
      }
    }
  },
  components: {
    scroll,
    ProgressBar
  }
};
</script>
 
<style lang="scss" scoped>
.player {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
  background: #f2f3f4;
  .cover {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.6;
    z-index: 105;
    -webkit-filter: blur(2px);
  }
  .container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 150;
    .header {
      display: flex;
      align-content: center;
      justify-content: space-around;
      text-align: center;
      border: 1px solid gray;
      .first {
        span {
          // margin-left: -40px;
          // margin-top: 15px;
          color: white;
        }
      }
      .text {
        h2 {
          font-size: 18px;
          font-weight: 700;
          margin: 0;
        }
        h3 {
          margin: 0;
        }
      }
    }
    .content {
      //磁盘页面
      width: 100%;
      height: 500px;
      padding-top: 20px;
      text-align: center;
      overflow: hidden;

      .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;
        margin-top: 50px;
        .cd-wrapper {
          position: absolute;
          left: 10%;
          top: 0;
          width: 80%;
          height: 100%;
          .cd {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border: 0.15rem solid hsla(0, 0%, 100%, 0.1);
            border-radius: 50%;
            &.play {
              animation: cd 20s linear infinite;
            }
            &.pause {
              animation-play-state: paused;
            }
            img {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
        }
      }
    }
    .lyric-wrapper {
      width: 100%;
      height: 500px;
      padding-top: 20px;
      text-align: center;
      overflow: hidden;
      // margin-top: 50px;
      &::after {
        content: "";
        clear: both;
        display: block;
      }
      .lyric {
        .text {
          // font-size: 0.14rem;
          // line-height: 0.25rem;

          &.current {
            font-size: 16px;
            color: red;
          }
        }
      }
    }

    .bottom {
      width: 100%;
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 200;
      .bar {
        width: 100%;
        // background: green;
        display: flex;
        align-content: center;
        justify-content: space-around;
        .bar-line {
          // height: 100px;
          width: 70%;
          overflow: hidden;
        }
      }
      .bottom-btn {
        width: 100%;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: space-around;
      }
    }
  }
}
@keyframes cd {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(1turn);
  }
}
</style>