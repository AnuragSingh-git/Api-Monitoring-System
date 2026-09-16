"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartData {
  time: string;
  responseTime: number;
}

interface ApiAnalyticsChartProps {
  data: ChartData[];
}

export default function ApiAnalyticsChart({
  data,
}: ApiAnalyticsChartProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          Response Time
        </h2>

        <p className="text-sm text-gray-500">
          API response time over recent checks
        </p>
      </div>

      <div className="h-87.5 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="time" />

            <YAxis
              label={{
                value: "ms",
                angle: -90,
                position: "insideLeft",
              }}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="responseTime"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}