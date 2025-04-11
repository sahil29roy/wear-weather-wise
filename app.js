
// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  
  // Initial welcome message
  addBotMessage("Hi there! I can help you choose what to wear based on the weather. Enter a city name to get started!");
});

// DOM elements
const chatMessages = document.getElementById('chatMessages');
const cityInput = document.getElementById('cityInput');
const sendButton = document.getElementById('sendButton');

// Event listeners
sendButton.addEventListener('click', handleCitySubmit);
cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    handleCitySubmit();
  }
});

// Handle city submission
function handleCitySubmit() {
  const city = cityInput.value.trim();
  
  if (city === '') return;
  
  // Add user message
  addUserMessage(city);
  cityInput.value = '';
  
  // Get weather data
  getWeatherForCity(city)
    .then(weatherData => {
      if (weatherData) {
        // Display weather message
        addWeatherMessage(weatherData);
        
        // Get and display clothing recommendation
        const clothingData = getClothingRecommendation(weatherData.temperature, weatherData.conditions);
        addClothingMessage(clothingData);
      }
    });
}

// Add a user message to the chat
function addUserMessage(content) {
  const messageElement = document.createElement('div');
  messageElement.className = 'message user-message';
  messageElement.textContent = content;
  chatMessages.appendChild(messageElement);
  scrollToBottom();
}

// Add a bot message to the chat
function addBotMessage(content) {
  const messageElement = document.createElement('div');
  messageElement.className = 'message bot-message';
  messageElement.textContent = content;
  chatMessages.appendChild(messageElement);
  scrollToBottom();
}

// Add a weather message to the chat
function addWeatherMessage(weatherData) {
  const messageElement = document.createElement('div');
  messageElement.className = 'message bot-message';
  
  const textContent = document.createElement('div');
  textContent.textContent = `Here's the current weather in ${weatherData.city}:`;
  
  const weatherDataElement = document.createElement('div');
  weatherDataElement.className = 'weather-data';
  
  // Create weather icon based on conditions
  const iconElement = document.createElement('div');
  iconElement.className = 'weather-data-icon';
  
  const icon = document.createElement('i');
  icon.setAttribute('data-lucide', getWeatherIconName(weatherData.conditions));
  iconElement.appendChild(icon);
  
  const dataTextElement = document.createElement('div');
  dataTextElement.className = 'weather-data-text';
  
  const cityElement = document.createElement('div');
  cityElement.style.fontWeight = 'bold';
  cityElement.textContent = weatherData.city;
  
  const tempElement = document.createElement('div');
  tempElement.innerHTML = `<i data-lucide="thermometer" style="width: 16px; height: 16px; display: inline;"></i> ${weatherData.temperature.toFixed(1)}°C`;
  
  const conditionsElement = document.createElement('div');
  conditionsElement.style.opacity = '0.8';
  conditionsElement.textContent = weatherData.conditions;
  
  dataTextElement.appendChild(cityElement);
  dataTextElement.appendChild(tempElement);
  dataTextElement.appendChild(conditionsElement);
  
  weatherDataElement.appendChild(iconElement);
  weatherDataElement.appendChild(dataTextElement);
  
  messageElement.appendChild(textContent);
  messageElement.appendChild(weatherDataElement);
  
  chatMessages.appendChild(messageElement);
  scrollToBottom();
  
  // Initialize the new icons
  lucide.createIcons();
}

// Add a clothing recommendation message to the chat
function addClothingMessage(clothingData) {
  const messageElement = document.createElement('div');
  messageElement.className = 'message bot-message';
  
  const textContent = document.createElement('div');
  textContent.textContent = "Here's what you should wear:";
  
  const clothingDataElement = document.createElement('div');
  clothingDataElement.className = 'clothing-data';
  
  // Description with icon
  const descriptionElement = document.createElement('div');
  descriptionElement.style.fontWeight = 'bold';
  descriptionElement.style.marginBottom = '0.5rem';
  descriptionElement.style.display = 'flex';
  descriptionElement.style.alignItems = 'center';
  descriptionElement.innerHTML = `<span style="margin-right: 0.5rem;">${clothingData.icon}</span> ${clothingData.description}`;
  
  // Create clothing items
  const clothingItems = document.createElement('div');
  clothingItems.className = 'clothing-items';
  
  // Top
  const topElement = createClothingItem('shirt', 'Top', clothingData.top);
  
  // Bottom
  const bottomElement = createClothingItem('👖', 'Bottom', clothingData.bottom);
  
  // Footwear
  const footwearElement = createClothingItem('👟', 'Footwear', clothingData.footwear);
  
  // Accessories (if any)
  let accessoriesElement = null;
  if (clothingData.accessories && clothingData.accessories.length > 0) {
    accessoriesElement = createClothingItem('🧢', 'Accessories', clothingData.accessories.join(', '));
  }
  
  clothingItems.appendChild(topElement);
  clothingItems.appendChild(bottomElement);
  clothingItems.appendChild(footwearElement);
  
  if (accessoriesElement) {
    clothingItems.appendChild(accessoriesElement);
  }
  
  clothingDataElement.appendChild(descriptionElement);
  clothingDataElement.appendChild(clothingItems);
  
  messageElement.appendChild(textContent);
  messageElement.appendChild(clothingDataElement);
  
  chatMessages.appendChild(messageElement);
  scrollToBottom();
  
  // Initialize the new icons
  lucide.createIcons();
}

