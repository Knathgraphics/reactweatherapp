
import Card from "../components/Card"
import { MapPinIcon } from "@heroicons/react/24/outline"
import SunnyImg from "../assets/sunny.png"
import ThunderImg from "../assets/thunder.png"
import CloudyImg from "../assets/cloudy.png"
import  {getCurrentTime12Hour, dateInWords} from "./time"
import humidityIcon from "../assets/icons/humidity.png"
import weatherIcon from "../assets/icons/weather.png"
import clearskyIcon from "../assets/icons/clear-sky.png"
import searchIcon from "../assets/icons/search.png"
import { useState , useEffect} from "react"
import toTitleCase from "./switchCase"



const Header = () => {
  const [cityName,setCityName] = useState("Lagos");
  const [countryCode, setCountryCode] = useState("NG");
  const [weatherType, setWeatherType] = useState("Sunny");
  const [degree, setDegree] = useState(0);
  const [feelsLike, setFeelsLike] = useState("Rain");
  const [tempmin, setTempMin] = useState(100);
  const [tempmax, setTempMax] = useState(100);
  const [humidity, setHumidity] = useState(30);
  const [anError, setAnError] = useState(false);
  const [weatherImg, setWeatherImg] = useState(SunnyImg);




  async function getWeather (){
   
    try{
              var city = document.getElementById("searchinput").value;
              if(city != null || city != ""){
                console.log(city);
                
                const apiKey = '6b50a09b7d3f3dec5784cdb5e9b3aadd'; // Replace with your actual API key
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
                
                await fetch(url)
                  .then(response => {
                    if (!response.ok) {
                      throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.json();
                  })
                  .then(data =>{
                    setAnError(false);
                    setCityName(data.name);
                    setCountryCode(data.sys.country);
                    setWeatherType(toTitleCase(data.weather[0].description));
                    setDegree(data.main.temp);
                    setFeelsLike(data.main.feels_like);
                    setTempMin(data.main.temp_min);
                    setTempMax(data.main.temp_max);
                    setHumidity(data.main.humidity);

                    if(degree > 30){
                      setWeatherImg(SunnyImg);
                    }
                    else if (degree > 20 && degree < 30){
                      setWeatherImg(ThunderImg);
                    }
                    else if(degree < 20){
                      setWeatherImg(CloudyImg);
                    }
                    
                  })
                  .catch((err)=>{
                    setAnError(true);
                    console.log(err);
                    
                  });
                
              }
              else{
                alert("Name cannot be empty");
              }
    }
              
  catch(err){
    console.log(err);
    
  }
     
}

async function HomepageWeather (){
   
  try{
            var city = "Lagos";
            if(city != null || city != ""){  
              const apiKey = '6b50a09b7d3f3dec5784cdb5e9b3aadd'; // Replace with your actual API key
              const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
              
              await fetch(url)
                .then(response => {
                  if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                  }
                  return response.json();
                })
                .then(data =>{
                  setAnError(false);
                  setCityName(data.name);
                  setCountryCode(data.sys.country);
                  setWeatherType(toTitleCase(data.weather[0].description));
                  setDegree(data.main.temp);
                  setFeelsLike(data.main.feels_like);
                  setTempMin(data.main.temp_min);
                  setTempMax(data.main.temp_max);
                  setHumidity(data.main.humidity);
                  
                  if(degree > 30){
                    setWeatherImg(SunnyImg);
                  }
                  else if (degree > 20 && degree < 30){
                    setWeatherImg(ThunderImg);
                  }
                  else if(degree < 20){
                    setWeatherImg(CloudyImg);
                  }
                })
                .catch((err)=>{
                  setAnError(true);
                  console.log(err);
                  
                });
              
            }
            else{
              alert("Name cannot be empty");
            }
  }
            
catch(err){
  console.log(err);
  
}
   
}


useEffect(() => {
HomepageWeather();
}, [])


  return (
    <div >
      <div className='header'> 
        <div className="welcome" >
            <h1 className='text-2xl font-bold'>Hi, Welcome 👋</h1>
            <h5 className='secondary text-xs'>{dateInWords} - {getCurrentTime12Hour()}</h5>
        </div>
        <div className="searchwidget">
        <input type="search"  id="searchinput" className='search' placeholder='Search Location' />
        <button onClick={getWeather}><img className="searchimg"  src={searchIcon} alt=""  /></button>
        </div>
      
        </div>


        <div>
        <div className='mx-auto text-center py-10' style={{display: anError? "none" : "block"}}>
            <div className="location">
            <MapPinIcon width={30} className="secondary"/>
            <h3 className="text-xl" id="location">{cityName},<span id="country"> {countryCode}</span></h3>    
            </div>
       <div>
        <div className="weathersection">
           <div className="image">
            <img className="weatherimage" src={weatherImg} alt="" />
        </div>
        <div className="weather">
            <h1 className="text-5xl font-bold">{degree} &deg;</h1>
            <h5 className='secondary text-sm'>{weatherType}</h5>
        </div>  
        </div>
<div className="card-row">
  <Card icon={humidityIcon} type="Feels Like" value={feelsLike}/>
  <Card icon={clearskyIcon} type="Temp. Min" value={tempmin}/>
  <Card icon={clearskyIcon} type="Temp Max" value={tempmax}/>
  <Card icon={weatherIcon}  type="Humidity" value={humidity} />
</div>
       </div>
        </div>


        <div className="my-10" style={{display: anError?"block":"none"}}>
          <h1 className="text-center text-2xl px-20 font-extrabold">Uh-oh!</h1>
          <p className="text-center text-xl px-20"> We’ve lost contact with the weather gods. They’re probably on vacation 😥. <br /> Please try finding another location or try again soon!</p>
        </div>

        
    </div>

    
 </div>




  )
}

export default Header