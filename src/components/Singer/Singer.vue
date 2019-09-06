 <template>
  <div class="include" ref="rank">
    <!-- <div v-for="(item) in singerList" class="item" :key="item.title"> -->
    <div class="singer">
      <van-index-bar highlight-color="red" :index-list="AAA" class="aaa">
        <!-- <div class="include" ref="rank">
        <div>-->
        <div v-for="(group, index) in singerList" :key="index" ref="listGroup">
          <van-index-anchor class="title" :index="group.title">{{ group.title }}</van-index-anchor>
          <div
            class="content"
            v-for="item in group.items"
            :key="item.id"
            @click="goDetail(item.id)"
          >
            <div>
              <img v-lazy="item.avatar" class="avatar" />
              <span class="name">{{ item.name }}</span>
            </div>
          </div>
          <!-- </div>
          </div>-->
        </div>
      </van-index-bar>
    </div>
  </div>
</template>
 
 <script>
// import pinyin from "../../../node_modules/js-pinyin/index";
import BScroll from "better-scroll";
import Singer from "../../common/js/singer";
const pinyin = require("pinyin");
const HOT_NAME = "热";
const HOT_SINGERS = 10;
export default {
  data() {
    return {
      singerList: null,
      AAA: []
    };
  },
  created() {},
  mounted() {
    //   this.onLoad()
    this.getSellerData();
  },
  methods: {
    async getSellerData() {
      try {
        var url = "/top/artists?limit=100";
        let res = await this.$http("http://47.100.48.11:4000" + url);
        // res=res.data
        let list = res.data.artists;
        // console.log(list)
        list.map(item => {
          let py = pinyin(item.name[0], {
            style: pinyin.STYLE_FIRST_LETTER
          });
          item.initial = py[0][0].toUpperCase();
        });
        this.singerList = this.normalizeSinger(list);
        this.$nextTick(() => {
          // this.initBetterScroll();
        });
        // console.log(this.singerList);
        this.singerList.forEach(item => {
          this.AAA.push(item.title);
        });
      } catch (error) {
        console.log(error);
      }
    },
    initBetterScroll() {
      if (this.menuScroll) {
        this.menuScroll.refresh();
      } else {
        this.menuScroll = new BScroll(this.$refs.rank, {
          click: true ///允许点击页面
        });
      }
    },
    normalizeSinger(list) {
      //数据格式
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      };
      list.forEach((item, index) => {
        if (index < HOT_SINGERS) {
          map.hot.items.push(
            new Singer({
              id: item.id,
              name: item.name,
              avatar: item.img1v1Url,
              aliaName: item.alias.join(" / "),
              picId: item.img1v1Id
            })
          );
        }

        const key = item.initial;
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          };
        }
        map[key].items.push(
          new Singer({
            id: item.id,
            name: item.name,
            avatar: item.img1v1Url,
            aliaName: item.alias[0]
          })
        );
      });
      let hot = [];
      let ret = [];
      for (const key in map) {
        let val = map[key];
        if (val.title.match(/[A-Z]/)) {
          ret.push(val);
        } else if (val.title === HOT_NAME) {
          hot.push(val);
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      return hot.concat(ret);
    },
    goDetail(card) {
      console.log(card)
      this.$router.push({path:`/singer/${card}`});
    }
  }
};
</script>
 
<style lang="scss" scoped>
//  .singer .van-index-bar__sidebar{
//     background: rgba(166, 166, 166, 0.5)
//   }
.include {
  // max-height: 700px;
  // overflow: hidden;
}
.singer {
  font-weight: 700;

  .title {
    background: rgba(0, 0, 0, 0.1);
  }
  .content {
    width: 100%;
    height: 61px;
    padding: 5px;
    line-height: 51px;

    div {
      border-bottom: 1px solid #e4e4e4;
      // margin-bottom: 7px;
      padding-bottom: 5px;
    }
    img {
      width: 50px;
      height: 50px;
      border-radius: 5px;
    }
    span {
      margin-left: 15px;
    }
  }
}

// .aaa > span.van-index-bar__index {
//   background: #059;
// }
</style>