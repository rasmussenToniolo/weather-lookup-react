import { LatLng } from 'leaflet';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';



interface Props {
  sendCoords: (coords: LatLng) => void;
  setMapDiv: (mapDiv:any) => void;
  mapDiv: any;
  bookmarks: any[];
  curMarker: any;
  setCurMarker: (coords: LatLng) => void;
  setMapInstance: (map: any) => void;
}

export const Map: React.FC<Props> = (props) => {
  
  let mapInstance: any;

  useEffect(() => {
    props.setMapDiv(document.querySelector('.leaflet-container'));
    props.setMapInstance(mapInstance);
  });

  function MapLogic() {
    // const popup : HTMLElement = document.querySelector('.popup')!;
    // const popupWidth = popup.offsetWidth;

    mapInstance = useMap();

    const map = useMapEvents({
      click: (e) => {
        // Check if coords are within bounds
        if(e.latlng.lat > 90 || e.latlng.lat < -90) return;
        if(e.latlng.lng > 180 || e.latlng.lng < -180) return;
        
        
        // Set temp marker
        props.setCurMarker(e.latlng);
        
        // // Set view to coords with offset
        // const x = map.latLngToContainerPoint(e.latlng).x - (popupWidth/4); // position map in the center of the second half of the popup
        // const y = map.latLngToContainerPoint(e.latlng).y;
        // const point = map.containerPointToLatLng([x, y]);
        
        map.setView(e.latlng);
        
        
        // Blur map
        props.mapDiv.style.filter = 'blur(.5rem)';

        // remove blur when popup is closed

        // Send coords to App
        props.sendCoords(e.latlng)

      },
    });
    return null;
  }
  
  return(
    <>
      <MapContainer center={[20, 25]} zoom={3} zoomControl={false} scrollWheelZoom={true}>
        <MapLogic /> {/* Doesn't display anything, it is just to get map instance */}
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {props.curMarker ? <Marker position={props.curMarker}></Marker> : ''}
        {props.bookmarks.map(({coords, data}) => (
          <Marker key={`marker:${coords.lat}${coords.lng}`} position={coords}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
              {/* Display bookmark data here */}
              {/* Marker popup shall have an update button to fetch new data; do not retry button, just announce that data couldn't be fetched. */}
              {/* Have an expand button to make the big popup appear */}
            </Popup>
          </Marker>

        ))}
      </MapContainer>
    </>
  )
}