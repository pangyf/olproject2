<template>
    <div>
        4326投影
        <div id="map" style="width: 700px; height: 400px;"></div>
    </div>
</template>
<script>
import Map from 'ol/Map'
import TileLayer from 'ol/layer/Tile';
import { TileWMS } from 'ol/source';
import { View } from 'ol';
import { ScaleLine,defaults as defaultControls } from 'ol/control';
export default {
    data(){
        return {

        }
    },
    mounted(){
        const layers = [
            new TileLayer({
                source:new TileWMS({
                    url:'https://ahocevar.com/geoserver/wms',
                    params :{
                        'LAYERS':'ne:NE1_HR_LC_SR_W_DR',
                        'TILED':true
                    }
                })
                
            })
        ]
        const map = new Map({
            controls:defaultControls().extend([
                new ScaleLine({
                    units:'degrees'
                })
            ]),
            layers:layers,
            target:'map',
            view:new View({
                projection:'EPSG:4326',
                center:[0,0],
                zoom:2
            })
        })
    }
}
</script>
<style scoped>

</style>