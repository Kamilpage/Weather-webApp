// weatherBackgroundMap.ts
import sunny from '@/assets/background/sunny.jpg'
import cloudy from '@/assets/background/cloudy.jpg'
import partlyCloudy from '@/assets/background/partly-cloudy.jpg'
import rain from '@/assets/background/rain.jpg'
import snow from '@/assets/background/snow.jpg'
import storm from '@/assets/background/storm.jpg'
import fog from '@/assets/background/fog.jpg'



export const weatherBackgrounds = {
    sunny: sunny,
    cloudy: cloudy,
    partlyCloudy: partlyCloudy,
    rain: rain,
    snow: snow,
    storm: storm,
    fog: fog,
};

export function mapConditionToType(condition: string) {
    const text = condition.toLowerCase();

    if (text.includes("sun") || text.includes("clear")) return "sunny";
    if (text.includes("partly")) return "partlyCloudy";
    if (text.includes("cloud")) return "cloudy";
    if (text.includes("rain") || text.includes("drizzle") || text.includes("shower")) return "rain";
    if (text.includes("snow") || text.includes("blizzard")) return "snow";
    if (text.includes("thunder") || text.includes("storm")) return "storm";
    if (text.includes("fog") || text.includes("mist") || text.includes("haze")) return "fog";

    return "cloudy"; // fallback
}