import React, { useEffect } from "react";
import styles from './hero.module.css';
import Drawer from "@/shared/Drawer/Drawer";
import Sidebar from "@/app/layout/Sidebar/Sidebar";
import Clock from "../Clock/Clock";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchWeather, setCity } from "@/store/weatherSlice";
import { mockCities } from "@/Components/model/mockCities";
import { mapConditionToType, weatherBackgrounds } from "@/Components/model/weatherBackgroundMap";

const Hero: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(true);
    const dispatch = useAppDispatch();
    const { data, loading, error, city, notFound } = useAppSelector(s => s.weather);

    useEffect(() => {
        dispatch(fetchWeather(city));
    }, [dispatch, city]);

    if (loading) return <p>Загрузка...</p>;

    if (notFound) {
        return (
            <div className={styles.notFound}>
                <h2>Город не найден</h2>
                <p>Вы можете выбрать один из доступных городов:</p>
                <ul className={styles.cityList}>
                    {Object.keys(mockCities).map(c => (
                        <li
                            key={c}
                            onClick={() => {
                                dispatch(setCity(c));
                                dispatch(fetchWeather(c));
                            }}
                        >
                            {c}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    if (error) return <p>Ошибка: {error}</p>;

    if (!data) return null;

    const type = mapConditionToType(data.current.condition.text);
    const background = weatherBackgrounds[type];

    return (
        <div
            className={styles.weather}
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className={styles.content}>
                <div className={styles.weatherInfo} onClick={() => setIsOpen(true)}>
                    <h1>{data.current.temp_c}°C</h1>

                    <div className={styles.locationAndClock}>
                        <h2>{data.location.name}</h2>
                        <Clock />
                    </div>

                    <img src={data.current.condition.icon} alt="weather" />
                </div>
            </div>

            <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <Sidebar />
            </Drawer>
        </div>
    );
};

export default Hero;