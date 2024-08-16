import React from "react";
import "./Header.scss";
import { AppDispatch, RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { updateValue } from "../../features/searchSlice";
import { fetchWeather } from "../../features/weatherSlice";

const Header = () => {
  const dispatch: AppDispatch = useDispatch();
  const searchVal = useSelector((state: RootState) => state.search.value);
  const location = useSelector((state: RootState) => state.location.location);

  const handleOnChange = (val: string) => {
    dispatch(updateValue(val));
  };

  const submitSearch = () => {
    dispatch(fetchWeather(location, searchVal));
  };

  return (
    <header>
      <input
        type="text"
        placeholder="Search city"
        name="search"
        id=""
        value={searchVal}
        onChange={(e: any) => handleOnChange(e.target.value)}
      />
      <button onClick={submitSearch}>Search for City</button>
    </header>
  );
};

export default Header;
