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

  const [fromMarker, setFromMarker] = useState(false);

  const [error, setError] = useState(false);

  const [curCoords, setCurCoords] = useState<any>();
  const [curSearch, setCurSearch] = useState<string>('');

  const [textSearch, setTextSearch] = useState<boolean>(false);

  function getBookmarks() {
    setBookmarks(JSON.parse(model.getLocalStorage() || '[]'));
  }

  async function handleSearch(search: string) {
    if(!popupEl) return;
    popupEl.style.visibility = 'visible';
    popupEl.style.opacity = '1';
    setCurSearch(search);
    setTextSearch(true);

    try {
      const data = await model.fetchDataCity(search);

      const coords = {lat: data.locationData.lat, lng: data.locationData.lng};

      mapInstance.setView(coords, 11, {animated: true});

      setCurData({coords, data});
      setCurMarker(coords);
      setPopupData(data);

    } catch(err) {
      // Show retry button on popup
      setError(true);
      console.log(err);
    }
  }

  async function handleMapClick(coords: LatLng) {
    if(!popupEl) return;
    popupEl.style.visibility = 'visible';
    popupEl.style.opacity = '1';
    setCurCoords(coords);
    setTextSearch(false);
    
    try {
      const data = await model.fetchData(coords);
      setCurData({coords, data});
      setPopupData(data);
    } catch(err) {
      // Show retry button on popup
      setError(true);
      console.log(err);
    }
  }

  function handleCloseBtn(e:any) {
    if(!popupEl) return;
    if(!mapDiv) return;

    setCurMarker(undefined);
    setFromMarker(false);
    setError(false);

    
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
    if(fromMarker) {
      const newBookmarks = bookmarks.filter((bm: { data: { dateData: { dateTime: string; }; }; }) => bm.data.dateData.dateTime !== curData.data.dateData.dateTime);
      model.setLocalStorage(newBookmarks);
      setBookmarks(newBookmarks);
      setFromMarker(false);
      return;
    }

    model.setLocalStorage([...bookmarks, curData]);
    setBookmarks([...bookmarks, curData]);
  }

  function removeBookmark(time: string) {
    const newBookmarks = bookmarks.filter((bm: { data: { dateData: { dateTime: string; }; }; }) => bm.data.dateData.dateTime !== time);
    setBookmarks(newBookmarks);
    model.setLocalStorage(newBookmarks);
  }

  function openPopup(data: any) {
    if(!popupEl) return;

    setFromMarker(true);

    popupEl.style.visibility = 'visible';
    popupEl.style.opacity = '1';

    setPopupData(data);
    setCurData({coords: {lat: data.locationData.lat, lng: data.locationData.lng}, data});
    setBookmarked(true);
  }

  function retry() {
    if(textSearch) handleSearch(curSearch); else handleMapClick(curCoords);
    setError(false);
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
      <Map openPopup={openPopup} removeBookmark={removeBookmark} setMapInstance={setMapInstance} curMarker={curMarker} setCurMarker={setCurMarker} bookmarks={bookmarks} mapDiv={mapDiv} setMapDiv={setMapDiv} sendCoords={(coords) => handleMapClick(coords)} />
      <Popup onRetry={retry} error={error} bookmarked={bookmarked} setBookmarked={setBookmarked} onBookmark={handleBookmarkClick} onClose={handleCloseBtn} data={popupData} />
    </>
  )
}
