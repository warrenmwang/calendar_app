import React from "react";
import { daysOfWeekStrs, fullDaysOfWeekStrs, monthStrs } from "../constants";
import "./CalendarGrid.css";

function getMonthInfo(month: number, year: number) {
  // Get the number of days in the month (0th day of next month is last day of current month)
  const nextMonth = new Date(year, month + 1, 0);
  const daysInMonth = nextMonth.getDate();

  // Get the day of the week the month starts on
  const firstDayOfMonth = new Date(year, month, 1);
  const firstDayOfWeek = firstDayOfMonth.getDay();

  return {
    daysInMonth,
    firstDayOfWeek,
  };
}

type CalendarGridProps = {
  currentDateInMonth: number;
  currentMonth: number;
  currentYear: number;
  renderMonth: number;
  renderYear: number;
};

const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentDateInMonth,
  currentMonth,
  currentYear,
  renderMonth,
  renderYear,
}) => {
  const handleDayClick = (day: number, month: number, year: number) => {
    const tmp = new Date(year, month, day);
    const dayOfWeek: string = fullDaysOfWeekStrs[tmp.getDay()];
    alert(`You clicked on ${month + 1}/${day}/${year}, a ${dayOfWeek}.`);
  };

  const { daysInMonth, firstDayOfWeek } = getMonthInfo(renderMonth, renderYear);

  const daysGrid: number[] = Array.from(
    { length: daysInMonth },
    (_, i) => i + 1
  );

  const monthStr: string = monthStrs[renderMonth];

  const firstEmptyCells: number[] = Array.from({ length: firstDayOfWeek });
  const rows: number = Math.ceil((firstEmptyCells.length + daysInMonth) / 7);
  const lastEmptyCells: number[] = Array.from({
    length: rows * 7 - firstDayOfWeek - daysInMonth,
  });

  return (
    <div className="calendarGrid__container">
      {/* Month Name */}
      <div className="col-span-7 text-center text-lg bg-gray-300">
        {monthStr}
      </div>
      {/* Days of the Week */}
      {daysOfWeekStrs.map((day) => (
        <div
          key={day}
          className="text-center bg-gray-400 border border-gray-600"
        >
          {day}
        </div>
      ))}

      {/* Empty cells for the first day offset */}
      {firstEmptyCells.map((_, index) => (
        <div
          key={`first-empty-${index}`}
          className="p-2 bg-gray-300 border border-gray-400"
        />
      ))}
      {/* Days of the Month */}
      {daysGrid.map((day) => (
        <div
          key={day}
          className={`text-center p-2 cursor-pointer border-gray-400 ${
            currentMonth === renderMonth &&
            currentYear === renderYear &&
            day === currentDateInMonth
              ? "cell__yellow"
              : "cell__gray"
          }`}
          onClick={() => handleDayClick(day, renderMonth, renderYear)}
        >
          {day}
        </div>
      ))}
      {/* Empty cells for calendar box */}
      {lastEmptyCells.map((_, index) => (
        <div
          key={`last-empty-${index}`}
          className="p-2 bg-gray-300 border border-gray-400"
        />
      ))}
    </div>
  );
};
export default CalendarGrid;
