import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { fetchWeather } from "../features/weatherSlice";
import { API_URI } from "../utils/api";
import Header from "../components/Header/Header";

const Main = () => {
  const dispatch: AppDispatch = useDispatch();
  const location = useSelector((state: RootState) => state.location.location);
  const finalSearchVal = useSelector(
    (state: RootState) => state.search.finalValue
  );
  const weather: any = useSelector(
    (state: RootState) => state.weather?.weather
  );

  // const dailyItems: any = useSelector(
  //   (state: RootState) => state.weather?.weather?.dailyItems
  // );

  useEffect(() => {
    if (location) {
      dispatch(fetchWeather({ location, finalSearchVal }));
    }
  }, [dispatch, location, finalSearchVal]);

  return (
    <div>
      <Header />
      {weather?.length
        ? weather.map((item: any, index: number) => {
            return (
              <div key={index}>
                <h1>{item.main}</h1>
                <p>{item.description}</p>
                <img src={`${API_URI}/${item.icon}`} alt="" />
                {/* {dailyItems.map((item: any) => {})} */}
              </div>
            );
          })
        : "No results"}
    </div>
  );
};

export default Main;
