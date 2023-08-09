<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div class="container-wrap">
      <div class="left">
        <ul>
          <li @click="goTo('map1')">无障碍地图1</li>
          <li @click="goTo('map2')">无障碍地图2</li>
          <li @click="goTo('map3')">无障碍地图3</li>
          <li @click="goTo('map4')">高级MapBox矢量切片</li>
          <li @click="goTo('map5')">地震集群</li>
          <li @click="goTo('map6')">地图属性控件</li>
          <li @click="goTo('map7')">要素聚类</li>
          <li @click="goTo('map8')">鹰眼服务</li>
          <li @click="goTo('map10')">自定义多边形样式</li>
          <li @click="goTo('map11')">绘制并修改要素</li>
        </ul>
        
      </div>
      <div class="right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: "App",
  // components: {
  //   HelloWorld
  // }
  data() {
    return {};
  },
  methods: {
    goTo(value) {
      switch (value) {
        case "map1":
          this.$router.push("/");
          break;
        case "map2":
          this.$router.push("/map2");
          break;
        case "map3":
          this.$router.push("/map3");
          break;
        case "map4":
          this.$router.push("/map4");
          break;
        case "map5":
          this.$router.push("/map5");
          break;
        case "map6":
          this.$router.push("/map6");
          break;
        case "map7":
          this.$router.push("/map7");
          break;
        case 'map8':
          this.$router.push('/map8')
          break;
        case 'map10':
          this.$router.push('/map10')
          break
          case 'map11':
          this.$router.push('/map11')
          break;
        default:
      }
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.ol-overviewmap-map{
    border: 1px solid #7b98bc;
    height: 150px!important;
    margin: 2px;
    width: 150px;
}
.container-wrap {
  display: flex;
  justify-content: flex-start;
}
.container-wrap .left {
  width: 15%;
  flex: 1;
}
.container-wrap .right {
  width: 85%;
}
ul li {
  list-style: none;
  width: 100px;
  margin-bottom: 10px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
