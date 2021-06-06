import { useState } from "react";
import {PopupForecast} from './PopupForecast';


export const Popup: React.FC<{data: any, onClose: (e:any) => void}> = (props) => {

  // if(!props.data) console.log('waiting'); else console.log(props.data);
  const [bookmarkHovered, setBookmarkHovered] = useState(false);

  const [bookmarked, setBookmarked] = useState(false);

  // console.log(props.data);



  const date = new Date(props.data?.dateData.dateTime || 'December 17, 1995 03:24:00');

  const timeStr = date.toLocaleTimeString("en-US", { timeStyle: "short" });

  const optionsDate:any = { weekday: "long", month: "long", day: "numeric" };

  const dateStr = date.toLocaleDateString("en-US", optionsDate);

  


  // CLEAN UP THE GODDAMN JSX (handle SVG's in a more appropiate manner)

  return(
    <div className="popup">
      <div className="popup-info">
        {!props.data ? 
        <>
        <div onClick={props.onClose} className="popup-info__close-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
            <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
          </svg>
        </div>
        <div className="popup-info__loading">
          <div className="loading-icon">
            <div className="loading-icon__circle loading-icon__circle--1"></div>
            <div className="loading-icon__circle loading-icon__circle--2"></div>
            <div className="loading-icon__circle loading-icon__circle--3"></div>
          </div>
        </div>
        </>
        :
        <>
        <div onClick={props.onClose} className="popup-info__close-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
            <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
          </svg>
        </div>

        <div onClick={() => setBookmarked((prevState) => !prevState)} onMouseEnter={() => setBookmarkHovered(true)} onMouseLeave={() => setBookmarkHovered(false)} className="popup-info__bookmark-btn">
          {bookmarkHovered && !bookmarked ?
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-plus-fill" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zm6.5-11a.5.5 0 0 0-1 0V6H6a.5.5 0 0 0 0 1h1.5v1.5a.5.5 0 0 0 1 0V7H10a.5.5 0 0 0 0-1H8.5V4.5z"/>
            </svg>
           : !bookmarked ?
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-plus" viewBox="0 0 16 16">
            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
            <path d="M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4z"/>
          </svg> : ''}

          {bookmarkHovered && bookmarked ?
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-x-fill" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zM6.854 5.146a.5.5 0 1 0-.708.708L7.293 7 6.146 8.146a.5.5 0 1 0 .708.708L8 7.707l1.146 1.147a.5.5 0 1 0 .708-.708L8.707 7l1.147-1.146a.5.5 0 0 0-.708-.708L8 6.293 6.854 5.146z"/>
            </svg>
           : bookmarked ?
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-check" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
          </svg> : ''}
        </div>

        <div className="popup-info__data">
          <div className="popup-info__data-cur-temp">
            <p className="popup-info__data-cur-temp--cur">{props.data.weatherData.currentTemp}</p>
            <p className="popup-info__data-cur-temp--cur-dec">.{props.data.weatherData.currentDecimal}</p>
          </div>

          <div className="popup-info__data-maxmin-temp">
            <p className="popup-info__data-maxmin-temp-max">{props.data.weatherData.maxTemp}</p>
            <p className="popup-info__data-maxmin-temp-bar">&#8203;</p>
            <p className="popup-info__data-maxmin-temp-min">{props.data.weatherData.minTemp}</p>
          </div>

          <p className="popup-info__data-location">{props.data.locationData.city}, {props.data.countryData.name}</p>

          <p className="popup-info__data-date">{dateStr}</p>
          <p className="popup-info__data-time">{timeStr}</p>

          <div className="popup-info__data-weather">
            {/* Dynamic icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-brightness-high" viewBox="0 0 16 16">
              <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
            </svg>
            <p className="popup-info__data-weather-desc">{props.data.weatherData.description}</p>

            {/* Weather forecast */}
            <PopupForecast data={props.data.weatherData.dailyData}/>
          </div>
        </div>
        </>
        }
        </div>
        
      <div className="popup-map"></div>
    </div>
  )
}
