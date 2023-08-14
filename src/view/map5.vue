<template>
  <div class="container2">
    地震集群
    <div id="map" style="width: 700px; height: 400px"></div>
  </div>
</template>

<script>
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Cluster from "ol/source/Cluster";
import GeoJSON from "ol/format/GeoJSON";
import { Style, Circle, Fill, Stroke, Text } from "ol/style";
import { createEmpty, extend, getWidth, getHeight } from "ol/extent";
import Map from "ol/Map";
import View from "ol/View";
import OSM from "ol/source/OSM";
import { Tile } from "ol/layer";
import XYZ from "ol/source/XYZ";
import { fromLonLat } from "ol/proj";

export default {
  data() {
    return {
      map: null,
      controller: null,

      maxFeatureCount: "",
      earthquakeCluster: null,

      currentResolution: "",

      map: null,
    };
  },
  mounted() {
    //聚类图层
    this.earthquakeCluster = new VectorLayer({
      source: new Cluster({
        distance: 80, // 聚类阈值，当两点间距离小于80，便聚类为一个点
        source: new VectorSource({
          format: new GeoJSON(),
          url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",
        }),
      }),
      style: this.styleFunction,
    });
    this.map = new Map({
      target: "map",
      layers: [
        new Tile({
          source: new XYZ({
            url: "http://{a-c}.tile.openstreetmap.de/{z}/{x}/{y}.png",
          }),
        }),
      ],
      view: new View({
        center: fromLonLat([118, 36]),
        zoom: 2,
      }),
    });
    this.map.addLayer(this.earthquakeCluster);
  },
  methods: {
    calculateClusterInfo(resolution) {
      this.maxFeatureCount = 0;
      let features = this.earthquakeCluster.getSource().getFeatures();
      let feature, radius;
      for (let i = features.length - 1; i >= 0; i--) {
        feature = features[i];
        let originalFeatures = feature.get("features");//获取每个聚类下面的feature
        let extent = createEmpty();
        let j = void 0,
          jj = void 0;
        for (let j = 0, jj = originalFeatures.length; j < jj; ++j) {
          extend(extent, originalFeatures[j].getGeometry().getExtent());
        }
        this.maxFeatureCount = Math.max(this.maxFeatureCount, jj);
        radius = (0.15 * (getWidth(extent) + getHeight(extent))) / resolution;
        feature.set("radius", radius);
      }
    },
    styleFunction(feature, resolution) {
      if (resolution != this.currentResolution) {
        this.calculateClusterInfo(resolution);
        this.currentResolution = resolution;
      }
      let style;
      let size = feature.get("features").length;//获取每个聚类下面的feature要素
      if (size > 1) {
        style = new Style({
          image: new Circle({
            radius: feature.get("radius"),
            fill: new Fill({
              color: [255, 153, 0],
            }),
          }),
          text: new Text({
            text: size.toString(),
            fill: new Fill({
              color: "#fff",
            }),
            stroke: new Stroke({
              color: "rgba(0, 0, 0, 0.6)",
              width: 3,
            }),
          }),
        });
      } else {
        // 每个地震点的默认样式
        style = new Style({
          image: new Circle({
            radius: 3,
            fill: new Fill({
              color: "rgb(255, 0, 0)",
            }),
          }),
        });
      }
      return style;
    },
  },
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
}
.container2{
  width: 800px;
  height: 600px;
}

</style>