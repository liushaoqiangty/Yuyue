 <template>
  <div class="bottom-slider" @click="output" v-show="show&&showt">
    <div class="slider-left" @click="playPage">
      <div class="img">
        <img v-if="getPlayList" :src="getPlayList[getPlayIndex].img" alt />
      </div>
      <div class="content">
        <p v-if="getPlayList">{{getPlayList[getPlayIndex].name}}</p>
        <p v-if="getPlayList">{{getPlayList[getPlayIndex].singer}}</p>
      </div>
    </div>
    <div class="slider-right">
      <div class="btn">
        <span class="fa fa-play-circle-o fa-2x" v-show="!getPlayBtn" @click="changeBtnTrue"></span>
        <span class="fa fa-pause-circle-o fa-2x" v-show="getPlayBtn" @click="changeBtnFalse"></span>
      </div>
    </div>
  </div>
  <!-- img: "http://p1.music.126.net/gbeP6upLG0PFp8ecmy0-7w==/109951163240606902.jpg"
name: "偏偏喜欢你"
  singer: "陈百强"-->
</template>
 
 <script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "BottomSidebar",
  data() {
    return {
      show: false,
      showt: false,
      btnShow: false
    };
  },
  mounted() {
    //    this.changeShow()
  },
  computed: {
    ...mapGetters(["getPlayIndex"]),
    ...mapGetters(["getPlayFlag"]),
    ...mapGetters(["getPlayList"]),
    ...mapGetters(["getPlayPage"]),
    ...mapGetters(["getPlayBtn"])
  },
  methods: {
    ...mapActions(["changePlayPage"]),
    ...mapActions(["changePlayFlag"]),
    ...mapActions(["changePlayBtn"]),
    output() {
      console.log(this.getPlayList, "this.getPlayList");
      console.log(this.getPlayFlag, "this.getPlayFlag");
      console.log(this.getPlayPage, "getPlayPage");
      console.log(this.getPlayIndex, "getPlayIndex");
    },
    playPage() {
      this.changePlayPage(true);
    },
    changeBtnTrue() {
      this.changePlayBtn(true);
      console.log(this.getPlayFlag);
      this.changePlayFlag(true);
    },
    changeBtnFalse() {
      this.changePlayBtn(false);
      console.log(this.getPlayFlag);
      this.changePlayFlag(false);
    }
  },
  watch: {
    getPlayList() {
      this.show = true;
    },
    getPlayPage(a, b) {
      if (a == true) {
        this.showt = false;
      } else {
        this.showt = true;
      }
    }
  }
};
</script>
 
<style lang="scss" scoped>
p {
  margin: 0;
  padding: 0;
}
.bottom-slider {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 250;
  width: 100%;
  height: 70px;
  opacity: 0.9;
  // background: #f8f8f8;
  background: white;
  padding: 5px;
  border-top: 1px solid #a8a8a8;
  // border-top: 1px solid #f8f8f8;
  display: flex;

  .slider-left {
    flex: 1;
    display: flex;
    .img {
      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
    }
    .content {
      // line-height: 70px;
      margin-left: 10px;
      margin-top: 10px;
      width: 100%;
      p {
        width: 100%;
        // background: red;
        
        text-overflow: ellipsis;
        overflow: hidden;
        // white-space: nowrap;
      }
    }
  }
  .slider-right {
    flex: 0 0 100px;
    line-height: 70px;
    .btn {
      text-align: center;
    }
  }
}
</style>