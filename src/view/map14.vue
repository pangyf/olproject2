<template>
    <div>
        飞行要素
        <div id="map" style="width: 700px;height: 400px;"></div>
    </div>
</template>
<script>
import { Feature } from 'ol';
import { LineString } from 'ol/geom';
import Map from 'ol/Map';
import { Stamen } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import { Stroke,Style } from 'ol/style';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { getVectorContext } from 'ol/render';
import { getWidth } from 'ol/extent';
import { Attribution,defaults as defaultControls } from 'ol/control.js';
export default {
    data(){
        return{
            // pointsPerMs : 0.02,
            // style:'',
            // flightsSource:''
        }
    },
    mounted(){
        const pointsPerMs = 0.02

        const tileLayer = new TileLayer({
            source: new Stamen({
                layer: 'toner',
            }),
        });


        const map = new Map({
            layers:[tileLayer],//添加底图
            target:'map',
            view: new View({
                center:[0,0],
                zoom:2
            }),
            controls:defaultControls({
                attribution:false
            })
        })

        const style = new Style({
            stroke:new Stroke({
                color:'#EAE911',
                width:2
            })
        })

        const flightsSource = new VectorSource({
            attributions: 
                'Flight data by' + 
                '<a href="https://openflights.org/data.html">OpenFlights</a>',
            loader:function(){
                const url ="https://openlayers.org/en/latest/examples/data/openflights/flights.json"
                fetch(url).then(function(response){
                    return response.json()
                }).then(function(json){
                    const flightsData = json.flights
                    for(let i = 0; i< flightsData.length; i++){
                        const flight = flightsData[i]
                        const from = flight[0]//开始的点
                        const to = flight[1]//结束的点
                        // create an arc circle between the two locations
                        const arcGenerator = new arc.GreatCircle(
                            {x:from[1],y:from[0]},
                            {x:to[1],y:to[0]}
                        )
                        
                        const arcLine = arcGenerator.Arc(100,{offset:10})

                        const features =[]
                        arcLine.geometries.forEach(function(geometry){
                            const line = new LineString(geometry.coords)
                            line.transform('EPSG:4326','EPSG:3857')

                            features.push(
                                new Feature({
                                    geometry:line,
                                    finished:false
                                })
                            )
                            
                        })
                        // add the features with a delay so that the animation
                        // for all features does not start at the same time
                        addLater(features,i* 50)
                    }
                    //Triggered after a layer is rendered.
                    //等tileLayer图层渲染完后，开始执行动画效果
                    tileLayer.on('postrender',animateFlights)
                })
            }
        })

        const flightsLayer = new VectorLayer({
            source:flightsSource,
            style:function(feature){
                // if the animation is still active for a feature, do not
                // render the feature with the layer style
                if(feature.get('finished')){
                    return style
                }
                return null;
            }
        })
        map.addLayer(flightsLayer)

        const addLater = function(features,timeout){
            window.setTimeout(function(){
                let start = Date.now()
                features.forEach(function(feature){
                    feature.set('start',start)
                    flightsSource.addFeature(feature)
                    const duration = (feature.getGeometry().getCoordinates().length - 1) / pointsPerMs
                    // console.log('duration')
                    // console.log(duration)
                    start += duration
                })
            },timeout)
        }

        const animateFlights = function(event){
            // console.log('event')
            // console.log(event)
            const vectorContext = getVectorContext(event)
            const frameState = event.frameState
            // console.log('frameState')
            // console.log(frameState)
            //Set the rendering style. Note that since this is an immediate rendering API, 
            //any zIndex on the provided style will be ignored.
            vectorContext.setStyle(style)

            const features = flightsSource.getFeatures()
            // console.log('features.length')
            // console.log(features.length)
            for(let i = 0; i< features.length ;i++){
                const feature = features[i]
                if(!feature.get('finished')){
                    // only draw the lines for which the animation has not finished yet
                    const coords = feature.getGeometry().getCoordinates()
                    // console.log('coords.length')
                    // console.log(coords.length)
                    const elapsedTime = frameState.time - feature.get('start')
                    // console.log('elapsedTime')
                    // console.log(elapsedTime)
                    if (elapsedTime > 0){
                        const elapsedPoints = elapsedTime * pointsPerMs

                        if(elapsedPoints >= coords.length){
                            feature.set('finished',true)
                        }

                        const maxIndex = Math.min(elapsedPoints,coords.length)
                        const currentLine = new LineString(coords.slice(0,maxIndex))

                        // animation is needed in the current and nearest adjacent wrapped world
                        const worldWidth = getWidth(map.getView().getProjection().getExtent())
                        const offset = Math.floor(map.getView().getCenter()[0] / worldWidth)

                        // directly draw the lines with the vector context
                        currentLine.translate(offset * worldWidth,0)
                        vectorContext.drawGeometry(currentLine)
                        currentLine.translate(worldWidth,0)
                        vectorContext.drawGeometry(currentLine)

                    }

                }
            }
            map.render()
        }
    },
    methods:{
        // animateFlights(event){
            
        // },
        // addLater(features,timeout){
        //     window.setTimeout(function(){
        //         let start = Date.now()
        //         features.forEach(function(feature){
        //             feature.set('start',start)
        //             this.flightsSource.addFeature(feature)
        //             const duration = (feature.getGeometry().getCoordinates().length - 1) / this.pointsPerMs
        //             start += duration
        //         })
        //     },timeout)
        // }
    }
}
</script>
<style scoped>

</style>