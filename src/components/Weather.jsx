import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import clear_icon from "/images/clear.png";
import clouds_icon from "/images/clouds.png";
import drizzle_icon from "/images/drizzle.png";
import humidity_icon from "/images/humidity.png";
import rain_icon from "/images/rain.png";
import snow_icon from "/images/snow.png";
import wind_icon from "/images/wind.png";

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": clouds_icon,
    "02n": clouds_icon,
    "03d": clouds_icon,
    "03n": clouds_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };
  const search = async (city) => {
    if (city === "") {
      alert("Enter a correct city name!");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_API_KEY
      }`;

      const res = await fetch(url);

      const data = await res.json();
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.error("Envalid api");
    }
  };

  useEffect(() => {
    search("london");
  }, []);

  return (
    <div className=" flex items-center justify-center mx-auto">
      <div className="bg-black p-10 rounded-2xl space-y-5">
        {/* input */}
        <div className="flex gap-2 border-gray-500 border p-2 rounded-lg">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search by city..."
            className="px-5 py-2 bg-white/20 rounded-full text-white text-xl outline-none"
          />
          <button onClick={() => search(inputRef.current.value)}>
            <Search className="text-gray-500" size={22} />
          </button>
        </div>

        {weatherData ? (
          <>
            {/* sun & city */}
            <div className="flex flex-col items-center gap-2">
              <div className="h-32 w-32 overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={weatherData.icon}
                  alt="weather-sun"
                />
              </div>
              <h1 className="text-white text-5xl">{weatherData.temperature}</h1>
              <h3 className="text-white text-xl font-medium">
                {weatherData.location}
              </h3>
            </div>

            <div className="flex text-white justify-between">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={humidity_icon}
                    alt="weather-sun"
                  />
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-white">{weatherData.humidity} %</p>
                  <span className="text-white">Humidity</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="h-10 w-10 overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={wind_icon}
                    alt="weather-sun"
                  />
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-white">{weatherData.windSpeed} Km/h</p>
                  <span className="text-white">Wind Speed</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Weather;
