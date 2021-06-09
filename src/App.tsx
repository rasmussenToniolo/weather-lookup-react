import { LatLng } from 'leaflet';
import { useEffect, useState } from 'react';
import { Map } from './components/Map';
import {Popup} from './components/Popup';
import {SearchBox} from './components/SearchBox';
import * as model from './model';
import './sass/main.scss';



export const App = () => {
  const [mapInstance, setMapInstance] = useState<any>();

  const [curData, setCurData] = useState<any>();

  const [popupData, setPopupData] = useState<any>(undefined);

  const [mapDiv, setMapDiv] = useState<HTMLElement>();

  const [popupEl, setPopupEl] = useState<HTMLElement>();

  const [bookmarks, setBookmarks] = useState<any>([]);

  const [curMarker, setCurMarker] = useState<any>();

  const [bookmarked, setBookmarked] = useState(false);

  const [text, setText] = useState('');

  function getBookmarks() {
    setBookmarks(JSON.parse(model.getLocalStorage() || '[]'));
  }

  


  async function handleSearch(search: string) {
    if(!popupEl) return;
    popupEl.style.visibility = 'visible';
    popupEl.style.opacity = '1';
    try {
      const data = await model.fetchDataCity(search);

      const coords = {lat: data.locationData.lat, lng: data.locationData.lng};

      mapInstance.setView(coords, 11, {animated: true});

      setCurData({coords, data});
      setCurMarker(coords);
      setPopupData(data);

    } catch(err) {
      // Show retry button on popup
      console.log(err);
    }
  }

  async function handleMapClick(coords: LatLng) {
    if(!popupEl) return;
    popupEl.style.visibility = 'visible';
    popupEl.style.opacity = '1';
    
    try {
      const data = await model.fetchData(coords);
      setCurData({coords, data});
      setPopupData(data);
    } catch(err) {
      // Show retry button on popup
      console.log(err);
    }
  }

  function handleCloseBtn(e:any) {
    if(!popupEl) return;
    if(!mapDiv) return;

    setCurMarker(undefined);

    
    // set opacity of popup to 0 and remove blur from map
    mapDiv.style.filter = 'none';
    popupEl.style.opacity = '0';

    // Remove search input
    setText('');
    
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
    model.setLocalStorage([...bookmarks, curData]);
    setBookmarks([...bookmarks, curData]);
  }

  useEffect(() => {
    setPopupEl(document.querySelector('.popup') as HTMLElement);
    getBookmarks();
  }, [])

  return (
    <>
      <div className="title-box">
        <h1>Weather Lookup</h1>
      </div>
      <SearchBox text={text} setText={setText} onSearch={handleSearch} />
      <Map setMapInstance={setMapInstance} curMarker={curMarker} setCurMarker={setCurMarker} bookmarks={bookmarks} mapDiv={mapDiv} setMapDiv={setMapDiv} sendCoords={(coords) => handleMapClick(coords)} />
      <Popup bookmarked={bookmarked} setBookmarked={setBookmarked} onBookmark={handleBookmarkClick} onClose={handleCloseBtn} data={popupData} />
    </>
  )
}
