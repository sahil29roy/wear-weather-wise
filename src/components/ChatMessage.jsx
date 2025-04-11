
import { cn } from "@/lib/utils";
import { Cloud, CloudRain, CloudSnow, Shirt, Sun, Thermometer } from "lucide-react";

export function ChatMessage({ message }) {
  const isWeatherMessage = 'weatherData' in message;
  const isClothingMessage = 'clothingData' in message;
  
  return (
    <div
      className={cn(
        "message-bubble animate-slide-in",
        message.sender === "user" ? "user-message" : "bot-message"
      )}
    >
      {!isWeatherMessage && !isClothingMessage && (
        <div>{message.content}</div>
      )}
      
      {isWeatherMessage && message.weatherData && (
        <div className="space-y-2">
          <div>{message.content}</div>
          <div className="flex items-center gap-2 mt-2 p-2 bg-background/80 rounded-md">
            <WeatherIcon conditions={message.weatherData.conditions} />
            <div>
              <div className="font-medium">{message.weatherData.city}</div>
              <div className="flex items-center text-sm">
                <Thermometer className="h-4 w-4 mr-1" />
                {message.weatherData.temperature.toFixed(1)}°C
              </div>
              <div className="text-sm opacity-80">{message.weatherData.conditions}</div>
            </div>
          </div>
        </div>
      )}
      
      {isClothingMessage && message.clothingData && (
        <div className="space-y-2">
          <div>{message.content}</div>
          <div className="bg-background/80 rounded-md p-3 mt-1">
            <div className="font-medium mb-2 flex items-center">
              <span className="mr-2">{message.clothingData.icon}</span>
              {message.clothingData.description}
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="clothing-item">
                <Shirt className="h-4 w-4" />
                <span>Top: {message.clothingData.top}</span>
              </div>
              <div className="clothing-item">
                <span className="h-4 w-4 flex items-center justify-center">👖</span>
                <span>Bottom: {message.clothingData.bottom}</span>
              </div>
              <div className="clothing-item">
                <span className="h-4 w-4 flex items-center justify-center">👟</span>
                <span>Footwear: {message.clothingData.footwear}</span>
              </div>
              
              {message.clothingData.accessories.length > 0 && (
                <div className="clothing-item">
                  <span className="h-4 w-4 flex items-center justify-center">🧢</span>
                  <span>Accessories: {message.clothingData.accessories.join(", ")}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function WeatherIcon({ conditions }) {
  const condition = conditions.toLowerCase();
  
  if (condition.includes("clear") || condition.includes("sun")) {
    return <Sun className="h-8 w-8 text-weather-sunny" />;
  } else if (condition.includes("cloud")) {
    return <Cloud className="h-8 w-8 text-weather-cloudy" />;
  } else if (condition.includes("rain")) {
    return <CloudRain className="h-8 w-8 text-weather-rainy" />;
  } else if (condition.includes("snow")) {
    return <CloudSnow className="h-8 w-8 text-weather-cold" />;
  } else {
    return <Cloud className="h-8 w-8 text-muted-foreground" />;
  }
}
