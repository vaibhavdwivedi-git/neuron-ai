import React from "react";
import styles from "./index.module.css";
import textStyles from "@/styles/Typography.module.css";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ label, data, dataKey }) => {
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const sortedData = [...data].sort(
    (a, b) => new Date(a.ec_timestamp) - new Date(b.ec_timestamp)
  );

  return (
    <div className={styles["container"]}>
      <div className={styles["header"]}>
        <p className={textStyles["title-small"]}>{label}</p>
      </div>

      <div className={styles["chart"]}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={sortedData || []}>
            <XAxis
              tickLine={{ display: "none" }}
              dataKey="ec_timestamp"
              axisLine={{ strokeWidth: 0 }}
              tick={{
                fontSize: "0.711rem",
                strokeWidth: 0,
                textAnchor: "middle",
              }}
              tickFormatter={formatTimestamp}
            />
            <YAxis
              tickLine={{ display: "none" }}
              axisLine={{ strokeWidth: 0 }}
              tick={{ fontSize: "0.711rem", strokeWidth: 0 }}
            />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#11fe9a40" />
                <stop offset="95%" stopColor="#1f7dff00" />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#006aff40" />
                <stop offset="95%" stopColor="#1f7dff00" />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey={dataKey}
              stackId="1"
              stroke="#1F7DFF"
              fill="url(#colorPv)"
              strokeWidth={2.4}
              activeDot={{ r: 6, strokeWidth: "2.5px" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload) {
    return (
      <div className={styles["tooltip"]}>
        <p className={styles["label"]}>{``}</p>
        {payload.map((entry, i) => (
          <div key={i}>
            <p className={styles["value"]}>{`${entry.value}`}</p>
            <p
              className={styles["date"]}
              style={{ color: entry.color }}
            >{`${label}`}</p>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default Chart;
