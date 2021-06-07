export const PopupForecast: React.FC<{data: any, getIcon: (id: number) => JSX.Element}> = (props) => {
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
        <div key={`item-${data.dt}`} className="popup-info__data-weather-forecast-item">
          {props.getIcon(data.weather[0].id)}
          
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
