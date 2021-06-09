import { useState } from "react";
import {PopupForecast} from './PopupForecast';
import {getIcon} from '../helpersJSX';


export const Popup: React.FC<{data: any, onClose: (e:any) => void, onBookmark: () => void, setBookmarked: (bookmarkState: any) => void, bookmarked: boolean, error: boolean, onRetry: () => void}> = (props) => {

  const [bookmarkHovered, setBookmarkHovered] = useState(false);

  const date = new Date(props.data?.dateData.dateTime || 'December 17, 1995 03:24:00');

  const timeStr = date.toLocaleTimeString("en-US", { timeStyle: "short" });

  const optionsDate:any = { weekday: "long", month: "long", day: "numeric" };

  const dateStr = date.toLocaleDateString("en-US", optionsDate);

  return(
    <div className="popup">
      {!props.data ? 
        props.error ? 
          <div className="popup__error">
            <p className="popup__error-msg">Something went wrong!<br />Please try again.</p>

            <button onClick={props.onRetry} className="popup__error-retry-btn">Retry</button>
          </div>
        
         : 

          <div className="popup__loading">
            <div className="loading-icon">
              <div className="loading-icon__circle loading-icon__circle--1"></div>
              <div className="loading-icon__circle loading-icon__circle--2"></div>
              <div className="loading-icon__circle loading-icon__circle--3"></div>
            </div>
          </div>

        :
        
        <div className="popup__data">
          <div className="popup__data-temp">
            <p className="popup__data-temp--cur">{props.data.weatherData.currentTemp}</p>
            <p className="popup__data-temp--cur-dec">.{props.data.weatherData.currentDecimal}</p>
          </div>

          <div className="popup__data-maxmin">
            <p className="popup__data-maxmin-max">{props.data.weatherData.maxTemp}</p>
            <p className="popup__data-maxmin-bar">&#8203;</p>
            <p className="popup__data-maxmin-min">{props.data.weatherData.minTemp}</p>    
          </div>

          <p className="popup__data-location">{props.data.locationData.city}, {props.data.countryData.name}</p>
          {/* <p className="popup__data-location">This is a very long city name somewhere in this world what is the worst that could happen?</p> */}

          <p className="popup__data-date">{dateStr}</p>
          <p className="popup__data-time">{timeStr}</p>

          <div className="popup__data-weather">
            {/* <div className="popup__data-weather-space">&#8203;</div> */}
            <div className="popup__data-weather--icon">
              {getIcon(props.data.weatherData.weatherConditions.id)}
            </div>
            
            <p className="popup__data-weather--desc">{props.data.weatherData.description}</p>
          </div>

          <PopupForecast getIcon={getIcon} data={props.data.weatherData.dailyData}/>
        </div>
      }

      <div className="popup__controls">
        <div onClick={props.onClose} className="popup__controls-close-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
            <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
          </svg>
        </div>

        {props.data ? (
          <div onClick={() => {props.setBookmarked((prevState: any) => !prevState); props.onBookmark()}} onMouseEnter={() => setBookmarkHovered(true)} onMouseLeave={() => setBookmarkHovered(false)} className="popup__controls-bookmark-btn">
            {bookmarkHovered && !props.bookmarked ?
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-plus-fill" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zm6.5-11a.5.5 0 0 0-1 0V6H6a.5.5 0 0 0 0 1h1.5v1.5a.5.5 0 0 0 1 0V7H10a.5.5 0 0 0 0-1H8.5V4.5z"/>
              </svg>
            : !props.bookmarked ?
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-plus" viewBox="0 0 16 16">
              <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
              <path d="M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4z"/>
            </svg> : ''}

            {bookmarkHovered && props.bookmarked ?
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-x-fill" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zM6.854 5.146a.5.5 0 1 0-.708.708L7.293 7 6.146 8.146a.5.5 0 1 0 .708.708L8 7.707l1.146 1.147a.5.5 0 1 0 .708-.708L8.707 7l1.147-1.146a.5.5 0 0 0-.708-.708L8 6.293 6.854 5.146z"/>
              </svg>
            : props.bookmarked ?
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-check" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
              <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
            </svg> : ''}
          </div>
        ) : ''}
      </div>

      {/* <div className="popup__map"></div> */}
    </div>
        
  )
}
