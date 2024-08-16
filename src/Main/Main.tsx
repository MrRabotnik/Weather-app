import React, { useEffect } from "react";
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
    const weather: any = useSelector((state: RootState) => state.weather?.weather);

    const dailyItems: any = useSelector((state: RootState) => state.weather?.weather?.dailyItems);
    const hourlyItems: any = useSelector((state: RootState) => state.weather?.weather?.hourlyItems);

    useEffect(() => {
        if (location) {
            // dispatch(fetchWeather({ location, finalSearchVal }));
        }
    }, [dispatch, location, finalSearchVal]);

    return (
        <>
            <Header />
            <main>
                <div className="top-part">
                    <div className="left-part">
                        {weather ? (
                            <div>
                                <h1>{weather[0].main}</h1>
                                <p>{weather[0].description}</p>
                                <img
                                    src={`${API_URI}/${weather[0].icon}`}
                                    alt=""
                                />
                            </div>
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
                                    />
                                );
                            })}
                    </div>
                </div>
                <div className="bottom-part">
                    {dailyItems &&
                        dailyItems.map((item: any, index: number) => {
                            return (
                                <DailyItem
                                    key={index}
                                    item={item}
                                />
                            );
                        })}
                </div>
            </main>
        </>
    );
};

export default Main;
