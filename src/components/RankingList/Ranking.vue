 <template>
  <div class="ranking" ref="rank">
    <ul>
      <li
        class="ranking-content"
        v-for="item in rankList"
        :key="item.id"
        @click="goDetail(item.id)"
      >
        <div class="img">
          <img width="100" height="100" v-lazy="item.coverImgUrl" alt />
        </div>
        <div class="singList">
          <p class="song" v-for="(item,index) in item.top" :key="index">
            {{index+1}}.
            <span>{{ item.name }} -</span>
            <span>{{ item.ar[0].name }}</span>
            <span v-if="item.ar[1]">/{{item.ar[1].name}}</span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>
 <script>
import BScroll from "better-scroll";
import getRankList from "../../api/rank";
const LIST = [0, 1, 2, 3, 4, 22, 23];
export default {
  name: "Ranking",
  data() {
    return {
      rankList: []
    };
  },
  mounted() {
    for (let i = 0; i < LIST.length; i++) {
      this.getSellerData(LIST[i]).then(res => {
        let list = res.data.playlist;
        list.top = res.data.playlist.tracks.slice(0, 3);
        this.rankList.push(list);
      });
    }
    console.log(this.rankList);
    this.$nextTick(() => {
      this.initBetterScroll();
    });
  },
  methods: {
    async getSellerData(id) {
      try {
        var url = `/top/list?idx=${id}`;
        return await this.$http("http://47.100.48.11:4000" + url);
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
    goDetail(id){
      this.$router.push(`/rank/${id}`)
    }
  }
};
</script>
 
<style lang="scss" scoped>
.ranking {
  padding: 0px 15px;
  max-height: 700px;
  overflow: hidden;

  .ranking-content {
    display: flex;
    padding: 5px 0;
    border-bottom: 1px solid #e4e4e4;
    .img {
      img {
        border-radius: 10px;
      }
    }
    .singList {
      margin-top: 5px;
      margin-left: 25px;
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      p {
      }
    }
  }
}
</style>