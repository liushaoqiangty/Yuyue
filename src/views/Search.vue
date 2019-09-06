 <template>
  <div class="search">
    <div class="search-header">
      <div class="left">
        <span class="fa fa-arrow-left" @click="goBack"></span>
      </div>
      <div class="inp">
        <input placeholder="请输入搜索内容" v-model="content" />
      </div>
      <div class="right">
        <span class="fa fa-times" @click="clearContent"></span>
      </div>
    </div>
    <div class="body" ref="result">
      <div>
        <!-- 热搜 -->
        <div class="hotshow" v-show="!boxFlag">
          <div class="hot-search">
            <p>热门搜索</p>
            <div class="hot-list">
              <ul>
                <li
                  v-for="(item,index) in hotList.hots"
                  :key="index"
                  @click="hotEnter(item.first)"
                >{{item.first}}</li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 搜索结果 -->
        <div class="search-result" v-show="boxFlag">
          <div class="suggest">
            <div class="search-suggest">
              <p class="title">最佳匹配</p>
              <div class="search-suggest-item" @click="goRankDetail(songSheet.id)">
                <div class="img">
                  <img v-lazy="songSheet && songSheet.coverImgUrl" width="50" height="50" />
                </div>
                <div class="text">
                  <p>歌单:{{ songSheet && songSheet.name }}</p>
                  <p class="singe">{{ songSheet && songSheet.description }}</p>
                </div>
              </div>
            </div>
            <ul class="suggest-list">
              <li
                class="suggest-item"
                v-for=" (item,index) in resultList "
                :key="index"
                @click="play(item.id,index,resultList)"
              >
                <div class="name">
                  <p class="song">
                    {{ item.name }}
                    <span v-if="item.alias[0]">({{item.alias[0]}} )</span>
                  </p>
                  <p class="singe">{{ item.artists[0].name }}</p>
                </div>
              </li>
            </ul>
            <div class="no-result-wrapper" v-show="flag">抱歉，暂无搜索结果</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
 <script>
import { mapActions, mapGetters } from "vuex";
import BScroll from "better-scroll";
export default {
  name: "Search",
  data() {
    return {
      content: "",
      boxFlag: false,
      hotList: [],
      songSheet: [],
      resultList: [],
      resultShow: false,
      flag: false
    };
  },
  mounted() {
    // console.log(this.$route);
    this.getSellerData();
  },
  methods: {
    ...mapActions(["changePlayFlag"]),
    ...mapActions(["actGetPlayId"]),
    ...mapActions(["changePlayBtn"]),
    ...mapActions(["actGetPlayIndex"]),
    ...mapActions(["actGetPlayList"]),
    ...mapActions(["changePlayPage"]),
    async getSellerData() {
      try {
        var url = "/search/hot";
        let res = await this.$http(`http://47.100.48.11:4000${url}`);
        res = res.data;
        this.hotList = res.result;
        console.log(this.hotList);
      } catch (error) {
        console.log(error);
      }
    },
    initBetterScroll() {
      if (this.menuScroll) {
        this.menuScroll.refresh();
      } else {
        this.menuScroll = new BScroll(this.$refs.result, {
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
        // tem.img = `http://p1.music.126.net/LiRR__0pJHSivqBHZzbMUw==/${item.album.picId}.jpg`;
        tem.img = item.artists[0].img1v1Url;
        tem.name = item.name;
        tem.singer = item.artists[0].name;
        tem.need = true;
        listData.push(tem);
      });
      this.actGetPlayIndex(index);
      this.actGetPlayList(listData);
      this.changePlayBtn(true);
      this.actGetPlayId(id);
      this.changePlayPage(true);
      this.changePlayFlag(true);
    },
    hotEnter(name) {
      this.content = name;
    },
    async getResult() {
      try {
        var url = `/search/suggest?keywords=${this.content}`;
        let res = await this.$http(`http://47.100.48.11:4000${url}`);
        if (res.data.code == 200) {
          if (res.data.result.playlists) {
            let list = res.data.result.playlists[0];
            this.songSheet = list;
            this.resultShow = true;
            console.log(this.songSheet, "歌单");
          } else {
            this.resultShow = false;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getResultList() {
      try {
        var url = `/search?keywords=${this.content}&offset=0`;
        let res = await this.$http(`http://47.100.48.11:4000${url}`);
        if (res.data.code == 200) {
          if (res.data.code == 200) {
            let list = res.data.result.songs;
            this.resultList = list;
            console.log(this.resultList, "搜索歌曲列表");
            this.$nextTick(() => {
              this.initBetterScroll();
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    clearContent() {
      this.content = "";
    },
    goRankDetail(id) {
      console.log(id);
      this.$router.push({
        path: `/searchRank/${id}`
      });
    }
  },
  watch: {
    content(old) {
      //监听content
      if (this.content != "") {
        this.boxFlag = true;
        this.getResult();
        this.getResultList();
      } else {
        this.boxFlag = false;
      }
    }
  }
};
</script>
 
<style lang="scss" scoped>
p,
ul {
  margin: 0;
}
.body {
  height: 100%;
  overflow: hidden;
}
.search {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  .search-header {
    width: 100%;
    height: 56px;
    // padding: 15px;
    font-size: 20px;
    background: #d44439;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      flex: 0 0 50px;
      text-align: center;
    }
    .inp {
      flex: 1;
      input {
        height: 30px;
        width: 100%;
        background: #d44439;
        outline: none;
        border: 0;
        font-size: 18px;
      }
    }
    .right {
      flex: 0 0 50px;
      text-align: center;
    }
  }
  .hot-search {
    padding: 15px;
    height: 100%;
    border-bottom: 1px solid lightgray;
    ul {
      display: flex;
      flex-flow: row wrap;
      align-content: flex-start;
      height: 100%;
      li {
        font-size: 15px;
        font-weight: 500;
        padding: 3px;
        margin-top: 5px;
        border: 1px solid lightgray;
        border-radius: 5px;
        margin-left: 10px;
      }
    }
  }
}
.search-result {
  position: relative;
  width: 100%;
  padding: 5px;
  bottom: 0;
  .search-suggest {
    .title {
      padding: 8px 20px;
    }
  }
  .search-suggest-item {
    padding: 8px 20px;
    display: flex;
    overflow: hidden;
    .img {
      flex: 0 0 60px;
    }
    .text {
      flex: 1;
      p {
        width: 50%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .suggest-list {
    .suggest-item {
      border-top: 1px solid lightgray;
      padding: 8px 20px;
      .song {
        font-size: 15px;
        font-weight: 500;
      }
      .singe {
        font-size: 13px;
      }
    }
  }
}
</style>