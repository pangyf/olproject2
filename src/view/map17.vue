<template>
  <div>
    图层卷帘操作
    <div id="map" style="width: 700px; height: 400px"></div>
    <input id="swipe" type="range" style="width: 100%" />
  </div>
</template>
<script>
import { View, Map } from "ol";
import { OSM } from "ol/source";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { getRenderPixel } from "ol/render";
export default {
  data() {
    return {};
  },
  mounted() {
    const osm = new TileLayer({
      source: new OSM(),
    });

    const key = "Get your own API key at https://www.maptiler.com/cloud/";
    const attributions =
      '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
      '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

    const aerial = new TileLayer({
      source: new XYZ({
        attributions: attributions,
        url:
          "https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=" + key,
        maxZoom: 20,
      }),
    });

    const map = new Map({
      layers: [osm, aerial],
      target: "map",
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    const swipe = document.getElementById("swipe");
    aerial.on("prerender", function (event) {
      debugger;
      const ctx = event.context;
      const mapSize = map.getSize();
      console.log("mapSize");
      console.log(mapSize);
      const width = mapSize[0] * (swipe.value / 100);
      console.log(width);
      console.log(swipe.value);

      const tl = getRenderPixel(event, [width, 0]);
      const tr = getRenderPixel(event, [mapSize[0], 0]);
      const bl = getRenderPixel(event, [width, mapSize[1]]);
      const br = getRenderPixel(event, mapSize);

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(tl[0], tl[1]);
      ctx.lineTo(bl[0], bl[1]);
      ctx.lineTo(br[0], br[1]);
      ctx.lineTo(tr[0], tr[1]);
      ctx.closePath();
      ctx.clip();
    });
    // aerial.on('postrender',function(event){
    //     const ctx = event.context
    //     ctx.restore()
    // })
  },
  methods: {},
};
</script>
<style scoped>
</style>