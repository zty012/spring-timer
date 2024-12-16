import { useEffect, useMemo, useRef, useState } from "react";
import beibao from "./assets/beibao.png";
import xibao from "./assets/xibao.png";
import { getDigit } from "./utils/number";
import { springFestival } from "./utils/sprintFestival";
import { parseTime, useNow } from "./utils/time";

export default function App() {
  const [targetYear, setTargetYear] = useState(springFestival.year);
  const [targetMonth, setTargetMonth] = useState(springFestival.month);
  const [targetDay, setTargetDay] = useState(springFestival.day);
  const [targetName, setTargetName] = useState("春节");
  const [bgType, setBgType] = useState("xibao");

  // 现在的时间戳
  const now = useNow();
  // 距离春节还有多少时间
  const remain = useMemo(
    () =>
      parseTime(
        new Date(targetYear, targetMonth - 1, targetDay, 0, 0, 0).getTime() -
          now
      ),
    [now, targetDay, targetMonth, targetYear]
  );

  return (
    <div
      className="flex items-center justify-center flex-col gap-6 h-screen bg-no-repeat bg-center"
      style={{
        backgroundImage: `url("${bgType === "xibao" ? xibao : beibao}")`,
        color: bgType === "xibao" ? "#dc2626" : "#1e3a8a",
      }}
    >
      <span className="text-5xl">距离{targetName}还有</span>
      <span className="font-bold pb-8 flex">
        <NumberDisplayWrapper
          number={remain.days}
          length={remain.days.toString().length}
        />
        <span className="text-4xl font-normal">天</span>
        <NumberDisplayWrapper number={remain.hours} length={2} />
        <span className="text-4xl font-normal">时</span>
        <NumberDisplayWrapper number={remain.minutes} length={2} />
        <span className="text-4xl font-normal">分</span>
        <NumberDisplayWrapper number={remain.seconds} length={2} />
        <span className="text-4xl font-normal">秒</span>
      </span>
      <div className="fixed top-0 left-0 opacity-0 hover:opacity-100 transition flex flex-col">
        <span>背景</span>
        <select onChange={(e) => setBgType(e.target.value)}>
          <option value="xibao">喜报</option>
          <option value="beibao">悲报</option>
        </select>
        <span>目标日期</span>
        <input
          type="number"
          value={targetYear}
          onChange={(e) => setTargetYear(Number(e.target.value))}
        />
        <input
          type="number"
          value={targetMonth}
          onChange={(e) => setTargetMonth(Number(e.target.value))}
        />
        <input
          type="number"
          value={targetDay}
          onChange={(e) => setTargetDay(Number(e.target.value))}
        />
        <span>目标名称</span>
        <input
          type="text"
          value={targetName}
          onChange={(e) => setTargetName(e.target.value)}
        />
      </div>
    </div>
  );
}

function NumberDisplayWrapper({ number = 0, length = 2, className = "" }) {
  return Array.from({ length }).map((_, i) => (
    <NumberDisplay
      key={i}
      number={getDigit(number, length, i)}
      className={className}
    />
  ));
}

function NumberDisplay({ number = 0, className = "" }) {
  const el = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (el.current) {
      const h = (el.current.firstChild as HTMLParagraphElement).clientHeight;
      el.current.scrollTo({
        behavior: "smooth",
        top: number * h,
      });
    }
  }, [number]);

  return (
    <span
      className={`text-8xl font-bold h-[1em] overflow-hidden flex flex-col items-center ${className}`}
      ref={el}
    >
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <p key={i}>{i}</p>
      ))}
    </span>
  );
}
