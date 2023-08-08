import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { main } from '@popperjs/core';
import videoBg from './videos/cloud.mp4'
import videoRain from './videos/rain.mp4'
import videoClear from './videos/sunny.mp4'



const api = {
  key: '5309920c2e9a286775b3aa9eba0c2989',
  base: 'https://api.openweathermap.org/data/2.5/'
}
function App() {
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState({});
  const [videoUrl, setVideoUrl] = useState(videoBg);


  const clearSearch = () => { 
    setSearch('');
  }
 

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
    .then(res => res.json())
    .then(result =>{
      setWeather(result);

      if (result.weather[0].main === 'Rain') {
        setVideoUrl(videoRain); 
      } else if(result.weather[0].main === 'Clear') {
        setVideoUrl(videoClear); 
      } else {
        setVideoUrl(videoBg); 
      }

      clearSearch();
    });
  }



  return (
    <div className='main'>
      <div className="overlay"></div>
      <video 
      src={videoUrl} 
      autoPlay 
      loop 
      muted
       className='video'/>
    <div className='box content'>
      <div className='display-5 my-4'>Weather Searching</div>
      <div>
        <input 
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if(e.key === 'Enter'){
            searchPressed();
            clearSearch();
          }
        }}
        type='text'
        value={search}
        placeholder=' Enter City' 
        className='search-city'/>
      </div>

      <button 
      onClick={searchPressed}
      
      className='custom-btn px-4 py-2 my-3'>Search</button>

      {typeof weather.main !== 'undefined' ? 
            (<div className='datas p-5'>
                <div className='city-name my-3'>{weather.name}</div>
                <div className='temperature my-3'>{weather.main.temp}°C</div>
                 <div className='condition '>{weather.weather[0].main}</div>
                <p>({weather.weather[0].description})</p>
        </div>) : ('') }

    </div>
  </div>
  )
}

export default App
