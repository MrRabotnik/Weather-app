import React, { useEffect, useState } from "react";
import "./DailyItem.scss";
import { ASSETS_URI } from "../../utils/api";

const DailyItem = ({ items, click, unit, selectedDay, placement }: any) => {
    const [currentItem, setCurrentItem] = useState<any>({});

    useEffect(() => {
        if (!items) return;

        const currentDateTime = new Date();
        const currentHour = currentDateTime.getHours();

        items.forEach((item: any) => {
            const dateTimeString = item.dt_txt;
            const timePart = dateTimeString.split(" ")[1];
            const hours = timePart.split(":")[0];

            if (parseInt(hours) - currentHour < 3) {
                setCurrentItem(item);
            }
        });
    }, [items]);

    return (
        <div
            className={`daily-item ${selectedDay === placement ? "selected" : ""}`}
            onClick={click}
        >
            <p>{currentItem?.dt_txt}</p>
            <h2>
                {currentItem?.main?.temp} {unit === "metric" ? "C" : "F"}
            </h2>
            <img
                src={`${ASSETS_URI}/${currentItem?.weather?.[0]?.icon}.png`}
                alt="Icon"
            />
        </div>
    );
};

export default DailyItem;
