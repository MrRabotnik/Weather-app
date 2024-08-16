import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { fetchWeather } from "../features/weatherSlice";
import Header from "../components/Header/Header";
import "./Main.scss";
import DailyItem from "../components/DailyItem/DailyItem";
import HourlyItem from "../components/HourlyItem/HourlyItem";
import { ASSETS_URI } from "../utils/api";

const Main = () => {
    const dispatch: AppDispatch = useDispatch();

    const location = useSelector((state: RootState) => state.location.location);
    const finalSearchVal = useSelector((state: RootState) => state.search.finalValue);
    const unit = useSelector((state: RootState) => state.search.unit);
    const weather: any = useSelector((state: RootState) => state.weather?.weather);
    const status: any = useSelector((state: RootState) => state.weather?.status);
    const city: any = useSelector((state: RootState) => state.weather?.city);

    const [selectedDay, setSelectedDay] = useState(0);
    const [currentItem, setCurrentItem] = useState<any>({});
    const [hourlyItems, setHourlyItems] = useState([]);

    useEffect(() => {
        if (location) {
            dispatch(fetchWeather({ location, finalSearchVal, unit }));
        }
    }, [dispatch, location, finalSearchVal, unit]);

    useEffect(() => {
        if (!weather) return;

        const items = weather[selectedDay];
        if (!items) return;

        setHourlyItems(items);

        const currentDateTime = new Date();
        const currentHour = currentDateTime.getHours();

        let closestItem = null;

        items.forEach((item: any) => {
            const dateTimeString = item.dt_txt;
            const timePart = dateTimeString.split(" ")[1];
            const hours = parseInt(timePart.split(":")[0]);

            if (hours >= currentHour && hours - currentHour < 3) {
                closestItem = item;
            }
        });

        if (closestItem) {
            setCurrentItem(closestItem);
        }
    }, [selectedDay, weather]);

    console.log(status);

    return (
        <>
            <Header />
            <main>
                <div className="top-part">
                    <div className="left-part">
                        {weather ? (
                            <div>
                                <h1>{city.name}</h1>
                                <h3>
                                    {currentItem?.main?.temp} {unit === "metric" ? "C" : "F"}
                                </h3>
                                <img
                                    src={`${ASSETS_URI}/${currentItem?.weather?.[0]?.icon}.png`}
                                    alt="Icon"
                                />
                            </div>
                        ) : status === "loading" ? (
                            "Loading..."
                        ) : (
                            "No results"
                        )}
                    </div>
                    <div className="right-part">
                        {hourlyItems &&
                            hourlyItems.map((item: any, index: number) => {
                                return (
                                    <HourlyItem
                                        key={index}
                                        item={item}
                                        unit={unit}
                                    />
                                );
                            })}
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
                                    selectedDay={selectedDay}
                                    placement={index}
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
