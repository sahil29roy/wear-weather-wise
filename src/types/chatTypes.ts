
export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface WeatherMessage extends Message {
  weatherData?: {
    temperature: number;
    conditions: string;
    city: string;
    icon: string;
  };
}

export interface ClothingMessage extends Message {
  clothingData?: {
    top: string;
    bottom: string;
    footwear: string;
    accessories: string[];
    description: string;
    icon: string;
  };
}
