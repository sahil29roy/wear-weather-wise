import { toast } from "sonner";

export async function getWeatherForCity(city) {
  // OpenWeatherMap URL
  const openWeatherUrl = `https://openweather43.p.rapidapi.com/weather?q=${encodeURIComponent(city)}&units=metric`;
  const openWeatherOptions = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'f8cc895708msh086d3c042a93537p191fc6jsn425c5106a533',
      'x-rapidapi-host': 'openweather43.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(openWeatherUrl, openWeatherOptions);
    if (!response.ok) throw new Error('OpenWeather API error');

    const result = await response.json();

    return {
      temperature: result.main.temp,
      conditions: result.weather[0].main,
      city: result.name,
      icon: result.weather[0].icon
    };
  } catch (error) {
    console.warn('OpenWeather failed:', error);

    // 🔁 Fallback to Meteostat (hardcoded station for now)
    const meteostatUrl = `https://meteostat.p.rapidapi.com/stations/daily?station=10637&start=2020-01-01&end=2020-01-31`;
    const meteostatOptions = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'f8cc895708msh086d3c042a93537p191fc6jsn425c5106a533',
        'x-rapidapi-host': 'meteostat.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(meteostatUrl, meteostatOptions);
      if (!response.ok) throw new Error("Meteostat API error");

      const data = await response.json();

      const lastEntry = data.data?.[data.data.length - 1];

      if (!lastEntry || lastEntry.tavg === null) throw new Error("No valid temp data");

      return {
        temperature: lastEntry.tavg,
        conditions: "Unknown",
        city: "Fallback Station",
        icon: "01d" // default sun icon
      };
    } catch (fallbackError) {
      console.error("Meteostat fallback failed:", fallbackError);
      toast.error("Couldn't find weather data for that location");
      return null;
    }
  }
}
