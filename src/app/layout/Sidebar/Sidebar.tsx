import React from 'react';
import styles from "./sidebar.module.css";
import temp from "../../../assets/images/temp.svg";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchWeather, setCity } from "@/store/weatherSlice";
import {mockCities} from "@/Components/model/mockCities";

const Sidebar: React.FC = () => {
    const dispatch = useAppDispatch();
    const { data, loading, error, city, weekly, notFound } = useAppSelector(s => s.weather);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error}</p>;
    if (!data) return null;

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const value = (e.target as HTMLInputElement).value.trim();
            if (!value) return;
            dispatch(setCity(value));
            dispatch(fetchWeather(value));
        }
    };

    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebar__search}>
                <input
                    type="text"
                    placeholder="Search city..."
                    defaultValue={city}
                    onKeyDown={handleSearch}
                />
            </div>
            <div className={styles.citySuggestions}>
                {Object.keys(mockCities).map((c) => (
                    <button
                        key={c}
                        onClick={() => {
                            dispatch(setCity(c));
                            dispatch(fetchWeather(c));
                        }}
                        className={styles.citySuggestions__item}
                    >
                        {c}
                    </button>
                ))}
            </div>

            <p className={styles.sidebar__sectionTitle}>Weather Details</p>

            <h2 className={styles.sidebar__condition}>{data.current.condition.text}</h2>

            <div className={styles.sidebar__metrics}>
                <div className={styles.sidebar__metric}>
                    <span>Temp max</span>
                    <div className={styles.sidebar__temp}>
                        <span className={styles.sidebar__metricValue}>{data.current.temp_c}°</span>
                        <img src={temp} alt="" className={styles.sidebar__metricIcon}/>
                    </div>
                </div>

                <div className={styles.sidebar__metric}>
                    <span>Temp min</span>
                    <div className={styles.sidebar__temp}>
                        <span className={styles.sidebar__metricValue}>15°</span>
                        <img src={temp} alt="" className={styles.sidebar__metricIcon}/>
                    </div>
                </div>

                <div className={styles.sidebar__metric}>
                    <span>Humidity</span>
                    <div className={styles.sidebar__temp}>
                        <span className={styles.sidebar__metricValue}>{data.current.humidity}%</span>
                        <img src={temp} alt="" className={styles.sidebar__metricIcon}/>
                    </div>
                </div>

                <div className={styles.sidebar__metric}>
                    <span>Cloudy</span>
                    <div className={styles.sidebar__temp}>
                        <span className={styles.sidebar__metricValue}>{data.current.cloud}%</span>
                        <img src={temp} alt="" className={styles.sidebar__metricIcon}/>
                    </div>
                </div>

                <div className={styles.sidebar__metric}>
                    <span>Wind</span>
                    <div className={styles.sidebar__temp}>
                        <span className={styles.sidebar__metricValue}>{data.current.wind_kph} kph</span>
                        <img src={temp} alt="" className={styles.sidebar__metricIcon}/>
                    </div>
                </div>
            </div>

            <hr className={styles.sidebar__divider}/>

            <p className={styles.sidebar__sectionTitle}>Weekly Forecast</p>

            <div className={styles.sidebar__forecast}>
                {weekly?.map(day => (
                    <div key={day.day} className={styles.sidebar__forecastItem}>
                        <p className={styles.sidebar__forecastDay}>{day.day}</p>
                        <img src={day.icon} alt="" />
                        <p className={styles.sidebar__forecastTemp}>{day.temp}°</p>
                        <span>{day.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;