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
.container-wrap {
  display: flex;
  justify-content: flex-start;
}
.container .left {
  width: 150px;
  flex: 1;
}
.container .right {
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
