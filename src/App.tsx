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

  useEffect(() => {
    // Your code here
    popup = document.querySelector<HTMLElement>('.popup')!;
    popup.style.display = 'none';
    popup.style.opacity = '0';
  }, []);
  

  async function handleMapClick(coords: LatLng) {
    popup.style.display = 'block';
    popup.style.opacity = '1';

    const data = await model.fetchData(coords);
    setPopupData(data);
  }

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
      <Popup data={popupData} />
    </>
  )
}
