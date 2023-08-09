<template>
    <div>
        <div id="map" style="width: 700px;height: 400px;"></div>
    </div>
</template>
<script>
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import {OverviewMap, defaults as defaultControls} from 'ol/control.js';
export default {
    data(){
        return{

        }
    },
    mounted(){
        const source = new OSM()

        const overviewMapControl = new OverviewMap({
            layers:[
                new TileLayer({
                    source:source
                })
            ],
            collapsed:false
        })

        const map = new Map({
            controls:defaultControls().extend([overviewMapControl]),
            layers:[
                new TileLayer({
                    source:source
                })
            ],
            target:'map',
            view: new View({
                center:[500000, 6000000],
                zoom:7
            })
        })
    }
}
</script>
<style scoped>

</style>