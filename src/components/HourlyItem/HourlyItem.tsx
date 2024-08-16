import React from "react";
import "./HourlyItem.scss";
import { ASSETS_URI } from "../../utils/api";

const HourlyItem = ({ item, unit }: any) => {
    return (
        <div className="hourly-item">
            {item.dt_txt.split(" ")[1]} {item.main.temp} {unit === "metric" ? "C" : "F"}
            <img
                src={`${ASSETS_URI}/${item?.weather?.[0]?.icon}.png`}
                alt="Icon"
            />
        </div>
    );
};

export default HourlyItem;
