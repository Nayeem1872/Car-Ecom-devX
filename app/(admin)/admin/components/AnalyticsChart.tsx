import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface DataPoint {
  name: string;
  value: number;
}

interface AnalyticsChartProps {
  title: string;
  data: DataPoint[];
  dataKey?: string;
  color?: string;
  strokeColor?: string;
  gradientFrom?: string;
  gradientTo?: string;
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({
  title,
  data,
  dataKey = "value",
  color = "var(--primary)",
  strokeColor = "rgba(14, 165, 233, 1)",
  gradientFrom = "rgba(14, 165, 233, 0.2)",
  gradientTo = "rgba(14, 165, 233, 0)",
}) => {
  const uniqueId = `color-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full h-full"
    >
      <Card className="w-full h-full overflow-hidden shadow-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="w-full h-[300px] px-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient id={uniqueId} x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={gradientFrom}
                      stopOpacity={0.8}
                    />
                    <stop offset="95%" stopColor={gradientTo} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(0,0,0,0.05)"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  dx={-10}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px",
                    padding: "8px 12px",
                  }}
                  labelStyle={{ fontWeight: "bold", marginBottom: "4px" }}
                />
                <Area
                  type="monotone"
                  dataKey={dataKey}
                  stroke={strokeColor}
                  strokeWidth={2}
                  fill={`url(#${uniqueId})`}
                  activeDot={{ r: 6 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AnalyticsChart;
