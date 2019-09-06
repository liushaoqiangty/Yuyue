 <template>
  <div class="recommendBox" ref="list">
    <div>
      <!-- <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"> -->
      <Banner />
      <div class="container">
        <h1>推荐歌单</h1>

        <div class="content">
          <ul>
            <li v-for="(item,index) in recommend" :key="index" @click="getDetail(item.id)">
              <img v-lazy="item.picUrl" alt />
              <p>{{item.name}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
    <!-- </van-list> -->
  </div>
</template>
 
 <script>
import BScroll from "better-scroll";
import Banner from "../Banner/Banner";

export default {
  name: "Recommend",
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      recommend: null
    };
  },
  mounted() {
    //   this.onLoad()
    this.getSellerData();
  },
  methods: {
    async getSellerData() {
      try {
        var url = "/personalized";
        let res = await this.$http("http://47.100.48.11:4000" + url);
        res = res.data;
        // console.log(res.result);
        this.recommend = res.result;
         this.$nextTick(() => {
        this.initBetterScroll();
      });
      } catch (error) {
        console.log(error);
      }
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
    },
    getDetail(id) {
      // console.log(id)
      this.$router.push({
        path: `/recomend/${id}`
      });
    },
    initBetterScroll() {
      if (this.goodsList) {
        this.goodsList.refresh();
      } else {
        this.goodsList = new BScroll(this.$refs.list, {
          click: true, ///允许点击页面
          probeType: 2 // 滑动探针
        });
        this.goodsList.on("scroll", this.goodsWrapperScroll);
      }
    }
  },
  components: {
    Banner
  }
};
</script>
 
 <style lang="scss" scoped>
 .recommendBox{
   max-height:700px;
   overflow: hidden;
 }
.container {
  // max-height: 600px;
  // overflow: hidden;
  h1 {
    padding: 0 5px 0 5px;
    height: 44px;
    line-height: 44px;
    font-size: 14px;
    font-weight: 700;
    margin: 0;
  }
  .content {
    width: 100%;
    ul {
      display: flex;
      flex-flow: row wrap;
      align-content: flex-start;
      li {
        width: 33.3%;
        height: auto;
        //   float: left;
        padding: 0 5px 0 5px;

        overflow: hidden;
        img {
          width: 100%;
          height: auto;
          border-radius: 10px;
        }
        p {
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
}
</style>