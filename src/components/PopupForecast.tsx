export const PopupForecast: React.FC<{data: any}> = (props) => {
  console.log(props.data);

  function getDateStr(num: number) {

    const date = new Date(+`${num}000`);
  
    const optionsDate:any = { weekday: "long", month: "long", day: "numeric" };
  
    const dateStr = date.toLocaleDateString("en-US", optionsDate);
    return dateStr;
  }

  function getTempC(kTemp: number) {
    return (Math.round(kTemp) - 273).toFixed();
  }


  return (
    <div className="popup-info__data-weather-forecast">
        {props.data.slice(1).map((data: any) => (
        <div className="popup-info__data-weather-forecast-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-brightness-high" viewBox="0 0 16 16">
            <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
          </svg>
          <p className="popup-info__data-weather-forecast-item--temp">{getTempC(data.temp.day)}</p>

          <div className="popup-info__data-weather-forecast-item--maxmin">
            <p className="popup-info__data-weather-forecast-item--maxmin-max">{getTempC(data.temp.max)}</p>

            <div className="popup-info__data-weather-forecast-item--maxmin-bar">&#8203;</div>

            <p className="popup-info__data-weather-forecast-item--maxmin-min">{getTempC(data.temp.min)}</p>
          </div>


          <div className="popup-info__data-weather-forecast-item--bar">&#8203;</div>

          <p className="popup-info__data-weather-forecast-item--date">{getDateStr(data.dt)}</p>

          <p className="popup-info__data-weather-forecast-item--desc">{data.weather[0].description}</p>
        </div>
        ))}
    </div>
  )
}
