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

export interface monthProps {
  0: number;
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  6: number;
  7: number;
  8: number;
  9: number;
  10: number;
  11: number;
}

export interface dataDaysProps {
  week: string;
  date: Date;
}

export const dayWeek: dayWeekProps = {
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

export const listMonth = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};

export const setDataDays = () => {
  let listData: dataDaysProps[] = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);

    listData.push({
      date: date,
      week: dayWeek[date.getDay() as keyof dayWeekProps]
    });
  }

  return listData;
};



export const dataDays: dataDaysProps[] = setDataDays();
