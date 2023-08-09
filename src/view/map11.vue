<template>
    <div>
        绘制要素
        <div id="map" style="width: 700px;height: 400px;"></div>
        <el-form>
            <el-form-item label="Geometry type">
                <el-select v-model="Priority" @change="handleChange" placeholder="请选择">
                    <el-option label="Point" value="Point"></el-option>
                    <el-option label="LineString" value="LineString"></el-option>
                    <el-option label="Polygon" value="Polygon"></el-option>
                    <el-option label="Circle" value="Circle"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import Map from 'ol/Map'
import { View } from 'ol';
import { Draw,Modify,Snap } from 'ol/interaction';
import { OSM,Vector as VectorSource } from 'ol/source';
import { Tile as TileLayer,Vector as VectorLayers } from 'ol/layer';
import {get} from 'ol/proj.js'
export default {
    data(){
        return {
            Priority:'Point',
            source:'',
            map:'',
            draw:'',
            snap:''
        }
    },
    mounted(){
        const raster = new TileLayer({
            source:new OSM()
        })

        this.source = new VectorSource()

        const vector = new VectorLayers({
            source:this.source,
            style:{
                'fill-color':'rgba(255, 255, 255, 0.2)',
                'stroke-color':'#ffcc33',
                'stroke-width':2,
                'circle-radius':7,
                'circle-fill-color':'#ffcc33'
            }
        })

        const extent = get('EPSG:3857').getExtent().slice()
        extent[0] += extent[0]
        extent[2] += extent[2]
        this.map = new Map({
            layers:[raster,vector],
            target:'map',
            view:new View({
                center:[-11000000, 4600000],
                zoom:4,
                extent
            })
        })

        const modify = new Modify({source:this.source})
        this.map.addInteraction(modify)

        this.addInteractions()
    },
    methods:{
        addInteractions(){
            this.draw = new Draw({
                source:this.source,
                type:this.Priority
            })
            this.map.addInteraction(this.draw)
            this.snap = new Snap({source:this.source})
            this.map.addInteraction(this.snap)
        },
        handleChange(){
            this.map.removeInteraction(this.draw)
            this.map.removeInteraction(this.snap)
            this.addInteractions()
        }
    }
}
</script>
<style scoped>

</style>