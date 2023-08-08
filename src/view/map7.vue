<template>
  <div style="width: 100%; height: 100%" class="">
    要素聚类
    <div id="map" style="width: 800px; height: 600px" class="map"></div>
    <form>
      <div class="form-group">
        <label for="distance" class="col-form-label pb-0"
          >Cluster distance</label
        >
        <input
          id="distance"
          class="form-range"
          type="range"
          min="0"
          max="200"
          step="1"
          value="40"
        />
        <small class="form-text text-muted">
          The distance within which features will be clustered together.
        </small>
      </div>
      <div class="form-group">
        <label for="min-distance" class="col-form-label pb-0"
          >Minimum distance</label
        >
        <input
          id="min-distance"
          class="form-range"
          type="range"
          min="0"
          max="200"
          step="1"
          value="20"
        />
        <small class="form-text text-muted">
          The minimum distance between clusters. Can't be larger than the
          configured distance.
        </small>
      </div>
    </form>
  </div>
</template>
<script>
import Feature from "ol/Feature";
import Map from "ol/Map";
import { Point } from "ol/geom";
import { View } from "ol";
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from "ol/style";
import { Cluster, OSM, XYZ, Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { boundingExtent } from "ol/extent";
export default {
  data() {
    return {
      distanceInput: "",
      minDistanceInput: "",

      source: "",
      clusterSource: "",

      clusters: "",
      raster: "",

      map: "",
    };
  },
  mounted() {
    this.distanceInput = document.getElementById("distance");
    this.minDistanceInput = document.getElementById("min-distance");

    const count = 2000;
    const features = new Array(count);
    const e = 4500000;
    for (let i = 0; i < count; i++) {
      const coordinates = [
        2 * e * Math.random() - e,
        2 * e * Math.random() - e,
      ];
      features[i] = new Feature(new Point(coordinates));
    }

    this.source = new VectorSource({
      features: features,
    });

    this.clusterSource = new Cluster({
      distance: parseInt(this.distanceInput.value, 10),
      minDistance: parseInt(this.minDistanceInput.value),
      source: this.source,
    });

    let styleCache = {};
    this.clusters = new VectorLayer({
      source: this.clusterSource,
      style: function (feature) {
        const size = feature.get("features").length; //获取每个聚类下面的feature要素个数
        let style = styleCache[size];
        if (!style) {
          if (size < 10) {
            style = new Style({
              image: new CircleStyle({
                radius: 10,
                stroke: new Stroke({
                  color: "#fff",
                }),
                fill: new Fill({
                  color: "#3399CC",
                }),
              }),
              text: new Text({
                text: size.toString(),
                fill: new Fill({
                  color: "#fff",
                }),
              }),
            });
            styleCache[size] = style;
          } else if (size >= 10 && size < 100) {
            style = new Style({
              image: new CircleStyle({
                radius: 10,
                stroke: new Stroke({
                  color: "#fff",
                }),
                fill: new Fill({
                  color: "#ff407f",
                }),
              }),
              text: new Text({
                text: size.toString(),
                fill: new Fill({
                  color: "#fff",
                }),
              }),
            });
            styleCache[size] = style;
          } else {
            style = new Style({
              image: new CircleStyle({
                radius: 10,
                stroke: new Stroke({
                  color: "#fff",
                }),
                fill: new Fill({
                  color: "#22de1e",
                }),
              }),
              text: new Text({
                text: size.toString(),
                fill: new Fill({
                  color: "#fff",
                }),
              }),
            });
            styleCache[size] = style;
          }
        }
        return style;
      },
      zIndex: 2,
    });

    this.raster = new TileLayer({
      source: new XYZ({
        url: "http://{a-c}.tile.openstreetmap.de/{z}/{x}/{y}.png",
      }),
      zIndex: 1,
    });

    this.map = new Map({
      layers: [this.raster, this.clusters],
      target: "map",
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });
    this.distanceInput.addEventListener("input", () => {
      console.log("this.clusterSource");
      console.log(this.clusterSource);
      this.clusterSource.setDistance(parseInt(this.distanceInput.value, 10));
    });
    this.minDistanceInput.addEventListener("input", () => {
      this.clusterSource.setMinDistance(parseInt(this.minDistanceInput.value));
    });
    this.map.on("click", (e) => {
      this.clusters.getFeatures(e.pixel).then((clickedFeatures) => {
        console.log("clickedFeatures");
        console.log(clickedFeatures);
        if (clickedFeatures.length) {
          const features = clickedFeatures[0].get("features");
          console.log("features.length");
          console.log(features.length);
          if (features.length > 1) {
            const extent = boundingExtent(
              features.map((r) => r.getGeometry().getCoordinates())
            );
            console.log("extent");
            console.log(extent);
            this.map.getView().fit(extent, {
              duration: 1000,
              padding: [50, 50, 50, 50],
            });
          }
        }
      });
    });
  },
  methods: {},
};
</script>
<style scoped>
</style>