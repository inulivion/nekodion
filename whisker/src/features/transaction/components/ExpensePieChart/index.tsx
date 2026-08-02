"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";
import { getCategoryColor } from "@/features/category/const";

type ExpenseItem = { categoryTypeName: string; totalAmount: number };

type Props = { items: ExpenseItem[]; hidden?: boolean };

const CustomTooltip = ({
  active,
  payload,
  hidden,
}: {
  active?: boolean;
  payload?: { name: string; value: number }[];
  hidden?: boolean;
}) => {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0];
  return (
    <div className="border-border bg-card rounded-lg border px-3 py-2 text-xs shadow-sm">
      <p className="font-medium">{name}</p>
      <p className="text-muted-foreground">
        {hidden ? "¥ ---,---" : `¥${value.toLocaleString()}`}
      </p>
    </div>
  );
};

export const ExpensePieChart = ({ items, hidden }: Props) => {
  if (items.length === 0) return null;

  const total = items.reduce((sum, item) => sum + item.totalAmount, 0);

  const data = items.map((item) => ({
    name: item.categoryTypeName,
    value: item.totalAmount,
    fill: getCategoryColor(item.categoryTypeName),
  }));

  return (
    <ResponsiveContainer width={150} height={150}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={45}
          outerRadius={75}
          paddingAngle={2}
          dataKey="value"
          nameKey="name"
          startAngle={90}
          endAngle={-270}
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.fill} stroke="transparent" />
          ))}
          <Label
            content={() => (
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                <tspan x="50%" dy="-0.6em" fontSize="11" fill="#888">
                  支出合計
                </tspan>
                <tspan
                  x="50%"
                  dy="1.5em"
                  fontSize="15"
                  fontWeight="bold"
                  fill="#111"
                >
                  {hidden ? "¥ ---,---" : `¥${total.toLocaleString()}`}
                </tspan>
              </text>
            )}
            position="center"
          />
        </Pie>
        <Tooltip content={<CustomTooltip hidden={hidden} />} />
      </PieChart>
    </ResponsiveContainer>
  );
};
