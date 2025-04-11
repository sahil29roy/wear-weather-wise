
export function getClothingRecommendation(temperature, conditions) {
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
