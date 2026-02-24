import React, {useEffect, useState} from "react";
import styles from "./clock.module.css";
import {useSelector} from "react-redux";

const Clock = () => {
    const [tick, setTick] = useState(new Date());
    const {data, loading, error} = useSelector((s) => s.weather);
    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const [time2, setTime2] = useState({
        full: null,
        hours: "",
        minutes: "",
        day: "",
        month: "",
        year: "",
    });

    // мигающий тик раз в секунду
    useEffect(() => {
        const id = setInterval(() => setTick(new Date()), 1000);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        const localTime = data?.location?.localtime; // "2025-10-31 19:08"
        if (!localTime) return;

        const [datePart, timePart] = localTime.split(" ");
        const [year, month, day] = datePart.split("-");
        const [hours, minutes] = timePart.split(":");

        setTime2({full: localTime, hours, minutes, day, month, year});
    }, [data]);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error}</p>;
    if (!data) return null;

    const showColon = tick.getSeconds() % 2 === 0;

    const currentDate = new Date(data.location.localtime);
    const currentDayName = weekDays[currentDate.getDay()];

    return (
        <div className={styles.clock}>
            <p>{time2.hours}</p>
            <span className={showColon ? styles.colonVisible : styles.colonHidden}>:</span>
            <p>{time2.minutes }    <span>
                {currentDayName}, {time2.day}.{time2.month}.{time2.year.slice(-2)}
            </span>
            </p>
        </div>
    );
};

export default Clock;
