import { LatLng } from 'leaflet';
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';

interface Props {
  sendCoords: (coords: LatLng) => void;
}

export const Map: React.FC<Props> = (props) => {
  const [curMarker, setCurMarker] = useState<LatLng>();

  function MapLogic() {
    const map = useMapEvents({
      click: (e) => {
        // Check if coords are within bounds
        if(e.latlng.lat > 90 || e.latlng.lat < -90) return;
        if(e.latlng.lng > 90 || e.latlng.lng < -90) return;

        // Set view to coords
        map.setView(e.latlng)
        
        // Set temp marker
        setCurMarker(e.latlng);

        // Send coords to App
        props.sendCoords(e.latlng)

      },
    });
    return null;
  }
  
  return(
    <MapContainer center={[20, 25]} zoom={3} zoomControl={false} scrollWheelZoom={true}>
      <MapLogic /> {/* Doesn't display anything, it is just to get map instance */}
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {curMarker ? <Marker position={curMarker}></Marker> : ''}
      {/* <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
    </MapContainer>
  )
}