// Create a clothing item element
function createClothingItem(iconName, label, value) {
  const item = document.createElement('div');
  item.className = 'clothing-item';
  
  const icon = document.createElement('div');
  icon.className = 'clothing-icon';
  
  // Check if it's an emoji or an icon name
  if (iconName.length <= 2) { // Emoji
    icon.textContent = iconName;
  } else { // Lucide icon
    const iconElement = document.createElement('i');
    iconElement.setAttribute('data-lucide', iconName);
    iconElement.style.width = '16px';
    iconElement.style.height = '16px';
    icon.appendChild(iconElement);
  }
  
  const text = document.createElement('span');
  text.textContent = `${label}: ${value}`;
  
  item.appendChild(icon);
  item.appendChild(text);
  
  return item;
}

// Get weather icon name based on conditions
function getWeatherIconName(conditions) {
  const condition = conditions.toLowerCase();
  
  if (condition.includes("clear") || condition.includes("sun")) {
    return "sun";
  } else if (condition.includes("cloud")) {
    return "cloud";
  } else if (condition.includes("rain")) {
    return "cloud-rain";
  } else if (condition.includes("snow")) {
    return "cloud-snow";
  } else {
    return "cloud";
  }
}

// Scroll chat to bottom
function scrollToBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Weather API Service
async function getWeatherForCity(city) {
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
      showError('City not found or API error');
      return null;
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
    showError("Couldn't find weather data for that location");
    return null;
  }
}

// Show error message
function showError(message) {
  addBotMessage(`Error: ${message}`);
}

// Clothing recommendation service
function getClothingRecommendation(temperature, conditions) {
  // Cold weather (below 10°C)
  if (temperature < 10) {
    return {
      top: "Heavy winter jacket, sweater, thermal top",
      bottom: "Thick pants or jeans, thermal leggings",
      footwear: "Insulated boots",
      accessories: ["Beanie", "Scarf", "Gloves"],
      description: "It's quite cold! Bundle up with warm layers to stay cozy.",
      icon: "🧥"
    };
  }
  
  // Cool weather (10-17°C)
  else if (temperature < 17) {
    return {
      top: "Light jacket or hoodie, long-sleeve shirt",
      bottom: "Jeans or casual pants",
      footwear: "Sneakers or casual shoes",
      accessories: ["Light scarf", "Beanie (optional)"],
      description: "It's cool outside. A light jacket should keep you comfortable.",
      icon: "🧥"
    };
  }
  
  // Mild weather (17-23°C)
  else if (temperature < 23) {
    const isRainy = conditions.toLowerCase().includes("rain");
    
    return {
      top: "T-shirt or light long-sleeve",
      bottom: "Jeans, chinos, or casual pants",
      footwear: isRainy ? "Water-resistant shoes" : "Sneakers or loafers",
      accessories: isRainy ? ["Umbrella", "Light rain jacket"] : ["Light cardigan (optional)"],
      description: isRainy ? "Pleasant temperature but prepare for rain!" : "Perfect weather for light, comfortable clothing.",
      icon: isRainy ? "☂️" : "👕"
    };
  }
  
  // Warm weather (23-28°C)
  else if (temperature < 28) {
    return {
      top: "T-shirt, short-sleeve shirt",
      bottom: "Shorts, light pants, skirts",
      footwear: "Sneakers, sandals, or light shoes",
      accessories: ["Sunglasses", "Cap or hat"],
      description: "It's warm! Light, breathable clothing will keep you comfortable.",
      icon: "👕"
    };
  }
  
  // Hot weather (above 28°C)
  else {
    return {
      top: "Light t-shirt, tank top",
      bottom: "Shorts, light skirts",
      footwear: "Sandals, flip-flops",
      accessories: ["Sunglasses", "Hat", "Sunscreen"],
      description: "It's hot outside! Wear light, loose-fitting clothes and stay hydrated.",
      icon: "👙"
    };
  }
}
