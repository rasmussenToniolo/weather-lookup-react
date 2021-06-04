import { LatLng } from 'leaflet';
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';



interface Props {
  sendCoords: (coords: LatLng) => void;
}

export const Map: React.FC<Props> = (props) => {
  const [curMarker, setCurMarker] = useState<LatLng>();

  function MapLogic() {
    const popup : HTMLElement = document.querySelector('.popup')!;
    const popupWidth = popup.offsetWidth;

    const mapDiv : HTMLElement = document.querySelector('.leaflet-container')!;

    const map = useMapEvents({
      click: (e) => {
        // Check if coords are within bounds
        if(e.latlng.lat > 90 || e.latlng.lat < -90) return;
        if(e.latlng.lng > 180 || e.latlng.lng < -180) return;

        console.log(e.latlng);
        console.log(map);

        // Set temp marker
        setCurMarker(e.latlng);

        // Set view to coords with offset
        const x = map.latLngToContainerPoint(e.latlng).x - (popupWidth/4); // position map in the center of the second half of the popup
        const y = map.latLngToContainerPoint(e.latlng).y;
        const point = map.containerPointToLatLng([x, y]);

        map.setView(point);
        
        // Blur map
        mapDiv.style.filter = 'blur(.5rem)';

        // remove blur when popup is closed

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