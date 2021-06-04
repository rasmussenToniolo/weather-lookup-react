
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';

export const Popup: React.FC<{data: any, shouldDisplay: boolean}> = (props) => {

  // if(!props.data) console.log('waiting'); else console.log(props.data);

  return(
    <div className="popup">
      <div className="popup-info"></div>
      <div className="popup-map">
      </div>
    </div>
  )
} 