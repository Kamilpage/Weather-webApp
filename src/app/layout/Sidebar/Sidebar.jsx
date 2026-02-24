import React from 'react';
import styles from "./sidebar.module.css";
import temp from "../../../assets/images/temp.svg";
import {useSelector} from "react-redux";


const Sidebar = () => {
    const {data, loading, error} = useSelector((s) => s.weather);
    console.log(data)
    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error}</p>;
    if (!data) return null;
    return (
        <div className={styles.weather__details}>
            <div className={styles.weather__search}>
                <input type="text" placeholder='Search Location...'/>
            </div>
            <a href='#'>Weather Details...</a>
            <h1>{data.current.condition.text}</h1>
            <div className={styles.weather__details__item}>
                <div className={styles.weather__temps}>
                    <p>Temp max</p>
                    <div>
                        <p>{data.current.temp_c}°</p>
                        <img src={temp} alt="temp"/>
                    </div>
                </div>
                <div className={styles.weather__temps}>
                    <p>Temp min</p>
                    <div>
                        <p>15°</p>
                        <img src={temp} alt="temp"/>
                    </div>
                </div>
                <div className={styles.weather__temps}>
                    <p>Humadity</p>
                    <div>
                        <p>{data.current.humidity}%</p>
                        <img src={temp} alt="temp"/>
                    </div>
                </div>
                <div className={styles.weather__temps}>
                    <p>Cloudy</p>
                    <div>
                        <p>{data.current.feelslike_c}%</p>
                        <img src={temp} alt="temp"/>
                    </div>
                </div>
                <div className={styles.weather__temps}>
                    <p>Wind</p>
                    <div>
                        <p>{data.current.wind_kph}m/ph</p>
                        <img src={temp} alt="temp"/>
                    </div>
                </div>
                <hr/>
                <a href='#'>Today’s Weather Forecast...</a>
                <div>
                    <div className={styles.weather__temps}>
                        <div>
                            <img src={temp} alt="temp"/>
                            <div className={styles.weather__time}>
                                <p>Snow</p>
                            </div>
                        </div>
                        <p>{data.current.pressure_in}%</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;