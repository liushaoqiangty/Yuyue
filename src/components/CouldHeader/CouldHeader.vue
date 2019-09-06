 <template>
  <div class="could-header">
    <div class="left" type="primary" @click="showPopup">
      <!-- <van-button type="primary" @click="showPopup"> -->
        <span class="fa fa-bars"></span>
      <!-- </van-button> -->
    </div>

    <div class="content">网易云音乐</div>
    <div class="right">
      <router-link to="/search" tag="span">
        <span class="fa fa-search"></span>
      </router-link>
    </div>
    <!-- :overlay-style="{opacity:'0.4'}" -->
    <van-popup v-model="show" position="left" get-container="#app">
      <div class="cover-content">
        <div class="head-portrait">
          <img
            src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1567596722&di=60e9ffabf5b6a13f705045f425499bd0&src=http://g.hiphotos.baidu.com/zhidao/pic/item/5bafa40f4bfbfbed0d91490f7bf0f736aec31ff1.jpg"
            alt
          />
        </div>
        <div class="name">在心里面</div>
        <div class="favorite">
          我的喜欢
        </div>
      </div>
    </van-popup>
  </div>
</template>
 
 <script>
export default {
  name: "CouldHeader",
  data() {
    return {
      show: false
    };
  },
  methods: {
    showPopup() {
      this.show = !this.show;
    }
  },
  components:{
   
  }
};
</script>
 
 <style lang="scss" scoped>
.could-header {
  width: 100%;
  height: 56px;
  padding: 15px;
  font-size: 20px;
  background: #d44439;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.van-popup--left {
  background: #f0f0f0;
  width: 80%;
  height: 100%;
  .cover-content {
    width: 100%;
    height: 100%;
    padding: 20px 15px;
    div{
      // margin-top: 10px;
      padding: 10px;
      border-bottom: 1px solid lightgray;
    }
    .head-portrait {
      // width: 80px;
      // height: 80px;
      // overflow: hidden;
      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
    }
    .name{
      font-size: 20px;
      font-weight: 500;
    }
    .favorite{
      font-size: 20px;
      font-weight: 500;
    }
  }
}
</style>
