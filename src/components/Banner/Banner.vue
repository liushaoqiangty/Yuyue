 <template>
  <div>
    <a-carousel autoplay>
      <div class="banner"  v-for="(item,index) in banner" :key="index">
        <ul>
          <li class="banner-item">
            <img class="img" :src="item.imageUrl" alt />
          </li>
        </ul>
      </div>
    </a-carousel>
  </div>
</template>
 
 <script>
export default {
  name: "Banner",
  data() {
    return {
      banner: {}
    };
  },

  mounted() {
    this.getSellerData();
  },
  methods: {
    async getSellerData() {
      try {
        var url = "/banner";
        let res = await this.$http("http://47.100.48.11:4000" + url);
        res = res.data;
        // console.log(res.banners);
        this.banner = res.banners;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
 
<style lang="scss">
.banner {
  width: 100%;
  height: 166px;
  padding: 5px;
  // position: relative;
  overflow: hidden;

  ul {
    width: 100%;
    position: relative;
    .banner-item {
      position: absolute;
      width: 100%;
      float: left;

      .img {
        width: 100%;
        height: 166px;
      }
    }
  }
}

 .ant-carousel >>> .slick-slide {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
</style>