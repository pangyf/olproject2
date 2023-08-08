/*
* @Author: 大剑师兰特（xiaozhuanlan） ,还是大剑师兰特（CSDN）
* @此源代码版权归大剑师兰特所有，可供学习或商业项目中借鉴，未经授权，不得重复度过高（超过60%）地发表到博客、论坛，问答，git等公共空间或网站中。
* @Email: 2909222303@qq.com
* @First published in xiaozhuanlan.com
* @Second published in CSDN
* @First published time: 2022-11-10
*/

<template>
    <div class="container">
        <h3>vue+openlayers：利用XYZ等方法，解决国内openstreetmap地图加载不出来的问题</h3>
        <p>大剑师兰特, 还是大剑师兰特</p>
        <div id="vue-openlayers" ></div>
    </div>
</template>

<script>
    import 'ol/ol.css';
    import {Map,View} from 'ol'
    import {Tile as TileLayer} from 'ol/layer'
    import {XYZ} from 'ol/source';
	
export default {
  data() {
    return {
        map:null,
    };
  },
  

  methods:{
// 初始化地图     
    initMap(){      
      let osmLayer = new TileLayer({
        source: new XYZ({
          url: 'http://{a-c}.tile.openstreetmap.de/{z}/{x}/{y}.png'
        }),
        zIndex:1
      });

      this.map= new Map({
              target: "vue-openlayers",
              layers: [
                  osmLayer,
              ],
              view: new View({
                  projection: "EPSG:4326",
                  center: [116.389,39.903],
                  zoom: 8
              }),
            })

      },
  },  
  mounted() {
    console.log(1)
    debugger
            this.initMap()
          }
      }

</script>
<style scoped>
    .container{
        width: 840px;
        height: 570px;
        margin: 50px auto;
        border: 1px solid #42B983;
    }
    #vue-openlayers {
        width: 800px;
        height: 450px;
        margin: 0 auto;
        border: 1px solid #42B983;
        position: relative;
    }
</style>