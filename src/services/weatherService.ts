
import { toast } from "@/components/ui/sonner";

interface WeatherData {
  temperature: number;
  conditions: string;
  city: string;
  icon: string;
}

const RAPID_API_KEY = "f8cc895708msh086d3c042a93537p191fc6jsn425c5106a533"; // Using the key from the example code

export async function getWeatherForCity(city: string): Promise<WeatherData | null> {
  const url = `https://openweather43.p.rapidapi.com/weather?q=${encodeURIComponent(city)}&units=metric`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': RAPID_API_KEY,
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
