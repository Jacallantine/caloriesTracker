import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const data = [
  { day: 'Mon', calories: 2200 },
  { day: 'Tue', calories: 1850 },
  { day: 'Wed', calories: 2100 },
  { day: 'Thu', calories: 2500 },
  { day: 'Fri', calories: 1900 },
  {day : 'Sat', calories : 1500}
];

export default function WeekChart() {
  return (
    <AreaChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip
        contentStyle={{ backgroundColor: "#ffffff", borderColor: "#4f46e5" }}
        labelStyle={{ color: "#333" }}
        itemStyle={{ color: "#4f46e5" }}
      />
      <Legend />
      <Area
        type="monotone"
        dataKey="calories"
        stroke="#4f46e5"
        fill="#4f46e5"
        strokeWidth={3}
        dot={{ r: 4, strokeWidth: 2, fill: "#4f46e5" }}
        activeDot={{ r: 6, stroke: "#4f46e5", strokeWidth: 2 }}
      />
    </AreaChart>
  );
}


export function MonthChart() {
  return (
    <AreaChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip
        contentStyle={{ backgroundColor: "#ffffff", borderColor: "#4f46e5" }}
        labelStyle={{ color: "#333" }}
        itemStyle={{ color: "#4f46e5" }}
      />
      <Legend />
      <Area
        type="monotone"
        dataKey="calories"
        stroke="#4f46e5"
        fill="#4f46e5"
        strokeWidth={3}
        dot={{ r: 4, strokeWidth: 2, fill: "#4f46e5" }}
        activeDot={{ r: 6, stroke: "#4f46e5", strokeWidth: 2 }}
      />
    </AreaChart>
  );
}