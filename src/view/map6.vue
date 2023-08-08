<template>
    <div>
        地图属性控件
        <div id="map" style="width: 500px;height: 500px;"></div>
    </div>
</template>
<script>
import Map from 'ol/Map'
import {XYZ} from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import { View } from 'ol';
import { Attribution,defaults as defaultControls } from 'ol/control.js';

export default {
    data(){
        return{
            attribution:'',
            map:null,
        }
    },
    mounted(){
        this.attribution =  new Attribution({
            collapsed:false
        })
        this.map = new Map({
            layers:[
                new TileLayer({
                    source:new XYZ({
                        url:'http://{a-c}.tile.openstreetmap.de/{z}/{x}/{y}.png'
                    })
                })
            ],
            controls:defaultControls({
                attribution:false
            }).extend([this.attribution ]),
            target:'map',
            view:new View({
                center:[0,0],
                zoom:2
            })
        })
        window.addEventListener('resize',this.checkSize())
    },
    methods:{
        checkSize(){
            const small = this.map.getSize()[0] < 600
            this.attribution.setCollapsible(small)
            this.attribution.setCollapsed(small)
        }
    }
}
</script>