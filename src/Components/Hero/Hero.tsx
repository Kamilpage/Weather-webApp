import React, { useEffect } from "react";
import styles from './hero.module.css';
import Modal from "../../shared/Modal/Modal";
import Sidebar from "../../app/layout/Sidebar/Sidebar";
import Clock from "../Clock/Clock";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {fetchWeather} from "../../store/weatherSlice";

const Hero: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleClose = () => setIsOpen(false);
    const handleOpen = (e: React.MouseEvent) => {
        setIsOpen(true);
        e.stopPropagation();
    };

    const dispatch = useAppDispatch();
    const { data, loading, error, city } = useAppSelector(s => s.weather);

    useEffect(() => {
        dispatch(fetchWeather(city))
        }, [dispatch, city]);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error}</p>;
    if (!data) return null;

    return (
        <div className={styles.weather} onClick={handleClose}>
            <div className={styles.container}>
                <div onClick={handleOpen} className={styles.weather__temp}>
                    <h1>{data.current.temp_c}°C</h1>
                    <div className={styles.weather__temp__inner}>
                        <h2>{data.location.name}</h2>
                        <Clock />
                    </div>
                    <img src={data.current.condition.icon} alt="weather" />
                </div>
            </div>

            <div onClick={(e) => e.stopPropagation()}>
                <Modal isOpen={isOpen} onClose={handleClose}>
                    <Sidebar />
                </Modal>
            </div>
        </div>
    );
};

export default Hero;