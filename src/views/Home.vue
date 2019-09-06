<template>
  <div class="home">
    <CouldHeader />
    <Tabs />
 
  </div>
</template>

<script>
import axios from "axios"
import CouldHeader from "../components/CouldHeader/CouldHeader";
import Tabs from "../components/Tabs/Tabs";
export default {
  name: "home",
  data() {
    return {
      recommend: null,
      seller: {}
    };
  },
  mounted() {
    this.getSellerData();
  },
  methods: {
    async getSellerData() {
      try {
        var url = "/personalized";
        let res = await this.$http("http://47.100.48.11:4000" + url);
        res = res.data;
        this.recommend = res;
      } catch (error) {
        console.log(error);
      }
    }
    // getSellerData(){
    //       var url = "/banner"; //这里是拼接url
    //   return axios
    //     .get("http://47.100.48.11:4000" + url) // 这里就是刚才的config/index.js中的/api
    //     .then(res => {
    //       if (res.status == 200) {
    //         console.log(res);
            
  
    //       }
    //     })
    //     .catch(function(error) {
    //       console.log(error);
    //     });
    // }
  },
  components: {
    CouldHeader,
    Tabs
  }
};
</script>
