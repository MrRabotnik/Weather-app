import React, { useEffect, useState } from "react";
import "./DailyItem.scss";

const DailyItem = ({ items, click, unit }: any) => {
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

    console.log(currentItem);
    console.log(unit);
    return (
        <div
            className="daily-item"
            onClick={click}
        >
            <p>{currentItem?.dt_txt}</p>
            <h2>
                {currentItem?.main?.temp} {unit === "metric" ? "C" : "F"}
            </h2>
        </div>
    );
};

export default DailyItem;
