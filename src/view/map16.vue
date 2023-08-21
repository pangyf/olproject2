<template>
    <div>
        图片的宽度和高度
        <div id="map" style="width: 700px;height: 400px;">
            <div id="popup"></div>
        </div>
        <div class="controls">
            <div style="margin: 1em 0;">
                <label for="width">Width:</label>
                <input id="width-input" name="width" type="number" value="40">
                <button id="clear-width-button">clear</button>
            </div>
            <div style="margin: 1em 0;">
                <label>Height:</label>
                <input id="height-input" name="height" type="number" value="40">
                <button id="clear-height-button">clear</button>
            </div>
            <div style="margin: 1em 0;">
                <label for="height">Scale approx.:</label>
                <span id="scale"></span>
            </div>
        </div>
    </div>
</template>
<script>
import { Feature } from 'ol';
import {Map,View } from 'ol';
import { Point } from 'ol/geom';
import VectorSource from 'ol/source/Vector';
import { Icon,Style } from 'ol/style';
import { Vector as VectorLayer } from 'ol/layer';
import TileLayer from 'ol/layer/Tile';
import { TileJSON } from 'ol/source';
export default {
    data(){
        return{

        }
    },
    mounted(){
        const widthInput = document.getElementById('width-input')
        const heightInput = document.getElementById('height-input')
        const clearWidthButton = document.getElementById('clear-width-button')
        const clearHeightButton = document.getElementById('clear-height-button')
        const scaleSpan = document.getElementById('scale')

        const iconFeature = new Feature({
            geometry:new Point([0,0]),
            name:'Null Island',
            population:4000,
            rainfall:500
        })
        let img = require('../assets/logo.png')
        const iconStyle = new Style({
            image: new Icon({
                src:img,
                width:widthInput.value,
                height:heightInput.value
            })
        })
        iconFeature.setStyle(iconStyle)

        const image = iconStyle.getImage().getImage()
        image.addEventListener('load',() => {
            scaleSpan.innerHTML = this.formatScale(iconStyle.getImage().getScale())
        })

        widthInput.addEventListener('input',(event)=> {
            const currentIcon = iconStyle.getImage()
            let img = require('../assets/logo.png')
            iconStyle.setImage(new Icon({
                src:img,
                width:Number(event.target.value),
                height:currentIcon.getHeight()
                    
            }))
            iconFeature.setStyle(iconStyle)
        })

        heightInput.addEventListener('input',(event) => {
            let currentIcon = iconStyle.getImage()
            let img = require('../assets/logo.png')
            iconStyle.setImage(new Icon({
                src:img,
                width:currentIcon.getWidth(),
                height:Number(event.target.value)
            }))
            iconFeature.setStyle(iconStyle)
        })

        clearWidthButton.addEventListener('click',() => {
            const currentIcon = iconStyle.getImage()
            let img = require('../assets/logo.png')
            iconStyle.setImage(
                new Icon({
                    src:img,
                    height:currentIcon.getHeight()
                })
            )
            iconFeature.setStyle(iconStyle)
            widthInput.value = Math.round(iconStyle.getImage().getWidth())
            scaleSpan.innerText = this.formatScale(iconStyle.getImage().getScale())
            iconFeature.setStyle(iconStyle)

        })

        clearHeightButton.addEventListener('click',() => {
            let currentIcon = iconStyle.getImage()
            let img = require('../assets/logo.png')
            iconStyle.setImage(
                new Icon({
                    src: img,
                    width: currentIcon.getWidth(),
                })
            )
            iconFeature.setStyle(iconStyle)
            heightInput.value = Math.round(iconStyle.getImage().getHeight());
            // iconFeature.setStyle(iconStyle);
        })

        const vectorSource = new VectorSource({
            features:[iconFeature]
        })

        const vectorLayer = new VectorLayer({
            source:vectorSource
        })

        // const rasterLayer = new TileLayer({
        //     source: new TileJSON({
        //         url:'https://a.tiles.mapbox.com/v3/aj.1x1-degrees.json?secure=1',
        //         crossOrigin:""
        //     })
        // })

        const map =   new Map({
            layers:[vectorLayer],
            target:'map',
            view :new View({
                center:[0,0],
                zoom:3
            })
        })

        map.on('rendercomplete',()=> {
            debugger
            console.log('iconStyle.getImage().getScale()')
            console.log(iconStyle.getImage().getScale())
            scaleSpan.innerText = this.formatScale(iconStyle.getImage().getScale())
        })
        
    },
    methods:{
        formatScale(scale){
            console.log('scale')
            console.log(scale)
            return Array.isArray(scale) ? '[' + scale?.map((v) => v.toFixed(2)).join(',') + ']' :scale
        }
    }
}
</script>
<style scoped>

</style>