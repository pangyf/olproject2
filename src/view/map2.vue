<template>
    <div class="wrapper">
      无障碍地图2
      <!-- <a class="skiplink" href="#map">Go to map</a> -->
      <div id="map" ref="map" tabindex="0"></div>
      <div class="handle">
        <el-button class="zoom-out" @click="zoomOut">缩小</el-button>
        <el-button class="zoom-in" @click="zoomIn">放大</el-button>
      </div>
    </div>
  </template>
  
  <script>
  import { Map, View } from 'ol';
  import { Tile as TileLayer } from 'ol/layer';
  import { fromLonLat } from 'ol/proj';
  import { OSM } from 'ol/source';
  
  export default {
    name: "MapView",
    data() {
      this.map = null;
      return {
  
      };
    },
    mounted() {
      this._createBasemap();
    },
    methods: {
      /**
       * 创建底图
       */
      _createBasemap() {
        const layer = new TileLayer({
          source: new OSM(),
        })
  
        const mapView = new View({
          center: fromLonLat([113.918, 35.308]),
          zoom: 8,
        });
  
        this.map = new Map({
          target: this.$refs.map,
          layers: [layer],
          view: mapView,
        });
      },
      zoomOut() {
        const view = this.map.getView();
        const zoom = view.getZoom();
        view.setZoom(zoom - 1);
      },
      zoomIn() {
        const view = this.map.getView();
        const zoom = view.getZoom();
        view.setZoom(zoom + 1);
      },
    },
  }
  </script>
  
  <style lang="scss" scoped>
  .wrapper {
    height: 100%;
    margin: 0;
    padding: 0;
    text-align: center;
  
    a.skiplink {
      display: inline-block;
      background-color: white;
      padding: 10px;
      margin-top: 10px;
    }
  
    #map {
      width: 60%;
      height: 60%;
      margin: 20px auto;
      padding: 0;
      border: 3px solid transparent;
  
      &:focus{
        border: 3px solid red;
      }
    }
  
    .handle {
      margin: 30px auto;
    }
  }
  </style>
  