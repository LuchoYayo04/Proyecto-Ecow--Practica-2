import React from 'react'
import {MapContainer, LayersControl, LayerGroup, Marker, Circle, Popup, TileLayer, FeatureGroup, Rectangle} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

class Map extends React.Component{
    constructor (props){
        super(props)
    }
    render(){
    const center = [-40.5829459,-73.1141087]
    let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow
    });
    const rectangle = [
      [-40.5829459,-73.1141087],
      [-40.5829459,-73.1241087],
    ]
    console.log(this.props.data)
    return(
            <MapContainer style={{ height: '500px', width: '100%' }} center={center} zoom={13} >
                <LayersControl position="topright">
                <LayersControl.BaseLayer checked name="OpenStreetMap.Mapnik">
                    <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="OpenStreetMap.BlackAndWhite">
                    <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
                    />
                </LayersControl.BaseLayer>
                <LayersControl.Overlay name="Marker with popup">
                    <Marker position={center}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                    </Marker>
                </LayersControl.Overlay>
                <LayersControl.Overlay checked name="bovinos">
                    <LayerGroup>
                        {this.props.data.map((bovino)=>
                            (
                                <Marker position={bovino.ubicacion} icon={DefaultIcon}>
                                <Popup>
                                    {'id: '+ bovino.id} <br /> Easily customizable.
                                </Popup>
                                </Marker>  
                            )
                        )}
                    </LayerGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay checked name="Layer group with circles">
                    <LayerGroup>
                    <Circle
                        center={[-40.588427, -73.116479]}
                        pathOptions={{ fillColor: 'blue' }}
                        radius={200}
                    />
                    <Circle
                        center={[-40.588427, -73.116479]}
                        pathOptions={{ fillColor: 'red' }}
                        radius={100}
                        stroke={true}
                    />

                    <LayerGroup>
                        <Circle
                        center={[-40.588427, -73.116479]}
                        pathOptions={{ color: 'green', fillColor: 'green' }}
                        radius={100}
                        />
                    </LayerGroup>
                    </LayerGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay name="Feature group">
                    <FeatureGroup pathOptions={{ color: 'purple' }}>
                    <Popup>Popup in FeatureGroup</Popup>
                    <Circle center={[61.51, -0.06]} radius={200} />
                    <Rectangle bounds={rectangle} />
                    </FeatureGroup>
                </LayersControl.Overlay>
                </LayersControl>
            </MapContainer>
            )
    }
}

export default Map