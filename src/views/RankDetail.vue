 <template>
  <div class="rankDetail" ref="detail">
    <div>
      <div class="header">
        <span class="fa fa-arrow-left" @click="goBack"></span>
        <span @click="goBack">返回</span>
      </div>

      <div class="bg-image" v-lazy:background-image="list.coverImgUrl">
        <div class="text">
          <h2 class="list-title">{{ list.name }}</h2>
          <p
            class="update"
            v-if="this.$route.name!='recomend'"
          >最近更新:{{ list.trackUpdateTime | formatUpdataTime}}</p>
          <p class="play-count" v-if="this.$route.name==='recomend'">
            <span class="fa fa-user-o"></span>
            {{ list.playCount | countFilter}}
          </p>
        </div>
      </div>
      <div class="list-content">
        <div class="content-header">
          <span class="playall fa fa-play-circle-o"></span>
          <span>播放全部</span>
          <span class="small">(共{{ list.tracks && list.tracks.length }}首)</span>
        </div>
        <div class="list-all">
          <ul>
            <li
              class="list-item"
              v-for="(item,index) in list.tracks"
              :key="index"
              @click="play(item.id,index,list.tracks)"
            >
              <div class="left">
                <p>{{index+1}}</p>
              </div>
              <div class="right">
                <div class="content">
                  <h2>{{item.name}}</h2>
                  <p class="song-name">{{item.ar[0].name}}</p>
                </div>
                <div class="player">
                  <span class="fa fa-play-circle-o fa-2x"></span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
 
 <script>
import BScroll from "better-scroll";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "RecommendDetail",
  data() {
    return {
      list: []
    };
  },
  mounted() {
    // console.log(this.$route);
    let paramsId = this.$route.params.id;
    this.getSellerData(paramsId);
  },
  methods: {
    ...mapActions(["changePlayFlag"]),
    ...mapActions(["actGetPlayId"]),
    ...mapActions(["changePlayBtn"]),
    ...mapActions(["actGetPlayIndex"]),
    ...mapActions(["actGetPlayList"]),
    ...mapActions(["changePlayPage"]),
    async getSellerData(id) {
      try {
        var url = "/personalized";
        let res = await this.$http(
          `http://47.100.48.11:4000/playlist/detail?id=${id}`
        );
        res = res.data;
        this.list = res.playlist;
        this.$nextTick(() => {
          this.initBetterScroll();
        });
        // console.log(this.list);
      } catch (error) {
        console.log(error);
      }
    },
    initBetterScroll() {
      if (this.menuScroll) {
        this.menuScroll.refresh();
      } else {
        this.menuScroll = new BScroll(this.$refs.detail, {
          click: true ///允许点击页面
        });
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    play(id, index, list) {
      console.log(id);
      // this.$router.push({
      //   path: `/player/${id}`
      // });
      //获取播放信息
      let listData = [];
      console.log("list", list);
      list.map((item, index) => {
        let tem = {};
        tem.id = item.id;
        tem.img = item.al.picUrl;
        tem.name = item.al.name;
        tem.singer = item.ar[0].name;
        listData.push(tem);
      });
      this.actGetPlayIndex(index);
      this.actGetPlayList(listData);
      this.changePlayBtn(true);
      this.actGetPlayId(id);
      this.changePlayPage(true);
      this.changePlayFlag(true);
    }
  }
};
</script>
 
<style lang="scss">
p,
h2 {
  margin: 0;
  height: 20px;
}
.rankDetail {
  // height: 100%;
  position: relative;
  max-height: 900px;

  overflow: hidden;

  .header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 56px;
    background: transparent;
    padding: 5px;
    line-height: 46px;
    z-index: 10;

    span {
      color: white;
      font-size: 18px;
      font-weight: 100;
      margin-left: 10px;
    }
  }
  .bg-image {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 75%;
    transform-origin: top;
    background-size: cover;
    background-position: 0 65%;
    // text-align: center;
    .text {
      //   background: red;
      position: absolute;
      bottom: 30px;
      width: 100%;
      padding: 0px 30px;
      color: white;
      h2 {
        width: 100%;
        height: 100%;
        font-size: 18px;
        line-height: 20px;
        font-weight: 700;
        letter-spacing: 1px;
        font-style: italic;
        color: white;
        margin: 0;
      }
      p {
        width: 100%;
        height: 100%;
      }
    }
  }
  .list-content {
    background: #f0f0f0;
    position: relative;
    top: -20px;

    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    color: #2e3030;
    .content-header {
      height: 40px;
      line-height: 40px;
      padding-left: 15px;
      span {
        line-height: 40px;
        font-size: 17px;
      }
      .playall {
        // color: white;
        font-size: 22px;
        margin-right: 10px;
        font-weight: 100px;
      }
      .small {
        font-size: 12px;
      }
    }
  }
  .list-all {
    background: #f0f0f0;
    // margin-left: 15px;
    // margin: 15px 0;

    .list-item {
      padding: 15px 0;
      border-top: 1px solid #e4e4e4;
      display: flex;

      .left {
        flex: 0 0 50px;
        line-height: 40px;
        text-align: center;
        font-size: 17px;
      }
      .right {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .content {
          flex: 1;
          h2 {
            overflow: hidden;
            //   text-overflow:ellipsis;/*显示省略号来代表被修剪的文本*/
            //   white-space:inherit;/*规定段落中的文本不进行换行*/
          }
        }

        .player {
          flex: 0 0 50px;
          //   margin-right: 20px;
        }
      }
    }
  }
}
</style>