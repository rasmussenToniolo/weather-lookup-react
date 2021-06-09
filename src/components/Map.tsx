import { LatLng } from 'leaflet';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import {getDateStr} from '../helpers';
import {getIcon} from '../helpersJSX';


interface Props {
  sendCoords: (coords: LatLng) => void;
  setMapDiv: (mapDiv:any) => void;
  mapDiv: any;
  bookmarks: any[];
  curMarker: any;
  setCurMarker: (coords: LatLng) => void;
  setMapInstance: (map: any) => void;
  removeBookmark: (time: string) => void;
  openPopup: (data: any) => void;
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

              <div className="marker-popup">
                <div className="marker-popup__cur-weather">
                  {getIcon(data.weatherData.weatherConditions.id)}
                  
                  <p className="marker-popup__cur-weather--temp">{data.weatherData.currentTemp}</p>
                </div>

                <div className="marker-popup__maxmin">
                  <p className="marker-popup__maxmin--max">{data.weatherData.maxTemp}</p>

                  <div className="marker-popup__maxmin--bar">&#8203;</div>

                  <p className="marker-popup__maxmin--min">{data.weatherData.minTemp}</p>
                </div>

                <div className="marker-popup__bar">&#8203;</div>

                <p className="marker-popup__date">{getDateStr(data.weatherData.currentTime)}</p>

                <p className="marker-popup__time">{new Date(data.dateData.dateTime).toLocaleTimeString("en-US", { timeStyle: "short" })}</p>

                <button onClick={() => props.removeBookmark(data.dateData.dateTime)} className="marker-popup__remove">Remove<br />bookmark</button>

                <div onClick={() => props.openPopup(data)} className="marker-popup__expand">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrows-fullscreen" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z"/>
                </svg>
                </div>
              </div>
            </Popup>
          </Marker>

        ))}
      </MapContainer>
    </>
  )
}