import lunisolar from "lunisolar";

export const springFestival = lunisolar.fromLunar({
  year: new Date().getFullYear() + 1,
  month: 1,
  day: 1,
});
