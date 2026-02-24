import React, {useEffect} from "react";
import styles from './hero.module.css'
import Modal from "../../shared/Modal/Modal.jsx";
import Sidebar from "../../app/layout/Sidebar/Sidebar.jsx";
import Clock from "../Clock/Clock.jsx";
import {useDispatch, useSelector} from "react-redux";
import {loadMockWeather} from "../../store/weatherSlice.js";

const Hero = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const handleClose = () => setIsOpen(false);
    const handleOpen = (e) => {
        setIsOpen(true);
        e.stopPropagation();
    };

    const dispatch = useDispatch();
    const {data, loading, error} = useSelector(s => s.weather);

    useEffect(() => {
        dispatch(loadMockWeather());
    }, [dispatch]);

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
                        <Clock/>
                    </div>
                    <img src={data.current.condition.icon} alt="weather"/>
                </div>
            </div>

            <div onClick={(e) => e.stopPropagation()}>
                <Modal isOpen={isOpen} onClose={handleClose}>
                    <Sidebar/>
                </Modal>
            </div>
        </div>
    );
};

export default Hero;