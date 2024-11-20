import React, { useState } from "react";
import { monthStrs } from "../constants";
import "./NavigationBar.css";

type NavigationBarProps = {
  currentMonth: number;
  currentYear: number;
  handleMonthNavigation: (month: number) => void;
  showFullYear: boolean;
  toggleShowFullYear: () => void;
};

const NavigationBar: React.FC<NavigationBarProps> = ({
  currentMonth,
  currentYear,
  handleMonthNavigation,
  showFullYear,
  toggleShowFullYear,
}) => {
  const [showMonthButtons, setShowMonthButtons] = useState<boolean>(true);
  const prevMonthStr: string =
    currentMonth > 0 ? monthStrs[currentMonth - 1] : monthStrs[11];
  const nextMonthStr: string =
    currentMonth < 11 ? monthStrs[currentMonth + 1] : monthStrs[0];

  return (
    <div className="navigation__container">
      <button
        onClick={() => handleMonthNavigation(currentMonth - 1)}
        className={
          showMonthButtons ? "navigation__btn" : "navigation__btn_invisible"
        }
      >{`< ${prevMonthStr}`}</button>
      <span
        className={
          showMonthButtons
            ? "navigation__currentMonth"
            : "navigation__currentMonth_invisible"
        }
      >
        {monthStrs[currentMonth]}
      </span>
      <button
        onClick={() => handleMonthNavigation(currentMonth + 1)}
        className={
          showMonthButtons ? "navigation__btn" : "navigation__btn_invisible"
        }
      >{`${nextMonthStr} >`}</button>
      <button
        onClick={() => {
          setShowMonthButtons(!showMonthButtons);
          toggleShowFullYear();
        }}
        className="navigation__btn"
      >
        {showFullYear ? "Month" : "Year"} {currentYear}
      </button>
    </div>
  );
};

export default NavigationBar;
