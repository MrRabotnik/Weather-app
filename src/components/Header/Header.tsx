import React from "react";
import "./Header.scss";
import { AppDispatch, RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { updateFinalValue, updateUnit, updateValue } from "../../features/searchSlice";

const Header = () => {
    const dispatch: AppDispatch = useDispatch();
    const searchVal = useSelector((state: RootState) => state.search.value);

    const handleOnChange = (val: string) => {
        dispatch(updateValue(val));
    };

    const submitSearch = () => {
        dispatch(updateFinalValue(searchVal));
    };

    return (
        <header>
            <span></span>
            <div>
                <input
                    type="text"
                    placeholder="Search city"
                    name="search"
                    id=""
                    value={searchVal}
                    onChange={(e: any) => handleOnChange(e.target.value)}
                />
                <button onClick={submitSearch}>Search for City</button>
            </div>

            <select
                id="unit"
                onChange={(e) => {
                    dispatch(updateUnit(e.target.value));
                }}
            >
                <option value="metric">C</option>
                <option value="imperial">F</option>
                <option value="">K</option>
            </select>
        </header>
    );
};

export default Header;
