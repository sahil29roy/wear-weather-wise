
import { useEffect, useRef, useState } from "react";
import { ChatInput } from "./ChatInput";
import { ChatMessage } from "./ChatMessage";
import { ClothingMessage, Message, WeatherMessage } from "@/types/chatTypes";
import { generateId } from "@/utils/helpers";
import { getWeatherForCity } from "@/services/weatherService";
import { getClothingRecommendation } from "@/services/clothingService";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MapPin } from "lucide-react";

export default function WeatherClothingChat() {
  const [messages, setMessages] = useState<Array<Message | WeatherMessage | ClothingMessage>>([
    {
      id: generateId(),
      content: "Hello! I can help you choose what to wear based on the weather. Enter a city or location to get started.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: generateId(),
      content: content,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Add thinking message
    const thinkingId = generateId();
    setMessages((prev) => [
      ...prev,
      {
        id: thinkingId,
        content: `Checking weather in ${content}...`,
        sender: "bot",
        timestamp: new Date(),
      },
    ]);

    try {
      // Get weather data
      const weatherData = await getWeatherForCity(content);

      // Remove thinking message
      setMessages((prev) => prev.filter((msg) => msg.id !== thinkingId));

      if (!weatherData) {
        setMessages((prev) => [
          ...prev,
          {
            id: generateId(),
            content: `I couldn't find weather data for "${content}". Please try a different location.`,
            sender: "bot",
            timestamp: new Date(),
          },
        ]);
        setIsLoading(false);
        return;
      }

      // Add weather message
      const weatherMessage: WeatherMessage = {
        id: generateId(),
        content: `Here's the current weather in ${weatherData.city}:`,
        sender: "bot",
        timestamp: new Date(),
        weatherData,
      };
      
      setMessages((prev) => [...prev, weatherMessage]);

      // Get clothing recommendation
      const clothingData = getClothingRecommendation(
        weatherData.temperature,
        weatherData.conditions
      );

      // Add clothing recommendation message
      const clothingMessage: ClothingMessage = {
        id: generateId(),
        content: `Based on the weather, here's what I recommend wearing in ${weatherData.city}:`,
        sender: "bot",
        timestamp: new Date(),
        clothingData,
      };
      
      setMessages((prev) => [...prev, clothingMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev.filter((msg) => msg.id !== thinkingId),
        {
          id: generateId(),
          content: "Sorry, I encountered an error while fetching the weather data. Please try again later.",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto h-[600px] flex flex-col shadow-xl">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center justify-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Weather Dress Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4 flex flex-col">
        <div className="flex-1 flex flex-col">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <ChatInput onSend={handleSendMessage} disabled={isLoading} />
    </Card>
  );
}
