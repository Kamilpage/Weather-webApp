export interface WeatherCondition {
    text: string;
    icon: string;
}

export interface WeatherLocation {
    name: string;
    localtime: string;
}

export interface WeatherCurrent {
    temp_c: number;
    humidity: number;
    wind_kph: number;
    cloud: number;
    condition: WeatherCondition;
}

export interface WeatherData {
    location: WeatherLocation;
    current: WeatherCurrent;
}