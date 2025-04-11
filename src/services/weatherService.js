
import { toast } from "sonner";

export async function getWeatherForCity(city) {
  const url = `https://openweather43.p.rapidapi.com/weather?q=${encodeURIComponent(city)}&units=metric`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'f8cc895708msh086d3c042a93537p191fc6jsn425c5106a533',
      'x-rapidapi-host': 'openweather43.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('City not found or API error');
    }
    
    const result = await response.json();
    
    return {
      temperature: result.main.temp,
      conditions: result.weather[0].main,
      city: result.name,
      icon: result.weather[0].icon
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    toast.error("Couldn't find weather data for that location");
    return null;
  }
}
