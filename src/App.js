import React,{useState,useRef,useEffect} from 'react';
import './App.css';
import axios from "axios"
import moment from 'moment';


function App() {

  const [weatherInfo, setWeatherInfo] = useState(null);
  const inputRef = useRef(null);
  const [image, setImage] = useState(null)

  useEffect(() => {
    fetchWeatherInfo();
  }, [])

  const fetchWeatherInfo = (e) => {
     e?.preventDefault();
    const options = {
      method: 'GET',
      url: 'https://community-open-weather-map.p.rapidapi.com/weather',
      params: {
        q: inputRef.current.value || "London,uk",
        units: "metric",
      },
      headers: {
        'x-rapidapi-key': '1a72d0f313msh3ac812888957d57p155018jsn365c7603d4d9',
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
      }
    };
        axios
        .request(options)
        .then((response) => {
          console.log(response.data)
        setWeatherInfo(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
     determineBackgroundImage();
  }, [weatherInfo])

  const determineBackgroundImage = () => {
    if (weatherInfo?.main.temp < 10){
      setImage ("https://media1.popsugar-assets.com/files/thumbor/n8bUt1yPUD0zvO0XmWNFuVj763k/685x0:3345x2660/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2020/01/07/726/n/1922441/419ff9b05e14b139162ef6.64727550_/i/Best-Winter-Photos.jpg")
    }
    if (weatherInfo?.main.temp >= 10 && weatherInfo?.main.temp < 25){
         setImage('https://www.oakbaynews.com/wp-content/uploads/2019/07/17533097_web1_cloud_1.jpg')
    }
    
    if (weatherInfo?.main.temp >= 25){
      setImage('https://i.pinimg.com/originals/e1/3a/4d/e13a4d737425141353603f7a3edb73cd.jpg')
 }

  
  }


  console.log(weatherInfo)

  return (
    <div className="app" style={{backgroundImage: `url(${image})`}}>
      <div className="app__container">
        <div className="app__info app__left">
          <h1>Weather app</h1>
          <form>
            <input ref={inputRef} type='text' placeholder="Type the city" />
            <button onClick={fetchWeatherInfo} type='submit'>Show Me the Weather</button>
          </form>
        </div>
        <div className="app__info app__right">
          <h2>{weatherInfo?.name}</h2>
          <h2>{weatherInfo?.main.temp} Degree Celsius</h2>
          <h3>
            {weatherInfo && `Sunrise: ${moment.unix(weatherInfo?.sys?.sunrise).format("LLLL")}`}
            </h3>
            <h4>{weatherInfo && `Sunset: ${moment.unix(weatherInfo?.sys?.sunset).format("LLLL")}`}</h4>
        </div>
        
      </div>
      
    </div>
  );
}

export default App;
