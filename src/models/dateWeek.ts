interface dayWeekProps {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  10: string;
  11: string;
  12: string;
  13: string;
}

export interface dataDaysProps {
  day: number
  week: string
}

const dayWeek: dayWeekProps = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
  7: "Sun",
  8: "Mon",
  9: "Tue",
  10: "Wed",
  11: "Thu",
  12: "Fri",
  13: "Sat",
};


export const setDataDays = () => [
  {
    day: new Date().getDate(),
    week: dayWeek[new Date().getDay() as keyof dayWeekProps],
  },
  {
    day: new Date().getDate() + 1,
    week: dayWeek[(new Date().getDay() + 1) as keyof dayWeekProps],
  },
  {
    day: new Date().getDate() + 2,
    week: dayWeek[(new Date().getDay() + 2) as keyof dayWeekProps],
  },
  {
    day: new Date().getDate() + 3,
    week: dayWeek[(new Date().getDay() + 3) as keyof dayWeekProps],
  },
  {
    day: new Date().getDate() + 4,
    week: dayWeek[(new Date().getDay() + 4) as keyof dayWeekProps],
  },
  {
    day: new Date().getDate() + 5,
    week: dayWeek[(new Date().getDay() + 5) as keyof dayWeekProps],
  },
  {
    day: new Date().getDate() + 6,
    week: dayWeek[(new Date().getDay() + 6) as keyof dayWeekProps],
  },
];

export const dataDays: dataDaysProps[] = setDataDays();

export const hoursObject = ["13:00", "15:15", "17:30"]