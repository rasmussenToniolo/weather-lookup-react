import { LatLng } from 'leaflet';
import { useEffect, useState } from 'react';
import { Map } from './components/Map';
import {Popup} from './components/Popup';
import {SearchBox} from './components/SearchBox';
import * as model from './model';
import './sass/main.scss';



export const App = () => {
  const [curCoords, setCurCoords] = useState<LatLng>();

  const [popupData, setPopupData] = useState<any>(undefined);

  const [mapDiv, setMapDiv] = useState<HTMLElement>();

  const [popupEl, setPopupEl] = useState<HTMLElement>();

  const [bookmarks, setBookmarks] = useState<any[]>([]);

  const [curMarker, setCurMarker] = useState<any>();

  const [bookmarked, setBookmarked] = useState(false);


  async function handleMapClick(coords: LatLng) {
    if(!popupEl) return;
    popupEl.style.visibility = 'visible';
    popupEl.style.opacity = '1';
    setCurCoords(coords);

    try {
      const data = await model.fetchData(coords);
      setPopupData(data);
    } catch(err) {
      console.log(err);
      // handle fetching error, display in popup 'retrying...' 
    }
  }

  function handleCloseBtn(e:any) {
    // console.log(e);
    if(!popupEl) return;
    if(!mapDiv) return;

    setCurMarker(undefined);

    
    // set opacity of popup to 0 and remove blur from map
    mapDiv.style.filter = 'none';
    popupEl.style.opacity = '0';
    
    // set visibility to hidden of popup after opacity reaches 0
    // remove popupData
    setTimeout(() => {
      // Reset bookmark state
      setBookmarked(false)
      popupEl.style.visibility = 'hidden';
      setPopupData(undefined);
    }, 1000)

    
  }

  function handleBookmarkClick() {
    // console.log(curCoords);

    

    setBookmarks([...bookmarks, curCoords])
  }

  useEffect(() => {
    setPopupEl(document.querySelector('.popup') as HTMLElement);
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
      <Map curMarker={curMarker} setCurMarker={setCurMarker} bookmarks={bookmarks} mapDiv={mapDiv} setMapDiv={setMapDiv} sendCoords={(coords) => handleMapClick(coords)} />
      <Popup bookmarked={bookmarked} setBookmarked={setBookmarked} onBookmark={handleBookmarkClick} onClose={handleCloseBtn} data={popupData} />
    </>
  )
}
