import React, { useEffect, useState } from "react";
import styles from "./clock.module.css";
import { useAppSelector } from "@/store/hooks.js";

const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const Clock: React.FC = () => {
    const { data, loading, error } = useAppSelector(s => s.weather);

    const [time, setTime] = useState<Date | null>(null);

    // 1. Устанавливаем стартовое время при получении погоды
    useEffect(() => {
        if (!data?.location?.localtime) return;

        const local = new Date(data.location.localtime);
        setTime(local);
    }, [data]);

    // 2. Тикаем каждую секунду
    useEffect(() => {
        if (!time) return;

        const id = setInterval(() => {
            setTime(prev => prev ? new Date(prev.getTime() + 1000) : null);
        }, 1000);

        return () => clearInterval(id);
    }, [time]);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error}</p>;
    if (!time) return null;

    const hours = String(time.getHours()).padStart(2, "0");
    const minutes = String(time.getMinutes()).padStart(2, "0");
    const showColon = time.getSeconds() % 2 === 0;

    const dayName = weekDays[time.getDay()];
    const day = String(time.getDate()).padStart(2, "0");
    const month = String(time.getMonth() + 1).padStart(2, "0");
    const year = String(time.getFullYear()).slice(-2);

    return (
        <div className={styles.clock}>
            <p>{hours}</p>
            <span className={showColon ? styles.colonVisible : styles.colonHidden}>:</span>
            <p>
                {minutes}
                <span>
                    {dayName}, {day}.{month}.{year}
                </span>
            </p>
        </div>
    );
};

export default Clock;