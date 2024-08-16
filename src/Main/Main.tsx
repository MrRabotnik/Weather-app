import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { fetchWeather } from "../features/weatherSlice";
import { API_URI } from "../utils/api";
import Header from "../components/Header/Header";
import "./Main.scss";
import DailyItem from "../components/DailyItem/DailyItem";
import HourlyItem from "../components/HourlyItem/HourlyItem";

const Main = () => {
    const dispatch: AppDispatch = useDispatch();

    const location = useSelector((state: RootState) => state.location.location);
    const finalSearchVal = useSelector((state: RootState) => state.search.finalValue);
    const unit = useSelector((state: RootState) => state.search.unit);
    const weather: any = useSelector((state: RootState) => state.weather?.weather);
    const city: any = useSelector((state: RootState) => state.weather?.city);

    // console.log(weather);

    const [selectedDay, setSelectedDay] = useState(0);
    const [hourlyItems, setHourlyItems] = useState([]);

    useEffect(() => {
        if (location) {
            dispatch(fetchWeather({ location, finalSearchVal, unit }));
        }
    }, [dispatch, location, finalSearchVal, unit]);

    useEffect(() => {
        if (weather) setHourlyItems(weather[selectedDay]);
    }, [selectedDay, weather]);

    return (
        <>
            <Header />
            <main>
                <div className="top-part">
                    <div className="left-part">
                        {weather ? (
                            <div>
                                <h1>{city.name}</h1>
                                {/* <h3>{weather[selectedDay].weather[0].main}</h3>
                                /> */}
                            </div>
                        ) : (
                            "No results"
                        )}
                    </div>
                    <div className="right-part">
                        {/* {hourlyItems &&
                            hourlyItems.map((item: any, index: number) => {
                                return (
                                    <HourlyItem
                                        key={index}
                                        item={item}
                                    />
                                );
                            })} */}
                    </div>
                </div>
                <div className="bottom-part">
                    {weather &&
                        weather.map((item: any, index: number) => {
                            return (
                                <DailyItem
                                    key={index}
                                    items={item}
                                    unit={unit}
                                    click={() => {
                                        setSelectedDay(index);
                                    }}
                                />
                            );
                        })}
                </div>
            </main>
        </>
    );
};

export default Main;
