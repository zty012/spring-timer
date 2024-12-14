import { useEffect, useMemo, useRef } from "react";
import { getFirstDigit, getSecondDigit } from "./utils/number";
import { springFestival } from "./utils/sprintFestival";
import { parseTime, useNow } from "./utils/time";

export default function App() {
  // 现在的时间戳
  const now = useNow();
  // 距离春节还有多少时间
  const remain = useMemo(
    () =>
      parseTime(
        new Date(
          springFestival.year,
          springFestival.month - 1,
          springFestival.day,
          0,
          0,
          0
        ).getTime() - now
      ),
    [now]
  );

  const playMusic = () => {
    const audio = new Audio(
      "http://music.163.com/song/media/outer/url?id=395304.mp3"
    );
    audio.play();
  };

  useEffect(() => {
    if (
      remain.days === 0 &&
      remain.hours === 0 &&
      remain.minutes === 0 &&
      remain.seconds === 0
    ) {
      playMusic();
    }
  }, [remain.days, remain.hours, remain.minutes, remain.seconds]);

  return (
    <div className="flex items-center justify-center flex-col gap-6 h-screen bg-[url(https://good-news-generator.vonbrank.com/assets/good_news-9ae8ee92.jpg)] bg-no-repeat bg-center text-red-600">
      <span className="text-5xl">距离春节还有</span>
      <span className="font-bold pb-8 flex">
        <NumberDisplay number={getFirstDigit(remain.days)} />
        <NumberDisplay number={getSecondDigit(remain.days)} />
        <span className="text-4xl font-normal">天</span>
        <NumberDisplay number={getFirstDigit(remain.hours)} />
        <NumberDisplay number={getSecondDigit(remain.hours)} />
        <span className="text-4xl font-normal">时</span>
        <NumberDisplay number={getFirstDigit(remain.minutes)} />
        <NumberDisplay number={getSecondDigit(remain.minutes)} />
        <span className="text-4xl font-normal">分</span>
        <NumberDisplay number={getFirstDigit(remain.seconds)} />
        <NumberDisplay number={getSecondDigit(remain.seconds)} />
        <span className="text-4xl font-normal">秒</span>
      </span>
    </div>
  );
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
        <p>{i}</p>
      ))}
    </span>
  );
}
