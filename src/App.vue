<template>
  <div id="app">
     <!-- <keep-alive> -->
      <router-view></router-view>
    <!-- </keep-alive> -->
  
    <Player v-show="this.getPlayPage"/>
   <BottomSidebar/>
  </div>
</template>
<script>
import {mapGetters} from "vuex"
import BottomSidebar from "./components/BottomSidebar/BottomSidebar"
import Player from "./views/Player"
export default {
    name:"App",
    components:{
      Player,
    BottomSidebar
    },
    computed: {
      ...mapGetters(["getPlayPage"])
    },
}
</script>
<style>
#app {
  font-family: PingFang SC,STHeitiSC-Light,Helvetica-Light,arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
