import { LatLng } from 'leaflet';
import { useEffect, useState } from 'react';
import { Map } from './components/Map';
import {Popup} from './components/Popup';
import {SearchBox} from './components/SearchBox';
import * as model from './model';
import './sass/main.scss';



export const App = () => {

  const [shouldDisplay, setShouldDisplay] = useState<boolean>(false);

  const [popupData, setPopupData] = useState<object>();

  let popup:any;

  async function handleMapClick(coords: LatLng) {
    popup.style.visibility = 'visible';
    popup.style.opacity = '1';
    setShouldDisplay(true);
    const data = await model.fetchData(coords);
    setPopupData(data);
  }

  useEffect(() => {
    popup = document.querySelector('.popup');
  }, [])

  // Display popup
  
  // Fetch data from coords
  // Display data or 'retrying' message
  return (
    <>
      <div className="title-box">
        <h1>Weather Lookup</h1>
      </div>
      <SearchBox />
      <Map sendCoords={(coords) => handleMapClick(coords)} />
      <Popup shouldDisplay={shouldDisplay} data={popupData} />
    </>
  )
}
