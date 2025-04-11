
import WeatherClothingChat from "@/components/WeatherClothingChat.jsx";
import { Cloud, CloudRain, CloudSnow, Sun } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-10 left-10 text-blue-200 opacity-50">
        <Sun className="h-24 w-24" />
      </div>
      <div className="absolute bottom-10 right-10 text-blue-200 opacity-50">
        <CloudRain className="h-20 w-20" />
      </div>
      <div className="absolute top-20 right-20 text-blue-200 opacity-50">
        <Cloud className="h-16 w-16" />
      </div>
      <div className="absolute bottom-20 left-20 text-blue-200 opacity-50">
        <CloudSnow className="h-16 w-16" />
      </div>
      
      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6 text-center">
        Wear Weather Wise
      </h1>
      <p className="text-lg text-gray-600 max-w-md text-center mb-8">
        Get personalized clothing recommendations based on the current weather at any location.
      </p>
      
      <WeatherClothingChat />
      
      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>Enter any city or location to get clothing recommendations based on the current weather.</p>
      </footer>
    </div>
  );
};

export default Index;
