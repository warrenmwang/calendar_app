import { useState } from "react";
import { monthStrs } from "./constants";
import NavigationBar from "./NavigationBar/NavigationBar";
import CalendarGrid from "./CalendarGrid/CalendarGrid";

function App() {
  const date: Date = new Date();
  const currentDateInMonth: number = date.getDate();
  const currentMonth: number = date.getMonth();
  const currentYear: number = date.getFullYear();
  const [renderMonth, setRenderMonth] = useState<number>(currentMonth);
  const [renderYear, setRenderYear] = useState<number>(currentYear);
  const [showFullYear, setShowFullYear] = useState<boolean>(false);

  const handleMonthNavigation = (nextMonthToShow: number) => {
    if (nextMonthToShow === 12) {
      setRenderMonth(0);
      setRenderYear(renderYear + 1);
    } else if (nextMonthToShow === -1) {
      setRenderMonth(11);
      setRenderYear(renderYear - 1);
    } else {
      setRenderMonth(nextMonthToShow);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <NavigationBar
        currentMonth={renderMonth}
        currentYear={renderYear}
        handleMonthNavigation={handleMonthNavigation}
        showFullYear={showFullYear}
        toggleShowFullYear={() => setShowFullYear((prev) => !prev)}
      />
      <h1 className="text-3xl">
        Calendar For{" "}
        {showFullYear ? renderYear : `${monthStrs[renderMonth]} ${renderYear}`}{" "}
        (United States)
      </h1>
      {showFullYear ? (
        Array.from({ length: 12 }).map((_, i) => {
          return (
            <CalendarGrid
              key={monthStrs[i]}
              currentDateInMonth={currentDateInMonth}
              currentMonth={currentMonth}
              currentYear={currentYear}
              renderMonth={i}
              renderYear={renderYear}
            />
          );
        })
      ) : (
        <CalendarGrid
          currentDateInMonth={currentDateInMonth}
          currentMonth={currentMonth}
          currentYear={currentYear}
          renderMonth={renderMonth}
          renderYear={renderYear}
        />
      )}
    </div>
  );
}

export default App;
