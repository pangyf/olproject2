<template>
  <div>
    鹰眼服务
    <div id="map" class="map"></div>
    <div>
      <label>
        <input type="checkbox" id="rotateWithView" />Rotate with view
      </label>
    </div>
  </div>
</template>
<script>
import Map from 'ol/Map'
import { OSM } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import { View } from 'ol';
import {DragRotateAndZoom, defaults as defaultInteractions} from 'ol/interaction'
import { OverviewMap, defaults as defaultControls } from 'ol/control';
export default {
    data(){
        return{

        }
    },
    mounted(){
        const rotateWithView = document.getElementById('rotateWithView')

        const overviewMapControl = new OverviewMap({
            // className:'ol-overviewmap ol-custom-overviewmap',
            layers:[
                new TileLayer({
                    source: new OSM()
                })
            ],
            // collapseLabel:'\u00BB',
            // label:'\u00AB',
            collapsed:false
        })

        // rotateWithView.addEventListener('change', () => {
        //     console.log(this.checked)
        //     overviewMapControl.setRotateWithView(this.checked)
        // })

        const map = new Map({
            // controls:defaultControls().extend([overviewMapControl]),
            // interactions:defaultInteractions().extend([new DragRotateAndZoom()]),

            layers:[
                new TileLayer({
                    source:new OSM()
                })
            ],
            target:'map',
            view: new View({
                center:[500000, 6000000],
                zoom:7
            })
        })
        map.addControl(overviewMapControl)
    },
    methods:{

    }
};
</script>
<style scoped>
.ol-overviewmap-map{
    border: 1px solid #7b98bc;
    height: 150px!important;
    margin: 2px;
    width: 150px;
}
.map {
  width: 100%;
  height: 400px;
}

/* .map .ol-custom-overviewmap,
.map .ol-custom-overviewmap.ol-uncollapsible {
  bottom: auto;
  left: auto;
  right: 0;
  top: 0;
}

.map .ol-custom-overviewmap:not(.ol-collapsed) {
  border: 1px solid black;
}

.map .ol-custom-overviewmap .ol-overviewmap-map {
  border: none;
  width: 300px;
}

.map .ol-custom-overviewmap .ol-overviewmap-box {
  border: 2px solid red;
}

.map .ol-custom-overviewmap:not(.ol-collapsed) button {
  bottom: auto;
  left: auto;
  right: 1px;
  top: 1px;
}

.map .ol-rotate {
  top: 170px;
  right: 0;
} */
</style>