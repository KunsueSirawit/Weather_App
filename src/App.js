import './App.css';
import {useEffect, useState} from 'react'
import axios from 'axios';
import Pic1 from './img/component/ForecastImg';
import bgCloudy from './img/Bg/bgCloudy.jpg';
import Bg from './img/component/Bg.js';
import loadingImg from './img/loading/loadingImg.png';
import searchbutton from './img/search/searchbutton.png';
import cityname from './cityname.js';



function App() {

  const [ name, setName ]  = useState('Bangkok')
  const apiKey = "4978f681ca452675c3ec27a94895170d"
  const [ city, setCity ] = useState({})
  const [ loading , setLoading] = useState(false)
  const [ measurement , setMeasurement] = useState('k')
  const [ temperature , setTemperature ]  = useState({})
  const [ weatherMain , setWeatherMain] = useState()
  const [ weatherNumber , setWeatherNumber ] = useState()
  const [ forecast , setForecast] = useState([])
  const [ background , setBackground] = useState('')
  const [ colorC , setColorC ] = useState('')
  const [ colorK , setColorK ] = useState('')

  const apikeyForecast = "4ca01cf9dbfc2f7f56da20b881b0f051"

  const forecasturl = `http://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=${apikeyForecast}`
  const baseurl = `http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}`

  const getApi = async() => {
    const response = await axios(baseurl)
    setCity(response.data)
    // console.log(city.name)
    setLoading(true)
    setTemperature(response.data.main)
    // console.log(response.data.weather[0])
    setWeatherMain(response.data.weather[0].main)
  }

  const getApiForecast = async() => {
    const response = await axios(forecasturl)
    // console.log(response.data.list)
    setForecast(response.data.list)
  }

  
/////////////////////////////////////////////////////////////

  useEffect(()=>{
    getApi()
    getApiForecast()
    setWeatherNumber(0)
    setColorK('white')
  },[])

////////////////////////////////////////////////////////////


  const convertToC = () =>{
    if (measurement === 'k')
      setTemperature(exx => ({ ...exx , temp: ((temperature.temp  - 273)) }))
      setMeasurement('c')
      setColorK('transparent')
      setColorC('white')
    } 
  
  const convertToK = () =>{
    if (measurement === 'c')
      setTemperature( exx => ({ ...exx , temp: (Number(temperature.temp) + 273)   }))
      setMeasurement('k')
      setColorK('white')
      setColorC('transparent')
    }

  const findcity = () =>{
    const find = cityname.find(element => {
      return element.toLowerCase() == name.toLowerCase()
    })
    
    // console.log(find.toLowerCase())

    if (find.toLowerCase() !== name.toLowerCase()){
      alert('Not found')
      // console.log('aa')
    } else {
      getApi()
      getApiForecast()
      setMeasurement('k')
      setName('')
      // console.log('bb')
    }
  }

  const senddata = (e) => {
    e.preventDefault()
    findcity()
  }


  return (
    ( loading ?
  <div className="App" style={{backgroundImage: `URL(${Bg[5].img})`,
                               backgroundRepeat  : 'no-repeat',
                               backgroundSize : '100rem',
                               backgroundPosition: 'center',
                              //  backgroundSize: 'cover'
  }}>
    <div className='form'>
    <form onSubmit={senddata}>
        <input type='text' placeholder='Province......' value= {name} onChange={(e)=> setName(e.target.value)} />
        <button type="submit"> <img src={searchbutton} /> </button>
    </form>
    </div>
    <section>
    <div className="location">
      <h1 className="city"> {city.name} </h1>
    </div>
    <div className="card">
      <div className="weather">
        <div className='temperature-container'>
          {weatherMain === 'Rain' && <img src={Pic1[3].img} />}
          {weatherMain === 'Clouds' && <img src={Pic1[1].img} />}
          {weatherMain === 'Sun' && <img src={Pic1[0].img} />  }
          {weatherMain === 'Clear' && <img src={Pic1[0].img} />}
          <p>
              {(temperature.temp).toFixed()}°
          </p>
          <div className='temperature-measure'>
            <button onClick={() => convertToC()} style={{ backgroundColor : colorC }}> C </button>
            <button onClick={()=>  convertToK()} style={{ backgroundColor : colorK }} > K </button>
          </div>
        </div>
        {/* <small> max : {temperature.temp_max} , min : {temperature.temp_min}</small> */}
      </div>
      <div className = "info">
          <div> {city.weather[0].main}  </div>
          <div> Humidity: {city.main.humidity} </div>
          <div> Pressure: {city.main.pressure} </div>
          <div> Wind speed: {city.wind.speed}   </div>
          <div> Wind degrees: {city.wind.deg}   </div>
          <div> Sealevel: {city.main.sea_level}  </div>
      </div>
    </div>
    </section>
    <section>
    <div className='forecastcontainer'>
    <p>  Forecast  </p>
      <div className ='forecast'>
        {forecast.map((data,index) => {
          if (index % 8 === 1 ){
            const splitdata = (data.dt_txt).split(" ")
            const tempdate = (splitdata[0]).slice(5 , splitdata[0].length)
            const tempK = parseInt(data.main.temp) 
            const tempC = parseInt(data.main.temp) - 273
            return (
              <div className='forecastdata'>
                <label className='forecastdatadate' key={index}> {tempdate} </label>
                  {data.weather[0].main === 'Rain' && <img src={Pic1[3].img}   /> }
                  {data.weather[0].main === 'Clouds' && <img src={Pic1[1].img}   /> }
                  {data.weather[0].main === 'Sun' && <img src={Pic1[0].img}  /> }
                  {data.weather[0].main === 'Clear' && <img src={Pic1[0].img}  /> }
                  { measurement === 'k' && <label className='forecastdatatemp' > {tempK}°  </label> } 
                  { measurement === 'c' && <label className='forecastdatatemp' > {tempC}°  </label> }
                  
              </div>
            )}
        })}
        </div>
      </div>
    </section>
  </div>
  : <div>
    {/* <img className='loadingImg' src={loadingImg} /> */}
    <h1> Loading... </h1>  
    </div>
  )
  )
}

export default App;
