<template>
    <div>
        地震数据热力图展示
        <div id="map" style="width: 700px;height: 400px;"></div>
        <form>
            <label for="radius">radius size</label>
            <input id="radius" type="range" min="1" max="50" step="1" value="5">
            <label for="blur">blur size</label>
            <input id="blur" type="range" min="1" max="5" step="1" value="15">
        </form>
    </div>
</template>
<script>
import KML from 'ol/format/KML'
import Map from 'ol/Map'
import { Stamen } from 'ol/source'
import VectorSource from 'ol/source/Vector'
import { View } from 'ol'
import { Heatmap as HeatmapLayer, Tile as TileLayer } from 'ol/layer'
import GeoJSON from 'ol/format/GeoJSON'
export default {
    data(){
        return {

        }
    },
    mounted(){
        const blur = document.getElementById('blur')
        const radius = document.getElementById('radius')

        const vector = new HeatmapLayer({
            source: new VectorSource({
                url:'./assets/earthquake.json',
                format: new GeoJSON()
            }),
            blur:parseInt(blur.value,10),
            radius:parseInt(radius.value,10),
            weight:function(feature){
                const name = feature.get('place')
                const magnitude = feature.get('mag')
                return magnitude - 5
            }
        })

        const raster = new TileLayer({
            source: new Stamen({
                layer:'toner'
            })
        })

        new Map({
            layers:[raster,vector],
            target:'map',
            view: new View({
                center:[0,0],
                zoom:2
            })
        })

    }
}
</script>
<style scoped>

</style>