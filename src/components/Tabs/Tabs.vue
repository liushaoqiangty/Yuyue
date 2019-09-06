 <template>
  <div class="tabs-header">
    <van-tabs  v-model="activeName">
      <van-tab :title="'推荐'">
       <Recommend/>
       
      </van-tab>
      <van-tab :title="'排行'">
        <div class="box">
          <Ranking/>
        </div>
      </van-tab>
      <van-tab :title="'歌手'">
        <div class="box">
          <Singer/>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
 
 <script>
import Recommend from "../Recommend/Recommend"
import Singer from "../Singer/Singer"
import Ranking  from "../RankingList/Ranking"
export default {
  name: "Tabs",
  data() {
    return {
      activeName: 'a'
      
    };
  },
  methods: {
    callback(key) {
      console.log(key);
    }
  },
  components: {
    Recommend,
    Singer,
    Ranking
  }
};
</script>
 
<style lang="scss" scoped>

</style>

