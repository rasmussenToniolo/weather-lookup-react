import {getDateStr, getTempC} from '../helpers';

export const PopupForecast: React.FC<{data: any, getIcon: (id: number) => JSX.Element}> = (props) => {

  return (
    <div className="popup__data-forecast">
        {props.data.slice(1).map((data: any) => (
        <div key={`item-${data.dt}`} className="popup__data-forecast-item">
          <div className="popup__data-forecast-item--weather">
            {props.getIcon(data.weather[0].id)}
            
            <p className="popup__data-forecast-item--weather-temp">{getTempC(data.temp.day)}</p>
          </div>

          <div className="popup__data-forecast-item--maxmin">
            <p className="popup__data-forecast-item--maxmin-max">{getTempC(data.temp.max)}</p>

            <div className="popup__data-forecast-item--maxmin-bar">&#8203;</div>

            <p className="popup__data-forecast-item--maxmin-min">{getTempC(data.temp.min)}</p>
          </div>


          <div className="popup__data-forecast-item--bar">&#8203;</div>

          <p className="popup__data-forecast-item--date">{getDateStr(data.dt)}</p>

          <p className="popup__data-forecast-item--desc">{data.weather[0].description}</p>
        </div>
        ))}
    </div>
  )
}
