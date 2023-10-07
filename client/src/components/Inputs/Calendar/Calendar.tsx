import React, {memo} from 'react';
import ReactCalendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";

import './calendar.scss';
import {formatDate} from "@/utils/date";

interface CalendarProps {
    data: { [key: string]: any };
    setData: React.Dispatch<React.SetStateAction<any>>;
    name: string;

    format?: string;
}

export const Calendar: React.FC<CalendarProps> = memo(({
                                                           data,
                                                           setData,
                                                           name,

                                                           format = 'Y-m-d'
                                                       }) => {


    return (
        <ReactCalendar
            locale="ru-RU"
            className="w-full rounded-xl border-none bg-white/50 backdrop-blur-xl shadow-lg"
            // tileClassName={({date}) => (twJoin(
            //     "rounded-lg",
            //     "active:bg-violet-500 focus:bg-violet-500",
            //     "hover:bg-blue-200 hover:text-gray-700"
            // ))}

            value={data[name]}
            onChange={(value: any) => setData((prev: any) => ({...prev, [name]: formatDate(value, format)}))}
        />
    );
});